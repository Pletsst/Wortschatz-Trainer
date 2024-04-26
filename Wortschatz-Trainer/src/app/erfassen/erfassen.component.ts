import { Component } from '@angular/core';
import { WordPair } from '../types/word-pair';
import { WordListService } from '../services/wort-liste.service';
import { WordDialogComponent } from './word-dialog/word-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-erfassen',
  templateUrl: './erfassen.component.html',
  styleUrl: './erfassen.component.css'
})
export class ErfassenComponent {

  wordList: WordPair[] = [];
  tableColumnTitles: string[] = ['position', 'deutsch', 'englisch', 'delete'];

  constructor(
    private wordListService: WordListService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.wordList = this.wordListService.getWordList();
  }

  sortByGerman() {
    this.wordList = this.wordListService.sortByGerman();
  }

  sortByEnglish() {
    this.wordList = this.wordListService.sortByEnglish();
  }

  fillWithExampleWords() {
    this.wordList = this.wordListService.useExampleWords();
  }

  addNewWordPair(german: string, english: string) {
    this.wordList = this.wordListService.addWordPair(german, english);
  }

  resetWordList() {
    this.wordList = this.wordListService.resetWordList();
  }

  deleteWordPair(id: number) {
    this.wordList = this.wordListService.deleteWordPair(id);
  }

  editWordPair(wordPair: WordPair) {
    this.openWordDialog(wordPair);
  }

  saveToLocalStorage(){
    this.wordListService.saveToLocalStorage();
  }

  loadFromLocalStorage(){
    this.wordListService.loadFromLocalStorage();
    this.wordList = this.wordListService.getWordList();
  }

  openWordDialog(wordPair?: WordPair): void {
    const dialogRef = this.dialog.open(WordDialogComponent, {
      data: { wordPair }
    });

    dialogRef.afterClosed().subscribe((result: WordPair) => {
      if(result){
        if (!result.id) {
          this.addNewWordPair(result.wordDE, result.wordEN);
        } else {
          this.wordListService.editWordPair(result.wordDE, result.wordEN, result.id);
        }
      }
    });
  }

}
