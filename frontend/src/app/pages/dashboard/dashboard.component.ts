import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { HeaderComponent } from '../../components/header/header.component';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, BookCardComponent, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  books: Book[] = [];
  isAdmin = false;

  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    
    this.bookService.getAll().subscribe({
      next: books => this.books = books,
      error: err => console.error('Erro ao buscar livros:', err)
    });
  }
}
