# Longest Seven-segment display word

Taking on the challenge from [Tom Scott](https://twitter.com/tomscott), this code library sets out to determine what 
the longest word you can write with a seven segment display. 

Take a look at his [Youtube Challenge Video](https://www.youtube.com/watch?v=zp4BMR88260). He disallows the following 
characters: gkmqvwxz. We too will exclude those characters. 

# Useful links

- Public domain list of English words: https://github.com/dwyl/english-words
- NodeJs: https://nodejs.org/
- Typescript: http://www.typescriptlang.org/
- Seven Segment Font: https://www.dafont.com/seven-segment.font

# Node

Since Tom used NodeJs, we will do so too. However, because I like typescript because it keeps a flakey programming 
language a bit stricter we'll use it to prevent errors. Since this is a just a 'for fun' coding challenge, I'm not
going to be doing any tests in this project. 

# Taking it to the next level. 

While it's good to get the longest acceptable word, I like to know what words were possible. As such we will be creating
an array with all the acceptable words. And then we will create a server and output the word to a web page. 

# Install

```
yarn
yarn run build:live
```