# Estágio 1: Build (Compilação com Maven)
FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder
WORKDIR /app

# Copia apenas o pom.xml primeiro para aproveitar o cache do Docker
COPY pom.xml .
# Baixa as dependências (isso acelera builds futuros)
RUN mvn dependency:go-offline

# Copia o código-fonte
COPY src ./src
# Compila o projeto ignorando os testes (para ser mais rápido no ambiente de dev)
RUN mvn clean package -DskipTests

# Estágio 2: Execução (Apenas o JRE, sem o Maven)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Pega o .jar gerado no Estágio 1 e renomeia para app.jar
COPY --from=builder /app/target/*.jar app.jar

# Expõe a porta que o Spring Boot usa
EXPOSE 8080

# Comando para iniciar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]