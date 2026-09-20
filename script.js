// =====================================================
// JS MEDICARE
// COMPLETE JAVASCRIPT
// =====================================================


let medicines = [];

let activeReminder = null;

let reminderLoop = null;

let patientName = "";

let patientPhone = "";

let selectedLanguage = "en";

let medicareAudio = null;

let voiceUnlocked = false;


// =====================================================
// TRANSLATIONS
// =====================================================

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


// =====================================================
// GET LANGUAGE
// =====================================================

function getLanguage() {

    return selectedLanguage || "en";

}


// =====================================================
// LOGIN
// =====================================================

function login() {

    const nameInput =
        document.getElementById("patientName");

    const phoneInput =
        document.getElementById("patientPhone");

    const languageInput =
        document.getElementById("languageSelect");


    patientName =
        nameInput.value.trim();

    patientPhone =
        phoneInput.value.trim();

    selectedLanguage =
        languageInput.value;


    if (!patientName) {

        alert("Please enter patient name.");

        nameInput.focus();

        return;
    }


    if (!patientPhone) {

        alert("Please enter patient phone number.");

        phoneInput.focus();

        return;
    }


    localStorage.setItem(
        "medicare_patient_name",
        patientName
    );


    localStorage.setItem(
        "medicare_patient_phone",
        patientPhone
    );


    localStorage.setItem(
        "medicare_language",
        selectedLanguage
    );


    loadMedicines();

    loadCaregiver();

    applyLanguage();

    document.getElementById(
        "loginSection"
    ).style.display = "none";


    document.getElementById(
        "dashboardSection"
    ).style.display = "block";


    renderMedicines();

    updateDashboard();

    startReminderChecker();

    addLog(
        "Login successful."
    );


    console.log(
        "MEDICARE: Login successful"
    );
}


// =====================================================
// LOAD PATIENT
// =====================================================

function loadPatientData() {

    patientName =
        localStorage.getItem(
            "medicare_patient_name"
        ) || "";

    patientPhone =
        localStorage.getItem(
            "medicare_patient_phone"
        ) || "";

    selectedLanguage =
        localStorage.getItem(
            "medicare_language"
        ) || "en";


    const nameInput =
        document.getElementById("patientName");

    const phoneInput =
        document.getElementById("patientPhone");

    const languageInput =
        document.getElementById("languageSelect");


    if (nameInput) {

        nameInput.value =
            patientName;
    }


    if (phoneInput) {

        phoneInput.value =
            patientPhone;
    }


    if (languageInput) {

        languageInput.value =
            selectedLanguage;
    }

}


// =====================================================
// CHANGE LANGUAGE
// =====================================================

function changeLanguage(language) {

    selectedLanguage = language;


    localStorage.setItem(
        "medicare_language",
        language
    );


    const loginLanguage =
        document.getElementById(
            "languageSelect"
        );


    const dashboardLanguage =
        document.getElementById(
            "dashboardLanguage"
        );


    if (loginLanguage) {

        loginLanguage.value =
            language;
    }


    if (dashboardLanguage) {

        dashboardLanguage.value =
            language;
    }


    applyLanguage();


    renderMedicines();

}


// =====================================================
// APPLY LANGUAGE
// =====================================================

function applyLanguage() {

    const lang =
        translations[getLanguage()] ||
        translations.en;


    const welcome =
        document.getElementById(
            "welcomeTitle"
        );

    const aiStatus =
        document.getElementById(
            "aiStatusText"
        );

    const aiTitle =
        document.getElementById(
            "aiTitle"
        );

    const aiMessage =
        document.getElementById(
            "aiMessage"
        );


    if (welcome) {

        welcome.textContent =
            lang.welcome;
    }


    if (aiStatus) {

        aiStatus.textContent =
            lang.aiStatus;
    }


    if (aiTitle) {

        aiTitle.textContent =
            lang.aiTitle;
    }


    if (aiMessage) {

        aiMessage.textContent =
            lang.aiMessage;
    }

}


// =====================================================
// ENABLE MOBILE VOICE
// =====================================================

