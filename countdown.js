const targetDate = new Date('2024-04-19T10:00:00').getTime();

const daysEl = document.getElementById('days-number');
const hoursEl = document.getElementById('hours-number');
const minutesEl = document.getElementById('minutes-number');
const secondsEl = document.getElementById('seconds-number');

setInterval(() => {
  const now = new Date().getTime();
  const diffMs = (targetDate - now);
  const diffDays = Math.floor(diffMs / 86400000); // days
  const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
  const diffSecs = Math.round((((diffMs % 86400000) % 3600000) % 60000) / 1000); // seconds

  daysEl.innerText = diffDays;
  hoursEl.innerText = diffHrs.toString().padStart(2, '0'); // padStart to ensure 2 digits
  minutesEl.innerText = diffMins.toString().padStart(2, '0');
  secondsEl.innerText = diffSecs.toString().padStart(2, '0');
}, 1000);
