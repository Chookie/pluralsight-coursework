function buyPhone(balance){
	var cost = phonePrice + accessoriesPrice;
	var total = cost * (1+taxRate);
	return balance - total;
}

const limit = 1000;
const phonePrice = 100;
const accessoriesPrice = 50;
const taxRate = 0.1;
var balance = limit;
var count = 0;

var newBalance = buyPhone(balance);

while(newBalance > 0) {
	balance = newBalance;
	count ++;
	console.log("Bought a phone, Balance = " + balance);
	newBalance = buyPhone(balance);
}

console.log("Bought " + count + " phones.  Balance = " + balance);