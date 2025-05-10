initializeApp();

async function initializeApp() {
  await addEventListenersToButtons();
  initializeStatsWithWeeklyValues();
}

async function addEventListenersToButtons() {
  const buttons = document.querySelectorAll('.profile__button');

  buttons.forEach((button) => {
    button.addEventListener('click', async (event) => {
      await handleButtonClick(buttons, event);
    });
  });
}

async function handleButtonClick(buttons, event) {
  const clickedButton = event.target;
  const period = clickedButton.id;

  buttons.forEach((button) =>
    button === clickedButton
      ? button.classList.add('profile__button--active')
      : button.classList.remove('profile__button--active')
  );

  await updateStatsByPeriod(period);
}

async function updateStatsByPeriod(period) {
  switch (period) {
    case 'daily':
      await updateStats(period, 'Yesterday');
      break;
    case 'weekly':
      await updateStats(period, 'Last Week');
      break;
    case 'monthly':
      await updateStats(period, 'Last Month');
      break;
  }
}

async function updateStats(period, periodLabel) {
  const currentTimeValues = document.querySelectorAll('.stats__current');
  const customPeriod = document.querySelectorAll('.stats__period');
  const previousTimeValues = document.querySelectorAll('.stats__value');

  const data = await fetchData();

  data.forEach((element, i) => {
    currentTimeValues[i].textContent = `${element.timeframes[period].current}`;
    customPeriod[i].textContent = periodLabel;
    previousTimeValues[i].textContent = `${element.timeframes[period].previous}`;
  });
}

async function fetchData() {
  try {
    const response = await fetch('/data.json');
    return response.json();
  } catch (error) {
    console.error(`Could not get data: ${error}`);
    throw error;
  }
}

function initializeStatsWithWeeklyValues() {
  const defaultButton = document.getElementById('weekly');

  if (defaultButton) {
    defaultButton.click();
  }
}
