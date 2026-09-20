let medicines = [];

let activeReminder = null;

let reminderCheckerTimer = null;
let reminderVoiceTimer = null;
let reminderMissTimer = null;

let patientName = "";
let patientPhone = "";

let selectedLanguage = "en";

let voiceUnlocked = false;


/* =====================================================
   VOICE MEDICINE ENTRY
===================================================== */

let voiceRecognition = null;
let voiceEntryActive = false;
let voiceStep = null;
let voiceStarting = false;


/* =====================================================
   "I TOOK IT" VOICE RECOGNITION
===================================================== */

let takenVoiceRecognition = null;
let takenVoiceRestartTimer = null;
let takenVoiceActive = false;


/* =====================================================
   VIBRATION
===================================================== */

let vibrationTimer = null;


/* =====================================================
   TRANSLATIONS
===================================================== */

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
        voiceNotSupported: "Voice recognition is not supported in this browser."
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
        voiceNotSupported: "இந்த உலாவியில் குரல் வசதி ஆதரிக்கப்படவில்லை."
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
        voiceNotSupported: "इस ब्राउज़र में वॉइस रिकग्निशन समर्थित नहीं है।"
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
        voiceNotSupported: "ఈ బ్రౌజర్‌లో వాయిస్ గుర్తింపు అందుబాటులో లేదు."
    }

};


function getText(key) {

    return (
        translations[selectedLanguage] &&
        translations[selectedLanguage][key]
    ) || translations.en[key];

}


/* =====================================================
   LANGUAGE
===================================================== */

function getBrowserLanguage() {

    const map = {
        en: "en-IN",
        ta: "ta-IN",
        hi: "hi-IN",
        te: "te-IN"
    };

    return map[selectedLanguage] || "en-IN";

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
        aiStatus.textContent = getText("aiMonitoring");
    }

}


function changeDashboardLanguage() {

    const select =
        document.getElementById("dashboardLanguage");

    selectedLanguage = select.value;

    localStorage.setItem(
        "jsMedicareLanguage",
        selectedLanguage
    );

    applyLanguage();

}


/* =====================================================
   INITIALIZATION
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadData();

        applyLanguage();

        updateDashboard();

        renderMedicines();

        startReminderChecker();

    }
);


/* =====================================================
   STORAGE
===================================================== */

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
        document.getElementById("caregiverPhone");

    if (caregiverInput) {
        caregiverInput.value = caregiver;
    }

}


/* =====================================================
   SAVE MEDICINES
===================================================== */

function saveMedicines() {

    localStorage.setItem(
        "jsMedicareMedicines",
        JSON.stringify(medicines)
    );

}


/* =====================================================
   LOGIN
===================================================== */

function login() {

    const name =
        document.getElementById(
            "patientName"
        ).value.trim();

    const phone =
        document.getElementById(
            "patientPhone"
        ).value.trim();

    const language =
        document.getElementById(
            "languageSelect"
        ).value;


    if (!name) {

        alert("Please enter patient name.");

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


    document.getElementById(
        "loginSection"
    ).style.display = "none";


    document.getElementById(
        "dashboard"
    ).style.display = "block";


    document.getElementById(
        "dashboardLanguage"
    ).value = selectedLanguage;


    updateDashboard();

    renderMedicines();

}


/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    stopReminderCompletely();

    document.getElementById(
        "dashboard"
    ).style.display = "none";

    document.getElementById(
        "loginSection"
    ).style.display = "flex";

}


/* =====================================================
   DASHBOARD
===================================================== */

function updateDashboard() {

    const welcome =
        document.getElementById(
            "welcomeText"
        );

    if (welcome) {

        welcome.textContent =
            getText("welcome") +
            ", " +
            patientName;

    }


    const total =
        medicines.length;

    const taken =
        medicines.filter(
            m => m.status === "taken"
        ).length;

    const missed =
        medicines.filter(
            m => m.status === "missed"
        ).length;


    document.getElementById(
        "totalMedicines"
    ).textContent = total;


    document.getElementById(
        "takenMedicines"
    ).textContent = taken;


    document.getElementById(
        "missedMedicines"
    ).textContent = missed;


    let adherence = 0;

    if (total > 0) {

        adherence =
            Math.round(
                (taken / total) * 100
            );

    }


    document.getElementById(
        "adherence"
    ).textContent =
        adherence + "%";


    updateNextReminder();

}


