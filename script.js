```javascript
/* =========================================================
   MEDICARE AI
   SMART MEDICATION REMINDER
   REGIONAL LANGUAGE VOICE
   NO BUZZER / NO ALARM SOUND
   ========================================================= */


/* =========================================================
   GLOBAL VARIABLES
   ========================================================= */

let medicines = [];

let activeReminder = null;

let reminderLoop = null;

let reminderRepeatTimer = null;

let missedTimer = null;


/* =========================================================
   TRANSLATIONS
   ========================================================= */

const translations = {

    en: {

        aiPowered: "AI Powered Healthcare Assistant",
        monitoring: "AI Monitoring Online",

        welcome: "Welcome",
        loginSuccessful: "Login Successful",
        preparing: "AI Healthcare Assistant is Preparing...",

        dashboardTitle: "AI Healthcare Assistant",
        dashboardSubtitle: "Smart Medication Monitoring System",
        aiOnline: "AI Online",

        patientProfile: "Patient Profile",
        nextReminder: "Next Reminder",

        totalMedicine: "Total Medicines",
        taken: "Taken",
        missed: "Missed",
        adherence: "Adherence",

        addMedicine: "Add Medicine",
        medicineName: "Medicine Name",
        dosage: "Dosage",
        medicineTime: "Reminder Time",
        addMedicineButton: "Add Medicine",

        medicineSchedule: "Today's Medicines",
        noMedicines: "No medicines added yet.",

        markTaken: "Taken",
        pending: "Pending",
        missedStatus: "Missed",

        callCaregiver: "Call Caregiver",
        emergency: "Emergency / Ambulance",

        aiAssistant: "AI Health Assistant",

        healthMessage:
            "Please take your medicines on time and keep your caregiver informed.",

        medicationReport: "Medicine Report",

        reportTotal: "Total",
        reportTaken: "Taken",
        reportMissed: "Missed",
        reportAdherence: "Adherence",

        downloadReport: "Download Report",

        activityLogs: "Activity Logs",

        login: "Login",

        patientName: "Patient Name",
        patientAge: "Age",
        patientPhone: "Phone Number",
        caregiverPhone: "Caregiver Number",
        language: "Language",

        logout: "Logout",
        darkMode: "Dark Mode",

        voiceReminder:
            "It is time to take your medicine",

        reminderMissed:
            "Your medicine reminder was missed.",

        caregiverAlert:
            "was not marked as taken.",

        invalidDetails:
            "Please fill all required details.",

        medicineAdded:
            "Medicine added successfully.",

        medicineAlreadyExists:
            "This medicine is already added for the selected time.",

        noActivity:
            "No activity yet.",

        noMedicinesReport:
            "No medicines available.",

        caregiverUnavailable:
            "Caregiver phone number is not available.",

        voiceUnsupported:
            "Voice reminder is not supported in this browser."
    },


    /* =====================================================
       TAMIL
       ===================================================== */

    ta: {

        aiPowered:
            "AI சுகாதார உதவியாளர்",

        monitoring:
            "AI கண்காணிப்பு செயல்பாட்டில் உள்ளது",

        welcome:
            "வரவேற்கிறோம்",

        loginSuccessful:
            "உள்நுழைவு வெற்றிகரமாக முடிந்தது",

        preparing:
            "AI சுகாதார உதவியாளர் தயாராகிறது...",

        dashboardTitle:
            "AI சுகாதார உதவியாளர்",

        dashboardSubtitle:
            "ஸ்மார்ட் மருந்து கண்காணிப்பு அமைப்பு",

        aiOnline:
            "AI செயல்பாட்டில்",

        patientProfile:
            "நோயாளி விவரம்",

        nextReminder:
            "அடுத்த நினைவூட்டல்",

        totalMedicine:
            "மொத்த மருந்துகள்",

        taken:
            "எடுத்தது",

        missed:
            "தவறியது",

        adherence:
            "பின்பற்றல்",

        addMedicine:
            "மருந்து சேர்க்கவும்",

        medicineName:
            "மருந்தின் பெயர்",

        dosage:
            "அளவு",

        medicineTime:
            "நினைவூட்டல் நேரம்",

        addMedicineButton:
            "மருந்து சேர்க்கவும்",

        medicineSchedule:
            "இன்றைய மருந்துகள்",

        noMedicines:
            "இதுவரை மருந்துகள் சேர்க்கப்படவில்லை.",

        markTaken:
            "எடுத்துவிட்டேன்",

        pending:
            "நிலுவையில்",

        missedStatus:
            "தவறியது",

        callCaregiver:
            "பராமரிப்பாளரை அழைக்கவும்",

        emergency:
            "அவசரம் / ஆம்புலன்ஸ்",

        aiAssistant:
            "AI சுகாதார உதவியாளர்",

        healthMessage:
            "உங்கள் மருந்துகளை சரியான நேரத்தில் எடுத்துக்கொண்டு, பராமரிப்பாளருக்கு தகவல் தெரிவிக்கவும்.",

        medicationReport:
            "மருந்து அறிக்கை",

        reportTotal:
            "மொத்தம்",

        reportTaken:
            "எடுத்தது",

        reportMissed:
            "தவறியது",

        reportAdherence:
            "பின்பற்றல்",

        downloadReport:
            "அறிக்கையை பதிவிறக்கவும்",

        activityLogs:
            "செயல்பாட்டு பதிவுகள்",

        login:
            "உள்நுழைவு",

        patientName:
            "நோயாளியின் பெயர்",

        patientAge:
            "வயது",

        patientPhone:
            "தொலைபேசி எண்",

        caregiverPhone:
            "பராமரிப்பாளர் எண்",

        language:
            "மொழி",

        logout:
            "வெளியேறு",

        darkMode:
            "இருண்ட பயன்முறை",

        voiceReminder:
            "மருந்தை எடுத்துக்கொள்ளும் நேரம் இது",

        reminderMissed:
            "உங்கள் மருந்து நினைவூட்டல் தவறிவிட்டது.",

        caregiverAlert:
            "மருந்து எடுத்ததாக பதிவு செய்யப்படவில்லை.",

        invalidDetails:
            "தேவையான அனைத்து விவரங்களையும் நிரப்பவும்.",

        medicineAdded:
            "மருந்து வெற்றிகரமாக சேர்க்கப்பட்டது.",

        medicineAlreadyExists:
            "தேர்ந்தெடுக்கப்பட்ட நேரத்திற்கு இந்த மருந்து ஏற்கனவே சேர்க்கப்பட்டுள்ளது.",

        noActivity:
            "இதுவரை செயல்பாடு இல்லை.",

        noMedicinesReport:
            "மருந்துகள் எதுவும் இல்லை.",

        caregiverUnavailable:
            "பராமரிப்பாளர் தொலைபேசி எண் இல்லை.",

        voiceUnsupported:
            "இந்த உலாவியில் குரல் நினைவூட்டல் ஆதரிக்கப்படவில்லை."
    },


    /* =====================================================
       HINDI
       ===================================================== */

    hi: {

        aiPowered:
            "AI स्वास्थ्य सहायक",

        monitoring:
            "AI निगरानी सक्रिय है",

        welcome:
            "स्वागत है",

        loginSuccessful:
            "लॉगिन सफल हुआ",

        preparing:
            "AI स्वास्थ्य सहायक तैयार हो रहा है...",

        dashboardTitle:
            "AI स्वास्थ्य सहायक",

        dashboardSubtitle:
            "स्मार्ट दवा निगरानी प्रणाली",

        aiOnline:
            "AI ऑनलाइन",

        patientProfile:
            "रोगी विवरण",

        nextReminder:
            "अगला रिमाइंडर",

        totalMedicine:
            "कुल दवाइयाँ",

        taken:
            "ली गई",

        missed:
            "छूटी",

        adherence:
            "अनुपालन",

        addMedicine:
            "दवा जोड़ें",

        medicineName:
            "दवा का नाम",

        dosage:
            "खुराक",

        medicineTime:
            "रिमाइंडर समय",

        addMedicineButton:
            "दवा जोड़ें",

        medicineSchedule:
            "आज की दवाइयाँ",

        noMedicines:
            "अभी तक कोई दवा नहीं जोड़ी गई है।",

        markTaken:
            "ली गई",

        pending:
            "लंबित",

        missedStatus:
            "छूटी",

        callCaregiver:
            "देखभालकर्ता को कॉल करें",

        emergency:
            "आपातकाल / एम्बुलेंस",

        aiAssistant:
            "AI स्वास्थ्य सहायक",

        healthMessage:
            "कृपया अपनी दवाइयाँ समय पर लें और अपने देखभालकर्ता को सूचित रखें।",

        medicationReport:
            "दवा रिपोर्ट",

        reportTotal:
            "कुल",

        reportTaken:
            "ली गई",

        reportMissed:
            "छूटी",

        reportAdherence:
            "अनुपालन",

        downloadReport:
            "रिपोर्ट डाउनलोड करें",

        activityLogs:
            "गतिविधि लॉग",

        login:
            "लॉगिन",

        patientName:
            "रोगी का नाम",

        patientAge:
            "आयु",

        patientPhone:
            "फोन नंबर",

        caregiverPhone:
            "देखभालकर्ता नंबर",

        language:
            "भाषा",

        logout:
            "लॉगआउट",

        darkMode:
            "डार्क मोड",

        voiceReminder:
            "दवा लेने का समय हो गया है",

        reminderMissed:
            "आपका दवा रिमाइंडर छूट गया।",

        caregiverAlert:
            "दवा लेने की पुष्टि नहीं हुई।",

        invalidDetails:
            "कृपया सभी आवश्यक विवरण भरें।",

        medicineAdded:
            "दवा सफलतापूर्वक जोड़ दी गई।",

        medicineAlreadyExists:
            "चयनित समय के लिए यह दवा पहले से जोड़ी गई है।",

        noActivity:
            "अभी तक कोई गतिविधि नहीं है।",

        noMedicinesReport:
            "कोई दवा उपलब्ध नहीं है।",

        caregiverUnavailable:
            "देखभालकर्ता का फोन नंबर उपलब्ध नहीं है।",

        voiceUnsupported:
            "इस ब्राउज़र में वॉइस रिमाइंडर समर्थित नहीं है।"
    },


    /* =====================================================
       TELUGU
       ===================================================== */

    te: {

        aiPowered:
            "AI ఆరోగ్య సహాయకుడు",

        monitoring:
            "AI పర్యవేక్షణ సక్రియంగా ఉంది",

        welcome:
            "స్వాగతం",

        loginSuccessful:
            "లాగిన్ విజయవంతమైంది",

        preparing:
            "AI ఆరోగ్య సహాయకుడు సిద్ధమవుతోంది...",

        dashboardTitle:
            "AI ఆరోగ్య సహాయకుడు",

        dashboardSubtitle:
            "స్మార్ట్ మందుల పర్యవేక్షణ వ్యవస్థ",

        aiOnline:
            "AI ఆన్‌లైన్",

        patientProfile:
            "రోగి వివరాలు",

        nextReminder:
            "తదుపరి రిమైండర్",

        totalMedicine:
            "మొత్తం మందులు",

        taken:
            "తీసుకున్నవి",

        missed:
            "మిస్ అయినవి",

        adherence:
            "అనుసరణ",

        addMedicine:
            "మందు జోడించండి",

        medicineName:
            "మందు పేరు",

        dosage:
            "మోతాదు",

        medicineTime:
            "రిమైండర్ సమయం",

        addMedicineButton:
            "మందు జోడించండి",

        medicineSchedule:
            "ఈరోజు మందులు",

        noMedicines:
            "ఇంకా మందులు జోడించబడలేదు.",

        markTaken:
            "తీసుకున్నాను",

        pending:
            "పెండింగ్",

        missedStatus:
            "మిస్ అయింది",

        callCaregiver:
            "సంరక్షకుడికి కాల్ చేయండి",

        emergency:
            "అత్యవసరం / అంబులెన్స్",

        aiAssistant:
            "AI ఆరోగ్య సహాయకుడు",

        healthMessage:
            "దయచేసి మీ మందులను సమయానికి తీసుకుని సంరక్షకుడికి సమాచారం ఇవ్వండి.",

        medicationReport:
            "మందుల నివేదిక",

        reportTotal:
            "మొత్తం",

        reportTaken:
            "తీసుకున్నవి",

        reportMissed:
            "మిస్ అయినవి",

        reportAdherence:
            "అనుసరణ",

        downloadReport:
            "నివేదికను డౌన్‌లోడ్ చేయండి",

        activityLogs:
            "కార్యకలాప లాగ్‌లు",

        login:
            "లాగిన్",

        patientName:
            "రోగి పేరు",

        patientAge:
            "వయస్సు",

        patientPhone:
            "ఫోన్ నంబర్",

        caregiverPhone:
            "సంరక్షకుడి నంబర్",

        language:
            "భాష",

        logout:
            "లాగౌట్",

        darkMode:
            "డార్క్ మోడ్",

        voiceReminder:
            "మందు తీసుకునే సమయం వచ్చింది",

        reminderMissed:
            "మీ మందు రిమైండర్ మిస్ అయింది.",

        caregiverAlert:
            "మందు తీసుకున్నట్లు నిర్ధారించబడలేదు.",

        invalidDetails:
            "దయచేసి అవసరమైన అన్ని వివరాలను నమోదు చేయండి.",

        medicineAdded:
            "మందు విజయవంతంగా జోడించబడింది.",

        medicineAlreadyExists:
            "ఎంచుకున్న సమయానికి ఈ మందు ఇప్పటికే జోడించబడింది.",

        noActivity:
            "ఇంకా కార్యకలాపం లేదు.",

        noMedicinesReport:
            "మందులు అందుబాటులో లేవు.",

        caregiverUnavailable:
            "సంరక్షకుడి ఫోన్ నంబర్ అందుబాటులో లేదు.",

        voiceUnsupported:
            "ఈ బ్రౌజర్‌లో వాయిస్ రిమైండర్‌కు మద్దతు లేదు."
    }
};


/* =========================================================
   LANGUAGE HELPERS
   ========================================================= */

function getLanguage() {

    return localStorage.getItem("selectedLanguage") || "en";
}


function getTranslation() {

    return translations[getLanguage()] || translations.en;
}


/* =========================================================
   APPLY LANGUAGE
   ========================================================= */

function applyLanguage(lang) {

    if (!translations[lang]) {
        lang = "en";
    }

    localStorage.setItem(
        "selectedLanguage",
        lang
    );

    const t = translations[lang];


    /* =====================================================
       LANGUAGE SELECTOR
       ===================================================== */

    const language =
        document.getElementById("language");

    if (language) {
        language.value = lang;
    }


    /* =====================================================
       LOGIN PAGE
       ===================================================== */

    const loginCard =
        document.querySelector(".login-card");

    if (loginCard) {

        const subtitle =
            loginCard.querySelector(".subtitle");

        if (subtitle) {
            subtitle.innerText =
                t.aiPowered;
        }


        const aiStatus =
            loginCard.querySelector(".ai-status");

        if (aiStatus) {

            const dot =
                aiStatus.querySelector(".dot");

            aiStatus.innerText =
                t.monitoring;

            if (dot) {
                aiStatus.prepend(dot);
            }
        }


        const labels =
            loginCard.querySelectorAll("label");

        labels.forEach(function(label) {

            const input =
                label.querySelector("input, select");

            if (!input) return;

            const icon =
                label.querySelector("i");

            let text = "";

            if (input.id === "patientName") {
                text = t.patientName;
            }

            else if (input.id === "patientAge") {
                text = t.patientAge;
            }

            else if (input.id === "patientPhone") {
                text = t.patientPhone;
            }

            else if (input.id === "caregiverLogin") {
                text = t.caregiverPhone;
            }

            else if (input.id === "language") {
                text = t.language;
            }

            label.innerHTML = "";

            if (icon) {
                label.appendChild(icon);
            }

            label.appendChild(
                document.createTextNode(" " + text)
            );
        });


        const loginButton =
            loginCard.querySelector(
                'button[onclick="loginPatient()"]'
            );

        if (loginButton) {

            loginButton.innerHTML =
                `<i class="fa-solid fa-right-to-bracket"></i> ${t.login}`;
        }
    }


    /* =====================================================
       WELCOME
       ===================================================== */

    const welcomeSection =
        document.getElementById(
            "welcomeSection"
        );

    if (welcomeSection) {

        const welcomeParagraphs =
            welcomeSection.querySelectorAll("p");

        welcomeParagraphs.forEach(function(p) {

            const text =
                p.innerText;

            if (
                text.includes("Login Successful") ||
                text.includes("உள்நுழைவு") ||
                text.includes("लॉगिन") ||
                text.includes("లాగిన్")
            ) {

                p.innerText =
                    t.loginSuccessful;
            }

            else if (
                text.includes("AI Healthcare") ||
                text.includes("AI சுகாதார") ||
                text.includes("AI स्वास्थ्य") ||
                text.includes("AI ఆరోగ్య")
            ) {

                p.innerText =
                    t.preparing;
            }
        });
    }


    /* =====================================================
       DASHBOARD HEADER
       ===================================================== */

    const dashboard =
        document.getElementById(
            "dashboardSection"
        );

    if (dashboard) {

        const subtitle =
            dashboard.querySelector(
                ".dashboard-header .subtitle"
            );

        if (subtitle) {
            subtitle.innerText =
                t.dashboardSubtitle;
        }


        const online =
            dashboard.querySelector(
                ".status-online"
            );

        if (online) {

            const dot =
                online.querySelector(
                    ".online-dot"
                );

            online.innerText =
                t.aiOnline;

            if (dot) {
                online.prepend(dot);
            }
        }
    }


    /* =====================================================
       PATIENT PROFILE
       ===================================================== */

    const profileTitle =
        document.querySelector(
            ".profile-card h3"
        );

    if (profileTitle) {
        profileTitle.innerText =
            t.patientProfile;
    }


    /* =====================================================
       NEXT REMINDER
       ===================================================== */

    const nextTitle =
        document.querySelector(
            ".next-reminder-card h2"
        );

    if (nextTitle) {
        nextTitle.innerText =
            "⏰ " + t.nextReminder;
    }


    /* =====================================================
       DASHBOARD CARDS
       ===================================================== */

    const cardTitles =
        document.querySelectorAll(
            ".dashboard-card h3"
        );

    cardTitles.forEach(function(title) {

        const text =
            title.innerText.trim();

        if (
            text.includes("Total") ||
            text.includes("மொத்த") ||
            text.includes("कुल") ||
            text.includes("మొత్తం")
        ) {

            if (
                title.closest(".total")
            ) {
                title.innerText =
                    t.totalMedicine;
            }
        }

        else if (
            text.includes("Taken") ||
            text.includes("எடுத்த") ||
            text.includes("ली गई") ||
            text.includes("తీసుకున్న")
        ) {

            if (
                title.closest(".taken")
            ) {
                title.innerText =
                    t.taken;
            }
        }

        else if (
            text.includes("Missed") ||
            text.includes("தவற") ||
            text.includes("छूटी") ||
            text.includes("మిస్")
        ) {

            if (
                title.closest(".missed")
            ) {
                title.innerText =
                    t.missed;
            }
        }

        else if (
            text.includes("Adherence") ||
            text.includes("பின்பற்ற") ||
            text.includes("अनुपालन") ||
            text.includes("అనుసరణ")
        ) {

            if (
                title.closest(".score")
            ) {
                title.innerText =
                    t.adherence;
            }
        }
    });


    /* =====================================================
       ADD MEDICINE
       ===================================================== */

    const sectionTitles =
        document.querySelectorAll(
            ".section-title"
        );

    sectionTitles.forEach(function(title) {

        const text =
            title.innerText;

        if (
            text.includes("Add Medicine") ||
            text.includes("மருந்து சேர்க்க") ||
            text.includes("दवा जोड़") ||
            text.includes("మందు జోడ")
        ) {

            title.innerText =
                "💊 " + t.addMedicine;
        }

        else if (
            text.includes("Today's Medicines") ||
            text.includes("இன்றைய") ||
            text.includes("आज की") ||
            text.includes("ఈరోజు")
        ) {

            title.innerText =
                t.medicineSchedule;
        }
    });


    /* =====================================================
       MEDICINE INPUT LABELS
       ===================================================== */

    const medicineInputs =
        document.querySelectorAll(
            "#dashboardSection .input-group label"
        );

    medicineInputs.forEach(function(label) {

        const input =
            label.nextElementSibling;

        if (!input) return;

        if (input.id === "medicineName") {
            label.innerText =
                t.medicineName;
        }

        else if (input.id === "dosage") {
            label.innerText =
                t.dosage;
        }

        else if (input.id === "medicineTime") {
            label.innerText =
                t.medicineTime;
        }
    });


    const addButton =
        document.querySelector(
            'button[onclick="addMedicine()"]'
        );

    if (addButton) {

        addButton.innerHTML =
            `<i class="fa-solid fa-plus"></i> ${t.addMedicineButton}`;
    }


    /* =====================================================
       QUICK ACTIONS
       ===================================================== */

    const caregiverButton =
        document.querySelector(
            'button[onclick="callCaregiver()"]'
        );

    if (caregiverButton) {
        caregiverButton.innerText =
            "📞 " + t.callCaregiver;
    }


    const ambulanceButton =
        document.querySelector(
            'button[onclick="callAmbulance()"]'
        );

    if (ambulanceButton) {
        ambulanceButton.innerText =
            "🚑 " + t.emergency;
    }


    /* =====================================================
       AI ASSISTANT
       ===================================================== */

    const aiTitle =
        document.querySelector(
            ".ai-assistant h2"
        );

    if (aiTitle) {
        aiTitle.innerText =
            "🤖 " + t.aiAssistant;
    }


    const healthMessage =
        document.getElementById(
            "healthMessage"
        );

    if (healthMessage) {
        healthMessage.innerText =
            t.healthMessage;
    }


    /* =====================================================
       REPORT
       ===================================================== */

    const reportTitle =
        document.querySelector(
            ".report-card > h2"
        );

    if (reportTitle) {
        reportTitle.innerText =
            "📋 " + t.medicationReport;
    }


    const reportCards =
        document.querySelectorAll(
            ".report-card .dashboard-card"
        );

    reportCards.forEach(function(card) {

        const p =
            card.querySelector("p");

        if (!p) return;

        const text =
            p.innerText.trim();

        if (
            text === "Total"
        ) {
            p.innerText =
                t.reportTotal;
        }

        else if (
            text === "Taken"
        ) {
            p.innerText =
                t.reportTaken;
        }

        else if (
            text === "Missed"
        ) {
            p.innerText =
                t.reportMissed;
        }

        else if (
            text === "Adherence"
        ) {
            p.innerText =
                t.reportAdherence;
        }
    });


    const downloadButton =
        document.querySelector(
            'button[onclick="downloadReport()"]'
        );

    if (downloadButton) {

        downloadButton.innerHTML =
            `<i class="fa-solid fa-download"></i> ${t.downloadReport}`;
    }


    /* =====================================================
       LOGS
       ===================================================== */

    const logsTitle =
        document.querySelector(
            ".logs h2"
        );

    if (logsTitle) {

        logsTitle.innerHTML =
            `<i class="fa-solid fa-clock-rotate-left"></i> ${t.activityLogs}`;
    }


    /* =====================================================
       SETTINGS
       ===================================================== */

    const darkButton =
        document.querySelector(
            'button[onclick="toggleDarkMode()"]'
        );

    if (darkButton) {

        darkButton.innerHTML =
            `<i class="fa-solid fa-moon"></i> ${t.darkMode}`;
    }


    const logoutButton =
        document.querySelector(
            'button[onclick="logout()"]'
        );

    if (logoutButton) {

        logoutButton.innerHTML =
            `<i class="fa-solid fa-right-from-bracket"></i> ${t.logout}`;
    }


    loadMedicines();

    updateDashboard();
}


/* =========================================================
   PATIENT STORAGE
   ========================================================= */

function getPatientPhone() {

    return localStorage.getItem(
        "patientPhone"
    ) || "";
}


function medicineStorageKey() {

    return "medicines_" +
        getPatientPhone();
}


function logStorageKey() {

    return "logs_" +
        getPatientPhone();
}


/* =========================================================
   CLOCK
   ========================================================= */

function updateClock() {

    const clock =
        document.getElementById(
            "clock"
        );

    if (!clock) return;

    const now =
        new Date();

    clock.innerText =
        now.toLocaleTimeString();
}


setInterval(
    updateClock,
    1000
);

updateClock();


/* =========================================================
   LOGIN
   ========================================================= */

function loginPatient() {

    const name =
        document.getElementById(
            "patientName"
        )?.value.trim();

    const age =
        document.getElementById(
            "patientAge"
        )?.value.trim();

    const phone =
        document.getElementById(
            "patientPhone"
        )?.value.trim();

    const caregiver =
        document.getElementById(
            "caregiverLogin"
        )?.value.trim();

    const language =
        document.getElementById(
            "language"
        )?.value || "en";


    if (
        !name ||
        !age ||
        !phone ||
        !caregiver
    ) {

        alert(
            translations[language]
                .invalidDetails
        );

        return;
    }


    localStorage.setItem(
        "patientName",
        name
    );

    localStorage.setItem(
        "patientAge",
        age
    );

    localStorage.setItem(
        "patientPhone",
        phone
    );

    localStorage.setItem(
        "caregiverPhone",
        caregiver
    );

    localStorage.setItem(
        "selectedLanguage",
        language
    );


    medicines =
        JSON.parse(
            localStorage.getItem(
                medicineStorageKey()
            )
        ) || [];


    const loginSection =
        document.getElementById(
            "loginSection"
        );

    const welcomeSection =
        document.getElementById(
            "welcomeSection"
        );

    const dashboardSection =
        document.getElementById(
            "dashboardSection"
        );


    if (loginSection) {
        loginSection.style.display =
            "none";
    }

    if (welcomeSection) {
        welcomeSection.style.display =
            "block";
    }

    if (dashboardSection) {
        dashboardSection.style.display =
            "none";
    }


    const welcomeUser =
        document.getElementById(
            "welcomeUser"
        );

    if (welcomeUser) {

        welcomeUser.innerText =
            translations[language].welcome +
            ", " +
            name +
            "!";
    }


    applyLanguage(
        language
    );


    setTimeout(function() {

        if (welcomeSection) {
            welcomeSection.style.display =
                "none";
        }

        if (dashboardSection) {
            dashboardSection.style.display =
                "block";
        }


        const welcomeText =
            document.getElementById(
                "welcomeText"
            );

        if (welcomeText) {

            welcomeText.innerText =
                translations[
                    getLanguage()
                ].welcome +
                ", " +
                name +
                "!";
        }


        loadProfile();

        loadMedicines();

        updateDashboard();

        startReminderChecker();

    }, 3000);
}


/* =========================================================
   AUTO LOGIN
   ========================================================= */

window.addEventListener(
    "DOMContentLoaded",
    function() {

        const savedName =
            localStorage.getItem(
                "patientName"
            );

        const savedPhone =
            localStorage.getItem(
                "patientPhone"
            );

        const savedLanguage =
            localStorage.getItem(
                "selectedLanguage"
            ) || "en";


        const languageElement =
            document.getElementById(
                "language"
            );


        if (languageElement) {

            languageElement.value =
                savedLanguage;

            languageElement.onchange =
                function() {

                    applyLanguage(
                        this.value
                    );

                };
        }


        if (
            !savedName ||
            !savedPhone
        ) {

            applyLanguage(
                savedLanguage
            );

            return;
        }


        medicines =
            JSON.parse(
                localStorage.getItem(
                    "medicines_" +
                    savedPhone
                )
            ) || [];


        const loginSection =
            document.getElementById(
                "loginSection"
            );

        const welcomeSection =
            document.getElementById(
                "welcomeSection"
            );

        const dashboardSection =
            document.getElementById(
                "dashboardSection"
            );


        if (loginSection) {
            loginSection.style.display =
                "none";
        }

        if (welcomeSection) {
            welcomeSection.style.display =
                "block";
        }

        if (dashboardSection) {
            dashboardSection.style.display =
                "none";
        }


        const welcomeUser =
            document.getElementById(
                "welcomeUser"
            );

        if (welcomeUser) {

            welcomeUser.innerText =
                translations[
                    savedLanguage
                ].welcome +
                ", " +
                savedName +
                "!";
        }


        applyLanguage(
            savedLanguage
        );


        setTimeout(function() {

            if (welcomeSection) {
                welcomeSection.style.display =
                    "none";
            }

            if (dashboardSection) {
                dashboardSection.style.display =
                    "block";
            }


            loadProfile();

            loadMedicines();

            updateDashboard();

            startReminderChecker();

        }, 3000);

    }
);


/* =========================================================
   PROFILE
   ========================================================= */

function loadProfile() {

    const profile =
        document.getElementById(
            "patientProfile"
        );

    if (!profile) return;


    const name =
        localStorage.getItem(
            "patientName"
        ) || "";

    const age =
        localStorage.getItem(
            "patientAge"
        ) || "";

    const phone =
        localStorage.getItem(
            "patientPhone"
        ) || "";

    const caregiver =
        localStorage.getItem(
            "caregiverPhone"
        ) || "";


    profile.innerHTML = `

        <strong>${name}</strong><br>

        ${translations[getLanguage()].patientAge}:
        ${age}<br>

        ${translations[getLanguage()].patientPhone}:
        ${phone}<br>

        ${translations[getLanguage()].caregiverPhone}:
        ${caregiver}

    `;
}


/* =========================================================
   ADD MEDICINE
   ========================================================= */

function addMedicine() {

    const name =
        document.getElementById(
            "medicineName"
        )?.value.trim();

    const dosage =
        document.getElementById(
            "dosage"
        )?.value.trim();

    const time =
        document.getElementById(
            "medicineTime"
        )?.value;


    if (
        !name ||
        !dosage ||
        !time
    ) {

        alert(
            getTranslation()
                .invalidDetails
        );

        return;
    }


    const alreadyExists =
        medicines.some(
            function(medicine) {

                return (
                    medicine.name
                        .toLowerCase() ===
                    name.toLowerCase() &&
                    medicine.time === time
                );

            }
        );


    if (alreadyExists) {

        alert(
            getTranslation()
                .medicineAlreadyExists
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
            "Pending",

        createdAt:
            new Date()
                .toLocaleString()

    };


    medicines.push(
        medicine
    );


    saveMedicines();


    document.getElementById(
        "medicineName"
    ).value = "";

    document.getElementById(
        "dosage"
    ).value = "";

    document.getElementById(
        "medicineTime"
    ).value = "";


    alert(
        getTranslation()
            .medicineAdded
    );


    addLog(
        name + " - Added"
    );


    loadMedicines();

    updateDashboard();
}


/* =========================================================
   STATUS TRANSLATION
   ========================================================= */

function translateStatus(status) {

    const t =
        getTranslation();


    if (
        status === "Taken"
    ) {

        return t.taken;
    }


    if (
        status === "Missed"
    ) {

        return t.missedStatus;
    }


    return t.pending;
}


/* =========================================================
   LOAD MEDICINES
   ========================================================= */

function loadMedicines() {

    const medicineList =
        document.getElementById(
            "medicineList"
        );

    if (!medicineList) return;


    if (
        !Array.isArray(
            medicines
        )
    ) {

        medicines = [];
    }


    if (
        medicines.length === 0
    ) {

        medicineList.innerHTML =
            `<p>${getTranslation().noMedicines}</p>`;

        return;
    }


    medicineList.innerHTML = "";


    medicines.forEach(
        function(medicine) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "medicine-item";


            const status =
                translateStatus(
                    medicine.status
                );


            let takenButton = "";


            if (
                medicine.status ===
                "Pending"
            ) {

                takenButton = `

                    <button
                        onclick="markTaken(${medicine.id})">

                        ${getTranslation().markTaken}

                    </button>

                `;
            }


            item.innerHTML = `

                <div class="medicine-info">

                    <h3>
                        ${escapeHTML(medicine.name)}
                    </h3>

                    <p>
                        ${escapeHTML(medicine.dosage)}
                    </p>

                    <p>
                        ${medicine.time}
                    </p>

                    <span class="medicine-status">
                        ${status}
                    </span>

                </div>

                <div class="medicine-action">

                    ${takenButton}

                </div>

            `;


            medicineList.appendChild(
                item
            );

        }
    );
}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        value;

    return div.innerHTML;
}


/* =========================================================
   DASHBOARD
   ========================================================= */

function updateDashboard() {

    const total =
        medicines.length;


    const taken =
        medicines.filter(
            medicine =>
                medicine.status ===
                "Taken"
        ).length;


    const missed =
        medicines.filter(
            medicine =>
                medicine.status ===
                "Missed"
        ).length;


    let adherence = 0;


    if (total > 0) {

        adherence =
            Math.round(
                (taken / total) *
                100
            );
    }


    const totalMedicine =
        document.getElementById(
            "totalMedicine"
        );

    const takenCount =
        document.getElementById(
            "takenCount"
        );

    const missedCount =
        document.getElementById(
            "missedCount"
        );

    const adherenceElement =
        document.getElementById(
            "adherence"
        );


    if (totalMedicine) {
        totalMedicine.innerText =
            total;
    }

    if (takenCount) {
        takenCount.innerText =
            taken;
    }

    if (missedCount) {
        missedCount.innerText =
            missed;
    }

    if (adherenceElement) {
        adherenceElement.innerText =
            adherence + "%";
    }


    updateNextReminder();

    updateReport();

    loadLogs();
}


/* =========================================================
   NEXT REMINDER
   ========================================================= */

function updateNextReminder() {

    const nextReminder =
        document.getElementById(
            "nextReminder"
        );

    if (!nextReminder) return;


    const pending =
        medicines
            .filter(
                medicine =>
                    medicine.status ===
                    "Pending"
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

        nextReminder.innerText =
            "--";

        return;
    }


    const next =
        pending[0];


    nextReminder.innerText =
        next.name +
        " - " +
        next.time;
}


/* =========================================================
   REGIONAL LANGUAGE VOICE
   ========================================================= */

function getSpeechSettings() {

    const lang =
        getLanguage();


    const settings = {

        en: {
            lang: "en-IN"
        },

        ta: {
            lang: "ta-IN"
        },

        hi: {
            lang: "hi-IN"
        },

        te: {
            lang: "te-IN"
        }

    };


    return (
        settings[lang] ||
        settings.en
    );
}


/* =========================================================
   BUILD REMINDER SENTENCE
   ========================================================= */

function buildReminderMessage(
    medicineName
) {

    const lang =
        getLanguage();


    /*
       IMPORTANT:

       medicineName is NOT translated.

       The exact name entered by the user
       is inserted into the sentence.
    */


    if (lang === "ta") {

        return (
            medicineName +
            " மருந்தை எடுத்துக்கொள்ள வேண்டிய நேரம் இது."
        );
    }


    if (lang === "hi") {

        return (
            medicineName +
            " दवा लेने का समय हो गया है।"
        );
    }


    if (lang === "te") {

        return (
            medicineName +
            " మందు తీసుకునే సమయం వచ్చింది."
        );
    }


    return (
        "It is time to take " +
        medicineName +
        "."
    );
}


/* =========================================================
   SPEAK MEDICINE REMINDER
   ========================================================= */

function speakMedicineReminder(
    medicineName
) {

    if (
        !("speechSynthesis" in window)
    ) {

        alert(
            getTranslation()
                .voiceUnsupported
        );

        return;
    }


    const settings =
        getSpeechSettings();


    const message =
        buildReminderMessage(
            medicineName
        );


    /*
       Stop current speech.
    */

    window.speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(
            message
        );


    speech.lang =
        settings.lang;

    speech.rate =
        0.78;

    speech.pitch =
        1;

    speech.volume =
        1;


    /*
       Select regional voice.
    */

    const voices =
        window.speechSynthesis
            .getVoices();


    const languageCode =
        settings.lang
            .split("-")[0]
            .toLowerCase();


    const matchingVoice =
        voices.find(
            function(voice) {

                return (
                    voice.lang &&
                    voice.lang
                        .toLowerCase()
                        .startsWith(
                            languageCode
                        )
                );

            }
        );


    if (matchingVoice) {

        speech.voice =
            matchingVoice;
    }


    /*
       Speak the complete sentence.
    */

    window.speechSynthesis.speak(
        speech
    );
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


    reminderLoop =
        setInterval(
            checkMedicationReminder,
            1000
        );


    checkMedicationReminder();
}


/* =========================================================
   CHECK MEDICATION TIME
   ========================================================= */

function checkMedicationReminder() {

    if (
        !medicines.length
    ) {
        return;
    }


    const now =
        new Date();


    const currentTime =
        now.toTimeString()
            .slice(0, 5);


    medicines.forEach(
        function(medicine) {

            if (
                medicine.time ===
                currentTime &&
                medicine.status ===
                "Pending"
            ) {

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

function triggerReminder(
    medicine
) {

    /*
       Prevent the same medicine from
       starting multiple reminder loops.
    */

    if (
        activeReminder &&
        activeReminder.id ===
        medicine.id
    ) {

        return;
    }


    /*
       If another reminder is active,
       stop it first.
    */

    stopActiveReminder();


    activeReminder =
        medicine;


    /*
       SPEAK IMMEDIATELY
    */

    speakMedicineReminder(
        medicine.name
    );


    /*
       Repeat voice every 5 seconds.
    */

    reminderRepeatTimer =
        setInterval(
            function() {

                if (
                    medicine.status !==
                    "Pending" ||
                    !activeReminder ||
                    activeReminder.id !==
                    medicine.id
                ) {

                    clearInterval(
                        reminderRepeatTimer
                    );

                    reminderRepeatTimer =
                        null;

                    return;
                }


                speakMedicineReminder(
                    medicine.name
                );

            },
            5000
        );


    /*
       Miss after 60 seconds.
    */

    missedTimer =
        setTimeout(
            function() {

                if (
                    medicine.status ===
                    "Pending"
                ) {

                    medicine.status =
                        "Missed";


                    saveMedicines();


                    stopActiveReminder();


                    speakMissedReminder(
                        medicine.name
                    );


                    sendCaregiverSMS(
                        medicine
                    );


                    addLog(
                        medicine.name +
                        " - Missed"
                    );


                    loadMedicines();

                    updateDashboard();
                }

            },
            60000
        );
}


/* =========================================================
   STOP ACTIVE REMINDER
   ========================================================= */

function stopActiveReminder() {

    window.speechSynthesis.cancel();


    if (
        reminderRepeatTimer
    ) {

        clearInterval(
            reminderRepeatTimer
        );

        reminderRepeatTimer =
            null;
    }


    if (
        missedTimer
    ) {

        clearTimeout(
            missedTimer
        );

        missedTimer =
            null;
    }


    activeReminder =
        null;
}


/* =========================================================
   MISSED REMINDER VOICE
   ========================================================= */

function speakMissedReminder(
    medicineName
) {

    if (
        !("speechSynthesis" in window)
    ) {

        return;
    }


    const lang =
        getLanguage();


    let message;

    let speechLanguage;


    if (lang === "ta") {

        message =
            medicineName +
            " மருந்து நினைவூட்டல் தவறிவிட்டது.";

        speechLanguage =
            "ta-IN";
    }


    else if (lang === "hi") {

        message =
            medicineName +
            " दवा का रिमाइंडर छूट गया।";

        speechLanguage =
            "hi-IN";
    }


    else if (lang === "te") {

        message =
            medicineName +
            " మందు రిమైండర్ మిస్ అయింది.";

        speechLanguage =
            "te-IN";
    }


    else {

        message =
            "The reminder for " +
            medicineName +
            " was missed.";

        speechLanguage =
            "en-IN";
    }


    window.speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(
            message
        );


    speech.lang =
        speechLanguage;

    speech.rate =
        0.78;

    speech.volume =
        1;


    const voices =
        window.speechSynthesis
            .getVoices();


    const languageCode =
        speechLanguage
            .split("-")[0]
            .toLowerCase();


    const voice =
        voices.find(
            function(v) {

                return (
                    v.lang &&
                    v.lang
                        .toLowerCase()
                        .startsWith(
                            languageCode
                        )
                );

            }
        );


    if (voice) {
        speech.voice =
            voice;
    }


    window.speechSynthesis.speak(
        speech
    );
}


/* =========================================================
   SAVE MEDICINES
   ========================================================= */

function saveMedicines() {

    localStorage.setItem(
        medicineStorageKey(),
        JSON.stringify(
            medicines
        )
    );
}


/* =========================================================
   MARK MEDICINE AS TAKEN
   ========================================================= */

function markTaken(id) {

    const medicine =
        medicines.find(
            function(m) {

                return m.id === id;

            }
        );


    if (!medicine) return;


    medicine.status =
        "Taken";


    saveMedicines();


    /*
       STOP VOICE IMMEDIATELY.
    */

    stopActiveReminder();


    addLog(
        medicine.name +
        " - Taken"
    );


    loadMedicines();

    updateDashboard();
}


/* =========================================================
   CAREGIVER SMS
   ========================================================= */

function sendCaregiverSMS(
    medicine
) {

    const caregiver =
        localStorage.getItem(
            "caregiverPhone"
        );


    if (!caregiver) {
        return;
    }


    const lang =
        getLanguage();


    let message;


    if (lang === "ta") {

        message =
            medicine.name +
            " மருந்து எடுத்ததாக பதிவு செய்யப்படவில்லை.";
    }


    else if (lang === "hi") {

        message =
            medicine.name +
            " दवा लेने की पुष्टि नहीं हुई।";
    }


    else if (lang === "te") {

        message =
            medicine.name +
            " మందు తీసుకున్నట్లు నిర్ధారించబడలేదు.";
    }


    else {

        message =
            medicine.name +
            " was not marked as taken.";
    }


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
            "caregiverPhone"
        );


    if (!caregiver) {

        alert(
            getTranslation()
                .caregiverUnavailable
        );

        return;
    }


    window.location.href =
        "tel:" +
        caregiver;
}


/* =========================================================
   CALL AMBULANCE
   ========================================================= */

function callAmbulance() {

    window.location.href =
        "tel:108";
}


/* =========================================================
   LOGGING
   ========================================================= */

function addLog(
    message
) {

    const logs =
        JSON.parse(
            localStorage.getItem(
                logStorageKey()
            )
        ) || [];


    logs.push({

        message:
            message,

        time:
            new Date()
                .toLocaleString()

    });


    localStorage.setItem(
        logStorageKey(),
        JSON.stringify(
            logs
        )
    );


    loadLogs();
}


/* =========================================================
   LOAD LOGS
   ========================================================= */

function loadLogs() {

    const logList =
        document.getElementById(
            "logList"
        );


    if (!logList) return;


    const logs =
        JSON.parse(
            localStorage.getItem(
                logStorageKey()
            )
        ) || [];


    if (
        logs.length === 0
    ) {

        logList.innerHTML =
            `<p>${getTranslation().noActivity}</p>`;

        return;
    }


    logList.innerHTML = "";


    logs
        .slice()
        .reverse()
        .forEach(
            function(log) {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "log-item";


                item.innerHTML = `

                    <strong>
                        ${escapeHTML(
                            log.message
                        )}
                    </strong>

                    <small>
                        ${escapeHTML(
                            log.time
                        )}
                    </small>

                `;


                logList.appendChild(
                    item
                );

            }
        );
}


/* =========================================================
   REPORT
   ========================================================= */

function updateReport() {

    const total =
        medicines.length;


    const taken =
        medicines.filter(
            medicine =>
                medicine.status ===
                "Taken"
        ).length;


    const missed =
        medicines.filter(
            medicine =>
                medicine.status ===
                "Missed"
        ).length;


    let adherence = 0;


    if (total > 0) {

        adherence =
            Math.round(
                (taken / total) *
                100
            );
    }


    const reportTotal =
        document.getElementById(
            "reportTotal"
        );

    const reportTaken =
        document.getElementById(
            "reportTaken"
        );

    const reportMissed =
        document.getElementById(
            "reportMissed"
        );

    const reportAdherence =
        document.getElementById(
            "reportAdherence"
        );


    if (reportTotal) {
        reportTotal.innerText =
            total;
    }

    if (reportTaken) {
        reportTaken.innerText =
            taken;
    }

    if (reportMissed) {
        reportMissed.innerText =
            missed;
    }

    if (reportAdherence) {
        reportAdherence.innerText =
            adherence + "%";
    }


    const reportTable =
        document.getElementById(
            "reportTable"
        );


    if (!reportTable) return;


    if (
        medicines.length === 0
    ) {

        reportTable.innerHTML =
            `<tr>
                <td colspan="4">
                    ${getTranslation().noMedicinesReport}
                </td>
            </tr>`;

        return;
    }


    reportTable.innerHTML = "";


    medicines.forEach(
        function(medicine) {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

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
                    ${medicine.time}
                </td>

                <td>
                    ${translateStatus(
                        medicine.status
                    )}
                </td>

            `;


            reportTable.appendChild(
                row
            );

        }
    );
}


