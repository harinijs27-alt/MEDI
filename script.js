// ============================================================
// MEDICARE AI - COMPLETE SCRIPT.JS
// ============================================================

let medicines = [];
let activeReminder = null;
let reminderLoop = null;

let patientName = "";
let patientPhone = "";
let selectedLanguage = "en";

let reminderTimers = {};


// ============================================================
// TRANSLATIONS
// ============================================================

const translations = {

    en: {
        subtitle: "AI Powered Healthcare Assistant",
        aiMonitoring: "AI Monitoring Online",
        medicineName: "Medicine Name",
        dosage: "Dosage",
        reminderTime: "Reminder Time",
        addMedicine: "Add Medicine",
        testVoice: "Test Medicine Voice",
        noMedicines: "No medicines added yet.",
        taken: "Taken",
        missed: "Missed",
        pending: "Pending",
        delete: "Delete",
        markTaken: "I Took It",
        nextReminder: "Next Reminder",
        totalMedicines: "Total Medicines",
        takenToday: "Taken Today",
        missedToday: "Missed Today",
        patientName: "Patient Name",
        caregiverPhone: "Caregiver Phone"
    },

    ta: {
        subtitle: "AI மூலம் இயங்கும் சுகாதார உதவியாளர்",
        aiMonitoring: "AI கண்காணிப்பு இயங்குகிறது",
        medicineName: "மருந்தின் பெயர்",
        dosage: "அளவு",
        reminderTime: "நினைவூட்டும் நேரம்",
        addMedicine: "மருந்தைச் சேர்க்கவும்",
        testVoice: "மருந்து குரலைச் சோதிக்கவும்",
        noMedicines: "இதுவரை மருந்துகள் சேர்க்கப்படவில்லை.",
        taken: "எடுத்துக்கொண்டது",
        missed: "தவறியது",
        pending: "நிலுவையில்",
        delete: "நீக்கு",
        markTaken: "நான் எடுத்துக்கொண்டேன்",
        nextReminder: "அடுத்த நினைவூட்டல்",
        totalMedicines: "மொத்த மருந்துகள்",
        takenToday: "இன்று எடுத்தது",
        missedToday: "இன்று தவறியது",
        patientName: "நோயாளியின் பெயர்",
        caregiverPhone: "பராமரிப்பாளரின் தொலைபேசி"
    },

    hi: {
        subtitle: "AI संचालित स्वास्थ्य सहायक",
        aiMonitoring: "AI निगरानी चालू है",
        medicineName: "दवा का नाम",
        dosage: "खुराक",
        reminderTime: "दवा का समय",
        addMedicine: "दवा जोड़ें",
        testVoice: "दवा की आवाज़ जांचें",
        noMedicines: "अभी तक कोई दवा नहीं जोड़ी गई है।",
        taken: "ली गई",
        missed: "छूट गई",
        pending: "लंबित",
        delete: "हटाएं",
        markTaken: "मैंने दवा ले ली",
        nextReminder: "अगला रिमाइंडर",
        totalMedicines: "कुल दवाएं",
        takenToday: "आज ली गई",
        missedToday: "आज छूटी",
        patientName: "मरीज का नाम",
        caregiverPhone: "देखभालकर्ता फोन"
    },

    te: {
        subtitle: "AI ఆధారిత ఆరోగ్య సహాయకుడు",
        aiMonitoring: "AI పర్యవేక్షణ ఆన్‌లో ఉంది",
        medicineName: "మందు పేరు",
        dosage: "మోతాదు",
        reminderTime: "గుర్తు చేసే సమయం",
        addMedicine: "మందును జోడించండి",
        testVoice: "మందు వాయిస్ పరీక్షించండి",
        noMedicines: "ఇంకా మందులు జోడించబడలేదు.",
        taken: "తీసుకున్నారు",
        missed: "తప్పిపోయింది",
        pending: "పెండింగ్",
        delete: "తొలగించు",
        markTaken: "నేను మందు తీసుకున్నాను",
        nextReminder: "తదుపరి రిమైండర్",
        totalMedicines: "మొత్తం మందులు",
        takenToday: "ఈరోజు తీసుకున్నవి",
        missedToday: "ఈరోజు తప్పిపోయినవి",
        patientName: "రోగి పేరు",
        caregiverPhone: "సంరక్షకుడి ఫోన్"
    }
};


