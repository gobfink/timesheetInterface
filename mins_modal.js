"use strict";

var hourInputSelector = ".tDFNum";
var minsModalSelector = ".minsModal";
var digitsAfterPoint = 1;

var ryan_namespace = {
        setUpMinsModal: function () {
                console.log("Injecting mins_modal resources");
                injectResource("head", "/mins_modal.css", undefined);
                injectResource("body", "/mins_modal.html", undefined);
                //TODO add click/keyboard event handlers to modal
                
                waitForElement(hourInputSelector, function() {
                        var hourInputs = document.querySelectorAll(hourInputSelector);
                        console.log("Attaching focus event listeners to Costpoint inputs");
                        hourInputs.forEach(function(hourInput) {
                                attachModalListener(hourInput);
                        });
                });
        },

        attachModalHandler: function (hourInput) {
                hourInput.addEventHandler("focus", function(e) {
                        var minsModal = document.querySelector(minsModalSelector);
                        updateModalSubmitTarget(minsModal, hourInput);
                        minsModal.showModal()
                });
        },

        updateModalSubmitTarget: function (formParent, target) {
                var form = formParent.querySelector("form");
                form.addEventListener("submit", function() {
                        insertHours(FormData(form), target);
                })
        },

        insertHours: function (formData, target) {
                console.log("Converting minutes to hours and inserting.");
                wholeHours = formData.get("hours");
                var mins = formData.get("minutes");
                var decimalHours = wholeHours + (mins / 60);
                target.value = decimalHours.toFixed(digitsAfterPoint);
                var minsModal = document.querySelector(minsModalSelector);
                minsModal.hideModal();
        },

        injectResource: function (parent, resource, setup) {
                fetch(chrome.extension.getURL(resource))
                        .then(response => response.text())
                        .then(data => {
                               document.querySelector(parent).innerHTML += data;
                               if (setup) {
                                       setup();
                               }
                        }).catch(err => {
                               console.log(err);
                        });
        },

        waitForElement: function (selector, callback) {
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
}

ryan_namespace.setUpMinsModal();
