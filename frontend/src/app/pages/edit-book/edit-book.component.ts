import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { Checkbox } from 'primeng/checkbox';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { HeaderComponent } from '../../components/header/header.component';
import { BookService } from '../../services/book.service';
import { CategoryService } from '../../services/category.service';
import { NotificationService } from '../../services/notification.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgIf, NgFor, InputText, InputNumber, Checkbox, Button, Card, HeaderComponent],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent implements OnInit {
  form: FormGroup;
  categories: Category[] = [];
  bookId: number = 0;
  loading: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.categoryService.getAll().subscribe({
      next: cats => this.categories = cats,
      error: err => console.error('Erro ao buscar categorias:', err)
    });

    this.bookService.getById(this.bookId).subscribe({
      next: book => {
        if (book) {
          this.form.patchValue({
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            copies: book.copies,
            categoriesIds: book.categories.map(c => c.id)
          });
          this.loading = false;
        } else {
          this.notificationService.show('error', 'Livro não encontrado');
          this.router.navigate(['/dashboard']);
        }
      },
      error: err => {
        console.error('Erro ao buscar livro:', err);
        this.notificationService.show('error', 'Erro ao carregar livro');
        this.router.navigate(['/dashboard']);
      }
    });
  }

  onCategoryChange(id: number, checked: boolean) {
    const current: number[] = this.form.get('categoriesIds')!.value;
    const updated = checked ? [...current, id] : current.filter(c => c !== id);
    this.form.get('categoriesIds')!.setValue(updated);
  }

  isCategorySelected(categoryId: number): boolean {
    const selected: number[] = this.form.get('categoriesIds')!.value;
    return selected.includes(categoryId);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.bookService.update(this.bookId, this.form.value).subscribe({
      next: () => {
        this.notificationService.show('success', 'Livro atualizado com sucesso!');
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.notificationService.show('error', 'Erro ao atualizar livro. Tente novamente.');
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
