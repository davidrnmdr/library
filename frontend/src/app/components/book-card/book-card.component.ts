import { Component, Input, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Book } from '../../models/book.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [NgClass, NgFor, NgIf],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent implements OnInit {
  @Input() book!: Book;
  coverUrl: string = '';
  imageError: boolean = false;
  imageLoading: boolean = true;
  isAdmin: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.loadCoverImage();
  }

  loadCoverImage() {
    // Remove hífens e espaços do ISBN
    const cleanIsbn = this.book.isbn.replace(/[-\s]/g, '');
    
    // Tenta Open Library primeiro
    this.coverUrl = `https://covers.openlibrary.org/b/isbn/${cleanIsbn}-L.jpg`;
  }

  onImageLoad() {
    this.imageLoading = false;
  }

  onImageError() {
    if (!this.imageError) {
      this.imageError = true;
      const cleanIsbn = this.book.isbn.replace(/[-\s]/g, '');
      this.coverUrl = `https://covers.openlibrary.org/b/isbn/${cleanIsbn}-M.jpg`;
    } else {
      this.imageLoading = false;
      this.coverUrl = '';
    }
  }

  onEditClick(event: Event) {
    event.stopPropagation();
    this.router.navigate(['/books/edit', this.book.id]);
  }
}
