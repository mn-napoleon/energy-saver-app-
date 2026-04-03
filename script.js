let pageHistory = [];
let currentPage = "loginPage"; // starting page


window.addEventListener("load", function(){

setTimeout(function(){

document.getElementById("splash-screen").style.display = "none";
document.getElementById("app-content").style.display = "block";

}, 2500);

});


document.addEventListener("contextmenu", function(e){
e.preventDefault();
});

let appliances = [];

let totalEnergy = 0;
let totalCost = 0;

function navigateTo(pageId){

  // Save current page before leaving
  pageHistory.push(currentPage);

  // Hide all pages
  const pages = ["loginPage","home","input","summary","tips"];
  pages.forEach(p => {
    document.getElementById(p).classList.add("hidden");
  });

  // Show new page
  document.getElementById(pageId).classList.remove("hidden");

  // Update current page
  currentPage = pageId;
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

navigateTo("summary");

}


function showTips(){

navigateTo("tips");

let estimatedMonthlyCost = totalCost * 30;

document.getElementById("moneySaved").innerText =
"Estimated Monthly Energy Cost: $" + estimatedMonthlyCost.toFixed(2);

}


function goHome(){

navigateTo("home");

}


function goBack(){

  if(pageHistory.length === 0) return;

  // Get last visited page
  const previousPage = pageHistory.pop();

  // Hide all pages
  const pages = ["loginPage","home","input","summary","tips"];
  pages.forEach(p => {
    document.getElementById(p).classList.add("hidden");
  });

  // Show previous page
  document.getElementById(previousPage).classList.remove("hidden");

  // Update current page
  currentPage = previousPage;
}

window.addEventListener("load", function(){

  const ctx = document.getElementById('energyChart');

  if (ctx) {
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

window.addEventListener("load", function(){

  const applianceInput = document.getElementById("appliance");

  if (applianceInput) {
    applianceInput.addEventListener("input", function(){

      let name = this.value.toLowerCase();

      if(applianceWatts[name]){
        document.getElementById("watts").value = applianceWatts[name];
      }

    });
  }

});

if ("serviceWorker" in navigator) {

  navigator.serviceWorker.register("service-worker.js").then(reg => {

    console.log("Service Worker Registered");

    //  Detect updates
    reg.onupdatefound = () => {

      const newWorker = reg.installing;

      newWorker.onstatechange = () => {

        if (newWorker.state === "installed") {

          if (navigator.serviceWorker.controller) {
            alert("New version available! Updating app...");
            window.location.reload();
          }

        }

      };

    };

  }).catch(error => console.log("Service Worker Error:", error));

}

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {

  e.preventDefault(); // stop automatic popup

  deferredPrompt = e;

  const installBtn = document.getElementById("installBtn");

  if (installBtn) {
    installBtn.style.display = "block";
  }

});

window.addEventListener("load", () => {

  const installBtn = document.getElementById("installBtn");

  if (!installBtn) return;

  installBtn.addEventListener("click", async () => {

    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    console.log("User choice:", outcome);

    deferredPrompt = null;

    installBtn.style.display = "none";

  });

});

window.onload = () => {
  navigateTo("loginPage");
};