// ============================================================
// LANGUAGE
// ============================================================

function getLanguage() {

    const select =
        document.getElementById("language");

    if (select && select.value) {
        selectedLanguage = select.value;
    }

    return selectedLanguage;
}


function changeLanguage() {

    const select =
        document.getElementById("language");

    if (select) {
        selectedLanguage = select.value;
    }

    applyLanguage();

    console.log(
        "Selected language:",
        selectedLanguage
    );
}


function applyLanguage() {

    const lang = getLanguage();

    const data =
        translations[lang] ||
        translations.en;

    document
        .querySelectorAll("[data-i18n]")
        .forEach(function (element) {

            const key =
                element.getAttribute("data-i18n");

            if (data[key]) {
                element.textContent = data[key];
            }

        });
}


// ============================================================
// VOICE LANGUAGE
// ============================================================

function getVoiceLanguage() {

    const lang = getLanguage();

    if (lang === "ta") {
        return "ta-IN";
    }

    if (lang === "hi") {
        return "hi-IN";
    }

    if (lang === "te") {
        return "te-IN";
    }

    return "en-IN";
}


// ============================================================
// FIND VOICE
// ============================================================

function findVoice(languageCode) {

    const voices =
        window.speechSynthesis.getVoices();

    if (!voices || voices.length === 0) {
        return null;
    }

    console.log("Available voices:");

    voices.forEach(function (voice) {

        console.log(
            voice.name,
            "=>",
            voice.lang
        );

    });


    // Exact language match

    let voice =
        voices.find(function (v) {

            return v.lang.toLowerCase() ===
                languageCode.toLowerCase();

        });

    if (voice) {
        return voice;
    }


    // Language-only match

    const shortLang =
        languageCode
            .substring(0, 2)
            .toLowerCase();


    voice =
        voices.find(function (v) {

            return v.lang
                .toLowerCase()
                .startsWith(shortLang);

        });


    return voice || null;
}


// ============================================================
// CREATE REMINDER MESSAGE
// ============================================================

function createReminderMessage(medicineName) {

    const name =
        String(medicineName || "").trim();

    if (!name) {
        return "";
    }

    const lang = getLanguage();


    // IMPORTANT:
    // PATIENT NAME IS NOT USED HERE.


    if (lang === "ta") {

        return (
            name +
            " மருந்தை எடுத்துக்கொள்ளும் நேரம் வந்துவிட்டது."
        );

    }


    if (lang === "hi") {

        return (
            name +
            " दवा लेने का समय हो गया है।"
        );

    }


    if (lang === "te") {

        return (
            name +
            " మందు తీసుకునే సమయం వచ్చింది."
        );

    }


    return (
        "It is time to take " +
        name +
        "."
    );
}


// ============================================================
// SPEAK
// ============================================================

function speakMedicine(text) {

    if (!text || !text.trim()) {

        console.log(
            "MEDICARE AI: Nothing to speak."
        );

        return;
    }


    if (!("speechSynthesis" in window)) {

        alert(
            "Speech is not supported in this browser."
        );

        return;
    }


    try {

        window.speechSynthesis.cancel();

        window.speechSynthesis.resume();


        setTimeout(function () {

            const languageCode =
                getVoiceLanguage();


            const voice =
                findVoice(languageCode);


            const speech =
                new SpeechSynthesisUtterance(text);


            speech.lang =
                languageCode;


            speech.rate = 0.8;
            speech.pitch = 1;
            speech.volume = 1;


            if (voice) {

                speech.voice =
                    voice;

                console.log(
                    "Using voice:",
                    voice.name,
                    voice.lang
                );

            } else {

                console.log(
                    "No regional voice found:",
                    languageCode
                );

            }


            speech.onstart =
                function () {

                    console.log(
                        "MEDICARE AI voice started"
                    );

                };


            speech.onend =
                function () {

                    console.log(
                        "MEDICARE AI voice finished"
                    );

                };


            speech.onerror =
                function (event) {

                    console.log(
                        "Speech error:",
                        event.error
                    );

                };


            window.speechSynthesis
                .speak(speech);

        }, 150);


    } catch (error) {

        console.log(
            "Voice error:",
            error
        );

    }
}


