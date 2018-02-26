(function () {
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    const grayscaleFilter = 'grayscale(1)';

    function getFilter() {
        return document.body.style.filter;
    }    

    function setFilter(value) {
        document.body.style.filter = value;
    }

    function toggle() {
        if (getFilter() == grayscaleFilter) {
            setFilter('');        
        } else {
            setFilter(grayscaleFilter);
        }
    };

    browser.runtime.onMessage.addListener((message) => {
        if (message.command == 'toggle') {
            toggle();        
        }
    });
})();
