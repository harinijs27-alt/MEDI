/* =========================================================
   JS MEDICARE - COMPLETE SCRIPT
   ========================================================= */

let medicines = [];
let activeReminder = null;

let reminderCheckerTimer = null;
let reminderVoiceTimer = null;
let reminderMissTimer = null;

let patientName = "";
let patientPhone = "";
let selectedLanguage = "en";

let voiceUnlocked = false;


/* =========================================================
   VOICE MEDICINE ENTRY
   ========================================================= */

let voiceRecognition = null;
let voiceEntryActive = false;
let voiceStep = null;


/* =========================================================
   "I TOOK IT" RECOGNITION
   ========================================================= */

let takenVoiceRecognition = null;
let takenVoiceRestartTimer = null;
let takenVoiceActive = false;


/* =========================================================
   VIBRATION
   ========================================================= */

let vibrationTimer = null;


/* =========================================================
   TRANSLATIONS
   ========================================================= */

const translations = {

    en: {
        subtitle: "AI Powered Healthcare Assistant",
        aiMonitoring: "● AI Monitoring Online",
        welcome: "Welcome",

        reminder: "It is time to take your medicine.",
        taken: "Medicine taken successfully.",
        missed: "Medicine was missed.",

        noMedicines: "No medicines added.",
        noReminder: "No medicines scheduled.",

        namePrompt: "Please say the medicine name.",
        dosagePrompt: "Now please say the dosage.",
        timePrompt: "Now please say the medicine time.",

        confirmation: "Medicine details filled successfully.",
        listening: "Listening...",

        voiceNotSupported:
            "Voice recognition is not supported in this browser."
    },

    ta: {
        subtitle: "AI இயங்கும் சுகாதார உதவியாளர்",
        aiMonitoring: "● AI கண்காணிப்பு ஆன்லைனில் உள்ளது",
        welcome: "வரவேற்கிறோம்",

        reminder: "உங்கள் மருந்தை எடுத்துக்கொள்ள வேண்டிய நேரம் இது.",
        taken: "மருந்து வெற்றிகரமாக எடுத்துக்கொள்ளப்பட்டது.",
        missed: "மருந்து தவறிவிட்டது.",

        noMedicines: "மருந்துகள் எதுவும் சேர்க்கப்படவில்லை.",
        noReminder: "மருந்துகள் எதுவும் திட்டமிடப்படவில்லை.",

        namePrompt: "மருந்தின் பெயரை சொல்லுங்கள்.",
        dosagePrompt: "இப்போது மருந்தின் அளவை சொல்லுங்கள்.",
        timePrompt: "இப்போது மருந்து எடுத்துக்கொள்ளும் நேரத்தை சொல்லுங்கள்.",

        confirmation: "மருந்து விவரங்கள் வெற்றிகரமாக நிரப்பப்பட்டன.",
        listening: "கேட்கிறது...",

        voiceNotSupported:
            "இந்த உலாவியில் குரல் வசதி ஆதரிக்கப்படவில்லை."
    },

    hi: {
        subtitle: "AI संचालित स्वास्थ्य सहायक",
        aiMonitoring: "● AI निगरानी ऑनलाइन",
        welcome: "स्वागत है",

        reminder: "आपकी दवा लेने का समय हो गया है।",
        taken: "दवा सफलतापूर्वक ले ली गई है।",
        missed: "दवा छूट गई है।",

        noMedicines: "कोई दवा नहीं जोड़ी गई है।",
        noReminder: "कोई दवा निर्धारित नहीं है।",

        namePrompt: "कृपया दवा का नाम बोलें।",
        dosagePrompt: "अब दवा की मात्रा बोलें।",
        timePrompt: "अब दवा लेने का समय बोलें।",

        confirmation: "दवा की जानकारी सफलतापूर्वक भर दी गई है।",
        listening: "सुन रहा है...",

        voiceNotSupported:
            "इस ब्राउज़र में वॉइस रिकग्निशन समर्थित नहीं है।"
    },

    te: {
        subtitle: "AI ఆధారిత ఆరోగ్య సహాయకుడు",
        aiMonitoring: "● AI పర్యవేక్షణ ఆన్‌లైన్‌లో ఉంది",
        welcome: "స్వాగతం",

        reminder: "మీ మందు తీసుకునే సమయం వచ్చింది.",
        taken: "మందు విజయవంతంగా తీసుకున్నారు.",
        missed: "మందు మిస్ అయింది.",

        noMedicines: "మందులు ఏవీ జోడించలేదు.",
        noReminder: "మందులు ఏవీ షెడ్యూల్ చేయలేదు.",

        namePrompt: "దయచేసి మందు పేరు చెప్పండి.",
        dosagePrompt: "ఇప్పుడు మందు మోతాదు చెప్పండి.",
        timePrompt: "ఇప్పుడు మందు తీసుకునే సమయం చెప్పండి.",

        confirmation: "మందు వివరాలు విజయవంతంగా నింపబడ్డాయి.",
        listening: "వింటోంది...",

        voiceNotSupported:
            "ఈ బ్రౌజర్‌లో వాయిస్ గుర్తింపు అందుబాటులో లేదు."
    }

};


/* =========================================================
   GET TRANSLATION
   ========================================================= */

function getText(key) {

    if (
        translations[selectedLanguage] &&
        translations[selectedLanguage][key]
    ) {
        return translations[selectedLanguage][key];
    }

    return translations.en[key];
}


/* =========================================================
   LANGUAGE
   ========================================================= */

