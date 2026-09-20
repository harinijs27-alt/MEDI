// =====================================================
// JS MEDICARE
// PROFESSIONAL MEDICATION MANAGEMENT PLATFORM
// =====================================================


// =====================================================
// GLOBAL VARIABLES
// =====================================================

let medicines = [];

let activeReminder = null;

let reminderLoop = null;

let reminderTimeout = null;

let reminderCheckerTimer = null;

let patientName = "";

let patientPhone = "";

let selectedLanguage = "en";

let medicareAudio = null;

let voiceUnlocked = false;


// Voice medicine entry
let voiceStepRecognition = null;

let voiceStep = null;

let voiceStepRunning = false;


// "I took it" recognition
let takenVoiceRecognition = null;

let takenVoiceListening = false;


// Vibration
let vibrationLoop = null;

let vibrationSupported = false;


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
// LANGUAGE
// =====================================================

function getLanguage() {

    return selectedLanguage || "en";
}


function getBrowserLanguage() {

    const lang = getLanguage();

    if (lang === "ta")
        return "ta-IN";

    if (lang === "hi")
        return "hi-IN";

    if (lang === "te")
        return "te-IN";

    return "en-IN";
}


function getVoiceLanguageCode() {

    const lang = getLanguage();

    if (lang === "ta")
        return "ta";

    if (lang === "hi")
        return "hi";

    if (lang === "te")
        return "te";

    return "en";
}


// =====================================================
// STORAGE
// =====================================================

function getMedicineStorageKey() {

    return "medicines_" +
        (patientPhone || "default");
}


function saveMedicines() {

    localStorage.setItem(
        getMedicineStorageKey(),
        JSON.stringify(medicines)
    );
}


function loadMedicines() {

    const data =
        localStorage.getItem(
            getMedicineStorageKey()
        );

    if (!data) {

        medicines = [];

        return;
    }

    try {

        medicines =
            JSON.parse(data);

    } catch (error) {

        console.log(error);

        medicines = [];
    }
}


// =====================================================
// CAREGIVER
// =====================================================

function getCaregiverStorageKey() {

    return "caregiver_" +
        (patientPhone || "default");
}


function saveCaregiver() {

    const input =
        document.getElementById(
            "caregiverPhone"
        );

    if (!input) return;

    const number =
        input.value.trim();

    if (!number) {

        alert(
            "Please enter caregiver phone number."
        );

        return;
    }

    localStorage.setItem(
        getCaregiverStorageKey(),
        number
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

    if (!input) return;

    const number =
        localStorage.getItem(
            getCaregiverStorageKey()
        );

    if (number) {

        input.value =
            number;
    }
}


// =====================================================
// LOGIN
// =====================================================

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

        return;
    }


    if (!patientPhone) {

        alert(
            "Please enter patient phone number."
        );

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


    enableVibration();


    document.getElementById(
        "loginSection"
    ).style.display =
        "none";


    document.getElementById(
        "dashboard"
    ).style.display =
        "block";


    addLog(
        "Patient logged in."
    );
}


// =====================================================
// VOICE + VIBRATION ENABLE
// =====================================================

function enableMobileVoice() {

    enableVibration();


    try {

        const utterance =
            new SpeechSynthesisUtterance(
                "Voice enabled"
            );

        utterance.volume = 0;

        window.speechSynthesis.speak(
            utterance
        );

        voiceUnlocked = true;


        const status =
            document.getElementById(
                "voiceStatus"
            );


        if (status) {

            if (vibrationSupported) {

                status.innerText =
                    "✓ Voice and vibration enabled.";

            } else {

                status.innerText =
                    "✓ Voice enabled.";
            }
        }

    } catch (error) {

        console.log(error);
    }
}


// =====================================================
// VIBRATION SUPPORT
// =====================================================

function enableVibration() {

    vibrationSupported =
        "vibrate" in navigator;


    console.log(
        "Vibration supported:",
        vibrationSupported
    );


    if (!vibrationSupported) {

        return false;
    }


    try {

        navigator.vibrate(300);

        return true;

    } catch (error) {

        console.log(
            "Vibration error:",
            error
        );

        return false;
    }
}


