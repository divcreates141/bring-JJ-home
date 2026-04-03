const questions = [
  "This isn’t the first time we’ve found our way back here… is it?",
  "Did you hesitate for a second before opening this?",
  "Do you think we ever really stopped thinking about each other?",
  "There were parts of us that felt easy… right?",
  "Do certain songs still take you back to us?",
  "If we saw each other today… it wouldn’t feel like strangers, would it?",
  "Do you think we understood each other in ways we didn’t say out loud?",
  "Was it really the wrong time… or just complicated?",
  "Have you ever almost reached out… and then didn’t?",
  "Be honest… would it actually be that unexpected to hear from me?"
];

const answers = [];
let currentQuestion = 0;

const introScreen = document.getElementById("introScreen");
const questionScreen = document.getElementById("questionScreen");
const endingScreen = document.getElementById("endingScreen");

const startBtn = document.getElementById("startBtn");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const questionText = document.getElementById("questionText");
const progressText = document.getElementById("progressText");

const envelopeWrapper = document.getElementById("envelopeWrapper");
const messageModal = document.getElementById("messageModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const callBtn = document.getElementById("callBtn");
const bgMusic = document.getElementById("bgMusic");

// CHANGE THIS NUMBER
callBtn.href = "tel:+16477469339";

function showScreen(screenToShow) {
  [introScreen, questionScreen, endingScreen].forEach(screen => {
    screen.classList.remove("active");
  });
  screenToShow.classList.add("active");
}

function renderQuestion() {
  progressText.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  questionText.textContent = questions[currentQuestion];
}

function handleAnswer(answer) {
  answers.push({
    question: questions[currentQuestion],
    answer
  });

  currentQuestion++;

  if (currentQuestion < questions.length) {
    renderQuestion();
  } else {
    showEndingSequence();
  }
}

function showEndingSequence() {
  showScreen(endingScreen);
  envelopeWrapper.classList.remove("hidden");

  const envelope = document.querySelector(".envelope");
  const photos = document.querySelector(".photos");

  setTimeout(() => {
    envelope.classList.add("open");
  }, 500);

  setTimeout(() => {
    photos.classList.add("show");
  }, 1400);

  setTimeout(() => {
    lowerMusicVolume();
    messageModal.classList.remove("hidden");
  }, 3000);
}

function startMusic() {
  if (!bgMusic) return;

  bgMusic.volume = 0.4;
  bgMusic.play().then(() => {
    console.log("Music started");
  }).catch(error => {
    console.log("Music failed:", error);
  });
}

function lowerMusicVolume() {
  if (bgMusic) {
    bgMusic.volume = 0.18;
  }
}

startBtn.addEventListener("click", () => {
  showScreen(questionScreen);
  renderQuestion();
  startMusic();
});

yesBtn.addEventListener("click", () => handleAnswer("Yes"));
noBtn.addEventListener("click", () => handleAnswer("No"));

closeModalBtn.addEventListener("click", () => {
  messageModal.classList.add("hidden");
});