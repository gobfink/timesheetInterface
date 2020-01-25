function waitForElement(selector, callback) {
        console.log("Waiting for " + selector);
        if (document.querySelector(selector) == null) {
                window.setTimeout(function() {
                        waitForElement(selector, callback);
                }, 300);
        }
        else {
                callback();
        }
}

function createWokButton(buttonId, buttonText)
{
  var node = document.createElement("button");
  
  node.setAttribute('id', buttonId);
  node.textContent = buttonText;
  node.setAttribute('class', 'wok');
  node.setAttribute('style', 'border-color: purple; width: 135px');
  
  return node;
}

//var warningId = "#TMMTIMESHEET___msg";
var warningId = "#msgTextHdrReg";

waitForElement(warningId, function() {
	console.log("Finished waiting for: " + warningId);
});
/*
chrome.tabs.onMessage.addListener(function(request, sender, sendResponse) {

  alert('ignoreWarnings on page updated');
  if (request === 'addAcceptForeverButton') {
    var acceptForeverButton = createWokButton('acceptForeverButton', 'Accept Forever');
    document.getElementById('warndiv').appendChild(acceptForeverButton);
  }
});
*/

//on page change event
//if TMMTIMESHEET___msg is present
////if msg is not already present
//////create new button