function startContinuousVibration() {

    stopVibration();


    if (!("vibrate" in navigator)) {

        console.log(
            "Vibration API unavailable."
        );

        return;
    }


    // Immediate vibration

    try {

        navigator.vibrate([
            800,
            200,
            800,
            200,
            800
        ]);

    } catch (error) {

        console.log(error);
    }


    // Continue until reminder ends

    vibrationLoop =
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


                try {

                    navigator.vibrate([
                        800,
                        200,
                        800,
                        200,
                        800
                    ]);

                } catch (error) {

                    console.log(error);
                }

            },
            2500
        );
}


function stopVibration() {

    if (vibrationLoop) {

        clearInterval(
            vibrationLoop
        );

        vibrationLoop = null;
    }


    if (
        "vibrate" in navigator
    ) {

        try {

            navigator.vibrate(0);

        } catch (error) {

            console.log(error);
        }
    }
}


// =====================================================
// LANGUAGE CHANGE
// =====================================================

function changeLanguage(
    language
) {

    selectedLanguage =
        language;


    localStorage.setItem(
        "selectedLanguage",
        selectedLanguage
    );


    applyLanguage();

    renderMedicines();

    updateDashboard();
}


function applyLanguage() {

    const t =
        translations[
            getLanguage()
        ];


    const welcome =
        document.getElementById(
            "welcomeText"
        );

    const aiStatus =
        document.getElementById(
            "aiStatus"
        );

    const aiTitle =
        document.getElementById(
            "aiTitle"
        );

    const aiMessage =
        document.getElementById(
            "aiMessage"
        );

    const addTitle =
        document.getElementById(
            "addMedicineTitle"
        );

    const medicineTitle =
        document.getElementById(
            "myMedicinesTitle"
        );

    const nextTitle =
        document.getElementById(
            "nextReminderTitle"
        );


    if (welcome) {

        welcome.innerText =
            t.welcome +
            (
                patientName
                    ? ", " +
                      patientName
                    : ""
            );
    }


    if (aiStatus) {

        aiStatus.innerHTML =
            `<span class="ai-dot"></span>${t.aiStatus}`;
    }


    if (aiTitle)
        aiTitle.innerText =
            t.aiTitle;


    if (aiMessage)
        aiMessage.innerText =
            t.aiMessage;


    if (addTitle)
        addTitle.innerText =
            t.addMedicine;


    if (medicineTitle)
        medicineTitle.innerText =
            t.myMedicines;


    if (nextTitle)
        nextTitle.innerText =
            t.nextReminder;


    const dashboardLanguage =
        document.getElementById(
            "dashboardLanguage"
        );


    if (dashboardLanguage) {

        dashboardLanguage.value =
            selectedLanguage;
    }
}


// =====================================================
// SPEECH
// =====================================================

function speakBrowserVoice(
    text,
    language
) {

    if (!text) return;


    if (
        !("speechSynthesis" in window)
    ) {

        return;
    }


    try {

        window.speechSynthesis.cancel();


        const utterance =
            new SpeechSynthesisUtterance(
                text
            );


        utterance.lang =
            language ||
            getBrowserLanguage();


        utterance.rate =
            0.8;

        utterance.pitch =
            1;

        utterance.volume =
            1;


        window.speechSynthesis.speak(
            utterance
        );

    } catch (error) {

        console.log(error);
    }
}