/* =========================================================
   PDF REPORT
   ========================================================= */

function downloadReport() {

    if (
        typeof window.jspdf ===
        "undefined"
    ) {

        alert(
            "PDF library is not available."
        );

        return;
    }


    const {
        jsPDF
    } =
        window.jspdf;


    const doc =
        new jsPDF();


    const name =
        localStorage.getItem(
            "patientName"
        ) || "";


    const phone =
        localStorage.getItem(
            "patientPhone"
        ) || "";


    doc.setFontSize(18);

    doc.text(
        "MEDICARE AI - Medication Report",
        20,
        20
    );


    doc.setFontSize(12);

    doc.text(
        "Patient: " +
        name,
        20,
        32
    );

    doc.text(
        "Phone: " +
        phone,
        20,
        40
    );


    let y = 55;


    doc.text(
        "Medicine",
        20,
        y
    );

    doc.text(
        "Dosage",
        80,
        y
    );

    doc.text(
        "Time",
        125,
        y
    );

    doc.text(
        "Status",
        160,
        y
    );


    y += 8;


    medicines.forEach(
        function(medicine) {

            doc.text(
                medicine.name,
                20,
                y
            );

            doc.text(
                medicine.dosage,
                80,
                y
            );

            doc.text(
                medicine.time,
                125,
                y
            );

            doc.text(
                medicine.status,
                160,
                y
            );


            y += 8;


            if (
                y > 275
            ) {

                doc.addPage();

                y = 20;
            }

        }
    );


    doc.save(
        "Medication_Report.pdf"
    );
}


