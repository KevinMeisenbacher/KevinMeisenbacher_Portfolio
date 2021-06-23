/* Author: Kevin Meisenbacher */

// Automatically roll a d6 to allocate points to each stat
var stat1 = parseInt(Math.random() * (18-3));
var stat2 = parseInt(Math.random() * (18-3));
var stat3 = parseInt(Math.random() * (18-3));
var stat4 = parseInt(Math.random() * (18-3));
var stat5 = parseInt(Math.random() * (18-3));
var stat6 = parseInt(Math.random() * (18-3));
const maxStats = stat1+stat2+stat3+stat4+stat5+stat6;
var stats = maxStats;

// Initialize ability scores
var strength = 3;	
var dexterity = 3;
var constitution = 3;
var intelligence = 3;
var wisdom = 3;
var charisma = 3;

// Initialize ability modifiers
var strBonus = 0;
var dexBonus = 0;
var conBonus = 0;
var intBonus = 0;
var wisBonus = 0;
var chaBonus = 0;

// Use ability modifiers to set skills
var acrobatics = dexBonus;
var animalHandling = wisBonus;
var arcana = intBonus;
var athletics = strBonus;
var deception = chaBonus;
var history = intBonus;
var insight = wisBonus;
var intimidation = chaBonus;
var investigation = intBonus;
var medicine = wisBonus;
var nature = intBonus;
var perception = wisBonus;
var performance = chaBonus;
var persuasion = chaBonus;
var religion = intBonus;
var sleightOfHand = dexBonus;
var stealth = dexBonus;
var survival = wisBonus;

// Initialize hit dice to calculate HP and stuff
var hitDice = 1; // Initial # of hit dice
var hitDie = 6; // Initial value for each hit die
var maxHP = hitDie + constitution;
var currentHP = maxHP;

// Setup XP value
var experience = 0;

// Initialize money
var pp = 0;
var ep = 0;
var gp = 100;
var sp = 0;
var cp = 0;

// Set up an array for characters and a starting id for them
var characters = [];
var id = 1;

// Array to put items into and program them later
var itemArray = [];

function initialize() {
	// Make the form appear at the start
	document.getElementById('form').style.display = 'flex';
	
	// API Test
	fetch('https://www.dnd5eapi.co/api/classes')
	.then (res => res.json()
	.then(val => console.log(val.results))
	);
	
	// Prepopulate ability fields with initial values
	document.getElementById('strInput').value = 3;
	document.getElementById('dexInput').value = 3;
	document.getElementById('conInput').value = 3;
	document.getElementById('intInput').value = 3;
	document.getElementById('wisInput').value = 3;
	document.getElementById('chaInput').value = 3;
	document.getElementById('statsLeft').innerHTML = maxStats;
	if (document.getElementById('charRace').value == 'dragonborn') {
		strength = 5;
		charisma = 5;
		document.getElementById('strInput').value = strength;
		document.getElementById('chaInput').value = charisma;
	}
	else if (document.getElementById('charRace').value == 'dwarf') {
		constitution = 5;
		document.getElementById('conInput').value = constitution;
	}
	else if (document.getElementById('charRace').value == 'elf') {
		dexterity = 5;
		document.getElementById('dexInput').value = dexterity;
	}
	else if (document.getElementById('charRace').value == 'gnome') {
		intelligence = 5;
		document.getElementById('intInput').value = intelligence;
	}
	else if (document.getElementById('charRace').value == 'halfElf') {
		charisma = 5;
		stats += 2;
		document.getElementById('chaInput').value = charisma;
		document.getElementById('statsLeft').innerHTML = stats;
	}
	else if (document.getElementById('charRace').value == 'halfling') {
		dexterity = 5;
		document.getElementById('dexInput').value = dexterity;
	}
	else if (document.getElementById('charRace').value == 'halfOrc') {
		strength = 5;
		constitution = 4;
		document.getElementById('strInput').value = strength;
		document.getElementById('conInput').value = constitution;
	}
	else if (document.getElementById('charRace').value == 'human') {
		strength = 4;
		dexterity = 4;
		constitution = 4;
		intelligence = 4;
		wisdom = 4;
		charisma = 4;
		document.getElementById('strInput').value = strength;
		document.getElementById('dexInput').value = dexterity;
		document.getElementById('conInput').value = constitution;
		document.getElementById('intInput').value = intelligence;
		document.getElementById('wisInput').value = wisdom;
		document.getElementById('chaInput').value = charisma;
	}
	else if (document.getElementById('charRace').value == 'orc') {
		strength = 5;
		constitution = 4;
		document.getElementById('strInput').value = strength;
		document.getElementById('conInput').value = constitution;
	}
	else if (document.getElementById('charRace').value == 'tiefling') {
		charisma = 5;
		intelligence = 4;
		document.getElementById('chaInput').value = charisma;
		document.getElementById('intInput').value = intelligence;
	}
	
	// Display money values
	document.getElementById('pp').innerHTML = 'PP ' + pp;
	document.getElementById('ep').innerHTML = 'EP ' + ep;
	document.getElementById('gp').innerHTML = 'GP ' + gp;
	document.getElementById('sp').innerHTML = 'SP ' + sp;
	document.getElementById('cp').innerHTML = 'CP ' + cp;
}

