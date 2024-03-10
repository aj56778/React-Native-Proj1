// converter.js
const tf = require('@tensorflow/tfjs');
const use = require('@tensorflow-models/universal-sentence-encoder');
const phrases = require('./SimilarPhrases.json');

const login = phrases.login;

const convert = async () => {
    console.log(login)
    // Load the Universal Sentence Encoder model
    const model = await use.load();
    
    // Embed the login phrase
    const embedIt = await model.embed(login);
    console.log("embed it", embedIt)
    // Embed the user input phrase
    const userinputEmb = await model.embed("Log me in");
    
    // Slice the first embedding (assuming you want the first one)
    const embedIt1 = embedIt.slice([0, 0], [1]);
    
    // Compute the similarity score
    const score = await embedIt1.matMul(userinputEmb, false, true).data();

    console.log(score);
    
    return score; // Return the score if you want to use it elsewhere
}

module.exports = convert;
