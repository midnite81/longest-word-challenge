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
const badLetters = /[gkmqvwxyz]/;
let longestAcceptableWord = "";
const sevenLetterWords = [];
console.info(`Word Count: ${words.length}`);
for (const word of arrayOfWords) {
    if (word.length < longestAcceptableWord.length || word.length > 7 || word.match(badLetters)) {
        continue;
    }
    if (word.length === 7) {
        sevenLetterWords.push(word);
    }
    longestAcceptableWord = word;
}
console.info(`Here are ${sevenLetterWords.length} longest words`);
for (const word of sevenLetterWords) {
    console.info(word);
}
const randomIndex = Math.floor(Math.random() * sevenLetterWords.length);
const randomWord = sevenLetterWords[randomIndex];
console.info(`The random longest word selected is ${randomWord}`);
const httpPort = 9084;
server_1.default.startServer(httpPort);
open(`http://127.0.0.1:${httpPort}?word=${randomWord}`);
