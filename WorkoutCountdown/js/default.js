// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll());

            var startButton = document.getElementById("startButton");
            startButton.addEventListener("click", start, false);

            var stopButton = document.getElementById("stopButton");
            stopButton.addEventListener("click", stop, false);
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };


    var countdownSetting;
    var intervalSetting;

    var currentCountdown;
    var currentInterval;

    var running;

    function start(eventInfo) {
        document.getElementById("startButton").style.display = "none";
        document.getElementById("stopButton").style.display = "inline";

        countdownSetting = document.getElementById("countdownSeconds").value;
        currentCountdown = countdownSetting;
        intervalSetting = document.getElementById("restIntervalSeconds").value;
        currentInterval = intervalSetting;

        showCountdownTime();
        running = true;
        setTimeout(updateCountdown, 1000);
    }

    function stop(eventInfo) {
        running = false;
        clearTimeout(updateCountdown);
        document.getElementById("stopButton").style.display = "none";
        document.getElementById("startButton").style.display = "inline";
    }

    function updateCountdown() {
        if (!running)
            return;

        currentCountdown--;
        showCountdownTime();
        setTimeout(updateCountdown, 1000);
    }

    function showCountdownTime() {
        document.getElementById("countdown").innerText = currentCountdown;
    }

    function showIntervalTime() {
        document.getElementById("countdown").innerText = currentCountdown;
    }

    app.start();
})();