function getBrowserLanguage() {

    const languageMap = {

        en: "en-IN",
        ta: "ta-IN",
        hi: "hi-IN",
        te: "te-IN"

    };

    return languageMap[selectedLanguage] || "en-IN";
}


function applyLanguage() {

    const languageSelect =
        document.getElementById("languageSelect");

    const dashboardLanguage =
        document.getElementById("dashboardLanguage");

    if (languageSelect) {
        languageSelect.value = selectedLanguage;
    }

    if (dashboardLanguage) {
        dashboardLanguage.value = selectedLanguage;
    }

    const aiStatus =
        document.getElementById("aiStatus");

    if (aiStatus) {
        aiStatus.textContent =
            getText("aiMonitoring");
    }
}


function changeDashboardLanguage() {

    const select =
        document.getElementById("dashboardLanguage");

    if (!select) {
        return;
    }

    selectedLanguage = select.value;

    localStorage.setItem(
        "jsMedicareLanguage",
        selectedLanguage
    );

    applyLanguage();
    updateDashboard();
    renderMedicines();
}


/* =========================================================
   PAGE LOAD
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadData();
        applyLanguage();
        updateDashboard();
        renderMedicines();
        startReminderChecker();
        restoreLoginState();

    }
);


/* =========================================================
   LOAD DATA
   ========================================================= */

function loadData() {

    try {

        medicines =
            JSON.parse(
                localStorage.getItem(
                    "jsMedicareMedicines"
                )
            ) || [];

    } catch (error) {

        medicines = [];

    }


    patientName =
        localStorage.getItem(
            "jsMedicarePatientName"
        ) || "";


    patientPhone =
        localStorage.getItem(
            "jsMedicarePatientPhone"
        ) || "";


    selectedLanguage =
        localStorage.getItem(
            "jsMedicareLanguage"
        ) || "en";


    const caregiver =
        localStorage.getItem(
            "jsMedicareCaregiver"
        ) || "";


    const caregiverInput =
        document.getElementById(
            "caregiverPhone"
        );


    if (caregiverInput) {
        caregiverInput.value = caregiver;
    }

}


/* =========================================================
   RESTORE LOGIN
   ========================================================= */

function restoreLoginState() {

    if (!patientName) {
        return;
    }

    const loginSection =
        document.getElementById(
            "loginSection"
        );

    const dashboard =
        document.getElementById(
            "dashboard"
        );

    if (!loginSection || !dashboard) {
        return;
    }


    loginSection.style.display = "none";
    dashboard.style.display = "block";


    const dashboardLanguage =
        document.getElementById(
            "dashboardLanguage"
        );


    if (dashboardLanguage) {
        dashboardLanguage.value =
            selectedLanguage;
    }


    updateDashboard();

}


/* =========================================================
   SAVE MEDICINES
   ========================================================= */

function saveMedicines() {

    localStorage.setItem(
        "jsMedicareMedicines",
        JSON.stringify(medicines)
    );

}


/* =========================================================
   LOGIN
   ========================================================= */

function login() {

    const nameInput =
        document.getElementById(
            "patientName"
        );

    const phoneInput =
        document.getElementById(
            "patientPhone"
        );

    const languageInput =
        document.getElementById(
            "languageSelect"
        );


    const name =
        nameInput
            ? nameInput.value.trim()
            : "";


    const phone =
        phoneInput
            ? phoneInput.value.trim()
            : "";


    const language =
        languageInput
            ? languageInput.value
            : "en";


    if (!name) {

        alert(
            "Please enter patient name."
        );

        return;
    }


    patientName = name;
    patientPhone = phone;
    selectedLanguage = language;


    localStorage.setItem(
        "jsMedicarePatientName",
        patientName
    );

    localStorage.setItem(
        "jsMedicarePatientPhone",
        patientPhone
    );

    localStorage.setItem(
        "jsMedicareLanguage",
        selectedLanguage
    );


    const loginSection =
        document.getElementById(
            "loginSection"
        );

    const dashboard =
        document.getElementById(
            "dashboard"
        );


    if (loginSection) {
        loginSection.style.display = "none";
    }

    if (dashboard) {
        dashboard.style.display = "block";
    }


    applyLanguage();
    updateDashboard();
    renderMedicines();

}


/* =========================================================
   LOGOUT
   ========================================================= */

function logout() {

    stopReminderCompletely();
    stopVoiceMedicineEntry();


    const dashboard =
        document.getElementById(
            "dashboard"
        );

    const loginSection =
        document.getElementById(
            "loginSection"
        );


    if (dashboard) {
        dashboard.style.display = "none";
    }

    if (loginSection) {
        loginSection.style.display = "flex";
    }

}


/* =========================================================
   DASHBOARD
   ========================================================= */

function updateDashboard() {

    const welcome =
        document.getElementById(
            "welcomeText"
        );


    if (welcome) {

        welcome.textContent =
            patientName
                ? getText("welcome") +
                  ", " +
                  patientName
                : getText("welcome");

    }


    const total =
        medicines.length;


    const taken =
        medicines.filter(
            function (medicine) {
                return medicine.status === "taken";
            }
        ).length;


    const missed =
        medicines.filter(
            function (medicine) {
                return medicine.status === "missed";
            }
        ).length;


    const totalElement =
        document.getElementById(
            "totalMedicines"
        );

    const takenElement =
        document.getElementById(
            "takenMedicines"
        );

    const missedElement =
        document.getElementById(
            "missedMedicines"
        );

    const adherenceElement =
        document.getElementById(
            "adherence"
        );


    if (totalElement) {
        totalElement.textContent = total;
    }

    if (takenElement) {
        takenElement.textContent = taken;
    }

    if (missedElement) {
        missedElement.textContent = missed;
    }


    let adherence = 0;


    if (total > 0) {

        adherence =
            Math.round(
                (taken / total) * 100
            );

    }


    if (adherenceElement) {
        adherenceElement.textContent =
            adherence + "%";
    }


    updateNextReminder();

}


