// *********************************************
// styling codes
// *********************************************

// hide/unhide submit button if input is empty
const submitSetup = document.querySelector("#info button"),
  inputName = document.querySelector("#info input"),
  inputFocus = document.querySelector("#focus-question > input"),
  submitFocus = document.querySelector("#focus-question > button"),
  setupPage = document.querySelector("#setup"),
  mainContent = document.querySelector("main"),
  mainFocus = document.querySelector("#focus"),
  focusQuestion = document.querySelector("#focus-question");

inputName.addEventListener("keyup", () => {
  // Check if input is empty or not
  if (inputName.value == "") {
    submitSetup.style.opacity = "0";
    submitSetup.style.visibility = "hidden";
  } else {
    submitSetup.style.opacity = "1";
    submitSetup.style.visibility = "visible";
  }
});
inputFocus.addEventListener("keyup", () => {
  // Check if input is empty or not
  if (inputFocus.value == "") {
    submitFocus.style.opacity = "0";
    submitFocus.style.visibility = "hidden";
  } else {
    submitFocus.style.opacity = "1";
    submitFocus.style.visibility = "visible";
  }
});

// *********************************************
// function codes
// *********************************************

// prevents buttons to reload page on click
// ****NOTE: if in the future we need a working form, simply remove this lines of code and replace all button type with type="button" instead.
const allButtons = document.querySelectorAll("button");
for (let button of allButtons) {
  button.addEventListener("click", (e) => {
    e.preventDefault();
  });
}

// sets the page up for localStorage
let userInfo = {},
  storageItem = JSON.parse(localStorage.getItem("userInfo"));

// what do we store in localStorage?
// 1. time format preference
// 2. user name
// 3. focus
// 4. profile photo
// 5. todo list array
// 6. quotes array
// 7. background photos preference

// function to update localStorage with current userInfo values
function updateLocalStorage() {
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
}

// show real time local clock
const timeDiv = document.querySelector("#time"),
  timeSwitcher = document.querySelector("#format-switch");
let timeInterval = 100, // unit in milliseconds
  timeDisplay = setInterval(() => {
    timeDiv.textContent = new Date().toLocaleTimeString();
  }, timeInterval);

// runs on checkbox clicks
timeSwitcher.addEventListener("change", () => {
  // check if input is toggled
  if (timeSwitcher.checked) {
    // clears setInterval to prevent simultaneous display of 2 different time format
    clearInterval(timeDisplay);
    // stores true value to userInfo
    userInfo["time-format"] = true;
    timeDisplay = setInterval(() => {
      timeDiv.textContent = new Date().toLocaleTimeString("PH", {
        hour12: false,
      });
    }, timeInterval);
    // uploads new userInfo value to localStorage
    updateLocalStorage();
  } else {
    clearInterval(timeDisplay);
    userInfo["time-format"] = false;
    timeDisplay = setInterval(() => {
      timeDiv.textContent = new Date().toLocaleTimeString();
    }, timeInterval);
    updateLocalStorage();
  }
});

// show today's date
const dateDiv = document.querySelector("#date"),
  currentDateTime = new Date(),
  // array of months to be assigned for date format
  month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  // array of days to be assigned for date format
  day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
dateDiv.textContent =
  day[currentDateTime.getDay()] +
  " - " +
  month[currentDateTime.getMonth()] +
  " " +
  currentDateTime.getDate() +
  ", " +
  currentDateTime.getFullYear();

// show greetings
const greetingDiv = document.querySelector("#greeting"),
  greetStatement = "Good ",
  generalTimeOfDay = ["Morning", "Afternoon", "Evening"],
  // assigns time of day starting time
  morningStart = 0, // 00:00
  afternoonStart = 12, // 12:00
  eveningStart = 16; // 16:00;

