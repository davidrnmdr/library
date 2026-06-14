package org.library.config;

import org.library.entity.User;
import org.library.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminUserInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(AdminUserInitializer.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.username}")
    private String adminUsername;

    @Value("${app.admin.password}")
    private String adminPassword;

    public AdminUserInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (adminUsername == null || adminUsername.isBlank()) {
            logger.warn("Default admin username is not configured. Skipping initialization.");
            return;
        }

        if (userRepository.findByUsername(adminUsername).isPresent()) {
            logger.info("Default admin user '{}' already exists.", adminUsername);
            return;
        }

        logger.info("Creating default admin user '{}'...", adminUsername);
        User adminUser = User.builder()
                .username(adminUsername)
                .password(passwordEncoder.encode(adminPassword))
                .role("ROLE_ADMIN")
                .build();

        userRepository.save(adminUser);
        logger.info("Default admin user '{}' successfully created.", adminUsername);
    }
}
