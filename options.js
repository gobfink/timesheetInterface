let page = document.getElementById('buttonDiv');
const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
function constructOptions(kButtonsColors) {
  for (let item of kButtonColors) {
    let button = document.createElement('button');
    button.style.backgroundColor = item;
    button.addEventListener('click', function() {
      chrome.storage.sync.set({color: item}, function() {
        console.log('color is ' + item);
      })
    });
    page.appendChild(button);
  }
  let clear_button = document.createElement('button')
  clear_button.addEventListener('click', function() {
   chrome.storage.sync.clear(function(){
	   alert ('Cleared sync storage')
   });  
  /*  chrome.storage.sync.remove("counter", function() {
      alert('Cleared Counter');
  */  
  });
  page.appendChild(clear_button);
}
constructOptions(kButtonColors);
