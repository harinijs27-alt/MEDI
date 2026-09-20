/* =========================================================
   JS MEDICARE
   COMPLETE SCRIPT.JS
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


/* Voice-to-text */

let voiceRecognition = null;

let voiceEntryActive = false;


/* "I took it" voice recognition */

let takenVoiceRecognition = null;


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
   LANGUAGE HELPERS
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
   BUILD REMINDER MESSAGE
   ========================================================= */

function buildReminderMessage(medicineName) {

    const lang = getLanguage();

    const name =
        String(medicineName || "").trim();


    if (!name) {
        return "";
    }


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
   REGIONAL VOICE
   ========================================================= */

function speakRegionalVoice(text) {

    if (!text || !text.trim()) {
        return;
    }


    const language =
        getVoiceLanguageCode();


    try {

        speechSynthesis.cancel();

    }

    catch (error) {

        console.log(error);

    }


    /*
       English browser voice
    */

    if (language === "en") {

        speakBrowserVoice(
            text,
            "en-IN"
        );

        return;

    }


    /*
       Regional online TTS
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


        medicareAudio.volume =
            1.0;


        medicareAudio.play()

            .then(() => {

                console.log(
                    "Regional voice started:",
                    language
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
   BROWSER SPEECH FALLBACK
   ========================================================= */

function speakBrowserVoice(
    text,
    language
) {

    if (
        !("speechSynthesis" in window)
    ) {

        console.log(
            "Speech synthesis not supported."
        );

        return;

    }


    try {

        speechSynthesis.cancel();

        speechSynthesis.resume();


        const speech =
            new SpeechSynthesisUtterance(
                text
            );


        speech.lang =
            language;


        speech.rate =
            0.8;


        speech.pitch =
            1;


        speech.volume =
            1;


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
   ENABLE VOICE
   ========================================================= */

function enableMobileVoice() {

    if (
        "speechSynthesis" in window
    ) {

        speechSynthesis.cancel();


        const testSpeech =
            new SpeechSynthesisUtterance(
                ""
            );


        testSpeech.lang =
            getBrowserLanguage();


        speechSynthesis.speak(
            testSpeech
        );


        voiceUnlocked =
            true;


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
   CONTINUOUS VIBRATION
   ========================================================= */

function startContinuousVibration() {

    stopVibration();


    if (!("vibrate" in navigator)) {

        console.log(
            "Vibration is not supported."
        );

        return null;

    }


    /*
       Vibrate immediately
    */

    try {

        navigator.vibrate([
            600,
            200,
            600
        ]);

    }

    catch (error) {

        console.log(
            "Vibration error:",
            error
        );

    }


    /*
       Repeat every 2 seconds
    */

    const vibrationLoop =
        setInterval(() => {

            const currentMedicine =
                medicines.find(
                    m =>
                        m.id ===
                        activeReminder
                );


            if (
                !currentMedicine ||
                currentMedicine.status !==
                "pending"
            ) {

                clearInterval(
                    vibrationLoop
                );


                stopVibration();

                return;

            }


            try {

                navigator.vibrate([
                    600,
                    200,
                    600
                ]);

            }

            catch (error) {

                console.log(
                    error
                );

            }

        }, 2000);


    return vibrationLoop;

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

            console.log(
                error
            );

        }

    }

}


/* =========================================================
   STORAGE
   ========================================================= */

function getMedicineStorageKey() {

    const phone =
        patientPhone || "default";


    return (
        "medicines_" +
        phone
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
   MARK MEDICINE AS TAKEN
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


    /*
       Stop voice recognition
    */

    stopTakenVoiceRecognition();


    /*
       Mark as taken
    */

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


    /*
       Stop active reminder
    */

    if (
        activeReminder === id
    ) {

        activeReminder = null;

    }


    closeReminderPopup();


    /*
       Stop speech
    */

    try {

        speechSynthesis.cancel();

    }

    catch (error) {

        console.log(error);

    }


    /*
       Stop regional audio
    */

    if (medicareAudio) {

        try {

            medicareAudio.pause();

            medicareAudio.currentTime = 0;

        }

        catch (error) {

            console.log(error);

        }

    }


    /*
       Stop vibration
    */

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


    if (!medicine) {
        return;
    }


    const confirmed =
        confirm(
            `Delete ${medicine.name}?`
        );


    if (!confirmed) {
        return;
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


function checkMedicationReminder() {

    const now =
        new Date();


    const hours =
        String(
            now.getHours()
        ).padStart(
            2,
            "0"
        );


    const minutes =
        String(
            now.getMinutes()
        ).padStart(
            2,
            "0"
        );


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
   TRIGGER 60 SECOND REMINDER
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
       SHOW POPUP
    */

    showVisualReminder(
        medicine
    );


    /*
       FIRST VOICE
    */

    speakRegionalVoice(
        message
    );


    /*
       START VIBRATION
    */

    const vibrationLoop =
        startContinuousVibration();


    /*
       LISTEN FOR
       "I TOOK IT"
    */

    startTakenVoiceRecognition();


    /*
       REPEAT VOICE EVERY 10 SEC
    */

    const voiceInterval =
        setInterval(() => {

            const currentMedicine =
                medicines.find(
                    m =>
                        m.id ===
                        medicine.id
                );


            if (
                !currentMedicine ||
                currentMedicine.status !==
                "pending"
            ) {

                clearInterval(
                    voiceInterval
                );


                if (vibrationLoop) {

                    clearInterval(
                        vibrationLoop
                    );

                }


                stopVibration();

                stopTakenVoiceRecognition();

                return;

            }


            speakRegionalVoice(
                message
            );

        }, 10000);


    /*
       AFTER 60 SECONDS
    */

    setTimeout(() => {

        clearInterval(
            voiceInterval
        );


        if (vibrationLoop) {

            clearInterval(
                vibrationLoop
            );

        }


        stopVibration();


        stopTakenVoiceRecognition();


        const currentMedicine =
            medicines.find(
                m =>
                    m.id ===
                    medicine.id
            );


        /*
           If already taken,
           don't mark missed.
        */

        if (
            !currentMedicine ||
            currentMedicine.status !==
            "pending"
        ) {

            return;

        }


        /*
           Mark missed
        */

        currentMedicine.status =
            "missed";


        currentMedicine.missedAt =
            new Date().toISOString();


        saveMedicines();

        renderMedicines();

        updateDashboard();


        /*
           Missed voice
        */

        speakMissedReminder(
            currentMedicine
        );


        /*
           Caregiver SMS
        */

        sendCaregiverSMS(
            currentMedicine
        );


        /*
           Activity
        */

        addLog(
            `${currentMedicine.name} was missed after 1 minute.`
        );


        /*
           Close popup
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

        setTimeout(() => {

            button.focus();

        }, 100);

    }

}


/* =========================================================
   CLOSE REMINDER
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
   VOICE TO TEXT MEDICINE ENTRY
   ========================================================= */

function startVoiceMedicineEntry() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        alert(
            "Voice input is not supported in this browser. Please use Google Chrome on Android."
        );

        return;

    }


    if (voiceEntryActive) {

        stopVoiceMedicineEntry();

        return;

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


    voiceEntryActive =
        true;


    updateVoiceEntryStatus(
        "🎤 Listening... Please say medicine name, dosage and time."
    );


    voiceRecognition.onstart =
        function() {

            updateVoiceEntryStatus(
                "🎤 Listening... Speak now."
            );

        };


    voiceRecognition.onresult =
        function(event) {

            const result =
                event.results[0][0]
                    .transcript;


            console.log(
                "Voice input:",
                result
            );


            updateVoiceEntryStatus(
                "✓ Heard: " + result
            );


            processVoiceMedicineInput(
                result
            );

        };


    voiceRecognition.onerror =
        function(event) {

            console.log(
                "Voice recognition error:",
                event.error
            );


            voiceEntryActive =
                false;


            updateVoiceEntryStatus(
                "❌ Voice input failed. Please try again."
            );

        };


    voiceRecognition.onend =
        function() {

            voiceEntryActive =
                false;

        };


    try {

        voiceRecognition.start();

    }

    catch (error) {

        console.log(
            "Voice start error:",
            error
        );


        voiceEntryActive =
            false;

    }

}


/* =========================================================
   STOP VOICE ENTRY
   ========================================================= */

function stopVoiceMedicineEntry() {

    if (voiceRecognition) {

        try {

            voiceRecognition.stop();

        }

        catch (error) {

            console.log(
                error
            );

        }

    }


    voiceEntryActive =
        false;


    updateVoiceEntryStatus(
        "Voice input stopped."
    );

}


/* =========================================================
   UPDATE VOICE STATUS
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
   PROCESS VOICE MEDICINE INPUT
   ========================================================= */

function processVoiceMedicineInput(
    spokenText
) {

    const text =
        spokenText.trim();


    if (!text) {

        alert(
            "I could not understand the medicine details."
        );

        return;

    }


    let detectedTime =
        null;


    /*
       12-hour format

       8 PM
       8:30 PM
       8 am
       8:00 pm
    */

    const twelveHourMatch =
        text.match(
            /(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i
        );


    /*
       24-hour format

       20:00
       08:30
    */

    const twentyFourHourMatch =
        text.match(
            /\b([01]?\d|2[0-3]):([0-5]\d)\b/
        );


    if (twelveHourMatch) {

        let hour =
            parseInt(
                twelveHourMatch[1]
            );


        const minute =
            twelveHourMatch[2]
                ? parseInt(
                    twelveHourMatch[2]
                )
                : 0;


        const period =
            twelveHourMatch[3]
                .toLowerCase();


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


        detectedTime =
            String(hour)
                .padStart(2, "0")
            +
            ":"
            +
            String(minute)
                .padStart(2, "0");

    }

    else if (
        twentyFourHourMatch
    ) {

        detectedTime =
            twentyFourHourMatch[0];

    }


    /*
       Remove detected time
    */

    let remainingText =
        text;


    if (twelveHourMatch) {

        remainingText =
            remainingText.replace(
                twelveHourMatch[0],
                ""
            );

    }

    else if (
        twentyFourHourMatch
    ) {

        remainingText =
            remainingText.replace(
                twentyFourHourMatch[0],
                ""
            );

    }


    /*
       Remove common words
    */

    remainingText =
        remainingText.replace(

            /\b(at|on|around|for|take|medicine|please|add)\b/gi,

            " "

        );


    /*
       Detect dosage
    */

    let detectedDosage =
        "";


    const dosageMatch =
        remainingText.match(

            /\b(\d+(?:\.\d+)?)\s*(mg|g|mcg|ml|mls|tablet|tablets|capsule|capsules)\b/i

        );


    if (dosageMatch) {

        detectedDosage =
            dosageMatch[1] +
            " " +
            dosageMatch[2];


        remainingText =
            remainingText.replace(
                dosageMatch[0],
                ""
            );

    }


    /*
       Medicine name
    */

    let detectedMedicine =
        remainingText
            .replace(
                /\s+/g,
                " "
            )
            .trim();


    /*
       If medicine name becomes empty,
       use the original spoken text.
    */

    if (!detectedMedicine) {

        detectedMedicine =
            text;

    }


    /*
       Fill medicine input
    */

    const medicineInput =
        document.getElementById(
            "medicineName"
        );


    if (medicineInput) {

        medicineInput.value =
            detectedMedicine;

    }


    /*
       Fill dosage
    */

    const dosageInput =
        document.getElementById(
            "dosage"
        );


    if (
        dosageInput &&
        detectedDosage
    ) {

        dosageInput.value =
            detectedDosage;

    }


    /*
       Fill time
    */

    const timeInput =
        document.getElementById(
            "medicineTime"
        );


    if (
        timeInput &&
        detectedTime
    ) {

        timeInput.value =
            detectedTime;

    }


    /*
       Show result
    */

    let summary =
        `Medicine: ${detectedMedicine}`;


    if (detectedDosage) {

        summary +=
            ` | Dosage: ${detectedDosage}`;

    }


    if (detectedTime) {

        summary +=
            ` | Time: ${detectedTime}`;

    }


    updateVoiceEntryStatus(
        "✓ " + summary
    );


    /*
       Speak confirmation
    */

    speakVoiceEntryConfirmation(

        detectedMedicine,

        detectedDosage,

        detectedTime

    );

}


/* =========================================================
   VOICE ENTRY CONFIRMATION
   ========================================================= */

function speakVoiceEntryConfirmation(

    medicine,

    dosage,

    time

) {

    const lang =
        getLanguage();


    let message = "";


    if (lang === "ta") {

        message =
            `${medicine} மருந்து`;


        if (dosage) {

            message +=
                ` ${dosage}`;

        }


        if (time) {

            message +=
                `, ${time} மணிக்கு`;

        }


        message +=
            ` சேர்க்கப்பட்டுள்ளது.`;

    }

    else if (lang === "hi") {

        message =
            `${medicine} दवा`;


        if (dosage) {

            message +=
                ` ${dosage}`;

        }


        if (time) {

            message +=
                `, ${time} बजे`;

        }


        message +=
            ` के लिए भर दी गई है।`;

    }

    else if (lang === "te") {

        message =
            `${medicine} మందు`;


        if (dosage) {

            message +=
                ` ${dosage}`;

        }


        if (time) {

            message +=
                `, ${time} గంటలకు`;

        }


        message +=
            ` నమోదు చేయబడింది.`;

    }

    else {

        message =
            `${medicine} has been entered`;


        if (dosage) {

            message +=
                ` with dosage ${dosage}`;

        }


        if (time) {

            message +=
                ` for ${time}`;

        }


        message += ".";

    }


    speakRegionalVoice(
        message
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
            "Speech recognition not supported."
        );

        return;

    }


    if (
        activeReminder === null
    ) {

        return;

    }


    /*
       Don't create duplicate listeners
    */

    stopTakenVoiceRecognition();


    takenVoiceRecognition =
        new SpeechRecognition();


    takenVoiceRecognition.lang =
        getBrowserLanguage();


    takenVoiceRecognition.continuous =
        true;


    takenVoiceRecognition.interimResults =
        false;


    takenVoiceRecognition.maxAlternatives =
        3;


    takenVoiceRecognition.onresult =
        function(event) {

            const lastResult =
                event.results[
                    event.results.length - 1
                ][0]
                    .transcript
                    .toLowerCase()
                    .trim();


            console.log(
                "Patient said:",
                lastResult
            );


            if (
                detectTakenCommand(
                    lastResult
                )
            ) {

                const medicineId =
                    activeReminder;


                stopTakenVoiceRecognition();


                markTaken(
                    medicineId
                );

            }

        };


    takenVoiceRecognition.onerror =
        function(event) {

            console.log(
                "Taken voice recognition:",
                event.error
            );

        };


    takenVoiceRecognition.onend =
        function() {

            /*
               Restart while reminder
               is still active.
            */

            if (
                activeReminder !==
                null
            ) {

                const currentMedicine =
                    medicines.find(
                        m =>
                            m.id ===
                            activeReminder
                    );


                if (
                    currentMedicine &&
                    currentMedicine.status ===
                    "pending"
                ) {

                    try {

                        takenVoiceRecognition.start();

                    }

                    catch (error) {

                        console.log(
                            error
                        );

                    }

                }

            }

        };


    try {

        takenVoiceRecognition.start();

    }

    catch (error) {

        console.log(
            "Taken voice recognition start error:",
            error
        );

    }

}


/* =========================================================
   DETECT "I TOOK IT"
   ========================================================= */

function detectTakenCommand(
    text
) {

    const normalized =
        text
            .toLowerCase()
            .trim();


    /*
       English commands
    */

    const englishCommands = [

        "i took it",

        "i took the medicine",

        "i took my medicine",

        "medicine taken",

        "medicine is taken",

        "taken",

        "i have taken it",

        "i have taken my medicine",

        "done",

        "completed",

        "taken medicine"

    ];


    /*
       Tamil commands
    */

    const tamilCommands = [

        "எடுத்துவிட்டேன்",

        "மருந்து எடுத்துவிட்டேன்",

        "மருந்து எடுத்தேன்"

    ];


    /*
       Hindi commands
    */

    const hindiCommands = [

        "मैंने दवा ले ली",

        "दवा ले ली",

        "दवा ले लिया"

    ];


    /*
       Telugu commands
    */

    const teluguCommands = [

        "మందు తీసుకున్నాను",

        "మందు తీసుకున్నా",

        "మందు తీసుకున్నాను"

    ];


    const commands = [

        ...englishCommands,

        ...tamilCommands,

        ...hindiCommands,

        ...teluguCommands

    ];


    return commands.some(
        command =>
            normalized.includes(
                command.toLowerCase()
            )
    );

}


/* =========================================================
   STOP "I TOOK IT" RECOGNITION
   ========================================================= */

function stopTakenVoiceRecognition() {

    if (
        takenVoiceRecognition
    ) {

        try {

            takenVoiceRecognition.stop();

        }

        catch (error) {

            console.log(
                error
            );

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


    /*
       Opens SMS application.
       Normal websites cannot silently
       send SMS without user interaction.
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
   EMERGENCY CALL
   ========================================================= */

function callAmbulance() {

    const confirmed =
        confirm(
            "Call emergency services?"
        );


    if (!confirmed) {
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


    const time =
        new Date().toLocaleString();


    item.textContent =
        `${time} - ${message}`;


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

    if (reminderLoop) {

        clearInterval(
            reminderLoop
        );

        reminderLoop =
            null;

    }


    stopTakenVoiceRecognition();

    stopVoiceMedicineEntry();


    try {

        speechSynthesis.cancel();

    }

    catch (error) {

        console.log(
            error
        );

    }


    if (medicareAudio) {

        try {

            medicareAudio.pause();

            medicareAudio.currentTime =
                0;

        }

        catch (error) {

            console.log(
                error
            );

        }

    }


    stopVibration();


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

        /*
           Load patient details
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
           Fill login fields
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
           Restore previous session
        */

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
