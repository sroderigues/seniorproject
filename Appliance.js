
function Appliance(n, p){
	
	this.applianceName= n; // this will change when user inputs from html prompt
	this.powerConsumption = p; // this will change when the user inputs from html prompt
	this.on= false; // determines if the appliance is on or off
	// user should input this
	this.hoursOnPerDay = Math.floor((Math.random() * 24) + 1); // app runs between 1 and 24 hours per day based on random num generate
	this.element= 0; // keep the position of the div or something
	this.totalPowerUsed = 0; // for simulation run, this will hold the total amount of energy used
	
	// practice function but could be used if you feel like it
	this.getName = function(){
		return this.applianceName;
	}
	// simple get method
	this.getPowerConsumption = function(){
		return this.powerConsumption;
	}
	this.idleFunction = function(line){
		if(line < 10){
			var message = line + ".   | " + this.applianceName + " did not change since last time \n";
		}else if(line < 100){
			var message = line + ".  | " + this.applianceName + " did not change since last time \n";
		}else{
			var message = line + ". | " + this.applianceName + " did not change since last time \n";
		}
		document.getElementById("console").value += message;
	}
	// function to turn device on
	this.turnOn = function(time, line){
		// create message to be sent to output console
		if(line < 10){
			var message = line + ".   | " + this.applianceName + " powered on at " + time + ". Now using: " + this.powerConsumption + " watts.\n";
		}else if(line < 100){
			var message = line + ".  | " + this.applianceName + " powered on at " + time +  ". Now using: " + this.powerConsumption + " watts.\n";
		}else{
			var message = line + ". | " + this.applianceName + " powered on at " + time +  ". Now using: " + this.powerConsumption + " watts.\n";
		}
		// turn on the appliance
		this.on = true;
		// send message to output console
		document.getElementById("console").value += message;
		//console.log(message);
	}
	// function to turn device off
	this.turnOff = function(time, line){
		// create message to be sent to output console
		if(line < 10){
			var message = line + ".   | " + this.applianceName + " powered off at " + time + "\n";
		}else if(line < 100){
			var message = line + ".  | " + this.applianceName + " powered off at " + time + "\n";
		}else{
			var message = line + ". | " + this.applianceName + " powered off at " + time + "\n";
		}
		// turn off the appliance
		this.on = false;
		// send message to output console
		document.getElementById("console").value += message;
		//console.log(message);
	}
	// simple get method to return variable on
	this.checkOn = function(){
		return this.on;
	}
	// calculate the total energy consumed
	this.getEnergyConsumed = function(){
		return this.powerConsumption * this.runningTime; // multiply power wattage times the amount of time is was running
	}
	// run test numbers for simulation
	this.powerHours = function(){
		return this.powerConsumption*this.hoursOnPerDay;
	}
	// return the power usage in a 24 hour period
	this.getDailyPowerUsed = function(){
		return this.powerConsumption*24;
	}
	// return the power usage in a weekly period
	this.getWeeklyPowerUsed = function(){
		return this.powerConsumption*24*7;
	}
	// return the power usage over a month period
	this.getMonthlyPowerUsed = function(month, leap){
		switch(month){
			case 2:
				if(leap === false){
					return 28;
				}else{
					return 29;
				}
			case 4:
				return 30;
			case 9: 
				return 30;
			case 11:
				return 30;
			default:
				return 31;
		}
	}
	// return powerUsage per year
	this.getYearlyPowerUsed = function(){
		return this.powerConsumption*24*365;
	}
}
