
const prompts = [
  {
    round: "Why Is That True?",
    question: "Water boils at 100°C. Why is that true?",
  },
  {
    round: "Twist It",
    question: "What would happen if gravity stopped working?",
  },
  {
    round: "Apply It Elsewhere",
    question: "Apply natural selection to startup success.",
  },
  {
    round: "Socratic Showdown",
    question: "Is technological progress always good?",
  }
];

let currentRound = 0;
let scores = [];

function startGame() {
  document.body.innerHTML = \`
    <h1>Deep Thinkers</h1>
    <div id="game"></div>
    <div id="summary"></div>
    <canvas id="scoreChart"></canvas>
    <div id="tips"></div>
    <div id="leaderboard"></div>
    <div id="shareResults"></div>
    <div id="playAgain"></div>
  \`;
  showPrompt();
}

function showPrompt() {
  const prompt = prompts[currentRound];
  const gameDiv = document.getElementById("game");
  gameDiv.innerHTML = \`
    <h2>Round: \${prompt.round}</h2>
    <p><strong>Prompt:</strong> \${prompt.question}</p>
    <textarea id="response" placeholder="Write your explanation..."></textarea>
    <br>
    <button onclick="submitResponse()">Submit</button>
  \`;
}

function submitResponse() {
  const response = document.getElementById("response").value;
  if (!response.trim()) {
    alert("Please write your explanation.");
    return;
  }

  // Simulate a score (normally you'd use AI here)
  const roundScore = {
    clarity: Math.floor(Math.random() * 10) + 1,
    depth: Math.floor(Math.random() * 15) + 1,
    logic: Math.floor(Math.random() * 10) + 1,
    creativity: Math.floor(Math.random() * 10) + 1,
  };
  roundScore.total = roundScore.clarity + roundScore.depth + roundScore.logic + roundScore.creativity;
  scores.push(roundScore);

  currentRound++;
  if (currentRound < prompts.length) {
    showPrompt();
  } else {
    showSummary();
  }
}

function showSummary() {
  let total = 0;
  let clarity = 0, depth = 0, logic = 0, creativity = 0;

  scores.forEach(s => {
    clarity += s.clarity;
    depth += s.depth;
    logic += s.logic;
    creativity += s.creativity;
    total += s.total;
  });

  const summaryDiv = document.getElementById("summary");
  summaryDiv.innerHTML = \`
    <h2>Game Summary</h2>
    <p><strong>Combined Score:</strong> \${total}</p>
    <ul>
      <li>Clarity of Thought: \${clarity}</li>
      <li>Depth of Understanding: \${depth}</li>
      <li>Logical Reasoning: \${logic}</li>
      <li>Creativity / Insight: \${creativity}</li>
    </ul>
  \`;

  renderChart(clarity, depth, logic, creativity);
  renderShareButton(total);

  document.getElementById("playAgain").innerHTML = \`
    <button onclick="window.location.reload()">🔁 Play Again</button>
  \`;
}

function renderChart(clarity, depth, logic, creativity) {
  const ctx = document.getElementById("scoreChart").getContext("2d");
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Clarity', 'Depth', 'Logic', 'Creativity'],
      datasets: [{
        label: 'Score Breakdown',
        data: [clarity, depth, logic, creativity],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true, max: 60 }
      }
    }
  });
}

// Auto-start game on load
window.onload = startGame;
