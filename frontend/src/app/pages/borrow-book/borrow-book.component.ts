import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../components/book-card/book-card.component';
import { UserService, User } from '../../services/user.service';
import { BorrowingService } from '../../services/borrowing.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-borrow-book',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './borrow-book.component.html',
  styleUrl: './borrow-book.component.css'
})
export class BorrowBookComponent implements OnInit {
  form: FormGroup;
  users: User[] = [];
  books: Book[] = [];
  minDate: string;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private userService: UserService,
    private borrowingService: BorrowingService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    this.minDate = today.toISOString().split('T')[0];

    this.form = this.fb.group({
      userId: ['', Validators.required],
      bookId: ['', Validators.required],
      mustReturnAt: ['', [Validators.required, this.futureDateValidator.bind(this)]]
    });
  }

  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate > today ? null : { pastDate: true };
  }

  ngOnInit() {
    this.userService.getAll().subscribe({
      next: users => {
        this.users = users;
      },
      error: err => console.error('Erro ao buscar usuários:', err)
    });

    this.bookService.getAll().subscribe({
      next: books => this.books = books.filter(b => b.availableCopies > 0),
      error: err => console.error('Erro ao buscar livros:', err)
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const payload = {
      userId: Number(this.form.value.userId),
      bookId: Number(this.form.value.bookId),
      mustReturnAt: new Date(this.form.value.mustReturnAt).toISOString()
    };

    this.borrowingService.create(payload).subscribe({
      next: () => {
        this.notificationService.show('success', 'Livro emprestado com sucesso!');
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        this.notificationService.show('error', err.error?.message || 'Erro ao emprestar livro');
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
