/* =========================================================
   JS MEDICARE
   COMPLETE CORRECTED SCRIPT.JS
   VOICE MEDICINE ENTRY + "I TOOK IT"
   ========================================================= */


/* =========================================================
   GLOBAL VARIABLES
   ========================================================= */

let medicines = [];

let activeReminder = null;

let reminderCheckerTimer = null;

let reminderVoiceTimer = null;

let reminderMissTimer = null;

let patientName = "";

let patientPhone = "";

let selectedLanguage = "en";

let medicareAudio = null;

let voiceUnlocked = false;


/* =========================================================
   MEDICINE VOICE ENTRY
   ========================================================= */

let voiceRecognition = null;

let voiceEntryActive = false;

let voiceStep = null;

let voiceStarting = false;


/* =========================================================
   "I TOOK IT" VOICE RECOGNITION
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
   LANGUAGE
   ========================================================= */

function getLanguage() {

    return selectedLanguage || "en";

}


function getBrowserLanguage() {

    const lang = getLanguage();

    if (lang === "ta") return "ta-IN";

    if (lang === "hi") return "hi-IN";

    if (lang === "te") return "te-IN";

    return "en-IN";

}


function getVoiceLanguageCode() {

    const lang = getLanguage();

    if (lang === "ta") return "ta";

    if (lang === "hi") return "hi";

    if (lang === "te") return "te";

    return "en";

}


/* =========================================================
   REMINDER MESSAGE
   ========================================================= */

