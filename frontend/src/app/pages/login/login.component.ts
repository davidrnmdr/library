import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, InputText, Password, Button, Card],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private router: Router, private authService: AuthService) {}

  onLogin() {
    this.error = '';
        
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Erro completo:', err);
        console.error('Status:', err.status);
        console.error('Response:', err.error);
        this.error = 'E-mail ou senha inválidos.';
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
