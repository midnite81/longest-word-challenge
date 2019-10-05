"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var open = require("open");
var server_1 = __importDefault(require("./server"));
var words = fs.readFileSync("./data/words.txt").toString();
var arrayOfWords = words.split("\r\n");
var badLetters = /[gkmqvwxyz]/;
var longestAcceptableWord = "";
var sevenLetterWords = [];
console.info("Word Count: " + words.length);
for (var _i = 0, arrayOfWords_1 = arrayOfWords; _i < arrayOfWords_1.length; _i++) {
    var word = arrayOfWords_1[_i];
    if (word.length < longestAcceptableWord.length || word.length > 7 || word.match(badLetters)) {
        continue;
    }
    if (word.length === 7) {
        sevenLetterWords.push(word);
    }
    longestAcceptableWord = word;
}
console.info("Here are " + sevenLetterWords.length + " longest words");
for (var _a = 0, sevenLetterWords_1 = sevenLetterWords; _a < sevenLetterWords_1.length; _a++) {
    var word = sevenLetterWords_1[_a];
    console.info(word);
}
var randomIndex = Math.floor(Math.random() * sevenLetterWords.length);
var randomWord = sevenLetterWords[randomIndex];
console.info("The random longest word selected is " + randomWord);
var httpPort = 9084;
server_1.default.startServer(httpPort);
open("http://127.0.0.1:" + httpPort + "?word=" + randomWord);
