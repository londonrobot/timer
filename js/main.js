import Timer from './timer.js';

/*
  Можно инициализировать просто временем.
  Если в html разместить 4 элемента с id 'digit1', 'digit2', 'digit3', 'digit4', 
  то все само заработает (время по умолчанию разместится в этих id). 
  */
 const timer = new Timer(10000);
 
 //  Но можно передать вторым параметром объект со своими id элементов
const timer2 = new Timer(10000, {
  minutesTens: 'digit11', // десятки минут
  minutesOnes: 'digit22', // единицы минут
  secondsTens: 'digit33', // десятки секунд
  secondsOnes: 'digit44', // единицы секунд
});

// подписка на событие окончания таймера
timer.addEventListener('timeup', log);


// старт таймера
document.querySelector('.startBtn').addEventListener('click', () => {
  timer.start();
  document.querySelector('.timer-end').style.opacity = 0;
});

// пауза
document.querySelector('.pauseBtn').addEventListener('click', () => {
  timer.pause();
});

// стоп
document.querySelector('.stopBtn').addEventListener('click', () => {
  timer.stop();
  document.querySelector('.timer-end').style.opacity = 0;
});

// можно удалять ивент листенер
// document.querySelector('.removeListener').addEventListener('click', () => {
//   timer.removeEventListener('timeup', log);
// });

function log() {
  document.querySelector('.timer-end').style.opacity = 1;
}