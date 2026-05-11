import { Component, Input } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';

export interface Category {
  id: number;
  name: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  categories: Category[];
  copies: number;
  availableCopies: number;
}

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [NgClass, NgFor],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent {
  @Input() book!: Book;
}
