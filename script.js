// =====================================================
// JS MEDICARE - COMPLETE SCRIPT
// =====================================================

let medicines = [];

let activeReminder = null;

let reminderCheckerTimer = null;
let reminderVoiceTimer = null;
let reminderMissTimer = null;

let patientName = "";
let patientPhone = "";
let selectedLanguage = "en";

let voiceUnlocked = false;

// -----------------------------------------------------
// MEDICINE VOICE ENTRY
// -----------------------------------------------------

let voiceRecognition = null;
let voiceEntryActive = false;
let voiceStep = null;
let voiceStarting = false;

// -----------------------------------------------------
// "I TOOK IT" VOICE RECOGNITION
// -----------------------------------------------------

let takenVoiceRecognition = null;
let takenVoiceRestartTimer = null;
let takenVoiceActive = false;

// -----------------------------------------------------
// VIBRATION
// -----------------------------------------------------

let vibrationTimer = null;


// =====================================================
// TRANSLATIONS
// =====================================================

const translations = {

    en: {
        subtitle: "AI Powered Healthcare Assistant",
        aiMonitoring: "AI Monitoring Online",
        welcome: "Welcome",
        totalMedicines: "Total Medicines",
        taken: "Taken",
        missed: "Missed",
        adherence: "Adherence",
        addMedicine: "Add Medicine",
        medicineName: "Medicine Name",
        dosage: "Dosage",
        time: "Time",
        add: "Add Medicine",
        voiceMedicine: "Add Medicine by Voice",
        nextReminder: "Next Reminder",
        caregiver: "Caregiver",
        save: "Save",
        call: "Call Caregiver",
        ambulance: "Emergency",
        report: "Medication Report",
        medicineList: "Medicine List",
        activity: "Activity Log",
        noMedicines: "No medicines added yet.",
        take: "✓ I Took It",
        reminder: "It is time to take your medicine.",
        missedMessage: "Your medicine was not marked as taken.",
        voiceName: "Please say the medicine name.",
        voiceDosage: "Now please say the dosage.",
        voiceTime: "Now please say the medicine time.",
        voiceDone: "Medicine details entered successfully.",
        invalidTime: "Sorry, I could not understand the time.",
        saved: "Caregiver number saved.",
        logout: "Logout"
    },

    ta: {
        subtitle: "AI அடிப்படையிலான சுகாதார உதவியாளர்",
        aiMonitoring: "AI கண்காணிப்பு செயல்பாட்டில் உள்ளது",
        welcome: "வரவேற்கிறோம்",
        totalMedicines: "மொத்த மருந்துகள்",
        taken: "எடுத்தது",
        missed: "தவறியது",
        adherence: "பின்பற்றல்",
        addMedicine: "மருந்து சேர்க்கவும்",
        medicineName: "மருந்தின் பெயர்",
        dosage: "அளவு",
        time: "நேரம்",
        add: "மருந்து சேர்க்கவும்",
        voiceMedicine: "குரல் மூலம் மருந்து சேர்க்கவும்",
        nextReminder: "அடுத்த நினைவூட்டல்",
        caregiver: "பராமரிப்பாளர்",
        save: "சேமிக்கவும்",
        call: "பராமரிப்பாளரை அழைக்கவும்",
        ambulance: "அவசரம்",
        report: "மருந்து அறிக்கை",
        medicineList: "மருந்து பட்டியல்",
        activity: "செயல்பாட்டு பதிவு",
        noMedicines: "மருந்துகள் இன்னும் சேர்க்கப்படவில்லை.",
        take: "✓ நான் எடுத்துவிட்டேன்",
        reminder: "உங்கள் மருந்தை எடுத்துக்கொள்ள வேண்டிய நேரம்.",
        missedMessage: "உங்கள் மருந்து எடுத்ததாக பதிவு செய்யப்படவில்லை.",
        voiceName: "மருந்தின் பெயரை சொல்லுங்கள்.",
        voiceDosage: "இப்போது மருந்தின் அளவை சொல்லுங்கள்.",
        voiceTime: "இப்போது மருந்து நேரத்தை சொல்லுங்கள்.",
        voiceDone: "மருந்து விவரங்கள் வெற்றிகரமாக உள்ளிடப்பட்டன.",
        invalidTime: "மன்னிக்கவும், நேரத்தை புரிந்துகொள்ள முடியவில்லை.",
        saved: "பராமரிப்பாளர் எண் சேமிக்கப்பட்டது.",
        logout: "வெளியேறு"
    },

    hi: {
        subtitle: "AI आधारित स्वास्थ्य सहायक",
        aiMonitoring: "AI निगरानी चालू है",
        welcome: "स्वागत है",
        totalMedicines: "कुल दवाएं",
        taken: "ली गई",
        missed: "छूटी",
        adherence: "अनुपालन",
        addMedicine: "दवा जोड़ें",
        medicineName: "दवा का नाम",
        dosage: "खुराक",
        time: "समय",
        add: "दवा जोड़ें",
        voiceMedicine: "आवाज़ से दवा जोड़ें",
        nextReminder: "अगला रिमाइंडर",
        caregiver: "देखभालकर्ता",
        save: "सहेजें",
        call: "देखभालकर्ता को कॉल करें",
        ambulance: "आपातकाल",
        report: "दवा रिपोर्ट",
        medicineList: "दवा सूची",
        activity: "गतिविधि लॉग",
        noMedicines: "अभी कोई दवा नहीं जोड़ी गई है।",
        take: "✓ मैंने दवा ले ली",
        reminder: "आपकी दवा लेने का समय हो गया है।",
        missedMessage: "आपकी दवा लेने के रूप में दर्ज नहीं हुई।",
        voiceName: "कृपया दवा का नाम बोलें।",
        voiceDosage: "अब कृपया खुराक बोलें।",
        voiceTime: "अब कृपया दवा का समय बोलें।",
        voiceDone: "दवा की जानकारी सफलतापूर्वक दर्ज हो गई।",
        invalidTime: "माफ कीजिए, मैं समय समझ नहीं पाया।",
        saved: "देखभालकर्ता का नंबर सहेजा गया।",
        logout: "लॉग आउट"
    },

    te: {
        subtitle: "AI ఆధారిత ఆరోగ్య సహాయకుడు",
        aiMonitoring: "AI పర్యవేక్షణ ఆన్‌లో ఉంది",
        welcome: "స్వాగతం",
        totalMedicines: "మొత్తం మందులు",
        taken: "తీసుకున్నవి",
        missed: "మిస్ అయినవి",
        adherence: "అనుసరణ",
        addMedicine: "మందు జోడించండి",
        medicineName: "మందు పేరు",
        dosage: "మోతాదు",
        time: "సమయం",
        add: "మందు జోడించండి",
        voiceMedicine: "వాయిస్ ద్వారా మందు జోడించండి",
        nextReminder: "తదుపరి రిమైండర్",
        caregiver: "సంరక్షకుడు",
        save: "సేవ్ చేయండి",
        call: "సంరక్షకుడికి కాల్ చేయండి",
        ambulance: "అత్యవసరం",
        report: "మందుల నివేదిక",
        medicineList: "మందుల జాబితా",
        activity: "కార్యాచరణ లాగ్",
        noMedicines: "ఇంకా మందులు జోడించలేదు.",
        take: "✓ నేను మందు తీసుకున్నాను",
        reminder: "మీ మందు తీసుకునే సమయం వచ్చింది.",
        missedMessage: "మీ మందు తీసుకున్నట్లు నమోదు కాలేదు.",
        voiceName: "దయచేసి మందు పేరు చెప్పండి.",
        voiceDosage: "ఇప్పుడు మోతాదు చెప్పండి.",
        voiceTime: "ఇప్పుడు మందు సమయం చెప్పండి.",
        voiceDone: "మందు వివరాలు విజయవంతంగా నమోదు చేయబడ్డాయి.",
        invalidTime: "క్షమించండి, సమయాన్ని అర్థం చేసుకోలేకపోయాను.",
        saved: "సంరక్షకుడి నంబర్ సేవ్ చేయబడింది.",
        logout: "లాగ్ అవుట్"
    }
};


