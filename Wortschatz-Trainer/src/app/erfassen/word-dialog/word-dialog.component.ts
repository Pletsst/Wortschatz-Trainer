import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WordPair } from '../../types/word-pair';
import { MatFormField, MatLabel } from '@angular/material/form-field';


@Component({
  selector: 'app-word-dialog',
  templateUrl: './word-dialog.component.html',
  styleUrls: ['./word-dialog.component.css'],
  standalone: true,
  imports: [MatFormField, MatLabel]
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