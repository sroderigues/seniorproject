/* Appliance Object */
function ApplianceObject(n, energy, d, arraySchedule, c, p, arr){

	this.name = n; // name of appliance
  
	//energy object containing water, electric, and oil if applicable
	this.energyUsage = energy;
	  
	this.cycleDuration = d; // duration of a running cycle if it applies to this appliance
	
	this.currentRuntime = 0; // how long the appliance has been running since it last turned on
	
	this.waiting = false; // is the appliance waiting to finish its cycle
	  
	this.on = false; // check if the appliance is running or idle / on or off
	
	// a counter to hold the amount of deadlines this appliance has missed 
	// aka it started its cycle but wasn't able to finish due to interruptions
	this.deadlineMisses = 0;
	
	// schedule array of integers (times) for start an
	this.schedule = arraySchedule;
	
	// circuit breaker -> each appliances belongs to a 'circuit breaker' which has a certain amount of power draw allowed at one times
	this.circuitBreaker = c;
	
	// is the appliance 'Noisy' aka will the user not want it running while they sleep
	this.noisy = false;
	
	this.priority = p; // appliances priority
	
	this.interrupt = arr; // an array which holds all the appliances which can interrupt this appliances while it is running
	
	// Appliance method to loop through the schedule which takes in a value 'startTime' 
	// from the simulation and if that value matches one of the start times in the schedule 
	// array, then the appliance begins "running" aka turns ON
	this.checkApplianceStartTime = function(startTime){
		for(var i = 0; i < this.schedule.length; i++){
	        // not sure if it will be checking schedule[i] or schedule[i].value
			if(this.schedule[i] = startTime){
				this.running = true;
			}
		}
	}
	// add a new start time to the appliance
	this.addStartTime = function(startTime){
		this.schedule.push(startTime);
	}
	// remove a start time from the appliance
	// loop through start times, if the parameter matches then remove that time and notify removal
	this.removeStartTime = function(startTime){
		var removed = "";
		for(var i = 0; i < this.schedule.length; i++){
			if(this.schedule[i] == startTime){
				removed = this.schedule.splice(i , 1);
				console.log(removed + " has been removed from scheduled start times.");
				break;
			}
		}
		if(removed == ""){
			console.log("start time did not exist, no start times removed.\n");
		}
	}
	  
	// prints out appliance schedule one by one
	this.printSchedule = function(){
		for(var i = 0; i < this.schedule.length; i++){
			console.log(this.schedule[i]);
		}
	}
	  
	// prints out all of the appliances one by one, which can interrupt this one
	this.printInterruptions = function(){
		for(var i = 0; i < this.interrupt.length; i++){
			console.log(this.interrupt[i]);
		}
	}
	  
	// this method creates an output string which holds all of the appliances useful information
	this.printApplianceInfo = function(){
		var info = "Name: " + this.name + "\n"
			+    " Electric usage: " + this.energyUsage.electric + "\n"
			+	 " Water usage: " + this.energyUsage.water + "\n"
			+	 " Oil usage: " + this.energyUsage.oil + "\n"
			+ 	 " Cycle Duration: " + this.cycleDuration + "\n"
			+	 " Running: " + this.on + "\n"
			+ 	 " Waiting: " + this.waiting + "\n"
			+	 " Running Time: " + this.currentRuntime + "\n"
			+ 	 " Deadlines Missed: " + this.deadlineMisses + "\n"
			+	 " Noisy Appliance: " + this.noisy + "\n"
			+	 " Scheduled Start Times: " + this.schedule + "\n"
			+ 	 " Priority: " + this.priority + "\n";
			//console.log(info);
		return info;
	}
	  
	// turn off appliance
	this.turnOff = function(){
		var offMessage;
		if(this.on == false){
			offMessage = this.name + " is already off \n";
		}else{
			offMessage = this.name + " has turned off \n";
			this.on = false;
		}
		return offMessage;
	}
	  
	// turn on appliance
	this.turnOn = function(){
		var onMessage;
		if(this.on == true){
			onMessage = this.name + " is already on \n";
		}else{
			onMessage = this.name + " has turned on ";
		}
		if(this.noisy == true){
			onMessage += "and is making noise \n";
		}else{
			onMessage += "\n";
		}
		this.on = true;
		return onMessage;
	}
}