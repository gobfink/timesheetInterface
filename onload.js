chrome.storage.local.get("counter", function(visits){
  visit_counter = visits.counter
  console.log("visits: ", visits)
  visit_counter++
  console.log("visit_counter after added", visit_counter)
  chrome.storage.local.set({"counter": visit_counter }, function () {
   console.log('Saved visit_counter', visit_counter); 
   alert('Visit Counter:' + visit_counter)
  });
});