/* =========================================================
   ADD MEDICINE
   ========================================================= */

function addMedicine() {

    const nameElement =
        document.getElementById(
            "medicineName"
        );

    const dosageElement =
        document.getElementById(
            "dosage"
        );

    const timeElement =
        document.getElementById(
            "medicineTime"
        );


    const name =
        nameElement
            ? nameElement.value.trim()
            : "";


    const dosage =
        dosageElement
            ? dosageElement.value.trim()
            : "";


    const time =
        timeElement
            ? timeElement.value
            : "";


    if (!name) {

        alert(
            "Please enter medicine name."
        );

        return;
    }


    if (!dosage) {

        alert(
            "Please enter dosage."
        );

        return;
    }


    if (!time) {

        alert(
            "Please select medicine time."
        );

        return;
    }


    const medicine = {

        id: Date.now(),

        name: name,

        dosage: dosage,

        time: time,

        status: "pending",

        lastTriggeredDate: "",

        takenAt: "",

        missedAt: ""

    };


    medicines.push(medicine);

    saveMedicines();
    renderMedicines();
    updateDashboard();


    if (nameElement) {
        nameElement.value = "";
    }

    if (dosageElement) {
        dosageElement.value = "";
    }

    if (timeElement) {
        timeElement.value = "";
    }


    logActivity(
        "Added medicine: " +
        name
    );

}


/* =========================================================
   RENDER MEDICINES
   ========================================================= */

function renderMedicines() {

    const list =
        document.getElementById(
            "medicineList"
        );


    if (!list) {
        return;
    }


    if (!medicines.length) {

        list.innerHTML =
            getText("noMedicines");

        return;
    }


    list.innerHTML = "";


    medicines.forEach(
        function (medicine) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "medicine-item";


            let statusClass =
                "pending";


            if (
                medicine.status === "taken"
            ) {
                statusClass = "taken";
            }


            if (
                medicine.status === "missed"
            ) {
                statusClass = "missed";
            }


            const statusText =
                medicine.status
                    .charAt(0)
                    .toUpperCase() +
                medicine.status.slice(1);


            item.innerHTML = `

                <div class="medicine-info">

                    <strong>
                        ${escapeHTML(medicine.name)}
                    </strong>

                    <small>
                        ${escapeHTML(medicine.dosage)}
                        •
                        ${formatTime(medicine.time)}
                    </small>

                </div>

                <span class="medicine-status ${statusClass}">
                    ${statusText}
                </span>

                <button
                    class="delete-btn"
                    onclick="deleteMedicine(${medicine.id})"
                >
                    Delete
                </button>

            `;


            list.appendChild(item);

        }
    );

}


/* =========================================================
   DELETE MEDICINE
   ========================================================= */

function deleteMedicine(id) {

    if (
        activeReminder &&
        activeReminder.id === id
    ) {
        stopReminderCompletely();
    }


    medicines =
        medicines.filter(
            function (medicine) {
                return medicine.id !== id;
            }
        );


    saveMedicines();
    renderMedicines();
    updateDashboard();

}


/* =========================================================
   FORMAT TIME
   ========================================================= */

function formatTime(time) {

    if (!time) {
        return "";
    }


    const parts =
        time.split(":");


    let hour =
        parseInt(
            parts[0],
            10
        );


    const minute =
        parts[1];


    const suffix =
        hour >= 12
            ? "PM"
            : "AM";


    hour =
        hour % 12 || 12;


    return (
        hour +
        ":" +
        minute +
        " " +
        suffix
    );

}


/* =========================================================
   REMINDER CHECKER
   ========================================================= */

function startReminderChecker() {

    clearInterval(
        reminderCheckerTimer
    );


    reminderCheckerTimer =
        setInterval(
            checkReminders,
            1000
        );


    checkReminders();

}


/* =========================================================
   CHECK REMINDERS
   ========================================================= */

function checkReminders() {

    if (!medicines.length) {
        return;
    }


    const now =
        new Date();


    const currentHours =
        String(
            now.getHours()
        ).padStart(2, "0");


    const currentMinutes =
        String(
            now.getMinutes()
        ).padStart(2, "0");


    const currentTime =
        currentHours +
        ":" +
        currentMinutes;


    const today =
        now.getFullYear() +
        "-" +
        String(
            now.getMonth() + 1
        ).padStart(2, "0") +
        "-" +
        String(
            now.getDate()
        ).padStart(2, "0");


    medicines.forEach(
        function (medicine) {

            if (
                medicine.time === currentTime &&
                medicine.lastTriggeredDate !== today
            ) {

                medicine.lastTriggeredDate =
                    today;


                medicine.status =
                    "pending";


                saveMedicines();


                triggerReminder(
                    medicine
                );

            }

        }
    );

}


/* =========================================================
   TRIGGER REMINDER
========================================================= */

