let medicines = [];

let activeReminder = null;
let reminderLoop;

// =========================
// RELIABLE BROWSER ALARM
// =========================

let alarmAudioContext = null;
let alarmInterval = null;

function initAlarmAudio(){

  try{

    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;

    if(!AudioContextClass){
      return false;
    }

    if(!alarmAudioContext){
      alarmAudioContext = new AudioContextClass();
    }

    if(alarmAudioContext.state === "suspended"){
      alarmAudioContext.resume();
    }

    return true;

  }catch(error){

    console.log("Audio initialization error:", error);
    return false;

  }

}


function makeAlarmBeep(){

  if(!initAlarmAudio()){
    return;
  }

  try{

    const now = alarmAudioContext.currentTime;

    const oscillator =
      alarmAudioContext.createOscillator();

    const gain =
      alarmAudioContext.createGain();

    oscillator.type = "square";

    oscillator.frequency.setValueAtTime(
      880,
      now
    );

    gain.gain.setValueAtTime(
      0.0001,
      now
    );

    gain.gain.exponentialRampToValueAtTime(
      0.35,
      now + 0.02
    );

    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + 0.45
    );

    oscillator.connect(gain);

    gain.connect(
      alarmAudioContext.destination
    );

    oscillator.start(now);

    oscillator.stop(
      now + 0.5
    );

  }catch(error){

    console.log(
      "Alarm beep error:",
      error
    );

  }

}


function playAlarm(){

  if(!initAlarmAudio()){

    alert(
      "Please click or tap the page once to enable the alarm sound."
    );

    return;

  }

  stopAlarm(false);

  makeAlarmBeep();

  alarmInterval =
    setInterval(
      makeAlarmBeep,
      1000
    );

}


function stopAlarm(closeContext = false){

  if(alarmInterval){

    clearInterval(
      alarmInterval
    );

    alarmInterval = null;

  }

  const alarm =
    document.getElementById("alarm");

  if(alarm){

    try{

      alarm.pause();

      alarm.currentTime = 0;

      alarm.loop = false;

    }catch(error){}

  }

  if(
    closeContext &&
    alarmAudioContext
  ){

    try{

      alarmAudioContext.close();

    }catch(error){}

    alarmAudioContext = null;

  }

}


// Unlock browser audio when user interacts
// with the webpage.

document.addEventListener(
  "pointerdown",
  function(){

    initAlarmAudio();

  }
);


// =========================
// PATIENT STORAGE
// =========================

function getPatientKey(){

  return localStorage.getItem(
    "patientPhone"
  );

}


function loadPatientMedicines(){

  const key =
    "medicines_" + getPatientKey();

  medicines =
    JSON.parse(
      localStorage.getItem(key)
    ) || [];

}


function savePatientMedicines(){

  const key =
    "medicines_" + getPatientKey();

  localStorage.setItem(
    key,
    JSON.stringify(medicines)
  );

}


function loadPatientLogs(){

  const key =
    "logs_" + getPatientKey();

  return JSON.parse(
    localStorage.getItem(key)
  ) || [];

}


function savePatientLogs(logs){

  const key =
    "logs_" + getPatientKey();

  localStorage.setItem(
    key,
    JSON.stringify(logs)
  );

}


// =========================
// CLOCK
// =========================

function updateClock(){

  const clock =
    document.getElementById("clock");

  if(clock){

    clock.innerHTML =
      new Date().toLocaleTimeString();

  }

}

setInterval(
  updateClock,
  1000
);


// =========================
// LOGIN
// =========================

function loginPatient(){

  // Unlock alarm sound from
  // the login button click.
  initAlarmAudio();

  const name =
    document.getElementById(
      "patientName"
    ).value;

  const age =
    document.getElementById(
      "patientAge"
    ).value;

  const phone =
    document.getElementById(
      "patientPhone"
    ).value;

  const caregiver =
    document.getElementById(
      "caregiverLogin"
    ).value;


  if(
    !name ||
    !age ||
    !phone ||
    !caregiver
  ){

    alert(
      "Please fill all fields"
    );

    return;

  }


  localStorage.setItem(
    "patientName",
    name
  );

  localStorage.setItem(
    "patientAge",
    age
  );

  localStorage.setItem(
    "patientPhone",
    phone
  );

  localStorage.setItem(
    "caregiver",
    caregiver
  );


  loadPatientMedicines();


  document.getElementById(
    "loginSection"
  ).style.display = "none";


  document.getElementById(
    "dashboardSection"
  ).style.display = "block";


  document.getElementById(
    "welcomeText"
  ).innerHTML =
    `👋 Hi, ${name}!`;


  loadProfile();

  loadMedicines();

  loadLogs();

}


