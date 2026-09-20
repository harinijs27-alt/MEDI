// ============================================================
// JS MEDICARE - COMPLETE SCRIPT.JS
// Compatible with the HTML you provided
// ============================================================

let medicines = [];
let patientName = "";
let patientPhone = "";
let selectedLanguage = "en";

let reminderLoop = null;
let activeReminder = null;
let reminderTimers = {};


// ============================================================
// TRANSLATIONS
// ============================================================

const translations = {

    en: {
        loginSubtitle: "Right Medicine, Right Time",
        nameLabel: "Patient Name",
        phoneLabel: "Phone Number",
        languageLabel: "Select Language",

        headerSubtitle: "Right Medicine, Right Time",
        aiStatusText: "Monitoring Online",

        totalLabel: "Total Medicines",
        takenLabel: "Taken",
        missedLabel: "Missed",
        adherenceLabel: "Adherence",

        nextReminderTitle: "Next Medication Reminder",
        noReminders: "No reminders",

        addMedicineTitle: "Add Medicine",
        medicineNamePlaceholder: "Medicine name",
        dosagePlaceholder: "Dosage",
        addButton: "Add Medicine",

        medicineListTitle: "Medicine Schedule",

        aiTitle: "AI Healthcare Assistant",
        aiMessage:
            "Your medication schedule is being monitored automatically.",

        caregiverTitle: "Caregiver",
        caregiverPhoneLabel: "Caregiver Phone Number",
        saveCaregiverButton: "Save Caregiver",

        reportTitle: "Medication Report",
        reportTotalText: "Total Medicines",
        reportTakenText: "Medicines Taken",
        reportMissedText: "Medicines Missed",
        reportAdherenceText: "Adherence",
        reportButton: "📄 Generate Detailed PDF Report",

        logTitle: "Activity Log",

        callCaregiverButton: "📞 Call Caregiver",
        ambulanceButton: "🚑 Emergency",
        logoutButton: "Logout",

        pending: "Pending",
        taken: "Taken",
        missed: "Missed",
        markTaken: "💊 I Took It",
        delete: "Delete",

        loginSuccess: "Login successful!",
        enterName: "Please enter patient name.",
        enterPhone: "Please enter phone number.",
        medicineAdded: "Medicine added successfully.",
        enterMedicine: "Please enter medicine name.",
        enterTime: "Please select medicine time.",
        caregiverSaved: "Caregiver number saved."
    },


    ta: {
        loginSubtitle: "சரியான மருந்து, சரியான நேரம்",
        nameLabel: "நோயாளியின் பெயர்",
        phoneLabel: "தொலைபேசி எண்",
        languageLabel: "மொழியைத் தேர்ந்தெடுக்கவும்",

        headerSubtitle: "சரியான மருந்து, சரியான நேரம்",
        aiStatusText: "கண்காணிப்பு இயங்குகிறது",

        totalLabel: "மொத்த மருந்துகள்",
        takenLabel: "எடுத்தது",
        missedLabel: "தவறியது",
        adherenceLabel: "பின்பற்றுதல்",

        nextReminderTitle: "அடுத்த மருந்து நினைவூட்டல்",
        noReminders: "நினைவூட்டல்கள் இல்லை",

        addMedicineTitle: "மருந்தைச் சேர்க்கவும்",
        medicineNamePlaceholder: "மருந்தின் பெயர்",
        dosagePlaceholder: "அளவு",
        addButton: "மருந்தைச் சேர்க்கவும்",

        medicineListTitle: "மருந்து அட்டவணை",

        aiTitle: "AI சுகாதார உதவியாளர்",
        aiMessage:
            "உங்கள் மருந்து அட்டவணை தானாக கண்காணிக்கப்படுகிறது.",

        caregiverTitle: "பராமரிப்பாளர்",
        caregiverPhoneLabel: "பராமரிப்பாளரின் தொலைபேசி எண்",
        saveCaregiverButton: "பராமரிப்பாளரை சேமிக்கவும்",

        reportTitle: "மருந்து அறிக்கை",
        reportTotalText: "மொத்த மருந்துகள்",
        reportTakenText: "எடுத்த மருந்துகள்",
        reportMissedText: "தவறிய மருந்துகள்",
        reportAdherenceText: "பின்பற்றுதல்",
        reportButton: "📄 விரிவான அறிக்கையை உருவாக்கவும்",

        logTitle: "செயல்பாட்டு பதிவு",

        callCaregiverButton: "📞 பராமரிப்பாளரை அழைக்கவும்",
        ambulanceButton: "🚑 அவசரம்",
        logoutButton: "வெளியேறு",

        pending: "நிலுவையில்",
        taken: "எடுத்துக்கொண்டது",
        missed: "தவறியது",
        markTaken: "💊 நான் எடுத்துக்கொண்டேன்",
        delete: "நீக்கு",

        loginSuccess: "உள்நுழைவு வெற்றிகரமாக முடிந்தது!",
        enterName: "நோயாளியின் பெயரை உள்ளிடவும்.",
        enterPhone: "தொலைபேசி எண்ணை உள்ளிடவும்.",
        medicineAdded: "மருந்து வெற்றிகரமாக சேர்க்கப்பட்டது.",
        enterMedicine: "மருந்தின் பெயரை உள்ளிடவும்.",
        enterTime: "மருந்து நேரத்தைத் தேர்ந்தெடுக்கவும்.",
        caregiverSaved: "பராமரிப்பாளர் எண் சேமிக்கப்பட்டது."
    },


    hi: {
        loginSubtitle: "सही दवा, सही समय",
        nameLabel: "मरीज का नाम",
        phoneLabel: "फोन नंबर",
        languageLabel: "भाषा चुनें",

        headerSubtitle: "सही दवा, सही समय",
        aiStatusText: "निगरानी चालू है",

        totalLabel: "कुल दवाएं",
        takenLabel: "ली गई",
        missedLabel: "छूटी",
        adherenceLabel: "अनुपालन",

        nextReminderTitle: "अगला दवा रिमाइंडर",
        noReminders: "कोई रिमाइंडर नहीं",

        addMedicineTitle: "दवा जोड़ें",
        medicineNamePlaceholder: "दवा का नाम",
        dosagePlaceholder: "खुराक",
        addButton: "दवा जोड़ें",

        medicineListTitle: "दवा अनुसूची",

        aiTitle: "AI स्वास्थ्य सहायक",
        aiMessage:
            "आपकी दवा अनुसूची स्वचालित रूप से निगरानी की जा रही है।",

        caregiverTitle: "देखभालकर्ता",
        caregiverPhoneLabel: "देखभालकर्ता फोन नंबर",
        saveCaregiverButton: "देखभालकर्ता सहेजें",

        reportTitle: "दवा रिपोर्ट",
        reportTotalText: "कुल दवाएं",
        reportTakenText: "ली गई दवाएं",
        reportMissedText: "छूटी हुई दवाएं",
        reportAdherenceText: "अनुपालन",
        reportButton: "📄 विस्तृत रिपोर्ट बनाएं",

        logTitle: "गतिविधि लॉग",

        callCaregiverButton: "📞 देखभालकर्ता को कॉल करें",
        ambulanceButton: "🚑 आपातकाल",
        logoutButton: "लॉग आउट",

        pending: "लंबित",
        taken: "ली गई",
        missed: "छूटी",
        markTaken: "💊 मैंने दवा ले ली",
        delete: "हटाएं",

        loginSuccess: "लॉगिन सफल!",
        enterName: "कृपया मरीज का नाम दर्ज करें।",
        enterPhone: "कृपया फोन नंबर दर्ज करें।",
        medicineAdded: "दवा सफलतापूर्वक जोड़ी गई।",
        enterMedicine: "कृपया दवा का नाम दर्ज करें।",
        enterTime: "कृपया दवा का समय चुनें।",
        caregiverSaved: "देखभालकर्ता नंबर सहेजा गया।"
    },


    te: {
        loginSubtitle: "సరైన మందు, సరైన సమయం",
        nameLabel: "రోగి పేరు",
        phoneLabel: "ఫోన్ నంబర్",
        languageLabel: "భాషను ఎంచుకోండి",

        headerSubtitle: "సరైన మందు, సరైన సమయం",
        aiStatusText: "పర్యవేక్షణ ఆన్‌లో ఉంది",

        totalLabel: "మొత్తం మందులు",
        takenLabel: "తీసుకున్నవి",
        missedLabel: "తప్పిపోయినవి",
        adherenceLabel: "అనుసరణ",

        nextReminderTitle: "తదుపరి మందు రిమైండర్",
        noReminders: "రిమైండర్లు లేవు",

        addMedicineTitle: "మందును జోడించండి",
        medicineNamePlaceholder: "మందు పేరు",
        dosagePlaceholder: "మోతాదు",
        addButton: "మందును జోడించండి",

        medicineListTitle: "మందుల షెడ్యూల్",

        aiTitle: "AI ఆరోగ్య సహాయకుడు",
        aiMessage:
            "మీ మందుల షెడ్యూల్ స్వయంచాలకంగా పర్యవేక్షించబడుతోంది.",

        caregiverTitle: "సంరక్షకుడు",
        caregiverPhoneLabel: "సంరక్షకుడి ఫోన్ నంబర్",
        saveCaregiverButton: "సంరక్షకుడిని సేవ్ చేయండి",

        reportTitle: "మందుల నివేదిక",
        reportTotalText: "మొత్తం మందులు",
        reportTakenText: "తీసుకున్న మందులు",
        reportMissedText: "తప్పిపోయిన మందులు",
        reportAdherenceText: "అనుసరణ",
        reportButton: "📄 వివరణాత్మక నివేదికను రూపొందించండి",

        logTitle: "కార్యాచరణ లాగ్",

        callCaregiverButton: "📞 సంరక్షకుడికి కాల్ చేయండి",
        ambulanceButton: "🚑 అత్యవసరం",
        logoutButton: "లాగ్ అవుట్",

        pending: "పెండింగ్",
        taken: "తీసుకున్నారు",
        missed: "తప్పిపోయింది",
        markTaken: "💊 నేను మందు తీసుకున్నాను",
        delete: "తొలగించు",

        loginSuccess: "లాగిన్ విజయవంతమైంది!",
        enterName: "దయచేసి రోగి పేరు నమోదు చేయండి.",
        enterPhone: "దయచేసి ఫోన్ నంబర్ నమోదు చేయండి.",
        medicineAdded: "మందు విజయవంతంగా జోడించబడింది.",
        enterMedicine: "దయచేసి మందు పేరు నమోదు చేయండి.",
        enterTime: "దయచేసి మందు సమయాన్ని ఎంచుకోండి.",
        caregiverSaved: "సంరక్షకుడి నంబర్ సేవ్ చేయబడింది."
    }

};