/* =========================================================
   DARK MODE
   ========================================================= */

function toggleDarkMode() {

    document.body.classList.toggle(
        "dark-mode"
    );


    const enabled =
        document.body.classList.contains(
            "dark-mode"
        );


    localStorage.setItem(
        "darkMode",
        enabled
    );
}


window.addEventListener(
    "DOMContentLoaded",
    function() {

        const darkMode =
            localStorage.getItem(
                "darkMode"
            );


        if (
            darkMode === "true"
        ) {

            document.body.classList.add(
                "dark-mode"
            );
        }

    }
);


/* =========================================================
   LOGOUT
   ========================================================= */

function logout() {

    stopActiveReminder();


    if (reminderLoop) {

        clearInterval(
            reminderLoop
        );

        reminderLoop =
            null;
    }


    window.speechSynthesis.cancel();


    localStorage.removeItem(
        "patientName"
    );

    localStorage.removeItem(
        "patientAge"
    );

    localStorage.removeItem(
        "patientPhone"
    );

    localStorage.removeItem(
        "caregiverPhone"
    );


    location.reload();
}


/* =========================================================
   VOICE INITIALIZATION
   ========================================================= */

if (
    "speechSynthesis" in window
) {

    window.speechSynthesis
        .getVoices();


    window.speechSynthesis
        .onvoiceschanged =
        function() {

            window.speechSynthesis
                .getVoices();

        };
}


