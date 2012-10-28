function Fader(elements, fadeTimeout, animationTime, name) {
  this.elements = elements;
  this.fadeTimeout = fadeTimeout;
  this.animationTime = animationTime;
  this.name = name;
  this.initialized = false;
  this.currentIndex = 0;
  this.currentElement = elements[0];
  this.stackSize = elements.length;
}

Fader.prototype = (function() {

  function fadeToNext() {
    var nextIndex = this.currentIndex + 1;
    if (nextIndex >= this.stackSize) {
      nextIndex = 0;
    }
    var nextElement = this.elements[nextIndex];
    this.currentElement.style.zIndex = 2;
    nextElement.style.zIndex = 1;
    nextElement.style.display = 'block';
    fade.call(this);
    this.currentElement = nextElement;
    this.currentIndex = nextIndex;
    queueNextFade.call(this);
  }

  function fade() {
    Effect.Fade(this.currentElement, this.animationTime);
  }

  function queueNextFade() {
    var self = this;
    setTimeout(
      function() { fadeToNext.call(self) },
      this.fadeTimeout
    );
  }

  return {
    constructor: Fader,

    init: function() {
      if (!this.initialized) {
        this.initialized = true;
        queueNextFade.call(this);
        return this;
      }
    }

  }

})();
