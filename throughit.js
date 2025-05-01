document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('throughitform');
  const resultSection = document.getElementById('resultDiv');
  const nameInput = document.getElementById('name');
  const titleInput = document.getElementById('title');
  const timeInput = document.getElementById('time');
  const challengesInput = document.getElementById('distractions'); 
  const deadlineInput = document.getElementById('list');
  

  const storedName = localStorage.getItem('name');
  const storedTitle = localStorage.getItem('title');
  const storedTime = localStorage.getItem('time');
  const storedChallenges = localStorage.getItem('challenges');
  const storedDeadline = localStorage.getItem('deadline');

  if (storedName) nameInput.value = storedName;
  if (storedTitle) titleInput.value = storedTitle;
  if (storedTime) timeInput.value = storedTime;
  if (storedChallenges) challengesInput.value = storedChallenges;
  if (storedDeadline) deadlineInput.value = storedDeadline;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const title = titleInput.value.trim();
    const time = timeInput.value.trim();
    const challenges = challengesInput.value.trim();
    const deadline = deadlineInput.value.trim();

   
    if (!name || !title || !time || !challenges || !deadline) {
      alert('Please fill in all fields.');
      return;
    }

    
    localStorage.setItem('name', name);
    localStorage.setItem('title', title);
    localStorage.setItem('time', time);
    localStorage.setItem('distractions', distractions);
    localStorage.setItem('deadline', deadline);

    
    resultSection.innerHTML = `
      <h2>Clarity Pledge Submitted</h2>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Assignment Title:</strong> ${title}</li>
        <li><strong>Time Period:</strong> ${time}</li>
        <li><strong>Challenges:</strong> ${challenges}</li>
        <li><strong>Deadline:</strong> ${deadline}</li>
      </ul>
    `;

    form.reset(); 
  });
});


let second = parseInt(localStorage.getItem('timerSeconds')) || 0;
let timer = null;
let isRunning = JSON.parse(localStorage.getItem('timerRunning')) || false; 

function updateDisplay() {
  let hrs = Math.floor(seconds / 3600);
  let mins = Math.floor((seconds % 3600) / 60);
  let secs = seconds % 60;

  
  if (hrs < 10) hrs = '0' + hrs;
  if (mins < 10) mins = '0' + mins;
  if (secs < 10) secs = '0' + secs;

  document.getElementById('display').textContent = hrs + ':' + mins + ':' + secs;
}
let seconds = parseInt(localStorage.getItem('timerSeconds')) || 0;
timer = setInterval(() => {
  seconds++;
  localStorage.setItem('timerSeconds', seconds);  
  updateDisplay();
}, 1000);

function startTimer() {
  if (timer !== null) return; 
  isRunning = true;
  localStorage.setItem('timerRunning', isRunning); 
  timer = setInterval(() => {
    seconds++;
    localStorage.setItem('timerSeconds', seconds); 
    updateDisplay();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
  isRunning = false;
  localStorage.setItem('timerRunning', isRunning); 
}

function resetTimer() {
  pauseTimer();
  seconds = 0;
  localStorage.setItem('timerSeconds', seconds); 
  updateDisplay();
}


document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);


function addItem() {
  const input = document.getElementById('item-input');
  const item = input.value.trim();
  if (item === '') return;

  let items = JSON.parse(localStorage.getItem('highlightItems')) || [];
  items.push(item);
  localStorage.setItem('highlightItems', JSON.stringify(items));
  input.value = '';
  loadItems();
}
function addItem() {
  const input = document.getElementById('item-input');
  const item = input.value.trim();
  if (item === '') return;

  let items = JSON.parse(localStorage.getItem('highlightItems')) || [];
  items.push(item);
  localStorage.setItem('highlightItems', JSON.stringify(items));
  input.value = '';
  loadItems();
}

function loadItems() {
  const result = document.getElementById('result');
  const items = JSON.parse(localStorage.getItem('highlightItems')) || [];

  if (items.length > 0) {
    const list = document.createElement('ul');
    items.forEach((itemText) => {
      const li = document.createElement('li');
      li.textContent = itemText;
      list.appendChild(li);
    });
    result.appendChild(list);
  }
}


