function Fader(elements, fadeTimeout, animationTime, name) {
  this.fadeTimeout   = fadeTimeout;
  this.animationTime = animationTime;
  this.name          = name;
  this.initialized   = false;

  var currentIndex   = 0,
      currentElement = elements[0];
      stackSize      = elements.length;

  this.incrementElementIndex = function() {
    currentIndex += 1;
    if (currentIndex >= stackSize) {
      currentIndex = 0;
    }
    currentElement = elements[currentIndex];
    return currentElement;
  }

  this.getCurrentElement = function() {
    return currentElement;
  }
}

Fader.prototype = (function() {

  function fadeToNext() {
    var currentElement = this.getCurrentElement(),
        nextElement    = this.incrementElementIndex();
    currentElement.style.zIndex = 2;
    nextElement.style.zIndex = 1;
    nextElement.style.display = 'block';
    fade.call(this, currentElement);
    this.currentElement = nextElement;
    queueNextFade.call(this);
  }

  function fade(element) {
    Effect.Fade(element, this.animationTime);
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
