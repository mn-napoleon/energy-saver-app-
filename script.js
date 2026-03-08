const approvedEmails = [

"admin@gmail.com",
"student1@gmail.com",
"user@outlook.com"

];


let appliances = [];

let totalEnergy = 0;
let totalCost = 0;

function isValidEmail(email){

return email.endsWith("@gmail.com") || email.endsWith("@outlook.com");

}

function loginUser(){

let email = document.getElementById("email").value;

if(!isValidEmail(email)){

document.getElementById("loginMessage").innerText =
"Please enter a Gmail or Outlook account";

return;

}

if(approvedEmails.includes(email)){

document.getElementById("loginPage").style.display = "none";

document.getElementById("home").classList.remove("hidden");

}

else{

document.getElementById("loginMessage").innerText =
"Email is not approved for this system";

}

}


function showInput(){

hideAll();

document.getElementById("input").classList.remove("hidden");

}


function calculate(){

let appliance = document.getElementById("appliance").value;

let tip = "";

if(appliance.toLowerCase() == "tv"){
tip = "Tip: Turn off the TV completely instead of leaving it on standby.";
}

else if(appliance.toLowerCase() == "fridge"){
tip = "Tip: Keep the fridge door closed to save energy.";
}

else if(appliance.toLowerCase() == "fan"){
tip = "Tip: Turn off fans when leaving the room.";
}

else{
tip = "Tip: Unplug devices when not in use.";
}

document.getElementById("dailyUsage").innerText += "\n" + tip;

let hours = document.getElementById("hours").value;

let watts = document.getElementById("watts").value;

let kwh = (watts * hours)/1000;

appliances.push({

name: appliance,
hours: hours,
watts: watts,
energy: kwh

});
let list = document.getElementById("applianceListDisplay");

let item = document.createElement("li");

item.innerText = appliance + " - " + watts + "W (" + kwh.toFixed(2) + " kWh)";

list.appendChild(item);

let cost = kwh * 0.12;

const ctx2 = document.getElementById('usageChart');

new Chart(ctx2, {
type: 'pie',
data: {
labels: ['Used Energy','Remaining Energy (24h capacity)'],
datasets: [{
data: [totalEnergy, 24 - totalEnergy]
}]
}
});

totalEnergy += kwh;
totalCost += cost;

document.getElementById("dailyUsage").innerText =
"Total Energy Used (24 hours): " + totalEnergy.toFixed(2) + " kWh";

let tipsMessage = "";

if(totalEnergy > 5){

tipsMessage = "High energy usage detected. Try reducing appliance hours or switching off unused devices.";

}
else{

tipsMessage = "Good energy usage. Continue using energy efficient appliances.";

}

document.getElementById("dailyUsage").innerText += "\n" + tipsMessage;

document.getElementById("dailyCost").innerText =
"Estimated Daily Cost (24 hours): $" + totalCost.toFixed(2);

hideAll();

document.getElementById("summary").classList.remove("hidden");

}


function showTips(){

hideAll();

document.getElementById("tips").classList.remove("hidden");

let estimatedMonthlyCost = totalCost * 30;

document.getElementById("moneySaved").innerText =
"Estimated Monthly Energy Cost: $" + estimatedMonthlyCost.toFixed(2);

}


function goHome(){

hideAll();

document.getElementById("home").classList.remove("hidden");

}


function hideAll(){

document.getElementById("home").classList.add("hidden");

document.getElementById("input").classList.add("hidden");

document.getElementById("summary").classList.add("hidden");

document.getElementById("tips").classList.add("hidden");

}
const ctx = document.getElementById('energyChart');

new Chart(ctx, {
type: 'bar',
data: {
labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
datasets: [{
label: 'Energy Usage (kWh)',
data: [4,5,3,6,4,7,5]
}]
}
});
const applianceWatts = {

"television (tv)":120,
"air condition":1500,
"fan":75,
"fridge":200,
"blender":400,
"room bulb":10,
"hall light":20,
"microwave":1000,
"rice cooker":700

};
document.getElementById("appliance").addEventListener("input", function(){

let name = this.value.toLowerCase();

if(applianceWatts[name]){

document.getElementById("watts").value = applianceWatts[name];

}

});
