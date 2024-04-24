import { Component } from '@angular/core';
import { WordPair } from '../types/word-pair';
import { WordListService } from '../services/wort-liste.service';
import { DisableButtonsService } from '../services/disable-buttons.service';

@Component({
  selector: 'app-pruefung',
  templateUrl: './pruefung.component.html',
  styleUrls: ['./pruefung.component.css']
})
export class PruefungComponent {

  wordsFound: boolean = false;
  wordList: WordPair[] = [];
  testResults: { word: WordPair, isCorrect: boolean }[] = [];
  testRunning: boolean = false;
  isGermanDisplayed: boolean = false;
  currentWordPair!: WordPair;
  answer: string = "";
  testResult: any = { accuracy: "", wordCount: 0, passed: false }

  // Accuracy and word Count variables
  requiredAccuracy: number = 0;
  requiredWordCount: number = 0;
  wordsTested: number = 0;
  accuracyOptions: number[] = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  wordCountOptions: number[] = []

  // Timer variables
  timeLimitMinutes: number = 0;
  timeLimitSeconds: number = 0;
  timeDisplay: any;

  constructor(
    private wordListService: WordListService,
    private disableButtonsService: DisableButtonsService,
  ) {
    this.wordsFound = this.wordListService.gotWordsForTest();
   }

  ngOnInit() {
    this.copyWordList();
    this.wordCountOptions = Array.from({ length: this.wordList.length }, (_, i) => i + 1);
    this.requiredWordCount = this.wordList.length;
  }

  copyWordList() {
    const originalWordList = this.wordListService.getWordList();
    this.wordList = [...originalWordList];
    console.log("WordList after Fetch:");
    console.table(this.wordList);
  }

  startTest() {
    this.getNextWord();
    this.disableButtonsService.toggleDisable();
    this.testResults = [];
    this.testRunning = true;
    this.startTimer();
  }

  endTest() {
    if(!this.testRunning) return
    console.log("Ending Test")
    this.disableButtonsService.toggleDisable();
    this.testRunning = false;
    this.wordsTested = 0;
    this.copyWordList();
    this.testResult = { accuracy: this.getAccuracy(), wordCount: this.requiredWordCount, passed: this.checkIfTestPassed() };
  }

  nextWord() {
    this.checkAnswer()
    this.getNextWord()
  }

  getNextWord() {
    console.log("Fetching Word")
    if (this.wordList && this.wordsTested < this.requiredWordCount) {
      this.wordsTested ++;
      const randomIndex = Math.floor(Math.random() * this.wordList.length);
      this.currentWordPair = this.wordList[randomIndex];
      this.wordList.splice(randomIndex, 1);
      console.table(this.wordList);
    } else {
      this.endTest();
      console.log("Ending Test because of empty word list or condition met")
    }
  }

  checkIfTestPassed(): boolean {
    if (this.getAccuracy() >= this.requiredAccuracy) return true;
    return false;
  }

  checkAnswer() {
    const correctAnswer = this.isGermanDisplayed ? this.currentWordPair.wordEN : this.currentWordPair.wordDE;
    if (this.answer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
      this.testResults.push({ word: this.currentWordPair, isCorrect: true });
    } else {
      this.testResults.push({ word: this.currentWordPair, isCorrect: false });
    }
    this.answer = "";
  }

  // Statistics
  getTotalCorrectAnswers(): number {
    return this.testResults.filter(result => result.isCorrect).length;
  }

  getAccuracy(): number {
    const totalCorrect = this.getTotalCorrectAnswers();
    const totalQuestions = this.requiredWordCount;
    return (totalCorrect / totalQuestions) * 100;
  }


  // Timer
  startTimer() {
    if (this.timeLimitMinutes === 0 && this.timeLimitSeconds === 0 || typeof this.timeLimitMinutes !== 'number' || typeof this.timeLimitSeconds !== 'number') return

    let seconds: number = (this.timeLimitMinutes * 60) + this.timeLimitSeconds;
    let textSec: any = "0";
    let statSec: number = this.timeLimitSeconds;

    const prefix = this.timeLimitMinutes < 10 ? "0" : "";

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.timeDisplay = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
      if (seconds == 0) {
        if (!this.testRunning) this.endTest();
        clearInterval(timer);
      }
    }, 1000);
  }
}
