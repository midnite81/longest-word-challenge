import fs = require("fs");
import open = require("open");
import server from "./server";

const words: string = fs.readFileSync("./data/words.txt").toString();
const arrayOfWords: string[] = words.split("\r\n");

console.info(`The total number of words in the dictionary is ${arrayOfWords.length}`);

const badLetters: RegExp = /[gkmqvwxyz]/;
let longestAcceptableWord: string = "";
const sevenLetterWords: string[] = [];

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

const randomIndex: number = Math.floor(Math.random() * sevenLetterWords.length);
const randomWord: string = sevenLetterWords[randomIndex];

console.info(`The random selected word is ${randomWord}`);

const httpPort: number = 8080;
server.startServer(httpPort);
open(`http://127.0.0.1:${httpPort}?word=${randomWord}`);
