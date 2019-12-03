chrome.storage.sync.get("counter", function(visits){
  if (typeof visits.counter === 'undefined'){
  	visits.counter=0
  }
  console.log("visits: ", visits, ",visits.counter: ",visits.counter)
  visits.counter++
  console.log("visit_counter after added", visits.counter)
  chrome.storage.sync.set({"counter": visits.counter }, function () {
   console.log('Saved visit_counter', visits.counter); 
   alert('Visit Counter: ' + visits.counter)
  });
});