// =====================================================
// INITIALIZATION
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    loadData();

    applyLanguage();

    updateDashboard();

    renderMedicines();

    startReminderChecker();

});


// =====================================================
// STORAGE
// =====================================================

function saveData() {

    localStorage.setItem(
        "jsMedicareMedicines",
        JSON.stringify(medicines)
    );

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
}


function loadData() {

    try {

        const storedMedicines =
            localStorage.getItem("jsMedicareMedicines");

        if (storedMedicines) {

            medicines =
                JSON.parse(storedMedicines);
        }

    } catch (error) {

        medicines = [];
    }


    patientName =
        localStorage.getItem("jsMedicarePatientName") || "";

    patientPhone =
        localStorage.getItem("jsMedicarePatientPhone") || "";

    selectedLanguage =
        localStorage.getItem("jsMedicareLanguage") || "en";


    const caregiver =
        localStorage.getItem("jsMedicareCaregiver");

    if (caregiver) {

        const input =
            document.getElementById("caregiverPhone");

        if (input) {
            input.value = caregiver;
        }
    }
}


// =====================================================
// LANGUAGE
// =====================================================

function getText(key) {

    return (
        translations[selectedLanguage] &&
        translations[selectedLanguage][key]
    ) || translations.en[key] || key;
}


function getBrowserLanguage() {

    const languages = {

        en: "en-IN",
        ta: "ta-IN",
        hi: "hi-IN",
        te: "te-IN"

    };

    return languages[selectedLanguage] || "en-IN";
}