// ============================================================
// GET LANGUAGE
// ============================================================

function getLanguage() {

    return selectedLanguage || "en";

}


// ============================================================
// CHANGE LANGUAGE
// ============================================================

function changeLanguage(language) {

    if (!language) {
        language = "en";
    }

    selectedLanguage = language;

    localStorage.setItem(
        "medicare_language",
        language
    );

    const loginSelect =
        document.getElementById(
            "languageSelect"
        );

    if (loginSelect) {
        loginSelect.value = language;
    }

    const dashboardSelect =
        document.getElementById(
            "dashboardLanguage"
        );

    if (dashboardSelect) {
        dashboardSelect.value = language;
    }

    applyLanguage();

    renderMedicines();

    updateDashboard();

}


// ============================================================
// APPLY LANGUAGE TO UI
// ============================================================

function applyLanguage() {

    const t =
        translations[
            getLanguage()
        ] || translations.en;


    setText(
        "loginSubtitle",
        t.loginSubtitle
    );

    setText(
        "nameLabel",
        t.nameLabel
    );

    setText(
        "phoneLabel",
        t.phoneLabel
    );

    setText(
        "languageLabel",
        t.languageLabel
    );

    setText(
        "headerSubtitle",
        t.headerSubtitle
    );

    setText(
        "aiStatusText",
        t.aiStatusText
    );

    setText(
        "totalLabel",
        t.totalLabel
    );

    setText(
        "takenLabel",
        t.takenLabel
    );

    setText(
        "missedLabel",
        t.missedLabel
    );

    setText(
        "adherenceLabel",
        t.adherenceLabel
    );

    setText(
        "nextReminderTitle",
        t.nextReminderTitle
    );

    setText(
        "addMedicineTitle",
        t.addMedicineTitle
    );

    setText(
        "medicineListTitle",
        t.medicineListTitle
    );

    setText(
        "aiTitle",
        t.aiTitle
    );

    setText(
        "aiMessage",
        t.aiMessage
    );

    setText(
        "caregiverTitle",
        t.caregiverTitle
    );

    setText(
        "caregiverPhoneLabel",
        t.caregiverPhoneLabel
    );

    setText(
        "saveCaregiverButton",
        t.saveCaregiverButton
    );

    setText(
        "reportTitle",
        t.reportTitle
    );

    setText(
        "reportTotalText",
        t.reportTotalText
    );

    setText(
        "reportTakenText",
        t.reportTakenText
    );

    setText(
        "reportMissedText",
        t.reportMissedText
    );

    setText(
        "reportAdherenceText",
        t.reportAdherenceText
    );

    setText(
        "reportButton",
        t.reportButton
    );

    setText(
        "logTitle",
        t.logTitle
    );

    setText(
        "callCaregiverButton",
        t.callCaregiverButton
    );

    setText(
        "ambulanceButton",
        t.ambulanceButton
    );

    setText(
        "logoutButton",
        t.logoutButton
    );


    const medicineInput =
        document.getElementById(
            "medicineName"
        );

    if (medicineInput) {

        medicineInput.placeholder =
            t.medicineNamePlaceholder;

    }


    const dosageInput =
        document.getElementById(
            "dosage"
        );

    if (dosageInput) {

        dosageInput.placeholder =
            t.dosagePlaceholder;

    }

}


