console.log('calculator.js loaded');


const display = document.getElementById('display');
let displayNum = '';	// This is the STRING showing numbers to the calculator display
let entries = [];	// This contains both numbers and their corresponding commands. Eg: If entires contains [12,x] then "2" is pressed followed by "=", entries would looko like [12,x,2,=] then it'd be executed from left to right
let clearNextTick = false;

// Attach eventlisteners to every button
const buttons = document.getElementsByClassName('button');
for(let i=0;i<buttons.length;i++){
	buttons[i].addEventListener('click',e=>{
		buttonPressed(e.target.textContent);
	});
}

// Processes button response
function buttonPressed(keyPressed){
	// Check if display character, not command
	if(!isNaN(keyPressed) || keyPressed==='.'){
		// DISPLAYABLE TEXT
		if(clearNextTick){
			displayNum='';
			clearNextTick=0;
		}
		if(displayNum.indexOf('.')!==-1 && keyPressed==='.'){
			return;
		}
		displayNum+=keyPressed;
		
	}else{

		// COMMANDS
		if(keyPressed === 'AC'){
			console.log('AC')
			displayNum='';
			entries=[];
		}else if(keyPressed === 'CE'){
			console.log('ce')
			displayNum='';
		}else if(keyPressed === '=>'){
			console.log('->')
			let newString='';
			for(let i=0;i<displayNum.length-1;i++){
				newString+=displayNum[i];
			}
			displayNum = newString;
			console.log(newString)
		}else{
			//Check operators
			checkOperators(keyPressed);
		}
	}

	console.log('entries',entries);


	// Update calculator display screen
	display.textContent = displayNum;
}

function checkOperators(keyPressed){
	if(displayNum===''){
		return;
	}
	// Don't do anything if "=" is pressed before any other operator command
	if(entries.length>0 && displayNum===''){
		entries[entries.length-1]=keyPressed;
		console.log('yeah!')
	}else{
		console.log('wa')
	}
	console.log('entries2',entries)
	if(!(keyPressed === '=' && entries.length===0)){
		entries.push(displayNum);
		entries.push(keyPressed);
		// displayNum='';
		console.log('entries',entries)
		console.log('waaaaaaaa')

		if(keyPressed === '='){
			console.log('=')
			displayNum = calculate();
			entries = [];
			console.log('stop!')
		}
		clearNextTick=true;
	}
}


// Calculates everything in the entires array
function calculate(){
	let netResult=entries[0];
	for(let i=0;i<entries.length-2;i=i+2){
		switch(entries[i+1]){
			case '%':
				netResult%=entries[i+2];
				break;
			case '/':
				netResult/=entries[i+2];
				break;
			case 'x':
					netResult*=entries[i+2];
					break;
			case '-':
					netResult-=entries[i+2];
					break;
			case '+':
					netResult=~~(netResult)+~~(entries[i+2]);
					break;
		}
	}
	
	return netResult.toString();
}