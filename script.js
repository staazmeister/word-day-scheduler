//Moment JS shows current date/time within the jumbotron header
function clock() {
    var date = moment().format('dddd, MMMM Do, YYYY - h:mm:ss a');
    $('#currentDay').html(date);
}

setInterval(clock, 1000);

//This feature allows you to clear all stored data from local storage
$(`<button type="button" class="btn btn-danger"></button>`).text("Clear Schedule").appendTo(".clear");

$(".clear").on("click", function(event) {
    event.preventDefault();
    localStorage.clear();
    location.reload();
});

//The IF/ELSE statments allow the app to color code each scheduled activity as Present, Past, or Future
function timeBlockTracker() {
    var currentHour = moment().hour();

    $(".time-block").each(function() {
        var blockTime = parseInt($(this).attr("id"));

        if (blockTime > currentHour) {
            $(this).addClass("future");
        } else if (blockTime === currentHour) {
            $(this).addClass("present");
        } else {
            $(this).addClass("past");
        }
    })
};

//What the save button is activated with a "click", data is saved to the local storage 
$(".saveBtn").on("click", function() {

    var timeBlock = $(this).siblings(".hour").text();
    var description = $(this).siblings(".workTask").val();

    localStorage.setItem(timeBlock, description);
});

//This function allows all saved data from the user to be recalled and reflected on the page
function workSchedule() {

    $(".hour").each(function() {
        var blockTime = $(this).text();
        var currPlan = localStorage.getItem(blockTime);

        if (currPlan !== null) {
            $(this).siblings(".workTask").val(currPlan);
        }
    });
}

timeBlockTracker();
workSchedule();