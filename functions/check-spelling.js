// for testing
// local: http://localhost:8888/.netlify/functions/check-spelling?word=%E0%A6%86%E0%A6%A8%E0%A7%8D%E0%A6%A6%E0%A7%8B%E0%A6%B2%E0%A6%A8
// live: https://spellbangla.netlify.app/.netlify/functions/check-spelling?word=%E0%A6%86%E0%A6%A8%E0%A7%8D%E0%A6%A6%E0%A7%8B%E0%A6%B2%E0%A6%A8
const fs = require('fs');
const path = require('path');
const Nodehun = require('nodehun');

// todo: move dict folder outside of functions folder since netlify complains when deploying
const affbuf = fs.readFileSync('dict/bn_BD.aff');
const dictbuf = fs.readFileSync('dict/bn_BD.dic');
const nodehun = new Nodehun(affbuf, dictbuf);

exports.handler = async (event, context, callback) => {
  const word = event.queryStringParameters.word;
  console.log(word);
  const suggestions = nodehun.suggestSync(word);
  return {
    statusCode: 200,
    body: JSON.stringify({ suggestions, word }),
  };
};

// console.log(suggestions);
// const result = await dict.spellSuggestions(
//   word,
//   (err, correct, suggestions, origWord) => {
//     return {
//       err: err,
//       correct: correct,
//       suggestions: suggestions,
//       numSuggestions: suggestions.length,
//       origWord: origWord,
//     };
//   },
// );