function triggerReminder(medicine) {

    if (activeReminder) {
        return;
    }


    activeReminder =
        medicine;


    const popup =
        document.getElementById(
            "reminderPopup"
        );


    const popupName =
        document.getElementById(
            "popupMedicineName"
        );


    if (popupName) {
        popupName.textContent =
            medicine.name;
    }


    if (popup) {
        popup.classList.add("show");
    }


    startContinuousVibration();


    clearInterval(
        reminderVoiceTimer
    );

    clearTimeout(
        reminderMissTimer
    );


    speakReminder(
        medicine
    );


    /*
       Start listening quickly.
    */

    setTimeout(
        function () {

            if (
                activeReminder &&
                activeReminder.id === medicine.id
            ) {

                startTakenVoiceRecognition();

            }

        },
        1200
    );


    /*
       Repeat reminder every 10 seconds.
    */

    reminderVoiceTimer =
        setInterval(
            function () {

                if (!activeReminder) {
                    return;
                }


                stopTakenVoiceRecognition();


                speakReminder(
                    activeReminder
                );


                setTimeout(
                    function () {

                        if (activeReminder) {

                            startTakenVoiceRecognition();

                        }

                    },
                    1200
                );

            },
            10000
        );


    /*
       After 60 seconds -> missed.
    */

    reminderMissTimer =
        setTimeout(
            function () {

                if (
                    activeReminder &&
                    activeReminder.id === medicine.id &&
                    medicine.status === "pending"
                ) {

                    markMissed(
                        medicine.id
                    );

                }

            },
            60000
        );

}


/* =========================================================
   SPEAK REMINDER
========================================================= */

function speakReminder(medicine) {

    const message =
        medicine.name +
        ". " +
        medicine.dosage +
        ". " +
        getText("reminder");


    speakText(
        message
    );

}


/* =========================================================
   TEXT TO SPEECH
========================================================= */

function speakText(
    text,
    callback
) {

    if (
        !("speechSynthesis" in window)
    ) {

        if (callback) {
            callback();
        }

        return;
    }


    window.speechSynthesis.cancel();


    const utterance =
        new SpeechSynthesisUtterance(
            text
        );


    utterance.lang =
        getBrowserLanguage();


    utterance.rate =
        0.9;


    utterance.pitch =
        1;


    utterance.volume =
        1;


    utterance.onend =
        function () {

            if (callback) {
                callback();
            }

        };


    utterance.onerror =
        function () {

            if (callback) {
                callback();
            }

        };


    window.speechSynthesis.speak(
        utterance
    );

}


/* =========================================================
   CONTINUOUS VIBRATION
========================================================= */

function startContinuousVibration() {

    stopContinuousVibration();


    if (
        typeof navigator.vibrate !==
        "function"
    ) {

        console.log(
            "Vibration API not supported."
        );

        return;
    }


    navigator.vibrate(
        [500, 500]
    );


    vibrationTimer =
        setInterval(
            function () {

                if (activeReminder) {

                    navigator.vibrate(
                        [500, 500]
                    );

                }

            },
            2000
        );

}


function stopContinuousVibration() {

    clearInterval(
        vibrationTimer
    );


    vibrationTimer =
        null;


    if (
        typeof navigator.vibrate ===
        "function"
    ) {

        navigator.vibrate(0);

    }

}


/* =========================================================
   POPUP TAKE BUTTON
========================================================= */

function markTakenFromPopup() {

    if (!activeReminder) {
        return;
    }


    markTaken(
        activeReminder.id
    );

}


/* =========================================================
   MARK TAKEN
========================================================= */

function markTaken(id) {

    const medicine =
        medicines.find(
            function (item) {
                return item.id === id;
            }
        );


    if (!medicine) {
        return;
    }


    /*
       STOP EVERYTHING IMMEDIATELY.
    */

    stopReminderCompletely();


    medicine.status =
        "taken";


    medicine.takenAt =
        new Date().toISOString();


    saveMedicines();

    renderMedicines();

    updateDashboard();


    logActivity(
        "Medicine taken: " +
        medicine.name
    );


    setTimeout(
        function () {

            speakText(
                getText("taken")
            );

        },
        100
    );

}


/* =========================================================
   MARK MISSED
========================================================= */

function markMissed(id) {

    const medicine =
        medicines.find(
            function (item) {
                return item.id === id;
            }
        );


    if (!medicine) {
        return;
    }


    medicine.status =
        "missed";


    medicine.missedAt =
        new Date().toISOString();


    saveMedicines();


    stopTakenVoiceRecognition();
    stopContinuousVibration();


    clearInterval(
        reminderVoiceTimer
    );


    clearTimeout(
        reminderMissTimer
    );


    reminderVoiceTimer = null;
    reminderMissTimer = null;


    if (
        "speechSynthesis" in window
    ) {

        window.speechSynthesis.cancel();

    }


    const popup =
        document.getElementById(
            "reminderPopup"
        );


    if (popup) {

        popup.classList.remove(
            "show"
        );

    }


    activeReminder =
        null;


    renderMedicines();
    updateDashboard();


    logActivity(
        "Medicine missed: " +
        medicine.name
    );


    speakText(
        getText("missed")
    );


    /*
       IMPORTANT:
       SMS is generated in the selected
       regional language.
    */

    sendCaregiverSMS(
        medicine
    );

}


/* =========================================================
   STOP EVERYTHING
========================================================= */

function stopReminderCompletely() {

    stopTakenVoiceRecognition();

    stopContinuousVibration();


    clearInterval(
        reminderVoiceTimer
    );


    clearTimeout(
        reminderMissTimer
    );


    reminderVoiceTimer = null;
    reminderMissTimer = null;


    if (
        "speechSynthesis" in window
    ) {

        window.speechSynthesis.cancel();

    }


    const popup =
        document.getElementById(
            "reminderPopup"
        );


    if (popup) {

        popup.classList.remove(
            "show"
        );

    }


    activeReminder =
        null;

}


