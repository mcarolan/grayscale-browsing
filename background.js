let grayscale = false;

function stateMessage() {
  return { 'type': 'state', currentState: grayscale };
}

function sendToggleMessages(tabs) {
    for (let tab of tabs) {
        browser.tabs.sendMessage(tab.id, stateMessage()).catch(onError);
    }
}

function onError(error) {
    console.error(`Error: ${error}`);
}

function extensionButtonClicked() {
    grayscale = !grayscale;
    let iconPath = grayscale ? 'icons/icon_on.png' : 'icons/icon_off.png';
    browser.browserAction.setIcon({ path: iconPath }).then(() => {
	    browser.tabs.query({}).then(sendToggleMessages);
    });
}

function onReceiveMessage(message, sender, sendResponse) {
  if (message.type == 'stateQuery') {
    sendResponse(stateMessage());
  }
}

browser.browserAction.onClicked.addListener(extensionButtonClicked);
browser.runtime.onMessage.addListener(onReceiveMessage);
