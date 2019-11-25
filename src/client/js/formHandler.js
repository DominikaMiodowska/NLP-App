import { validURL } from './urlChecker'

// const AYLIENTextAPI = require('aylien_textapi');

// function handleSubmit(event) {
//     event.preventDefault()

//     // check what text was put into the form field
//     let formText = document.getElementById('article_URL').value
//     console.log('input feld: ' + formText)


    
//     console.log(":::handleSubmit func :::")
//     fetch('http://localhost:8081/get_sentiment_analysis')
//     .then(res => {        
//         return res.json()
//     })
//     .then(function(res) {
//         document.getElementById('results').innerHTML = res.message
//         document.getElementById('title').innerHTML = formText
//     })
// }

function handleSubmit(event) {
    event.preventDefault();
    const text = document.getElementById("test-statement").value;
    if (!text) return;
    console.log(text);

    const endPoint = new URL('http://localhost:8081/api');
    endPoint.search = new URLSearchParams({
        text:text
    });

    fetch(endPoint)
    .then(res => {        
        return res.json()
    })
    .then(function(res) {
        document.getElementById("text_polarity").innerHTML = res.polarity;
        document.getElementById("text_subjectivity").innerHTML = res.subjectivity;
        document.getElementById("text_polarity_confidence").innerHTML = res.polarity_confidence;
        document.getElementById("text_subjectivity_confidence").innerHTML = res.subjectivity_confidence;
    })
 }
  
function handleSubmitArticle(event) {
    event.preventDefault();
    const url = document.getElementById("article_URL_2").value;
    console.log("url field");
    console.log(document.getElementById("article_URL_2"))
    console.log(url);
    if (!url) return;
    console.log(url);
    
    const endPoint = new URL('http://localhost:8081/article');
    endPoint.search = new URLSearchParams({
        text: url,
    });

    fetch(endPoint)
    .then(res => {        
        return res.json()
    })
    .then(function(res) {
        document.getElementById("polarity").innerHTML = res.polarity;
        document.getElementById("subjectivity").innerHTML = res.subjectivity;
        document.getElementById("polarity_confidence").innerHTML = res.polarity_confidence;
        document.getElementById("subjectivity_confidence").innerHTML = res.subjectivity_confidence;
        document.getElementById("excerpt").innerHTML = res.text;
    })
  }

export { handleSubmit,  validURL, handleSubmitArticle}

//   export {handleSubmit, handleSubmitArticle };

  