function enableMobileVoice() {

    if (
        "speechSynthesis"
        in window
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

        voiceUnlocked = true;


        const status =
            document.getElementById(
                "voiceStatus"
            );


        if (status) {

            status.textContent =
                "✓ Voice enabled successfully.";
        }

    } else {

        alert(
            "Speech is not supported in this browser."
        );
    }

}


// =====================================================
// VOICE LANGUAGE CODE
// =====================================================

function getVoiceLanguageCode() {

    const lang =
        getLanguage();


    if (lang === "ta") {

        return "ta";
    }


    if (lang === "hi") {

        return "hi";
    }


    if (lang === "te") {

        return "te";
    }


    return "en";

}


// =====================================================
// BROWSER LANGUAGE
// =====================================================

function getBrowserLanguage() {

    const lang =
        getLanguage();


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


// =====================================================
// BUILD REMINDER MESSAGE
// =====================================================

function buildReminderMessage(
    medicineName
) {

    const lang =
        getLanguage();


    // IMPORTANT:
    // Medicine name is NOT translated.
    // It remains exactly as entered.

    const name =
        String(
            medicineName || ""
        ).trim();


    if (!name) {

        return "";
    }


    // TAMIL

    if (lang === "ta") {

        return `${name} மருந்தை எடுத்துக்கொள்ளும் நேரம் வந்துவிட்டது.`;
    }


    // HINDI

    if (lang === "hi") {

        return `${name} दवा लेने का समय हो गया है।`;
    }


    // TELUGU

    if (lang === "te") {

        return `${name} మందు తీసుకునే సమయం వచ్చింది.`;
    }


    // ENGLISH

    return `It is time to take ${name}.`;

}


// =====================================================
// REGIONAL VOICE
// =====================================================

function speakRegionalVoice(text) {

    if (
        !text ||
        !text.trim()
    ) {

        return;
    }


    const language =
        getVoiceLanguageCode();


    // Stop old speech

    try {

        speechSynthesis.cancel();

    } catch (error) {

        console.log(error);

    }


    // =================================================
    // ENGLISH
    // =================================================

    if (language === "en") {

        speakBrowserVoice(
            text,
            "en-IN"
        );

        return;
    }


    // =================================================
    // REGIONAL LANGUAGE
    // =================================================

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


    } catch (error) {

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


// =====================================================
// BROWSER TTS
// =====================================================

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


    } catch (error) {

        console.log(
            "Browser speech error:",
            error
        );

    }

}


// =====================================================
// STORAGE KEY
// =====================================================

function getMedicineStorageKey() {

    const phone =
        patientPhone ||
        "default";


    return (
        "medicines_" +
        phone
    );

}


// =====================================================
// LOAD MEDICINES
// =====================================================

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

    } catch (error) {

        console.log(
            "Medicine loading error:",
            error
        );

        medicines = [];

    }

}


// =====================================================
// SAVE MEDICINES
// =====================================================

function saveMedicines() {

    localStorage.setItem(
        getMedicineStorageKey(),
        JSON.stringify(medicines)
    );

}


// =====================================================
// ADD MEDICINE
// =====================================================

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

        id:
            Date.now(),

        name:
            name,

        dosage:
            dosage || "-",

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
        `${name} added for ${formatTime(time)}.`
    );


    nameInput.value = "";

    dosageInput.value = "";

    timeInput.value = "";


    console.log(
        "Medicine added:",
        medicine
    );

}


// =====================================================
// RENDER MEDICINES
// =====================================================

