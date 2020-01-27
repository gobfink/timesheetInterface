var warningSelector = "#msgTextHdrReg #warndiv";

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

function acceptWarning()
{
	//var clickSelector = "#TMMTIMESHEET___msg #warndiv #woc"; //This one is for the cancel button - for testing
	var clickSelector = "#TMMTIMESHEET___msg #warndiv #wok";
	var closeSelector = "#TMMTIMESHEET___msg #closeM";
	
	document.querySelector(clickSelector).click()
	document.querySelector(closeSelector).click()
}


function onWarningMessage()
{
	console.log("Finished waiting for: " + warningSelector);
	
	var msgSelector = "#msgTextHdrReg .msgText .eLnk";	
	var messageNodes = document.querySelectorAll(msgSelector);
	var message = "";
	
	
	messageNodes.forEach(function (node) {
		message = message + " " + node.text 
	})
	
    chrome.storage.sync.get({ignoreList: []}, function(result){		
       		var ignoreList = result.ignoreList;
       		if (ignoreList != 'undefined') {	
       			ignoreList.forEach(function(item) { 
       				console.log("gotten - " + item)
       				//compare warnmessage with ignoreList
       				if (item === message)
       				{
           				//if found autoclick ok
       					acceptWarning()
       					console.log("message: " + message + " found in ignoreList! ignored!");
						return
       				}
       			});
       		}
       		//TODO hook waitForElement function up again
       
       	console.log("Warning message: " + message);
       	clickCallback = function (){
       		console.log("clickcall back function");
       		chrome.storage.sync.get({ignoreList: []}, function (result) {
       			var ignoreList = result.ignoreList;
       			if (!ignoreList.includes(message)){
       				ignoreList.push(message);
       				console.log("adding: " + message +" to ignoreList");
       			}
       			else {
       				console.log("ignoreList already contained - "+ignoreList);
       			}
       			
       			chrome.storage.sync.set({ignoreList: ignoreList}, function () {
       				ignoreList.forEach(function(item) { 
       				console.log("item - " + item)
       				});
       			});
       		});
       		//click ok
       		acceptWarning()
       	
           	// TODO hook button up again?
       	};
       	var acceptForeverButton = createWokButton('acceptForeverButton', 'Accept Forever', clickCallback);
       	document.getElementById('warndiv').appendChild(acceptForeverButton);
	
	//waitForElement(warningSelector, onWarningMessage);	
	});
}


waitForElement(warningSelector, onWarningMessage);

//if selector is present
////if warning is in ignorelist
//////click ok when warning pops up
////if not 
//////create new ignore button
//////// on click add messageText to ignore list

//also need to make a menu to clear