import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { BookService } from '../../services/book.service';
import { CategoryService } from '../../services/category.service';
import { NotificationService } from '../../services/notification.service';
import { Category } from '../../components/book-card/book-card.component';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent implements OnInit {
  form: FormGroup;
  categories: Category[] = [];

  constructor(
    private router: Router,
    private bookService: BookService,
    private categoryService: CategoryService,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      title:         ['', Validators.required],
      author:        ['', Validators.required],
      isbn:          ['', Validators.required],
      categoriesIds: [[], Validators.required],
      copies:        [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.categoryService.getAll().subscribe({
      next: cats => this.categories = cats,
      error: err => console.error('Erro ao buscar categorias:', err)
    });
  }

  onCategoryChange(id: number, checked: boolean) {
    const current: number[] = this.form.get('categoriesIds')!.value;
    const updated = checked ? [...current, id] : current.filter(c => c !== id);
    this.form.get('categoriesIds')!.setValue(updated);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.bookService.create(this.form.value).subscribe({
      next: () => {
        this.notificationService.show('success', 'Livro adicionado com sucesso!');
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.notificationService.show('error', 'Erro ao adicionar livro. Tente novamente.');
      }
    });
  }

  onCancel() {
    this.router.navigate(['/dashboard']);
  }

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && control?.touched);
  }
}
