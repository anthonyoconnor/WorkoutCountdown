(function () {
    "use strict";
    var page = WinJS.UI.Pages.define("/audio.html", {
        ready: function (element, options) {
            var element = document.getElementById("audioCheckbox");
            element.checked = playAudio;
        }
    });

})();
