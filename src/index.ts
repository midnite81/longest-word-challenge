import fs = require("fs");
import open = require("open");
import server from "./server";

const words: string = fs.readFileSync("./data/words.txt").toString();
const arrayOfWords = words.split("\r\n");

const badLetters: RegExp = /[gkmqvwxyz]/;
let longestAcceptableWord: string = "";
const sevenLetterWords: string[] = [];

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

const randomIndex: number = Math.floor(Math.random() * sevenLetterWords.length);
const randomWord: string = sevenLetterWords[randomIndex];

console.info(`The random longest word selected is ${ randomWord }`);

const httpPort = 9084;
server.startServer(httpPort);
open(`http://127.0.0.1:${httpPort}?word=${randomWord}`);
