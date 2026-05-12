import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { BorrowedBookCardComponent } from '../../components/borrowed-book-card/borrowed-book-card.component';
import { HeaderComponent } from '../../components/header/header.component';
import { BorrowingService } from '../../services/borrowing.service';
import { AuthService } from '../../services/auth.service';
import { Borrowing } from '../../models/borrowing.model';

@Component({
  selector: 'app-borrowed-books',
  standalone: true,
  imports: [NgFor, BorrowedBookCardComponent, HeaderComponent],
  templateUrl: './borrowed-books.component.html',
  styleUrl: './borrowed-books.component.css'
})
export class BorrowedBooksComponent implements OnInit {
  borrowings: Borrowing[] = [];
  userId: number = 0;

  constructor(
    private borrowingService: BorrowingService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const userId = this.authService.getUserId();
    
    if (!userId) {
      console.error('UserId não encontrado. Atualize o backend para retornar userId no login.');
      this.router.navigate(['/dashboard']);
      return;
    }
    
    this.borrowingService.getBooksByUserId(userId).subscribe({
      next: borrowings => this.borrowings = borrowings,
      error: err => console.error('Erro ao buscar empréstimos:', err)
    });
  }
}
