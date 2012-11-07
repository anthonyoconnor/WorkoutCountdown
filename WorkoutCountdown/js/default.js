// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onsettings = function (e) {
        e.detail.applicationcommands = { "options": { title: "Options", href: "/options.html" } };
        WinJS.UI.SettingsFlyout.populateSettings(e);
    }

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // Tapplication has been newly launched. 
            } else {
                // application has been reactivated from suspension.

                var appData = Windows.Storage.ApplicationData.current.localSettings;

                if (appData.values.size > 0) {
                    if (appData.values["audioFlag"] !== undefined) {
                        playAudio = appData.values["audioFlag"];
                    }
                    if (appData.values["countdown"] !== undefined) {
                        countdownValue = appData.values["countdown"];
                    }
                    if (appData.values["restInterval"] !== undefined) {
                        restIntervalValue = appData.values["restInterval"];
                    }
                }
            }
        }
        args.setPromise(WinJS.UI.processAll());

        var startButton = document.getElementById("startButton");
        startButton.addEventListener("click", start, false);

        var stopButton = document.getElementById("stopButton");
        stopButton.addEventListener("click", stop, false);

        document.onkeyup = onkeyup;
    }

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
        countdownSetting = countdownValue;
        currentCountdown = countdownSetting;
        intervalSetting = countdownValue;
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
            playBeep();
            showIntervalTime()
            setTimeout(updateIntervalCountdown, defaultIntervalTime);
            currentCountdown = countdownSetting;
        }
        else {
            showCountdownTime();
            setTimeout(updateCountdown, defaultIntervalTime);
        }
    }

    function playBeep() {
        if (playAudio) {
            var beep = document.getElementById('beep');
            beep.play();
        }
    }

    function updateIntervalCountdown() {
        if (!running)
            return;

        currentInterval--;

        if (currentInterval == 0) {
            playBeep();
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
        showTime(currentCountdown, countdownSetting, false, "green");
    }

    function showIntervalTime() {
        showTime(currentInterval, intervalSetting, true, "blue");
    }

    function showTime(currentTime, totalTime, increase, colour) {
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;

        var maxSize = (canvas.width < canvas.height ? canvas.width : canvas.height) / 2;
        var minSize = 130;
        var variableAmount = maxSize - minSize;
        var percentage = (currentTime / totalTime * 100);
        var amountToShow = variableAmount / 100 * percentage;

        var fullAmountToShow = amountToShow + minSize

        if (increase == true) {
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

var playAudio = true;
var countdownValue = 60;
var restIntervalValue = 15;