// =========================
// AUTO LOGIN
// =========================

window.onload = function(){

  updateClock();


  const patient =
    localStorage.getItem(
      "patientName"
    );


  if(patient){

    loadPatientMedicines();


    document.getElementById(
      "loginSection"
    ).style.display = "none";


    document.getElementById(
      "welcomeSection"
    ).style.display = "flex";


    // FIXED: patient instead of name

    document.getElementById(
      "welcomeUser"
    ).innerHTML =
      `Welcome, ${patient}!`;


    setTimeout(() => {

      document.getElementById(
        "welcomeSection"
      ).style.display = "none";


      document.getElementById(
        "dashboardSection"
      ).style.display = "block";


      loadProfile();

      loadMedicines();

      loadLogs();

    },3000);


    document.getElementById(
      "welcomeText"
    ).innerHTML =
      `👋 Hi, ${patient}!`;

  }

};


// =========================
// PROFILE
// =========================

function loadProfile(){

  const profile =
    document.getElementById(
      "patientProfile"
    );

  if(!profile){
    return;
  }


  profile.innerHTML =

    `Name: ${
      localStorage.getItem("patientName")
    }<br>

     Age: ${
       localStorage.getItem("patientAge")
     }<br>

     Phone: ${
       localStorage.getItem("patientPhone")
     }`;

}


// =========================
// ADD MEDICINE
// =========================

function addMedicine(){

  // Unlock audio when user presses
  // Add Medicine.
  initAlarmAudio();


  const name =
    document.getElementById(
      "medicineName"
    ).value;


  const dosage =
    document.getElementById(
      "dosage"
    ).value;


  const time =
    document.getElementById(
      "medicineTime"
    ).value;


  if(
    !name ||
    !dosage ||
    !time
  ){

    alert(
      "Fill all medicine details"
    );

    return;

  }


  medicines.push({

    name: name,

    dosage: dosage,

    time: time,

    status: "Pending"

  });


  savePatientMedicines();


  addLog(
    `${name} added`
  );


  loadMedicines();

  updateDashboard();


  // Clear fields

  document.getElementById(
    "medicineName"
  ).value = "";

  document.getElementById(
    "dosage"
  ).value = "";

  document.getElementById(
    "medicineTime"
  ).value = "";

}


// =========================
// LOAD MEDICINES
// =========================

function loadMedicines(){

  const list =
    document.getElementById(
      "medicineList"
    );

  if(!list){
    return;
  }


  list.innerHTML = "";


  medicines.forEach(
    (med,index) => {

      const li =
        document.createElement(
          "li"
        );


      li.innerHTML =

        `<b>${med.name}</b><br>

        Dosage: ${med.dosage}<br>

        Time: ${med.time}<br>

        Status: ${med.status}<br><br>

        <button onclick="markTaken(${index})">
          Taken
        </button>`;


      list.appendChild(li);

    }
  );


  updateDashboard();

}


// =========================
// DASHBOARD & REPORT
// =========================