function applyLanguage() {

    const lang =
        document.getElementById("languageSelect");

    if (lang) {
        lang.value = selectedLanguage;
    }

    const dashboardLang =
        document.getElementById("dashboardLanguage");

    if (dashboardLang) {
        dashboardLang.value = selectedLanguage;
    }


    const subtitle =
        document.getElementById("subtitle");

    if (subtitle) {
        subtitle.textContent = getText("subtitle");
    }


    const aiStatus =
        document.getElementById("aiStatus");

    if (aiStatus) {
        aiStatus.textContent = getText("aiMonitoring");
    }


    const welcome =
        document.getElementById("welcomeText");

    if (welcome && patientName) {

        welcome.textContent =
            getText("welcome") + ", " + patientName;
    }


    updateLanguageButtons();
}


function changeLanguage(value) {

    selectedLanguage = value;

    saveData();

    applyLanguage();
}


function updateLanguageButtons() {

    const elements =
        document.querySelectorAll("[data-i18n]");

    elements.forEach(function (element) {

        const key =
            element.getAttribute("data-i18n");

        if (translations[selectedLanguage] &&
            translations[selectedLanguage][key]) {

            element.textContent =
                translations[selectedLanguage][key];
        }

    });
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
        nameInput ? nameInput.value.trim() : "";

    patientPhone =
        phoneInput ? phoneInput.value.trim() : "";

    selectedLanguage =
        languageInput ?
        languageInput.value :
        "en";


    if (!patientName) {

        alert(
            selectedLanguage === "ta"
                ? "தயவுசெய்து நோயாளியின் பெயரை உள்ளிடவும்."
                : "Please enter patient name."
        );

        return;
    }


    saveData();

    applyLanguage();


    const loginSection =
        document.getElementById("loginSection");

    const dashboard =
        document.getElementById("dashboard");


    if (loginSection) {
        loginSection.style.display = "none";
    }

    if (dashboard) {
        dashboard.style.display = "block";
    }


    updateDashboard();

    enableMobileVoice();

    speakText(
        getText("welcome") + " " + patientName
    );
}


// =====================================================
// VOICE UNLOCK
// =====================================================

function enableMobileVoice() {

    voiceUnlocked = true;

    try {

        if ("speechSynthesis" in window) {

            const utterance =
                new SpeechSynthesisUtterance("");

            utterance.volume = 0;

            window.speechSynthesis.speak(
                utterance
            );
        }

    } catch (error) {}

    const status =
        document.getElementById("voiceStatus");

    if (status) {

        status.textContent =
            selectedLanguage === "ta"
                ? "குரல் செயல்பாடு இயக்கப்பட்டுள்ளது"
                : "Voice enabled";
    }
}


// =====================================================
// SPEECH SYNTHESIS
// =====================================================

function speakText(text, callback) {

    if (!("speechSynthesis" in window)) {

        if (callback) {
            callback();
        }

        return;
    }


    window.speechSynthesis.cancel();


    const utterance =
        new SpeechSynthesisUtterance(text);

    utterance.lang =
        getBrowserLanguage();

    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;


    const voices =
        window.speechSynthesis.getVoices();


    const matchingVoice =
        voices.find(function (voice) {

            return voice.lang
                .toLowerCase()
                .startsWith(
                    getBrowserLanguage()
                        .split("-")[0]
                );

        });


    if (matchingVoice) {
        utterance.voice =
            matchingVoice;
    }


    utterance.onend = function () {

        if (callback) {
            callback();
        }
    };


    utterance.onerror = function () {

        if (callback) {
            callback();
        }
    };


    window.speechSynthesis.speak(
        utterance
    );
}


function stopAllSpeech() {

    if ("speechSynthesis" in window) {

        window.speechSynthesis.cancel();
    }
}


// =====================================================
// ADD MEDICINE
// =====================================================

function addMedicine() {

    const nameInput =
        document.getElementById("medicineName");

    const dosageInput =
        document.getElementById("dosage");

    const timeInput =
        document.getElementById("medicineTime");


    const name =
        nameInput ?
        nameInput.value.trim() :
        "";

    const dosage =
        dosageInput ?
        dosageInput.value.trim() :
        "";

    const time =
        timeInput ?
        timeInput.value :
        "";


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

    saveData();

    renderMedicines();

    updateDashboard();

    updateNextReminder();

    logActivity(
        `Medicine "${name}" added`
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


    speakText(
        `${name} ${getText("voiceDone")}`
    );
}


// =====================================================
// VOICE MEDICINE ENTRY
// =====================================================

function startVoiceMedicineEntry() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        alert(
            "Voice recognition is not supported in this browser. Please use Google Chrome."
        );

        return;
    }


    stopVoiceMedicineEntry();


    voiceEntryActive = true;
    voiceStep = "name";


    clearVoiceFields();

    updateVoiceStepUI("name");


    speakText(
        getText("voiceName"),
        function () {

            if (voiceEntryActive) {

                startVoiceStepRecognition();
            }

        }
    );
}


