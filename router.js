// router class
function router(arrayOfAppliances){
	this.connectedAppliances = arrayOfAppliances;
	
	// return the number of appliances connected to the router
	this.numberOfConnectedAppliances = function(){
		return this.connectedAppliances.length;
	}
	// turn off a specific appliance
	this.turnOffThisAppliance = function(appName){
		for(var i = 0; i < this.connectedAppliances.length; i++){
			if(appName.toLowerCase() == this.connectedAppliances[i].getName().toLowerCase()){
				this.connectedAppliances[i].on = false;
			}
		}
	}
	// turn on a specific appliance
	this.turnOnThisAppliance = function(appName){
		for(var i = 0; i < this.connectedAppliances.length; i++){
			if(appName.toLowerCase() == this.connectedAppliances[i].getName().toLowerCase()){
				this.connectedAppliances[i].on = true;
			}
		}
	}
	// go through the list of appliances this device is connected to and print them out... do something else with this later
	this.getConnectedAppliances = function(){
		for(var i = 0; i < this.connectedAppliances.length; i++){
			console.log(this.connectedAppliances[i]);
			//document.write(connectedAppliances[i]);
			//window.alert(connectedAppliances[i]);
		}
	}
	// let the user search for an appliance connected to a certain device.
	this.findConnectedAppliance = function(name){
		for(var i = 0; i < this.connectedAppliances.length; i++){
			if(name.toLowerCase() == this.connectedAppliances[i].getName().toLowerCase()){
				return this.connectedAppliances[i];
			}
		}
	}
	// function to add appliances to a router
	this.addConnectedAppliance = function(appName){
		this.connectedAppliances.push(appName);
	}
	// function to turn on all devices connected to router
	this.turnOnAppliances = function(){
		for(var i = 0; i < this.connectedAppliances.length; i++){
			this.connectedAppliances[i].on = true;
		}
	}
	// function to turn off all devices connected to router
	this.turnOffAppliances = function(){
		for(var i = 0; i < this.connectedAppliances.length; i++){
			this.connectedAppliances[i].on = false;
		}
	}
	// function to remove an appliance from a router
	this.removeConnectedAppliance = function(appName){
		for(var i = 0; i < this.connectedAppliances.length; i++){
			if(appName.toLowerCase() == this.connectedAppliances[i].getName().toLowerCase()){
				console.log(this.connectedAppliances[i]);
				var removed = this.connectedAppliances.splice(i, 1);
				break;
			}
		}
	}
	// function to calculate the current amount of power consumption
	this.currentPowerConsumption = function(){
		var totalPower = 0; // create var to hold total amount of energy
		// loop through each appliance and if it is currently ON collect the power usage attribute and add to the total
		for(var i = 0; i < this.connectedAppliances.length; i++){
			if(this.connectedAppliances[i].checkOn() === true){
				totalPower = this.connectedAppliances[i].getPowerConsumption() + totalPower;
			}
		}
		return totalPower;
	}
	// function to total the average daily power consumption of connected appliances
	this.dailyPowerConsumption = function(){
		var totalPower = 0; // create var to hold total amount of energy
		// loop through each appliance and collect the power usage attribute and add to the total
		for(var i = 0; i < this.connectedAppliances.length; i++){
			totalPower = this.connectedAppliances[i].getPowerConsumption() + totalPower;
		}
		return totalPower*24;
	}
	// function to total the average weekly power consumption of connected appliances
	this.weeklyPowerConsumption = function(){
		var totalPower = 0; // create var to hold total amount of energy
		// loop through each appliance and collect the power usage attribute and add to the total
		for(var i = 0; i < this.connectedAppliances.length; i++){
			totalPower = this.connectedAppliances[i].getPowerConsumption() + totalPower;
		}
		return totalPower*24*7;
	}
	// function to total the average yearly power consumption of connected appliances
	this.yearlyPowerConsumption = function(){
		var totalPower = 0; // create var to hold total amount of energy
		// loop through each appliance and collect the power usage attribute and add to the total
		for(var i = 0; i < this.connectedAppliances.length; i++){
			totalPower = this.connectedAppliances[i].getPowerConsumption() + totalPower;
		}
		return totalPower*24*365;
	}
	// run simple simulation
	this.runSimulation = function(){
		var totalPowerUsed = 0;
		for(var i = 0; i < this.connectedAppliances.length; i++){
			totalPowerUsed = totalPowerUsed + this.connectedAppliances[i].powerHours();
			console.log(this.connectedAppliances[i].getName() + " used " + this.connectedAppliances[i].powerConsumption + " watts for " + this.connectedAppliances[i].hoursOnPerDay + " hours today");
		}
		console.log("Total power used by all appliances today: " + totalPowerUsed + " watts");
		return totalPowerUsed;
	}
	// simulate the appliances turning on and off throughout the day every 2 hours.
	this.messageSim = function(){
		// clear the console in beginning
		document.getElementById("console").value = "";
		// loop through the 'simulation' for turning on and off appliances
		for(var hour = 0; hour < 24; hour++){
			for(var i = 0; i < this.connectedAppliances.length; i++){
				if(hour%3 == 0){
					this.connectedAppliances[i].turnOn(hour);
				}else{
					this.connectedAppliances[i].turnOff(hour);
				}
			}
		}
	}
}
