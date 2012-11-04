﻿// For an introduction to the Blank template, see the following documentation:
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

            document.onkeyup = onkeyup;
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

    function onkeyup(e) {
        var unicode = e.keyCode ? e.keyCode : e.charCode
        if (unicode == 32) {
            if (running) {
                stop();
            }
            else {
                start();
            }
        }
    }

    var defaultIntervalTime = 1000;
    var countdownSetting;
    var intervalSetting;

    var currentCountdown;
    var currentInterval;

    var running;

    function start(eventInfo) {
        document.getElementById("startButton").style.display = "none";
        document.getElementById("stopButton").style.display = "inline";

        reset();

        running = true;
        setTimeout(updateCountdown, defaultIntervalTime);
    }

    function stop(eventInfo) {
        running = false;
        reset();
        document.getElementById("stopButton").style.display = "none";
        document.getElementById("startButton").style.display = "inline";
    }

    function reset() {
        countdownSetting = document.getElementById("countdownSeconds").value;
        currentCountdown = countdownSetting;
        intervalSetting = document.getElementById("restIntervalSeconds").value;
        currentInterval = intervalSetting;

        showCountdownTime();

        clearTimeout(updateCountdown);
        clearTimeout(updateIntervalCountdown);
    }

    function updateCountdown() {
        if (!running)
            return;

        currentCountdown--;

        if (currentCountdown == 0) {
            showIntervalTime()
            setTimeout(updateIntervalCountdown, defaultIntervalTime);
            currentCountdown = countdownSetting;
        }
        else {
            showCountdownTime();
            setTimeout(updateCountdown, defaultIntervalTime);
        }
    }

    function updateIntervalCountdown() {
        if (!running)
            return;

        currentInterval--;

        if (currentInterval == 0) {
            //play beep
            showCountdownTime()
            setTimeout(updateCountdown, defaultIntervalTime);
            currentInterval = intervalSetting;
        }
        else {
            showIntervalTime();
            setTimeout(updateIntervalCountdown, defaultIntervalTime);
        }
    }

    function showCountdownTime() {
        showTime(currentCountdown, countdownSetting, false, "red");
    }

    function showIntervalTime() {
        showTime(currentInterval, intervalSetting, true, "blue");
    }

    function showTime(currentTime, totalTime, increase, colour) {
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;

        

        var maxSize = (canvas.width < canvas.height ? canvas.width : canvas.height)/2;
        var minSize = 130;
        var variableAmount = maxSize - minSize;
        var percentage = (currentTime/totalTime  * 100);
        var amountToShow = variableAmount / 100 * percentage;

        var fullAmountToShow = amountToShow + minSize
        
        if (increase == true)
        {
            fullAmountToShow = (maxSize - fullAmountToShow) + minSize;
        }
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.beginPath();
        context.fillStyle = colour;
 
        context.arc(centerX, centerY, fullAmountToShow, 0, 2 * Math.PI, true);
        context.fill();

        context.fillStyle = "white";
        context.font = "200px Segoe UI";

        var text = currentTime.toString();
        var textWidth = context.measureText(text).width;
        context.fillText(text, centerX - textWidth / 2, centerY + 75);
    }

    function showDebugLines() {
        context.strokeStyle = "red";
        context.beginPath();
        context.moveTo(centerX, 0);
        context.lineTo(centerX, canvas.height);
        context.moveTo(0, centerY);
        context.lineTo(canvas.height, centerY);

        context.stroke();
    }

    app.start();
})();
