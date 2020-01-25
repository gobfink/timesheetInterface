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

function createWokButton(buttonId, buttonText, onclickCallback)
{
  var node = document.createElement("button");
  
  node.setAttribute('id', buttonId);
  node.textContent = buttonText;
  node.setAttribute('class', 'wok');
  node.setAttribute('style', 'border-color: purple; width: 135px');
  node.onclick = onclickCallback;
  
  return node;
}

var warningSelector = "#msgTextHdrReg #warndiv";
waitForElement(warningSelector, function() {
	console.log("Finished waiting for: " + warningSelector);
	
	var msgSelector = "#msgTextHdrReg .msgText .eLnk"	
	var messageNodes = document.querySelectorAll(msgSelector);
	var message = "";
	messageNodes.forEach(function (node) {
		message = message + " " + node.text 
	})

//	chrome.storage.local.get(message, function(){

	console.log("Warning message: " + message);
	clickCallback = function (){
		console.log("clickcall back function");
	};
	var acceptForeverButton = createWokButton('acceptForeverButton', 'Accept Forever', clickCallback);
	document.getElementById('warndiv').appendChild(acceptForeverButton);

});

//if selector is present
////if warning is in ignorelist
//////click ok when warning pops up
////if not 
//////create new ignore button
//////// on click add messageText to ignore list

//also need to make a menu to clear