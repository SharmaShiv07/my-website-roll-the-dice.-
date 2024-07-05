// Define an array of background image URLs
const backgroundImages = [
  '(link unavailable)',
  '(link unavailable)',
  '(link unavailable)',
  '(link unavailable)',
  '(link unavailable)',
  '(link unavailable)'
];

let rolledNumbers = [];
let allSectionsViewed = false;

function rollDice() {
  // If all numbers have been rolled, reset the array
  if (rolledNumbers.length === 6) {
    rolledNumbers = [];
  }

  // Get a new random number that hasn't been rolled yet
  let randomNumber;
  do {
    randomNumber = Math.floor(Math.random() * 6) + 1;
  } while (rolledNumbers.includes(randomNumber));

  // Add the new number to the array of rolled numbers
  rolledNumbers.push(randomNumber);

  updateDice(randomNumber);
  updateBackground(randomNumber);
  speakMessage(randomNumber);
  showSection(randomNumber);
}

function updateDice(number) {
  const diceElement = document.getElementById('dice');
  diceElement.innerText = number;
  diceElement.style.backgroundColor = getDiceBackgroundColor(number);
}

function updateBackground(number) {
  document.body.style.backgroundImage = `url(${backgroundImages[number - 1]})`;
}

function getDiceBackgroundColor(number) {
  const colors = ['red', 'green', 'blue', 'orange', 'purple', 'teal'];
  return colors[number - 1];
}

function speakMessage(number) {
  const sectionText = document.getElementById(`section${number}`).querySelector('h2').innerText;
  const message = `Hi, user! You rolled ${number}, showing the section "${sectionText}".`;

  if ('speechSynthesis' in window) {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);
  } else {
    console.log('Speech synthesis is not supported.');
  }
}

function showSection(number) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => section.classList.remove('active'));
  document.getElementById(`section${number}`).classList.add('active');

  // Check if all sections are viewed
  allSectionsViewed = Array.from(sections).every(section => section.classList.contains('active'));

  if (allSectionsViewed) {
    console.log("All sections viewed. You can now roll any number again.");
  }
}
