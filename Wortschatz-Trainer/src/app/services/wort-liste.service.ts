import { Injectable } from '@angular/core';
import { WordPair } from '../types/word-pair';


@Injectable({
  providedIn: 'root'
})

export class WordListService {
  private wordList: WordPair[] = [];

  constructor() { }


  resetWordList(): WordPair[] {
    this.wordList = [];
    return this.wordList;
  }

  getWordList(): WordPair[] {
    return this.wordList;
  }

  addWordPair(wordDE: string, wordEN: string): WordPair[]{
    this.wordList.push({wordDE, wordEN, id: this.generateUniqueId()})
    return this.wordList;
  }

  editWordPair(newWordDE: string, newWordEN: string, id: number){
    this.wordList.forEach( (pair) => {
      if (pair.id === id){
       pair.wordDE = newWordDE;
       pair.wordEN = newWordEN;
        }
      })
  }

  deleteWordPair(id: number){
    this.wordList = this.wordList.filter( pair => pair.id !== id )
  }

  sortByGerman(): WordPair[] {
    this.wordList = this.wordList.slice().sort((a, b) => a.wordDE.localeCompare(b.wordDE));
    return this.wordList;
  }

  sortByEnglish(): WordPair[] {
    this.wordList = this.wordList.slice().sort((a, b) => a.wordEN.localeCompare(b.wordEN));
    return this.wordList;
  }

  useExampleWords(): WordPair[] {
    this.wordList = exampleWordPairs;
    return this.wordList;
  }

  saveToLocalStorage() {
    localStorage.setItem('wordList', JSON.stringify(this.wordList));
  }

  loadFromLocalStorage() {
    const savedWordList = localStorage.getItem('wordList');
    if (savedWordList) {
      this.wordList = JSON.parse(savedWordList);
    }
  }

  private generateUniqueId(): number{
    let id = 0;

    this.wordList.forEach(wordPair =>{
      if(wordPair.id > id) id = wordPair.id
    });
    
    return id + 1;
  }

}

const exampleWordPairs: WordPair[] = [
  { wordDE: 'Apfel', wordEN: 'apple', id: 1 },
  { wordDE: 'Buch', wordEN: 'book', id: 2 },
  { wordDE: 'Haus', wordEN: 'house', id: 3 },
  { wordDE: 'Stuhl', wordEN: 'chair', id: 4 },
  { wordDE: 'Tisch', wordEN: 'table', id: 5 },
  { wordDE: 'Auto', wordEN: 'car', id: 6 },
  { wordDE: 'Schule', wordEN: 'school', id: 7 },
  { wordDE: 'Fenster', wordEN: 'window', id: 8 },
  { wordDE: 'Hund', wordEN: 'dog', id: 9 },
  { wordDE: 'Katze', wordEN: 'cat', id: 10 },
  { wordDE: 'Straße', wordEN: 'street', id: 11 },
  { wordDE: 'Ball', wordEN: 'ball', id: 12 },
  { wordDE: 'Himmel', wordEN: 'sky', id: 13 },
  { wordDE: 'Maus', wordEN: 'mouse', id: 14 },
  { wordDE: 'Tür', wordEN: 'door', id: 15 }
];
