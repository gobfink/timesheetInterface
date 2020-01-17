chrome.storage.sync.get("counter", function(visits){
  if (typeof visits.counter === 'undefined'){
  	visits.counter=0
  }
  visits.counter++
  chrome.storage.sync.set({"counter": visits.counter }, function () {
   console.log('Saved visit_counter:', visits.counter); 
  });
});