// ============================================================
// SET TEXT
// ============================================================

function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {
        element.textContent = value;
    }

}


// ============================================================
// LOGIN
// ============================================================

function login() {

    console.log(
        "LOGIN BUTTON CLICKED"
    );


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


    if (!nameInput || !phoneInput) {

        alert(
            "Login fields not found."
        );

        return;

    }


    const name =
        nameInput.value.trim();


    const phone =
        phoneInput.value.trim();


    const language =
        languageInput
            ? languageInput.value
            : "en";


    const t =
        translations[
            language
        ] || translations.en;


    if (!name) {

        alert(
            t.enterName
        );

        nameInput.focus();

        return;

    }


    if (!phone) {

        alert(
            t.enterPhone
        );

        phoneInput.focus();

        return;

    }


    // Save information

    patientName =
        name;

    patientPhone =
        phone;

    selectedLanguage =
        language;


    localStorage.setItem(
        "medicare_patientName",
        name
    );

    localStorage.setItem(
        "medicare_patientPhone",
        phone
    );

    localStorage.setItem(
        "medicare_language",
        language
    );

    localStorage.setItem(
        "medicare_loggedIn",
        "true"
    );


    // Copy language to dashboard

    const dashboardLanguage =
        document.getElementById(
            "dashboardLanguage"
        );

    if (dashboardLanguage) {

        dashboardLanguage.value =
            language;

    }


    // Hide LOGIN

    const loginSection =
        document.getElementById(
            "loginSection"
        );


    if (loginSection) {

        loginSection.style.display =
            "none";

    }


    // Show DASHBOARD

    const dashboardSection =
        document.getElementById(
            "dashboardSection"
        );


    if (dashboardSection) {

        dashboardSection.style.display =
            "block";

    }


    // Welcome text

    const welcome =
        document.getElementById(
            "welcomeTitle"
        );


    if (welcome) {

        if (language === "ta") {

            welcome.textContent =
                "வரவேற்கிறோம், " +
                name;

        }

        else if (language === "hi") {

            welcome.textContent =
                "स्वागत है, " +
                name;

        }

        else if (language === "te") {

            welcome.textContent =
                "స్వాగతం, " +
                name;

        }

        else {

            welcome.textContent =
                "Welcome, " +
                name;

        }

    }


    // Load everything

    loadMedicines();

    loadCaregiver();

    renderMedicines();

    updateDashboard();

    applyLanguage();

    startReminderChecker();


    addLog(
        "Login successful for " +
        name
    );


    console.log(
        "LOGIN SUCCESSFUL"
    );

}