// Add API from classes to dropdown on character creation
var classes = [];
fetch('https://www.dnd5eapi.co/api/classes')
.then (res => res.json())
.then (function(data) {
	for (var i=0; i<data.results.length; i++) {
		console.log(data.results[i].name);	
		classes[i] = document.createElement('option');
		
		// Style the dropdown
		classes[i].style.color = '#ffd870';
		
		// Populate the class dropdown with JSON data
		classes[i].setAttribute('value', data.results[i].name);
		var className = document.createTextNode(data.results[i].name);
		classes[i].appendChild(className);
		document.getElementById('charClass').appendChild(classes[i]);
		
	}
})
function strInc() {
	if (document.getElementById('strInput').value < 20
			&& document.getElementById('statsLeft').innerHTML > 0) {
		strength++;
		document.getElementById('strInput').value = strength;
		document.getElementById('statsLeft').innerHTML--;
	}
} function strInc5() {
	if (document.getElementById('strInput').value <= 15
			&& document.getElementById('statsLeft').innerHTML > 0) {
		strength += 5;
		stats -= 5;
		document.getElementById('strInput').value = strength;
		document.getElementById('statsLeft').innerHTML = stats;
	}
}
function strDec() {
	if (document.getElementById('strInput').value > 0
			&& document.getElementById('statsLeft').innerHTML < maxStats) {
		strength--;
		document.getElementById('strInput').value = strength;
		document.getElementById('statsLeft').innerHTML++;
	}
}
function strDec5() {
	if (document.getElementById('strInput').value >= 5
			&& document.getElementById('statsLeft').innerHTML <= maxStats-5) {
		strength -= 5;
		stats += 5;
		document.getElementById('strInput').value = strength;
		document.getElementById('statsLeft').innerHTML = stats;
	}
}
function dexInc() {
	if (document.getElementById('dexInput').value < 20
			&& document.getElementById('statsLeft').innerHTML > 0) {
		dexterity++;
		stats--;
		document.getElementById('dexInput').value = dexterity;
		document.getElementById('statsLeft').innerHTML = stats;
	}
}
function dexInc5() {
	if (document.getElementById('dexInput').value <= 15
			&& document.getElementById('statsLeft').innerHTML > 0) {
		dexterity += 5;
		stats -= 5;
		document.getElementById('dexInput').value = dexterity;
		document.getElementById('statsLeft').innerHTML = stats;
	}
}
function dexDec() {
	if (document.getElementById('dexInput').value > 0
			&& document.getElementById('statsLeft').innerHTML < maxStats) {
		document.getElementById('dexInput').value--;
		dexterity--;
		document.getElementById('statsLeft').innerHTML++;
	}
}
function dexDec5() {
	if (document.getElementById('dexInput').value >= 5
			&& document.getElementById('statsLeft').innerHTML <= maxStats-5) {
		dexterity -= 5;
		stats += 5;
		document.getElementById('dexInput').value = dexterity;
		document.getElementById('statsLeft').innerHTML = stats;
	}
}
function conInc() {
	if (document.getElementById('conInput').value < 20
			&& document.getElementById('statsLeft').innerHTML > 0) {
		document.getElementById('conInput').value++;
		constitution++;
		document.getElementById('statsLeft').innerHTML--;
	}
}
function conInc5() {
	if (document.getElementById('conInput').value <= 15
			&& document.getElementById('statsLeft').innerHTML >= 5) {
		constitution += 5;
		stats -= 5;
		document.getElementById('conInput').value = constitution;
		document.getElementById('statsLeft').innerHTML = stats;
	}
}
function conDec() {
	if (document.getElementById('conInput').value > 0
			&& document.getElementById('statsLeft').innerHTML < maxStats-5) {
		document.getElementById('conInput').value--;
		constitution--;
		document.getElementById('statsLeft').innerHTML++;
	}
}
function conDec5() {
	if (document.getElementById('conInput').value >= 5
			&& document.getElementById('statsLeft').innerHTML <= maxStats-5) {
		constitution -= 5;
		stats += 5;
		document.getElementById('conInput').value = constitution;
		document.getElementById('statsLeft').innerHTML = stats;
	}
}
function intInc() {
	if (document.getElementById('intInput').value < 20
			&& document.getElementById('statsLeft').innerHTML > 0) {
		document.getElementById('intInput').value++;
		intelligence++;
		document.getElementById('statsLeft').innerHTML--;
	}
}
function intInc5() {
	if (document.getElementById('intInput').value <= 15
			&& document.getElementById('statsLeft').innerHTML >= 5) {
		intelligence += 5;
		stats -= 5;
		document.getElementById('intInput').value = intelligence;
		document.getElementById('statsLeft').innerHTML = stats;
	}
}
function intDec() {
	if (document.getElementById('intInput').value > 0
			&& document.getElementById('statsLeft').innerHTML < maxStats) {
		document.getElementById('intInput').value--;
		intelligence--;
		document.getElementById('statsLeft').innerHTML++;
	}
}
function intDec5() {
	if (document.getElementById('intInput').value >= 5
			&& document.getElementById('statsLeft').innerHTML <= maxStats-5) {
		intelligence -= 5;
		stats += 5;
		document.getElementById('intInput').value = intelligence;
		document.getElementById('statsLeft').innerHTML = stats;
	}
}
function wisInc() {
	if (document.getElementById('wisInput').value < 20
			&& document.getElementById('statsLeft').innerHTML > 0) {
		document.getElementById('wisInput').value++;
		wisdom++;
		document.getElementById('statsLeft').innerHTML--;
	}
}
function wisInc5() {
	if (document.getElementById('wisInput').value <= 15
			&& document.getElementById('statsLeft').innerHTML >= 5) {
		wisdom += 5;
		stats -= 5;
		document.getElementById('wisInput').value = wisdom;
		document.getElementById('statsLeft').innerHTML = stats;
	}
}
function wisDec() {
	if (document.getElementById('wisInput').value > 0
			&& document.getElementById('statsLeft').innerHTML < maxStats) {
		document.getElementById('wisInput').value--;
		wisdom--;
		document.getElementById('statsLeft').innerHTML++;
	}
}
function wisDec5() {
	if (document.getElementById('wisInput').value >= 5
			&& document.getElementById('statsLeft').innerHTML < maxStats-5) {
		wisdom -= 5;
		stats += 5;
		document.getElementById('wisInput').value = wisdom;
		document.getElementById('statsLeft').innerHTML = stats;
	}
}
function chaInc() {
	if (document.getElementById('chaInput').value < 20
			&& document.getElementById('statsLeft').innerHTML > 0) {
		document.getElementById('chaInput').value++;
		charisma++;
		document.getElementById('statsLeft').innerHTML--;
	}
}
function chaInc5() {
	if (document.getElementById('chaInput').value <= 15
			&& document.getElementById('statsLeft').innerHTML >= 5) {
		charisma += 5;
		stats -= 5;
		document.getElementById('chaInput').value = charisma;
		document.getElementById('statsLeft').innerHTML = stats;
	}
}
function chaDec() {
	if (document.getElementById('chaInput').value > 0
			&& document.getElementById('statsLeft').innerHTML < maxStats) {
		document.getElementById('chaInput').value--;
		charisma--;
		document.getElementById('statsLeft').innerHTML++;
	}
}
function chaDec5() {
	if (document.getElementById('chaInput').value >= 5
			&& document.getElementById('statsLeft').innerHTML < maxStats-5) {
		charisma -= 5;
		stats += 5;
		document.getElementById('chaInput').value = charisma;
		document.getElementById('statsLeft').innerHTML = stats;
	}
}