// =====================================================
// CLEAR VOICE FIELDS
// =====================================================

function clearVoiceFields() {

    const name =
        document.getElementById("medicineName");

    const dosage =
        document.getElementById("dosage");

    const time =
        document.getElementById("medicineTime");


    if (name) name.value = "";
    if (dosage) dosage.value = "";
    if (time) time.value = "";
}


// =====================================================
// START ONE VOICE STEP
// =====================================================

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


    if (voiceStarting) {
        return;
    }


    voiceStarting = true;


    if (voiceRecognition) {

        try {
            voiceRecognition.stop();
        } catch (e) {}

        voiceRecognition = null;
    }


    voiceRecognition =
        new SpeechRecognition();


    voiceRecognition.lang =
        getBrowserLanguage();

    voiceRecognition.continuous = false;
    voiceRecognition.interimResults = false;
    voiceRecognition.maxAlternatives = 3;


    voiceRecognition.onstart =
        function () {

            voiceStarting = false;

            console.log(
                "Voice listening:",
                voiceStep
            );
        };


    voiceRecognition.onresult =
        function (event) {

            if (!voiceEntryActive) {
                return;
            }


            let text = "";


            for (
                let i = event.resultIndex;
                i < event.results.length;
                i++
            ) {

                text +=
                    event.results[i][0]
                        .transcript + " ";
            }


            text =
                text.trim();


            console.log(
                "Voice input:",
                text
            );


            processVoiceStep(
                voiceStep,
                text
            );
        };


    voiceRecognition.onerror =
        function (event) {

            voiceStarting = false;

            console.log(
                "Voice entry error:",
                event.error
            );


            if (
                event.error ===
                "not-allowed"
            ) {

                voiceEntryActive = false;

                alert(
                    "Please allow microphone access and try again."
                );
            }
        };


    voiceRecognition.onend =
        function () {

            voiceStarting = false;

            voiceRecognition = null;

            // Do NOT automatically change step here.
            // processVoiceStep() controls the next step.
        };


    try {

        voiceRecognition.start();

    } catch (error) {

        voiceStarting = false;

        console.log(
            "Could not start voice recognition:",
            error
        );
    }
}


// =====================================================
// PROCESS VOICE STEP
// =====================================================

function processVoiceStep(
    step,
    text
) {

    if (!text) {
        return;
    }


    // -------------------------------------------------
    // MEDICINE NAME
    // -------------------------------------------------

    if (step === "name") {

        const input =
            document.getElementById(
                "medicineName"
            );


        if (input) {
            input.value = text;
        }


        voiceStep = "dosage";

        updateVoiceStepUI("dosage");


        speakText(
            getText("voiceDosage"),
            function () {

                if (voiceEntryActive) {

                    startVoiceStepRecognition();
                }

            }
        );


        return;
    }


    // -------------------------------------------------
    // DOSAGE
    // -------------------------------------------------

    if (step === "dosage") {

        const dosage =
            extractDosage(text);


        const input =
            document.getElementById(
                "dosage"
            );


        if (input) {
            input.value = dosage;
        }


        voiceStep = "time";

        updateVoiceStepUI("time");


        speakText(
            getText("voiceTime"),
            function () {

                if (voiceEntryActive) {

                    startVoiceStepRecognition();
                }

            }
        );


        return;
    }


    // -------------------------------------------------
    // TIME
    // -------------------------------------------------

    if (step === "time") {

        const convertedTime =
            convertSpokenTime(text);


        if (!convertedTime) {

            speakText(
                getText("invalidTime"),
                function () {

                    if (voiceEntryActive) {

                        startVoiceStepRecognition();
                    }

                }
            );

            return;
        }


        const input =
            document.getElementById(
                "medicineTime"
            );


        if (input) {
            input.value = convertedTime;
        }


        voiceEntryActive = false;

        voiceStep = null;

        updateVoiceStepUI("done");


        speakText(
            getText("voiceDone")
        );


        const status =
            document.getElementById(
                "voiceEntryStatus"
            );


        if (status) {

            status.textContent =
                getText("voiceDone");
        }
    }
}


// =====================================================
// EXTRACT DOSAGE
// =====================================================

