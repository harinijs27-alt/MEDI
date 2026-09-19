/* =========================================================
   MEDICARE AI - MEDICATION REMINDER
   Voice Reminder Only
   No Buzzer / No Alarm Sound
   ========================================================= */

let medicines = [];
let activeReminder = null;
let reminderLoop = null;
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
        medicineTime: "Time",
        addMedicineButton: "Add Medicine",

        medicineSchedule: "Medicine Schedule",
        noMedicines: "No medicines added yet.",

        markTaken: "Taken",
        pending: "Pending",
        missedStatus: "Missed",

        callCaregiver: "Call Caregiver",
        emergency: "Emergency / Ambulance",

        aiAssistant: "AI Health Assistant",

        healthMessage:
            "Please take your medicines on time and keep your caregiver informed.",

        medicationReport: "Medication Report",
        reportTotal: "Total Medicines",
        reportTaken: "Taken",
        reportMissed: "Missed",
        reportAdherence: "Adherence",
        downloadReport: "Download Report",

        activityLogs: "Activity Logs",

        login: "Login",
        patientName: "Patient Name",
        patientAge: "Age",
        patientPhone: "Patient Phone",
        caregiverPhone: "Caregiver Phone",
        language: "Language",

        logout: "Logout",
        darkMode: "Dark Mode",

        voiceReminder:
            "Time to take",

        reminderMissed:
            "Medicine reminder was missed.",

        caregiverAlert:
            "The medicine was not marked as taken.",

        invalidDetails:
            "Please fill all required details.",

        medicineAdded:
            "Medicine added successfully.",

        medicineAlreadyExists:
            "This medicine is already added for the selected time."
    },

    ta: {
        aiPowered: "AI சுகாதார உதவியாளர்",
        monitoring: "AI கண்காணிப்பு செயல்பாட்டில் உள்ளது",

        welcome: "வரவேற்கிறோம்",
        loginSuccessful: "உள்நுழைவு வெற்றிகரமாக முடிந்தது",
        preparing: "AI சுகாதார உதவியாளர் தயாராகிறது...",

        dashboardTitle: "AI சுகாதார உதவியாளர்",
        dashboardSubtitle: "ஸ்மார்ட் மருந்து கண்காணிப்பு அமைப்பு",
        aiOnline: "AI செயல்பாட்டில்",

        patientProfile: "நோயாளி விவரம்",
        nextReminder: "அடுத்த நினைவூட்டல்",

        totalMedicine: "மொத்த மருந்துகள்",
        taken: "எடுத்தது",
        missed: "தவறியது",
        adherence: "பின்பற்றல்",

        addMedicine: "மருந்து சேர்க்கவும்",
        medicineName: "மருந்தின் பெயர்",
        dosage: "அளவு",
        medicineTime: "நேரம்",
        addMedicineButton: "மருந்து சேர்க்கவும்",

        medicineSchedule: "மருந்து அட்டவணை",
        noMedicines: "இதுவரை மருந்துகள் சேர்க்கப்படவில்லை.",

        markTaken: "எடுத்துவிட்டேன்",
        pending: "நிலுவையில்",
        missedStatus: "தவறியது",

        callCaregiver: "பராமரிப்பாளரை அழைக்கவும்",
        emergency: "அவசரம் / ஆம்புலன்ஸ்",

        aiAssistant: "AI சுகாதார உதவியாளர்",

        healthMessage:
            "உங்கள் மருந்துகளை சரியான நேரத்தில் எடுத்துக்கொண்டு, பராமரிப்பாளருக்கு தகவல் தெரிவிக்கவும்.",

        medicationReport: "மருந்து அறிக்கை",
        reportTotal: "மொத்த மருந்துகள்",
        reportTaken: "எடுத்தது",
        reportMissed: "தவறியது",
        reportAdherence: "பின்பற்றல்",
        downloadReport: "அறிக்கையை பதிவிறக்கவும்",

        activityLogs: "செயல்பாட்டு பதிவுகள்",

        login: "உள்நுழைவு",
        patientName: "நோயாளியின் பெயர்",
        patientAge: "வயது",
        patientPhone: "நோயாளி தொலைபேசி",
        caregiverPhone: "பராமரிப்பாளர் தொலைபேசி",
        language: "மொழி",

        logout: "வெளியேறு",
        darkMode: "இருண்ட பயன்முறை",

        voiceReminder:
            "மருந்தை எடுத்துக்கொள்ளும் நேரம்",

        reminderMissed:
            "மருந்து நினைவூட்டல் தவறிவிட்டது.",

        caregiverAlert:
            "மருந்து எடுத்ததாக பதிவு செய்யப்படவில்லை.",

        invalidDetails:
            "தேவையான அனைத்து விவரங்களையும் நிரப்பவும்.",

        medicineAdded:
            "மருந்து வெற்றிகரமாக சேர்க்கப்பட்டது.",

        medicineAlreadyExists:
            "தேர்ந்தெடுக்கப்பட்ட நேரத்திற்கு இந்த மருந்து ஏற்கனவே சேர்க்கப்பட்டுள்ளது."
    },

    hi: {
        aiPowered: "AI स्वास्थ्य सहायक",
        monitoring: "AI निगरानी सक्रिय है",

        welcome: "स्वागत है",
        loginSuccessful: "लॉगिन सफल हुआ",
        preparing: "AI स्वास्थ्य सहायक तैयार हो रहा है...",

        dashboardTitle: "AI स्वास्थ्य सहायक",
        dashboardSubtitle: "स्मार्ट दवा निगरानी प्रणाली",
        aiOnline: "AI ऑनलाइन",

        patientProfile: "रोगी विवरण",
        nextReminder: "अगला रिमाइंडर",

        totalMedicine: "कुल दवाइयाँ",
        taken: "ली गई",
        missed: "छूटी",
        adherence: "अनुपालन",

        addMedicine: "दवा जोड़ें",
        medicineName: "दवा का नाम",
        dosage: "खुराक",
        medicineTime: "समय",
        addMedicineButton: "दवा जोड़ें",

        medicineSchedule: "दवा अनुसूची",
        noMedicines: "अभी तक कोई दवा नहीं जोड़ी गई है।",

        markTaken: "ली गई",
        pending: "लंबित",
        missedStatus: "छूटी",

        callCaregiver: "देखभालकर्ता को कॉल करें",
        emergency: "आपातकाल / एम्बुलेंस",

        aiAssistant: "AI स्वास्थ्य सहायक",

        healthMessage:
            "कृपया अपनी दवाइयाँ समय पर लें और अपने देखभालकर्ता को सूचित रखें।",

        medicationReport: "दवा रिपोर्ट",
        reportTotal: "कुल दवाइयाँ",
        reportTaken: "ली गई",
        reportMissed: "छूटी",
        reportAdherence: "अनुपालन",
        downloadReport: "रिपोर्ट डाउनलोड करें",

        activityLogs: "गतिविधि लॉग",

        login: "लॉगिन",
        patientName: "रोगी का नाम",
        patientAge: "आयु",
        patientPhone: "रोगी फोन",
        caregiverPhone: "देखभालकर्ता फोन",
        language: "भाषा",

        logout: "लॉगआउट",
        darkMode: "डार्क मोड",

        voiceReminder:
            "दवा लेने का समय हो गया है",

        reminderMissed:
            "दवा का रिमाइंडर छूट गया।",

        caregiverAlert:
            "दवा लेने की पुष्टि नहीं की गई।",

        invalidDetails:
            "कृपया सभी आवश्यक विवरण भरें।",

        medicineAdded:
            "दवा सफलतापूर्वक जोड़ दी गई।",

        medicineAlreadyExists:
            "चयनित समय के लिए यह दवा पहले से जोड़ी गई है।"
    },

    te: {
        aiPowered: "AI ఆరోగ్య సహాయకుడు",
        monitoring: "AI పర్యవేక్షణ సక్రియంగా ఉంది",

        welcome: "స్వాగతం",
        loginSuccessful: "లాగిన్ విజయవంతమైంది",
        preparing: "AI ఆరోగ్య సహాయకుడు సిద్ధమవుతోంది...",

        dashboardTitle: "AI ఆరోగ్య సహాయకుడు",
        dashboardSubtitle: "స్మార్ట్ మందుల పర్యవేక్షణ వ్యవస్థ",
        aiOnline: "AI ఆన్‌లైన్",

        patientProfile: "రోగి వివరాలు",
        nextReminder: "తదుపరి రిమైండర్",

        totalMedicine: "మొత్తం మందులు",
        taken: "తీసుకున్నవి",
        missed: "మిస్ అయినవి",
        adherence: "అనుసరణ",

        addMedicine: "మందు జోడించండి",
        medicineName: "మందు పేరు",
        dosage: "మోతాదు",
        medicineTime: "సమయం",
        addMedicineButton: "మందు జోడించండి",

        medicineSchedule: "మందుల షెడ్యూల్",
        noMedicines: "ఇంకా మందులు జోడించబడలేదు.",

        markTaken: "తీసుకున్నాను",
        pending: "పెండింగ్",
        missedStatus: "మిస్ అయింది",

        callCaregiver: "సంరక్షకుడికి కాల్ చేయండి",
        emergency: "అత్యవసరం / అంబులెన్స్",

        aiAssistant: "AI ఆరోగ్య సహాయకుడు",

        healthMessage:
            "దయచేసి మీ మందులను సమయానికి తీసుకుని సంరక్షకుడికి సమాచారం ఇవ్వండి.",

        medicationReport: "మందుల నివేదిక",
        reportTotal: "మొత్తం మందులు",
        reportTaken: "తీసుకున్నవి",
        reportMissed: "మిస్ అయినవి",
        reportAdherence: "అనుసరణ",
        downloadReport: "నివేదికను డౌన్‌లోడ్ చేయండి",

        activityLogs: "కార్యకలాప లాగ్‌లు",

        login: "లాగిన్",
        patientName: "రోగి పేరు",
        patientAge: "వయస్సు",
        patientPhone: "రోగి ఫోన్",
        caregiverPhone: "సంరక్షకుడి ఫోన్",
        language: "భాష",

        logout: "లాగౌట్",
        darkMode: "డార్క్ మోడ్",

        voiceReminder:
            "మందు తీసుకునే సమయం వచ్చింది",

        reminderMissed:
            "మందు రిమైండర్ మిస్ అయింది.",

        caregiverAlert:
            "మందు తీసుకున్నట్లు నిర్ధారించబడలేదు.",

        invalidDetails:
            "దయచేసి అవసరమైన అన్ని వివరాలను నమోదు చేయండి.",

        medicineAdded:
            "మందు విజయవంతంగా జోడించబడింది.",

        medicineAlreadyExists:
            "ఎంచుకున్న సమయానికి ఈ మందు ఇప్పటికే జోడించబడింది."
    }
};


