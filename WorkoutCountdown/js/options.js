(function () {
    "use strict";
    var appData = Windows.Storage.ApplicationData.current.localSettings;

    var page = WinJS.UI.Pages.define("/options.html", {
        ready: function (element, options) {
            var audio = document.getElementById("audioFlag");
            var countdown = document.getElementById("countdown");
            var restInterval = document.getElementById("restInterval");

            if (appData.values.size > 0) {
                if (appData.values["audioFlag"] !== undefined) {
                    audio.checked = appData.values["audioFlag"];
                }
                if (appData.values["countdown"] !== undefined) {
                    for (var i = 0; i < countdown.length; i++) {
                        if (countdown[i].value == appData.values["countdown"]) {
                            countdown[i].selected = true;
                        }
                    }
                }
                if (appData.values["restInterval"] !== undefined) {
                    for (var i = 0; i < restInterval.length; i++) {
                        if (restInterval[i].value == appData.values["restInterval"]) {
                            restInterval[i].selected = true;
                        }
                    }
                }
            }

            audio.onchange = function () {
                playAudio = appData.values["audioFlag"] = audio.checked;
            };
            countdown.onchange = function () {
                countdownValue = appData.values["countdown"] = countdown.value;
            };
            restInterval.onchange = function () {
                restIntervalValue = appData.values["restInterval"] = restInterval.value;
            };
        },
        unload: function () {
            // Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            // Respond to changes in viewState.
        }
    });
})();