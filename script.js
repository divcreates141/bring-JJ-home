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
let player;

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

// CHANGE THIS NUMBER
callBtn.href = "tel:+10000000000";

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

  console.log("Submitted answers:", answers);
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

function onYouTubeIframeAPIReady() {
  player = new YT.Player("youtubePlayer", {
    height: "0",
    width: "0",
    videoId: "yH00GFHjYds",
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
      loop: 1,
      playlist: "yH00GFHjYds",
      start: 0
    },
    events: {
      onReady: () => {}
    }
  });
}

window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

function startMusic() {
  if (player && typeof player.playVideo === "function") {
    player.playVideo();
    player.setVolume(35);
  }
}

function lowerMusicVolume() {
  if (player && typeof player.setVolume === "function") {
    player.setVolume(18);
  }
}