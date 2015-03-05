function Scheduler(apps){
	this.Run = function(j){
		console.log(j);
	}
}

seconds = 1;	// start from 1 to 86400;
days = 0; // number of days passed
startDate = 0; // start date of simulation
simInterval = 100; // interval in ms the simulation will run
running = true;	// simulation started ?
s = new Scheduler(undefined); // new scheduler object

// run the simulation
function startSimulation(){
	inter = setInterval(function(){
			s.Run(seconds);
			seconds++;
		}, simInterval);
}

function stopSimulation(){
	clearInterval(inter);
}

document.getElementById('runSim').onclick = function(){
	if(running){
		stopSimulation();
		running = false;
	}else{
		startSimulation();
		running = true;
	}
}
startSimulation();