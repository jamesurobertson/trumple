# Trumple

Clone of [Wordle](https://www.nytimes.com/games/wordle/index.html)
Built using React and styled-components.

[**Live Link**](https://trumple.app/)

### To Run Locally:

Run the following commands:

```bash
$> git clone https://github.com/jamesurobertson/trumple.git
$> cd trumple
$> npm install
$> npm run start
```

### Word List

The 5,757 word list comes from Donald Knuth's [The Stanford Graphbase](https://www-cs-faculty.stanford.edu/~knuth/sgb.html)

### Configuration

In the [config](https://github.com/jamesurobertson/trumple/blob/master/src/config.js) file there are many configurations you can set up which will automatically take effect. Inlcuding:

- Max guesses (# of rows)
- Word Length
- Grid gap and tile size
- Flip and win animation duration and delay.
- Title displayed in the Header.
- Colors for correct, present, absent, and unguessed tiles. For theme colors you can navigate to [theme.js](https://github.com/jamesurobertson/trumple/blob/master/src/theme.js)
- If you change the colors, be sure to change the emojiMap as well or the shareable str won't work properly.

If you change the word length you will need to provide a new list of words in [words.js](https://github.com/jamesurobertson/trumple/blob/master/src/words.js). I have only included 5 letter words.

### Contributing

Feel free to open an issue or submit a PR for review.