function speakRegionalVoice(
    text
) {

    if (!text) return;


    const language =
        getVoiceLanguageCode();


    // English

    if (
        language === "en"
    ) {

        speakBrowserVoice(
            text,
            "en-IN"
        );

        return;
    }


    try {

        if (medicareAudio) {

            medicareAudio.pause();

            medicareAudio = null;
        }


        const url =
            "https://translate.google.com/translate_tts" +
            "?ie=UTF-8" +
            "&client=tw-ob" +
            "&tl=" +
            language +
            "&q=" +
            encodeURIComponent(text);


        medicareAudio =
            new Audio(url);


        medicareAudio.play()
            .catch(
                () => {

                    speakBrowserVoice(
                        text,
                        getBrowserLanguage()
                    );

                }
            );

    } catch (error) {

        console.log(error);

        speakBrowserVoice(
            text,
            getBrowserLanguage()
        );
    }
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

        dosage:
            dosage || "-",

        time: time,

        status:
            "pending",

        createdAt:
            new Date()
                .toISOString(),

        takenAt: null,

        missedAt: null,

        lastTriggered: null
    };


    medicines.push(
        medicine
    );


    saveMedicines();

    renderMedicines();

    updateDashboard();


    nameInput.value = "";

    dosageInput.value = "";

    timeInput.value = "";


    addLog(
        "Medicine added: " +
        name
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


    if (!list) return;


    if (!medicines.length) {

        list.innerHTML =
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


    list.innerHTML =
        sorted
            .map(
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

                    <div
                        class="medicine-item"
                    >

                        <div>

                            <div
                                class="medicine-name"
                            >
                                ${escapeHTML(
                                    medicine.name
                                )}
                            </div>


                            <div
                                class="medicine-details"
                            >
                                Dosage:
                                ${escapeHTML(
                                    medicine.dosage
                                )}

                                <br>

                                Time:
                                ${formatTime(
                                    medicine.time
                                )}
                            </div>


                            <span
                                class="status ${statusClass}"
                            >
                                ${statusText}
                            </span>

                        </div>


                        <div
                            class="medicine-actions"
                        >

                            ${
                                medicine.status !==
                                "taken"
                                ?
                                `
                                <button
                                    class="take-btn"
                                    onclick="markTaken(${medicine.id})"
                                >
                                    ✓ Taken
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
            )
            .join("");
}


// =====================================================
// ESCAPE
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
// TIME FORMAT
// =====================================================

function formatTime(
    time
) {

    if (!time)
        return "-";


    const parts =
        time.split(":");


    let hour =
        parseInt(
            parts[0],
            10
        );


    const minute =
        parts[1];


    const period =
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
        period
    );
}


// =====================================================
// DELETE
// =====================================================

function deleteMedicine(
    id
) {

    const medicine =
        medicines.find(
            m =>
                m.id === id
        );


    if (!medicine)
        return;


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

        stopReminderCompletely();
    }


    medicines =
        medicines.filter(
            m =>
                m.id !== id
        );


    saveMedicines();

    renderMedicines();

    updateDashboard();


    addLog(
        "Medicine deleted: " +
        medicine.name
    );
}


// =====================================================
// REMINDER CHECKER
// =====================================================

function startReminderChecker() {

    if (
        reminderCheckerTimer
    ) {

        clearInterval(
            reminderCheckerTimer
        );
    }


    checkMedicineReminders();


    reminderCheckerTimer =
        setInterval(
            checkMedicineReminders,
            1000
        );
}


function checkMedicineReminders() {

    if (!medicines.length)
        return;


    const now =
        new Date();


    const currentTime =
        String(
            now.getHours()
        ).padStart(2, "0") +
        ":" +
        String(
            now.getMinutes()
        ).padStart(2, "0");


    const today =
        now.toISOString()
            .slice(0, 10);


    medicines.forEach(
        medicine => {

            if (
                medicine.status !==
                "pending"
            )
                return;


            if (
                medicine.time !==
                currentTime
            )
                return;


            const triggerKey =
                today +
                "_" +
                medicine.time;


            if (
                medicine.lastTriggered ===
                triggerKey
            )
                return;


            medicine.lastTriggered =
                triggerKey;


            saveMedicines();


            triggerReminder(
                medicine
            );

        }
    );
}


// =====================================================
// REMINDER MESSAGE
// =====================================================

function buildReminderMessage(
    name
) {

    const lang =
        getLanguage();


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


// =====================================================
// TRIGGER REMINDER
// =====================================================

function triggerReminder(
    medicine
) {

    if (!medicine)
        return;


    if (
        activeReminder !==
        null
    )
        return;


    activeReminder =
        medicine.id;


    const message =
        buildReminderMessage(
            medicine.name
        );


    // Popup

    const popup =
        document.getElementById(
            "reminderPopup"
        );


    const popupName =
        document.getElementById(
            "popupMedicineName"
        );


    const popupText =
        document.getElementById(
            "popupReminderText"
        );


    if (popupName)
        popupName.innerText =
            medicine.name;


    if (popupText)
        popupText.innerText =
            message;


    if (popup)
        popup.classList.add(
            "active"
        );


    // Voice

    speakRegionalVoice(
        message
    );


    // Vibration

    startContinuousVibration();


    // "I took it"

    startTakenVoiceRecognition();


    // Voice every 10 seconds

    reminderLoop =
        setInterval(
            function() {

                if (
                    activeReminder ===
                    null
                ) {

                    return;
                }


                const current =
                    medicines.find(
                        m =>
                            m.id ===
                            activeReminder
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


    // 60 seconds

    reminderTimeout =
        setTimeout(
            function() {

                if (
                    activeReminder !==
                    medicine.id
                )
                    return;


                const current =
                    medicines.find(
                        m =>
                            m.id ===
                            medicine.id
                    );


                clearInterval(
                    reminderLoop
                );

                reminderLoop =
                    null;


                stopVibration();

                stopTakenVoiceRecognition();


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


                    speakRegionalVoice(
                        getMissedMessage(
                            current.name
                        )
                    );


                    sendCaregiverSMS(
                        current
                    );


                    addLog(
                        "Missed: " +
                        current.name
                    );
                }


                closeReminderPopup();


                activeReminder =
                    null;


            },
            60000
        );
}


// =====================================================
// MISSED MESSAGE
// =====================================================

function getMissedMessage(
    name
) {

    const lang =
        getLanguage();


    if (lang === "ta") {

        return `${name} மருந்து எடுத்துக்கொள்ளப்படவில்லை.`;
    }


    if (lang === "hi") {

        return `${name} दवा नहीं ली गई है।`;
    }


    if (lang === "te") {

        return `${name} మందు తీసుకోలేదు.`;
    }


    return `${name} medicine was not taken.`;
}


// =====================================================
// TAKEN VOICE
// =====================================================

function startTakenVoiceRecognition() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition)
        return;


    if (
        activeReminder ===
        null
    )
        return;


    stopTakenVoiceRecognition();


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


    takenVoiceListening =
        true;


    takenVoiceRecognition.onresult =
        function(event) {

            const text =
                event.results[0][0]
                    .transcript
                    .trim()
                    .toLowerCase();


            console.log(
                "Patient said:",
                text
            );


            if (
                detectTakenCommand(
                    text
                )
            ) {

                const id =
                    activeReminder;


                stopTakenVoiceRecognition();


                markTaken(id);

                return;
            }


            if (
                activeReminder !==
                null
            ) {

                setTimeout(
                    startTakenVoiceRecognition,
                    600
                );
            }
        };


    takenVoiceRecognition.onerror =
        function() {

            takenVoiceListening =
                false;


            if (
                activeReminder !==
                null
            ) {

                setTimeout(
                    startTakenVoiceRecognition,
                    1000
                );
            }
        };


    takenVoiceRecognition.onend =
        function() {

            takenVoiceListening =
                false;


            takenVoiceRecognition =
                null;


            if (
                activeReminder !==
                null
            ) {

                const medicine =
                    medicines.find(
                        m =>
                            m.id ===
                            activeReminder
                    );


                if (
                    medicine &&
                    medicine.status ===
                    "pending"
                ) {

                    setTimeout(
                        startTakenVoiceRecognition,
                        700
                    );
                }
            }
        };


    try {

        takenVoiceRecognition.start();

    } catch (error) {

        console.log(error);
    }
}


// =====================================================
// DETECT TAKEN COMMAND
// =====================================================

function detectTakenCommand(
    text
) {

    text =
        String(text)
            .toLowerCase()
            .trim();


    const commands = [

        "i took it",

        "i took the medicine",

        "i took my medicine",

        "i took medicine",

        "medicine taken",

        "i have taken it",

        "i have taken my medicine",

        "taken",

        "done",

        "completed",

        "taken medicine",

        "எடுத்துவிட்டேன்",

        "மருந்து எடுத்துவிட்டேன்",

        "மருந்து எடுத்தேன்",

        "எடுத்தேன்",

        "मैंने दवा ले ली",

        "दवा ले ली",

        "दवा ले लिया",

        "మందు తీసుకున్నాను",

        "మందు తీసుకున్నా"
    ];


    return commands.some(
        command =>
            text.includes(
                command
            )
    );
}


// =====================================================
// STOP TAKEN VOICE
// =====================================================

function stopTakenVoiceRecognition() {

    takenVoiceListening =
        false;


    if (
        takenVoiceRecognition
    ) {

        try {

            takenVoiceRecognition.stop();

        } catch (error) {

            console.log(error);
        }
    }


    takenVoiceRecognition =
        null;
}


// =====================================================
// MARK TAKEN
// =====================================================

function markTaken(
    id
) {

    const medicine =
        medicines.find(
            m =>
                m.id === id
        );


    if (!medicine)
        return;


    medicine.status =
        "taken";


    medicine.takenAt =
        new Date()
            .toISOString();


    saveMedicines();

    renderMedicines();

    updateDashboard();


    if (reminderLoop) {

        clearInterval(
            reminderLoop
        );

        reminderLoop =
            null;
    }


    if (reminderTimeout) {

        clearTimeout(
            reminderTimeout
        );

        reminderTimeout =
            null;
    }


    stopTakenVoiceRecognition();

    stopVibration();


    try {

        window.speechSynthesis.cancel();

    } catch (error) {

        console.log(error);
    }


    if (medicareAudio) {

        medicareAudio.pause();

        medicareAudio = null;
    }


    closeReminderPopup();


    if (
        activeReminder ===
        id
    ) {

        activeReminder =
            null;
    }


    addLog(
        "Taken: " +
        medicine.name
    );


    const lang =
        getLanguage();


    let message;


    if (lang === "ta") {

        message =
            `${medicine.name} மருந்து எடுத்தது பதிவு செய்யப்பட்டது.`;

    } else if (lang === "hi") {

        message =
            `${medicine.name} दवा लेने की जानकारी दर्ज की गई है।`;

    } else if (lang === "te") {

        message =
            `${medicine.name} మందు తీసుకున్నట్లు నమోదు చేయబడింది.`;

    } else {

        message =
            `${medicine.name} medicine marked as taken.`;
    }


    speakRegionalVoice(
        message
    );
}


// =====================================================
// POPUP BUTTON
// =====================================================

function markTakenFromPopup() {

    if (
        activeReminder ===
        null
    )
        return;


    markTaken(
        activeReminder
    );
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

        popup.classList.remove(
            "active"
        );
    }
}


// =====================================================
// STOP REMINDER
// =====================================================

function stopReminderCompletely() {

    if (reminderLoop) {

        clearInterval(
            reminderLoop
        );

        reminderLoop =
            null;
    }


    if (reminderTimeout) {

        clearTimeout(
            reminderTimeout
        );

        reminderTimeout =
            null;
    }


    stopVibration();

    stopTakenVoiceRecognition();


    try {

        window.speechSynthesis.cancel();

    } catch (error) {

        console.log(error);
    }


    if (medicareAudio) {

        medicareAudio.pause();

        medicareAudio = null;
    }


    closeReminderPopup();


    activeReminder =
        null;
}


// =====================================================
// VOICE MEDICINE ENTRY
// =====================================================

function startVoiceMedicineEntry() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        document.getElementById(
            "voiceEntryStatus"
        ).innerText =
            "Voice input is not supported in this browser.";

        return;
    }


    stopVoiceMedicineEntry();


    voiceStep =
        "name";


    updateVoiceStep(
        "name"
    );


    speakBrowserVoice(
        getStepMessage(
            "name"
        ),
        getBrowserLanguage()
    );


    setTimeout(
        function() {

            startVoiceStepRecognition();

        },
        1200
    );
}


// =====================================================
// VOICE STEP MESSAGE
// =====================================================

function getStepMessage(
    step
) {

    const lang =
        getLanguage();


    if (step === "name") {

        if (lang === "ta")
            return "மருந்தின் பெயரை சொல்லுங்கள்.";

        if (lang === "hi")
            return "कृपया दवा का नाम बोलें।";

        if (lang === "te")
            return "దయచేసి మందు పేరు చెప్పండి.";

        return "Please say the medicine name.";
    }


    if (step === "dosage") {

        if (lang === "ta")
            return "இப்போது மருந்தின் அளவை சொல்லுங்கள்.";

        if (lang === "hi")
            return "अब दवा की मात्रा बोलें।";

        if (lang === "te")
            return "ఇప్పుడు మందు మోతాదు చెప్పండి.";

        return "Now please say the dosage.";
    }


    if (step === "time") {

        if (lang === "ta")
            return "இப்போது மருந்து எடுத்துக்கொள்ளும் நேரத்தை சொல்லுங்கள்.";

        if (lang === "hi")
            return "अब दवा लेने का समय बोलें।";

        if (lang === "te")
            return "ఇప్పుడు మందు తీసుకునే సమయం చెప్పండి.";

        return "Now please say the medicine time.";
    }


    if (step === "completed") {

        if (lang === "ta")
            return "மருந்து விவரங்கள் வெற்றிகரமாக சேர்க்கப்பட்டுள்ளன.";

        if (lang === "hi")
            return "दवा की जानकारी सफलतापूर्वक भर दी गई है।";

        if (lang === "te")
            return "మందు వివరాలు విజయవంతంగా నమోదు చేయబడ్డాయి.";

        return "Medicine details have been entered successfully.";
    }


    return "";
}


// =====================================================
// VOICE STEP UI
// =====================================================

function updateVoiceStep(
    step
) {

    const elements =
        document.querySelectorAll(
            ".voice-step"
        );


    elements.forEach(
        element =>
            element.classList.remove(
                "active"
            )
    );


    if (step === "name")
        elements[0]?.classList.add(
            "active"
        );


    if (step === "dosage")
        elements[1]?.classList.add(
            "active"
        );


    if (step === "time")
        elements[2]?.classList.add(
            "active"
        );
}


// =====================================================
// VOICE RECOGNITION
// =====================================================

function startVoiceStepRecognition() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition)
        return;


    if (
        voiceStepRunning ||
        !voiceStep
    )
        return;


    voiceStepRunning =
        true;


    voiceStepRecognition =
        new SpeechRecognition();


    voiceStepRecognition.lang =
        getBrowserLanguage();


    voiceStepRecognition.continuous =
        false;


    voiceStepRecognition.interimResults =
        false;


    voiceStepRecognition.maxAlternatives =
        1;


    const status =
        document.getElementById(
            "voiceEntryStatus"
        );


    if (status) {

        if (
            voiceStep ===
            "name"
        ) {

            status.innerText =
                "Listening for medicine name...";

        } else if (
            voiceStep ===
            "dosage"
        ) {

            status.innerText =
                "Listening for dosage...";

        } else if (
            voiceStep ===
            "time"
        ) {

            status.innerText =
                "Listening for medicine time...";
        }
    }


    voiceStepRecognition.onresult =
        function(event) {

            const text =
                event.results[0][0]
                    .transcript
                    .trim();


            processVoiceStep(
                text
            );
        };


    voiceStepRecognition.onerror =
        function(event) {

            console.log(
                "Voice error:",
                event.error
            );


            voiceStepRunning =
                false;


            voiceStepRecognition =
                null;


            if (status) {

                status.innerText =
                    "I didn't hear that. Please tap the voice button again.";
            }
        };


    voiceStepRecognition.onend =
        function() {

            voiceStepRunning =
                false;

            voiceStepRecognition =
                null;
        };


    try {

        voiceStepRecognition.start();

    } catch (error) {

        console.log(error);

        voiceStepRunning =
            false;
    }
}


// =====================================================
// PROCESS VOICE STEP
// =====================================================

function processVoiceStep(
    text
) {

    text =
        String(text)
            .trim();


    if (!text)
        return;


    const status =
        document.getElementById(
            "voiceEntryStatus"
        );


    // NAME

    if (
        voiceStep ===
        "name"
    ) {

        const nameInput =
            document.getElementById(
                "medicineName"
            );


        nameInput.value =
            text;


        voiceStep =
            "dosage";


        updateVoiceStep(
            "dosage"
        );


        if (status)
            status.innerText =
                "Medicine name captured. Listening for dosage...";


        speakBrowserVoice(
            getStepMessage(
                "dosage"
            ),
            getBrowserLanguage()
        );


        setTimeout(
            startVoiceStepRecognition,
            1200
        );


        return;
    }


    // DOSAGE

    if (
        voiceStep ===
        "dosage"
    ) {

        const dosageInput =
            document.getElementById(
                "dosage"
            );


        dosageInput.value =
            extractDosage(
                text
            );


        voiceStep =
            "time";


        updateVoiceStep(
            "time"
        );


        if (status)
            status.innerText =
                "Dosage captured. Listening for time...";


        speakBrowserVoice(
            getStepMessage(
                "time"
            ),
            getBrowserLanguage()
        );


        setTimeout(
            startVoiceStepRecognition,
            1200
        );


        return;
    }


    // TIME

    if (
        voiceStep ===
        "time"
    ) {

        const time =
            convertSpokenTime(
                text
            );


        if (!time) {

            if (status)
                status.innerText =
                    "Please say a time such as 8 PM.";


            speakBrowserVoice(
                "Please say a time such as 8 PM.",
                getBrowserLanguage()
            );


            setTimeout(
                startVoiceStepRecognition,
                1200
            );


            return;
        }


        document.getElementById(
            "medicineTime"
        ).value =
            time;


        voiceStep =
            null;


        updateVoiceStep(
            null
        );


        if (status)
            status.innerText =
                "✓ All medicine details entered successfully.";


        speakBrowserVoice(
            getStepMessage(
                "completed"
            ),
            getBrowserLanguage()
        );
    }
}


// =====================================================
// DOSAGE EXTRACTION
// =====================================================

function extractDosage(
    text
) {

    const match =
        text.match(
            /\b\d+(?:\.\d+)?\s*(mg|g|mcg|ml|tablet|tablets|capsule|capsules)\b/i
        );


    if (match)
        return match[0];


    return text.trim();
}


// =====================================================
// TIME CONVERSION
// =====================================================

function convertSpokenTime(
    text
) {

    text =
        String(text)
            .toLowerCase()
            .trim();


    // 8 PM / 8:30 PM

    let match =
        text.match(
            /\b(\d{1,2})(?::(\d{2}))?\s*(am|pm)\b/i
        );


    if (match) {

        let hour =
            parseInt(
                match[1],
                10
            );


        const minute =
            parseInt(
                match[2] ||
                "00",
                10
            );


        const period =
            match[3]
                .toLowerCase();


        if (
            period ===
            "pm" &&
            hour !== 12
        )
            hour += 12;


        if (
            period ===
            "am" &&
            hour === 12
        )
            hour = 0;


        return (
            String(hour)
                .padStart(
                    2,
                    "0"
                ) +
            ":" +
            String(minute)
                .padStart(
                    2,
                    "0"
                )
        );
    }


    // 20:30

    match =
        text.match(
            /\b([01]?\d|2[0-3]):([0-5]\d)\b/
        );


    if (match) {

        return (
            String(
                parseInt(
                    match[1],
                    10
                )
            ).padStart(
                2,
                "0"
            ) +
            ":" +
            match[2]
        );
    }


    // eight pm

    const hours = {

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
        const word in hours
    ) {

        if (
            text.includes(word)
        ) {

            let hour =
                hours[word];


            if (
                text.includes("pm") &&
                hour !== 12
            )
                hour += 12;


            if (
                text.includes("am") &&
                hour === 12
            )
                hour = 0;


            return (
                String(hour)
                    .padStart(
                        2,
                        "0"
                    ) +
                ":00"
            );
        }
    }


    return null;
}


// =====================================================
// STOP VOICE ENTRY
// =====================================================

function stopVoiceMedicineEntry() {

    voiceStep =
        null;


    voiceStepRunning =
        false;


    if (
        voiceStepRecognition
    ) {

        try {

            voiceStepRecognition.stop();

        } catch (error) {

            console.log(error);
        }
    }


    voiceStepRecognition =
        null;
}


// =====================================================
// DASHBOARD
// =====================================================

function updateDashboard() {

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


    const completed =
        taken + missed;


    const adherence =
        completed > 0
            ? Math.round(
                taken /
                completed *
                100
            )
            : 0;


    document.getElementById(
        "totalMedicines"
    ).innerText =
        total;


    document.getElementById(
        "takenMedicines"
    ).innerText =
        taken;


    document.getElementById(
        "missedMedicines"
    ).innerText =
        missed;


    document.getElementById(
        "adherence"
    ).innerText =
        adherence +
        "%";


    updateNextReminder();
}


// =====================================================
// NEXT REMINDER
// =====================================================

function updateNextReminder() {

    const element =
        document.getElementById(
            "nextReminder"
        );


    if (!element)
        return;


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


    if (!pending.length) {

        element.innerText =
            "No upcoming reminders.";

        return;
    }


    const next =
        pending[0];


    element.innerText =
        `${next.name} — ${formatTime(next.time)}`;
}


// =====================================================
// CAREGIVER SMS
// =====================================================

function sendCaregiverSMS(
    medicine
) {

    const caregiver =
        localStorage.getItem(
            getCaregiverStorageKey()
        );


    if (!caregiver)
        return;


    const message =
        `${medicine.name} medicine was not taken within 60 seconds.`;


    window.location.href =
        "sms:" +
        caregiver +
        "?body=" +
        encodeURIComponent(
            message
        );
}


// =====================================================
// CALL CAREGIVER
// =====================================================

function callCaregiver() {

    const number =
        localStorage.getItem(
            getCaregiverStorageKey()
        );


    if (!number) {

        alert(
            "Please save caregiver number first."
        );

        return;
    }


    window.location.href =
        "tel:" +
        number;
}


// =====================================================
// EMERGENCY
// =====================================================

function callAmbulance() {

    if (
        confirm(
            "Call emergency number 108?"
        )
    ) {

        window.location.href =
            "tel:108";
    }
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


    if (!log)
        return;


    const item =
        document.createElement(
            "li"
        );


    item.innerText =
        new Date()
            .toLocaleTimeString() +
        " — " +
        message;


    log.prepend(
        item
    );


    while (
        log.children.length >
        20
    ) {

        log.removeChild(
            log.lastChild
        );
    }
}


// =====================================================
// REPORT
// =====================================================

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


    const completed =
        taken + missed;


    const adherence =
        completed
            ? Math.round(
                taken /
                completed *
                100
            )
            : 0;


    const rows =
        medicines
            .map(
                medicine => `

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
                        ${medicine.status}
                    </td>

                </tr>

            `
            )
            .join("");


    const report =
        window.open(
            "",
            "_blank"
        );


    if (!report) {

        alert(
            "Please allow popups."
        );

        return;
    }


    report.document.write(`

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
                    color: #065f46;
                }

                table {
                    width: 100%;
                    border-collapse:
                        collapse;
                    margin-top: 20px;
                }

                th,
                td {
                    border:
                        1px solid #ccc;
                    padding: 10px;
                }

                th {
                    background:
                        #d1fae5;
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
                Total:
                ${total}
                |
                Taken:
                ${taken}
                |
                Missed:
                ${missed}
                |
                Adherence:
                ${adherence}%
            </p>


            <table>

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

                </tr>

                ${rows}

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


    report.document.close();
}


// =====================================================
// LOGOUT
// =====================================================

function logout() {

    stopReminderCompletely();

    stopVoiceMedicineEntry();

    stopTakenVoiceRecognition();

    stopVibration();


    if (
        reminderCheckerTimer
    ) {

        clearInterval(
            reminderCheckerTimer
        );

        reminderCheckerTimer =
            null;
    }


    document.getElementById(
        "dashboard"
    ).style.display =
        "none";


    document.getElementById(
        "loginSection"
    ).style.display =
        "flex";
}


// =====================================================
// PAGE LOAD
// =====================================================

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


        const phoneInput =
            document.getElementById(
                "patientPhone"
            );


        const languageInput =
            document.getElementById(
                "languageSelect"
            );


        if (nameInput)
            nameInput.value =
                patientName;


        if (phoneInput)
            phoneInput.value =
                patientPhone;


        if (languageInput)
            languageInput.value =
                selectedLanguage;


        applyLanguage();


        if (
            patientName &&
            patientPhone
        ) {

            loadMedicines();

            loadCaregiver();

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
        }

    }
);
