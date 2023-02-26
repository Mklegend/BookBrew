import { Component, Input } from '@angular/core';
import { SummarizeService } from '../services/summarize.service';
import Book from '../interfaces/Book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
 @Input() book:Book;
 summary:string="";
 playing:boolean=false;
 practicalAdvice="";
 summarize:SummarizeService;
 loading:boolean=false;
 loading1:boolean=false;
 voice:any;
 isVisible = false;
 isVisible1 = false;


  constructor(summarize:SummarizeService){
    this.book = {} as Book;
    this.summarize = summarize;
    }

  speak (text:string)  {
    speechSynthesis.cancel();
    this.playing = true;
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  }
  
  stop(){
    speechSynthesis.cancel();
    this.playing = false;
    this.practicalAdvice = ""
    this.summary = ""
    this.isVisible = false;
    this.isVisible1 = false;
  }

  pause(){
    speechSynthesis.pause();
  }

  resume(){
    speechSynthesis.resume();
  }

  getSummary(){
    let prompt = `Give me summary of the Book ${this.book.title}`
    this.loading = true;
    this.summarize.getSummary(prompt).subscribe((response:any)=>{
      console.log(response.choices[0].text)
      this.summary = response.choices[0].text;
      this.loading = false;
      this.speak(this.summary);
    })
  }

  getThreePracticalPoints(){
    console.log("Came here");
    let prompt = `Give me Three Practical Points from the Book ${this.book.title}`
    this.loading1 = true;
    this.summarize.getSummary(prompt).subscribe((response:any)=>{
      console.log(response.choices[0].text)
      this.practicalAdvice = response.choices[0].text;
      this.loading1 = false;
      this.speak(`The Three Practical Advices from the Book ${this.book.title} are ${this.practicalAdvice}`);
    })
  }

  showModal(): void {
    this.isVisible = true;
    this.getSummary();
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  showModal1(): void {
    this.isVisible1 = true;
    this.getThreePracticalPoints();
  }

  handleOk1(): void {
    console.log('Button ok clicked!');
    this.isVisible1 = false;
  }

  handleCancel1(): void {
    console.log('Button cancel clicked!');
    this.isVisible1 = false;
  }

}
