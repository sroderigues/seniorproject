/*
	OnClick function for Add/edit Appliances Button
*/

var appArray = []; // global array for user appliances
var arr=[];
var arr2=[];
var daySlotCounter=[]; //keeps track of number of slots for each day, need to save this to list

/*
	save/edit appliance
*/
function addSchedule()
{
	//var node = document.createElement('li');
	//node.appendChild(document.createTextNode(labelValue));
	//node.setAttribute('id', addAppliance.counter);
}

/*
	creates a new time slot for that day
*/
function addTimeSlot(day)
{
	if(day=="sunday")
		index = 0;
	else if(day=="monday")
		index = 1;
	else if(day=="tuesday")
		index = 2;
	else if(day=="wednesday")
		index = 3;
	else if(day=="thursday")
		index = 4;
	else if(day=="friday")
		index = 5;
	else
		index = 6;

	if(daySlotCounter[index]==undefined)
		daySlotCounter[index]=0;

	idStart=day+""+daySlotCounter[index]+"start";
	idEnd=day+""+daySlotCounter[index]+"end";

	document.getElementById(day+"spot").innerHTML +="<div></div>"+day+":<input type='text' id=idStart><input type='text' id=idEnd>"

	daySlotCounter[index]++;
	
}

/*
	creates a new schedule
*/
function openScheduleDescription(id)
{ 
	document.getElementById('schedule-section').innerHTML = "Name: <input type='text' id='name-schedule' name='namesched'><div></div>"
	+ "<button id='sunday' onclick='addTimeSlot(id)'>Sunday</button><div id='sundayspot'></div>"
	+ "<button id='monday' onclick='addTimeSlot(id)'>Monday</button><div id='mondayspot'></div>"
	+ "<button id='tuesday' onclick='addTimeSlot(id)'>Tuesday</button><div id='tuesdayspot'></div>"
	+ "<button id='wednesday' onclick='addTimeSlot(id)'>Wednesday</button><div id='wednesdayspot'></div>"
	+ "<button id='thursday' onclick='addTimeSlot(id)'>Thursday</button><div id='thursdayspot'></div>"
	+ "<button id='friday' onclick='addTimeSlot(id)'>Friday</button><div id='fridayspot'></div>"
	+ "<button id='saturday' onclick='addTimeSlot(id)'>Saturday</button><div id='saturdayspot'></div>"
	+ "<p></p><button onclick='addSchedule("+id+",false)'>Add Schedule</button>"
}

/*
	insert our logo so they know appliance added/removed or edited properly
*/
function insertLogo()
{
	document.getElementById("appliance-description").innerHTML = "<img src='file:///C:/Users/Samantha/Documents/My%20Documents/UMDSpring2015/CIS499/seniorproject/src/logo.jpg' alt='Intelligent Home Simulator'>";
}

/*
	OnClick function for Remove Appliances Button
*/
function removeAppliance(id)
{
		var node = document.getElementById(id);
		var appListElem = document.getElementById('selected-appliances');
		appListElem.removeChild(node);
		insertLogo();
}

function addAppliance(id,edit)
{
	//edit = true, user is editing an appliance already existing in list
	//edit = false, user is adding a new appliance to list

	if(!edit) //if new appliance generate new id and get its type
	{
		newAppliance = availableApplianceList[id].type;

		if( typeof addAppliance.counter == 'undefined' ) 
		   addAppliance.counter = 0;
	}

	labelValue = document.getElementsByName('labelInput')[0].value;
	wattsValue = document.getElementsByName('wattsInput')[0].value; //get watts in input text box
	
	if(!edit)
	{
		var node = document.createElement('li');
		node.appendChild(document.createTextNode(labelValue));
		node.setAttribute('id', addAppliance.counter); //id in selected-appliances list should be the same as the appliance-id
		node.setAttribute('appliance-id', addAppliance.counter); 
		node.setAttribute('appliance-type', newAppliance);

		//console.log(node.getAttribute('appliance-label'))
	}
	else
	{
		var node = document.getElementById(id);
		node.removeChild(node.childNodes[0]);  
		node.appendChild(document.createTextNode(labelValue));

	}

	node.setAttribute('appliance-label', labelValue)
	node.setAttribute('appliance-wattage', wattsValue); //set watts in input text box to the attribute appliance-wattage

	if((document.getElementById('applianceAttributes')).innerHTML!= "")
	{
		gallonsValue = document.getElementsByName('gallonsInput')[0].value;
		node.setAttribute('appliance-gallonage', gallonsValue); 
	}

	node.onclick = function(){openApplianceDescription(this);}

	var appListElem = document.getElementById('selected-appliances');
	appListElem.appendChild(node);
	addAppliance.counter++;

	insertLogo();

	if(!edit)
		checkName(node.getAttribute('appliance-type'),true)

	// putting the appliances with attributes in array
	appArray.push([node.getAttribute('id'), node.getAttribute('appliance-type'), node.getAttribute('appliance-wattage')]);
	// putting the array values into local storage
	if(!window.localStorage) alert("Sorry, you're using an ancient browser");
	else 
	{
    	localStorage.myArray = JSON.stringify(TheArray);
	}

}