function greet() {
  // check if morning, afternoon, or evening
  if (currentDateTime.getHours() >= morningStart) {
    greetingDiv.textContent =
      greetStatement + generalTimeOfDay[0] + ", " + userInfo.name + ".";
  }
  if (currentDateTime.getHours() > afternoonStart) {
    greetingDiv.textContent =
      greetStatement + generalTimeOfDay[1] + ", " + userInfo.name + ".";
  }
  if (currentDateTime.getHours() > eveningStart) {
    greetingDiv.textContent =
      greetStatement + generalTimeOfDay[2] + ", " + userInfo.name + ".";
  }
}

// setup username
const setupNameButton = document.querySelector("#setup #info button"),
  setupNameInput = document.querySelector("#setup #info #name"),
  namePattern = /[a-zA-Z]{1,}/;

// runs on button click
setupNameButton.addEventListener("click", () => {
  // input validation
  // runs if input pattern valid
  if (namePattern.test(setupNameInput.value)) {
    // resets userInfo
    userInfo = {};
    // clear the localStorage for reset
    localStorage.clear();
    // reset time format
    clearInterval(timeDisplay);
    userInfo["time-format"] = false;
    timeDisplay = setInterval(() => {
      timeDiv.textContent = new Date().toLocaleTimeString();
    }, timeInterval);
    // initially sets userInfo.name value
    userInfo["name"] = setupNameInput.value;
    // show greeting
    greet();
    // update localStorage with new values
    updateLocalStorage();

    // styling code
    // hides setup page and shows main content only
    // (forward animation - no backwards animation)
    setupPage.style.visibility = "hidden";
    setupPage.style.opacity = "0";
    mainContent.style.visibility = "visible";
    mainContent.style.opacity = "1";
  } else {
    console.log("name not valid");
  }
  // runs when input pattern invalid
});