/* =========================================================
   LANGUAGE
   ========================================================= */

function getLanguage() {

    return localStorage.getItem("selectedLanguage") || "en";
}


function applyLanguage(lang) {

    if (!translations[lang]) {
        lang = "en";
    }

    localStorage.setItem("selectedLanguage", lang);

    const t = translations[lang];

    const languageElement = document.getElementById("language");

    if (languageElement) {
        languageElement.value = lang;
    }

    /* ---------- Login page ---------- */

    const loginButton = document.querySelector(
        'button[onclick="loginPatient()"]'
    );

    if (loginButton) {
        loginButton.innerText = t.login;
    }

    const loginLabels = document.querySelectorAll(
        ".login-card label"
    );

    loginLabels.forEach(function(label) {

        const input = label.querySelector("input, select");

        if (!input) return;

        if (input.id === "patientName") {
            label.firstChild.textContent = t.patientName;
        }

        if (input.id === "patientAge") {
            label.firstChild.textContent = t.patientAge;
        }

        if (input.id === "patientPhone") {
            label.firstChild.textContent = t.patientPhone;
        }

        if (input.id === "caregiverLogin") {
            label.firstChild.textContent = t.caregiverPhone;
        }

        if (input.id === "language") {
            label.firstChild.textContent = t.language;
        }
    });


    /* ---------- Login Logo ---------- */

    const aiPowered = document.querySelector(
        ".login-card .ai-text"
    );

    if (aiPowered) {
        aiPowered.innerText = t.aiPowered;
    }


    /* ---------- Monitoring ---------- */

    const monitoringElements = document.querySelectorAll(
        ".monitoring-text"
    );

    monitoringElements.forEach(function(element) {
        element.innerText = t.monitoring;
    });


    /* ---------- Welcome ---------- */

    const welcomeStatus = document.querySelector(
        "#welcomeSection"
    );

    if (welcomeStatus) {

        const elements = welcomeStatus.querySelectorAll(
            "h1, h2, h3, p, span"
        );

        elements.forEach(function(element) {

            const text = element.innerText.trim();

            if (
                text.includes("Login Successful") ||
                text.includes("உள்நுழைவு வெற்றிகரமாக") ||
                text.includes("लॉगिन सफल") ||
                text.includes("లాగిన్ విజయవంత")
            ) {
                element.innerText = t.loginSuccessful;
            }

            if (
                text.includes("AI Healthcare Assistant is Preparing") ||
                text.includes("AI சுகாதார உதவியாளர் தயாராகிறது") ||
                text.includes("AI स्वास्थ्य सहायक तैयार") ||
                text.includes("AI ఆరోగ్య సహాయకుడు సిద్ధ")
            ) {
                element.innerText = t.preparing;
            }
        });
    }


    /* ---------- Dashboard ---------- */

    const dashboardTitle = document.querySelector(
        "#dashboardSection h1"
    );

    if (dashboardTitle) {
        dashboardTitle.innerText = t.dashboardTitle;
    }


    const dashboardSubtitle = document.querySelector(
        "#dashboardSection .subtitle"
    );

    if (dashboardSubtitle) {
        dashboardSubtitle.innerText = t.dashboardSubtitle;
    }


    const aiOnline = document.querySelectorAll(
        ".ai-online"
    );

    aiOnline.forEach(function(element) {
        element.innerText = t.aiOnline;
    });


    /* ---------- Health message ---------- */

    const healthMessage = document.getElementById(
        "healthMessage"
    );

    if (healthMessage) {
        healthMessage.innerText = t.healthMessage;
    }


    /* ---------- Medicine inputs ---------- */

    const medicineButton = document.querySelector(
        'button[onclick="addMedicine()"]'
    );

    if (medicineButton) {
        medicineButton.innerText = t.addMedicineButton;
    }


    /* ---------- Caregiver ---------- */

    const caregiverButton = document.querySelector(
        'button[onclick="callCaregiver()"]'
    );

    if (caregiverButton) {
        caregiverButton.innerText = t.callCaregiver;
    }


    const ambulanceButton = document.querySelector(
        'button[onclick="callAmbulance()"]'
    );

    if (ambulanceButton) {
        ambulanceButton.innerText = t.emergency;
    }


    /* ---------- Report ---------- */

    const downloadButton = document.querySelector(
        'button[onclick="downloadReport()"]'
    );

    if (downloadButton) {
        downloadButton.innerText = t.downloadReport;
    }


    /* ---------- Logout ---------- */

    const logoutButton = document.querySelector(
        'button[onclick="logout()"]'
    );

    if (logoutButton) {
        logoutButton.innerText = t.logout;
    }


    loadMedicines();
    updateDashboard();
}


