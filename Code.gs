//Edit these variables for the correct sheet names you want to use;
var dataSheetName = 'Data';
var resultSheetName = 'Results';
var column = ['A','B','C','D','E','F','G','H','I','J','K','L'];


function addNamesToList(name, qty, column){
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  SpreadsheetApp.setActiveSheet(sheet.getSheetByName(resultSheetName));
  
  var range = sheet.getRange(1,column);
  console.log(range.getNumRows());
  SpreadsheetApp.setActiveRange(range);
  

  for(var i = 0; i < qty; i++){
    sheet.appendRow([name]);
  }
}

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

  console.log(rows);
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

  for(var i = 0; i < rows.length; i++){
    rows[i][data.length - 1] = '';
  }

  return rows;
  /*
  var rowsLength = rows.length;
  console.log("rowlen: "+rowsLength);

  if(rows.length > 0){
    var range = 'A2:M'+(rowsLength+1);
    console.log(range);
    sheet.getRange(range).setValues(rows);
  }
  /*
 for(var i = 0; i < rows.length; i++){
    sheet.appendRow(rows[i]);
  }
  */
}

function enterData(range, rows){
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  SpreadsheetApp.setActiveSheet(sheet.getSheetByName(resultSheetName));

  console.log(rows);
  console.log(range);

  sheet.getRange(range).setValues(rows);
}
