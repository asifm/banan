const fs = require('fs');
const nodehun = require('nodehun');

const affbuf = fs.readFileSync('dict/bn_BD.aff');
const dictbuf = fs.readFileSync('dict/bn_BD.dic');
const dict = new nodehun(affbuf, dictbuf);

exports.handler = async (event, context, callback) => {
  const word = event.queryStringParameters.word;

  const result = await dict.spellSuggestions(word, (err, correct, suggestions, origWord) => {
    return {
      err: err,
      correct: correct,
      suggestions: suggestions,
      numSuggestions: suggestions.length,
      origWord: origWord,
    };
  });
  callback(null, {
    statusCode: 200,
    body: "Helloooooooooooooooo! world!"
  });
};