function extractDosage(text) {

    text =
        text.trim();


    // 500 mg
    const mg =
        text.match(
            /(\d+(?:\.\d+)?)\s*(mg|milligram|milligrams)/i
        );

    if (mg) {

        return (
            mg[1] +
            " mg"
        );
    }


    // ml
    const ml =
        text.match(
            /(\d+(?:\.\d+)?)\s*(ml|milliliter|milliliters)/i
        );

    if (ml) {

        return (
            ml[1] +
            " ml"
        );
    }


    // tablet
    const tablet =
        text.match(
            /(\d+(?:\.\d+)?)\s*(tablet|tablets)/i
        );

    if (tablet) {

        return (
            tablet[1] +
            " tablet"
        );
    }


    // capsule
    const capsule =
        text.match(
            /(\d+(?:\.\d+)?)\s*(capsule|capsules)/i
        );

    if (capsule) {

        return (
            capsule[1] +
            " capsule"
        );
    }


    return text;
}


// =====================================================
// CONVERT SPOKEN TIME
// =====================================================

function convertSpokenTime(text) {

    let value =
        text
            .toLowerCase()
            .trim();


    value =
        value
            .replace(/o'clock/g, "")
            .replace(/a\.?\s*m\.?/g, "am")
            .replace(/p\.?\s*m\.?/g, "pm")
            .replace(/\s+/g, " ")
            .trim();


    // 8:30 pm
    let match =
        value.match(
            /^(\d{1,2}):(\d{2})\s*(am|pm)?$/i
        );


    if (match) {

        let hour =
            parseInt(match[1]);

        const minute =
            parseInt(match[2]);

        const period =
            match[3];


        if (
            period &&
            period.toLowerCase() === "pm" &&
            hour < 12
        ) {

            hour += 12;
        }


        if (
            period &&
            period.toLowerCase() === "am" &&
            hour === 12
        ) {

            hour = 0;
        }


        if (
            hour >= 0 &&
            hour <= 23 &&
            minute >= 0 &&
            minute <= 59
        ) {

            return (
                String(hour).padStart(2, "0") +
                ":" +
                String(minute).padStart(2, "0")
            );
        }
    }


    // 8 pm
    match =
        value.match(
            /^(\d{1,2})\s*(am|pm)$/i
        );


    if (match) {

        let hour =
            parseInt(match[1]);

        const period =
            match[2].toLowerCase();


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


        if (
            hour >= 0 &&
            hour <= 23
        ) {

            return (
                String(hour).padStart(2, "0") +
                ":00"
            );
        }
    }


    // Number words
    const numbers = {

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


    let normalized =
        value
            .replace(/\s+/g, " ")
            .trim();


    for (
        const word in numbers
    ) {

        if (
            normalized.includes(word)
        ) {

            let hour =
                numbers[word];


            if (
                normalized.includes("pm")
            ) {

                if (hour < 12) {
                    hour += 12;
                }
            }


            if (
                normalized.includes("am") &&
                hour === 12
            ) {

                hour = 0;
            }


            if (
                normalized.includes("am") ||
                normalized.includes("pm")
            ) {

                return (
                    String(hour).padStart(2, "0") +
                    ":00"
                );
            }
        }
    }


    // 24-hour format
    match =
        value.match(
            /^(\d{1,2})$/
        );


    if (match) {

        const hour =
            parseInt(match[1]);


        if (
            hour >= 0 &&
            hour <= 23
        ) {

            return (
                String(hour).padStart(2, "0") +
                ":00"
            );
        }
    }


    return null;
}


// =====================================================
// VOICE STEP UI
// =====================================================

function updateVoiceStepUI(step) {

    const status =
        document.getElementById(
            "voiceEntryStatus"
        );


    if (status) {

        if (step === "name") {

            status.textContent =
                getText("voiceName");
        }

        else if (step === "dosage") {

            status.textContent =
                getText("voiceDosage");
        }

        else if (step === "time") {

            status.textContent =
                getText("voiceTime");
        }

        else if (step === "done") {

            status.textContent =
                getText("voiceDone");
        }
    }


    const steps =
        document.querySelectorAll(
            ".voice-step"
        );


    steps.forEach(function (element) {

        element.classList.remove(
            "active"
        );

        element.classList.remove(
            "completed"
        );


        const value =
            element.getAttribute(
                "data-step"
            );


        if (value === step) {

            element.classList.add(
                "active"
            );
        }
    });
}


// =====================================================
// STOP MEDICINE VOICE ENTRY
// =====================================================

function stopVoiceMedicineEntry() {

    voiceEntryActive = false;

    voiceStarting = false;

    voiceStep = null;


    if (voiceRecognition) {

        try {
            voiceRecognition.stop();
        } catch (e) {}

        try {
            voiceRecognition.abort();
        } catch (e) {}

        voiceRecognition = null;
    }
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


    list.innerHTML = "";


    if (medicines.length === 0) {

        list.innerHTML =
            `<div class="empty-state">
                ${getText("noMedicines")}
            </div>`;

        return;
    }


    medicines.forEach(function (medicine) {

        const item =
            document.createElement("div");


        item.className =
            "medicine-item";


        const statusText =
            medicine.status === "taken"
                ? "Taken"
                : medicine.status === "missed"
                    ? "Missed"
                    : "Pending";


        item.innerHTML = `

            <div class="medicine-info">

                <h3>
                    ${escapeHtml(medicine.name)}
                </h3>

                <p>
                    ${escapeHtml(medicine.dosage)}
                </p>

                <p>
                    ⏰ ${escapeHtml(medicine.time)}
                </p>

            </div>

            <div class="medicine-status ${medicine.status}">
                ${statusText}
            </div>
        `;


        list.appendChild(item);
    });
}


// =====================================================
// ESCAPE HTML
// =====================================================

function escapeHtml(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// =====================================================
// DASHBOARD
// =====================================================

function updateDashboard() {

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


    const adherence =
        total === 0
            ? 0
            : Math.round(
                (taken / total) * 100
            );


    setElementText(
        "totalMedicines",
        total
    );

    setElementText(
        "takenMedicines",
        taken
    );

    setElementText(
        "missedMedicines",
        missed
    );

    setElementText(
        "adherence",
        adherence + "%"
    );


    updateNextReminder();


    const welcome =
        document.getElementById(
            "welcomeText"
        );


    if (
        welcome &&
        patientName
    ) {

        welcome.textContent =
            getText("welcome") +
            ", " +
            patientName;
    }
}


function setElementText(
    id,
    value
) {

    const element =
        document.getElementById(id);

    if (element) {
        element.textContent = value;
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
            "--";

        return;
    }


    element.textContent =
        pending[0].name +
        " - " +
        pending[0].time;
}


// =====================================================
// REMINDER CHECKER
// =====================================================

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


// =====================================================
// CHECK REMINDERS
// =====================================================

function checkReminders() {

    if (activeReminder) {
        return;
    }


    const now =
        new Date();


    const currentHour =
        String(
            now.getHours()
        ).padStart(2, "0");


    const currentMinute =
        String(
            now.getMinutes()
        ).padStart(2, "0");


    const currentTime =
        currentHour +
        ":" +
        currentMinute;


    medicines.forEach(
        function (medicine) {

            if (
                medicine.status ===
                "pending" &&
                medicine.time ===
                currentTime
            ) {

                const lastTriggered =
                    medicine.lastTriggeredDate;


                const today =
                    now.toISOString()
                        .split("T")[0];


                if (
                    lastTriggered !==
                    today
                ) {

                    medicine.lastTriggeredDate =
                        today;

                    saveData();

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
        medicine;


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


    if (popupName) {

        popupName.textContent =
            medicine.name;
    }


    if (popupText) {

        popupText.textContent =
            getText("reminder");
    }


    if (popup) {

        popup.classList.add(
            "show"
        );

        popup.style.display =
            "flex";
    }


    // Voice reminder
    speakReminder(
        medicine
    );


    // Vibration
    startContinuousVibration();


    // IMPORTANT:
    // Listen for "I took it"
    startTakenVoiceRecognition();


    // Repeat voice every 10 seconds
    clearInterval(
        reminderVoiceTimer
    );


    reminderVoiceTimer =
        setInterval(
            function () {

                if (activeReminder) {

                    speakReminder(
                        activeReminder
                    );
                }

            },
            10000
        );


    // Miss after 60 seconds
    clearTimeout(
        reminderMissTimer
    );


    reminderMissTimer =
        setTimeout(
            function () {

                if (
                    activeReminder &&
                    activeReminder.id ===
                    medicine.id &&
                    medicine.status ===
                    "pending"
                ) {

                    markMissed(
                        medicine.id
                    );
                }

            },
            60000
        );
}


// =====================================================
// SPEAK REMINDER
// =====================================================

function speakReminder(
    medicine
) {

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


// =====================================================
// MARK TAKEN FROM BUTTON
// =====================================================

function markTakenFromPopup() {

    if (!activeReminder) {
        return;
    }


    markTaken(
        activeReminder.id
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
            m => m.id === id
        );


    if (!medicine) {
        return;
    }


    medicine.status =
        "taken";


    medicine.takenAt =
        new Date()
            .toISOString();


    saveData();


    // STOP EVERYTHING
    stopTakenVoiceRecognition();

    stopContinuousVibration();

    clearInterval(
        reminderVoiceTimer
    );

    clearTimeout(
        reminderMissTimer
    );

    stopAllSpeech();


    activeReminder =
        null;


    closeReminderPopup();


    renderMedicines();

    updateDashboard();


    logActivity(
        `Medicine "${medicine.name}" marked as taken`
    );
}


// =====================================================
// MARK MISSED
// =====================================================

function markMissed(
    id
) {

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
        new Date()
            .toISOString();


    saveData();


    stopTakenVoiceRecognition();

    stopContinuousVibration();

    clearInterval(
        reminderVoiceTimer
    );


    stopAllSpeech();


    activeReminder =
        null;


    closeReminderPopup();


    renderMedicines();

    updateDashboard();


    logActivity(
        `Medicine "${medicine.name}" missed`
    );


    speakText(
        medicine.name +
        ". " +
        getText("missedMessage")
    );


    sendCaregiverSMS(
        medicine
    );
}


// =====================================================
// CLOSE REMINDER POPUP
// =====================================================

function closeReminderPopup() {

    const popup =
        document.getElementById(
            "reminderPopup"
        );


    if (popup) {

        popup.classList.remove(
            "show"
        );

        popup.style.display =
            "none";
    }
}


// =====================================================
// CONTINUOUS VIBRATION
// =====================================================

function startContinuousVibration() {

    stopContinuousVibration();


    if (
        !navigator.vibrate
    ) {

        console.log(
            "Vibration API not supported on this device."
        );

        return;
    }


    // Start immediately
    try {

        navigator.vibrate([
            500,
            150,
            500,
            150,
            500
        ]);

    } catch (error) {}


    // Repeat vibration
    vibrationTimer =
        setInterval(
            function () {

                if (
                    activeReminder &&
                    navigator.vibrate
                ) {

                    try {

                        navigator.vibrate([
                            500,
                            150,
                            500,
                            150,
                            500
                        ]);

                    } catch (error) {}
                }

            },
            2000
        );
}


// =====================================================
// STOP VIBRATION
// =====================================================

function stopContinuousVibration() {

    clearInterval(
        vibrationTimer
    );

    vibrationTimer =
        null;


    if (
        navigator.vibrate
    ) {

        try {
            navigator.vibrate(0);
        } catch (error) {}
    }
}


// =====================================================
// "I TOOK IT" VOICE RECOGNITION
// =====================================================

function startTakenVoiceRecognition() {

    stopTakenVoiceRecognition();


    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        console.log(
            "Speech Recognition not supported."
        );

        return;
    }


    if (!activeReminder) {
        return;
    }


    takenVoiceActive =
        true;


    createTakenVoiceRecognition();
}


// =====================================================
// CREATE FRESH "I TOOK IT" LISTENER
// =====================================================

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


    takenVoiceRecognition.onstart =
        function () {

            console.log(
                "🎤 Listening for: I took it"
            );
        };


    takenVoiceRecognition.onresult =
        function (event) {

            let heardText =
                "";


            for (
                let i = event.resultIndex;
                i < event.results.length;
                i++
            ) {

                heardText +=
                    event.results[i][0]
                        .transcript +
                    " ";
            }


            heardText =
                heardText
                    .toLowerCase()
                    .trim()
                    .replace(
                        /[.,!?]/g,
                        ""
                    )
                    .replace(
                        /\s+/g,
                        " "
                    );


            console.log(
                "Heard:",
                heardText
            );


            if (
                detectTakenCommand(
                    heardText
                )
            ) {

                console.log(
                    "✅ TAKEN COMMAND DETECTED"
                );


                takenVoiceActive =
                    false;


                try {
                    takenVoiceRecognition.stop();
                } catch (e) {}


                if (activeReminder) {

                    markTaken(
                        activeReminder.id
                    );
                }
            }
        };


    takenVoiceRecognition.onerror =
        function (event) {

            console.log(
                "Taken voice error:",
                event.error
            );


            if (
                !takenVoiceActive ||
                !activeReminder
            ) {

                return;
            }


            if (
                event.error ===
                    "no-speech" ||

                event.error ===
                    "audio-capture" ||

                event.error ===
                    "network" ||

                event.error ===
                    "aborted"
            ) {

                scheduleTakenVoiceRestart();
            }
        };


    takenVoiceRecognition.onend =
        function () {

            console.log(
                "🎤 Taken voice recognition ended"
            );


            if (
                takenVoiceActive &&
                activeReminder
            ) {

                scheduleTakenVoiceRestart();
            }
        };


    try {

        takenVoiceRecognition.start();

    } catch (error) {

        console.log(
            "Could not start taken recognition:",
            error
        );


        scheduleTakenVoiceRestart();
    }
}


// =====================================================
// RESTART "I TOOK IT" LISTENER
// =====================================================

function scheduleTakenVoiceRestart() {

    if (
        !takenVoiceActive ||
        !activeReminder
    ) {

        return;
    }


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


// =====================================================
// DETECT TAKEN COMMAND
// =====================================================

function detectTakenCommand(
    text
) {

    if (!text) {
        return false;
    }


    text =
        text
            .toLowerCase()
            .trim()
            .replace(
                /[.,!?]/g,
                ""
            )
            .replace(
                /\s+/g,
                " "
            );


    // -------------------------------------------------
    // ENGLISH
    // -------------------------------------------------

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

        "finished"
    ];


    for (
        const command of englishCommands
    ) {

        if (
            text === command ||
            text.includes(command)
        ) {

            console.log(
                "English command matched:",
                command
            );

            return true;
        }
    }


    // -------------------------------------------------
    // TAMIL
    // -------------------------------------------------

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
            text.includes(command)
        ) {

            console.log(
                "Tamil command matched:",
                command
            );

            return true;
        }
    }


    // -------------------------------------------------
    // HINDI
    // -------------------------------------------------

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
            text.includes(command)
        ) {

            console.log(
                "Hindi command matched:",
                command
            );

            return true;
        }
    }


    // -------------------------------------------------
    // TELUGU
    // -------------------------------------------------

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
            text.includes(command)
        ) {

            console.log(
                "Telugu command matched:",
                command
            );

            return true;
        }
    }


    return false;
}