function updateDashboard(){

  const total =
    medicines.length;


  const taken =
    medicines.filter(
      med => med.status === "Taken"
    ).length;


  const missed =
    medicines.filter(
      med => med.status === "Missed"
    ).length;


  const adherence =
    total === 0
      ? 0
      : Math.round(
          (taken / total) * 100
        );


  const totalMedicine =
    document.getElementById(
      "totalMedicine"
    );

  if(totalMedicine){
    totalMedicine.innerHTML =
      total;
  }


  const takenCount =
    document.getElementById(
      "takenCount"
    );

  if(takenCount){
    takenCount.innerHTML =
      taken;
  }


  const missedCount =
    document.getElementById(
      "missedCount"
    );

  if(missedCount){
    missedCount.innerHTML =
      missed;
  }


  const adherenceElement =
    document.getElementById(
      "adherence"
    );

  if(adherenceElement){
    adherenceElement.innerHTML =
      adherence + "%";
  }


  // =========================
  // REPORT
  // =========================

  const reportTotal =
    document.getElementById(
      "reportTotal"
    );

  if(reportTotal){
    reportTotal.innerHTML =
      total;
  }


  const reportTaken =
    document.getElementById(
      "reportTaken"
    );

  if(reportTaken){
    reportTaken.innerHTML =
      taken;
  }


  const reportMissed =
    document.getElementById(
      "reportMissed"
    );

  if(reportMissed){
    reportMissed.innerHTML =
      missed;
  }


  const reportAdherence =
    document.getElementById(
      "reportAdherence"
    );

  if(reportAdherence){
    reportAdherence.innerHTML =
      adherence + "%";
  }


  const reportTable =
    document.getElementById(
      "reportTable"
    );


  if(reportTable){

    reportTable.innerHTML = "";


    medicines.forEach(
      med => {

        reportTable.innerHTML +=

          `<tr>

            <td>${med.name}</td>

            <td>${med.dosage}</td>

            <td>${med.time}</td>

            <td>${med.status}</td>

          </tr>`;

      }
    );

  }

}


// =========================
// MARK TAKEN
// =========================

function markTaken(index){

  if(!medicines[index]){
    return;
  }


  medicines[index].status =
    "Taken";


  savePatientMedicines();


  try{

    speechSynthesis.cancel();

  }catch(error){}


  clearInterval(
    reminderLoop
  );


  // STOP ALARM

  stopAlarm(false);


  activeReminder = null;


  addLog(
    medicines[index].name +
    " taken"
  );


  loadMedicines();

  updateDashboard();

}


// =========================
// REMINDER CHECK
// =========================

function checkReminders(){

  const currentTime =
    new Date()
      .toTimeString()
      .substring(0,5);


  medicines.forEach(
    (medicine,index) => {

      if(
        medicine.time === currentTime &&
        medicine.status === "Pending"
      ){

        triggerReminder(
          medicine,
          index
        );

      }

    }
  );

}

setInterval(
  checkReminders,
  1000
);


// =========================
// REMINDER ALERT
// =========================

function triggerReminder(
  medicine,
  index
){

  if(
    activeReminder === index
  ){

    return;

  }


  activeReminder = index;


  // =========================
  // START ALARM SOUND
  // =========================

  playAlarm();


  // =========================
  // SPEAK IMMEDIATELY
  // =========================

  try{

    speechSynthesis.cancel();


    const firstSpeech =
      new SpeechSynthesisUtterance(
        `Time to take ${medicine.name}`
      );


    firstSpeech.lang =
      "en-US";


    speechSynthesis.speak(
      firstSpeech
    );

  }catch(error){

    console.log(
      "Speech error:",
      error
    );

  }


  // =========================
  // REPEAT VOICE
  // =========================

  reminderLoop =
    setInterval(
      () => {

        try{

          const speech =
            new SpeechSynthesisUtterance(
              `Time to take ${medicine.name}`
            );


          speech.lang =
            "en-US";


          speechSynthesis.speak(
            speech
          );

        }catch(error){

          console.log(
            "Speech error:",
            error
          );

        }

      },
      5000
    );


  addLog(
    "Reminder started for " +
    medicine.name
  );


  const nextReminder =
    document.getElementById(
      "nextReminder"
    );


  if(nextReminder){

    nextReminder.innerHTML =
      `${medicine.name} (${medicine.time})`;

  }


  // =========================
  // MISS AFTER 1 MINUTE
  // =========================

  setTimeout(
    () => {

      clearInterval(
        reminderLoop
      );


      if(
        medicines[index] &&
        medicines[index].status === "Pending"
      ){

        // STOP ALARM

        stopAlarm(false);

        try{
          speechSynthesis.cancel();
        }catch(error){}


        medicines[index].status =
          "Missed";


        savePatientMedicines();


        addLog(
          medicine.name +
          " missed"
        );


        // SEND SMS

        sendMissedSMS(
          medicine
        );


        loadMedicines();

        updateDashboard();


        activeReminder = null;

      }

    },
    60000
  );

}


// =========================
// SMS FUNCTION
// =========================