// ============================================================
// MOBILE VOICE ENABLE
// ============================================================

function enableMobileVoice() {

    console.log(
        "ENABLE MOBILE VOICE CLICKED"
    );


    if (
        !("speechSynthesis" in window)
    ) {

        alert(
            "Speech is not supported in this browser."
        );

        return;

    }


    const language =
        getVoiceLanguage();


    const text =
        createReminderMessage(
            getTestMedicineName()
        );


    const utterance =
        new SpeechSynthesisUtterance(
            text
        );


    utterance.lang =
        language;


    utterance.rate =
        0.8;


    utterance.volume =
        1;


    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(
        utterance
    );


    const button =
        document.getElementById(
            "voiceEnableButton"
        );


    if (button) {

        button.classList.add(
            "voice-enabled"
        );

        button.textContent =
            "✓ Voice Enabled";

    }


    const status =
        document.getElementById(
            "voiceStatus"
        );


    if (status) {

        status.textContent =
            "✓ Voice enabled";

    }

}


// ============================================================
// VOICE LANGUAGE
// ============================================================

function getVoiceLanguage() {

    const language =
        getLanguage();


    if (language === "ta") {
        return "ta-IN";
    }

    if (language === "hi") {
        return "hi-IN";
    }

    if (language === "te") {
        return "te-IN";
    }

    return "en-IN";

}


