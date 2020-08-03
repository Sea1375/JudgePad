var url = "https://docs.google.com/spreadsheets/d/18uGfzwt2jcoP3fmbEYfaX0WP8Q0HrE_8Pg7qBznQPGE/edit#gid=0";

var Route = {};

var ss = SpreadsheetApp.openByUrl(url);
var ws = ss.getSheetByName("Sheet1");
var rmessage;

var recorderMessage = ["", "B9", "C9", "D9", "E9", "F9", "G9", "H9", "I9", "J9", "K9", "L9", "M9"];
var passwordArray = ["", "B6", "C6", "D6", "E6", "F6", "G6", "H6", "I6", "J6", "K6", "L6", "M6"];
var emailArray = ["", "B5", "C5", "D5", "E5", "F5", "G5", "H5", "I5", "J5", "K5", "L5", "M5"];

Route.path = function(route, index, password, callback) {
  if (index) {
    Route[route + index] = callback.bind(this, index, password);
  } else {
    Route[route] = callback;
  }
}


function doGet(e) {  
  Route.path('home', null, null, loadHome);
  for (var i = 0; i < 12; i++) {
    Route.path('judge', i + 1, e.parameters.pass, loadJudge);
  }
  if (Route[e.parameters.v]) {
    return Route[e.parameters.v]();
  } else {
    return render('home');
  }

}

function render(file, argsObject) {
  var tmp = HtmlService.createTemplateFromFile(file);
  if(argsObject){
    var keys = Object.keys(argsObject);
    keys.forEach(function(key){     
      tmp[key] = argsObject[key];
    });
  }
  return tmp.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function loadHome(){
  return render('home');
}

function loadJudge(index, password) {
  
  let user_email = Session.getActiveUser().getEmail();
  let spreadsheet_email = ws.getRange(emailArray[index]).getValue();
  let spreadsheet_password = ws.getRange(passwordArray[index]).getValue();
  
  if(user_email == spreadsheet_email && password == spreadsheet_password && password != '') {
    rmessage = ws.getRange(recorderMessage[index]).getValue();
    return render('judge', { rmessage: rmessage, judgeNumber: index});
  } else {
    return render('error');
  }
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