/* =========================================================
   PATIENT STORAGE
   ========================================================= */

function getPatientPhone() {

    return localStorage.getItem("patientPhone") || "";
}


function medicineStorageKey() {

    return "medicines_" + getPatientPhone();
}


function logStorageKey() {

    return "logs_" + getPatientPhone();
}


/* =========================================================
   CLOCK
   ========================================================= */

function updateClock() {

    const clock = document.getElementById("clock");

    if (!clock) return;

    const now = new Date();

    clock.innerText = now.toLocaleTimeString();
}


setInterval(updateClock, 1000);

updateClock();


/* =========================================================
   LOGIN
   ========================================================= */

function loginPatient() {

    const name =
        document.getElementById("patientName")?.value.trim();

    const age =
        document.getElementById("patientAge")?.value.trim();

    const phone =
        document.getElementById("patientPhone")?.value.trim();

    const caregiver =
        document.getElementById("caregiverLogin")?.value.trim();

    const language =
        document.getElementById("language")?.value || "en";


    if (!name || !age || !phone || !caregiver) {

        alert(translations[language].invalidDetails);

        return;
    }


    localStorage.setItem("patientName", name);
    localStorage.setItem("patientAge", age);
    localStorage.setItem("patientPhone", phone);
    localStorage.setItem("caregiverPhone", caregiver);
    localStorage.setItem("selectedLanguage", language);


    medicines =
        JSON.parse(
            localStorage.getItem(medicineStorageKey())
        ) || [];


    const loginSection =
        document.getElementById("loginSection");

    const welcomeSection =
        document.getElementById("welcomeSection");

    const dashboardSection =
        document.getElementById("dashboardSection");


    if (loginSection) {
        loginSection.style.display = "none";
    }

    if (welcomeSection) {
        welcomeSection.style.display = "block";
    }

    if (dashboardSection) {
        dashboardSection.style.display = "none";
    }


    const welcomeUser =
        document.getElementById("welcomeUser");

    if (welcomeUser) {
        welcomeUser.innerHTML =
            `Welcome, ${name}!`;
    }


    applyLanguage(language);


    setTimeout(function() {

        if (welcomeSection) {
            welcomeSection.style.display = "none";
        }

        if (dashboardSection) {
            dashboardSection.style.display = "block";
        }

        const welcomeText =
            document.getElementById("welcomeText");

        if (welcomeText) {
            welcomeText.innerText =
                translations[getLanguage()].welcome +
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

window.addEventListener("DOMContentLoaded", function() {

    const savedName =
        localStorage.getItem("patientName");

    const savedPhone =
        localStorage.getItem("patientPhone");

    const savedLanguage =
        localStorage.getItem("selectedLanguage") || "en";


    const languageElement =
        document.getElementById("language");

    if (languageElement) {

        languageElement.value =
            savedLanguage;

        languageElement.onchange = function() {

            applyLanguage(this.value);
        };
    }


    if (!savedName || !savedPhone) {

        applyLanguage(savedLanguage);

        return;
    }


    medicines =
        JSON.parse(
            localStorage.getItem(
                "medicines_" + savedPhone
            )
        ) || [];


    const loginSection =
        document.getElementById("loginSection");

    const welcomeSection =
        document.getElementById("welcomeSection");

    const dashboardSection =
        document.getElementById("dashboardSection");


    if (loginSection) {
        loginSection.style.display = "none";
    }

    if (welcomeSection) {
        welcomeSection.style.display = "block";
    }

    if (dashboardSection) {
        dashboardSection.style.display = "none";
    }


    const welcomeUser =
        document.getElementById("welcomeUser");

    if (welcomeUser) {
        welcomeUser.innerHTML =
            `Welcome, ${savedName}!`;
    }


    applyLanguage(savedLanguage);


    setTimeout(function() {

        if (welcomeSection) {
            welcomeSection.style.display = "none";
        }

        if (dashboardSection) {
            dashboardSection.style.display = "block";
        }

        loadProfile();
        loadMedicines();
        updateDashboard();
        startReminderChecker();

    }, 3000);
});


/* =========================================================
   PROFILE
   ========================================================= */

function loadProfile() {

    const profile =
        document.getElementById("patientProfile");

    if (!profile) return;


    const name =
        localStorage.getItem("patientName") || "";

    const age =
        localStorage.getItem("patientAge") || "";

    const phone =
        localStorage.getItem("patientPhone") || "";

    const caregiver =
        localStorage.getItem("caregiverPhone") || "";


    profile.innerHTML = `
        <strong>${name}</strong><br>
        Age: ${age}<br>
        Phone: ${phone}<br>
        Caregiver: ${caregiver}
    `;
}


/* =========================================================
   ADD MEDICINE
   ========================================================= */

function addMedicine() {

    const name =
        document.getElementById("medicineName")?.value.trim();

    const dosage =
        document.getElementById("dosage")?.value.trim();

    const time =
        document.getElementById("medicineTime")?.value;


    if (!name || !dosage || !time) {

        alert(
            translations[getLanguage()].invalidDetails
        );

        return;
    }


    const alreadyExists =
        medicines.some(function(medicine) {

            return (
                medicine.name.toLowerCase() ===
                name.toLowerCase() &&
                medicine.time === time
            );

        });


    if (alreadyExists) {

        alert(
            translations[getLanguage()]
                .medicineAlreadyExists
        );

        return;
    }


    const medicine = {

        id: Date.now(),

        name: name,

        dosage: dosage,

        time: time,

        status: "Pending",

        createdAt:
            new Date().toLocaleString()
    };


    medicines.push(medicine);


    localStorage.setItem(
        medicineStorageKey(),
        JSON.stringify(medicines)
    );


    const medicineName =
        document.getElementById("medicineName");

    const dosageInput =
        document.getElementById("dosage");

    const timeInput =
        document.getElementById("medicineTime");


    if (medicineName) {
        medicineName.value = "";
    }

    if (dosageInput) {
        dosageInput.value = "";
    }

    if (timeInput) {
        timeInput.value = "";
    }


    alert(
        translations[getLanguage()].medicineAdded
    );


    loadMedicines();
    updateDashboard();
}


/* =========================================================
   STATUS TRANSLATION
   ========================================================= */

function translateStatus(status) {

    const t =
        translations[getLanguage()];

    if (status === "Taken") {
        return t.taken;
    }

    if (status === "Missed") {
        return t.missedStatus;
    }

    return t.pending;
}


/* =========================================================
   LOAD MEDICINES
   ========================================================= */

function loadMedicines() {

    const medicineList =
        document.getElementById("medicineList");

    if (!medicineList) return;


    if (!Array.isArray(medicines)) {
        medicines = [];
    }


    if (medicines.length === 0) {

        medicineList.innerHTML =
            `<p>${translations[getLanguage()].noMedicines}</p>`;

        updateDashboard();

        return;
    }


    medicineList.innerHTML = "";


    medicines.forEach(function(medicine) {

        const item =
            document.createElement("div");

        item.className =
            "medicine-item";


        const status =
            translateStatus(medicine.status);


        const takenButton =
            medicine.status === "Pending"
                ? `
                    <button
                        onclick="markTaken(${medicine.id})">
                        ${translations[getLanguage()].markTaken}
                    </button>
                  `
                : "";


        item.innerHTML = `

            <div class="medicine-info">

                <h3>
                    ${medicine.name}
                </h3>

                <p>
                    ${medicine.dosage}
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


        medicineList.appendChild(item);

    });


    updateDashboard();
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
                medicine.status === "Taken"
        ).length;

    const missed =
        medicines.filter(
            medicine =>
                medicine.status === "Missed"
        ).length;


    let adherence = 0;

    if (total > 0) {

        adherence =
            Math.round(
                (taken / total) * 100
            );
    }


    const totalMedicine =
        document.getElementById("totalMedicine");

    const takenCount =
        document.getElementById("takenCount");

    const missedCount =
        document.getElementById("missedCount");

    const adherenceElement =
        document.getElementById("adherence");


    if (totalMedicine) {
        totalMedicine.innerText = total;
    }

    if (takenCount) {
        takenCount.innerText = taken;
    }

    if (missedCount) {
        missedCount.innerText = missed;
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
        document.getElementById("nextReminder");

    if (!nextReminder) return;


    const pendingMedicines =
        medicines
            .filter(
                medicine =>
                    medicine.status === "Pending"
            )
            .sort(
                (a, b) =>
                    a.time.localeCompare(b.time)
            );


    if (pendingMedicines.length === 0) {

        nextReminder.innerText = "--";

        return;
    }


    const next =
        pendingMedicines[0];


    nextReminder.innerText =
        `${next.name} - ${next.time}`;
}


/* =========================================================
   VOICE REMINDER
   ========================================================= */

function speakMedicineReminder(medicineName) {

    if (!("speechSynthesis" in window)) {

        alert(
            "Voice reminder is not supported in this browser."
        );

        return;
    }


    const lang =
        getLanguage();


    let message = "";

    let speechLanguage =
        "en-US";


    if (lang === "en") {

        message =
            "Time to take " +
            medicineName;

        speechLanguage =
            "en-US";
    }


    else if (lang === "ta") {

        message =
            medicineName +
            " மருந்தை எடுத்துக்கொள்ளும் நேரம்";

        speechLanguage =
            "ta-IN";
    }


    else if (lang === "hi") {

        message =
            medicineName +
            " दवा लेने का समय हो गया है";

        speechLanguage =
            "hi-IN";
    }


    else if (lang === "te") {

        message =
            medicineName +
            " మందు తీసుకునే సమయం వచ్చింది";

        speechLanguage =
            "te-IN";
    }


    /* Stop any previous voice */

    window.speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(
            message
        );


    speech.lang =
        speechLanguage;

    speech.rate =
        0.85;

    speech.pitch =
        1;

    speech.volume =
        1;


    /*
       Try to select a voice matching
       the selected regional language.
    */

    const voices =
        window.speechSynthesis.getVoices();


    const languageCode =
        speechLanguage
            .split("-")[0]
            .toLowerCase();


    const regionalVoice =
        voices.find(function(voice) {

            return voice.lang
                .toLowerCase()
                .startsWith(languageCode);

        });


    if (regionalVoice) {

        speech.voice =
            regionalVoice;
    }


    window.speechSynthesis.speak(
        speech
    );
}


/* =========================================================
   REMINDER CHECKER
   ========================================================= */

function startReminderChecker() {

    if (reminderLoop) {

        clearInterval(reminderLoop);
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

    if (!medicines.length) return;


    const now =
        new Date();


    const currentTime =
        now
            .toTimeString()
            .slice(0, 5);


    medicines.forEach(function(medicine) {

        if (
            medicine.time === currentTime &&
            medicine.status === "Pending"
        ) {

            triggerReminder(medicine);
        }

    });
}


/* =========================================================
   TRIGGER VOICE REMINDER
   ========================================================= */

function triggerReminder(medicine) {

    if (
        activeReminder &&
        activeReminder.id === medicine.id
    ) {
        return;
    }


    activeReminder =
        medicine;


    /* ONLY VOICE - NO BUZZER */

    speakMedicineReminder(
        medicine.name
    );


    /*
       Repeat the voice reminder
       every 5 seconds.
    */

    const repeatVoice =
        setInterval(function() {

            if (
                medicine.status !== "Pending" ||
                !activeReminder ||
                activeReminder.id !== medicine.id
            ) {

                clearInterval(repeatVoice);

                return;
            }


            speakMedicineReminder(
                medicine.name
            );

        }, 5000);


    reminderLoopRepeat =
        repeatVoice;


    /*
       Update next reminder display.
    */

    const nextReminder =
        document.getElementById(
            "nextReminder"
        );


    if (nextReminder) {

        nextReminder.innerText =
            medicine.name +
            " - " +
            medicine.time;
    }


    /*
       After 60 seconds, if the patient
       has not marked the medicine as taken,
       mark it as missed.
    */

    missedTimer =
        setTimeout(function() {

            if (
                medicine.status === "Pending"
            ) {

                medicine.status =
                    "Missed";


                saveMedicines();


                speakMissedReminder();


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


            clearInterval(
                repeatVoice
            );


            activeReminder =
                null;


        }, 60000);
}


/* =========================================================
   MISSED VOICE
   ========================================================= */

function speakMissedReminder() {

    if (
        !("speechSynthesis" in window)
    ) {
        return;
    }


    const lang =
        getLanguage();


    let message = "";

    let speechLanguage =
        "en-US";


    if (lang === "en") {

        message =
            "The medicine reminder was missed.";

        speechLanguage =
            "en-US";
    }


    else if (lang === "ta") {

        message =
            "மருந்து நினைவூட்டல் தவறிவிட்டது.";

        speechLanguage =
            "ta-IN";
    }


    else if (lang === "hi") {

        message =
            "दवा का रिमाइंडर छूट गया।";

        speechLanguage =
            "hi-IN";
    }


    else if (lang === "te") {

        message =
            "మందు రిమైండర్ మిస్ అయింది.";

        speechLanguage =
            "te-IN";
    }


    window.speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(
            message
        );


    speech.lang =
        speechLanguage;

    speech.rate =
        0.85;

    speech.volume =
        1;


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
        JSON.stringify(medicines)
    );
}


/* =========================================================
   MARK MEDICINE AS TAKEN
   ========================================================= */

function markTaken(id) {

    const medicine =
        medicines.find(
            medicine =>
                medicine.id === id
        );


    if (!medicine) return;


    medicine.status =
        "Taken";


    saveMedicines();


    /*
       Stop voice reminder.
    */

    window.speechSynthesis.cancel();


    if (reminderLoopRepeat) {

        clearInterval(
            reminderLoopRepeat
        );

        reminderLoopRepeat =
            null;
    }


    if (missedTimer) {

        clearTimeout(
            missedTimer
        );

        missedTimer =
            null;
    }


    activeReminder =
        null;


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

function sendCaregiverSMS(medicine) {

    const caregiver =
        localStorage.getItem(
            "caregiverPhone"
        );


    if (!caregiver) return;


    const lang =
        getLanguage();


    let message = "";


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
            " మందు తీసుకున్నట్లు నిర్ధారణ కాలేదు.";
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


    /*
       Open SMS application.
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
            "caregiverPhone"
        );


    if (!caregiver) {

        alert(
            "Caregiver phone number is not available."
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
   LOGS
   ========================================================= */

function addLog(message) {

    const logs =
        JSON.parse(
            localStorage.getItem(
                logStorageKey()
            )
        ) || [];


    logs.push({

        message: message,

        time:
            new Date().toLocaleString()

    });


    localStorage.setItem(
        logStorageKey(),
        JSON.stringify(logs)
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


    if (logs.length === 0) {

        logList.innerHTML =
            "<p>No activity yet.</p>";

        return;
    }


    logList.innerHTML = "";


    logs
        .slice()
        .reverse()
        .forEach(function(log) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "log-item";


            item.innerHTML = `
                <strong>
                    ${log.message}
                </strong>

                <small>
                    ${log.time}
                </small>
            `;


            logList.appendChild(
                item
            );

        });
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
                medicine.status === "Taken"
        ).length;


    const missed =
        medicines.filter(
            medicine =>
                medicine.status === "Missed"
        ).length;


    let adherence = 0;


    if (total > 0) {

        adherence =
            Math.round(
                (taken / total) * 100
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


    if (medicines.length === 0) {

        reportTable.innerHTML =
            "<tr><td colspan='4'>No medicines available.</td></tr>";

        return;
    }


    reportTable.innerHTML = "";


    medicines.forEach(function(medicine) {

        const row =
            document.createElement(
                "tr"
            );


        row.innerHTML = `

            <td>
                ${medicine.name}
            </td>

            <td>
                ${medicine.dosage}
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

    });
}


/* =========================================================
   PDF REPORT
   ========================================================= */

function downloadReport() {

    if (
        typeof window.jspdf === "undefined"
    ) {

        alert(
            "PDF library is not available."
        );

        return;
    }


    const {
        jsPDF
    } = window.jspdf;


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
        "Patient: " + name,
        20,
        32
    );


    doc.text(
        "Phone: " + phone,
        20,
        40
    );


    let y =
        55;


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


            if (y > 275) {

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


    const darkModeEnabled =
        document.body.classList.contains(
            "dark-mode"
        );


    localStorage.setItem(
        "darkMode",
        darkModeEnabled
    );
}


/* =========================================================
   LOAD DARK MODE
   ========================================================= */

window.addEventListener(
    "DOMContentLoaded",
    function() {

        const darkMode =
            localStorage.getItem(
                "darkMode"
            );


        if (darkMode === "true") {

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

    /*
       Stop all voice reminders.
    */

    window.speechSynthesis.cancel();


    if (reminderLoop) {

        clearInterval(
            reminderLoop
        );

        reminderLoop =
            null;
    }


    if (reminderLoopRepeat) {

        clearInterval(
            reminderLoopRepeat
        );

        reminderLoopRepeat =
            null;
    }


    if (missedTimer) {

        clearTimeout(
            missedTimer
        );

        missedTimer =
            null;
    }


    activeReminder =
        null;


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
   VOICE AVAILABILITY
   ========================================================= */

if (
    "speechSynthesis" in window
) {

    /*
       Some browsers load voices asynchronously.
       This makes regional voices available when possible.
    */

    window.speechSynthesis.onvoiceschanged =
        function() {

            window.speechSynthesis
                .getVoices();

        };
}


/* =========================================================
   IMPORTANT:
   THERE IS NO BUZZER / ALARM CODE HERE.
   ========================================================= */