/* =========================================================
   END
   ========================================================= */
```

### Very important: remove the buzzer from `index.html`

Delete this from your HTML:

```html
<audio
id="alarm"
src="https://assets.mixkit.co/sfx/preview/mixkit-alarm-tone-996.mp3"
loop>
</audio>
```

You don't need an audio file at all now.

### How the new reminder works

Suppose you select **தமிழ்** and enter:

**Medicine Name:** `Dolo 650`
**Dosage:** `1 Tablet`
**Time:** `10:00`

At 10:00, the browser will generate:

> **“Dolo 650 மருந்தை எடுத்துக்கொள்ள வேண்டிய நேரம் இது.”**

It will **not replace `Dolo 650` with some generic word**, because the code directly inserts the exact value from `medicine.name`.

For Hindi:

> **“Dolo 650 दवा लेने का समय हो गया है।”**

For Telugu:

> **“Dolo 650 మందు తీసుకునే సమయం వచ్చింది.”**

For English:

> **“It is time to take Dolo 650.”**

One more important point: **Chrome can only speak a regional language if an appropriate speech voice is available on the device/browser.** The code now searches for `ta-IN`, `hi-IN`, `te-IN`, or `en-IN` voices and uses one when available. If Chrome doesn't expose a Tamil/Telugu/Hindi voice on that computer, the website cannot manufacture a native voice by JavaScript alone.

After replacing the code, **refresh the page and test with a medicine such as `Dolo 650`**. Also test the reminder while the webpage is open, because browser speech synthesis generally requires the page/tab to remain active.