// Autogenerate fields for a default character
function defaultCharacter() {
	// Set basic information
	document.getElementById('charName').value = 'Cornholio';
	document.getElementById('charClass').value = 'Barbarian';
	document.getElementById('charBackground').value = 'Titikaka';
	document.getElementById('playerName').value = 'Beavis';
	document.getElementById('charFaction').value = 'Asskickers';
	document.getElementById('charRace').value = 'Human';
	document.getElementById('charAlign').value = 'Chaotic Neutral';
	
	// Approximately minmax for physical stats
	initialize();
	document.getElementById('strInput').value = 16;
	document.getElementById('dexInput').value = 16;
	document.getElementById('conInput').value = 20;
	document.getElementById('chaInput').value = 3;
	document.getElementById('intInput').value = 3;
	document.getElementById('wisInput').value = 3;
	document.getElementById('statsLeft').innerHTML = 0;
}
function createCharacter() {
	// Validation by Lakshika Bhanushali, updated by Kevin Meisenbacher		
	var nameError = document.getElementById('nameError');
	var charName = document.getElementById('charName').value;
	if (charName == '') 
		document.getElementById('nameError').innerHTML = 'A character needs a name';
	else {
		document.getElementById('nameError').innerHTML = '';
		document.getElementById('name').innerHTML = charName;
	}

	var classError = document.getElementById('classError');
	var charClass = document.getElementById('charClass').value;
	if (charClass == '') 
		document.getElementById('classError').innerHTML = 'Everyone has a class';
	else {
		document.getElementById('classError').innerHTML = '';
		document.getElementById('class').innerHTML = charClass;
	}

	var bgError = document.getElementById('bgError');
	var charBG = document.getElementById('charBackground').value;
	if (charBG == '') 
		document.getElementById('bgError').innerHTML = 'Everyone comes from somewhere';
	else {
		document.getElementById('bgError').innerHTML = '';
		document.getElementById('bg').innerHTML = charBG;
	}

	var plNameError = document.getElementById('plNameError');
	var playerName = document.getElementById('playerName').value;
	if (playerName == '') 
		document.getElementById('plNameError').innerHTML = 'Everyone comes from somewhere';
	else {
		document.getElementById('plNameError').innerHTML = '';
		document.getElementById('plName').innerHTML = playerName;
	}
	
	var faction = document.getElementById('charFaction').value;
	document.getElementById('faction').innerHTML = faction;

	var raceError = document.getElementById('raceError');
	var race = document.getElementById('charRace').value;
	if (race == '') 
		document.getElementById('raceError').innerHTML = 'Everyone has some sort of form';
	else {
		document.getElementById('raceError').innerHTML = '';
		document.getElementById('race').innerHTML = race;
	}
	
	var alignError = document.getElementById('alignError');
	var alignment = document.getElementById('charAlign').value;
	if (alignment == '') 
		document.getElementById('bgError').innerHTML = 'Everyone comes from somewhere';
	else {
		document.getElementById('alignError').innerHTML = '';
		document.getElementById('alignment').innerHTML = alignment;
	}

	// Kevin's code from here
	document.getElementById('level').value = 1;
	document.getElementById('experience').value = 0;
	
	// Calculate proficiency bonuses
	if (document.getElementById('level').value >= 1
			|| document.getElementById('level').value <= 4)
				proficiencyBonus = 2;
	if (document.getElementById('level').value >= 5
			|| document.getElementById('level').value <= 8)
				proficiencyBonus = 3;
	if (document.getElementById('level').value >= 9
			|| document.getElementById('level').value <= 12)
				proficiencyBonus = 4;
	if (document.getElementById('level').value >= 13
			|| document.getElementById('level').value <= 16)
				proficiencyBonus = 5;
	if (document.getElementById('level').value >= 17
			|| document.getElementById('level').value <= 20)
				proficiencyBonus = 6;
	
	document.getElementById('profBonus').innerHTML = proficiencyBonus;

	// Set base ability scores
	document.getElementById('strBox').value = document.getElementById('strInput').value;
	document.getElementById('dexBox').value = document.getElementById('dexInput').value;
	document.getElementById('conBox').value = document.getElementById('conInput').value;
	document.getElementById('intBox').value = document.getElementById('intInput').value;
	document.getElementById('wisBox').value = document.getElementById('wisInput').value;
	document.getElementById('chaBox').value = document.getElementById('chaInput').value;
	
	// Set ability modifiers. Had to parse constitution to make it calculate correctly.
	strength = document.getElementById('strInput').value;
	dexterity = document.getElementById('dexInput').value;
	constitution = parseInt(document.getElementById('conInput').value);
	intelligence = document.getElementById('intInput').value;
	wisdom = document.getElementById('wisInput').value;
	charisma = document.getElementById('chaInput').value;
	
	document.getElementById('strBonus').innerHTML = parseInt((strength-10)/2);
	document.getElementById('dexBonus').innerHTML = parseInt((dexterity-10)/2);
	document.getElementById('conBonus').innerHTML = parseInt((constitution-10)/2);
	document.getElementById('intBonus').innerHTML = parseInt((intelligence-10)/2);
	document.getElementById('wisBonus').innerHTML = parseInt((wisdom-10)/2);
	document.getElementById('chaBonus').innerHTML = parseInt((charisma-10)/2);
	
	// Create variables for modifiers to make them easier to program
	strBonus = document.getElementById('strBonus').innerHTML;
	dexBonus = document.getElementById('dexBonus').innerHTML;
	conBonus = document.getElementById('conBonus').innerHTML;
	intBonus = document.getElementById('intBonus').innerHTML;
	wisBonus = document.getElementById('wisBonus').innerHTML;
	chaBonus = document.getElementById('chaBonus').innerHTML;

	// Set appropriate bonuses
	document.getElementById('acrobatics').innerHTML = dexBonus;
	document.getElementById('animalHandling').innerHTML = wisBonus;
	document.getElementById('arcana').innerHTML = intBonus;
	document.getElementById('athletics').innerHTML = strBonus;
	document.getElementById('deception').innerHTML = chaBonus;
	document.getElementById('history').innerHTML = intBonus;
	document.getElementById('insight').innerHTML = wisBonus;
	document.getElementById('intimidation').innerHTML = chaBonus;
	document.getElementById('investigation').innerHTML = intBonus;
	document.getElementById('medicine').innerHTML = wisBonus;
	document.getElementById('nature').innerHTML = intBonus;
	document.getElementById('perception').innerHTML = wisBonus;
	document.getElementById('performance').innerHTML = chaBonus;
	document.getElementById('persuasion').innerHTML = chaBonus;
	document.getElementById('religion').innerHTML = intBonus;
	document.getElementById('sleightOfHand').innerHTML = dexBonus;
	document.getElementById('stealth').innerHTML = dexBonus;
	document.getElementById('survival').innerHTML = wisBonus;
	
	// Set hit dice to calculate health and stuff
	var charClass = document.getElementById('charClass').value;
	if (charClass == 'Sorcerer' || charClass == 'Wizard') {
		hitDie = 6;
	}
	else if (charClass == 'Bard' || charClass == 'Cleric' || charClass == 'Druid'
			|| charClass == 'Monk' || charClass == 'Rogue' || charClass == 'Warlock') {
		hitDie = 8;
	} 
	else if (charClass == 'Fighter' || charClass == 'Ranger'
			|| charClass == 'Paladin' || charClass == 'Sorcerer') {
		hitDie = 10;
	} 
	else if (charClass == 'Barbarian') {
		hitDie = 12;
	}
	document.getElementById('hitDice').innerHTML = hitDice+'d'+parseInt(hitDie);
	
	// Calculate health
	maxHP = parseInt(hitDie + constitution);
	document.getElementById('maxHP').innerHTML = maxHP;
	document.getElementById('currentHP').innerHTML = maxHP;
	
	// Below code saves and loads characters
	// If all required fields are filled, add a character to the character array
	if (nameError.innerHTML == ''
		&&	classError.innerHTML == ''
		&&	bgError.innerHTML == ''
		&&	plNameError.innerHTML == ''
		&&	raceError.innerHTML == ''
		&&	alignError.innerHTML == '') 
	{
		document.getElementById('topFields').style.display = 'flex';
		document.getElementById('sheet').style.display = 'flex';
		document.getElementById('col1').style.display = 'flex';
		document.getElementById('form').style.display = 'none';
		characters.push({
			"id" : id,
			"name" : charName,
			"class" : charClass,
			"background" : charBG,
			"playerName" : playerName,
			"faction" : faction,
			"alignment" : alignment,
			"level" : level,
			"experience" : experience,
			"strength" : strength,
			"dexterity" : dexterity,
			"constitution" : constitution,
			"intelligence" : intelligence,
			"wisdom" : wisdom,
			"charisma" : charisma,
			"maxHP" : maxHP
		}); 
		
		// Initialize the character dropdown
		var select = document.getElementById('selector');
		select.options.length = 0;
		
		// For each new character, give them a new id,
		// add them to the dropdown and update the dropdown
		for (var i=0; i<characters.length; i++) {
			id++;
			var character = document.createElement('option');
			character.setAttribute('value', 'newCharacter');
			var characterName = document.createTextNode(characters[i].name);
			character.appendChild(characterName);
			select.appendChild(character);
			if (characters.length > 1) document.getElementById('selector').selectedIndex++;
			console.log('Characters: ' + characters[i]);
		}
		console.log(characters.length);
	}
}