/* =====================================================
   ADD MEDICINE
===================================================== */

function addMedicine() {

    const name =
        document.getElementById(
            "medicineName"
        ).value.trim();

    const dosage =
        document.getElementById(
            "dosage"
        ).value.trim();

    const time =
        document.getElementById(
            "medicineTime"
        ).value;


    if (!name) {

        alert("Please enter medicine name.");

        return;

    }


    if (!dosage) {

        alert("Please enter dosage.");

        return;

    }


    if (!time) {

        alert("Please select medicine time.");

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


    document.getElementById(
        "medicineName"
    ).value = "";

    document.getElementById(
        "dosage"
    ).value = "";

    document.getElementById(
        "medicineTime"
    ).value = "";


    logActivity(
        "Added medicine: " +
        name
    );

}


/* =====================================================
   RENDER MEDICINES
===================================================== */

function renderMedicines() {

    const list =
        document.getElementById(
            "medicineList"
        );


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


            if (medicine.status === "taken") {
                statusClass = "taken";
            }

            if (medicine.status === "missed") {
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


/* =====================================================
   DELETE MEDICINE
===================================================== */

function deleteMedicine(id) {

    if (
        activeReminder &&
        activeReminder.id === id
    ) {

        stopReminderCompletely();

    }


    medicines =
        medicines.filter(
            medicine =>
                medicine.id !== id
        );


    saveMedicines();

    renderMedicines();

    updateDashboard();

}


/* =====================================================
   TIME FORMAT
===================================================== */

function formatTime(time) {

    if (!time) return "";

    const parts =
        time.split(":");

    let hour =
        parseInt(parts[0]);

    const minute =
        parts[1];

    const suffix =
        hour >= 12 ? "PM" : "AM";

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


/* =====================================================
   REMINDER CHECKER
===================================================== */

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


/* =====================================================
   CHECK REMINDERS
===================================================== */

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
        now.toISOString()
            .split("T")[0];


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

                triggerReminder(medicine);

            }

        }
    );

}


/* =====================================================
   TRIGGER REMINDER
   IMPORTANT:
   VOICE RECOGNITION STARTS ONLY AFTER TTS FINISHES
===================================================== */