function renderMedicines() {

    const list =
        document.getElementById(
            "medicineList"
        );


    if (!list) {

        return;
    }


    if (medicines.length === 0) {

        list.innerHTML =
            `<div class="empty">
                No medicines added yet.
            </div>`;

        return;
    }


    list.innerHTML =
        medicines.map(
            medicine => {

                const statusClass =
                    medicine.status;


                const statusText =
                    medicine.status
                        .charAt(0)
                        .toUpperCase() +
                    medicine.status.slice(1);


                const takenText =
                    medicine.takenAt
                        ? `<p>Taken: ${formatDateTime(medicine.takenAt)}</p>`
                        : "";


                const missedText =
                    medicine.missedAt
                        ? `<p>Missed: ${formatDateTime(medicine.missedAt)}</p>`
                        : "";


                return `

                <div class="medicine-item">

                    <div class="medicine-info">

                        <h3>
                            💊 ${escapeHTML(medicine.name)}
                        </h3>

                        <p>
                            Dosage:
                            ${escapeHTML(medicine.dosage)}
                        </p>

                        <p>
                            Time:
                            ${formatTime(medicine.time)}
                        </p>

                        ${takenText}

                        ${missedText}

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
                                type="button"
                                class="take-btn"
                                onclick="markTaken(${medicine.id})"
                            >
                                ✓ I Took It
                            </button>`

                            :

                            ""
                        }


                        <button
                            type="button"
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


// =====================================================
// FORMAT TIME
// =====================================================

function formatTime(time) {

    if (!time) {

        return "--";
    }


    const parts =
        time.split(":");


    let hour =
        parseInt(parts[0]);


    const minute =
        parts[1];


    const period =
        hour >= 12
            ? "PM"
            : "AM";


    hour =
        hour % 12 || 12;


    return `${hour}:${minute} ${period}`;

}


// =====================================================
// FORMAT DATE TIME
// =====================================================

function formatDateTime(
    dateString
) {

    if (!dateString) {

        return "--";
    }


    const date =
        new Date(dateString);


    return date.toLocaleString();

}


// =====================================================
// ESCAPE HTML
// =====================================================

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


// =====================================================
// UPDATE DASHBOARD
// =====================================================

function updateDashboard() {

    const total =
        medicines.length;


    const taken =
        medicines.filter(
            medicine =>
                medicine.status ===
                "taken"
        ).length;


    const missed =
        medicines.filter(
            medicine =>
                medicine.status ===
                "missed"
        ).length;


    const adherence =
        total > 0
            ? Math.round(
                (taken / total) * 100
            )
            : 0;


    setText(
        "totalMedicines",
        total
    );


    setText(
        "takenMedicines",
        taken
    );


    setText(
        "missedMedicines",
        missed
    );


    setText(
        "adherence",
        adherence + "%"
    );


    setText(
        "reportTotal",
        total
    );


    setText(
        "reportTaken",
        taken
    );


    setText(
        "reportMissed",
        missed
    );


    setText(
        "reportAdherence",
        adherence + "%"
    );


    updateNextReminder();

}


// =====================================================
// SET TEXT
// =====================================================

function setText(
    id,
    value
) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            value;

    }

}


// =====================================================
// NEXT REMINDER
// =====================================================

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
                    medicine.status ===
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
            "No upcoming reminder.";

        return;
    }


    const next =
        pending[0];


    element.innerHTML =
        `
        💊
        <strong>
            ${escapeHTML(next.name)}
        </strong>
        <br>
        Dosage:
        ${escapeHTML(next.dosage)}
        <br>
        Time:
        ${formatTime(next.time)}
        `;

}


// =====================================================
// START REMINDER CHECKER
// =====================================================

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


// =====================================================
// CHECK REMINDER
// =====================================================

