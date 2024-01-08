const apiKey = process.env.OPENAI_API_KEY;
console.log("API Key:", apiKey);

//OpenAI API
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
})

// Variable for select element
let select = document.getElementById('language-to-translate');

// Variable for currently selected language
let selectedLanguage = select.options[select.selectedIndex].textContent;
console.log("initial language: " + selectedLanguage);

// Variable for h2 for translation
let translatedTexth2;

// Variable for new text area to display translated text
let translatedText;

// Variable to store body element
let body = document.getElementById('body');

// Variable to store the text to translate
let text;

// Variable to store the text area
let textarea = document.getElementById('text-to-translate');

// Variable to store the translate button
let translateButton = document.getElementById('translate-button');

// Variable for response from OpenAI
let textTranslation;

// Variable for messages to OpenAI
const messages = [
    {
        role: 'system',
        content: 'You are a helpful language expert.'
    },
    {
        role: 'user'
    }
]

// Function to get response from OpenAI
async function getResponse(textToBeTranslated, language) {
    messages[1].content = `Translate "${textToBeTranslated}" to ${language}.`;
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages
    })
    
    textTranslation = response.choices[0].message.content;
    console.log("Response from OpenAI: " + textTranslation);
}

async function displayResponse() {
    text = textarea.value;
    // Print to console the text to translate
    console.log("Text you're translating: " + text);

    messages[1].content = `Translate "${text}" to ${selectedLanguage}.`;
    
    console.log( "What you're sending to OpenAI: " + messages[1].content);

    // Call function to get response from OpenAI
    const response = await getResponse(text, selectedLanguage);

    // If translated text area exists, remove it
    if (translatedText !== undefined) {
        translatedText.remove();
        translatedTexth2.remove();
    }
    // Create a new h2 to display the language the text was translated to
    translatedTexth2 = document.createElement('h2');
    // Set the text content of the h2 to display the language the text was translated to
    translatedTexth2.textContent = `Translated text in ${select.options[select.selectedIndex].textContent}:`;
    // Create a new text area to display the translated text
    translatedText = document.createElement('textarea');
    translatedText.disabled = true;
    // Set the text content of the text area to the translated text
    translatedText.textContent = textTranslation;
    // Insert the h2 and translated text area before the translate button
    body.insertBefore(translatedTexth2, translateButton);
    body.insertBefore(translatedText, translateButton);
}

// Add event listener to the select element to know which language to translate to
select.addEventListener('change', () => {
    // Print to console the language to translate to
    console.log( "Currently selected language: " + select.options[select.selectedIndex].textContent);
    // Set the selected language to the language to translate to
    selectedLanguage = select.options[select.selectedIndex].textContent;
});

// Add event listener to the button to translate the text
translateButton.addEventListener('click', () => {
    displayResponse();
});

