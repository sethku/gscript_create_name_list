//Edit these variables for the correct sheet names you want to use;
var dataSheetName = 'Data';
var resultSheetName = 'Results';

//A list of the result columns to use for the sorting function below
var column = ['A','B','C','D','E','F','G','H','I','J','K','L'];

function getNamesAndTickets() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  SpreadsheetApp.setActiveSheet(sheet.getSheetByName(dataSheetName));
  var data = sheet.getDataRange().getValues();

  var rows = [];

  for (var i = 0; i < data.length; i++){
    //var name = data[i][0];

    var sendData = data[i];

    var temp = addDataList(sendData);

    for(var k = 0; k < temp.length; k++){
      rows.push(temp[k]);
    }
  }

//current range to enter is hardcoded. This could be improved.
  var range = 'A2:M'+(rows.length+1);
  enterData(range, rows);

  for(var i = 0; i < column.length; i++){
    var colrange = column[i]+"2:"+column[i];
    var range = sheet.getRange(colrange);
    range.sort(i+1);
  }
}


function addDataList(data){
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  SpreadsheetApp.setActiveSheet(sheet.getSheetByName(resultSheetName));

  var name = data[0];
  var rows = [];

  for(var i=1; i < data.length; i++){
    qty = data[i];
    for(var k = 0; k < qty; k++){
      if(!Array.isArray(rows[k])){
        rows[k] = [];
      }
      rows[k][i - 1] = name;
    }
  }

//Makes sure all the rows to import are the same length but adding in a blank field.
  for(var i = 0; i < rows.length; i++){
    rows[i][data.length - 1] = '';
  }

  return rows;
}


function enterData(range, rows){
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  SpreadsheetApp.setActiveSheet(sheet.getSheetByName(resultSheetName));
  sheet.getRange(range).setValues(rows);
}