function triggerReminder(medicine) {

    if (activeReminder) {
        return;
    }


    activeReminder = medicine;


    const popup =
        document.getElementById(
            "reminderPopup"
        );


    const popupName =
        document.getElementById(
            "popupMedicineName"
        );


    popupName.textContent =
        medicine.name;


    popup.classList.add("show");


    startContinuousVibration();


    clearInterval(
        reminderVoiceTimer
    );


    clearTimeout(
        reminderMissTimer
    );


    // First reminder speech.
    // Recognition starts AFTER speech finishes.
    speakReminder(
        medicine,
        function () {

            if (
                activeReminder &&
                activeReminder.id === medicine.id
            ) {

                startTakenVoiceRecognition();

            }

        }
    );


    // Repeat reminder every 10 seconds.
    reminderVoiceTimer =
        setInterval(
            function () {

                if (!activeReminder) {
                    return;
                }


                stopTakenVoiceRecognition();


                speakReminder(
                    activeReminder,
                    function () {

                        if (activeReminder) {

                            startTakenVoiceRecognition();

                        }

                    }
                );

            },
            10000
        );


    // Miss after 60 seconds.
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


/* =====================================================
   SPEAK REMINDER
===================================================== */

function speakReminder(
    medicine,
    callback
) {

    const message =
        medicine.name +
        ". " +
        medicine.dosage +
        ". " +
        getText("reminder");


    speakText(
        message,
        callback
    );

}


/* =====================================================
   TEXT TO SPEECH
===================================================== */

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


    utterance.rate = 0.9;

    utterance.pitch = 1;

    utterance.volume = 1;


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


/* =====================================================
   VIBRATION
===================================================== */

function startContinuousVibration() {

    stopContinuousVibration();


    if (
        typeof navigator.vibrate !==
        "function"
    ) {

        return;

    }


    navigator.vibrate(
        [500, 500]
    );


    vibrationTimer =
        setInterval(
            function () {

                if (
                    activeReminder
                ) {

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


    vibrationTimer = null;


    if (
        typeof navigator.vibrate ===
        "function"
    ) {

        navigator.vibrate(0);

    }

}


/* =====================================================
   POPUP TAKE BUTTON
===================================================== */

function markTakenFromPopup() {

    if (!activeReminder) {
        return;
    }


    markTaken(
        activeReminder.id
    );

}


/* =====================================================
   MARK TAKEN
===================================================== */

function markTaken(id) {

    const medicine =
        medicines.find(
            m => m.id === id
        );


    if (!medicine) {
        return;
    }


    medicine.status =
        "taken";


    medicine.takenAt =
        new Date().toISOString();


    saveMedicines();


    stopReminderCompletely();


    renderMedicines();

    updateDashboard();


    logActivity(
        "Medicine taken: " +
        medicine.name
    );


    speakText(
        getText("taken")
    );

}


/* =====================================================
   MARK MISSED
===================================================== */

function markMissed(id) {

    const medicine =
        medicines.find(
            m => m.id === id
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


    window.speechSynthesis.cancel();


    const popup =
        document.getElementById(
            "reminderPopup"
        );


    popup.classList.remove("show");


    activeReminder = null;


    renderMedicines();

    updateDashboard();


    logActivity(
        "Medicine missed: " +
        medicine.name
    );


    speakText(
        getText("missed")
    );


    sendCaregiverSMS(
        medicine
    );

}


/* =====================================================
   STOP REMINDER COMPLETELY
===================================================== */

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


    activeReminder = null;

}


/* =====================================================
   "I TOOK IT" SPEECH RECOGNITION
===================================================== */

function startTakenVoiceRecognition() {

    stopTakenVoiceRecognition();


    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {
        return;
    }


    if (!activeReminder) {
        return;
    }


    takenVoiceActive = true;


    createTakenVoiceRecognition();

}


/* =====================================================
   CREATE TAKEN RECOGNITION
===================================================== */

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

        takenVoiceRecognition =
            new SpeechRecognition();


        takenVoiceRecognition.lang =
            getBrowserLanguage();


        takenVoiceRecognition.continuous =
            false;


        takenVoiceRecognition.interimResults =
            false;


        takenVoiceRecognition.maxAlternatives =
            5;


        takenVoiceRecognition.onresult =
            function (event) {

                if (
                    !activeReminder ||
                    !takenVoiceActive
                ) {
                    return;
                }


                let text = "";


                for (
                    let i = event.resultIndex;
                    i < event.results.length;
                    i++
                ) {

                    text +=
                        event.results[i][0].transcript +
                        " ";

                }


                text =
                    normalizeSpeechText(
                        text
                    );


                console.log(
                    "Heard:",
                    text
                );


                if (
                    detectTakenCommand(
                        text
                    )
                ) {

                    // IMPORTANT:
                    // stop recognition immediately
                    takenVoiceActive =
                        false;


                    clearTimeout(
                        takenVoiceRestartTimer
                    );


                    const id =
                        activeReminder.id;


                    markTaken(id);

                }

            };


        takenVoiceRecognition.onend =
            function () {

                takenVoiceRecognition =
                    null;


                if (
                    takenVoiceActive &&
                    activeReminder
                ) {

                    scheduleTakenVoiceRestart();

                }

            };


        takenVoiceRecognition.onerror =
            function (event) {

                console.log(
                    "Taken recognition error:",
                    event.error
                );


                takenVoiceRecognition =
                    null;


                if (
                    takenVoiceActive &&
                    activeReminder
                ) {

                    if (
                        event.error !==
                            "not-allowed" &&
                        event.error !==
                            "service-not-allowed"
                    ) {

                        scheduleTakenVoiceRestart();

                    }

                }

            };


        takenVoiceRecognition.start();

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


/* =====================================================
   RESTART TAKEN RECOGNITION
===================================================== */

function scheduleTakenVoiceRestart() {

    clearTimeout(
        takenVoiceRestartTimer
    );


    takenVoiceRestartTimer =
        setTimeout(
            function () {

                if (
                    takenVoiceActive &&
                    activeReminder
                ) {

                    createTakenVoiceRecognition();

                }

            },
            700
        );

}


/* =====================================================
   STOP TAKEN RECOGNITION
===================================================== */

function stopTakenVoiceRecognition() {

    takenVoiceActive = false;


    clearTimeout(
        takenVoiceRestartTimer
    );


    takenVoiceRestartTimer = null;


    if (takenVoiceRecognition) {

        try {

            takenVoiceRecognition.stop();

        } catch (e) {}

        try {

            takenVoiceRecognition.abort();

        } catch (e) {}

    }


    takenVoiceRecognition =
        null;

}


/* =====================================================
   DETECT "I TOOK IT"
===================================================== */

function detectTakenCommand(text) {

    if (!text) {
        return false;
    }


    text =
        normalizeSpeechText(
            text
        );


    const commands = [

        // English
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
        "i took",
        "took it",
        "took the medicine",
        "took medicine",
        "medicine taken",
        "medicine is taken",
        "medicine was taken",
        "medicine done",
        "medicine completed",
        "taken",
        "done",
        "completed",
        "finished",

        // Tamil
        "எடுத்துவிட்டேன்",
        "எடுத்து விட்டேன்",
        "மருந்து எடுத்துவிட்டேன்",
        "மருந்து எடுத்தேன்",
        "மருந்தை எடுத்துவிட்டேன்",
        "மருந்து எடுத்தாச்சு",
        "மருந்தை எடுத்தாச்சு",
        "எடுத்தாச்சு",
        "முடிந்தது",

        // Hindi
        "मैंने दवा ले ली",
        "मैंने दवाई ले ली",
        "दवा ले ली",
        "दवाई ले ली",
        "दवा लिया",
        "दवाई लिया",
        "ले लिया",
        "ले ली",
        "हो गया",

        // Telugu
        "నేను మందు తీసుకున్నాను",
        "మందు తీసుకున్నాను",
        "మందు తీసుకున్నా",
        "తీసుకున్నాను",
        "తీసుకున్నా",
        "మందు తీసుకున్న",
        "పూర్తయింది"

    ];


    for (
        let i = 0;
        i < commands.length;
        i++
    ) {

        if (
            text.includes(
                normalizeSpeechText(
                    commands[i]
                )
            )
        ) {

            return true;

        }

    }


    // Additional English matching
    if (
        /\b(i\s+)?took\b/.test(text) &&
        (
            text.includes("it") ||
            text.includes("medicine") ||
            text.includes("medication")
        )
    ) {

        return true;

    }


    if (
        /\b(have\s+)?taken\b/.test(text) &&
        (
            text.includes("it") ||
            text.includes("medicine") ||
            text.includes("medication")
        )
    ) {

        return true;

    }


    return false;

}


/* =====================================================
   NORMALIZE SPEECH TEXT
===================================================== */

function normalizeSpeechText(text) {

    return text
        .toLowerCase()
        .replace(/[.,!?;:]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

}


/* =====================================================
   VOICE MEDICINE ENTRY
===================================================== */

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


    document.getElementById(
        "medicineName"
    ).value = "";


    document.getElementById(
        "dosage"
    ).value = "";


    document.getElementById(
        "medicineTime"
    ).value = "";


    voiceEntryActive = true;

    voiceStep = "name";


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


/* =====================================================
   VOICE STEP RECOGNITION
===================================================== */

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
        } catch (e) {}

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

            let transcript =
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


            if (
                voiceEntryActive
            ) {

                setVoiceStatus(
                    "Please try again."
                );

                setTimeout(
                    function () {

                        if (
                            voiceEntryActive
                        ) {

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

        console.log(error);

    }

}


/* =====================================================
   PROCESS VOICE STEP
===================================================== */

function processVoiceStep(
    transcript
) {

    if (!voiceEntryActive) {
        return;
    }


    if (
        voiceStep === "name"
    ) {

        document.getElementById(
            "medicineName"
        ).value =
            transcript;


        voiceStep = "dosage";

        updateVoiceStepUI();


        speakText(
            getText("dosagePrompt"),
            function () {

                if (
                    voiceEntryActive
                ) {

                    startVoiceStepRecognition();

                }

            }
        );


        return;

    }


    if (
        voiceStep === "dosage"
    ) {

        const dosage =
            extractDosage(
                transcript
            );


        document.getElementById(
            "dosage"
        ).value =
            dosage;


        voiceStep = "time";

        updateVoiceStepUI();


        speakText(
            getText("timePrompt"),
            function () {

                if (
                    voiceEntryActive
                ) {

                    startVoiceStepRecognition();

                }

            }
        );


        return;

    }


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

                    if (
                        voiceEntryActive
                    ) {

                        startVoiceStepRecognition();

                    }

                }
            );

            return;

        }


        document.getElementById(
            "medicineTime"
        ).value =
            convertedTime;


        voiceEntryActive =
            false;


        voiceStep = null;


        updateVoiceStepUI();


        setVoiceStatus(
            getText("confirmation")
        );


        speakText(
            getText("confirmation")
        );

    }

}


/* =====================================================
   EXTRACT DOSAGE
===================================================== */

function extractDosage(text) {

    text =
        text.trim();


    return text;

}


/* =====================================================
   CONVERT SPOKEN TIME
===================================================== */

function convertSpokenTime(text) {

    text =
        text.toLowerCase()
            .trim();


    // 8:30 pm
    let match =
        text.match(
            /(\d{1,2}):(\d{2})\s*(am|pm)?/
        );


    if (match) {

        let hour =
            parseInt(match[1]);

        let minute =
            parseInt(match[2]);

        let period =
            match[3];


        if (period === "pm" && hour < 12) {
            hour += 12;
        }

        if (period === "am" && hour === 12) {
            hour = 0;
        }


        return (
            String(hour).padStart(2, "0") +
            ":" +
            String(minute).padStart(2, "0")
        );

    }


    // 8 pm
    match =
        text.match(
            /(\d{1,2})\s*(am|pm)/
        );


    if (match) {

        let hour =
            parseInt(match[1]);

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


    return null;

}


/* =====================================================
   VOICE STEP UI
===================================================== */

function updateVoiceStepUI() {

    document
        .querySelectorAll(".voice-step")
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


/* =====================================================
   VOICE STATUS
===================================================== */

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


/* =====================================================
   STOP VOICE ENTRY
===================================================== */

function stopVoiceMedicineEntry() {

    voiceEntryActive =
        false;

    voiceStep = null;


    if (voiceRecognition) {

        try {
            voiceRecognition.stop();
        } catch (e) {}

        try {
            voiceRecognition.abort();
        } catch (e) {}

    }


    voiceRecognition =
        null;


    updateVoiceStepUI();

}


/* =====================================================
   ENABLE MOBILE VOICE
===================================================== */

function enableMobileVoice() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        document.getElementById(
            "voiceStatus"
        ).textContent =
            getText(
                "voiceNotSupported"
            );

        return;

    }


    voiceUnlocked = true;


    document.getElementById(
        "voiceStatus"
    ).textContent =
        "Voice enabled successfully.";

}


/* =====================================================
   CAREGIVER
===================================================== */

function saveCaregiver() {

    const phone =
        document.getElementById(
            "caregiverPhone"
        ).value.trim();


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


/* =====================================================
   CALL CAREGIVER
===================================================== */

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


/* =====================================================
   CALL AMBULANCE
===================================================== */

function callAmbulance() {

    window.location.href =
        "tel:108";

}


/* =====================================================
   CAREGIVER SMS
===================================================== */

function sendCaregiverSMS(
    medicine
) {

    const caregiver =
        localStorage.getItem(
            "jsMedicareCaregiver"
        );


    if (!caregiver) {
        return;
    }


    const message =
        "JS MEDICARE Alert: " +
        medicine.name +
        " (" +
        medicine.dosage +
        ") was missed.";


    window.location.href =
        "sms:" +
        caregiver +
        "?body=" +
        encodeURIComponent(
            message
        );

}


/* =====================================================
   ACTIVITY LOG
===================================================== */

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
        log.textContent ===
        "No activity yet."
    ) {

        log.innerHTML = "";

    }


    log.prepend(item);

}


/* =====================================================
   NEXT REMINDER
===================================================== */

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
                medicine =>
                    medicine.status !==
                    "taken"
            )
            .sort(
                (a, b) =>
                    a.time.localeCompare(
                        b.time
                    )
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


/* =====================================================
   MEDICATION REPORT
===================================================== */

function generateMedicationReport() {

    let html = `

        <html>

        <head>

            <title>
                JS MEDICARE Medication Report
            </title>

            <style>

                body {
                    font-family: Arial;
                    padding: 30px;
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
                        ${escapeHTML(medicine.name)}
                    </td>

                    <td>
                        ${escapeHTML(medicine.dosage)}
                    </td>

                    <td>
                        ${formatTime(medicine.time)}
                    </td>

                    <td>
                        ${medicine.status}
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


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(
    value
) {

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