// ============================================================
// FIND BROWSER VOICE
// ============================================================

function findVoice(languageCode) {

    const voices =
        speechSynthesis.getVoices();


    if (!voices.length) {
        return null;
    }


    // Exact match

    let voice =
        voices.find(
            function (v) {

                return (
                    v.lang.toLowerCase() ===
                    languageCode.toLowerCase()
                );

            }
        );


    if (voice) {
        return voice;
    }


    // Partial match

    const shortLanguage =
        languageCode
            .substring(0, 2)
            .toLowerCase();


    voice =
        voices.find(
            function (v) {

                return v.lang
                    .toLowerCase()
                    .startsWith(
                        shortLanguage
                    );

            }
        );


    return voice || null;

}


// ============================================================
// CREATE REMINDER MESSAGE
// ============================================================

function createReminderMessage(
    medicineName
) {

    const name =
        String(
            medicineName || ""
        ).trim();


    if (!name) {
        return "";
    }


    const language =
        getLanguage();


    // IMPORTANT:
    // Patient name is NOT spoken.


    if (language === "ta") {

        return (
            name +
            " மருந்தை எடுத்துக்கொள்ளும் நேரம் வந்துவிட்டது."
        );

    }


    if (language === "hi") {

        return (
            name +
            " दवा लेने का समय हो गया है।"
        );

    }


    if (language === "te") {

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
// SPEAK MEDICINE
// ============================================================

function speakMedicine(text) {

    if (!text) {
        return;
    }


    if (
        !("speechSynthesis" in window)
    ) {

        alert(
            "Speech is not supported."
        );

        return;

    }


    try {

        speechSynthesis.cancel();

        speechSynthesis.resume();


        setTimeout(
            function () {

                const language =
                    getVoiceLanguage();


                const voice =
                    findVoice(
                        language
                    );


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


                if (voice) {

                    speech.voice =
                        voice;

                    console.log(
                        "Voice:",
                        voice.name,
                        voice.lang
                    );

                }
                else {

                    console.log(
                        "No voice found for:",
                        language
                    );

                }


                speech.onstart =
                    function () {

                        console.log(
                            "VOICE STARTED"
                        );

                    };


                speech.onend =
                    function () {

                        console.log(
                            "VOICE FINISHED"
                        );

                    };


                speech.onerror =
                    function (event) {

                        console.log(
                            "VOICE ERROR:",
                            event.error
                        );

                    };


                speechSynthesis.speak(
                    speech
                );


            },
            150
        );


    }
    catch (error) {

        console.log(
            "Voice error:",
            error
        );

    }

}


// ============================================================
// GET TEST MEDICINE
// ============================================================

function getTestMedicineName() {

    const input =
        document.getElementById(
            "medicineName"
        );


    if (
        input &&
        input.value.trim()
    ) {

        return input.value.trim();

    }


    const language =
        getLanguage();


    if (language === "ta") {
        return "பாராசிட்டமால்";
    }


    if (language === "hi") {
        return "पैरासिटामोल";
    }


    if (language === "te") {
        return "పారాసిటామాల్";
    }


    return "Paracetamol";

}


// ============================================================
// TEST VOICE
// ============================================================

function testMedicineVoice() {

    const medicineName =
        getTestMedicineName();


    const message =
        createReminderMessage(
            medicineName
        );


    console.log(
        "TEST:",
        message
    );


    speakMedicine(
        message
    );

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


    if (
        !nameInput ||
        !timeInput
    ) {

        alert(
            "Medicine fields not found."
        );

        return;

    }


    const name =
        nameInput.value.trim();


    const dosage =
        dosageInput
            ? dosageInput.value.trim()
            : "";


    const time =
        timeInput.value;


    const t =
        translations[
            getLanguage()
        ] || translations.en;


    if (!name) {

        alert(
            t.enterMedicine
        );

        return;

    }


    if (!time) {

        alert(
            t.enterTime
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

        takenAt:
            null,

        missedAt:
            null,

        lastTriggeredDate:
            null

    };


    medicines.push(
        medicine
    );


    saveMedicines();

    renderMedicines();

    updateDashboard();


    nameInput.value =
        "";


    if (dosageInput) {

        dosageInput.value =
            "";

    }


    addLog(
        "Medicine added: " +
        name +
        " at " +
        time
    );


    alert(
        t.medicineAdded
    );

}


// ============================================================
// SAVE MEDICINES
// ============================================================

function saveMedicines() {

    localStorage.setItem(
        "js_medicare_medicines",
        JSON.stringify(
            medicines
        )
    );

}


// ============================================================
// LOAD MEDICINES
// ============================================================

function loadMedicines() {

    const saved =
        localStorage.getItem(
            "js_medicare_medicines"
        );


    if (saved) {

        try {

            medicines =
                JSON.parse(
                    saved
                );

        }
        catch (error) {

            medicines = [];

        }

    }
    else {

        medicines = [];

    }

}


// ============================================================
// ESCAPE HTML
// ============================================================

function escapeHTML(value) {

    return String(
        value || ""
    )
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


    if (
        medicines.length === 0
    ) {

        container.innerHTML =
            "<p>No medicines added yet.</p>";

        return;

    }


    const t =
        translations[
            getLanguage()
        ] || translations.en;


    container.innerHTML =
        "";


    medicines.forEach(
        function (medicine) {

            let statusClass =
                medicine.status;


            let statusText =
                t.pending;


            if (
                medicine.status ===
                "taken"
            ) {

                statusText =
                    t.taken;

            }


            else if (
                medicine.status ===
                "missed"
            ) {

                statusText =
                    t.missed;

            }


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "medicine-item";


            item.innerHTML = `

                <div class="medicine-info">

                    <h3>
                        💊
                        ${escapeHTML(
                            medicine.name
                        )}
                    </h3>

                    <p>
                        Dosage:
                        ${escapeHTML(
                            medicine.dosage
                        )}
                    </p>

                    <p>
                        ⏰
                        ${escapeHTML(
                            medicine.time
                        )}
                    </p>

                    <p class="status ${statusClass}">
                        ${escapeHTML(
                            statusText
                        )}
                    </p>

                </div>


                <div class="medicine-actions">

                    ${
                        medicine.status ===
                        "pending"
                        ?
                        `
                        <button
                            class="btn-success"
                            onclick="markTaken(${medicine.id})"
                        >
                            ${t.markTaken}
                        </button>
                        `
                        :
                        ""
                    }


                    <button
                        class="btn-danger"
                        onclick="deleteMedicine(${medicine.id})"
                    >
                        🗑️ ${t.delete}
                    </button>

                </div>

            `;


            container.appendChild(
                item
            );

        }
    );

}


// ============================================================
// MARK MEDICINE TAKEN
// ============================================================

function markTaken(id) {

    const medicine =
        medicines.find(
            function (m) {

                return m.id === id;

            }
        );


    if (!medicine) {
        return;
    }


    medicine.status =
        "taken";


    medicine.takenAt =
        new Date()
            .toISOString();


    if (
        reminderTimers[id]
    ) {

        clearTimeout(
            reminderTimers[id]
        );

        delete reminderTimers[id];

    }


    if (
        medicine.missedTimer
    ) {

        clearTimeout(
            medicine.missedTimer
        );

    }


    if (
        activeReminder === id
    ) {

        activeReminder =
            null;

    }


    speechSynthesis.cancel();


    saveMedicines();

    renderMedicines();

    updateDashboard();


    addLog(
        "Medicine taken: " +
        medicine.name
    );

}


// ============================================================
// DELETE MEDICINE
// ============================================================

function deleteMedicine(id) {

    const medicine =
        medicines.find(
            function (m) {

                return m.id === id;

            }
        );


    if (!medicine) {
        return;
    }


    if (
        !confirm(
            "Delete " +
            medicine.name +
            "?"
        )
    ) {

        return;

    }


    medicines =
        medicines.filter(
            function (m) {

                return m.id !== id;

            }
        );


    saveMedicines();

    renderMedicines();

    updateDashboard();


    addLog(
        "Medicine deleted: " +
        medicine.name
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


    console.log(
        "Reminder monitoring started."
    );

}


// ============================================================
// CHECK REMINDER
// ============================================================

function checkMedicationReminder() {

    if (
        !medicines ||
        medicines.length === 0
    ) {

        return;

    }


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
        hours +
        ":" +
        minutes;


    const today =
        now.toDateString();


    medicines.forEach(
        function (medicine) {

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
                medicine.lastTriggeredDate ===
                today
            ) {

                return;

            }


            medicine.lastTriggeredDate =
                today;


            saveMedicines();


            triggerReminder(
                medicine
            );

        }
    );

}


// ============================================================
// TRIGGER REMINDER
// ============================================================

function triggerReminder(
    medicine
) {

    activeReminder =
        medicine.id;


    const message =
        createReminderMessage(
            medicine.name
        );


    console.log(
        "REMINDER:",
        message
    );


    // VISUAL ALERT

    alertReminder(
        medicine
    );


    // VOICE

    speakMedicine(
        message
    );


    // Repeat voice after 10 seconds

    reminderTimers[
        medicine.id
    ] =
        setTimeout(
            function () {

                const current =
                    medicines.find(
                        function (m) {

                            return (
                                m.id ===
                                medicine.id
                            );

                        }
                    );


                if (
                    current &&
                    current.status ===
                    "pending"
                ) {

                    speakMedicine(
                        message
                    );

                }

            },
            10000
        );


    // Demo: missed after 60 seconds

    medicine.missedTimer =
        setTimeout(
            function () {

                const current =
                    medicines.find(
                        function (m) {

                            return (
                                m.id ===
                                medicine.id
                            );

                        }
                    );


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


                    addLog(
                        "Medicine missed: " +
                        current.name
                    );

                }


                activeReminder =
                    null;


            },
            60000
        );

}


// ============================================================
// VISUAL REMINDER
// ============================================================

function alertReminder(
    medicine
) {

    // Flash page title

    document.title =
        "💊 TAKE MEDICINE";


    // Browser vibration

    if (
        navigator.vibrate
    ) {

        navigator.vibrate(
            [
                500,
                300,
                500
            ]
        );

    }


    // Highlight medicine card

    const list =
        document.getElementById(
            "medicineList"
        );


    if (list) {

        list.style.border =
            "4px solid #e53935";

        list.style.padding =
            "10px";

        setTimeout(
            function () {

                list.style.border =
                    "";

                list.style.padding =
                    "";

            },
            15000
        );

    }

}


// ============================================================
// MISSED VOICE
// ============================================================

function speakMissedReminder(
    medicine
) {

    const language =
        getLanguage();


    let message = "";


    if (language === "ta") {

        message =
            medicine.name +
            " மருந்து இன்னும் எடுத்துக்கொள்ளப்படவில்லை.";

    }


    else if (language === "hi") {

        message =
            medicine.name +
            " दवा अभी तक नहीं ली गई है।";

    }


    else if (language === "te") {

        message =
            medicine.name +
            " మందు ఇంకా తీసుకోలేదు.";

    }


    else {

        message =
            medicine.name +
            " has not been taken yet.";

    }


    speakMedicine(
        message
    );

}


// ============================================================
// DASHBOARD
// ============================================================

function updateDashboard() {

    const total =
        medicines.length;


    const taken =
        medicines.filter(
            function (m) {

                return m.status ===
                    "taken";

            }
        ).length;


    const missed =
        medicines.filter(
            function (m) {

                return m.status ===
                    "missed";

            }
        ).length;


    const completed =
        taken +
        missed;


    let adherence =
        0;


    if (completed > 0) {

        adherence =
            Math.round(
                (
                    taken /
                    completed
                ) * 100
            );

    }


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
            function (m) {

                return m.status ===
                    "pending";

            }
        );


    if (
        pending.length === 0
    ) {

        const t =
            translations[
                getLanguage()
            ] || translations.en;


        element.textContent =
            t.noReminders;

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
// CAREGIVER SAVE
// ============================================================

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
        "medicare_caregiverPhone",
        phone
    );


    const t =
        translations[
            getLanguage()
        ] || translations.en;


    alert(
        t.caregiverSaved
    );


    addLog(
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
            "Please save caregiver number first."
        );

        return;

    }


    window.location.href =
        "tel:" +
        phone;

}