/* =========================================================
   START "I TOOK IT" RECOGNITION
========================================================= */

function startTakenVoiceRecognition() {

    if (!activeReminder) {
        return;
    }


    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        console.log(
            "SpeechRecognition not supported."
        );

        return;
    }


    if (takenVoiceRecognition) {
        return;
    }


    takenVoiceActive =
        true;


    createTakenVoiceRecognition();

}


/* =========================================================
   CREATE "I TOOK IT" RECOGNITION
========================================================= */

function createTakenVoiceRecognition() {

    if (
        !takenVoiceActive ||
        !activeReminder
    ) {
        return;
    }


    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {
        return;
    }


    try {

        const recognition =
            new SpeechRecognition();


        takenVoiceRecognition =
            recognition;


        recognition.lang =
            getBrowserLanguage();


        recognition.continuous =
            true;


        recognition.interimResults =
            true;


        recognition.maxAlternatives =
            5;


        recognition.onstart =
            function () {

                console.log(
                    "🎤 Listening for I took it..."
                );

            };


        recognition.onresult =
            function (event) {

                if (
                    !takenVoiceActive ||
                    !activeReminder
                ) {
                    return;
                }


                let combinedText =
                    "";


                for (
                    let i = event.resultIndex;
                    i < event.results.length;
                    i++
                ) {

                    const transcript =
                        event.results[i][0]
                            .transcript
                            .trim();


                    combinedText +=
                        " " +
                        transcript;


                    console.log(
                        "🎤 Heard:",
                        transcript
                    );

                }


                combinedText =
                    normalizeSpeechText(
                        combinedText
                    );


                /*
                   CHECK IMMEDIATELY.
                */

                if (
                    detectTakenCommand(
                        combinedText
                    )
                ) {

                    console.log(
                        "✅ I TOOK IT DETECTED"
                    );


                    const medicineId =
                        activeReminder.id;


                    takenVoiceActive =
                        false;


                    clearTimeout(
                        takenVoiceRestartTimer
                    );


                    stopTakenVoiceRecognition();


                    markTaken(
                        medicineId
                    );

                }

            };


        recognition.onerror =
            function (event) {

                console.log(
                    "Voice error:",
                    event.error
                );


                if (
                    event.error ===
                    "not-allowed"
                ) {

                    takenVoiceActive =
                        false;

                    return;
                }


                if (
                    event.error ===
                    "service-not-allowed"
                ) {

                    takenVoiceActive =
                        false;

                    return;
                }


                if (
                    takenVoiceActive &&
                    activeReminder
                ) {

                    scheduleTakenVoiceRestart();

                }

            };


        recognition.onend =
            function () {

                console.log(
                    "Recognition ended"
                );


                takenVoiceRecognition =
                    null;


                if (
                    takenVoiceActive &&
                    activeReminder
                ) {

                    scheduleTakenVoiceRestart();

                }

            };


        recognition.start();

    } catch (error) {

        console.log(
            "Recognition start error:",
            error
        );


        takenVoiceRecognition =
            null;


        if (
            takenVoiceActive &&
            activeReminder
        ) {

            scheduleTakenVoiceRestart();

        }

    }

}


/* =========================================================
   QUICK RESTART
========================================================= */

function scheduleTakenVoiceRestart() {

    clearTimeout(
        takenVoiceRestartTimer
    );


    takenVoiceRestartTimer =
        setTimeout(
            function () {

                if (
                    takenVoiceActive &&
                    activeReminder &&
                    !takenVoiceRecognition
                ) {

                    createTakenVoiceRecognition();

                }

            },
            300
        );

}


/* =========================================================
   STOP "I TOOK IT" RECOGNITION
========================================================= */

function stopTakenVoiceRecognition() {

    takenVoiceActive =
        false;


    clearTimeout(
        takenVoiceRestartTimer
    );


    takenVoiceRestartTimer =
        null;


    if (takenVoiceRecognition) {

        try {
            takenVoiceRecognition.stop();
        } catch (error) {}


        try {
            takenVoiceRecognition.abort();
        } catch (error) {}

    }


    takenVoiceRecognition =
        null;

}


/* =========================================================
   DETECT "I TOOK IT"
========================================================= */

