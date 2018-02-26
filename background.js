function sendToggleMessages(tabs) {
    for (let tab of tabs) {
        browser.tabs.sendMessage(tab.id, { 'command': 'toggle' }).catch(onError);
    }
}

function onError(error) {
    console.error(`Error: ${error}`);
}

function extensionButtonClicked() {
    browser.tabs.executeScript({file: '/content-script.js', allFrames: true}).then(() => {
        browser.tabs.query({active: true, currentWindow: true}).then(sendToggleMessages);
    });
}

browser.browserAction.onClicked.addListener(extensionButtonClicked);
