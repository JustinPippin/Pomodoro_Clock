$(function() {
    let clock = new Clock();
    clock.displayCurrentTime();
    clock.displaySessionTime();
    clock.displayBreakTime();
    clock.displaySessionCount();

    //Event Listeners
    $(".time-session .plus").click(function() {
        clock.changeSessionTime("add");
    });
    $(".time-session .minus").click(function() {
        clock.changeSessionTime("subtract");
    });
    $(".time-session .plus").click(function() {
        clock.changeSessionTime("add");
    });
    $(".time-break .minus").click(function() {
        clock.changeSessionTime("subtract");
    });
});
function Clock() {
    var startTime = 1500; //Starting value for our timer in seconds
        currentTime = 1500; //Current value of our timer in seconds
        seesionTime = 1500; //Length of a session in seconds
        breakTime = 1500;
        sessionCount = 0;
        mode = "Session";
        active = false; //Keeps track of whether the clock is running or not
}

        //DISPLAY FUNCTIONS

    //Function to convert a number of seconds into a formatted time string
    function formatTime(secs) {
        var result = "";
        let seconds = secs % 60;
        let minutes = parseInt(secs / 60) % 60;
        let hours = parseInt(secs / 3600);
        //Function adds leading zeroes if minutes/seconds are less than 10
        function addLeadingZeroes(time) {
            if (time < 10) {
                return "0" + time;
            } else {
                return time;
            }
        }
        //If we have a value for hours greater than 0, we need to show it on our time output
        if (hours > 0) {
            result += (hours + ":");
        }
        //Build up the result string with minutes and seconds
        result += (addLeadingZeroes(minutes) + ":" + addLeadingZeroes(seconds));
        //Return the result string
        return result;
    }
    //Function to display the time remaining on the timer
    this.displayCurrentTime = function() {
        $('.main-display').text(formatTime(startTime));
    }

    //Function to display the session time
    this.displaySessionTime = function() {
        $('.time-session-display').text(parseInt(sessionTime / 60) + " min.");
    }

    //Function to display the current time
    this.displayBreakTime = function() {
        $('.time-break-display').text(parseInt(sessionTime / 60) + " min.");
    }

    //Function to display the session count test
    this.displaySessionCount = function() {
        if (sessionCount === 0) {

        //If our session count is 0, we should show the text Pomodoro Clock

            $('.session-count').html("<h2>Pomodoro Clock<h2>")
        } else if (mode === "Session") {

        //If our session count is greater than 0 and we're in a session, we should show which session we're in

        $('.session-count').html("<h2>Session " + sessionCount + "</h2>");

        } else if (mode === "Break") {

        //If we're in a break, we should show the text Break

        $('.session-count').html("<h2>Break</h2>");

        }
    }

    //CHANGE TIME FUNCTIONS

    //Function to add or subtract 60 seconds from the session time whenever the plus or minus buttons are interacted with
    this.changeSessionTime = function() {
        if (!active) {
            if (command === "add") {
                //Add a minute to our session time
                sessionTime += 60;
            } else if (sessionTime > 60) {
                //If session time is greater than 1 minute, subtract a minute from it
                sessionTime -= 60;
            }
            currentTime = sessionTime;
            startTime = sessionTime;
            this.displaySessionTime();
            this.displayCurrentTime();
        }
    }

    //Function to add or remove 60 seconds from the break time when the plus or minus buttons are interacted with
    this.changeBreakTime = function(command) {
        if (!active) {
            if (command === "add") {
                breaktime += 60;
             } else if (breakTime > 60)  {
                 breakTime -= 60;
             }
             this.displayBreakTime();
        }
    }