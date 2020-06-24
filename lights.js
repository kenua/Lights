"use strict";

let lights = {
   lightPower: false,
   lightElements: [],
   lightColors: ["#e74c3c","#e67e22","#f1c40f","#2ecc71","#3498db","#2980b9","#8e44ad"],
   lightIndex: 0,
   previousLight: null,
   interval: null,
   intervalTime: 1000,

   createLights(numberOfLights) { 
      if(numberOfLights > 1 && numberOfLights < 8) {
         // Resets the array to prevent extra elements
         this.lightElements = [];
         for(let i = 0; i < numberOfLights; i++) {
            let newLight = document.createElement("div");
            newLight.classList.add("light");
            newLight.style.backgroundColor = this.lightColors[i];
   
            this.lightElements.push(newLight);
         }
      }
   },

   appendLights() {
      document.querySelector(".lights-container").innerHTML = "";
      this.lightElements.forEach(light => document.querySelector(".lights-container").appendChild(light)); 
   },

   togglePower(callback) {
      if(this.lightPower) {
         this.lightPower = false;
         clearInterval(this.interval);
         callback("OFF");
      } else {
         this.lightPower = true;
         this.interval = setInterval(this.intervalFunc.bind(this), this.intervalTime);
         callback("ON");
      }
   },

   intervalFunc() {
      // Remove light--on class name of the previous light
      if(this.lightIndex > 0) {
         this.previousLight = this.lightElements[this.lightIndex -1];
         this.previousLight.classList.remove("light--on");
      }
      // Reset lightIndex
      if(this.lightIndex > this.lightElements.length -1) this.lightIndex = 0;

      this.lightElements[this.lightIndex].classList.add("light--on");
      this.lightIndex++;
   },

   changeIntervalValue(e) {
      this.intervalTime = e.target.value;
      
      if(this.lightPower) {
         clearInterval(this.interval);
         this.interval = setInterval(this.intervalFunc.bind(this), this.intervalTime);
      }
   }
};

// Set default lights
lights.createLights(7);
lights.appendLights();

// Turn ON or OFF lights
let switchButton = document.querySelector("#toggle-power-button");
let switchButtonText = document.querySelector("#switch-button-text");
switchButton.addEventListener("click", (evt) => {
   lights.togglePower((text) => switchButtonText.textContent = text);

   if(switchButtonText.textContent === "ON") {
      switchButton.firstElementChild.classList.add("switch-button__ball--on");
   } else {
      switchButton.firstElementChild.classList.remove("switch-button__ball--on");
   }
});

// Change timing
let timingElement = document.getElementById("timing-control");
timingElement.addEventListener("change", lights.changeIntervalValue.bind(lights));

// Add or remove lights
let numOfLightsElement = document.querySelector("#num-of-lights");
numOfLightsElement.addEventListener("click", (evt) => evt.target.value = "");
numOfLightsElement.addEventListener("input", (evt) => {
   let value = Number(evt.target.value);

   if(!isNaN(value) && value > 1 && value < 8) {
      lights.lightIndex = 0;
      lights.previousLight = null;
      lights.createLights(value);
      lights.appendLights();
   }
});