// =====================================================
// STOP "I TOOK IT" LISTENER
// =====================================================

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
        } catch (e) {}


        try {
            takenVoiceRecognition.abort();
        } catch (e) {}


        takenVoiceRecognition =
            null;
    }
}


// =====================================================
// CAREGIVER
// =====================================================

function saveCaregiver() {

    const input =
        document.getElementById(
            "caregiverPhone"
        );


    if (!input) {
        return;
    }


    const number =
        input.value.trim();


    if (!number) {

        alert(
            "Please enter caregiver phone number."
        );

        return;
    }


    localStorage.setItem(
        "jsMedicareCaregiver",
        number
    );


    alert(
        getText("saved")
    );


    logActivity(
        "Caregiver number saved"
    );
}


// =====================================================
// CALL CAREGIVER
// =====================================================

function callCaregiver() {

    const input =
        document.getElementById(
            "caregiverPhone"
        );


    const number =
        input ?
        input.value.trim() :
        localStorage.getItem(
            "jsMedicareCaregiver"
        );


    if (!number) {

        alert(
            "Please enter caregiver phone number."
        );

        return;
    }


    window.location.href =
        "tel:" + number;
}


// =====================================================
// EMERGENCY
// =====================================================

function callAmbulance() {

    window.location.href =
        "tel:108";
}


