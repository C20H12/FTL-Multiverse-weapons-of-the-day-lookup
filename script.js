//single selection handeler
function onlyOne(checkbox) {
  var checkboxes = document.getElementsByName('advOpt1')
  checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false
  })
}
//change to secret theme slider
function changeTheme(){
  var theme = document.getElementsByTagName('link')[0];
  if (theme.getAttribute('href') == 'style.css') {
      theme.setAttribute('href', 'style_secret.css');
  } else {
      theme.setAttribute('href', 'style.css');
  }
}

//main variables required and including of libaries
var fs = require('fs');
var path = require('path');
var jsdom = require('jsdom');
const dom = new jsdom.JSDOM("");
const parser = new dom.window.DOMParser();

//main function that directs to different functions that ahndels searching for each category
function main(){
  document.getElementById('errorOp').innerHTML = '';

  var clearTable = document.getElementById("table").rows.length;
  while (clearTable>2){
    clearTable = document.getElementById("table").rows.length;
    document.getElementById("table").deleteRow(-1);
  }

  var mode;
  try{
    mode = document.querySelector('[name="modeSel"]:checked').value;
  }catch(error){
    return document.getElementById('errorOp').innerHTML = 'Mode not selected!';
  };

  if (mode=='drn'){
    return mainSeq('droneBlueprint');
  }else if (mode=='aug'){
    return mainSeq('augBlueprint');
  }else if (mode=='wep'){
    return mainSeq('weaponBlueprint')
  }
}