function detectTakenCommand(text) {

    if (!text) {
        return false;
    }


    text =
        normalizeSpeechText(text);


    console.log(
        "Checking command:",
        text
    );


    /* =====================================================
       ENGLISH
    ===================================================== */

    const englishCommands = [

        "i took it",
        "i took the medicine",
        "i took my medicine",
        "i took medicine",

        "i have taken it",
        "i have taken the medicine",
        "i have taken my medicine",
        "i have taken medicine",

        "i already took it",
        "i already took the medicine",

        "took it",
        "took the medicine",
        "took medicine",

        "medicine taken",
        "medicine is taken",
        "medicine was taken",

        "medicine done",
        "medicine completed",

        "i am done",
        "i'm done",

        "taken",
        "done",
        "completed",
        "finished"

    ];


    for (
        const command of englishCommands
    ) {

        if (
            text.includes(
                normalizeSpeechText(
                    command
                )
            )
        ) {

            return true;

        }

    }


    /*
       Flexible English detection.
    */

    const hasTook =
        text.includes("took");


    const hasTaken =
        text.includes("taken");


    const hasMedicine =
        text.includes("medicine") ||
        text.includes("medication");


    const hasIt =
        text.includes("it");


    if (
        (hasTook || hasTaken) &&
        (hasMedicine || hasIt)
    ) {

        return true;

    }


    /* =====================================================
       TAMIL
    ===================================================== */

    const tamilCommands = [

        "எடுத்துவிட்டேன்",
        "எடுத்து விட்டேன்",

        "மருந்து எடுத்துவிட்டேன்",
        "மருந்து எடுத்தேன்",

        "மருந்தை எடுத்துவிட்டேன்",

        "மருந்து எடுத்தாச்சு",
        "மருந்தை எடுத்தாச்சு",

        "எடுத்தாச்சு",

        "முடிந்தது"

    ];


    for (
        const command of tamilCommands
    ) {

        if (
            text.includes(
                normalizeSpeechText(
                    command
                )
            )
        ) {

            return true;

        }

    }


    /* =====================================================
       HINDI
    ===================================================== */

    const hindiCommands = [

        "मैंने दवा ले ली",
        "मैंने दवाई ले ली",

        "दवा ले ली",
        "दवाई ले ली",

        "दवा लिया",
        "दवाई लिया",

        "ले लिया",
        "ले ली",

        "हो गया"

    ];


    for (
        const command of hindiCommands
    ) {

        if (
            text.includes(
                normalizeSpeechText(
                    command
                )
            )
        ) {

            return true;

        }

    }


    /* =====================================================
       TELUGU
    ===================================================== */

    const teluguCommands = [

        "నేను మందు తీసుకున్నాను",
        "మందు తీసుకున్నాను",

        "మందు తీసుకున్నా",

        "తీసుకున్నాను",
        "తీసుకున్నా",

        "మందు తీసుకున్న",

        "పూర్తయింది"

    ];


    for (
        const command of teluguCommands
    ) {

        if (
            text.includes(
                normalizeSpeechText(
                    command
                )
            )
        ) {

            return true;

        }

    }


    return false;

}


/* =========================================================
   NORMALIZE SPEECH
========================================================= */

function normalizeSpeechText(text) {

    return String(text)
        .toLowerCase()
        .replace(/[.,!?;:]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

}


/* =========================================================
   VOICE MEDICINE ENTRY
========================================================= */

function startVoiceMedicineEntry() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        alert(
            getText(
                "voiceNotSupported"
            )
        );

        return;
    }


    stopVoiceMedicineEntry();


    const medicineName =
        document.getElementById(
            "medicineName"
        );

    const dosage =
        document.getElementById(
            "dosage"
        );

    const medicineTime =
        document.getElementById(
            "medicineTime"
        );


    if (medicineName) {
        medicineName.value = "";
    }

    if (dosage) {
        dosage.value = "";
    }

    if (medicineTime) {
        medicineTime.value = "";
    }


    voiceEntryActive =
        true;


    voiceStep =
        "name";


    updateVoiceStepUI();


    setVoiceStatus(
        getText("namePrompt")
    );


    speakText(
        getText("namePrompt"),
        function () {

            if (voiceEntryActive) {
                startVoiceStepRecognition();
            }

        }
    );

}


/* =========================================================
   VOICE STEP RECOGNITION
========================================================= */

function startVoiceStepRecognition() {

    if (!voiceEntryActive) {
        return;
    }


    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {
        return;
    }


    if (voiceRecognition) {

        try {
            voiceRecognition.abort();
        } catch (error) {}

    }


    voiceRecognition =
        new SpeechRecognition();


    voiceRecognition.lang =
        getBrowserLanguage();


    voiceRecognition.continuous =
        false;


    voiceRecognition.interimResults =
        false;


    voiceRecognition.maxAlternatives =
        3;


    voiceRecognition.onstart =
        function () {

            setVoiceStatus(
                getText("listening")
            );

        };


    voiceRecognition.onresult =
        function (event) {

            if (!voiceEntryActive) {
                return;
            }


            const transcript =
                event.results[0][0]
                    .transcript
                    .trim();


            processVoiceStep(
                transcript
            );

        };


    voiceRecognition.onerror =
        function (event) {

            console.log(
                "Voice entry error:",
                event.error
            );


            if (voiceEntryActive) {

                setVoiceStatus(
                    "Please try again."
                );


                setTimeout(
                    function () {

                        if (voiceEntryActive) {
                            startVoiceStepRecognition();
                        }

                    },
                    800
                );

            }

        };


    voiceRecognition.onend =
        function () {

            voiceRecognition =
                null;

        };


    try {

        voiceRecognition.start();

    } catch (error) {

        console.log(
            "Voice entry start error:",
            error
        );

    }

}


/* =========================================================
   PROCESS VOICE STEP
========================================================= */

function processVoiceStep(
    transcript
) {

    if (!voiceEntryActive) {
        return;
    }


    /* NAME */

    if (
        voiceStep === "name"
    ) {

        const medicineName =
            document.getElementById(
                "medicineName"
            );


        if (medicineName) {
            medicineName.value =
                transcript;
        }


        voiceStep =
            "dosage";


        updateVoiceStepUI();


        speakText(
            getText("dosagePrompt"),
            function () {

                if (voiceEntryActive) {
                    startVoiceStepRecognition();
                }

            }
        );


        return;

    }


    /* DOSAGE */

    if (
        voiceStep === "dosage"
    ) {

        const dosage =
            document.getElementById(
                "dosage"
            );


        if (dosage) {
            dosage.value =
                transcript;
        }


        voiceStep =
            "time";


        updateVoiceStepUI();


        speakText(
            getText("timePrompt"),
            function () {

                if (voiceEntryActive) {
                    startVoiceStepRecognition();
                }

            }
        );


        return;

    }


    /* TIME */

    if (
        voiceStep === "time"
    ) {

        const convertedTime =
            convertSpokenTime(
                transcript
            );


        if (!convertedTime) {

            speakText(
                "Please say a valid time, for example eight PM.",
                function () {

                    if (voiceEntryActive) {
                        startVoiceStepRecognition();
                    }

                }
            );


            return;

        }


        const medicineTime =
            document.getElementById(
                "medicineTime"
            );


        if (medicineTime) {
            medicineTime.value =
                convertedTime;
        }


        voiceEntryActive =
            false;


        voiceStep =
            null;


        updateVoiceStepUI();


        setVoiceStatus(
            getText("confirmation")
        );


        speakText(
            getText("confirmation")
        );

    }

}


