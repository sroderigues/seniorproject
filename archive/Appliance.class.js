/**
*
*	Appliance Object
*
*	Generic object for storing appliance information
*
*	NOTE: GETTERS AND SETTERS ARE NOT NECESSARY. VARIABLES CAN BE ACCESSED DIRECTLY.
*
**/

function Appliance(n, p){

	this.name = n;			// Appliance name
	this.power = p;			// Power consumption in energy-hour
	this.on = false;		// Bool, whether appliance is active
	this.runningTime = 0; 	// Time in hours that the appliance has been running
	this.element;			// Attached element for the appliance eg. "A DIV in the shape of a Refrigerator"
	
	// Returns the amount of energy used in one day
	this.energyUsagePerDay = function(){
		
		// Power consumption times 24 hours
		return this.power*24;
	}
	
	// Returns the amount of energy used in one week
	this.energyUsagePerWeek = function(){
		
		// Power consumption times 24.0 hours times 7 days a week
		return this.energyUsagePerDay()*7;
	}
	
	// Returns the amount of energy used in one month
	// Takes an integer that denotes the number month
	// Takes a bool leap to determine if its a leap year
	this.energyUsagePerMonth = function(month, leap){
		
		// number of days in the month
		var numDays;
		
		switch(month){
			case 2: // February
				if(!leap){ // Is it a leap year?
					numDays = 28;
				}else{
					numDays = 29;
				}
				break;
			case 9:	// September
			case 6: // June
			case 11: // November
			case 4: // April
				numDays = 30;
				break;	
			default: // All other months
				numDays = 31;
		}
		
		// Power consumption times n days
		return this.energyUsagePerDay()*numDays;
	}
	
	// Returns the energy consumption for a year
	this.energyUsagePerYear = function(){
		
		// Power consumption time 365.25 days
		return this.energyUsagePerDay()*365.25;
	}
}