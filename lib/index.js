"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const open = require("open");
const server_1 = __importDefault(require("./server"));
const words = fs.readFileSync("./data/words.txt").toString();
const arrayOfWords = words.split("\r\n");
console.info(`The total number of words in the dictionary is ${arrayOfWords.length}`);
const badLetters = /[gkmqvwxyz]/;
let longestAcceptableWord = "";
const sevenLetterWords = [];
for (const word of arrayOfWords) {
    if (word.length < longestAcceptableWord.length || word.length > 7 || word.match(badLetters)) {
        continue;
    }
    if (word.length === 7) {
        sevenLetterWords.push(word);
    }
    longestAcceptableWord = word;
}
console.info(`The total number of seven character words is ${sevenLetterWords.length}`);
console.info(`The word which was accepted was ${longestAcceptableWord}`);
for (const word of sevenLetterWords) {
    console.info(word);
}
const randomIndex = Math.floor(Math.random() * sevenLetterWords.length);
const randomWord = sevenLetterWords[randomIndex];
console.info(`The random selected word is ${randomWord}`);
const httpPort = 8080;
server_1.default.startServer(httpPort);
open(`http://127.0.0.1:${httpPort}?word=${randomWord}`);