// ============================================================
// GET MEDICINE INPUT
// ============================================================

function getMedicineInput() {

    const input =
        document.getElementById(
            "medicineName"
        );

    if (!input) {

        alert(
            "Medicine name input not found."
        );

        return "";

    }

    return input.value.trim();
}


// ============================================================
// TEST MEDICINE VOICE
// ============================================================

function testMedicineVoice() {

    console.log(
        "TEST VOICE BUTTON CLICKED"
    );


    const medicineName =
        getMedicineInput();


    if (!medicineName) {

        alert(
            "Please enter a medicine name first."
        );

        return;

    }


    const message =
        createReminderMessage(
            medicineName
        );


    console.log(
        "Medicine:",
        medicineName
    );


    console.log(
        "Message:",
        message
    );


    speakMedicine(message);
}


// ============================================================
// ADD MEDICINE
// ============================================================

function addMedicine() {

    const nameInput =
        document.getElementById(
            "medicineName"
        );


    const dosageInput =
        document.getElementById(
            "dosage"
        );


    const timeInput =
        document.getElementById(
            "medicineTime"
        );


    if (!nameInput) {

        alert(
            "Medicine name field not found."
        );

        return;

    }


    const name =
        nameInput.value.trim();


    const dosage =
        dosageInput ?
            dosageInput.value.trim() :
            "";


    const time =
        timeInput ?
            timeInput.value :
            "";


    if (!name) {

        alert(
            "Please enter medicine name."
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

        id:
            Date.now(),

        name:
            name,

        dosage:
            dosage,

        time:
            time,

        status:
            "pending",

        createdAt:
            new Date().toISOString(),

        takenAt:
            null,

        missedAt:
            null

    };


    medicines.push(medicine);


    saveMedicines();

    renderMedicines();

    updateDashboard();


    nameInput.value = "";

    if (dosageInput) {
        dosageInput.value = "";
    }


    alert(
        "Medicine added successfully."
    );

}


// ============================================================
// SAVE MEDICINES
// ============================================================

function saveMedicines() {

    localStorage.setItem(
        "medicare_medicines",
        JSON.stringify(medicines)
    );

}


// ============================================================
// LOAD MEDICINES
// ============================================================

function loadMedicines() {

    const saved =
        localStorage.getItem(
            "medicare_medicines"
        );


    if (saved) {

        try {

            medicines =
                JSON.parse(saved);

        } catch (error) {

            medicines = [];

        }

    } else {

        medicines = [];

    }

}


// ============================================================
// ESCAPE HTML
// ============================================================

function escapeHTML(value) {

    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ============================================================
// RENDER MEDICINES
// ============================================================

function renderMedicines() {

    const container =
        document.getElementById(
            "medicineList"
        );


    if (!container) {
        return;
    }


    if (medicines.length === 0) {

        container.innerHTML =
            "<p>No medicines added yet.</p>";

        return;

    }


    container.innerHTML = "";


    medicines.forEach(function (medicine) {

        const card =
            document.createElement("div");


        card.className =
            "medicine-card";


        let statusText =
            medicine.status;


        const lang =
            getLanguage();


        if (medicine.status === "taken") {

            statusText =
                translations[lang].taken;

        }

        else if (medicine.status === "missed") {

            statusText =
                translations[lang].missed;

        }

        else {

            statusText =
                translations[lang].pending;

        }


        card.innerHTML = `

            <div>

                <h3>
                    ${escapeHTML(medicine.name)}
                </h3>

                <p>
                    ${escapeHTML(medicine.dosage)}
                </p>

                <p>
                    ⏰ ${escapeHTML(medicine.time)}
                </p>

                <strong>
                    ${escapeHTML(statusText)}
                </strong>

            </div>

            <div>

                ${
                    medicine.status === "pending"
                    ?
                    `
                    <button
                        type="button"
                        onclick="markTaken(${medicine.id})"
                    >
                        💊
                        ${escapeHTML(
                            translations[lang].markTaken
                        )}
                    </button>
                    `
                    :
                    ""
                }

                <button
                    type="button"
                    onclick="deleteMedicine(${medicine.id})"
                >
                    🗑️
                    ${escapeHTML(
                        translations[lang].delete
                    )}
                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


// ============================================================
// MARK TAKEN
// ============================================================

function markTaken(id) {

    const medicine =
        medicines.find(function (item) {

            return item.id === id;

        });


    if (!medicine) {
        return;
    }


    medicine.status =
        "taken";


    medicine.takenAt =
        new Date().toISOString();


    if (reminderTimers[id]) {

        clearTimeout(
            reminderTimers[id]
        );

        delete reminderTimers[id];

    }


    if (activeReminder === id) {

        activeReminder = null;

    }


    window.speechSynthesis.cancel();


    saveMedicines();

    renderMedicines();

    updateDashboard();

}


// ============================================================
// DELETE MEDICINE
// ============================================================

function deleteMedicine(id) {

    if (
        !confirm(
            "Delete this medicine?"
        )
    ) {

        return;

    }


    medicines =
        medicines.filter(function (medicine) {

            return medicine.id !== id;

        });


    saveMedicines();

    renderMedicines();

    updateDashboard();

}


// ============================================================
// VISUAL REMINDER
// ============================================================

function showVisualReminder(medicine) {

    const message =
        document.getElementById(
            "reminderMessage"
        );


    if (message) {

        message.textContent =
            medicine.name;

        message.style.display =
            "block";

    }


    const card =
        document.getElementById(
            "activeReminder"
        );


    if (card) {

        card.style.display =
            "block";

        card.innerHTML = `

            <h2>💊 ${escapeHTML(
                medicine.name
            )}</h2>

            <p>
                ${escapeHTML(
                    medicine.dosage || ""
                )}
            </p>

            <button
                type="button"
                onclick="markTaken(${medicine.id})"
            >
                💊 I Took It
            </button>

        `;

    }


    // Vibration if supported

    if (
        navigator.vibrate
    ) {

        navigator.vibrate([
            500,
            300,
            500
        ]);

    }


    // Browser title

    document.title =
        "💊 Medicine Reminder";

}


// ============================================================
// HIDE REMINDER
// ============================================================

function hideVisualReminder() {

    const card =
        document.getElementById(
            "activeReminder"
        );


    if (card) {

        card.style.display =
            "none";

    }


    const message =
        document.getElementById(
            "reminderMessage"
        );


    if (message) {

        message.style.display =
            "none";

    }


    document.title =
        "MEDICARE AI";

}


// ============================================================
// TRIGGER REMINDER
// ============================================================

function triggerReminder(medicine) {

    if (
        medicine.status !== "pending"
    ) {

        return;

    }


    activeReminder =
        medicine.id;


    const medicineName =
        String(
            medicine.name || ""
        ).trim();


    const message =
        createReminderMessage(
            medicineName
        );


    console.log(
        "MEDICARE AI REMINDER"
    );


    console.log(
        "Medicine:",
        medicineName
    );


    console.log(
        "Message:",
        message
    );


    showVisualReminder(
        medicine
    );


    // SPEAK IMMEDIATELY

    speakMedicine(
        message
    );


    // Repeat after 10 seconds

    const repeatTimer =
        setTimeout(function () {

            const current =
                medicines.find(function (m) {

                    return m.id ===
                        medicine.id;

                });


            if (
                current &&
                current.status ===
                "pending"
            ) {

                speakMedicine(
                    message
                );

            }

        }, 10000);


    reminderTimers[
        medicine.id
    ] = repeatTimer;


    // Mark missed after 60 seconds

    const missedTimer =
        setTimeout(function () {

            const current =
                medicines.find(function (m) {

                    return m.id ===
                        medicine.id;

                });


            if (
                current &&
                current.status ===
                "pending"
            ) {

                current.status =
                    "missed";


                current.missedAt =
                    new Date()
                        .toISOString();


                saveMedicines();

                renderMedicines();

                updateDashboard();


                speakMissedReminder(
                    current
                );


                sendCaregiverSMS(
                    current
                );

            }


            if (
                activeReminder ===
                medicine.id
            ) {

                activeReminder =
                    null;

            }


            delete reminderTimers[
                medicine.id
            ];


            hideVisualReminder();

        }, 60000);


    // Store missed timer separately

    medicine.missedTimer =
        missedTimer;

}


// ============================================================
// MISSED REMINDER VOICE
// ============================================================

function speakMissedReminder(
    medicine
) {

    const lang =
        getLanguage();


    let message = "";


    if (lang === "ta") {

        message =
            medicine.name +
            " மருந்து எடுக்கப்படவில்லை.";

    }

    else if (lang === "hi") {

        message =
            medicine.name +
            " दवा नहीं ली गई है।";

    }

    else if (lang === "te") {

        message =
            medicine.name +
            " మందు తీసుకోలేదు.";

    }

    else {

        message =
            medicine.name +
            " has not been taken.";

    }


    speakMedicine(
        message
    );

}


// ============================================================
// REMINDER CHECKER
// ============================================================

function startReminderChecker() {

    if (reminderLoop) {

        clearInterval(
            reminderLoop
        );

    }


    reminderLoop =
        setInterval(
            checkMedicationReminder,
            5000
        );


    checkMedicationReminder();

}


// ============================================================
// CHECK CURRENT TIME
// ============================================================

function checkMedicationReminder() {

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


    medicines.forEach(
        function (medicine) {

            if (
                medicine.status !==
                "pending"
            ) {

                return;

            }


            if (
                medicine.time ===
                currentTime
            ) {

                const today =
                    now.toDateString();


                const lastTriggered =
                    medicine.lastTriggeredDate;


                if (
                    lastTriggered !==
                    today
                ) {

                    medicine.lastTriggeredDate =
                        today;


                    saveMedicines();


                    triggerReminder(
                        medicine
                    );

                }

            }

        }
    );

}


// ============================================================
// UPDATE DASHBOARD
// ============================================================

function updateDashboard() {

    const total =
        document.getElementById(
            "totalMedicines"
        );


    const taken =
        document.getElementById(
            "takenToday"
        );


    const missed =
        document.getElementById(
            "missedToday"
        );


    const today =
        new Date()
            .toDateString();


    const takenCount =
        medicines.filter(
            function (medicine) {

                return (
                    medicine.status ===
                    "taken" &&
                    medicine.takenAt &&
                    new Date(
                        medicine.takenAt
                    ).toDateString() ===
                    today
                );

            }
        ).length;


    const missedCount =
        medicines.filter(
            function (medicine) {

                return (
                    medicine.status ===
                    "missed" &&
                    medicine.missedAt &&
                    new Date(
                        medicine.missedAt
                    ).toDateString() ===
                    today
                );

            }
        ).length;


    if (total) {

        total.textContent =
            medicines.length;

    }


    if (taken) {

        taken.textContent =
            takenCount;

    }


    if (missed) {

        missed.textContent =
            missedCount;

    }


    updateNextReminder();

}


// ============================================================
// NEXT REMINDER
// ============================================================

function updateNextReminder() {

    const element =
        document.getElementById(
            "nextReminder"
        );


    if (!element) {
        return;
    }


    const pending =
        medicines.filter(
            function (medicine) {

                return (
                    medicine.status ===
                    "pending"
                );

            }
        );


    if (pending.length === 0) {

        element.textContent =
            "--";

        return;

    }


    pending.sort(
        function (a, b) {

            return a.time
                .localeCompare(
                    b.time
                );

        }
    );


    element.textContent =
        pending[0].name +
        " - " +
        pending[0].time;

}


// ============================================================
// PATIENT INFORMATION
// ============================================================

function savePatient() {

    const nameInput =
        document.getElementById(
            "patientName"
        );


    const phoneInput =
        document.getElementById(
            "patientPhone"
        );


    if (nameInput) {

        patientName =
            nameInput.value.trim();

        localStorage.setItem(
            "medicare_patientName",
            patientName
        );

    }


    if (phoneInput) {

        patientPhone =
            phoneInput.value.trim();

        localStorage.setItem(
            "medicare_patientPhone",
            patientPhone
        );

    }

}


// ============================================================
// LOAD PATIENT
// ============================================================

function loadPatient() {

    patientName =
        localStorage.getItem(
            "medicare_patientName"
        ) || "";


    patientPhone =
        localStorage.getItem(
            "medicare_patientPhone"
        ) || "";


    const nameInput =
        document.getElementById(
            "patientName"
        );


    const phoneInput =
        document.getElementById(
            "patientPhone"
        );


    if (nameInput) {

        nameInput.value =
            patientName;

    }


    if (phoneInput) {

        phoneInput.value =
            patientPhone;

    }

}


// ============================================================
// CAREGIVER
// ============================================================

function saveCaregiver() {

    const input =
        document.getElementById(
            "caregiverPhone"
        );


    if (!input) {

        alert(
            "Caregiver phone field not found."
        );

        return;

    }


    const phone =
        input.value.trim();


    if (!phone) {

        alert(
            "Please enter caregiver phone number."
        );

        return;

    }


    localStorage.setItem(
        "medicare_caregiverPhone",
        phone
    );


    alert(
        "Caregiver number saved."
    );

}


// ============================================================
// LOAD CAREGIVER
// ============================================================

function loadCaregiver() {

    const phone =
        localStorage.getItem(
            "medicare_caregiverPhone"
        ) || "";


    const input =
        document.getElementById(
            "caregiverPhone"
        );


    if (input) {

        input.value =
            phone;

    }

}


// ============================================================
// CALL CAREGIVER
// ============================================================

function callCaregiver() {

    const phone =
        localStorage.getItem(
            "medicare_caregiverPhone"
        );


    if (!phone) {

        alert(
            "Please save caregiver phone number first."
        );

        return;

    }


    window.location.href =
        "tel:" + phone;

}


// ============================================================
// CALL AMBULANCE
// ============================================================

function callAmbulance() {

    window.location.href =
        "tel:108";

}


// ============================================================
// CAREGIVER SMS
// ============================================================

function sendCaregiverSMS(
    medicine
) {

    const phone =
        localStorage.getItem(
            "medicare_caregiverPhone"
        );


    if (!phone) {

        console.log(
            "No caregiver number saved."
        );

        return;

    }


    const lang =
        getLanguage();


    let message = "";


    if (lang === "ta") {

        message =
            "MEDICARE AI: " +
            medicine.name +
            " மருந்து எடுத்துக்கொள்ளப்படவில்லை.";

    }

    else if (lang === "hi") {

        message =
            "MEDICARE AI: " +
            medicine.name +
            " दवा नहीं ली गई है।";

    }

    else if (lang === "te") {

        message =
            "MEDICARE AI: " +
            medicine.name +
            " మందు తీసుకోలేదు.";

    }

    else {

        message =
            "MEDICARE AI: " +
            medicine.name +
            " medicine has not been taken.";

    }


    // Opens SMS application

    const url =
        "sms:" +
        phone +
        "?body=" +
        encodeURIComponent(
            message
        );


    window.location.href =
        url;

}


// ============================================================
// GENERATE MEDICATION REPORT
// ============================================================

function generateMedicationReport() {

    let report =
        "<!DOCTYPE html>" +
        "<html>" +
        "<head>" +
        "<title>MEDICARE AI Report</title>" +
        "<style>" +

        "body{" +
        "font-family:Arial;" +
        "padding:30px;" +
        "}" +

        "table{" +
        "border-collapse:collapse;" +
        "width:100%;" +
        "}" +

        "th,td{" +
        "border:1px solid #999;" +
        "padding:10px;" +
        "text-align:left;" +
        "}" +

        "</style>" +
        "</head>" +
        "<body>";


    report +=
        "<h1>MEDICARE AI Medication Report</h1>";


    report +=
        "<p><b>Patient:</b> " +
        escapeHTML(
            patientName
        ) +
        "</p>";


    report +=
        "<table>" +

        "<tr>" +
        "<th>Medicine</th>" +
        "<th>Dosage</th>" +
        "<th>Time</th>" +
        "<th>Status</th>" +
        "</tr>";


    medicines.forEach(
        function (medicine) {

            report +=

                "<tr>" +

                "<td>" +
                escapeHTML(
                    medicine.name
                ) +
                "</td>" +

                "<td>" +
                escapeHTML(
                    medicine.dosage
                ) +
                "</td>" +

                "<td>" +
                escapeHTML(
                    medicine.time
                ) +
                "</td>" +

                "<td>" +
                escapeHTML(
                    medicine.status
                ) +
                "</td>" +

                "</tr>";

        }
    );


    report +=
        "</table>" +
        "</body>" +
        "</html>";


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
        report
    );


    reportWindow.document.close();


    reportWindow.onload =
        function () {

            reportWindow.print();

        };

}


// ============================================================
// LOGOUT
// ============================================================

function logout() {

    if (
        confirm(
            "Are you sure you want to logout?"
        )
    ) {

        window.location.reload();

    }

}


// ============================================================
// INITIALIZE
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "MEDICARE AI starting..."
        );


        // Load saved information

        loadPatient();

        loadCaregiver();

        loadMedicines();


        // Language

        const languageSelect =
            document.getElementById(
                "language"
            );


        if (languageSelect) {

            selectedLanguage =
                languageSelect.value ||
                localStorage.getItem(
                    "medicare_language"
                ) ||
                "en";


            languageSelect.value =
                selectedLanguage;


            languageSelect.addEventListener(
                "change",
                function () {

                    selectedLanguage =
                        languageSelect.value;


                    localStorage.setItem(
                        "medicare_language",
                        selectedLanguage
                    );


                    applyLanguage();

                    renderMedicines();

                }
            );

        }


        // Voice test button

        const voiceButton =
            document.getElementById(
                "testVoiceBtn"
            );


        if (voiceButton) {

            voiceButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    testMedicineVoice();

                }
            );


            console.log(
                "Voice test button connected."
            );

        } else {

            console.log(
                "Voice test button not found."
            );

        }


        // Add medicine button

        const addButton =
            document.getElementById(
                "addMedicineBtn"
            );


        if (addButton) {

            addButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    addMedicine();

                }
            );

        }


        // Apply language

        applyLanguage();


        // Render

        renderMedicines();


        // Dashboard

        updateDashboard();


        // Start reminders

        startReminderChecker();


        // Load browser voices

        window.speechSynthesis
            .getVoices();


        window.speechSynthesis
            .onvoiceschanged =
            function () {

                console.log(
                    "Browser voices loaded."
                );

            };


        console.log(
            "MEDICARE AI ready."
        );

    }
);