/* This is needed to have a clean equipment box that the player can add to */
function addItem() {
	// Populate equipment div with dropdowns
	var equipment = document.getElementById('equipment')
	fetch('https://www.dnd5eapi.co/api/equipment')
	.then(res => res.json())
	.then(function(data) {
		var itemList = document.createElement('select');
		itemList.style.borderWidth = '2px';
		itemList.setAttribute('id', 'itemList');
		itemList.className = 'littleInput'
		equipment.appendChild(itemList);
		itemArray.push(itemList);
		var placeholder = document.createElement('option');
		itemList.appendChild(placeholder);
		buy();
		/*var buyButton = document.createElement('button');
		buyButton.setAttribute('onclick', 'buy()');
		buyButton.innerText = 'Buy';
		equipment.appendChild(buyButton);*/
		
		// Populate item dropdowns with each item
		for (var j=0; j<data.results.length; j++) {
			var item = document.createElement('option');
			var itemName = document.createTextNode(data.results[j].name);
			item.value = data.results[j].name;
			item.innerText = data.results[j].name;
			itemList.appendChild(item);
		}
		
		
	});
	console.log(gp);
}

function buy() {
	// Had to plug in the cost of EVERY item MANUALLY!
	var selectedGear = document.getElementById('itemList').value;
	console.log('item: ' + selectedGear);
	for (var i=0; i<itemArray.length; i++) {
		if (selectedGear[i] == "Abacus") gp -= 2; 
		if (selectedGear[i] == "Acid (vial)") gp -= 25; 
		if (selectedGear[i] == "Airship") gp -= 20000; 
		if (selectedGear[i] == "Alchemist's Fire (Flask)") gp -= 50; 
		if (selectedGear[i] == "Alchemist's Supplies") gp -= 50; 
		if (selectedGear[i] == "Alexandrite") gp -= 500; 
		if (selectedGear[i] == "Amber") gp -= 100; 
		if (selectedGear[i] == "Amethyst") gp -= 100; 
		if (selectedGear[i] == "Amulet") gp -= 5; 
		if (selectedGear[i] == "Antitoxin") gp -= 50; 
		if (selectedGear[i] == "Aquamarine") gp -= 500; 
		if (selectedGear[i] == "Arrows") gp -= 1; 
		if (selectedGear[i] == "Assassin's Hood (Ingested)") gp -= 150; 
		if (selectedGear[i] == "Axe Beak") gp -= 50; 
		if (selectedGear[i] == "Azurite") gp -= 10; 
		if (selectedGear[i] == "Backpack") gp -= 2; 
		if (selectedGear[i] == "Bad News Bullets") gp -= 10; 
		if (selectedGear[i] == "Bagpipes") gp -= 30; 
		if (selectedGear[i] == "Ball Bearings (bag of 1,000") gp -= 1; 
		if (selectedGear[i] == "Banded Agate") gp -= 10; 
		if (selectedGear[i] == "Barrel") gp -= 2; 
		if (selectedGear[i] == "Basket") sp -= 2; 
		if (selectedGear[i] == "Battleaxe") gp -= 10; 
		if (selectedGear[i] == "Bedroll") gp -= 1; 
		if (selectedGear[i] == "Bell") gp -= 1; 
		if (selectedGear[i] == "Birdpipes") gp -= 12; 
		if (selectedGear[i] == "Bit and Bridle") gp -= 2; 
		if (selectedGear[i] == "Black Opal") gp -= 1000; 
		if (selectedGear[i] == "Black Pearl") gp -= 500; 
		if (selectedGear[i] == "Black Sap") gp -= 300; 
		if (selectedGear[i] == "Black Sapphire") sp -= 5000; 
		if (selectedGear[i] == "Blanket") sp -= 5; 
		if (selectedGear[i] == "Blight Ichor") gp -= 200; 
		if (selectedGear[i] == "Block and Tackle") gp -= 1; 
		if (selectedGear[i] == "Bloodstone") gp -= 50; 
		if (selectedGear[i] == "Blowgun") gp -= 10; 
		if (selectedGear[i] == "Blowgun Needles") gp -= 1; 
		if (selectedGear[i] == "Blue Quartz") sp -= 10; 
		if (selectedGear[i] == "Blue Sapphire") sp -= 1000; 
		if (selectedGear[i] == "Blue Spinel") gp -= 500; 
		if (selectedGear[i] == "Blunderbuss (Exandria)") gp -= 300;
		if (selectedGear[i] == "Book") gp -= 25;
		if (selectedGear[i] == "Bottle, glass") gp -= 2 ;
		if (selectedGear[i] == "Breastplate") gp -= 400; 
		if (selectedGear[i] == "Brewer's supplies") gp -= 20; 
		if (selectedGear[i] == "Bucket") cp -= 5 
		if (selectedGear[i] == "Burglar's Pack") gp -= 26;
		if (selectedGear[i] == "Calligrapher's supplies") gp -= 10;
		if (selectedGear[i] == "Caltrops") gp -= 1;
		if (selectedGear[i] == "Camel") gp -= 50;
		if (selectedGear[i] == "Candle") cp -= 1;
		if (selectedGear[i] == "Carpenter's tools") gp -= 50;
		if (selectedGear[i] == "Carriage") gp -= 100;
		if (selectedGear[i] == "Cart") gp -= 15;
		if (selectedGear[i] == "Cartographer's tools") gp -= 15;
		if (selectedGear[i] == "Case, crossbow bolt") gp -= 1;
		if (selectedGear[i] == "Case, map or scroll") gp -= 1;
		if (selectedGear[i] == "Chain (10 feet)") gp -= 5;
		if (selectedGear[i] == "Chain Mail") gp -= 75;
		if (selectedGear[i] == "Chain Shirt") gp -= 50;
		if (selectedGear[i] == "Chalk (1 piece)") cp -= 1;
		if (selectedGear[i] == "Chariot") gp -= 250;
		if (selectedGear[i] == "Chest") gp -= 5;
		if (selectedGear[i] == "Climber's Kit") gp -= 25; 
		if (selectedGear[i] == "Clothes, common") sp -= 5;
		if (selectedGear[i] == "Clothes, costume") gp -= 5; 
		if (selectedGear[i] == "Clothes, fine") gp -= 15;
		if (selectedGear[i] == "Clothes, traveler's") gp -= 2; 
		if (selectedGear[i] == "Club") sp -= 1;
		if (selectedGear[i] == "Cobbler's tools") gp -= 5;
		if (selectedGear[i] == "Component pouch") gp -= 25;
		if (selectedGear[i] == "Cook's utensils") gp -= 1;
		if (selectedGear[i] == "Crossbow bolt") gp -= 1;
		if (selectedGear[i] == "Crossbow, hand") gp -= 75;
		if (selectedGear[i] == "Crossbow, heavy") gp -= 50;
		if (selectedGear[i] == "Crossbow, light") gp -= 25;
		if (selectedGear[i] == "Crowbar") gp -= 2;
		if (selectedGear[i] == "Crystal") gp -= 10;
		if (selectedGear[i] == "Dagger") gp -= 2;
		if (selectedGear[i] == "Dart") cp -= 5;
		if (selectedGear[i] == "Dice set") sp -= 1;
		if (selectedGear[i] == "Diplomat's Pack") gp -= 39;
		if (selectedGear[i] == "Disguise Kit") gp -= 25;
		if (selectedGear[i] == "Donkey") gp -= 8;
		if (selectedGear[i] == "Drum") gp -= 6;
		if (selectedGear[i] == "Dulcimer") gp -= 25;
		if (selectedGear[i] == "Dungeoneer's Pack") gp -= 12;
		if (selectedGear[i] == "Elephant") gp -= 200;
		if (selectedGear[i] == "Emblem") gp -= 5;
		if (selectedGear[i] == "Entertainer's Pack") gp -= 40;
		if (selectedGear[i] == "Explorer's Pack") gp -= 10;
		if (selectedGear[i] == "Fishing tackle") gp -= 1;
		if (selectedGear[i] == "Flail") gp -= 10;
		if (selectedGear[i] == "Flask or tankard") sp -= 2;
		if (selectedGear[i] == "Flute") gp -= 2;
		if (selectedGear[i] == "Forgery Kit") gp -= 15;
		if (selectedGear[i] == "Galley") gp -= 30000;
		if (selectedGear[i] == "Glaive") gp -= 20;
		if (selectedGear[i] == "Glassblower's tools") gp -= 30;
		if (selectedGear[i] == "Grappling hook") gp -= 2;
		if (selectedGear[i] == "Greataxe") gp -= 30;
		if (selectedGear[i] == "Greatclub") sp -= 2
		if (selectedGear[i] == "Greatsword") gp -= 50;
		if (selectedGear[i] == "Halberd") gp -= 20;
		if (selectedGear[i] == "Half Plate") gp -= 750;
		if (selectedGear[i] == "Hammer") gp -= 1;
		if (selectedGear[i] == "Hammer, sledge") gp -= 2;
		if (selectedGear[i] == "Handaxe") gp -= 5;
		if (selectedGear[i] == "Healer's Kit") gp -= 5;
		if (selectedGear[i] == "Herbalism Kit") gp -= 5;
		if (selectedGear[i] == "Hide") gp -= 10;
		if (selectedGear[i] == "Holy water (flask)") gp -= 25;
		if (selectedGear[i] == "Horn") gp -= 3;
		if (selectedGear[i] == "Horse, draft") gp -= 50;
		if (selectedGear[i] == "Horse, riding") gp -= 75;
		if (selectedGear[i] == "Hourglass") gp -= 25;
		if (selectedGear[i] == "Hunting trap") gp -= 5;
		if (selectedGear[i] == "Ink (1 ounce bottle)") gp -= 10;
		if (selectedGear[i] == "Ink pen") cp -= 2;
		if (selectedGear[i] == "Javelin") sp -= 5;
		if (selectedGear[i] == "Jeweler's tools") gp -= 25;
		if (selectedGear[i] == "Jug or pitcher") cp -= 2;
		if (selectedGear[i] == "Keelboat") gp -= 3000;
		if (selectedGear[i] == "Ladder (10-foot)") sp -= 1;
		if (selectedGear[i] == "Lamp") gp -= 5;
		if (selectedGear[i] == "Lance") gp -= 10;
		if (selectedGear[i] == "Lantern, bullseye") gp -= 10;
		if (selectedGear[i] == "Lantern, hooded") gp -= 5;
		if (selectedGear[i] == "Leather") gp -= 10;
		if (selectedGear[i] == "Leatherworker's tools") gp -= 5;
		if (selectedGear[i] == "Light hammer") gp -= 2;
		if (selectedGear[i] == "Lock") gp -= 10;
		if (selectedGear[i] == "Longbow") gp -= 50;
		if (selectedGear[i] == "Longship") gp -= 10000;
		if (selectedGear[i] == "Longsword") gp -= 15;
		if (selectedGear[i] == "Lute") gp -= 35;
		if (selectedGear[i] == "Lyre") gp -= 30;
		if (selectedGear[i] == "Mace") gp -= 5;
		if (selectedGear[i] == "Magnifying glass") gp -= 100;
		if (selectedGear[i] == "Manacles") gp -= 2;
		if (selectedGear[i] == "Mason's tools") gp -= 10;
		if (selectedGear[i] == "Mastiff") gp -= 25;
		if (selectedGear[i] == "Maul") gp -= 10;
		if (selectedGear[i] == "Mess Kit") sp -= 2;
		if (selectedGear[i] == "Mirror, steel") gp -= 5;
		if (selectedGear[i] == "Morningstar") gp -= 15;
		if (selectedGear[i] == "Mule") gp -= 8;
		if (selectedGear[i] == "Navigator's tools") gp -= 25;
		if (selectedGear[i] == "Net") gp -= 1;
		if (selectedGear[i] == "Oil (flask)") sp -= 1;
		if (selectedGear[i] == "Orb") gp -= 20;
		if (selectedGear[i] == "Padded") gp -= 5;
		if (selectedGear[i] == "Painter's supplies") gp -= 10;
		if (selectedGear[i] == "Pan flute") gp -= 12;
		if (selectedGear[i] == "Paper (one sheet)") sp -= 2;
		if (selectedGear[i] == "Parchment (one sheet)") sp -= 1;
		if (selectedGear[i] == "Perfume (vial)") gp -= 100;
		if (selectedGear[i] == "Pick, miner's") gp -= 2;
		if (selectedGear[i] == "Pike") gp -= 5;
		if (selectedGear[i] == "Piton") cp -=5; 
		if (selectedGear[i] == "Plate") gp -= 1500;
		if (selectedGear[i] == "Playing card set") gp -= 5;
		if (selectedGear[i] == "Poison, basic (vial)") gp -= 100;
		if (selectedGear[i] == "Poisoner's Kit") gp -= 50;
		if (selectedGear[i] == "Pole (10-foot)") cp -= 5;
		if (selectedGear[i] == "Pony") gp -= 30;
		if (selectedGear[i] == "Pot, iron") gp -= 2;
		if (selectedGear[i] == "Potion of healing") gp -= 50;
		if (selectedGear[i] == "Potter's tools") gp -= 10;
		if (selectedGear[i] == "Pouch") sp -= 5;
		if (selectedGear[i] == "Priest's Pack") gp -= 19;
		if (selectedGear[i] == "Quarterstaff") gp -= 2;
		if (selectedGear[i] == "Quiver") gp -= 1;
		if (selectedGear[i] == "Ram, portable") gp -= 4;
		if (selectedGear[i] == "Rapier") gp -= 25;
		if (selectedGear[i] == "Rations (1 day)") sp -= 5;
		if (selectedGear[i] == "Reliquary") gp -= 5;
		if (selectedGear[i] == "Ring Mail") gp -= 30;
		if (selectedGear[i] == "Robes") gp -= 1;
		if (selectedGear[i] == "Rod") gp -= 10;
		if (selectedGear[i] == "Rope, hempen (50 feet)") gp -= 1;
		if (selectedGear[i] == "Rope, silk (50 feet)") gp -= 10;
		if (selectedGear[i] == "Rowboat") gp -= 50;
		if (selectedGear[i] == "Sack") cp -= 1;
		if (selectedGear[i] == "Saddle, Exotic") gp -= 60;
		if (selectedGear[i] == "Saddle, Military") gp -= 20;
		if (selectedGear[i] == "Saddle, Pack") gp -= 10;
		if (selectedGear[i] == "Saddlebags") gp -= 4;
		if (selectedGear[i] == "Sailing ship") gp -= 10000;
		if (selectedGear[i] == "Scale Mail") gp -= 50;
		if (selectedGear[i] == "Scale, merchant's") gp -= 5;
		if (selectedGear[i] == "Scholar's Pack") gp -= 40;
		if (selectedGear[i] == "Scimitar") gp -= 25;
		if (selectedGear[i] == "Sealing wax") cp -= 5;
		if (selectedGear[i] == "Shawm") gp -= 2;
		if (selectedGear[i] == "Shield") gp -= 10;
		if (selectedGear[i] == "Shortbow") gp -= 25;
		if (selectedGear[i] == "Shortsword") gp -= 10;
		if (selectedGear[i] == "Shovel") gp -= 2;
		if (selectedGear[i] == "Sickle") gp -= 1;
		if (selectedGear[i] == "Signal whistle") cp -= 5;
		if (selectedGear[i] == "Signet ring") gp -= 5;
		if (selectedGear[i] == "Sled") gp -= 20;
		if (selectedGear[i] == "Sling") sp -= 1;
		if (selectedGear[i] == "Sling bullet") cp -= 4;
		if (selectedGear[i] == "Smith's tools") gp -= 20;
		if (selectedGear[i] == "Soap") cp -= 2;
		if (selectedGear[i] == "Spear") gp -= 1;
		if (selectedGear[i] == "Spellbook") gp -= 50;
		if (selectedGear[i] == "Spike, iron") gp -= 1;
		if (selectedGear[i] == "Splint") gp -= 200;
		if (selectedGear[i] == "Sprig of mistletoe") gp -= 1;
		if (selectedGear[i] == "Spyglass") gp -= 1000;
		if (selectedGear[i] == "Staff") gp -= 5;
		if (selectedGear[i] == "Studded Leather") gp -= 45;
		if (selectedGear[i] == "Tent, two-person") gp -= 2;
		if (selectedGear[i] == "Thieves' tools") gp -= 25;
		if (selectedGear[i] == "Tinderbox") sp -= 5;
		if (selectedGear[i] == "Tinker's tools") gp -= 50;
		if (selectedGear[i] == "Torch") cp -= 1;
		if (selectedGear[i] == "Totem") gp -= 1;
		if (selectedGear[i] == "Trident") gp -= 5;
		if (selectedGear[i] == "Vial") gp -= 1;
		if (selectedGear[i] == "Viol") gp -= 30;
		if (selectedGear[i] == "Wagon") gp -= 35;
		if (selectedGear[i] == "Wand") gp -= 10;
		if (selectedGear[i] == "War pick") gp -= 5;
		if (selectedGear[i] == "Warhammer") gp -= 15;
		if (selectedGear[i] == "Warhorse") gp -= 400;
		if (selectedGear[i] == "Warship") gp -= 25000;
		if (selectedGear[i] == "Waterskin") sp -= 2;
		if (selectedGear[i] == "Weaver's tools") gp -= 1;
		if (selectedGear[i] == "Whetstone") cp -= 1;
		if (selectedGear[i] == "Whip") gp -= 2;
		if (selectedGear[i] == "Woodcarver's tools") gp -= 1;
		if (selectedGear[i] == "Wooden staff") gp -= 5;
		if (selectedGear[i] == "Yew wand") gp -= 10;
		document.getElementById('pp').innerHTML = 'PP ' + pp;
		document.getElementById('ep').innerHTML = 'EP ' + ep;
		document.getElementById('gp').innerHTML = 'GP ' + gp;
		document.getElementById('sp').innerHTML = 'SP ' + sp;
		document.getElementById('cp').innerHTML = 'CP ' + cp;
	}
}


