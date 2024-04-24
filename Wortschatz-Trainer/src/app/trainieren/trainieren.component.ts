import { Component, OnInit } from '@angular/core';
import { WordPair } from '../types/word-pair';
import { WordListService } from '../services/wort-liste.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-trainieren',
  templateUrl: './trainieren.component.html',
  styleUrls: ['./trainieren.component.css']
})
export class TrainierenComponent implements OnInit {

  wordList: WordPair[] = [];
  currentWordPair!: WordPair;
  answer: string = "";
  isGermanDisplayed: boolean = false;
  falseAnswers: WordPair[] = [];

  constructor(
    private wordListService: WordListService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.wordList = this.wordListService.getWordList();
    this.getNextWordPair();
  }

  getNextWordPair() {
    // if false answers array contains word pairs and 40% random is met, show word from false words
    if (this.falseAnswers.length > 0 && Math.random() < 0.4) {
      const randomIndex = Math.floor(Math.random() * this.falseAnswers.length);
      this.currentWordPair = this.falseAnswers[randomIndex];
      this.falseAnswers.splice(randomIndex, 1);
    } else {
      const randomIndex = Math.floor(Math.random() * this.wordList.length);
      this.currentWordPair = this.wordList[randomIndex];
    }
    this.isGermanDisplayed = Math.random() < 0.5;
  }

  checkAnswer() {
    const correctAnswer = this.isGermanDisplayed ? this.currentWordPair.wordEN : this.currentWordPair.wordDE;
    if (this.answer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
    } else {
      this.openSnackBar(correctAnswer);
      if (!this.falseAnswers.includes(this.currentWordPair)) {
        this.falseAnswers.push(this.currentWordPair); 
      }
    }
    this.getNextWordPair();
    this.answer = "";
  }
  
  openSnackBar(correctAnswer: string) {
    this.snackBar.open('Inkorrekt! Korrekte Antwort: ' + correctAnswer, 'Schliessen', {
      duration: 3000, 
      verticalPosition: 'top', 
    });
  }
}
