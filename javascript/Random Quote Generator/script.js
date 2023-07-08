const btnEl = document.getElementById('btn');
const quoteEl = document.getElementById('quote');
const authorEl = document.getElementById('author');

const apiURL = "https://type.fit/api/quotes/";

async function getQuote() {

    try {
        btnEl.innerText = "Loading....";
        btnEl.disabled = true;

        quoteEl.innerText = "Updating ...";
        authorEl.innerText  = "Updating ...";

        const response = await fetch(apiURL);
        const data = await response.json();
        const random = Math.floor(Math.random() * data.length);
        const randomQuote = data[random];
        const quoteText = randomQuote.text;
        const quoteAuthor = "~ " + randomQuote.author;

        quoteEl.innerText = quoteText;
        authorEl.innerText = quoteAuthor;

        btnEl.innerText = "Get a quote";
        btnEl.disabled = false;

        console.log(data);

    } catch (error) {
        console.log(error);
        quoteText.innerText = "An error happend, try again later!";
        quoteAuthor.innerText = "An error happend";

        btnEl.innerText = "Get a quote";
        btnEl.disabled = false;
    }
}

getQuote()

btnEl.addEventListener('click', getQuote );