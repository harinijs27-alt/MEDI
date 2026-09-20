/* =========================================================
   JS MEDICARE
   AI MEDICATION REMINDER
   ========================================================= */


/* =========================================================
   GLOBAL VARIABLES
   ========================================================= */

let medicines = [];

let activeReminder = null;

let reminderLoop = null;

let patientName = "";

let patientPhone = "";

let selectedLanguage = "en";

let medicareAudio = null;

let voiceUnlocked = false;


/* =========================================================
   TRANSLATIONS
   ========================================================= */

const translations = {

    en: {
        welcome: "Welcome to JS MEDICARE",
        aiStatus: "AI Monitoring Online",
        aiTitle: "AI Medication Monitoring",
        aiMessage:
            "Your medication schedule is being monitored automatically.",
        addMedicine: "Add Medicine",
        myMedicines: "My Medicines",
        nextReminder: "Next Reminder"
    },

    ta: {
        welcome: "JS MEDICARE க்கு வரவேற்கிறோம்",
        aiStatus: "AI கண்காணிப்பு இயங்குகிறது",
        aiTitle: "AI மருந்து கண்காணிப்பு",
        aiMessage:
            "உங்கள் மருந்து அட்டவணை தானாக கண்காணிக்கப்படுகிறது.",
        addMedicine: "மருந்தை சேர்க்கவும்",
        myMedicines: "எனது மருந்துகள்",
        nextReminder: "அடுத்த நினைவூட்டல்"
    },

    hi: {
        welcome: "JS MEDICARE में आपका स्वागत है",
        aiStatus: "AI निगरानी चालू है",
        aiTitle: "AI दवा निगरानी",
        aiMessage:
            "आपकी दवा की समय-सारणी स्वचालित रूप से निगरानी की जा रही है।",
        addMedicine: "दवा जोड़ें",
        myMedicines: "मेरी दवाएं",
        nextReminder: "अगला रिमाइंडर"
    },

    te: {
        welcome: "JS MEDICARE కు స్వాగతం",
        aiStatus: "AI పర్యవేక్షణ ఆన్‌లైన్‌లో ఉంది",
        aiTitle: "AI మందుల పర్యవేక్షణ",
        aiMessage:
            "మీ మందుల షెడ్యూల్ స్వయంచాలకంగా పర్యవేక్షించబడుతోంది.",
        addMedicine: "మందును జోడించండి",
        myMedicines: "నా మందులు",
        nextReminder: "తదుపరి రిమైండర్"
    }

};


/* =========================================================
   LANGUAGE FUNCTIONS
   ========================================================= */

function getLanguage() {

    return selectedLanguage || "en";

}


function getVoiceLanguageCode() {

    const lang = getLanguage();

    if (lang === "ta") return "ta";

    if (lang === "hi") return "hi";

    if (lang === "te") return "te";

    return "en";
}


function getBrowserLanguage() {

    const lang = getLanguage();

    if (lang === "ta") return "ta-IN";

    if (lang === "hi") return "hi-IN";

    if (lang === "te") return "te-IN";

    return "en-IN";
}


/* =========================================================
   REMINDER MESSAGE
   ========================================================= */

function buildReminderMessage(medicineName) {

    const lang = getLanguage();

    const name =
        String(medicineName || "").trim();

    if (!name) return "";


    if (lang === "ta") {

        return `${name} மருந்தை எடுத்துக்கொள்ளும் நேரம் வந்துவிட்டது.`;

    }


    if (lang === "hi") {

        return `${name} दवा लेने का समय हो गया है।`;

    }


    if (lang === "te") {

        return `${name} మందు తీసుకునే సమయం వచ్చింది.`;

    }


    return `It is time to take ${name}.`;

}


/* =========================================================
   VOICE SYSTEM
   ========================================================= */

