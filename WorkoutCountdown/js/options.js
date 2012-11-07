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
                    countdown.selectedIndex = appData.values["countdown"];
                }
                if (appData.values["restInterval"] !== undefined) {
                    countdown.selectedIndex = appData.values["restInterval"];
                }
            }

            audio.onchange = function () {
                appData.values["audioFlag"] = audio.checked;
            };
            countdown.onchange = function () {
                appData.values["countdown"] = countdown.selectedIndex;
            };
            restInterval.onchange = function () {
                appData.values["restInterval"] = restInterval.selectedIndex;
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
