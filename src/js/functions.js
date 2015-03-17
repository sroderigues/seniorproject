/*
	OnClick function for Add/edit Appliances Button
*/
function addAppliance(id,edit)
{
	//edit = true, user is editing an appliance already existing in list
	//edit = false, user is adding a new appliance to list

	if(!edit) //if new appliance generate new id and get its type
	{
		newAppliance = defaultApplianceList[id].type;

		if( typeof addAppliance.counter == 'undefined' ) 
		   addAppliance.counter = 0;
	}

	wattsValue = document.getElementsByName('wattsInput')[0].value; //get watts in input text box
	
	if(!edit)
	{
		var node = document.createElement('li');
		node.appendChild(document.createTextNode(newAppliance));
		node.setAttribute('id', addAppliance.counter); //id in selected-appliances list should be the same as the appliance-id
		node.setAttribute('appliance-id', addAppliance.counter); 
		node.setAttribute('appliance-type', newAppliance);
	}
	else
	{
		var node = document.getElementById(id);
	}

	node.setAttribute('appliance-wattage', wattsValue); //set watts in input text box to the attribute appliance-wattage
	//node.setAttribute('appliance-gallonage', addAppliance.counter);
	node.onclick = function(){openApplianceDescription(this);}
console.log(node.getAttribute('appliance-type'))
console.log(node.getAttribute('id'))
	var appListElem = document.getElementById('selected-appliances');
	appListElem.appendChild(node);
	addAppliance.counter++;
	//writeToFile();
}

/*
	OnClick function for appliances in the available-appliances list
*/
function openApplianceDescription(elem)
{
	var defaultWatts;
	var defaultGallons;
	var change = true;

	var id = elem.getAttribute('appliance-id');
	document.getElementById('appliance-name').innerHTML = elem.getAttribute('appliance-type');
	defaultWatts = elem.getAttribute('appliance-wattage');
	//console.log(defaultWatts);
	defaultGallons = elem.getAttribute('appliance-gallonage');
//console.log(elem.getAttribute('appliance-wattage')==null)

	if(defaultWatts==null) //if new item add to selected-appliances
	{
		change = false;
		//console.log("yes")
		document.getElementById('appliance-name').innerHTML = defaultApplianceList[id].type;	//all appliances should have name
		defaultWatts = defaultApplianceList[id].watts;
		defaultGallons = defaultApplianceList[id].gallons;
	}

	document.getElementById('appliance-watts').innerHTML = "<input type='text' id='appliance-watts' name='wattsInput' value='"+defaultWatts+"'> Watts"	//all appliances should have wattage/energy consumption

	if(defaultGallons!=undefined && defaultGallons!=null)		//checks if appliance has gallons WILL HAVE TO ADD FOR OTHER ATTRIBUTES
	{
		applianceAttributes.innerHTML = "<input type='text' id='appliance-gallons' name='gallonsInput' value='"+defaultGallons+"'> Gallons" 
	}
	else 	//resets attributes for next appliance clicked
		applianceAttributes.innerHTML = "";

	if(!change)
		addApplianceButtonArea.innerHTML = "<button onclick='addAppliance("+id+",false)'>Add Appliance</button>"; 	//adds appliance once Add Appliance button clicked
	else
		addApplianceButtonArea.innerHTML = "<button onclick='addAppliance("+id+",true)'>Save Changes</button> <button onclick='addAppliance("+id+",true)'>Remove Appliance</button>"; 	//adds appliance once Add Appliance button clicked
}

/*
	Add appliances to available-appliances list
*/
function loadDefaultAppliances()
{
	//CHECKvar arr=[];
	//CHECKvar arr2=[];

	var appListElem = document.getElementById('available-appliances');
			for(var i = 0; i<defaultApplianceList.length; i++){
				//CHECKarr.push(defaultApplianceList[i].type);
				//CHECKarr2.push(0);
				var node = document.createElement('li');
				var text = document.createTextNode(defaultApplianceList[i].type);
				node.appendChild(text);
				node.setAttribute('appliance-id', i);
				node.onclick = function(){openApplianceDescription(this);}
				appListElem.appendChild(node);
			}

	/*CHECKfor(var j=0;j<arr.length; j++)
	{
		for(var k=0;k<arr.length; k++)
		{
			if(j!=k && arr[j]==(arr[k]))
			{
				arr2[j]++;
				
			}
		}	
	}
	for(var l=0;l<arr.length; l++)
	{
		console.log(arr[l]);
		console.log(arr2[l]);
	}*/
}