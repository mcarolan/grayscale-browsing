(function () {
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    const grayscaleFilter = 'grayscale(1)';

    let initialValue = document.body.style.filter;

    function setFilter(value) {
        document.body.style.filter = value;
    }

    function handle(message) {
      if (message.type == 'state') {
        if (message.currentState)
          setFilter(grayscaleFilter);
        else
          setFilter(initialValue);
      }
    }

    browser.runtime.onMessage.addListener(handle);
    browser.runtime.sendMessage({ 'type': 'stateQuery' }).then(handle);

})();
