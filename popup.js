let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {code: 'document.querySelectorAll("*").forEach(element => element.style.backgroundColor = "' + color + '" );'},
      tabs[1].id,
      {code: 'chrome.storage.sync.set({ "username" : "' + document.getElementById("USER").value' +"});
  });
};
//https://stackoverflow.com/questions/5364062/how-can-i-save-information-locally-in-my-chrome-extension