// ============================================================
// EMERGENCY
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
            "No caregiver phone number."
        );

        return;

    }


    const language =
        getLanguage();


    let message = "";


    if (language === "ta") {

        message =
            "JS MEDICARE: " +
            medicine.name +
            " மருந்து எடுக்கப்படவில்லை.";

    }


    else if (language === "hi") {

        message =
            "JS MEDICARE: " +
            medicine.name +
            " दवा नहीं ली गई है।";

    }


    else if (language === "te") {

        message =
            "JS MEDICARE: " +
            medicine.name +
            " మందు తీసుకోలేదు.";

    }


    else {

        message =
            "JS MEDICARE: " +
            medicine.name +
            " medicine has not been taken.";

    }


    window.location.href =
        "sms:" +
        phone +
        "?body=" +
        encodeURIComponent(
            message
        );

}


// ============================================================
// ACTIVITY LOG
// ============================================================

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
            "div"
        );


    item.className =
        "log-item";


    item.textContent =
        new Date()
            .toLocaleString() +
        " - " +
        message;


    log.prepend(
        item
    );

}


// ============================================================
// GENERATE REPORT
// ============================================================

function generateMedicationReport() {

    const total =
        medicines.length;


    const taken =
        medicines.filter(
            function (m) {

                return m.status ===
                    "taken";

            }
        ).length;


    const missed =
        medicines.filter(
            function (m) {

                return m.status ===
                    "missed";

            }
        ).length;


    const adherence =
        (
            taken +
            missed
        ) > 0
            ?
            Math.round(
                (
                    taken /
                    (
                        taken +
                        missed
                    )
                ) *
                100
            )
            :
            0;


    let html = `

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
                    color: #00695c;
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
                    background: #e0f2f1;
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
                <b>Patient:</b>
                ${escapeHTML(
                    patientName
                )}
            </p>

            <p>
                <b>Phone:</b>
                ${escapeHTML(
                    patientPhone
                )}
            </p>

            <hr>

            <p>
                <b>Total Medicines:</b>
                ${total}
            </p>

            <p>
                <b>Taken:</b>
                ${taken}
            </p>

            <p>
                <b>Missed:</b>
                ${missed}
            </p>

            <p>
                <b>Adherence:</b>
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
                        ${escapeHTML(
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

            <br>

            <p>
                Generated by JS MEDICARE AI
            </p>

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
            "Please allow popups."
        );

        return;

    }


    reportWindow.document.write(
        html
    );


    reportWindow.document.close();


    setTimeout(
        function () {

            reportWindow.print();

        },
        500
    );

}


// ============================================================
// LOGOUT
// ============================================================

function logout() {

    localStorage.removeItem(
        "medicare_loggedIn"
    );


    const dashboard =
        document.getElementById(
            "dashboardSection"
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


    if (reminderLoop) {

        clearInterval(
            reminderLoop
        );

    }


    console.log(
        "Logged out."
    );

}


// ============================================================
// INITIALIZE
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "JS MEDICARE INITIALIZING..."
        );


        // Load language

        selectedLanguage =
            localStorage.getItem(
                "medicare_language"
            ) || "en";


        const languageSelect =
            document.getElementById(
                "languageSelect"
            );


        if (languageSelect) {

            languageSelect.value =
                selectedLanguage;

        }


        const dashboardLanguage =
            document.getElementById(
                "dashboardLanguage"
            );


        if (dashboardLanguage) {

            dashboardLanguage.value =
                selectedLanguage;

        }


        // Load patient

        patientName =
            localStorage.getItem(
                "medicare_patientName"
            ) || "";


        patientPhone =
            localStorage.getItem(
                "medicare_patientPhone"
            ) || "";


        // Load medicines

        loadMedicines();

        loadCaregiver();


        // Apply language

        applyLanguage();


        // Check previous login

        const loggedIn =
            localStorage.getItem(
                "medicare_loggedIn"
            );


        if (
            loggedIn === "true" &&
            patientName
        ) {

            const loginSection =
                document.getElementById(
                    "loginSection"
                );


            const dashboardSection =
                document.getElementById(
                    "dashboardSection"
                );


            if (loginSection) {

                loginSection.style.display =
                    "none";

            }


            if (dashboardSection) {

                dashboardSection.style.display =
                    "block";

            }


            const welcome =
                document.getElementById(
                    "welcomeTitle"
                );


            if (welcome) {

                welcome.textContent =
                    "Welcome, " +
                    patientName;

            }


            renderMedicines();

            updateDashboard();

            startReminderChecker();

        }


        // Load browser voices

        if (
            "speechSynthesis" in window
        ) {

            speechSynthesis.getVoices();


            speechSynthesis.onvoiceschanged =
                function () {

                    console.log(
                        "Browser voices loaded."
                    );

                };

        }


        console.log(
            "JS MEDICARE READY"
        );

    }
);