function buildReminderMessage(medicineName) {

    const name =
        String(medicineName || "").trim();

    if (!name) {
        return "";
    }

    const lang = getLanguage();

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
   VOICE ENTRY PROMPTS
   ========================================================= */

function getVoicePrompt(step) {

    const lang = getLanguage();

    if (lang === "ta") {

        if (step === "name") {
            return "மருந்தின் பெயரை சொல்லுங்கள்.";
        }

        if (step === "dosage") {
            return "இப்போது மருந்தின் அளவை சொல்லுங்கள்.";
        }

        if (step === "time") {
            return "இப்போது மருந்து எப்போது எடுக்க வேண்டும் என்பதை சொல்லுங்கள்.";
        }

    }


    if (lang === "hi") {

        if (step === "name") {
            return "कृपया दवा का नाम बोलें।";
        }

        if (step === "dosage") {
            return "अब दवा की खुराक बोलें।";
        }

        if (step === "time") {
            return "अब दवा लेने का समय बोलें।";
        }

    }


    if (lang === "te") {

        if (step === "name") {
            return "దయచేసి మందు పేరు చెప్పండి.";
        }

        if (step === "dosage") {
            return "ఇప్పుడు మందు మోతాదు చెప్పండి.";
        }

        if (step === "time") {
            return "ఇప్పుడు మందు తీసుకునే సమయం చెప్పండి.";
        }

    }


    if (step === "name") {
        return "Please say the medicine name.";
    }

    if (step === "dosage") {
        return "Now please say the dosage.";
    }

    if (step === "time") {
        return "Now please say the medicine time.";
    }

    return "";

}


/* =========================================================
   VOICE ENTRY SUCCESS MESSAGE
   ========================================================= */

function getVoiceCompleteMessage() {

    const lang = getLanguage();

    if (lang === "ta") {
        return "மருந்து விவரங்கள் வெற்றிகரமாக உள்ளிடப்பட்டுள்ளன.";
    }

    if (lang === "hi") {
        return "दवा की जानकारी सफलतापूर्वक दर्ज हो गई है।";
    }

    if (lang === "te") {
        return "మందు వివరాలు విజయవంతంగా నమోదు చేయబడ్డాయి.";
    }

    return "Medicine details have been entered successfully.";

}


/* =========================================================
   BROWSER SPEECH
   ========================================================= */

function speakBrowserVoice(text, language, callback) {

    if (!text) {

        if (callback) {
            callback();
        }

        return;

    }


    if (!("speechSynthesis" in window)) {

        if (callback) {
            callback();
        }

        return;

    }


    try {

        speechSynthesis.cancel();

        speechSynthesis.resume();


        const utterance =
            new SpeechSynthesisUtterance(text);


        utterance.lang =
            language || getBrowserLanguage();


        utterance.rate = 0.82;

        utterance.pitch = 1;

        utterance.volume = 1;


        utterance.onend = function() {

            if (callback) {
                callback();
            }

        };


        utterance.onerror = function() {

            if (callback) {
                callback();
            }

        };


        speechSynthesis.speak(
            utterance
        );

    }

    catch (error) {

        console.log(
            "Speech error:",
            error
        );

        if (callback) {
            callback();
        }

    }

}


/* =========================================================
   REGIONAL VOICE
   ========================================================= */

function speakRegionalVoice(text, callback) {

    if (!text) {

        if (callback) {
            callback();
        }

        return;

    }


    const language =
        getVoiceLanguageCode();


    /*
       Always use browser speech for
       medicine-entry prompts.

       This is important because the
       next listening step must wait
       until speech finishes.
    */

    if (
        language === "en"
    ) {

        speakBrowserVoice(
            text,
            "en-IN",
            callback
        );

        return;

    }


    /*
       Try browser regional voice first.
    */

    speakBrowserVoice(
        text,
        getBrowserLanguage(),
        callback
    );

}


/* =========================================================
   ENABLE VOICE
   ========================================================= */

function enableMobileVoice() {

    if (
        !("speechSynthesis" in window)
    ) {

        alert(
            "Speech is not supported in this browser."
        );

        return;

    }


    voiceUnlocked = true;


    try {

        speechSynthesis.cancel();

        speechSynthesis.resume();

        const utterance =
            new SpeechSynthesisUtterance("");


        utterance.volume = 0;

        speechSynthesis.speak(
            utterance
        );

    }

    catch (error) {

        console.log(error);

    }


    const status =
        document.getElementById(
            "voiceStatus"
        );


    if (status) {

        status.textContent =
            "✓ Voice enabled successfully.";

    }

}


/* =========================================================
   VIBRATION
   ========================================================= */

function startContinuousVibration() {

    stopVibration();


    if (
        !("vibrate" in navigator)
    ) {

        console.log(
            "Vibration API not available on this device."
        );

        return;

    }


    function vibrateNow() {

        try {

            navigator.vibrate([
                500,
                150,
                500,
                150,
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


    vibrateNow();


    vibrationTimer =
        setInterval(
            function() {

                if (
                    activeReminder === null
                ) {

                    stopVibration();

                    return;

                }


                const medicine =
                    medicines.find(
                        m =>
                            m.id ===
                            activeReminder
                    );


                if (
                    !medicine ||
                    medicine.status !==
                    "pending"
                ) {

                    stopVibration();

                    return;

                }


                vibrateNow();

            },
            2000
        );

}


function stopVibration() {

    if (vibrationTimer) {

        clearInterval(
            vibrationTimer
        );

        vibrationTimer =
            null;

    }


    if (
        "vibrate" in navigator
    ) {

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

    return (
        "medicines_" +
        (
            patientPhone ||
            "default"
        )
    );

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


        if (
            !Array.isArray(medicines)
        ) {

            medicines = [];

        }

    }

    catch (error) {

        console.log(error);

        medicines = [];

    }

}


function saveMedicines() {

    localStorage.setItem(

        getMedicineStorageKey(),

        JSON.stringify(
            medicines
        )

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
    ).style.display =
        "none";


    document.getElementById(
        "dashboard"
    ).style.display =
        "block";


    addLog(
        "Patient logged into MEDICARE."
    );

}


/* =========================================================
   CHANGE LANGUAGE
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
        translations[
            getLanguage()
        ] ||
        translations.en;


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


    if (!container) {
        return;
    }


    if (
        medicines.length === 0
    ) {

        container.innerHTML =
            "<p>No medicines added yet.</p>";

        return;

    }


    const sorted =
        [...medicines].sort(
            (a, b) =>
                a.time.localeCompare(
                    b.time
                )
        );


    container.innerHTML =
        sorted.map(
            medicine => {

                let statusClass =
                    "status-pending";


                let statusText =
                    "Pending";


                if (
                    medicine.status ===
                    "taken"
                ) {

                    statusClass =
                        "status-taken";

                    statusText =
                        "Taken";

                }


                if (
                    medicine.status ===
                    "missed"
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
                                medicine.status ===
                                "pending"

                                ?

                                `
                                <button
                                    class="take-btn"
                                    onclick="markTaken(${medicine.id})"
                                >
                                    ✓ I Took It
                                </button>
                                `

                                :

                                ""
                            }

                            <button
                                class="delete-btn"
                                onclick="deleteMedicine(${medicine.id})"
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


    if (!medicine) {
        return;
    }


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

        clearReminderTimers();

        stopTakenVoiceRecognition();

        stopVibration();

        activeReminder =
            null;

        closeReminderPopup();

        stopAllSpeech();

    }

}


/* =========================================================
   CLEAR REMINDER TIMERS
   ========================================================= */

function clearReminderTimers() {

    if (reminderVoiceTimer) {

        clearInterval(
            reminderVoiceTimer
        );

        reminderVoiceTimer =
            null;

    }


    if (reminderMissTimer) {

        clearTimeout(
            reminderMissTimer
        );

        reminderMissTimer =
            null;

    }

}


/* =========================================================
   STOP ALL SPEECH
   ========================================================= */

function stopAllSpeech() {

    try {

        if (
            "speechSynthesis" in window
        ) {

            speechSynthesis.cancel();

        }

    }

    catch (error) {

        console.log(error);

    }


    if (medicareAudio) {

        try {

            medicareAudio.pause();

            medicareAudio.currentTime =
                0;

        }

        catch (error) {

            console.log(error);

        }

    }

}


/* =========================================================
   DELETE
   ========================================================= */

function deleteMedicine(id) {

    const medicine =
        medicines.find(
            item =>
                item.id === id
        );


    if (!medicine) {
        return;
    }


    if (
        !confirm(
            `Delete ${medicine.name}?`
        )
    ) {

        return;

    }


    if (
        activeReminder === id
    ) {

        clearReminderTimers();

        stopTakenVoiceRecognition();

        stopVibration();

        stopAllSpeech();

        activeReminder =
            null;

        closeReminderPopup();

    }


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


    if (!element) {
        return;
    }


    const pending =
        medicines
            .filter(
                m =>
                    m.status ===
                    "pending"
            )
            .sort(
                (a, b) =>
                    a.time.localeCompare(
                        b.time
                    )
            );


    if (
        pending.length === 0
    ) {

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

    if (reminderCheckerTimer) {

        clearInterval(
            reminderCheckerTimer
        );

    }


    checkMedicationReminder();


    reminderCheckerTimer =
        setInterval(
            checkMedicationReminder,
            1000
        );

}


function checkMedicationReminder() {

    if (
        activeReminder !== null
    ) {

        return;

    }


    const now =
        new Date();


    const currentTime =
        String(
            now.getHours()
        ).padStart(2, "0")
        +
        ":"
        +
        String(
            now.getMinutes()
        ).padStart(2, "0");


    const today =
        now.toDateString();


    for (
        const medicine
        of medicines
    ) {

        if (
            medicine.status !==
            "pending"
        ) {

            continue;

        }


        if (
            medicine.time !==
            currentTime
        ) {

            continue;

        }


        if (
            medicine.lastTriggered ===
            today
        ) {

            continue;

        }


        medicine.lastTriggered =
            today;


        saveMedicines();


        triggerReminder(
            medicine
        );


        break;

    }

}


/* =========================================================
   TRIGGER REMINDER
   ========================================================= */

function triggerReminder(medicine) {

    if (!medicine) {
        return;
    }


    if (
        activeReminder !== null
    ) {

        return;

    }


    activeReminder =
        medicine.id;


    showVisualReminder(
        medicine
    );


    const message =
        buildReminderMessage(
            medicine.name
        );


    /*
       FIRST VOICE
    */

    speakRegionalVoice(
        message
    );


    /*
       VIBRATION
    */

    startContinuousVibration();


    /*
       LISTEN FOR "I TOOK IT"
    */

    startTakenVoiceRecognition();


    /*
       REPEAT VOICE EVERY 10 SECONDS
    */

    reminderVoiceTimer =
        setInterval(
            function() {

                if (
                    activeReminder !==
                    medicine.id
                ) {

                    return;

                }


                const current =
                    medicines.find(
                        m =>
                            m.id ===
                            medicine.id
                    );


                if (
                    !current ||
                    current.status !==
                    "pending"
                ) {

                    return;

                }


                speakRegionalVoice(
                    buildReminderMessage(
                        current.name
                    )
                );

            },
            10000
        );


    /*
       AFTER 60 SECONDS
    */

    reminderMissTimer =
        setTimeout(
            function() {

                if (
                    activeReminder !==
                    medicine.id
                ) {

                    return;

                }


                const current =
                    medicines.find(
                        m =>
                            m.id ===
                            medicine.id
                    );


                if (
                    !current ||
                    current.status !==
                    "pending"
                ) {

                    return;

                }


                clearReminderTimers();

                stopTakenVoiceRecognition();

                stopVibration();


                current.status =
                    "missed";


                current.missedAt =
                    new Date().toISOString();


                saveMedicines();

                renderMedicines();

                updateDashboard();


                speakMissedReminder(
                    current
                );


                sendCaregiverSMS(
                    current
                );


                addLog(
                    `${current.name} was missed after 1 minute.`
                );


                closeReminderPopup();


                activeReminder =
                    null;

            },
            60000
        );

}


/* =========================================================
   SHOW REMINDER POPUP
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


    if (!popup) {
        return;
    }


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


    const button =
        document.getElementById(
            "popupTakeButton"
        );


    if (button) {

        button.focus();

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
   POPUP BUTTON
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
   MISSED VOICE
   ========================================================= */

function speakMissedReminder(
    medicine
) {

    const name =
        medicine.name;


    const lang =
        getLanguage();


    let message;


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
   =========================================================
   VOICE MEDICINE ENTRY
   =========================================================
   ========================================================= */


/*
   MAIN BUTTON
*/

function startVoiceMedicineEntry() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        alert(
            "Voice input is not supported in this browser. Please use Google Chrome."
        );

        return;

    }


    if (voiceEntryActive) {

        stopVoiceMedicineEntry();

        return;

    }


    /*
       Clear old fields
    */

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


    if (nameInput) {
        nameInput.value = "";
    }


    if (dosageInput) {
        dosageInput.value = "";
    }


    if (timeInput) {
        timeInput.value = "";
    }


    voiceEntryActive =
        true;


    voiceStep =
        "name";


    updateVoiceStep(
        "name"
    );


    updateVoiceEntryStatus(
        "🎤 Starting voice entry..."
    );


    /*
       Speak first prompt.

       IMPORTANT:
       Recognition starts only
       AFTER prompt finishes.
    */

    speakRegionalVoice(
        getVoicePrompt("name"),
        function() {

            if (!voiceEntryActive) {
                return;
            }


            startVoiceStepRecognition();

        }
    );

}


/* =========================================================
   START ONE VOICE STEP
   ========================================================= */

function startVoiceStepRecognition() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {
        return;
    }


    if (!voiceEntryActive) {
        return;
    }


    if (!voiceStep) {
        return;
    }


    /*
       Prevent duplicate start
    */

    if (voiceStarting) {
        return;
    }


    voiceStarting =
        true;


    /*
       Stop old recognition
    */

    if (voiceRecognition) {

        try {

            voiceRecognition.onend =
                null;

            voiceRecognition.onerror =
                null;

            voiceRecognition.onresult =
                null;

            voiceRecognition.stop();

        }

        catch (error) {

            console.log(error);

        }

    }


    voiceRecognition =
        new SpeechRecognition();


    const currentStep =
        voiceStep;


    voiceRecognition.lang =
        getBrowserLanguage();


    voiceRecognition.continuous =
        false;


    voiceRecognition.interimResults =
        false;


    voiceRecognition.maxAlternatives =
        1;


    voiceRecognition.onstart =
        function() {

            voiceStarting =
                false;


            updateVoiceEntryStatus(

                currentStep === "name"

                    ? "🎤 Listening for medicine name..."

                    : currentStep === "dosage"

                    ? "🎤 Listening for dosage..."

                    : "🎤 Listening for medicine time..."

            );

        };


    voiceRecognition.onresult =
        function(event) {

            const transcript =
                event.results[0][0]
                    .transcript
                    .trim();


            console.log(
                "Voice step:",
                currentStep,
                "Transcript:",
                transcript
            );


            /*
               Stop this recognition
               before moving to next step.
            */

            try {

                voiceRecognition.stop();

            }

            catch (error) {

                console.log(error);

            }


            processVoiceStep(
                currentStep,
                transcript
            );

        };


    voiceRecognition.onerror =
        function(event) {

            voiceStarting =
                false;


            console.log(
                "Voice entry error:",
                event.error
            );


            if (
                !voiceEntryActive
            ) {

                return;

            }


            /*
               Ignore normal no-speech
               and restart this step.
            */

            if (
                event.error ===
                "no-speech"
            ) {

                updateVoiceEntryStatus(
                    "🎤 I didn't hear anything. Please speak again..."
                );


                setTimeout(
                    function() {

                        if (
                            voiceEntryActive &&
                            voiceStep ===
                            currentStep
                        ) {

                            startVoiceStepRecognition();

                        }

                    },
                    800
                );


                return;

            }


            if (
                event.error ===
                "aborted"
            ) {

                return;

            }


            updateVoiceEntryStatus(
                "❌ Microphone error. Please try again."
            );

        };


    voiceRecognition.onend =
        function() {

            voiceStarting =
                false;


            /*
               Do NOT automatically
               jump to another step here.

               processVoiceStep()
               controls the next step.
            */

        };


    try {

        voiceRecognition.start();

    }

    catch (error) {

        voiceStarting =
            false;

        console.log(
            "Recognition start error:",
            error
        );


        setTimeout(
            function() {

                if (
                    voiceEntryActive &&
                    voiceStep ===
                    currentStep
                ) {

                    startVoiceStepRecognition();

                }

            },
            800
        );

    }

}


/* =========================================================
   PROCESS ONE VOICE STEP
   ========================================================= */

function processVoiceStep(
    step,
    text
) {

    if (!text) {

        startVoiceStepRecognition();

        return;

    }


    /*
       MEDICINE NAME
    */

    if (
        step === "name"
    ) {

        const nameInput =
            document.getElementById(
                "medicineName"
            );


        if (nameInput) {

            nameInput.value =
                text;

        }


        updateVoiceEntryStatus(
            "✓ Medicine name: " +
            text
        );


        /*
           Move to dosage
        */

        voiceStep =
            "dosage";


        updateVoiceStep(
            "dosage"
        );


        /*
           Wait for previous
           recognition to finish.
        */

        setTimeout(
            function() {

                if (
                    !voiceEntryActive
                ) {
                    return;
                }


                speakRegionalVoice(
                    getVoicePrompt(
                        "dosage"
                    ),
                    function() {

                        if (
                            voiceEntryActive &&
                            voiceStep ===
                            "dosage"
                        ) {

                            startVoiceStepRecognition();

                        }

                    }
                );

            },
            500
        );


        return;

    }


    /*
       DOSAGE
    */

    if (
        step === "dosage"
    ) {

        const dosage =
            extractDosage(text);


        const dosageInput =
            document.getElementById(
                "dosage"
            );


        if (dosageInput) {

            dosageInput.value =
                dosage;

        }


        updateVoiceEntryStatus(
            "✓ Dosage: " +
            dosage
        );


        /*
           Move to time
        */

        voiceStep =
            "time";


        updateVoiceStep(
            "time"
        );


        setTimeout(
            function() {

                if (
                    !voiceEntryActive
                ) {
                    return;
                }


                speakRegionalVoice(
                    getVoicePrompt(
                        "time"
                    ),
                    function() {

                        if (
                            voiceEntryActive &&
                            voiceStep ===
                            "time"
                        ) {

                            startVoiceStepRecognition();

                        }

                    }
                );

            },
            500
        );


        return;

    }


    /*
       TIME
    */

    if (
        step === "time"
    ) {

        const time =
            convertSpokenTime(
                text
            );


        if (!time) {

            updateVoiceEntryStatus(
                "❌ I could not understand the time. Please say something like 8 PM or 8:30 AM."
            );


            speakRegionalVoice(
                getTimeRetryMessage(),
                function() {

                    if (
                        voiceEntryActive &&
                        voiceStep ===
                        "time"
                    ) {

                        startVoiceStepRecognition();

                    }

                }
            );


            return;

        }


        const timeInput =
            document.getElementById(
                "medicineTime"
            );


        if (timeInput) {

            timeInput.value =
                time;

        }


        updateVoiceEntryStatus(
            "✓ Time: " +
            time
        );


        /*
           COMPLETE
        */

        voiceEntryActive =
            false;


        voiceStep =
            null;


        updateVoiceStep(
            "complete"
        );


        if (voiceRecognition) {

            try {

                voiceRecognition.stop();

            }

            catch (error) {

                console.log(error);

            }

        }


        updateVoiceEntryStatus(
            `✓ Medicine details entered successfully: ${getFieldValue("medicineName")} | ${getFieldValue("dosage")} | ${time}`
        );


        speakRegionalVoice(
            getVoiceCompleteMessage()
        );


        return;

    }

}


/* =========================================================
   GET FIELD VALUE
   ========================================================= */

function getFieldValue(id) {

    const element =
        document.getElementById(
            id
        );


    return element
        ? element.value.trim()
        : "";

}


/* =========================================================
   DOSAGE EXTRACTION
   ========================================================= */

function extractDosage(text) {

    const clean =
        text.trim();


    /*
       Examples:

       500 mg
       5 ml
       10 mg
       1 tablet
       2 tablets
       1 capsule
    */

    const match =
        clean.match(

            /\b(\d+(?:\.\d+)?)\s*(mg|g|mcg|ml|mls|tablet|tablets|capsule|capsules)\b/i

        );


    if (match) {

        return (
            match[1] +
            " " +
            match[2]
        );

    }


    /*
       If recognition gives only a number,
       preserve it.
    */

    const numberOnly =
        clean.match(
            /^\d+(?:\.\d+)?$/
        );


    if (numberOnly) {

        return numberOnly[0];

    }


    /*
       Otherwise preserve what
       the user actually said.
    */

    return clean;

}


/* =========================================================
   TIME RETRY MESSAGE
   ========================================================= */

function getTimeRetryMessage() {

    const lang =
        getLanguage();


    if (lang === "ta") {

        return "நேரத்தை மீண்டும் சொல்லுங்கள். உதாரணமாக, 8 PM என்று சொல்லலாம்.";

    }


    if (lang === "hi") {

        return "समय फिर से बोलें। उदाहरण के लिए 8 PM बोल सकते हैं।";

    }


    if (lang === "te") {

        return "సమయాన్ని మళ్లీ చెప్పండి. ఉదాహరణకు 8 PM అని చెప్పవచ్చు.";

    }


    return "Please say the time again, for example 8 PM.";

}


/* =========================================================
   CONVERT SPOKEN TIME
   ========================================================= */

function convertSpokenTime(text) {

    if (!text) {
        return null;
    }


    let value =
        text
            .toLowerCase()
            .trim();


    /*
       Convert spoken number words
    */

    const numberWords = {

        "one": 1,
        "two": 2,
        "three": 3,
        "four": 4,
        "five": 5,
        "six": 6,
        "seven": 7,
        "eight": 8,
        "nine": 9,
        "ten": 10,
        "eleven": 11,
        "twelve": 12

    };


    for (
        const word in numberWords
    ) {

        value =
            value.replace(
                new RegExp(
                    "\\b" +
                    word +
                    "\\b",
                    "gi"
                ),
                String(
                    numberWords[word]
                )
            );

    }


    /*
       8 PM
       8:30 PM
       08:30 PM
    */

    const twelve =
        value.match(
            /(?:at\s+)?(\d{1,2})(?:\s*[:.]\s*(\d{1,2}))?\s*(am|pm)\b/i
        );


    if (twelve) {

        let hour =
            parseInt(
                twelve[1],
                10
            );


        let minute =
            twelve[2]
                ? parseInt(
                    twelve[2],
                    10
                )
                : 0;


        const period =
            twelve[3]
                .toLowerCase();


        if (
            hour < 1 ||
            hour > 12 ||
            minute > 59
        ) {

            return null;

        }


        if (
            period === "pm" &&
            hour !== 12
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
            String(hour)
                .padStart(2, "0")
            +
            ":"
            +
            String(minute)
                .padStart(2, "0")
        );

    }


    /*
       20:30
       08:00
    */

    const twentyFour =
        value.match(
            /\b([01]?\d|2[0-3])\s*[:.]\s*([0-5]\d)\b/
        );


    if (twentyFour) {

        return (
            String(
                parseInt(
                    twentyFour[1],
                    10
                )
            ).padStart(
                2,
                "0"
            )
            +
            ":"
            +
            String(
                parseInt(
                    twentyFour[2],
                    10
                )
            ).padStart(
                2,
                "0"
            )
        );

    }


    /*
       Just "8" / "12"

       We don't automatically
       guess AM/PM because that
       could create a wrong reminder.
    */

    return null;

}


/* =========================================================
   UPDATE VOICE STEP UI
   ========================================================= */

function updateVoiceStep(step) {

    const steps =
        document.querySelectorAll(
            ".voice-step"
        );


    steps.forEach(
        element => {

            element.classList.remove(
                "active"
            );

            element.classList.remove(
                "completed"
            );

        }
    );


    /*
       Supports:

       data-step="name"
       data-step="dosage"
       data-step="time"
    */

    steps.forEach(
        element => {

            const value =
                element.dataset.step;


            if (
                value === step
            ) {

                element.classList.add(
                    "active"
                );

            }


            if (
                step === "dosage" &&
                value === "name"
            ) {

                element.classList.add(
                    "completed"
                );

            }


            if (
                step === "time" &&
                (
                    value === "name" ||
                    value === "dosage"
                )
            ) {

                element.classList.add(
                    "completed"
                );

            }


            if (
                step === "complete"
            ) {

                element.classList.add(
                    "completed"
                );

            }

        }
    );

}


/* =========================================================
   VOICE STATUS
   ========================================================= */

function updateVoiceEntryStatus(
    message
) {

    const status =
        document.getElementById(
            "voiceEntryStatus"
        );


    if (status) {

        status.textContent =
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


    voiceStarting =
        false;


    if (voiceRecognition) {

        try {

            voiceRecognition.onend =
                null;

            voiceRecognition.onerror =
                null;

            voiceRecognition.onresult =
                null;

            voiceRecognition.stop();

        }

        catch (error) {

            console.log(error);

        }

    }


    voiceRecognition =
        null;


    updateVoiceEntryStatus(
        "Voice input stopped."
    );


    updateVoiceStep(
        ""
    );

}


/* =========================================================
   VOICE "I TOOK IT"
   ========================================================= */

function startTakenVoiceRecognition() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        console.log(
            "Speech recognition is not supported."
        );

        return;

    }


    if (
        activeReminder === null
    ) {

        return;

    }


    stopTakenVoiceRecognition();


    takenVoiceActive =
        true;


    createTakenVoiceRecognition(
        SpeechRecognition
    );

}


/* =========================================================
   CREATE "I TOOK IT" LISTENER
   ========================================================= */

function createTakenVoiceRecognition(
    SpeechRecognition
) {

    if (
        !takenVoiceActive ||
        activeReminder === null
    ) {

        return;

    }


    const recognition =
        new SpeechRecognition();


    takenVoiceRecognition =
        recognition;


    recognition.lang =
        getBrowserLanguage();


    recognition.continuous =
        false;


    recognition.interimResults =
        false;


    recognition.maxAlternatives =
        5;


    recognition.onstart =
        function() {

            console.log(
                "Listening for I took it..."
            );

        };


    recognition.onresult =
        function(event) {

            const transcript =
                event.results[0][0]
                    .transcript
                    .trim();


            console.log(
                "Patient said:",
                transcript
            );


            if (
                detectTakenCommand(
                    transcript
                )
            ) {

                const id =
                    activeReminder;


                takenVoiceActive =
                    false;


                stopTakenVoiceRecognition();


                markTaken(
                    id
                );


                return;

            }


            /*
               User said something else.
               Continue listening.
            */

            scheduleTakenVoiceRestart();

        };


    recognition.onerror =
        function(event) {

            console.log(
                "Taken voice error:",
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


            scheduleTakenVoiceRestart();

        };


    recognition.onend =
        function() {

            if (
                !takenVoiceActive
            ) {

                return;

            }


            if (
                activeReminder ===
                null
            ) {

                return;

            }


            scheduleTakenVoiceRestart();

        };


    try {

        recognition.start();

    }

    catch (error) {

        console.log(
            "Taken recognition start:",
            error
        );


        scheduleTakenVoiceRestart();

    }

}


/* =========================================================
   RESTART "I TOOK IT" LISTENER
   ========================================================= */

function scheduleTakenVoiceRestart() {

    if (
        takenVoiceRestartTimer
    ) {

        clearTimeout(
            takenVoiceRestartTimer
        );

    }


    if (
        !takenVoiceActive
    ) {

        return;

    }


    if (
        activeReminder ===
        null
    ) {

        return;

    }


    takenVoiceRestartTimer =
        setTimeout(
            function() {

                if (
                    !takenVoiceActive
                ) {

                    return;

                }


                if (
                    activeReminder ===
                    null
                ) {

                    return;

                }


                const SpeechRecognition =
                    window.SpeechRecognition ||
                    window.webkitSpeechRecognition;


                if (
                    SpeechRecognition
                ) {

                    createTakenVoiceRecognition(
                        SpeechRecognition
                    );

                }

            },
            700
        );

}


/* =========================================================
   DETECT "I TOOK IT"
   ========================================================= */

function detectTakenCommand(
    text
) {

    const normalized =
        String(text || "")
            .toLowerCase()
            .trim();


    /*
       English
    */

    const english =
        [

            "i took it",

            "i took the medicine",

            "i took my medicine",

            "i took medicine",

            "medicine taken",

            "medicine is taken",

            "medicine was taken",

            "taken",

            "i have taken it",

            "i have taken the medicine",

            "i have taken my medicine",

            "i have taken medicine",

            "done",

            "completed",

            "finished",

            "i took"

        ];


    /*
       Tamil
    */

    const tamil =
        [

            "எடுத்துவிட்டேன்",

            "மருந்து எடுத்துவிட்டேன்",

            "மருந்து எடுத்தேன்",

            "எடுத்தேன்",

            "மருந்து எடுத்தாச்சு",

            "மருந்து எடுத்துவிட்டேன்"

        ];


    /*
       Hindi
    */

    const hindi =
        [

            "मैंने दवा ले ली",

            "दवा ले ली",

            "दवा ले लिया",

            "मैंने दवाई ले ली",

            "दवाई ले ली"

        ];


    /*
       Telugu
    */

    const telugu =
        [

            "మందు తీసుకున్నాను",

            "మందు తీసుకున్నా",

            "మందు తీసుకున్నాను",

            "మందు తీసుకున్నాను"

        ];


    const commands =
        [
            ...english,
            ...tamil,
            ...hindi,
            ...telugu
        ];


    return commands.some(
        command =>
            normalized.includes(
                command.toLowerCase()
            )
    );

}


/* =========================================================
   STOP "I TOOK IT"
   ========================================================= */

function stopTakenVoiceRecognition() {

    takenVoiceActive =
        false;


    if (
        takenVoiceRestartTimer
    ) {

        clearTimeout(
            takenVoiceRestartTimer
        );

        takenVoiceRestartTimer =
            null;

    }


    if (
        takenVoiceRecognition
    ) {

        try {

            takenVoiceRecognition.onend =
                null;

            takenVoiceRecognition.onerror =
                null;

            takenVoiceRecognition.onresult =
                null;

            takenVoiceRecognition.stop();

        }

        catch (error) {

            console.log(error);

        }

    }


    takenVoiceRecognition =
        null;

}


/* =========================================================
   CAREGIVER
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


function saveCaregiver() {

    const input =
        document.getElementById(
            "caregiverPhone"
        );


    if (!input) {
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


function loadCaregiver() {

    const input =
        document.getElementById(
            "caregiverPhone"
        );


    if (!input) {
        return;
    }


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
   CAREGIVER SMS
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

    if (
        !confirm(
            "Call emergency services?"
        )
    ) {

        return;

    }


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


    if (!log) {
        return;
    }


    const item =
        document.createElement(
            "li"
        );


    item.textContent =
        `${new Date().toLocaleString()} - ${message}`;


    log.prepend(item);


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
                m.status ===
                "taken"
        ).length;


    const missed =
        medicines.filter(
            m =>
                m.status ===
                "missed"
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
                                ?
                                new Date(
                                    medicine.takenAt
                                ).toLocaleString()
                                :
                                "-"
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
                JS MEDICARE Medication Report
            </title>

            <style>

                body {
                    font-family: Arial, sans-serif;
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

            <table>

                <thead>

                    <tr>

                        <th>Medicine</th>

                        <th>Dosage</th>

                        <th>Time</th>

                        <th>Status</th>

                        <th>Taken At</th>

                    </tr>

                </thead>

                <tbody>

                    ${rows}

                </tbody>

            </table>

            <script>

                window.onload =
                    function() {

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

    if (
        reminderCheckerTimer
    ) {

        clearInterval(
            reminderCheckerTimer
        );

        reminderCheckerTimer =
            null;

    }


    clearReminderTimers();

    stopTakenVoiceRecognition();

    stopVoiceMedicineEntry();

    stopVibration();

    stopAllSpeech();


    closeReminderPopup();


    activeReminder =
        null;


    const dashboard =
        document.getElementById(
            "dashboard"
        );


    const loginSection =
        document.getElementById(
            "loginSection"
        );


    if (dashboard) {

        dashboard.style.display =
            "none";

    }


    if (loginSection) {

        loginSection.style.display =
            "flex";

    }

}


/* =========================================================
   PAGE LOAD
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

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


        if (
            patientName &&
            patientPhone
        ) {

            loadMedicines();

            loadCaregiver();

            renderMedicines();

            updateDashboard();


            const loginSection =
                document.getElementById(
                    "loginSection"
                );


            const dashboard =
                document.getElementById(
                    "dashboard"
                );


            if (loginSection) {

                loginSection.style.display =
                    "none";

            }


            if (dashboard) {

                dashboard.style.display =
                    "block";

            }


            startReminderChecker();

        }

    }
);