/*
	OnClick function for appliances in the available-appliances list
*/
function openApplianceDescription(elem)
{
	var defaultWatts;
	var defaultGallons;
	var change = true;

	//replace logo with appliance description section
	document.getElementById('appliance-description').innerHTML = "<div class='section-header'>Appliance Description</div><img id='large-appliance-image'/><ul><li id='appliance-type'></li><li id='appliance-labeling'></li><li id='appliance-watts'></li><div id='applianceAttributes'></div><div id='appliance-schedule'></div></ul>"
	+"<div id='addApplianceButtonArea'></div>";
	
	var id = elem.getAttribute('appliance-id');
	document.getElementById('appliance-type').innerHTML = elem.getAttribute('appliance-type');
	document.getElementById('appliance-labeling').innerHTML = elem.getAttribute('appliance-label');
	
	defaultWatts = elem.getAttribute('appliance-wattage');
	defaultGallons = elem.getAttribute('appliance-gallonage');
	
	if(defaultWatts==null) //if new item add to selected-appliances
	{
		change = false;
		document.getElementById('appliance-type').innerHTML = availableApplianceList[id].type;	//all appliances should have name
		elem.setAttribute('appliance-label', checkName(availableApplianceList[id].type,false))

		defaultWatts = availableApplianceList[id].watts;
		defaultGallons = availableApplianceList[id].gallons;
	}

	document.getElementById('appliance-labeling').innerHTML = "Name: <input type='text' id='appliance-labeling' name='labelInput' value='"+elem.getAttribute('appliance-label')+"'>"
	document.getElementById('appliance-watts').innerHTML = "<input type='text' id='appliance-watts' name='wattsInput' value='"+defaultWatts+"'> Watts"	//all appliances should have wattage/energy consumption

	if(defaultGallons!=undefined && defaultGallons!=null)		//checks if appliance has gallons WILL HAVE TO ADD FOR OTHER ATTRIBUTES
	{
		applianceAttributes.innerHTML = "<input type='text' id='appliance-gallons' name='gallonsInput' value='"+defaultGallons+"'> Gallons" 
	}
	else 	//resets attributes for next appliance clicked
		applianceAttributes.innerHTML = "";

	document.getElementById('appliance-schedule').innerHTML = "<select><option value='volvo'>Volvo</option><option value='saab'>Saab</option><option value='opel'>Opel</option><option value='audi'>Audi</option></select>"

	if(!change)
		addApplianceButtonArea.innerHTML = "<button onclick='addAppliance("+id+",false)'>Add Appliance</button><p></p>"; 	//adds appliance once Add Appliance button clicked
	else
		addApplianceButtonArea.innerHTML = "<button onclick='addAppliance("+id+",true)'>Save Changes</button> <button onclick='removeAppliance("+id+",true)'>Remove Appliance</button><p></p>"; 	//adds appliance once Add Appliance button clicked
}

/*
	Add appliances to available-appliances list
*/
function loadDefaultAppliances()
{
	insertLogo();

	var appListElem = document.getElementById('available-appliances');
			for(var i = 0; i<availableApplianceList.length; i++)
			{	
				var node = document.createElement('li');
				var text = document.createTextNode(availableApplianceList[i].type);
				node.appendChild(text);
				node.setAttribute('appliance-id', i);

				node.onclick = function(){openApplianceDescription(this);}
				appListElem.appendChild(node);
				(availableApplianceList[i].schID)

			}
}

function checkName(type, added)
{
	repeat = false;

	if(document.getElementById(0)==null)
	{
		arr.push(type);
		arr2.push(0)
		name = type +" 0";
	}
	else
	{ 
		for(var j=0;j<arr.length; j++)
		{
			if(arr[j] == type)
			{
				repeat = true;

				if(added)
					arr2[j]++;

				name = type +" "+arr2[j];
				break;
			}
		}
		if(!repeat)
		{
			arr.push(type);
			arr2.push(0);
			name = type +" 0";
		}
	}
 //console.log(name)
	return name;
}