// =====================================================
// CAREGIVER SMS
// =====================================================

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


    const message =
        `JS MEDICARE ALERT: ${medicine.name} (${medicine.dosage}) was not marked as taken within 60 seconds.`;

    const smsUrl =
        "sms:" +
        caregiver +
        "?body=" +
        encodeURIComponent(
            message
        );


    window.location.href =
        smsUrl;
}


// =====================================================
// ACTIVITY LOG
// =====================================================

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


    const time =
        new Date()
            .toLocaleTimeString();


    const item =
        document.createElement(
            "div"
        );


    item.className =
        "activity-item";


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


// =====================================================
// MEDICATION REPORT
// =====================================================

function generateMedicationReport() {

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


    let rows = "";


    medicines.forEach(
        function (medicine) {

            rows += `
                <tr>
                    <td>
                        ${escapeHtml(medicine.name)}
                    </td>

                    <td>
                        ${escapeHtml(medicine.dosage)}
                    </td>

                    <td>
                        ${escapeHtml(medicine.time)}
                    </td>

                    <td>
                        ${medicine.status}
                    </td>
                </tr>
            `;
        }
    );


    reportWindow.document.write(`

        <!DOCTYPE html>

        <html>

        <head>

            <title>
                JS MEDICARE - Medication Report
            </title>

            <style>

                body {
                    font-family: Arial, sans-serif;
                    padding: 40px;
                }

                h1 {
                    color: #16804b;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 25px;
                }

                th,
                td {
                    border: 1px solid #ccc;
                    padding: 12px;
                    text-align: left;
                }

                th {
                    background: #e9f8f0;
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
                ${escapeHtml(patientName)}
            </p>

            <p>
                Generated:
                ${new Date().toLocaleString()}
            </p>

            <table>

                <thead>

                    <tr>
                        <th>Medicine</th>
                        <th>Dosage</th>
                        <th>Time</th>
                        <th>Status</th>
                    </tr>

                </thead>

                <tbody>

                    ${rows}

                </tbody>

            </table>

        </body>

        </html>
    `);


    reportWindow.document.close();


    reportWindow.onload =
        function () {

            reportWindow.print();
        };
}


// =====================================================
// LOGOUT
// =====================================================

function logout() {

    stopVoiceMedicineEntry();

    stopTakenVoiceRecognition();

    stopContinuousVibration();

    stopAllSpeech();


    clearInterval(
        reminderCheckerTimer
    );

    clearInterval(
        reminderVoiceTimer
    );

    clearTimeout(
        reminderMissTimer
    );


    activeReminder =
        null;


    closeReminderPopup();


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
            "block";
    }
}
