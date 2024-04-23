import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WordPair } from '../../types/word-pair';


@Component({
  selector: 'app-word-dialog',
  templateUrl: './word-dialog.component.html',
  styleUrls: ['./word-dialog.component.css'],
})
export class WordDialogComponent implements OnInit {
  editedWord: WordPair;

  constructor(
    public dialogRef: MatDialogRef<WordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editedWord = {...data.wordPair}
   }

  ngOnInit(): void {
  }

  onSave(): void {
    this.dialogRef.close();
  }

  onClose(): void {
    this.dialogRef.close();
  }

}