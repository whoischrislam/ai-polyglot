// Variable for select element
let select = document.getElementById('language-to-translate');

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

// Store the text to translate when the button is clicked
translateButton.addEventListener('click', () => {
    text = textarea.value;
    // Print to console the text to translate
    console.log(text);

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
    translatedText.textContent = text;
    // Insert the h2 and translated text area before the translate button
    body.insertBefore(translatedTexth2, translateButton);
    body.insertBefore(translatedText, translateButton);
});

