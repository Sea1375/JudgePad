var url = "https://docs.google.com/spreadsheets/d/18uGfzwt2jcoP3fmbEYfaX0WP8Q0HrE_8Pg7qBznQPGE/edit#gid=0";
var ss = SpreadsheetApp.openByUrl(url);
var ws = ss.getSheetByName("Sheet1");
var score;
var half = "0.5";
var finalScore;

var scoreArray = ["", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2", "J2", "K2", "L2", "M2"];
var sentArray = ["", "B3", "C3", "D3", "E3", "F3", "G3", "H3", "I3", "J3", "K3", "L3", "M3"];
var emailArray = ["", "B5", "C5", "D5", "E5", "F5", "G5", "H5", "I5", "J5", "K5", "L5", "M5"];
var judgeMessage = ["", "B8", "C8", "D8", "E8", "F8", "G8", "H8", "I8", "J8", "K8", "L8", "M8"];
var recorderMessage = ["", "B9", "C9", "D9", "E9", "F9", "G9", "H9", "I9", "J9", "K9", "L9", "M9"];


function realtimeMonitor(judgeNumber) {
  
  let realtime_value = {
    rmessage : ss.getRange(recorderMessage[judgeNumber]).getValue(),
    scores: ss.getRange("A2:M2").getValues()
  }
  
  return realtime_value;
  
}

function submit(current_score, judgeNumber) {
  
  var email = Session.getActiveUser().getEmail();
  
  ws.getRange(scoreArray[judgeNumber]).setValue(current_score);
  ws.getRange(sentArray[judgeNumber]).setValue("Sent");
  ws.getRange(emailArray[judgeNumber]).setValue(email);

}

function message(message, judgeNumber) {
  
  ws.getRange(judgeMessage[judgeNumber]).setValue(message);
  
}
