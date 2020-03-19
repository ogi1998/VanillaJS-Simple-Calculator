// Get Dom Variables
const activeNumber = document.querySelector('.result');
const clearBtn = document.querySelector('#clear');
const backBtn = document.querySelector('#back');
const operandsUI = document.querySelectorAll('.operand');
const operatorsUI = document.querySelectorAll('.operator');
let operators = new Array();
let operands = new Array();

operandsUI.forEach(operand => {
	operand.addEventListener('click', () => {
		addValue(operand, activeNumber);
	});
});
operatorsUI.forEach(operator => {
	operator.addEventListener('click', e => {
		if (operator.innerHTML !== '=') {
			populateOperands(Number(activeNumber.innerHTML));
			populateOperators(e.target.innerHTML);
		} else {
			populateOperands(Number(activeNumber.innerHTML));
			calculateResult(operands, operators);
		}
	});
});
clearBtn.addEventListener('click', clearAll);

backBtn.addEventListener('click', removeLastOperand);

function addValue(operand, result) {
	if (result.innerHTML === '0') {
		result.innerHTML = operand.innerHTML;
	} else result.innerHTML += operand.innerHTML;
}
function clearAll() {
	activeNumber.innerHTML = '0';
	operators = [];
	operands = [];
}
function removeLastOperand() {
	if (activeNumber.innerHTML === '0') return false;
	if (activeNumber.innerHTML.length === 1) activeNumber.innerHTML = '0';
	else {
		activeNumber.innerHTML = activeNumber.innerHTML.substr(0, activeNumber.innerHTML.length - 1);
	}
}

function populateOperands(value) {
	operands.push(value);
}
function populateOperators(value) {
	operators.push(value);
	activeNumber.innerHTML = '0';
}
function calculateResult(operands, operators) {
	let result = 0;
	if (operands.length === 1) {
		activeNumber.innerHTML = operands[0];
	} else {
		for (let i = 0; i < operators.length; i++) {
			if (operators[0] === '+') {
				result += operands[0] + operands[1];
				operators.pop();
				operands.pop();
				operands.pop();
			}
			if (operators[0] === '-') {
				result += operands[0] - operands[1];
				operators.pop();
				operands.pop();
				operands.pop();
			}
			if (operators[0] === 'X') {
				result += operands[0] * operands[1];
				operators.pop();
				operands.pop();
				operands.pop();
			} else if(operators[0]==="/"){
				result += operands[0] / operands[1];
				operators.pop();
				operands.pop();
				operands.pop();
			}
		}
		activeNumber.innerHTML = result;
	}
}
