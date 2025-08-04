
function renderShareButton(totalScore) {
  document.getElementById("shareResults").innerHTML = `
    <button onclick="copySummaryToClipboard()">📋 Copy Summary</button>
    <button onclick="downloadSummaryImage()">🖼️ Download as Image</button>
    <button onclick="shareOnX()">🔗 Share on X</button>
    <button onclick="shareOnLinkedIn()">🔗 Share on LinkedIn</button>
    <button onclick="shareOnFacebook()">🔗 Share on Facebook</button>
    <button onclick="shareOnThreads()">🔗 Share on Threads</button>
  `;
}

function copySummaryToClipboard() {
  const text = document.getElementById("summary").innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert("Summary copied to clipboard!");
  });
}

function downloadSummaryImage() {
  html2canvas(document.body).then(canvas => {
    const link = document.createElement('a');
    link.download = 'deep_thinkers_summary.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}

function shareOnX() {
  const score = document.getElementById("summary").innerText.match(/Combined Score:\s+(\d+)/);
  const scoreText = score ? score[1] : 'my score';
  const text = `I scored ${scoreText} on the Deep Thinkers game! Test your reasoning at: https://yourgameurl.com #DeepThinkersGame`;
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

function shareOnLinkedIn() {
  const score = document.getElementById("summary").innerText.match(/Combined Score:\s+(\d+)/);
  const scoreText = score ? score[1] : 'my score';
  const text = `I just scored ${scoreText} on the Deep Thinkers reasoning game — challenge your brain here: https://yourgameurl.com`;
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://yourgameurl.com')}%20-%20${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

function shareOnFacebook() {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://yourgameurl.com')}`;
  window.open(url, '_blank');
}

function shareOnThreads() {
  const score = document.getElementById("summary").innerText.match(/Combined Score:\s+(\d+)/);
  const scoreText = score ? score[1] : 'my score';
  const text = `Scored ${scoreText} on Deep Thinkers 🧠 Come try it: https://yourgameurl.com`;
  const url = `https://www.threads.net/intent/post?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}
