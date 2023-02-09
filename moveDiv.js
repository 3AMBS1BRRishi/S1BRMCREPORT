let clipboard1 = new ClipboardJS('#buttoncopy')

const strikeThroughIfNeq = (a, b, text) => (a == b) ? text : "";
const getFormattedDateTime = (element) => {
    const dt = new Date($(element).val());
    return `${dt.getDate().toString().padStart(2, '0')}/${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt.getFullYear()} ${dt.getHours().toString().padStart(2, '0')}${dt.getMinutes().toString().padStart(2, '0')}hrs`;
};

const getFormattedDate = (element) => {
    const dt = new Date($(element).val());
    return `${dt.getDate().toString().padStart(2, '0')}/${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt.getFullYear()}`;
};

function generateReport() {
        // Details
        const rank = $("#rank").val();
        const name = $("#name").val();
        var nric = $("#nric").val();
        nric = nric.replace(nric.substring(1,5), "XXXX")
        const depot = $("#dpbr")[0].children[$("#dpbr")[0].selectedIndex].innerHTML;
        const mcduration = $("#mcduration").val();
        const mctype = $("#mctype")[0].children[$("#mctype")[0].selectedIndex].innerHTML;
        const startdate = $("#startdate").val();
        const enddate = $("#enddate").val();
        const appliedess = $("#appliedess").val();

        var incidentStringSpool = `*Good Day S1 BR, this is ${depot} MC report*\n`;
        incidentStringSpool += `*Rank/Name:* ${rank} ${name}\n`;
        incidentStringSpool += `*NRIC:* ${nric}\n`;
        incidentStringSpool += `*MC Type:* ${mctype}\n`;
        incidentStringSpool += `*Duration:* ${mcduration}\n`;
        incidentStringSpool += `*Date of MC:* ${getFormattedDate("#startdate")} - ${getFormattedDate("#enddate")}\n`;
        incidentStringSpool += `*Applied on ESS:* ${appliedess}`;
        $("#whatsappmsg").val(incidentStringSpool);
}

function myFunctionAlert() {
    alert("Copied the text!");
    return false;
}


// VALIDATION

const rank = document.getElementById('rank')
const name = document.getElementById('name')
const nric = document.getElementById('nric')
const mcresult = document.getElementById('mcduration')

document.getElementById("startdate").addEventListener("change", function() {
  var input = this.value;
  var dateEntered = new Date(input);

  mcresult.value = input
  // console.log(input); //e.g. 2015-11-13
  // console.log(dateEntered); //e.g. Fri Nov 13 2015 00:00:00 GMT+0000 (GMT Standard Time)
});

document.getElementById("enddate").addEventListener("change", function() {
  var input = new Date(this.value);
  // var dateEntered = new Date(input);

  var startdateresult = new Date(mcresult.value)

  console.log(startdateresult)
  console.log(input)

  var Difference_In_Time = input.getTime() - startdateresult.getTime()

  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  console.log(Difference_In_Days)
      
  mcresult.value = Difference_In_Days + ' days'
  // console.log(input); //e.g. 2015-11-13
  // console.log(dateEntered); //e.g. Fri Nov 13 2015 00:00:00 GMT+0000 (GMT Standard Time)
});

// const startdate = document.getElementById('startdate')
// const enddate = document.getElementById('enddate')







form.addEventListener('submit', e => {
	e.preventDefault();
	
	checkInputs();
});


function nricValidator(nricInput) {
    // validation rules
    const nricRegex = /(\D)(\d{7})(\D)/;
    const nricTypeRegex = /S|T|F|G/;
    const weightArr = [2, 7, 6, 5, 4, 3, 2];
    const nricLetterST = ['J', 'Z', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
    const nricLetterFG = ['X', 'W', 'U', 'T', 'R', 'Q', 'P', 'N', 'M', 'L', 'K'];
  
    // set nric to all uppercase to remove case sensitivity
    const nric = nricInput.toUpperCase();
  
    // returns false if it false basic validation
    if (!nricRegex.exec(nric)) {
      return false;
    }
  
    // get nric type
    const nricArr = nric.match(nricRegex);
    const nricType = nricArr[1];
  
    // returns false if it false basic validation
    if (!nricTypeRegex.exec(nricType)) {
      return false;
    }
  
    // multiply each digit in the nric number by it's weight in order
    const nricDigitsArr = nricArr[2].split('');
    let total = 0;
    for (let i = 0; i < nricDigitsArr.length; i++) {
      total += parseInt(nricDigitsArr[i]) * weightArr[i] ;
    }
  
    // if the nric type is T or G, add 4 to the total
    if (['T', 'G'].indexOf(nricType) >= 0) {
      total += 4;
    }
  
    // check last letter of nric for local
    const letterIndex = total % 11;
    const nricLetter = nricArr[3];
    if (['S', 'T'].indexOf(nricType) >= 0) {
      return nricLetterST[letterIndex] === nricLetter;
    }
  
    // check last letter of nric for foreigners
    return nricLetterFG[letterIndex] === nricLetter;
  }