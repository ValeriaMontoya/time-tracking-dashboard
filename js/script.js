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

async function updateStats(period, periodLabel) {
  const data = await fetchData();

  data.forEach((element, i) => {
    currentTimeValues[i].textContent = `${element.timeframes[period].current}`;
    customPeriod[i].textContent = periodLabel;
    previousTimeValues[i].textContent = `${element.timeframes[period].previous}`;
  });
}

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const clickedButton = event.target;
    const period = clickedButton.id;

    buttons.forEach((button) =>
      button === clickedButton
        ? button.classList.add('profile__button--active')
        : button.classList.remove('profile__button--active')
    );

    switch (period) {
      case 'daily':
        updateStats(period, 'Yesterday');
        break;
      case 'weekly':
        updateStats(period, 'Last Week');
        break;
      case 'monthly':
        updateStats(period, 'Last Month');
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
