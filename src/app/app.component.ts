import { Component } from '@angular/core';
import { SummarizeService } from './services/summarize.service';
import { FetchbooksService } from './services/fetchbooks.service';
import { FormControl } from '@angular/forms';
import Book from './interfaces/Book';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'chad-rizer';
  summarize: any;
  fetchBooks: any;
  prompt: FormControl;
  hasSearched: boolean = false;
  books: Book[] = [];
  searchBooks: Book[] = [];
  selectedOption = new FormControl();
  options = [
    { label: 'Action and Adventure', value: 'Action and Adventure' },
    { label: 'Self Help', value: 'Self Help' },
    { label: 'Classic', value: 'Classic' },
    { label: 'Comic and Graphic Novel', value: 'Comic and Graphic Novel' },
    { label: 'Crime and Detective', value: 'Crime and Detective' },
    { label: 'Drama', value: 'Drama' },
    { label: 'Fable', value: 'Fable' },
    { label: 'Fairy Tale', value: 'Fairy Tale' },
    { label: 'Fantasy', value: 'Fantasy' },
    { label: 'Historical Fiction', value: 'Historical Fiction' },
    { label: 'Horror', value: 'Horror' },
    { label: 'Humor', value: 'Humor' },
    { label: 'Legend', value: 'Legend' },
    { label: 'Magical Realism', value: 'Magical Realism' },
    { label: 'Mystery', value: 'Mystery' },
    { label: 'Mythology', value: 'Mythology' },
    { label: 'Realistic Fiction', value: 'Realistic Fiction' },
    { label: 'Romance', value: 'Romance' },
    { label: 'Satire', value: 'Satire' },
    { label: 'Science Fiction (Sci-Fi)', value: 'Science Fiction (Sci-Fi)' },
    { label: 'Short Story', value: 'Short Story' },
    { label: 'Suspense/Thriller', value: 'Suspense/Thriller' },
    { label: 'Western', value: 'Western' },
  ];

  constructor(summarize: SummarizeService, fetchBooks: FetchbooksService) {
    this.summarize = summarize;
    this.fetchBooks = fetchBooks;
    this.prompt = new FormControl();
    this.selectedOption.valueChanges.subscribe((value) => {
      this.hasSearched = false;
      this.requestBooks(this.selectedOption.value);
    });
  }

  requestBooks(genre: string) {
    this.fetchBooks.getBooksByGenre(genre).subscribe((response: any) => {
      this.books = [];

      response.items.forEach((book: any) => {
        if (Array.isArray(book.volumeInfo.authors)) {
          this.books.push({
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors[0],
            imageUrl: book.volumeInfo.imageLinks.thumbnail,
            description: book.volumeInfo.description,
          });
        } else
          this.books.push({
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors,
            imageUrl: book.volumeInfo.imageLinks.thumbnail,
            description: book.volumeInfo.description,
          });
      });
    });
  }
  requestBook() {
    this.fetchBooks
      .getBookByTitle('Atomic Habits')
      .subscribe((response: any) => {
        // let volumeInfo = response.items[0].volumeInfo;
        // this.book = {title:volumeInfo.title,author:volumeInfo.authors[0],imageUrl:volumeInfo.imageLinks.thumbnail,description:volumeInfo.description}
        // console.log(response);
        // console.log(response.items[4].volumeInfo.imageLinks.thumbnail);
        // this.imageUrl = response.items[4].volumeInfo.imageLinks.thumbnail;
      });
  }

  search() {
    this.hasSearched = true;
    console.log(this.prompt);
    this.fetchBooks
      .getBookByTitle(this.prompt.value)
      .subscribe((response: any) => {
        console.log(this.prompt);
        response.items.forEach((book: any) => {
          if (Array.isArray(book.volumeInfo.authors)) {
            this.searchBooks.push({
              title: book.volumeInfo.title,
              author: book.volumeInfo.authors[0],
              imageUrl: book.volumeInfo.imageLinks.thumbnail,
              description: book.volumeInfo.description,
            });
          } else
            this.searchBooks.push({
              title: book.volumeInfo.title,
              author: book.volumeInfo.authors,
              imageUrl: book.volumeInfo.imageLinks.thumbnail,
              description: book.volumeInfo.description,
            });
        });
      });
  }
}


