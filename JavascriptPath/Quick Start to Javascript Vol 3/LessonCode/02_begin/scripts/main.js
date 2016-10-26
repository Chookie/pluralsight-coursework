

var myCoffee = {
    flavour: "Cappuccino",
    temperature: "piping hot",
    ounces: 100,
    milk: true,

    reheat: function(){
        if(myCoffee.temperature == "cold"){
            myCoffee.temperature = "hot";
            alert("Your coffee has been reheated")
        }
    }
}