function sendMissedSMS(
  medicine
){

  const caregiver =
    localStorage.getItem(
      "caregiver"
    );


  if(!caregiver){
    return;
  }


  const smsText =
    encodeURIComponent(

      `Medicine Missed Alert\n` +

      `Medicine: ${medicine.name}\n` +

      `Time: ${medicine.time}`

    );


  // OPEN SMS APP

  window.location.href =
    `sms:${caregiver}?body=${smsText}`;


  // OPTIONAL CALL

  setTimeout(
    () => {

      const confirmCall =
        confirm(
          "Call caregiver now?"
        );


      if(confirmCall){

        window.location.href =
          `tel:${caregiver}`;

      }

    },
    4000
  );

}


// =========================
// LOG SYSTEM
// =========================

function addLog(
  message
){

  let logs =
    loadPatientLogs();


  logs.unshift(

    new Date().toLocaleString()
    +
    " - "
    +
    message

  );


  savePatientLogs(
    logs
  );


  loadLogs();

}


function loadLogs(){

  const list =
    document.getElementById(
      "logList"
    );


  if(!list){
    return;
  }


  list.innerHTML = "";


  const logs =
    loadPatientLogs();


  logs.forEach(
    log => {

      const li =
        document.createElement(
          "li"
        );


      li.innerHTML =
        log;


      list.appendChild(
        li
      );

    }
  );

}


// =========================
// ALARM TEST
// =========================

// You can run testAlarm()
// from the browser console
// to test the sound.

function testAlarm(){

  initAlarmAudio();

  playAlarm();


  setTimeout(
    () => {

      stopAlarm(false);

    },
    5000
  );

}


// =========================
// OTHER FEATURES
// =========================

function callAmbulance(){

  addLog(
    "Calling ambulance"
  );


  window.location.href =
    "tel:108";

}


function toggleDarkMode(){

  document.body.classList.toggle(
    "dark-mode"
  );

}


function logout(){

  // Stop alarm before logout

  stopAlarm(false);


  localStorage.removeItem(
    "patientName"
  );


  location.reload();

}


function callCaregiver(){

  const caregiver =
    localStorage.getItem(
      "caregiver"
    );


  if(!caregiver){

    alert(
      "No caregiver number found."
    );

    return;

  }


  addLog(
    "Calling caregiver"
  );


  window.location.href =
    `tel:${caregiver}`;

}


// =========================
// DOWNLOAD REPORT
// =========================

function downloadReport(){

  // FIXED: use current patient's medicine storage

  const key =
    "medicines_" + getPatientKey();


  let medicines =
    JSON.parse(
      localStorage.getItem(key)
    ) || [];


  if(
    medicines.length === 0
  ){

    alert(
      "No medicine data available!"
    );

    return;

  }


  if(!window.jspdf){

    alert(
      "PDF library is not loaded."
    );

    return;

  }


  const {
    jsPDF
  } = window.jspdf;


  let pdf =
    new jsPDF();


  let patient =
    localStorage.getItem(
      "patientName"
    ) || "Patient";


  pdf.setFontSize(
    20
  );


  pdf.text(
    "MEDICARE AI",
    20,
    20
  );


  pdf.setFontSize(
    14
  );


  pdf.text(
    "Medicine Report",
    20,
    32
  );


  pdf.setFontSize(
    12
  );


  pdf.text(
    "Patient Name: " + patient,
    20,
    45
  );


  let y = 65;


  pdf.text(
    "Medicine",
    20,
    y
  );


  pdf.text(
    "Dosage",
    75,
    y
  );


  pdf.text(
    "Time",
    120,
    y
  );


  pdf.text(
    "Status",
    160,
    y
  );


  y += 10;


  medicines.forEach(
    med => {

      pdf.text(
        med.name || "",
        20,
        y
      );


      pdf.text(
        med.dosage || "",
        75,
        y
      );


      pdf.text(
        med.time || "",
        120,
        y
      );


      pdf.text(
        med.status || "Pending",
        160,
        y
      );


      y += 10;


      if(y > 280){

        pdf.addPage();

        y = 20;

      }

    }
  );


  pdf.text(
    "Generated by MEDICARE AI",
    20,
    y + 15
  );


  pdf.save(
    "MEDICARE_AI_Medicine_Report.pdf"
  );

}