/* =========================================================
   CONVERT SPOKEN TIME
========================================================= */

function convertSpokenTime(text) {

    text =
        text
            .toLowerCase()
            .trim();


    let match =
        text.match(
            /(\d{1,2}):(\d{2})\s*(am|pm)?/
        );


    if (match) {

        let hour =
            parseInt(
                match[1],
                10
            );


        const minute =
            parseInt(
                match[2],
                10
            );


        const period =
            match[3];


        if (
            period === "pm" &&
            hour < 12
        ) {
            hour += 12;
        }


        if (
            period === "am" &&
            hour === 12
        ) {
            hour = 0;
        }


        return (
            String(hour).padStart(2, "0") +
            ":" +
            String(minute).padStart(2, "0")
        );

    }


    match =
        text.match(
            /(\d{1,2})\s*(am|pm)/
        );


    if (match) {

        let hour =
            parseInt(
                match[1],
                10
            );


        const period =
            match[2];


        if (
            period === "pm" &&
            hour < 12
        ) {
            hour += 12;
        }


        if (
            period === "am" &&
            hour === 12
        ) {
            hour = 0;
        }


        return (
            String(hour).padStart(2, "0") +
            ":00"
        );

    }


    const words = {

        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9,
        ten: 10,
        eleven: 11,
        twelve: 12

    };


    for (
        const word in words
    ) {

        if (
            text.includes(word)
        ) {

            let hour =
                words[word];


            const isPM =
                text.includes("pm") ||
                text.includes("evening") ||
                text.includes("night");


            const isAM =
                text.includes("am") ||
                text.includes("morning");


            if (
                isPM &&
                hour < 12
            ) {
                hour += 12;
            }


            if (
                isAM &&
                hour === 12
            ) {
                hour = 0;
            }


            return (
                String(hour).padStart(2, "0") +
                ":00"
            );

        }

    }


    match =
        text.match(
            /\b([01]?\d|2[0-3])\b/
        );


    if (match) {

        const hour =
            parseInt(
                match[1],
                10
            );


        return (
            String(hour).padStart(2, "0") +
            ":00"
        );

    }


    return null;

}


/* =========================================================
   UPDATE VOICE STEP UI
========================================================= */

function updateVoiceStepUI() {

    document
        .querySelectorAll(
            ".voice-step"
        )
        .forEach(
            function (element) {

                element.classList.remove(
                    "active"
                );

            }
        );


    if (!voiceStep) {
        return;
    }


    const active =
        document.querySelector(
            `[data-step="${voiceStep}"]`
        );


    if (active) {
        active.classList.add(
            "active"
        );
    }

}


/* =========================================================
   VOICE ENTRY STATUS
========================================================= */

function setVoiceStatus(
    message
) {

    const element =
        document.getElementById(
            "voiceEntryStatus"
        );


    if (element) {
        element.textContent =
            message;
    }

}


/* =========================================================
   STOP VOICE MEDICINE ENTRY
========================================================= */

function stopVoiceMedicineEntry() {

    voiceEntryActive =
        false;


    voiceStep =
        null;


    if (voiceRecognition) {

        try {
            voiceRecognition.stop();
        } catch (error) {}


        try {
            voiceRecognition.abort();
        } catch (error) {}

    }


    voiceRecognition =
        null;


    updateVoiceStepUI();

}


/* =========================================================
   ENABLE MOBILE VOICE
========================================================= */

function enableMobileVoice() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    const status =
        document.getElementById(
            "voiceStatus"
        );


    if (!SpeechRecognition) {

        if (status) {

            status.textContent =
                getText(
                    "voiceNotSupported"
                );

        }

        return;
    }


    voiceUnlocked =
        true;


    if (status) {

        status.textContent =
            "Voice enabled successfully.";

    }


    try {

        const testRecognition =
            new SpeechRecognition();


        testRecognition.lang =
            getBrowserLanguage();


        testRecognition.continuous =
            false;


        testRecognition.interimResults =
            false;


        testRecognition.onresult =
            function () {};


        testRecognition.onerror =
            function () {};


        testRecognition.onend =
            function () {};


        testRecognition.start();


        setTimeout(
            function () {

                try {
                    testRecognition.stop();
                } catch (error) {}

            },
            500
        );

    } catch (error) {

        console.log(
            "Voice permission:",
            error
        );

    }

}


/* =========================================================
   SAVE CAREGIVER
========================================================= */

function saveCaregiver() {

    const input =
        document.getElementById(
            "caregiverPhone"
        );


    const phone =
        input
            ? input.value.trim()
            : "";


    if (!phone) {

        alert(
            "Please enter caregiver phone number."
        );

        return;
    }


    localStorage.setItem(
        "jsMedicareCaregiver",
        phone
    );


    alert(
        "Caregiver number saved."
    );

}


/* =========================================================
   CALL CAREGIVER
========================================================= */