function speakRegionalVoice(text) {

    if (!text || !text.trim()) {
        return;
    }

    const language =
        getVoiceLanguageCode();


    try {

        speechSynthesis.cancel();

    } catch (error) {

        console.log(error);

    }


    /* English */

    if (language === "en") {

        speakBrowserVoice(
            text,
            "en-IN"
        );

        return;

    }


    /*
       Regional-language voice.
       Uses online TTS first.
    */

    const audioURL =
        "https://translate.google.com/translate_tts" +
        "?ie=UTF-8" +
        "&client=tw-ob" +
        "&tl=" +
        language +
        "&q=" +
        encodeURIComponent(text);


    try {

        medicareAudio =
            new Audio(audioURL);

        medicareAudio.volume = 1.0;


        medicareAudio.play()

            .then(() => {

                console.log(
                    "MEDICARE VOICE:",
                    language,
                    "started"
                );

            })

            .catch(error => {

                console.log(
                    "Regional voice failed:",
                    error
                );

                speakBrowserVoice(
                    text,
                    getBrowserLanguage()
                );

            });

    }

    catch (error) {

        console.log(
            "Voice error:",
            error
        );

        speakBrowserVoice(
            text,
            getBrowserLanguage()
        );

    }

}


/* =========================================================
   BROWSER VOICE
   ========================================================= */

function speakBrowserVoice(
    text,
    language
) {

    if (!("speechSynthesis" in window)) {

        console.log(
            "Speech synthesis not supported."
        );

        return;

    }


    try {

        speechSynthesis.cancel();

        speechSynthesis.resume();


        const speech =
            new SpeechSynthesisUtterance(text);


        speech.lang = language;

        speech.rate = 0.8;

        speech.pitch = 1;

        speech.volume = 1;


        speechSynthesis.speak(
            speech
        );

    }

    catch (error) {

        console.log(
            "Browser speech error:",
            error
        );

    }

}


/* =========================================================
   ENABLE MOBILE VOICE
   ========================================================= */

function enableMobileVoice() {

    if (
        "speechSynthesis"
        in window
    ) {

        speechSynthesis.cancel();


        const testSpeech =
            new SpeechSynthesisUtterance("");


        testSpeech.lang =
            getBrowserLanguage();


        speechSynthesis.speak(
            testSpeech
        );


        voiceUnlocked = true;


        const status =
            document.getElementById(
                "voiceStatus"
            );


        if (status) {

            status.textContent =
                "✓ Voice enabled successfully.";

        }

    }

    else {

        alert(
            "Speech is not supported in this browser."
        );

    }

}


/* =========================================================
   VIBRATION
   ========================================================= */

function vibrateReminder() {

    if (!("vibrate" in navigator)) {

        console.log(
            "Vibration not supported on this device/browser."
        );

        return;

    }


    try {

        /*
           Strong vibration pattern.
           Works on supported mobile browsers.
        */

        navigator.vibrate([
            500,
            200,
            500
        ]);

    }

    catch (error) {

        console.log(
            "Vibration error:",
            error
        );

    }

}


/* =========================================================
   STOP VIBRATION
   ========================================================= */

function stopVibration() {

    if ("vibrate" in navigator) {

        try {

            navigator.vibrate(0);

        }

        catch (error) {

            console.log(error);

        }

    }

}


/* =========================================================
   STORAGE
   ========================================================= */

function getMedicineStorageKey() {

    const phone =
        patientPhone || "default";

    return "medicines_" + phone;

}


function loadMedicines() {

    try {

        const saved =
            localStorage.getItem(
                getMedicineStorageKey()
            );


        medicines =
            saved
                ? JSON.parse(saved)
                : [];


        if (!Array.isArray(medicines)) {

            medicines = [];

        }

    }

    catch (error) {

        console.log(
            "Medicine loading error:",
            error
        );

        medicines = [];

    }

}


