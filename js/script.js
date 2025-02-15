const buttons = document.querySelectorAll('.profile__button');
const currentTimeValues = document.querySelectorAll('.stats__current');
const customPeriod = document.querySelectorAll('.stats__period');
const previousTimeValues = document.querySelectorAll('.stats__value');

async function fetchData() {
  try {
    const response = await fetch('/data.json');
    return response.json();
  } catch (error) {
    console.error(`Could not get data: ${error}`);
  }
}

function updateStats(data, selectedPeriod, periodLabel) {
  data.forEach((element, i) => {
    currentTimeValues[i].textContent = `${element.timeframes[selectedPeriod].current}`;
    customPeriod[i].textContent = periodLabel;
    previousTimeValues[i].textContent = `${element.timeframes[selectedPeriod].previous}`;
  });
}

buttons.forEach((button) => {
  button.addEventListener('click', async (event) => {
    const period = event.target.id;
    const data = await fetchData();

    buttons.forEach((button) => button.classList.remove('profile__button--active'));
    event.target.classList.add('profile__button--active');

    switch (period) {
      case 'daily':
        updateStats(data, 'daily', 'Yesterday');
        break;
      case 'weekly':
        updateStats(data, 'weekly', 'Last Week');
        break;
      case 'monthly':
        updateStats(data, 'monthly', 'Last Month');
        break;
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const defaultButton = document.getElementById('weekly');
  if (defaultButton) {
    defaultButton.click();
  }
});