function callCaregiver() {

    const phone =
        localStorage.getItem(
            "jsMedicareCaregiver"
        );


    if (!phone) {

        alert(
            "Please save caregiver number first."
        );

        return;
    }


    window.location.href =
        "tel:" + phone;

}


/* =========================================================
   CALL AMBULANCE
========================================================= */

function callAmbulance() {

    window.location.href =
        "tel:108";

}


/* =========================================================
   CAREGIVER SMS - REGIONAL LANGUAGE
========================================================= */

function sendCaregiverSMS(
    medicine
) {

    const caregiver =
        localStorage.getItem(
            "jsMedicareCaregiver"
        );


    if (!caregiver) {

        console.log(
            "No caregiver number saved."
        );

        return;
    }


    let message = "";


    /* =====================================================
       ENGLISH SMS
    ===================================================== */

    if (
        selectedLanguage === "en"
    ) {

        message =
            "JS MEDICARE Alert: " +
            medicine.name +
            " (" +
            medicine.dosage +
            ") was missed. " +
            "Please check on the patient.";

    }


    /* =====================================================
       TAMIL SMS
    ===================================================== */

    else if (
        selectedLanguage === "ta"
    ) {

        message =
            "JS MEDICARE எச்சரிக்கை: " +
            medicine.name +
            " (" +
            medicine.dosage +
            ") மருந்து தவறிவிட்டது. " +
            "தயவுசெய்து நோயாளியை கவனிக்கவும்.";

    }


    /* =====================================================
       HINDI SMS
    ===================================================== */

    else if (
        selectedLanguage === "hi"
    ) {

        message =
            "JS MEDICARE चेतावनी: " +
            medicine.name +
            " (" +
            medicine.dosage +
            ") दवा छूट गई है। " +
            "कृपया मरीज की जांच करें।";

    }


    /* =====================================================
       TELUGU SMS
    ===================================================== */

    else if (
        selectedLanguage === "te"
    ) {

        message =
            "JS MEDICARE హెచ్చరిక: " +
            medicine.name +
            " (" +
            medicine.dosage +
            ") మందు మిస్ అయింది. " +
            "దయచేసి రోగిని తనిఖీ చేయండి.";

    }


    /*
       Safety fallback.
    */

    if (!message) {

        message =
            "JS MEDICARE Alert: " +
            medicine.name +
            " (" +
            medicine.dosage +
            ") was missed.";

    }


    /*
       Open phone SMS application.

       The browser/APK opens the SMS app;
       it does not silently send the SMS.
    */

    window.location.href =
        "sms:" +
        caregiver +
        "?body=" +
        encodeURIComponent(
            message
        );

}


/* =========================================================
   ACTIVITY LOG
========================================================= */

function logActivity(
    message
) {

    const log =
        document.getElementById(
            "activityLog"
        );


    if (!log) {
        return;
    }


    const item =
        document.createElement(
            "div"
        );


    item.className =
        "activity-item";


    const time =
        new Date()
            .toLocaleTimeString();


    item.textContent =
        time +
        " - " +
        message;


    if (
        log.textContent.trim() ===
        "No activity yet."
    ) {

        log.innerHTML = "";

    }


    log.prepend(item);

}


/* =========================================================
   NEXT REMINDER
========================================================= */

function updateNextReminder() {

    const element =
        document.getElementById(
            "nextReminder"
        );


    if (!element) {
        return;
    }


    const pending =
        medicines
            .filter(
                function (medicine) {

                    return (
                        medicine.status !==
                        "taken"
                    );

                }
            )
            .sort(
                function (a, b) {

                    return a.time.localeCompare(
                        b.time
                    );

                }
            );


    if (!pending.length) {

        element.textContent =
            getText("noReminder");

        return;
    }


    const next =
        pending[0];


    element.innerHTML = `

        <strong>
            ${escapeHTML(next.name)}
        </strong>

        <br>

        ${escapeHTML(next.dosage)}

        <br>

        ${formatTime(next.time)}

    `;

}


/* =========================================================
   MEDICATION REPORT
========================================================= */

function generateMedicationReport() {

    let html = `

        <!DOCTYPE html>

        <html>

        <head>

            <title>
                JS MEDICARE Medication Report
            </title>

            <style>

                body {
                    font-family: Arial, sans-serif;
                    padding: 30px;
                }

                h1 {
                    color: #198754;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }

                th,
                td {
                    border: 1px solid #ccc;
                    padding: 10px;
                    text-align: left;
                }

                th {
                    background: #e8f5e9;
                }

            </style>

        </head>

        <body>

            <h1>
                JS MEDICARE
            </h1>

            <h2>
                Medication Report
            </h2>

            <p>
                Patient:
                ${escapeHTML(patientName)}
            </p>

            <table>

                <tr>
                    <th>Medicine</th>
                    <th>Dosage</th>
                    <th>Time</th>
                    <th>Status</th>
                </tr>

    `;


    medicines.forEach(
        function (medicine) {

            html += `

                <tr>

                    <td>
                        ${escapeHTML(
                            medicine.name
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            medicine.dosage
                        )}
                    </td>

                    <td>
                        ${formatTime(
                            medicine.time
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            medicine.status
                        )}
                    </td>

                </tr>

            `;

        }
    );


    html += `

            </table>

        </body>

        </html>

    `;


    const reportWindow =
        window.open(
            "",
            "_blank"
        );


    if (!reportWindow) {

        alert(
            "Please allow popups to generate the report."
        );

        return;
    }


    reportWindow.document.write(
        html
    );


    reportWindow.document.close();


    reportWindow.focus();


    setTimeout(
        function () {

            reportWindow.print();

        },
        500
    );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}