// Calculate skill bonuses based on selected skills
function skillBonuses() {
	var skills = [];
	skills = document.getElementsByName('skillBox');
	var selectedSkills = 0;
	for (var i=0; i<skills.length; i++) {
		if (skills[i].checked) {
			selectedSkills++;
			console.log(selectedSkills);
		}
	}
	if (selectedSkills >= 6) {
		if (document.querySelector('selectedSkills').checked) {
			document.querySelector('selectedSkills').checked = false;
		}
	}
}

// Add XP when "add" is clicked and level up past certain thresholds
function addXP() {
	experience += parseInt(document.getElementById('xpInput').value);
	document.getElementById('experience').value = experience;
	console.log(experience);
	levelUp();
}
function levelUp() {
	// Set appropriate level for XP values
	if (experience >= 300) 
		document.getElementById('level').value = 2;
	if (experience >= 900) 
		document.getElementById('level').value = 3;
	if (experience >= 2700) 
		document.getElementById('level').value = 4;
	if (experience >= 6500) 
		document.getElementById('level').value = 5;
	if (experience >= 14000) 
		document.getElementById('level').value = 6;
	if (experience >= 23000) 
		document.getElementById('level').value = 7;
	if (experience >= 34000) 
		document.getElementById('level').value = 8;
	if (experience >= 48000) 
		document.getElementById('level').value = 9;
	if (experience >= 64000) 
		document.getElementById('level').value = 10;
	if (experience >= 85000) 
		document.getElementById('level').value = 11;
	if (experience >= 100000) 
		document.getElementById('level').value = 12;
	if (experience >= 120000) 
		document.getElementById('level').value = 13;
	if (experience >= 140000) 
		document.getElementById('level').value = 14;
	if (experience >= 165000) 
		document.getElementById('level').value = 15;
	if (experience >= 195000) 
		document.getElementById('level').value = 16;
	if (experience >= 225000) 
		document.getElementById('level').value = 17;
	if (experience >= 265000) 
		document.getElementById('level').value = 18;
	if (experience >= 305000) 
		document.getElementById('level').value = 19;
	if (experience >= 355000) 
		document.getElementById('level').value = 20;
	
	// Add hit dice and health
	hitDice = document.getElementById('level').value;
	maxHP += (parseInt(math.random() * hitDie) + parseInt(constitution));
	
	console.log(document.getElementById('level').value);
}

//Functions to add and subtract hp
function addHP() {
	currentHP += document.getElementById('hpInput').value;
	document.getElementById('currentHP').value = currentHP;
	if (currentHP > maxHP) {
		currentHP = maxHP;
		document.getElementById('currentHP').value = maxHP;
	}
}
function subtractHP() {
	currentHP = document.getElementById('currentHP').value;
	currentHP -= document.getElementById('hpInput').value;
	document.getElementById('currentHP').value = currentHP;
}

// Method called at the press of "new character" button
function newCharacter() {
	document.getElementById('form').style.display = 'flex';
	document.getElementById('topFields').style.display = 'none';
	document.getElementById('sheet').style.display = 'none';
	document.getElementById('col1').style.display = 'none';
}