function checkMedicationReminder() {

    if (
        medicines.length === 0
    ) {

        return;
    }


    const now =
        new Date();


    const currentHour =
        String(
            now.getHours()
        ).padStart(
            2,
            "0"
        );


    const currentMinute =
        String(
            now.getMinutes()
        ).padStart(
            2,
            "0"
        );


    const currentTime =
        `${currentHour}:${currentMinute}`;


    medicines.forEach(
        medicine => {

            if (
                medicine.time ===
                currentTime &&
                medicine.status ===
                "pending"
            ) {

                const lastTriggered =
                    medicine.lastTriggered;


                const today =
                    new Date()
                        .toDateString();


                if (
                    lastTriggered !==
                    today
                ) {

                    medicine.lastTriggered =
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


// =====================================================
// TRIGGER REMINDER
// =====================================================

function triggerReminder(
    medicine
) {

    activeReminder =
        medicine.id;


    const medicineName =
        String(
            medicine.name || ""
        ).trim();


    if (!medicineName) {

        return;
    }


    // Build regional-language message

    const message =
        buildReminderMessage(
            medicineName
        );


    console.log(
        "MEDICARE AI REMINDER"
    );


    console.log(
        "Language:",
        getLanguage()
    );


    console.log(
        "Medicine:",
        medicineName
    );


    console.log(
        "Message:",
        message
    );


    // Show visual popup

    showVisualReminder(
        medicine
    );


    // AUTOMATIC VOICE

    speakRegionalVoice(
        message
    );


    // Repeat after 10 seconds

    setTimeout(
        () => {

            const currentMedicine =
                medicines.find(
                    m =>
                        m.id ===
                        medicine.id
                );


            if (
                currentMedicine &&
                currentMedicine.status ===
                "pending"
            ) {

                speakRegionalVoice(
                    message
                );

            }

        },
        10000
    );


    // Mark missed after 1 minute

    setTimeout(
        () => {

            const currentMedicine =
                medicines.find(
                    m =>
                        m.id ===
                        medicine.id
                );


            if (
                currentMedicine &&
                currentMedicine.status ===
                "pending"
            ) {

                currentMedicine.status =
                    "missed";


                currentMedicine.missedAt =
                    new Date()
                        .toISOString();


                saveMedicines();


                renderMedicines();

                updateDashboard();


                speakMissedReminder(
                    currentMedicine
                );


                sendCaregiverSMS(
                    currentMedicine
                );


                addLog(
                    `${currentMedicine.name} was missed.`
                );

            }


            closeReminderPopup();


            if (
                activeReminder ===
                medicine.id
            ) {

                activeReminder =
                    null;

            }

        },
        60000
    );

}


// =====================================================
// VISUAL REMINDER
// =====================================================

function showVisualReminder(
    medicine
) {

    const popup =
        document.getElementById(
            "reminderPopup"
        );


    const medicineName =
        document.getElementById(
            "popupMedicineName"
        );


    if (!popup) {

        return;
    }


    if (medicineName) {

        medicineName.textContent =
            medicine.name;

    }


    popup.style.display =
        "flex";

}


// =====================================================
// CLOSE POPUP
// =====================================================

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


// =====================================================
// MARK TAKEN FROM POPUP
// =====================================================

function markTakenFromPopup() {

    if (!activeReminder) {

        closeReminderPopup();

        return;
    }


    markTaken(
        activeReminder
    );

}


// =====================================================
// MARK TAKEN
// =====================================================

function markTaken(
    id
) {

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
        new Date()
            .toISOString();


    saveMedicines();


    renderMedicines();

    updateDashboard();


    addLog(
        `${medicine.name} marked as taken.`
    );


    if (
        activeReminder === id
    ) {

        activeReminder =
            null;

    }


    closeReminderPopup();


    try {

        speechSynthesis.cancel();

    } catch (error) {

        console.log(error);

    }


    if (medicareAudio) {

        try {

            medicareAudio.pause();

        } catch (error) {

            console.log(error);

        }

    }

}


// =====================================================
// DELETE MEDICINE
// =====================================================

function deleteMedicine(
    id
) {

    const medicine =
        medicines.find(
            item =>
                item.id === id
        );


    if (!medicine) {

        return;
    }


    const confirmDelete =
        confirm(
            `Delete ${medicine.name}?`
        );


    if (!confirmDelete) {

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


// =====================================================
// MISSED REMINDER VOICE
// =====================================================

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


// =====================================================
// CAREGIVER SMS
// =====================================================

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


    console.log(
        "Caregiver SMS:",
        smsURL
    );


    // Open SMS application

    window.location.href =
        smsURL;

}


// =====================================================
// CAREGIVER STORAGE KEY
// =====================================================

function getCaregiverKey() {

    return (
        "caregiver_" +
        (
            patientPhone ||
            "default"
        )
    );

}


// =====================================================
// SAVE CAREGIVER
// =====================================================

function saveCaregiver() {

    const input =
        document.getElementById(
            "caregiverPhone"
        );


    const number =
        input.value.trim();


    if (!number) {

        alert(
            "Please enter caregiver phone number."
        );

        return;
    }


    localStorage.setItem(
        getCaregiverKey(),
        number
    );


    addLog(
        "Caregiver number saved."
    );


    alert(
        "Caregiver number saved successfully."
    );

}


// =====================================================
// LOAD CAREGIVER
// =====================================================

function loadCaregiver() {

    const input =
        document.getElementById(
            "caregiverPhone"
        );


    if (!input) {

        return;
    }


    input.value =
        localStorage.getItem(
            getCaregiverKey()
        ) || "";

}


// =====================================================
// CALL CAREGIVER
// =====================================================

function callCaregiver() {

    const number =
        localStorage.getItem(
            getCaregiverKey()
        );


    if (!number) {

        alert(
            "Please save caregiver phone number first."
        );

        return;
    }


    window.location.href =
        "tel:" +
        number;

}


// =====================================================
// CALL AMBULANCE
// =====================================================

function callAmbulance() {

    const confirmCall =
        confirm(
            "Call emergency services?"
        );


    if (!confirmCall) {

        return;
    }


    window.location.href =
        "tel:112";

}


// =====================================================
// ACTIVITY LOG
// =====================================================

function addLog(
    message
) {

    const log =
        document.getElementById(
            "activityLog"
        );


    if (!log) {

        return;
    }


    const empty =
        log.querySelector(
            ".empty"
        );


    if (empty) {

        empty.remove();

    }


    const item =
        document.createElement(
            "div"
        );


    item.className =
        "activity-item";


    item.textContent =
        `${new Date().toLocaleString()} - ${message}`;


    log.prepend(
        item
    );

}


// =====================================================
// MEDICATION REPORT
// =====================================================

function generateMedicationReport() {

    const total =
        medicines.length;


    const taken =
        medicines.filter(
            medicine =>
                medicine.status ===
                "taken"
        ).length;


    const missed =
        medicines.filter(
            medicine =>
                medicine.status ===
                "missed"
        ).length;


    const adherence =
        total > 0
            ? Math.round(
                (taken / total) * 100
            )
            : 0;


    const reportWindow =
        window.open(
            "",
            "_blank"
        );


    if (!reportWindow) {

        alert(
            "Please allow pop-ups to print the report."
        );

        return;
    }


    const medicineRows =
        medicines.map(
            medicine => {

                return `
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

                        <td>
                            ${
                                medicine.takenAt
                                ?
                                formatDateTime(
                                    medicine.takenAt
                                )
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
                JS MEDICARE Report
            </title>

            <style>

                body {
                    font-family: Arial;
                    padding: 30px;
                }

                h1 {
                    color: #2563eb;
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
                    background: #f1f5f9;
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

            <p>
                Phone:
                ${escapeHTML(patientPhone)}
            </p>

            <p>
                Generated:
                ${new Date().toLocaleString()}
            </p>


            <hr>


            <p>
                <strong>
                    Total:
                </strong>
                ${total}
            </p>


            <p>
                <strong>
                    Taken:
                </strong>
                ${taken}
            </p>


            <p>
                <strong>
                    Missed:
                </strong>
                ${missed}
            </p>


            <p>
                <strong>
                    Adherence:
                </strong>
                ${adherence}%
            </p>


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

                    ${medicineRows}

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


// =====================================================
// LOGOUT
// =====================================================

function logout() {

    if (reminderLoop) {

        clearInterval(
            reminderLoop
        );

        reminderLoop =
            null;

    }


    try {

        speechSynthesis.cancel();

    } catch (error) {

        console.log(error);

    }


    closeReminderPopup();


    document.getElementById(
        "dashboardSection"
    ).style.display = "none";


    document.getElementById(
        "loginSection"
    ).style.display = "flex";


    addLog(
        "Logged out."
    );

}


// =====================================================
// INITIALIZE
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadPatientData();


        const dashboardLanguage =
            document.getElementById(
                "dashboardLanguage"
            );


        if (dashboardLanguage) {

            dashboardLanguage.value =
                selectedLanguage;

        }


        applyLanguage();


        console.log(
            "JS MEDICARE loaded successfully."
        );


        // Check if previous login exists

        if (
            patientName &&
            patientPhone
        ) {

            loadMedicines();

            loadCaregiver();

            document.getElementById(
                "loginSection"
            ).style.display = "none";


            document.getElementById(
                "dashboardSection"
            ).style.display = "block";


            renderMedicines();

            updateDashboard();

            startReminderChecker();

        }

    }
);
