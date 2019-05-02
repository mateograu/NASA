
$(document).ready(function(){
    for(var i = 0; i < 22; i++){
        $("#day").append("<option>" + (i + 10) + "</option>");
    }

    for(var a = 0; a < 25; a++){
        $("#year").append("<option>" + (a + 1995) + "</option>");
    }
});

function search(){
    $("#result").empty();
    $("#title").empty();

    var date = getDate();
    if (date === false){
        alert("Please try a different date");
    }
    $.ajax({

        url: "https://api.nasa.gov/planetary/apod?api_key=Mr7fFrMYwPML80pvq6UKF49pLjhB5ARYB91BUGtO&date=" + date,
        success: function(result){
            console.log(result);
            display(result, date);
        }

    });
}


function getDate(){
    var month = $("#month").val();
    var day = $("#day").val();
    var year = $("#year").val();
    //check date exists

    var date = year + "-" + month + "-" + day;
    if(verifyDate(date) === false){
        return false;
    }
    return date;
}

function display(result, day){
    var date = makeDate(day);
    var title = $("#title");
    var div = $("#result");

    title.append("<span>" + date + "</span>");
    title.append("<span>" + result.title + "</span>");

    div.append("<div><img id='img' src=" + result.hdurl + "></div>");
    div.append("<div>" + result.explanation + "</div>");

}

function makeDate(day){
    var parts = day.split("-");
    var month = "";
    switch(parts[1]){
        case "01":
            month = "January";
            break;
        case "02":
            month = "February";
            break;
        case "03":
            month = "March";
            break;
        case "04":
            month = "April";
            break;
        case "05":
            month = "May";
            break;
        case "06":
            month = "June";
            break;
        case "07":
            month = "July";
            break;
        case "08":
            month = "August";
            break;
        case "09":
            month = "September";
            break;
        case "10":
            month = "October";
            break;
        case "11":
            month = "November";
            break;
        case "12":
            month = "December";
            break;
    }
    return month + " " + parts[2] + ", " + parts[0] + ": ";

}

function verifyDate(date){
    var parts = date.split("-");
    if(parts[0] === "1995"){
        if(parseInt(parts[1]) < 6){
            return false;
        }else if(parseInt(parts[1]) === 6){
            if(parseInt(parts[2]) < 16){
                return false;
            }
        }
    }
    if(parts[1] === "04" || parts[1] === "06" || parts[1] === "09" || parts[1] === "11"){
        if(parts[2] === "31"){
            return false;
        }
    }
    if(parts[1] === "02"){
        if(parseInt(parts[0]) % 4 === 0){
            if(parseInt(parts[2]) > 29){
                return false;
            }
        }else{
            if(parseInt(parts[2]) > 28){
                return false;
            }
        }
    }

    return true;
}

//thanks for an amazing year MR.Alb!//