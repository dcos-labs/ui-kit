// ui-kit components that do DOM modifications on resize should register
// with resizeEventMananger using resizeEventMananger.add(callback) and
// resizeEventMananger.remove(callback) instead of attaching to
// window.addEventListener("resize") since this version is throttled by
// requestAnimationFrame

// Code adapter from https://developer.mozilla.org/en-US/docs/Web/Events/resize#requestAnimationFrame

let handlers: Array<() => void> = [],
  running = false;

// Runs all registered handlers on resize, unless awaiting requestAnimationFrame
function resize(): void {
  if (running) {
    return;
  }

  running = true;
  window.requestAnimationFrame(runHandlers);
}

// run the actual callbacks
function runHandlers(): void {
  handlers.forEach(handler => handler());
  running = false;
}

function addHandler(callback: () => void): void {
  handlers.push(callback);
}

function hasHandlers(): boolean {
  return Boolean(handlers.length);
}

function removeHandler(callback: () => void) {
  handlers = handlers.filter(existing => existing !== callback);
}

export default {
  // public method to add additional callback
  add: (handler: () => void, global = window): void => {
    if (!hasHandlers()) {
      // Lazy attach
      global.addEventListener("resize", resize);
    }
    addHandler(handler);
  },
  remove: (handler: () => void, global = window): void => {
    removeHandler(handler);

    if (!hasHandlers()) {
      global.removeEventListener("resize", resize);
      running = false;
    }
  }
};
