import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WordPair } from '../../types/word-pair';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-word-dialog',
  templateUrl: './word-dialog.component.html',
  styleUrls: ['./word-dialog.component.css'],
  standalone: true,
  imports: [MatFormField, MatLabel, MatInput, FormsModule, MatButtonModule]
})
export class WordDialogComponent implements OnInit {
  editedWord: WordPair;

  constructor(
    public dialogRef: MatDialogRef<WordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editedWord = { ...data.wordPair }
  }

  ngOnInit(): void {
  }

  onSave(): void {
    if (this.editedWord.wordDE && this.editedWord.wordEN) this.dialogRef.close(this.editedWord);
  }

  onClose(): void {
    this.dialogRef.close();
  }

}