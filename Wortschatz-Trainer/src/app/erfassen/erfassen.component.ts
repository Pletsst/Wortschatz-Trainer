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

  constructor(
    private wordListService: WordListService,
    private dialog: MatDialog
    ){}

  ngOnInit(){
    this.wordList = this.wordListService.getWordList();
  }

  sortByGerman(){
    this.wordList = this.wordListService.sortByGerman();
  }

  sortByEnglish(){
    this.wordList = this.wordListService.sortByEnglish();
  }

  fillWithExampleWords(){
    this.wordList = this.wordListService.useExampleWords();
    console.log(this.wordList)
  }

  addNewWordPair(german: string, english: string){
    this.wordList = this.wordListService.addWordPair(german, english);
  }

  resetWordList(){
    this.wordList = this.wordListService.resetWordList();
  }

  openWordDialog(): void {
    const dialogRef = this.dialog.open(WordDialogComponent, {
      width: '400px', 
      data: {}
    });

    // Subscribe to dialog close event to handle data returned from the dialog if needed
    dialogRef.afterClosed().subscribe((result: WordPair) => {
      this.addNewWordPair(result.wordDE, result.wordEN)
    });
  }

}
