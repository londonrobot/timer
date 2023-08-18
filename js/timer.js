export default class Timer {
  constructor(time, elementIds = {}) {
    this.elements = {
      minutesTens: document.getElementById(elementIds.minutesTens || 'digit1'),
      minutesOnes: document.getElementById(elementIds.minutesOnes || 'digit2'),
      secondsTens: document.getElementById(elementIds.secondsTens || 'digit3'),
      secondsOnes: document.getElementById(elementIds.secondsOnes || 'digit4'),
    };

    this.time = time;
    this.isRunning = false;
    this.isPaused = false;
    this.startTime = null;
    this.elapsedTime = 0;
    this.updateDisplay();
    this.eventHandlers = {
      timeup: [],
    };
  }

  start() {
    
    if (this.isPaused) {
      // console.log('paused start');

      this.startTime = Date.now() - this.elapsedTime;
      this.isPaused = false;
      this.isRunning = true;
    } else {
      // console.log('not paused start');
      this.startTime = Date.now();
      this.elapsedTime = 0;
      this.isRunning = true;
    }
    this.requestAnimationFrame();
  }

  pause() {
    this.isPaused = true;
    this.isRunning = false;
  }

  stop() {
    this.isRunning = false;
    this.isPaused = false;
    this.elapsedTime = 0;
    this.updateDisplay();
  }

  restart(newTime) {
    this.stop();
    this.time = newTime;
    this.updateDisplay();
  }

  requestAnimationFrame() {
    if (!this.isRunning) return;

    const currentTime = Date.now();
    this.elapsedTime = currentTime - this.startTime;

    if (this.elapsedTime >= this.time) {
      this.isRunning = false;
      this.updateDisplay();
      this.emit('timeup');
      return;
    }

    this.updateDisplay();

    requestAnimationFrame(() => {
      this.requestAnimationFrame();
    });
  }

  updateDisplay() {
    const remainingTime = Math.max(this.time - this.elapsedTime, 0);
    const minutes = Math.floor(remainingTime / 60000);
    const seconds = Math.floor((remainingTime % 60000) / 1000);

    this.elements.minutesTens.innerText = Math.floor(minutes / 10);
    this.elements.minutesOnes.innerText = minutes % 10;
    this.elements.secondsTens.innerText = Math.floor(seconds / 10);
    this.elements.secondsOnes.innerText = seconds % 10;
  }

  // events
  addEventListener(eventName, handler) {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(handler);
  }

  removeEventListener(eventName, handler) {
    if (!this.eventHandlers[eventName]) {
      return;
    }
    const index = this.eventHandlers[eventName].indexOf(handler);
    if (index >= 0) {
      this.eventHandlers[eventName].splice(index, 1);
    }
  }

  emit(eventName, data) {
    if (!this.eventHandlers[eventName]) {
      return;
    }
    this.eventHandlers[eventName].forEach((handler) => {
      handler(data);
    });
  }
}