// show focus
const getFocusButton = document.querySelector("#focus-question > button"),
  getFocusInput = document.querySelector("#focus-question > input"),
  showFocusLabel = document.querySelector("#focus > label"),
  showFocusCheckbox = document.querySelector("#focus-checkbox"),
  focusPattern = /[A-Za-z0-9+-/*',.><{}()\[\]#@!$%^&]{1,}/;

function showFocus() {
  showFocusLabel.textContent = userInfo.focus;
  getFocusInput.value = userInfo.focus;
}

// congratulates user if focus is checked out
showFocusCheckbox.addEventListener("click", () => {
  const congratulate = document.querySelector("#congratulate");
  let jobDonePat = [
      "Well done!",
      "Great job!",
      "Nicely done.",
      "Good job!",
      "A pat on the back for ya!",
      "Amazing!",
      "Keep up the good work!",
      "Let's keep it rolling!",
      "That's done!",
      "SKRRRRRT",
      "Gagi pare, galing!",
      "sheeeeEEEEEESHHH!",
      "#NeverForget",
    ],
    patPicker = Math.floor(Math.random() * jobDonePat.length);
  if (showFocusCheckbox.checked === true) {
    congratulate.style.opacity = "1";
    congratulate.textContent = jobDonePat[patPicker];
    setTimeout(() => {
      congratulate.style.opacity = "0";
    }, 2000);
  }
});

// get value of checkbox if checked or not and store it in localStorage
showFocusCheckbox.addEventListener("change", () => {
  if (showFocusCheckbox.checked) {
    userInfo["focusCheckbox"] = true;
    updateLocalStorage();
  } else {
    userInfo["focusCheckbox"] = false;
    updateLocalStorage();
  }
});

// gets today's focus value and update value of label for checkbox. updates value of localStorage if focus is changed
// added: now also disables input field and add a userInfo key for disabled input value in localStorage
getFocusButton.addEventListener("click", () => {
  if (focusPattern.test(getFocusInput.value)) {
    let hoursLeft = 24 - currentDateTime.getHours(),
      millisecondsLeft = hoursLeft * 3600000;
    userInfo["focus"] = getFocusInput.value;
    userInfo["focusExpiration"] = currentDateTime.getTime() + millisecondsLeft;
    userInfo["focusInputDisabled"] = true;
    getFocusInput.disabled = true;
    showFocus();
    updateLocalStorage();

    // styling codes
    // shows the main focus, hides focus question
    // (forward animation)
    focusQuestion.style.visibility = "hidden";
    focusQuestion.style.opacity = "0";
    mainFocus.style.visibility = "visible";
    mainFocus.style.opacity = "1";
  } else {
    console.log("invalid focus");
  }
});

// edit focus (makes focus editable)
const editFocusButton = document.querySelector("#edit-focus button");

// function to make the input editable
function editFocus() {
  getFocusInput.disabled = false;
}

// calls the function to edit the focus
editFocusButton.addEventListener("click", () => {
  editFocus();

  // styling codes
  // hides the main focus, shows focus question
  // (backwards animation)
  focusQuestion.style.visibility = "visible";
  focusQuestion.style.opacity = "1";
  mainFocus.style.visibility = "hidden";
  mainFocus.style.opacity = "0";
});

// clear focus
const clearFocusButton = document.querySelector("#clear-focus button");

// a funnction that clears the focus
function clearFocus() {
  // resets every focus values
  userInfo.focusExpiration = "";
  userInfo.focus = "";
  userInfo.focusCheckbox = false;
  showFocusCheckbox.checked = false;
  userInfo.focusInputDisabled = false;
  getFocusInput.disabled = false;
  showFocus();
  updateLocalStorage();

  // styling codes
  // hides the main focus, shows focus question
  // (backwards animation)
  focusQuestion.style.visibility = "visible";
  focusQuestion.style.opacity = "1";
  mainFocus.style.visibility = "hidden";
  mainFocus.style.opacity = "0";
}

// calls the function on click
clearFocusButton.addEventListener("click", () => {
  clearFocus();
});

//**************************************************************************//
//**************************************************************************//
// there should be three functions
// 1. function upon submission/button click will store the input value to object userInfo
// 2. function that will update document with userInfo
// 3. function that will update localStorage [checked]
//**************************************************************************//
//**************************************************************************//

// checks the localStorage, if null = first time visitor => will use default userInfo values
if (storageItem) {
  // gets localStorage values as userInfo values
  userInfo = storageItem;

  // styling codes
  // hides setup page and shows main content only
  // (forwards animation - no backwards animation)
  setupPage.style.visibility = "hidden";
  setupPage.style.opacity = "0";
  mainContent.style.visibility = "visible";
  mainContent.style.opacity = "1";

  if (userInfo.focus) {
    // styling codes
    // shows the main focus, hides focus question
    // (forward animation)
    focusQuestion.style.visibility = "hidden";
    focusQuestion.style.opacity = "0";
    mainFocus.style.visibility = "visible";
    mainFocus.style.opacity = "1";
  }
  if (userInfo.focus === "" || userInfo.focus === undefined) {
    // styling codes
    // hides the main focus, shows focus question
    // (backward animation)
    focusQuestion.style.visibility = "visible";
    focusQuestion.style.opacity = "1";
    mainFocus.style.visibility = "hidden";
    mainFocus.style.opacity = "0";
  }

  // gets time format preference from localStorage
  if (storageItem["time-format"] === true) {
    timeSwitcher.checked = true;
    clearInterval(timeDisplay);
    timeDisplay = setInterval(() => {
      timeDiv.textContent = new Date().toLocaleTimeString("PH", {
        hour12: false,
      });
    }, timeInterval);
  }

  // show greeting with localStorage name value
  // 36000000 = 1hr
  setInterval(greet(), 3600000);
  // show focus with localStorage focus value
  if (userInfo.focus) {
    showFocus();
  }
  // if focus has value, it disables the input
  if (userInfo.focusInputDisabled === true) {
    getFocusInput.disabled = true;
  }
  // check if focus is expired
  if (currentDateTime.getTime() < storageItem.focusExpiration) {
    // if not expired, checks if focusCheckbox is checked
    if (storageItem["focusCheckbox"] === true) {
      showFocusCheckbox.checked = true;
    }
  }
  if (currentDateTime.getTime() > storageItem.focusExpiration) {
    // if expired, resets every focus value if focus has expired
    clearFocus();
  }
}