//main sequence function for searching
function mainSeq(bpTagName){
  var advOpt1 = document.querySelector("#adv1").checked; 
  var advOpt2 = document.querySelector("#adv2").checked; 
  var advOpt3 = document.querySelector("#adv3").checked;  
  var advOpt4 = document.querySelector("#adv4").checked;
  var priceInput= document.querySelector('#input').value;

  var table;
  var row;
  var cell1;
  var cell2;
  var cell3;
  //var filename = './MV52blueprints.xml';
  var filename = path.join(__dirname, 'MV52blueprints.xml');

  if (priceInput == ''|| !Number(priceInput)|| priceInput<0){
    return document.getElementById('errorOp').innerHTML = 'Price entered is not valid!';
  };

  if (advOpt2){
    filename = path.join(__dirname, 'MV52blueprints_addon.xml');
  }

  fs.readFile(filename, "utf-8", function(err, data) {

    const config = parser.parseFromString(data, "text/xml");
    const ftlTag = config.documentElement;
    var blueprints = ftlTag.childNodes;

    var blueprintTags = Array.prototype.filter.call(blueprints, blueprint => blueprint.nodeName === bpTagName);
    
    var itemPrice = [];
    var itemName = [];
    var itemRare = [];

    for (i in blueprintTags) {
      var currentTag = blueprintTags[i];
      var stats = currentTag.childNodes;
      for (j in stats) {
        var stat = stats[j];
        if ( stat.nodeName === "title" ) {
          itemName.push( stat.firstChild.nodeValue );
          break;
        }
      }
    }
  
    for (i in blueprintTags) {
      var currentTag = blueprintTags[i];
      var stats = currentTag.childNodes;
      var hasCost = Array.prototype.filter.call(stats, cost => cost.nodeName === "cost" );
      if (hasCost.length==0){
        itemPrice.push('0.00')
      }
      for (j in stats) {
        var stat = stats[j];
        if ( stat.nodeName === "cost" ) {
          itemPrice.push( stat.firstChild.nodeValue );
          break;
        }
      }
    }
  
    for (i in blueprintTags) {
      var currentTag = blueprintTags[i];
      var stats = currentTag.childNodes;
      var hasRare = Array.prototype.filter.call(stats, cost => cost.nodeName === "rarity" );
      if (hasRare.length==0){
        itemRare.push('0.00')
      }
      for (j in stats) {
        var stat = stats[j];
        if ( stat.nodeName === "rarity" ) {
            itemRare.push( stat.firstChild.nodeValue );
            break;
        }   
      }
    }

    
    var outputCounter = [];

    if (advOpt1 && advOpt3 && !advOpt4){
      for ( i in itemPrice ) {
        var price = itemPrice[i];
        var name = itemName[i];
        var rare = itemRare[i];
        if (priceInput==Math.floor(price*0.75)) {
          table = document.getElementById("table");
          row = table.insertRow(-1);
          cell1 = row.insertCell(0);
          cell2 = row.insertCell(1);
          cell3 = row.insertCell(2);
          cell1.innerHTML = price;
          cell2.innerHTML = name;
          cell3.innerHTML = rare;
          outputCounter.push('E');
        }
      }
    }else if (advOpt1 && advOpt4 && !advOpt3){
      for ( i in itemPrice ) {
        var price = itemPrice[i];
        var name = itemName[i];
        var rare = itemRare[i];
        if (priceInput==price) {
          table = document.getElementById("table");
          row = table.insertRow(-1);
          cell1 = row.insertCell(0);
          cell2 = row.insertCell(1);
          cell3 = row.insertCell(2);
          cell1.innerHTML = price;
          cell2.innerHTML = name;
          cell3.innerHTML = rare;
          outputCounter.push('E');;
        }
      }
    }else if (advOpt4 && !advOpt3 && !advOpt1){
      for ( i in itemPrice ) {
        var price = itemPrice[i];
        var name = itemName[i];
        var rare = itemRare[i];
        if (priceInput==price&& rare!=0) {
          table = document.getElementById("table");
          row = table.insertRow(-1);
          cell1 = row.insertCell(0);
          cell2 = row.insertCell(1);
          cell3 = row.insertCell(2);
          cell1.innerHTML = price;
          cell2.innerHTML = name;
          cell3.innerHTML = rare;
          outputCounter.push('E');
        }
      }
    }else if (advOpt1 && !advOpt3 && !advOpt4){
      for ( i in itemPrice ) {
        var price = itemPrice[i];
        var name = itemName[i];
        var rare = itemRare[i];
        if (priceInput==Math.floor(price*0.66)) {
          table = document.getElementById("table");
          row = table.insertRow(-1);
          cell1 = row.insertCell(0);
          cell2 = row.insertCell(1);
          cell3 = row.insertCell(2);
          cell1.innerHTML = price;
          cell2.innerHTML = name;
          cell3.innerHTML = rare;
          outputCounter.push('E');
        }
      }
    }else if (advOpt3 && !advOpt4 && !advOpt1){
      for ( i in itemPrice ) {
        var price = itemPrice[i];
        var name = itemName[i];
        var rare = itemRare[i];
        if (priceInput==Math.floor(price*0.75) && rare!=0) {
          table = document.getElementById("table");
          row = table.insertRow(-1);
          cell1 = row.insertCell(0);
          cell2 = row.insertCell(1);
          cell3 = row.insertCell(2);
          cell1.innerHTML = price;
          cell2.innerHTML = name;
          cell3.innerHTML = rare;
          outputCounter.push('E');
        }
      }
    }else{
      for ( i in itemPrice ) {
        var price = itemPrice[i];
        var name = itemName[i];
        var rare = itemRare[i];
        if (parseInt(priceInput)==Math.floor(price*0.66) && rare!=0) {
          table = document.getElementById("table");
          row = table.insertRow(-1);
          cell1 = row.insertCell(0);
          cell2 = row.insertCell(1);
          cell3 = row.insertCell(2);
          cell1.innerHTML = price;
          cell2.innerHTML = name;
          cell3.innerHTML = rare;
          outputCounter.push('E');
        }
      }
    }
    
    //wow the useless leftover feature is useful
    if (outputCounter.length==0){
      document.getElementById('errorOp').innerHTML = 'No matches found!';
    }
  });     
}
