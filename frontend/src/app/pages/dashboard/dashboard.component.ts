import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { BookCardComponent, Book } from '../../components/book-card/book-card.component';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, BookCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit() {
    this.bookService.getAll().subscribe({
      next: books => this.books = books,
      error: err => console.error('Erro ao buscar livros:', err)
    });
  }

  goToAddBook() {
    this.router.navigate(['/books/add']);
  }

  goToBorrowBook() {
    this.router.navigate(['/books/borrow']);
  }
}