function saveMedicines() {

    localStorage.setItem(

        getMedicineStorageKey(),

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


    patientName =
        nameInput.value.trim();


    patientPhone =
        phoneInput.value.trim();


    selectedLanguage =
        languageInput.value;


    if (!patientName) {

        alert(
            "Please enter patient name."
        );

        nameInput.focus();

        return;

    }


    if (!patientPhone) {

        alert(
            "Please enter patient phone number."
        );

        phoneInput.focus();

        return;

    }


    localStorage.setItem(
        "patientName",
        patientName
    );


    localStorage.setItem(
        "patientPhone",
        patientPhone
    );


    localStorage.setItem(
        "selectedLanguage",
        selectedLanguage
    );


    loadMedicines();

    loadCaregiver();

    applyLanguage();

    renderMedicines();

    updateDashboard();

    startReminderChecker();


    document.getElementById(
        "loginSection"
    ).style.display = "none";


    document.getElementById(
        "dashboard"
    ).style.display = "block";


    addLog(
        "Patient logged into MEDICARE."
    );

}


/* =========================================================
   LANGUAGE CHANGE
   ========================================================= */

function changeLanguage(language) {

    selectedLanguage =
        language || "en";


    localStorage.setItem(
        "selectedLanguage",
        selectedLanguage
    );


    const loginLanguage =
        document.getElementById(
            "languageSelect"
        );


    if (loginLanguage) {

        loginLanguage.value =
            selectedLanguage;

    }


    applyLanguage();

}


/* =========================================================
   APPLY LANGUAGE
   ========================================================= */

function applyLanguage() {

    const t =
        translations[getLanguage()]
        || translations.en;


    const welcome =
        document.getElementById(
            "welcomeText"
        );

    if (welcome) {
        welcome.textContent =
            t.welcome;
    }


    const aiStatus =
        document.getElementById(
            "aiStatus"
        );

    if (aiStatus) {
        aiStatus.textContent =
            t.aiStatus;
    }


    const addTitle =
        document.getElementById(
            "addMedicineTitle"
        );

    if (addTitle) {
        addTitle.textContent =
            t.addMedicine;
    }


    const medicinesTitle =
        document.getElementById(
            "myMedicinesTitle"
        );

    if (medicinesTitle) {
        medicinesTitle.textContent =
            t.myMedicines;
    }


    const nextTitle =
        document.getElementById(
            "nextReminderTitle"
        );

    if (nextTitle) {
        nextTitle.textContent =
            t.nextReminder;
    }


    const dashboardLanguage =
        document.getElementById(
            "dashboardLanguage"
        );

    if (dashboardLanguage) {

        dashboardLanguage.value =
            selectedLanguage;

    }

}


/* =========================================================
   ADD MEDICINE
   ========================================================= */

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


    const name =
        nameInput.value.trim();


    const dosage =
        dosageInput.value.trim();


    const time =
        timeInput.value;


    if (!name) {

        alert(
            "Please enter medicine name."
        );

        nameInput.focus();

        return;

    }


    if (!time) {

        alert(
            "Please select medicine time."
        );

        timeInput.focus();

        return;

    }


    const medicine = {

        id: Date.now(),

        name: name,

        dosage:
            dosage || "-",

        time: time,

        status: "pending",

        createdAt:
            new Date().toISOString(),

        takenAt: null,

        missedAt: null,

        lastTriggered: null

    };


    medicines.push(
        medicine
    );


    medicines.sort(
        (a, b) =>
            a.time.localeCompare(
                b.time
            )
    );


    saveMedicines();

    renderMedicines();

    updateDashboard();


    addLog(
        `${name} added for ${time}.`
    );


    nameInput.value = "";

    dosageInput.value = "";

    timeInput.value = "";

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


/* =========================================================
   RENDER MEDICINES
   ========================================================= */

function renderMedicines() {

    const container =
        document.getElementById(
            "medicineList"
        );


    if (!container) return;


    if (medicines.length === 0) {

        container.innerHTML =
            "<p>No medicines added yet.</p>";

        return;

    }


    container.innerHTML =
        medicines.map(
            medicine => {

                let statusClass =
                    "status-pending";

                let statusText =
                    "Pending";


                if (
                    medicine.status
                    === "taken"
                ) {

                    statusClass =
                        "status-taken";

                    statusText =
                        "Taken";

                }


                if (
                    medicine.status
                    === "missed"
                ) {

                    statusClass =
                        "status-missed";

                    statusText =
                        "Missed";

                }


                return `

                <div class="medicine-item">

                    <div class="medicine-info">

                        <div class="medicine-name">

                            💊
                            ${escapeHTML(
                                medicine.name
                            )}

                        </div>

                        <div class="medicine-details">

                            Dosage:
                            ${escapeHTML(
                                medicine.dosage
                            )}

                            &nbsp; | &nbsp;

                            Time:
                            ${escapeHTML(
                                medicine.time
                            )}

                        </div>

                        <span
                            class="status ${statusClass}"
                        >
                            ${statusText}
                        </span>

                    </div>


                    <div class="medicine-actions">

                        ${
                            medicine.status === "pending"

                            ?

                            `<button
                                class="take-btn"
                                onclick="markTaken(${medicine.id})"
                                aria-label="Mark ${escapeHTML(medicine.name)} as taken"
                            >
                                ✓ I Took It
                            </button>`

                            :

                            ""
                        }


                        <button
                            class="delete-btn"
                            onclick="deleteMedicine(${medicine.id})"
                            aria-label="Delete ${escapeHTML(medicine.name)}"
                        >
                            Delete
                        </button>

                    </div>

                </div>

                `;

            }
        ).join("");

}


/* =========================================================
   MARK TAKEN
   ========================================================= */

function markTaken(id) {

    const medicine =
        medicines.find(
            item =>
                item.id === id
        );


    if (!medicine) return;


    medicine.status =
        "taken";


    medicine.takenAt =
        new Date().toISOString();


    saveMedicines();

    renderMedicines();

    updateDashboard();


    addLog(
        `${medicine.name} marked as taken.`
    );


    if (
        activeReminder === id
    ) {

        activeReminder = null;

    }


    closeReminderPopup();


    try {

        speechSynthesis.cancel();

    }

    catch (error) {

        console.log(error);

    }


    if (medicareAudio) {

        try {

            medicareAudio.pause();

            medicareAudio.currentTime = 0;

        }

        catch (error) {

            console.log(error);

        }

    }


    stopVibration();

}


/* =========================================================
   DELETE MEDICINE
   ========================================================= */

function deleteMedicine(id) {

    const medicine =
        medicines.find(
            item =>
                item.id === id
        );


    if (!medicine) return;


    const confirmed =
        confirm(
            `Delete ${medicine.name}?`
        );


    if (!confirmed) return;


    medicines =
        medicines.filter(
            item =>
                item.id !== id
        );


    saveMedicines();

    renderMedicines();

    updateDashboard();


    addLog(
        `${medicine.name} deleted.`
    );

}


/* =========================================================
   DASHBOARD
   ========================================================= */

function updateDashboard() {

    const total =
        medicines.length;


    const taken =
        medicines.filter(
            m =>
                m.status === "taken"
        ).length;


    const missed =
        medicines.filter(
            m =>
                m.status === "missed"
        ).length;


    const adherence =
        total === 0
            ? 0
            : Math.round(
                (taken / total) * 100
            );


    const totalElement =
        document.getElementById(
            "totalMedicines"
        );

    if (totalElement) {
        totalElement.textContent =
            total;
    }


    const takenElement =
        document.getElementById(
            "takenMedicines"
        );

    if (takenElement) {
        takenElement.textContent =
            taken;
    }


    const missedElement =
        document.getElementById(
            "missedMedicines"
        );

    if (missedElement) {
        missedElement.textContent =
            missed;
    }


    const adherenceElement =
        document.getElementById(
            "adherence"
        );

    if (adherenceElement) {
        adherenceElement.textContent =
            `${adherence}%`;
    }


    updateNextReminder();

}


/* =========================================================
   NEXT REMINDER
   ========================================================= */

function updateNextReminder() {

    const element =
        document.getElementById(
            "nextReminder"
        );


    if (!element) return;


    const pending =
        medicines
            .filter(
                m =>
                    m.status === "pending"
            )
            .sort(
                (a, b) =>
                    a.time.localeCompare(
                        b.time
                    )
            );


    if (pending.length === 0) {

        element.textContent =
            "No reminder";

        return;

    }


    element.textContent =
        `${pending[0].name} - ${pending[0].time}`;

}


/* =========================================================
   REMINDER CHECKER
   ========================================================= */

function startReminderChecker() {

    if (reminderLoop) {

        clearInterval(
            reminderLoop
        );

    }


    checkMedicationReminder();


    reminderLoop =
        setInterval(
            checkMedicationReminder,
            1000
        );

}


/* =========================================================
   CHECK MEDICATION REMINDER
   ========================================================= */

function checkMedicationReminder() {

    const now =
        new Date();


    const hours =
        String(
            now.getHours()
        ).padStart(2, "0");


    const minutes =
        String(
            now.getMinutes()
        ).padStart(2, "0");


    const currentTime =
        `${hours}:${minutes}`;


    const today =
        now.toDateString();


    medicines.forEach(
        medicine => {

            if (
                medicine.status !==
                "pending"
            ) {

                return;

            }


            if (
                medicine.time !==
                currentTime
            ) {

                return;

            }


            if (
                medicine.lastTriggered ===
                today
            ) {

                return;

            }


            medicine.lastTriggered =
                today;


            saveMedicines();


            triggerReminder(
                medicine
            );

        }
    );

}


/* =========================================================
   MAIN 1-MINUTE REMINDER
   ========================================================= */

function triggerReminder(medicine) {

    activeReminder =
        medicine.id;


    const medicineName =
        String(
            medicine.name || ""
        ).trim();


    if (!medicineName) {
        return;
    }


    const message =
        buildReminderMessage(
            medicineName
        );


    /*
       SHOW VISUAL ALERT
    */

    showVisualReminder(
        medicine
    );


    /*
       VOICE ALERT
    */

    speakRegionalVoice(
        message
    );


    /*
       VIBRATION
    */

    vibrateReminder();


    /*
       REPEAT EVERY 10 SECONDS
    */

    const voiceInterval =
        setInterval(() => {

            const currentMedicine =
                medicines.find(
                    m =>
                        m.id ===
                        medicine.id
                );


            /*
               If user has taken medicine,
               stop everything.
            */

            if (
                !currentMedicine ||
                currentMedicine.status !==
                "pending"
            ) {

                clearInterval(
                    voiceInterval
                );

                stopVibration();

                return;

            }


            /*
               Repeat voice
            */

            speakRegionalVoice(
                message
            );


            /*
               Repeat vibration
            */

            vibrateReminder();


        }, 10000);


    /*
       AFTER 60 SECONDS
    */

    setTimeout(() => {

        clearInterval(
            voiceInterval
        );


        stopVibration();


        const currentMedicine =
            medicines.find(
                m =>
                    m.id ===
                    medicine.id
            );


        /*
           User already took medicine.
        */

        if (
            !currentMedicine ||
            currentMedicine.status !==
            "pending"
        ) {

            return;

        }


        /*
           MARK MISSED
        */

        currentMedicine.status =
            "missed";


        currentMedicine.missedAt =
            new Date().toISOString();


        saveMedicines();

        renderMedicines();

        updateDashboard();


        /*
           MISSED VOICE
        */

        speakMissedReminder(
            currentMedicine
        );


        /*
           CAREGIVER SMS
        */

        sendCaregiverSMS(
            currentMedicine
        );


        /*
           ACTIVITY LOG
        */

        addLog(
            `${currentMedicine.name} was missed after 1 minute.`
        );


        /*
           CLOSE POPUP
        */

        closeReminderPopup();


        if (
            activeReminder ===
            medicine.id
        ) {

            activeReminder = null;

        }

    }, 60000);

}


/* =========================================================
   SHOW VISUAL REMINDER
   ========================================================= */

function showVisualReminder(
    medicine
) {

    const popup =
        document.getElementById(
            "reminderPopup"
        );


    const name =
        document.getElementById(
            "popupMedicineName"
        );


    const text =
        document.getElementById(
            "popupReminderText"
        );


    if (!popup) return;


    if (name) {

        name.textContent =
            medicine.name;

    }


    if (text) {

        text.textContent =
            buildReminderMessage(
                medicine.name
            );

    }


    popup.style.display =
        "flex";


    /*
       Accessibility:
       move keyboard focus to
       the action button.
    */

    const button =
        document.getElementById(
            "popupTakeButton"
        );


    if (button) {

        setTimeout(() => {

            button.focus();

        }, 100);

    }

}


/* =========================================================
   CLOSE POPUP
   ========================================================= */

function closeReminderPopup() {

    const popup =
        document.getElementById(
            "reminderPopup"
        );


    if (popup) {

        popup.style.display =
            "none";

    }

}


/* =========================================================
   POPUP TAKE BUTTON
   ========================================================= */

function markTakenFromPopup() {

    if (
        activeReminder === null
    ) {

        return;

    }


    markTaken(
        activeReminder
    );

}


/* =========================================================
   MISSED REMINDER VOICE
   ========================================================= */

function speakMissedReminder(
    medicine
) {

    const lang =
        getLanguage();


    const name =
        medicine.name;


    let message = "";


    if (lang === "ta") {

        message =
            `${name} மருந்து எடுத்துக்கொள்ளப்படவில்லை.`;

    }

    else if (lang === "hi") {

        message =
            `${name} दवा नहीं ली गई है।`;

    }

    else if (lang === "te") {

        message =
            `${name} మందు తీసుకోలేదు.`;

    }

    else {

        message =
            `${name} medicine was not taken.`;

    }


    speakRegionalVoice(
        message
    );

}


/* =========================================================
   CAREGIVER STORAGE
   ========================================================= */

function getCaregiverKey() {

    return (
        "caregiver_" +
        (
            patientPhone ||
            "default"
        )
    );

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
        input.value.trim();


    if (!phone) {

        alert(
            "Please enter caregiver phone number."
        );

        return;

    }


    localStorage.setItem(
        getCaregiverKey(),
        phone
    );


    addLog(
        "Caregiver number saved."
    );


    alert(
        "Caregiver number saved successfully."
    );

}


/* =========================================================
   LOAD CAREGIVER
   ========================================================= */

function loadCaregiver() {

    const input =
        document.getElementById(
            "caregiverPhone"
        );


    if (!input) return;


    const saved =
        localStorage.getItem(
            getCaregiverKey()
        );


    if (saved) {

        input.value =
            saved;

    }

}


/* =========================================================
   SEND CAREGIVER SMS
   ========================================================= */

function sendCaregiverSMS(
    medicine
) {

    const caregiver =
        localStorage.getItem(
            getCaregiverKey()
        );


    if (!caregiver) {

        console.log(
            "No caregiver number saved."
        );

        return;

    }


    const message =
        `${patientName || "Patient"} missed ${medicine.name}.`;


    const smsURL =
        "sms:" +
        caregiver +
        "?body=" +
        encodeURIComponent(
            message
        );


    /*
       Open SMS application.
       The user may need to press Send
       depending on the device/browser.
    */

    window.location.href =
        smsURL;

}


/* =========================================================
   CALL CAREGIVER
   ========================================================= */

function callCaregiver() {

    const caregiver =
        localStorage.getItem(
            getCaregiverKey()
        );


    if (!caregiver) {

        alert(
            "Please save caregiver number first."
        );

        return;

    }


    window.location.href =
        "tel:" +
        caregiver;

}


/* =========================================================
   EMERGENCY
   ========================================================= */

function callAmbulance() {

    const confirmed =
        confirm(
            "Call emergency services?"
        );


    if (!confirmed) return;


    window.location.href =
        "tel:108";

}


/* =========================================================
   ACTIVITY LOG
   ========================================================= */

function addLog(message) {

    const log =
        document.getElementById(
            "activityLog"
        );


    if (!log) return;


    const item =
        document.createElement(
            "li"
        );


    const time =
        new Date().toLocaleString();


    item.textContent =
        `${time} - ${message}`;


    log.prepend(item);


    /*
       Keep last 20 entries
    */

    while (
        log.children.length > 20
    ) {

        log.removeChild(
            log.lastChild
        );

    }

}


/* =========================================================
   MEDICATION REPORT
   ========================================================= */

function generateMedicationReport() {

    const total =
        medicines.length;


    const taken =
        medicines.filter(
            m =>
                m.status === "taken"
        ).length;


    const missed =
        medicines.filter(
            m =>
                m.status === "missed"
        ).length;


    const adherence =
        total === 0
            ? 0
            : Math.round(
                (taken / total) * 100
            );


    const reportWindow =
        window.open(
            "",
            "_blank"
        );


    if (!reportWindow) {

        alert(
            "Please allow pop-ups to generate the report."
        );

        return;

    }


    const rows =
        medicines.map(
            medicine => {

                return `

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
                        ${escapeHTML(
                            medicine.time
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            medicine.status
                        )}
                    </td>

                    <td>
                        ${
                            medicine.takenAt
                            ? new Date(
                                medicine.takenAt
                              ).toLocaleString()
                            : "-"
                        }
                    </td>

                </tr>

                `;

            }
        ).join("");


    reportWindow.document.write(`

        <!DOCTYPE html>

        <html>

        <head>

            <title>
                MEDICARE Medication Report
            </title>

            <style>

                body {
                    font-family: Arial;
                    padding: 30px;
                }

                h1 {
                    color: #15803d;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }

                th,
                td {
                    border: 1px solid #999;
                    padding: 10px;
                    text-align: left;
                }

                th {
                    background: #dcfce7;
                }

                .summary {
                    margin-top: 20px;
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
                ${escapeHTML(
                    patientName
                )}
            </p>

            <p>
                Phone:
                ${escapeHTML(
                    patientPhone
                )}
            </p>

            <div class="summary">

                <p>
                    Total Medicines:
                    ${total}
                </p>

                <p>
                    Taken:
                    ${taken}
                </p>

                <p>
                    Missed:
                    ${missed}
                </p>

                <p>
                    Adherence:
                    ${adherence}%
                </p>

            </div>


            <table>

                <thead>

                    <tr>

                        <th>
                            Medicine
                        </th>

                        <th>
                            Dosage
                        </th>

                        <th>
                            Time
                        </th>

                        <th>
                            Status
                        </th>

                        <th>
                            Taken At
                        </th>

                    </tr>

                </thead>


                <tbody>

                    ${rows}

                </tbody>

            </table>


            <script>

                window.onload = function() {

                    window.print();

                };

            <\/script>

        </body>

        </html>

    `);


    reportWindow.document.close();

}


/* =========================================================
   LOGOUT
   ========================================================= */

function logout() {

    if (reminderLoop) {

        clearInterval(
            reminderLoop
        );

        reminderLoop = null;

    }


    try {

        speechSynthesis.cancel();

    }

    catch (error) {

        console.log(error);

    }


    if (medicareAudio) {

        try {

            medicareAudio.pause();

            medicareAudio.currentTime = 0;

        }

        catch (error) {

            console.log(error);

        }

    }


    stopVibration();


    closeReminderPopup();


    document.getElementById(
        "dashboard"
    ).style.display = "none";


    document.getElementById(
        "loginSection"
    ).style.display = "flex";


    activeReminder = null;

}


/* =========================================================
   INITIAL LOAD
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        /*
           Load saved patient details
        */

        patientName =
            localStorage.getItem(
                "patientName"
            ) || "";


        patientPhone =
            localStorage.getItem(
                "patientPhone"
            ) || "";


        selectedLanguage =
            localStorage.getItem(
                "selectedLanguage"
            ) || "en";


        /*
           Put values into login fields
        */

        const nameInput =
            document.getElementById(
                "patientName"
            );


        if (nameInput) {

            nameInput.value =
                patientName;

        }


        const phoneInput =
            document.getElementById(
                "patientPhone"
            );


        if (phoneInput) {

            phoneInput.value =
                patientPhone;

        }


        const languageInput =
            document.getElementById(
                "languageSelect"
            );


        if (languageInput) {

            languageInput.value =
                selectedLanguage;

        }


        applyLanguage();


        /*
           If user was already logged in,
           open dashboard automatically.
        */

        if (
            patientName &&
            patientPhone
        ) {

            loadMedicines();

            loadCaregiver();

            renderMedicines();

            updateDashboard();

            document.getElementById(
                "loginSection"
            ).style.display = "none";


            document.getElementById(
                "dashboard"
            ).style.display = "block";


            startReminderChecker();

        }

    }
);
