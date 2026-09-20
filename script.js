// ============================================================
// JS MEDICARE - COMPLETE SCRIPT
// ============================================================


// ============================================================
// GLOBAL VARIABLES
// ============================================================

let medicines = [];

let activeReminder = null;

let reminderCheckerTimer = null;
let reminderVoiceTimer = null;
let reminderMissTimer = null;

let patientName = "";
let patientPhone = "";

let selectedLanguage = "en";

let voiceUnlocked = false;

let voiceRecognition = null;
let voiceEntryActive = false;
let voiceStep = null;

let takenVoiceRecognition = null;
let takenVoiceRestartTimer = null;
let takenVoiceActive = false;

let takenRecognitionLanguageIndex = 0;

let vibrationTimer = null;


// ============================================================
// TRANSLATIONS
// ============================================================

const translations = {

    en: {

        subtitle: "AI Powered Healthcare Assistant",

        login: "Login",

        patientName: "Patient Name",

        patientPhone: "Patient Phone Number",

        language: "Language",

        enableVoice: "Enable Voice",

        dashboard: "Dashboard",

        logout: "Logout",

        welcome: "Welcome",

        aiMonitoring: "AI Monitoring Online",

        totalMedicines: "Total Medicines",

        taken: "Taken",

        missed: "Missed",

        adherence: "Adherence",

        addMedicine: "Add Medicine",

        medicineName: "Medicine Name",

        dosage: "Dosage",

        time: "Time",

        add: "Add Medicine",

        addByVoice: "🎤 Add Medicine by Voice",

        caregiver: "Caregiver",

        caregiverPhone: "Caregiver Phone",

        save: "Save",

        callCaregiver: "Call Caregiver",

        emergency: "Emergency",

        ambulance: "Call Ambulance",

        nextReminder: "Next Reminder",

        medicines: "My Medicines",

        activity: "Activity Log",

        noMedicines: "No medicines added yet.",

        medicineAdded: "Medicine added successfully.",

        medicineDeleted: "Medicine deleted.",

        reminder: "It is time to take your medicine.",

        takeMedicine: "Please take your medicine now.",

        takenSuccess: "Medicine marked as taken.",

        missedMessage: "Medicine was missed.",

        voiceListening: "Listening...",

        voiceStopped: "Voice stopped.",

        voiceEnabled: "Voice enabled.",

        speakName: "Please say the medicine name.",

        speakDosage: "Please say the dosage.",

        speakTime: "Please say the medicine time.",

        medicineConfirmed: "Medicine added successfully.",

        noSpeech: "I could not hear you. Please try again.",

        voiceNotSupported:
            "Voice recognition is not supported on this browser.",

        caregiverSaved:
            "Caregiver number saved.",

        noCaregiver:
            "Please save caregiver number first.",

        report: "Medication Report",

        downloadReport:
            "Generate Medication Report",

        activityLogin:
            "Patient logged in.",

        activityAdded:
            "Medicine added.",

        activityTaken:
            "Medicine taken.",

        activityMissed:
            "Medicine missed."

    },


    ta: {

        subtitle:
            "AI இயக்கும் சுகாதார உதவியாளர்",

        login:
            "உள்நுழைய",

        patientName:
            "நோயாளியின் பெயர்",

        patientPhone:
            "நோயாளியின் தொலைபேசி எண்",

        language:
            "மொழி",

        enableVoice:
            "குரலை இயக்கவும்",

        dashboard:
            "முகப்பு",

        logout:
            "வெளியேறு",

        welcome:
            "வரவேற்கிறோம்",

        aiMonitoring:
            "AI கண்காணிப்பு செயல்பாட்டில்",

        totalMedicines:
            "மொத்த மருந்துகள்",

        taken:
            "எடுத்தவை",

        missed:
            "தவறியவை",

        adherence:
            "மருந்து பின்பற்றல்",

        addMedicine:
            "மருந்து சேர்க்கவும்",

        medicineName:
            "மருந்தின் பெயர்",

        dosage:
            "அளவு",

        time:
            "நேரம்",

        add:
            "மருந்து சேர்க்கவும்",

        addByVoice:
            "🎤 குரல் மூலம் மருந்து சேர்க்கவும்",

        caregiver:
            "பராமரிப்பாளர்",

        caregiverPhone:
            "பராமரிப்பாளர் தொலைபேசி",

        save:
            "சேமிக்கவும்",

        callCaregiver:
            "பராமரிப்பாளரை அழைக்கவும்",

        emergency:
            "அவசரம்",

        ambulance:
            "ஆம்புலன்ஸ் அழைக்கவும்",

        nextReminder:
            "அடுத்த நினைவூட்டல்",

        medicines:
            "எனது மருந்துகள்",

        activity:
            "செயல்பாட்டு பதிவு",

        noMedicines:
            "இதுவரை மருந்துகள் சேர்க்கப்படவில்லை.",

        medicineAdded:
            "மருந்து வெற்றிகரமாக சேர்க்கப்பட்டது.",

        medicineDeleted:
            "மருந்து நீக்கப்பட்டது.",

        reminder:
            "உங்கள் மருந்தை எடுத்துக்கொள்ள வேண்டிய நேரம் இது.",

        takeMedicine:
            "இப்போது உங்கள் மருந்தை எடுத்துக்கொள்ளவும்.",

        takenSuccess:
            "மருந்து எடுத்ததாக பதிவு செய்யப்பட்டது.",

        missedMessage:
            "மருந்து தவறிவிட்டது.",

        voiceListening:
            "கேட்கிறது...",

        voiceStopped:
            "குரல் நிறுத்தப்பட்டது.",

        voiceEnabled:
            "குரல் இயக்கப்பட்டது.",

        speakName:
            "மருந்தின் பெயரை சொல்லவும்.",

        speakDosage:
            "மருந்தின் அளவை சொல்லவும்.",

        speakTime:
            "மருந்து நேரத்தை சொல்லவும்.",

        medicineConfirmed:
            "மருந்து வெற்றிகரமாக சேர்க்கப்பட்டது.",

        noSpeech:
            "உங்கள் குரல் கேட்கவில்லை. மீண்டும் முயற்சிக்கவும்.",

        voiceNotSupported:
            "இந்த உலாவியில் குரல் வசதி இல்லை.",

        caregiverSaved:
            "பராமரிப்பாளர் எண் சேமிக்கப்பட்டது.",

        noCaregiver:
            "முதலில் பராமரிப்பாளர் எண்ணை சேமிக்கவும்.",

        report:
            "மருந்து அறிக்கை",

        downloadReport:
            "மருந்து அறிக்கையை உருவாக்கவும்",

        activityLogin:
            "நோயாளி உள்நுழைந்தார்.",

        activityAdded:
            "மருந்து சேர்க்கப்பட்டது.",

        activityTaken:
            "மருந்து எடுக்கப்பட்டது.",

        activityMissed:
            "மருந்து தவறிவிட்டது."

    },


    hi: {

        subtitle:
            "AI संचालित स्वास्थ्य सहायक",

        login:
            "लॉगिन",

        patientName:
            "मरीज का नाम",

        patientPhone:
            "मरीज का फोन नंबर",

        language:
            "भाषा",

        enableVoice:
            "वॉइस सक्षम करें",

        dashboard:
            "डैशबोर्ड",

        logout:
            "लॉगआउट",

        welcome:
            "स्वागत है",

        aiMonitoring:
            "AI निगरानी ऑनलाइन",

        totalMedicines:
            "कुल दवाएं",

        taken:
            "ली गई",

        missed:
            "छूटी",

        adherence:
            "दवा पालन",

        addMedicine:
            "दवा जोड़ें",

        medicineName:
            "दवा का नाम",

        dosage:
            "खुराक",

        time:
            "समय",

        add:
            "दवा जोड़ें",

        addByVoice:
            "🎤 आवाज से दवा जोड़ें",

        caregiver:
            "देखभालकर्ता",

        caregiverPhone:
            "देखभालकर्ता फोन",

        save:
            "सेव करें",

        callCaregiver:
            "देखभालकर्ता को कॉल करें",

        emergency:
            "आपातकाल",

        ambulance:
            "एम्बुलेंस कॉल करें",

        nextReminder:
            "अगला रिमाइंडर",

        medicines:
            "मेरी दवाएं",

        activity:
            "गतिविधि लॉग",

        noMedicines:
            "अभी तक कोई दवा नहीं जोड़ी गई है।",

        medicineAdded:
            "दवा सफलतापूर्वक जोड़ी गई।",

        medicineDeleted:
            "दवा हटा दी गई।",

        reminder:
            "अब आपकी दवा लेने का समय है।",

        takeMedicine:
            "कृपया अभी अपनी दवा लें।",

        takenSuccess:
            "दवा लेने के रूप में दर्ज किया गया।",

        missedMessage:
            "दवा छूट गई है।",

        voiceListening:
            "सुन रहा है...",

        voiceStopped:
            "वॉइस बंद।",

        voiceEnabled:
            "वॉइस सक्षम है।",

        speakName:
            "कृपया दवा का नाम बोलें।",

        speakDosage:
            "कृपया दवा की खुराक बोलें।",

        speakTime:
            "कृपया दवा का समय बोलें।",

        medicineConfirmed:
            "दवा सफलतापूर्वक जोड़ी गई।",

        noSpeech:
            "आपकी आवाज नहीं सुनाई दी। फिर से प्रयास करें।",

        voiceNotSupported:
            "इस ब्राउज़र में वॉइस रिकग्निशन उपलब्ध नहीं है।",

        caregiverSaved:
            "देखभालकर्ता नंबर सेव किया गया।",

        noCaregiver:
            "कृपया पहले देखभालकर्ता नंबर सेव करें।",

        report:
            "दवा रिपोर्ट",

        downloadReport:
            "दवा रिपोर्ट बनाएं",

        activityLogin:
            "मरीज ने लॉगिन किया।",

        activityAdded:
            "दवा जोड़ी गई।",

        activityTaken:
            "दवा ली गई।",

        activityMissed:
            "दवा छूट गई।"

    },


    te: {

        subtitle:
            "AI ఆధారిత ఆరోగ్య సహాయకుడు",

        login:
            "లాగిన్",

        patientName:
            "రోగి పేరు",

        patientPhone:
            "రోగి ఫోన్ నంబర్",

        language:
            "భాష",

        enableVoice:
            "వాయిస్ ప్రారంభించండి",

        dashboard:
            "డాష్‌బోర్డ్",

        logout:
            "లాగౌట్",

        welcome:
            "స్వాగతం",

        aiMonitoring:
            "AI పర్యవేక్షణ ఆన్‌లైన్‌లో ఉంది",

        totalMedicines:
            "మొత్తం మందులు",

        taken:
            "తీసుకున్నవి",

        missed:
            "మిస్ అయినవి",

        adherence:
            "మందుల పాటింపు",

        addMedicine:
            "మందు జోడించండి",

        medicineName:
            "మందు పేరు",

        dosage:
            "మోతాదు",

        time:
            "సమయం",

        add:
            "మందు జోడించండి",

        addByVoice:
            "🎤 వాయిస్ ద్వారా మందు జోడించండి",

        caregiver:
            "కేర్‌గివర్",

        caregiverPhone:
            "కేర్‌గివర్ ఫోన్",

        save:
            "సేవ్ చేయండి",

        callCaregiver:
            "కేర్‌గివర్‌కు కాల్ చేయండి",

        emergency:
            "అత్యవసరం",

        ambulance:
            "అంబులెన్స్‌కు కాల్ చేయండి",

        nextReminder:
            "తదుపరి రిమైండర్",

        medicines:
            "నా మందులు",

        activity:
            "యాక్టివిటీ లాగ్",

        noMedicines:
            "ఇంకా మందులు జోడించలేదు.",

        medicineAdded:
            "మందు విజయవంతంగా జోడించబడింది.",

        medicineDeleted:
            "మందు తొలగించబడింది.",

        reminder:
            "మీ మందు తీసుకునే సమయం వచ్చింది.",

        takeMedicine:
            "దయచేసి ఇప్పుడు మీ మందు తీసుకోండి.",

        takenSuccess:
            "మందు తీసుకున్నట్లు నమోదు చేయబడింది.",

        missedMessage:
            "మందు మిస్ అయింది.",

        voiceListening:
            "వింటోంది...",

        voiceStopped:
            "వాయిస్ ఆపబడింది.",

        voiceEnabled:
            "వాయిస్ ప్రారంభించబడింది.",

        speakName:
            "దయచేసి మందు పేరు చెప్పండి.",

        speakDosage:
            "దయచేసి మందు మోతాదు చెప్పండి.",

        speakTime:
            "దయచేసి మందు సమయం చెప్పండి.",

        medicineConfirmed:
            "మందు విజయవంతంగా జోడించబడింది.",

        noSpeech:
            "మీ మాట వినిపించలేదు. మళ్లీ ప్రయత్నించండి.",

        voiceNotSupported:
            "ఈ బ్రౌజర్‌లో వాయిస్ రికగ్నిషన్ అందుబాటులో లేదు.",

        caregiverSaved:
            "కేర్‌గివర్ నంబర్ సేవ్ చేయబడింది.",

        noCaregiver:
            "దయచేసి ముందుగా కేర్‌గివర్ నంబర్‌ను సేవ్ చేయండి.",

        report:
            "మందుల నివేదిక",

        downloadReport:
            "మందుల నివేదిక రూపొందించండి",

        activityLogin:
            "రోగి లాగిన్ అయ్యారు.",

        activityAdded:
            "మందు జోడించబడింది.",

        activityTaken:
            "మందు తీసుకున్నారు.",

        activityMissed:
            "మందు మిస్ అయింది."

    }

};


// ============================================================
// GET TEXT
// ============================================================

function getText(key) {

    return (
        translations[selectedLanguage]?.[key] ||
        translations.en[key] ||
        key
    );

}


// ============================================================
// LANGUAGE
// ============================================================

function getCurrentLanguage() {

    const dashboardLanguage =
        document.getElementById(
            "dashboardLanguage"
        );

    if (
        dashboardLanguage &&
        ["en", "ta", "hi", "te"]
            .includes(dashboardLanguage.value)
    ) {

        return dashboardLanguage.value;

    }


    const loginLanguage =
        document.getElementById(
            "languageSelect"
        );

    if (
        loginLanguage &&
        ["en", "ta", "hi", "te"]
            .includes(loginLanguage.value)
    ) {

        return loginLanguage.value;

    }


    return (
        ["en", "ta", "hi", "te"]
            .includes(selectedLanguage)
            ? selectedLanguage
            : "en"
    );

}


function applyLanguage() {

    selectedLanguage =
        getCurrentLanguage();


    localStorage.setItem(
        "jsMedicareLanguage",
        selectedLanguage
    );


    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key =
                element.getAttribute(
                    "data-i18n"
                );

            if (
                translations[selectedLanguage]?.[key]
            ) {

                element.textContent =
                    translations[selectedLanguage][key];

            }

        });


    document
        .querySelectorAll(
            "[data-i18n-placeholder]"
        )
        .forEach(element => {

            const key =
                element.getAttribute(
                    "data-i18n-placeholder"
                );

            if (
                translations[selectedLanguage]?.[key]
            ) {

                element.placeholder =
                    translations[selectedLanguage][key];

            }

        });


    const dashboardLanguage =
        document.getElementById(
            "dashboardLanguage"
        );

    if (dashboardLanguage) {

        dashboardLanguage.value =
            selectedLanguage;

    }


    const languageSelect =
        document.getElementById(
            "languageSelect"
        );

    if (languageSelect) {

        languageSelect.value =
            selectedLanguage;

    }

}


function changeDashboardLanguage() {

    const select =
        document.getElementById(
            "dashboardLanguage"
        );

    if (!select) return;


    selectedLanguage =
        select.value;


    localStorage.setItem(
        "jsMedicareLanguage",
        selectedLanguage
    );


    applyLanguage();

    updateDashboard();

    renderMedicines();

    updateNextReminder();

}


// ============================================================
// LOAD DATA
// ============================================================

function loadData() {

    try {

        medicines =
            JSON.parse(
                localStorage.getItem(
                    "jsMedicareMedicines"
                ) || "[]"
            );

    } catch {

        medicines = [];

    }


    patientName =
        localStorage.getItem(
            "jsMedicarePatientName"
        ) || "";


    patientPhone =
        localStorage.getItem(
            "jsMedicarePatientPhone"
        ) || "";


    selectedLanguage =
        localStorage.getItem(
            "jsMedicareLanguage"
        ) || "en";


    const caregiver =
        localStorage.getItem(
            "jsMedicareCaregiver"
        );


    const caregiverInput =
        document.getElementById(
            "caregiverPhone"
        );

    if (
        caregiverInput &&
        caregiver
    ) {

        caregiverInput.value =
            caregiver;

    }

}


// ============================================================
// SAVE
// ============================================================

function saveMedicines() {

    localStorage.setItem(
        "jsMedicareMedicines",
        JSON.stringify(medicines)
    );

}


// ============================================================
// PAGE LOAD
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadData();

        applyLanguage();

        restoreLoginState();

        updateDashboard();

        renderMedicines();

        updateNextReminder();

        startReminderChecker();

    }
);


// ============================================================
// LOGIN
// ============================================================

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
        nameInput?.value.trim() || "";


    patientPhone =
        phoneInput?.value.trim() || "";


    selectedLanguage =
        languageInput?.value || "en";


    if (!patientName) {

        alert(
            getText("patientName") +
            " required."
        );

        return;

    }


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


    applyLanguage();


    document.getElementById(
        "loginSection"
    ).style.display = "none";


    document.getElementById(
        "dashboard"
    ).style.display = "block";


    updateDashboard();


    logActivity(
        getText("activityLogin")
    );

}


// ============================================================
// RESTORE LOGIN
// ============================================================

function restoreLoginState() {

    if (!patientName) return;


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

}


// ============================================================
// LOGOUT
// ============================================================

function logout() {

    stopReminderCompletely();

    stopVoiceMedicineEntry();


    patientName = "";

    patientPhone = "";


    localStorage.removeItem(
        "jsMedicarePatientName"
    );

    localStorage.removeItem(
        "jsMedicarePatientPhone"
    );


    document.getElementById(
        "dashboard"
    ).style.display = "none";


    document.getElementById(
        "loginSection"
    ).style.display = "flex";

}


// ============================================================
// UPDATE DASHBOARD
// ============================================================

function updateDashboard() {

    const welcome =
        document.getElementById(
            "welcomeText"
        );


    if (welcome) {

        welcome.textContent =
            getText("welcome") +
            ", " +
            patientName;

    }


    const total =
        document.getElementById(
            "totalMedicines"
        );

    const taken =
        document.getElementById(
            "takenMedicines"
        );

    const missed =
        document.getElementById(
            "missedMedicines"
        );

    const adherence =
        document.getElementById(
            "adherence"
        );


    const totalCount =
        medicines.length;


    const takenCount =
        medicines.filter(
            m => m.status === "taken"
        ).length;


    const missedCount =
        medicines.filter(
            m => m.status === "missed"
        ).length;


    if (total) {

        total.textContent =
            totalCount;

    }


    if (taken) {

        taken.textContent =
            takenCount;

    }


    if (missed) {

        missed.textContent =
            missedCount;

    }


    if (adherence) {

        const completed =
            takenCount +
            missedCount;


        const percentage =
            completed === 0
                ? 0
                : Math.round(
                    (
                        takenCount /
                        completed
                    ) * 100
                );


        adherence.textContent =
            percentage + "%";

    }

}


// ============================================================
// ADD MEDICINE
// ============================================================

function addMedicine() {

    const name =
        document
            .getElementById(
                "medicineName"
            )
            ?.value.trim();


    const dosage =
        document
            .getElementById(
                "dosage"
            )
            ?.value.trim();


    const time =
        document
            .getElementById(
                "medicineTime"
            )
            ?.value;


    if (!name || !dosage || !time) {

        alert(
            "Please enter medicine name, dosage and time."
        );

        return;

    }


    const medicine = {

        id:
            Date.now().toString(),

        name:
            name,

        dosage:
            dosage,

        time:
            time,

        medicineTime:
            time,

        status:
            "pending",

        createdAt:
            new Date().toISOString(),

        missedAt:
            null,

        takenAt:
            null

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


    renderMedicines();

    updateDashboard();

    updateNextReminder();


    logActivity(
        getText("activityAdded") +
        " " +
        name
    );


    alert(
        getText("medicineAdded")
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


    if (!container) return;


    if (medicines.length === 0) {

        container.innerHTML =
            `<p>${getText("noMedicines")}</p>`;

        return;

    }


    container.innerHTML = "";


    medicines.forEach(
        medicine => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "medicine-card";


            const content =
                document.createElement(
                    "div"
                );


            content.innerHTML = `

                <strong>
                    ${escapeHTML(
                        medicine.name
                    )}
                </strong>

                <div>
                    ${escapeHTML(
                        medicine.dosage
                    )}
                </div>

                <div>
                    ${formatTime(
                        medicine.time
                    )}
                </div>

                <div>
                    Status:
                    ${escapeHTML(
                        medicine.status
                    )}
                </div>

            `;


            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "delete-btn";


            button.textContent =
                "Delete";


            button.onclick =
                function () {

                    deleteMedicine(
                        medicine.id
                    );

                };


            card.appendChild(
                content
            );

            card.appendChild(
                button
            );


            container.appendChild(
                card
            );

        }
    );

}


// ============================================================
// DELETE MEDICINE
// ============================================================

function deleteMedicine(id) {

    if (
        activeReminder &&
        activeReminder.id === id
    ) {

        stopReminderCompletely();

    }


    medicines =
        medicines.filter(
            medicine =>
                medicine.id !== id
        );


    saveMedicines();

    renderMedicines();

    updateDashboard();

    updateNextReminder();

}


// ============================================================
// FORMAT TIME
// ============================================================

function formatTime(time) {

    if (!time) return "";


    const parts =
        time.split(":");


    let hour =
        parseInt(parts[0], 10);


    const minute =
        parts[1];


    const ampm =
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
        ampm
    );

}


// ============================================================
// REMINDER CHECKER
// ============================================================

function startReminderChecker() {

    if (reminderCheckerTimer) {

        clearInterval(
            reminderCheckerTimer
        );

    }


    reminderCheckerTimer =
        setInterval(
            checkReminders,
            1000
        );

}


// ============================================================
// CHECK REMINDERS
// ============================================================

function checkReminders() {

    if (activeReminder) {
        return;
    }


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
        now.toLocaleDateString(
            "en-CA"
        );


    medicines.forEach(
        medicine => {

            if (
                medicine.status === "pending" &&
                medicine.time === currentTime
            ) {

                const reminderKey =
                    "reminder_" +
                    medicine.id +
                    "_" +
                    today;


                if (
                    sessionStorage.getItem(
                        reminderKey
                    )
                ) {

                    return;

                }


                sessionStorage.setItem(
                    reminderKey,
                    "1"
                );


                triggerReminder(
                    medicine
                );

            }

        }
    );

}


// ============================================================
// TRIGGER REMINDER
// ============================================================

function triggerReminder(medicine) {

    if (activeReminder) {
        return;
    }


    activeReminder =
        medicine;


    clearReminderTimers();


    showReminderPopup(
        medicine
    );


    startContinuousVibration();


    // FIRST REMINDER
    speakReminder(
        medicine,
        function () {

            if (
                activeReminder &&
                activeReminder.id === medicine.id
            ) {

                scheduleTakenVoiceRecognition();

            }

        }
    );


    // REPEAT EVERY 10 SECONDS
    reminderVoiceTimer =
        setInterval(
            function () {

                if (!activeReminder) {
                    return;
                }


                stopTakenVoiceRecognition();


                speakReminder(
                    medicine,
                    function () {

                        if (
                            activeReminder &&
                            activeReminder.id === medicine.id
                        ) {

                            scheduleTakenVoiceRecognition();

                        }

                    }
                );

            },
            10000
        );


    // MISS AFTER 60 SECONDS
    reminderMissTimer =
        setTimeout(
            function () {

                if (
                    activeReminder &&
                    activeReminder.id === medicine.id
                ) {

                    markMissed(
                        medicine.id
                    );

                }

            },
            60000
        );

}


// ============================================================
// SHOW POPUP
// ============================================================

function showReminderPopup(medicine) {

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


    if (name) {

        // EXACT NAME
        name.textContent =
            medicine.name;

    }


    if (text) {

        text.textContent =
            medicine.dosage +
            " - " +
            getText("reminder");

    }


    if (popup) {

        popup.style.display =
            "flex";

        popup.classList.add(
            "active"
        );

    }

}


// ============================================================
// SPEAK REMINDER
// ============================================================

function speakReminder(
    medicine,
    callback
) {

    if (
        !("speechSynthesis" in window)
    ) {

        if (callback) {
            callback();
        }

        return;

    }


    speechSynthesis.cancel();


    const message =
        medicine.name +
        ". " +
        medicine.dosage +
        ". " +
        getText("reminder");


    const utterance =
        new SpeechSynthesisUtterance(
            message
        );


    const languageMap = {

        en: "en-IN",

        ta: "ta-IN",

        hi: "hi-IN",

        te: "te-IN"

    };


    utterance.lang =
        languageMap[
            selectedLanguage
        ] || "en-IN";


    utterance.rate =
        0.85;


    utterance.pitch =
        1;


    utterance.volume =
        1;


    utterance.onend =
        function () {

            if (callback) {

                setTimeout(
                    callback,
                    700
                );

            }

        };


    utterance.onerror =
        function () {

            if (callback) {

                setTimeout(
                    callback,
                    700
                );

            }

        };


    speechSynthesis.speak(
        utterance
    );

}


// ============================================================
// SPEAK NORMAL TEXT
// ============================================================

function speakText(text) {

    if (
        !("speechSynthesis" in window)
    ) {
        return;
    }


    speechSynthesis.cancel();


    const utterance =
        new SpeechSynthesisUtterance(
            text
        );


    const languageMap = {

        en: "en-IN",

        ta: "ta-IN",

        hi: "hi-IN",

        te: "te-IN"

    };


    utterance.lang =
        languageMap[
            selectedLanguage
        ] || "en-IN";


    utterance.rate =
        0.85;


    utterance.pitch =
        1;


    utterance.volume =
        1;


    speechSynthesis.speak(
        utterance
    );

}


// ============================================================
// VIBRATION
// ============================================================

function startContinuousVibration() {

    stopContinuousVibration();


    if (
        !navigator.vibrate
    ) {

        console.log(
            "Vibration not supported."
        );

        return;

    }


    navigator.vibrate(
        [800, 300]
    );


    vibrationTimer =
        setInterval(
            function () {

                if (
                    navigator.vibrate
                ) {

                    navigator.vibrate(
                        [800, 300]
                    );

                }

            },
            1100
        );

}


function stopContinuousVibration() {

    if (vibrationTimer) {

        clearInterval(
            vibrationTimer
        );

        vibrationTimer =
            null;

    }


    if (
        navigator.vibrate
    ) {

        navigator.vibrate(
            0
        );

    }

}


// ============================================================
// POPUP TAKE BUTTON
// ============================================================

function markTakenFromPopup() {

    if (!activeReminder) {
        return;
    }


    markTaken(
        activeReminder.id
    );

}


// ============================================================
// MARK TAKEN
// ============================================================

function markTaken(id) {

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
        new Date().toISOString();


    medicine.missedAt =
        null;


    saveMedicines();


    stopReminderCompletely();


    renderMedicines();

    updateDashboard();

    updateNextReminder();


    logActivity(
        getText("activityTaken") +
        " " +
        medicine.name
    );


    // Confirmation
    setTimeout(
        function () {

            speakText(
                medicine.name +
                ". " +
                getText("takenSuccess")
            );

        },
        200
    );

}


// ============================================================
// MARK MISSED
// ============================================================

function markMissed(id) {

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
        new Date().toISOString();


    saveMedicines();


    stopReminderCompletely();


    renderMedicines();

    updateDashboard();

    updateNextReminder();


    logActivity(
        getText("activityMissed") +
        " " +
        medicine.name
    );


    speakText(
        medicine.name +
        ". " +
        getText("missedMessage")
    );


    setTimeout(
        function () {

            sendCaregiverSMS(
                medicine
            );

        },
        1500
    );

}


// ============================================================
// STOP REMINDER COMPLETELY
// ============================================================

function stopReminderCompletely() {

    clearReminderTimers();


    stopTakenVoiceRecognition();


    stopContinuousVibration();


    if (
        "speechSynthesis" in window
    ) {

        speechSynthesis.cancel();

    }


    const popup =
        document.getElementById(
            "reminderPopup"
        );


    if (popup) {

        popup.classList.remove(
            "active"
        );

        popup.style.display =
            "none";

    }


    activeReminder =
        null;

}


// ============================================================
// CLEAR REMINDER TIMERS
// ============================================================

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


    if (takenVoiceRestartTimer) {

        clearTimeout(
            takenVoiceRestartTimer
        );

        takenVoiceRestartTimer =
            null;

    }

}


// ============================================================
// "I TOOK IT" VOICE RECOGNITION
// ============================================================

function scheduleTakenVoiceRecognition() {

    if (!activeReminder) {
        return;
    }


    if (takenVoiceRestartTimer) {
        return;
    }


    takenVoiceRestartTimer =
        setTimeout(
            function () {

                takenVoiceRestartTimer =
                    null;


                if (
                    activeReminder &&
                    !takenVoiceActive
                ) {

                    startTakenVoiceRecognition();

                }

            },
            500
        );

}


// ============================================================
// START TAKEN RECOGNITION
// ============================================================

function startTakenVoiceRecognition() {

    if (!activeReminder) {
        return;
    }


    const Recognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!Recognition) {

        console.log(
            "Speech Recognition unavailable."
        );

        return;

    }


    if (takenVoiceRecognition) {
        return;
    }


    const recognition =
        new Recognition();


    takenVoiceRecognition =
        recognition;


    takenVoiceActive =
        true;


    recognition.continuous =
        false;


    recognition.interimResults =
        false;


    recognition.maxAlternatives =
        5;


    /*
        IMPORTANT

        We listen in the selected regional
        language first.

        If the user is using Tamil/Hindi/
        Telugu and says "I took it" in English,
        we then automatically try English.
    */

    const languages = [

        selectedLanguage === "ta"
            ? "ta-IN"
            : selectedLanguage === "hi"
            ? "hi-IN"
            : selectedLanguage === "te"
            ? "te-IN"
            : "en-IN",

        "en-IN"

    ];


    const uniqueLanguages =
        [...new Set(languages)];


    recognition.lang =
        uniqueLanguages[
            takenRecognitionLanguageIndex %
            uniqueLanguages.length
        ];


    console.log(
        "🎤 LISTENING LANGUAGE:",
        recognition.lang
    );


    recognition.onstart =
        function () {

            console.log(
                "🎤 LISTENING FOR: I TOOK IT"
            );

        };


    recognition.onresult =
        function (event) {

            if (!activeReminder) {
                return;
            }


            const text =
                event.results[0][0]
                    .transcript
                    .trim()
                    .toLowerCase();


            console.log(
                "🎤 HEARD:",
                text
            );


            if (
                detectTakenCommand(text)
            ) {

                console.log(
                    "✅ I TOOK IT DETECTED"
                );


                const medicineId =
                    activeReminder.id;


                stopTakenVoiceRecognition();


                markTaken(
                    medicineId
                );


                return;

            }


            /*
                If the user spoke something else,
                try English if we started in a
                regional language.
            */

            if (
                selectedLanguage !== "en" &&
                recognition.lang !== "en-IN"
            ) {

                takenRecognitionLanguageIndex =
                    1;

            }

        };


    recognition.onerror =
        function (event) {

            console.log(
                "🎤 Recognition error:",
                event.error
            );


            if (!activeReminder) {
                return;
            }


            /*
                Restart automatically.
            */

            if (
                event.error ===
                    "not-allowed"
            ) {

                console.log(
                    "❌ Microphone permission denied."
                );

                return;

            }


            if (
                event.error ===
                    "service-not-allowed"
            ) {

                console.log(
                    "❌ Speech service not allowed."
                );

                return;

            }


            scheduleTakenVoiceRecognition();

        };


    recognition.onend =
        function () {

            console.log(
                "🎤 Recognition ended"
            );


            takenVoiceRecognition =
                null;


            takenVoiceActive =
                false;


            if (activeReminder) {

                /*
                    Switch back to selected
                    language for the next cycle.
                */

                takenRecognitionLanguageIndex =
                    0;


                scheduleTakenVoiceRecognition();

            }

        };


    try {

        recognition.start();

    } catch (error) {

        console.log(
            "Recognition start error:",
            error
        );


        takenVoiceRecognition =
            null;


        takenVoiceActive =
            false;


        scheduleTakenVoiceRecognition();

    }

}


// ============================================================
// STOP TAKEN RECOGNITION
// ============================================================

function stopTakenVoiceRecognition() {

    takenVoiceActive =
        false;


    if (takenVoiceRestartTimer) {

        clearTimeout(
            takenVoiceRestartTimer
        );

        takenVoiceRestartTimer =
            null;

    }


    if (takenVoiceRecognition) {

        const recognition =
            takenVoiceRecognition;


        takenVoiceRecognition =
            null;


        try {

            recognition.onresult =
                null;

            recognition.onerror =
                null;

            recognition.onend =
                null;

            recognition.stop();

        } catch (error) {

            console.log(
                "Recognition stop:",
                error
            );

        }

    }

}


// ============================================================
// DETECT "I TOOK IT"
// ============================================================

function detectTakenCommand(text) {

    if (!text) {
        return false;
    }


    text =
        text
            .toLowerCase()
            .trim();


    console.log(
        "🔎 CHECKING:",
        text
    );


    // ========================================================
    // ENGLISH
    // ========================================================

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

        "i already took my medicine",

        "i took",

        "took it",

        "took the medicine",

        "took medicine",

        "medicine taken",

        "medicine is taken",

        "medicine was taken",

        "medicine done",

        "medicine completed",

        "medicine finished",

        "taken",

        "done",

        "completed",

        "finished",

        "yes i took it",

        "yes took it",

        "yes done",

        "yes i have taken it"

    ];


    for (
        const command of englishCommands
    ) {

        if (
            text === command ||
            text.includes(command)
        ) {

            return true;

        }

    }


    // Flexible English

    if (

        /\b(i\s+)?(took|taken|have\s+taken)\b/i
            .test(text)

        &&

        /\b(it|medicine|medication|tablet|pill)\b/i
            .test(text)

    ) {

        return true;

    }


    // ========================================================
    // TAMIL
    // ========================================================

    const tamilCommands = [

        "எடுத்துவிட்டேன்",

        "எடுத்து விட்டேன்",

        "மருந்து எடுத்துவிட்டேன்",

        "மருந்து எடுத்தேன்",

        "மருந்தை எடுத்துவிட்டேன்",

        "மருந்தை எடுத்தேன்",

        "மருந்து எடுத்தாச்சு",

        "மருந்தை எடுத்தாச்சு",

        "எடுத்தாச்சு",

        "முடிந்தது",

        "மருந்து முடிந்தது",

        "நான் மருந்து எடுத்தேன்",

        "நான் எடுத்துவிட்டேன்"

    ];


    for (
        const command of tamilCommands
    ) {

        if (
            text.includes(command)
        ) {

            return true;

        }

    }


    // ========================================================
    // HINDI
    // ========================================================

    const hindiCommands = [

        "मैंने दवा ले ली",

        "मैंने दवाई ले ली",

        "दवा ले ली",

        "दवाई ले ली",

        "दवा लिया",

        "दवाई लिया",

        "ले लिया",

        "ले ली",

        "हो गया",

        "मैंने ले लिया",

        "मैंने ले ली",

        "दवा ले लिया"

    ];


    for (
        const command of hindiCommands
    ) {

        if (
            text.includes(command)
        ) {

            return true;

        }

    }


    // ========================================================
    // TELUGU
    // ========================================================

    const teluguCommands = [

        "నేను మందు తీసుకున్నాను",

        "మందు తీసుకున్నాను",

        "మందు తీసుకున్నా",

        "తీసుకున్నాను",

        "తీసుకున్నా",

        "మందు తీసుకున్న",

        "పూర్తయింది",

        "మందు పూర్తయింది",

        "నేను తీసుకున్నాను"

    ];


    for (
        const command of teluguCommands
    ) {

        if (
            text.includes(command)
        ) {

            return true;

        }

    }


    return false;

}


// ============================================================
// VOICE MEDICINE ENTRY
// ============================================================

function startVoiceMedicineEntry() {

    const Recognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!Recognition) {

        alert(
            getText(
                "voiceNotSupported"
            )
        );

        return;

    }


    stopVoiceMedicineEntry();


    voiceEntryActive =
        true;


    voiceStep =
        "name";


    updateVoiceStepUI();


    startVoiceStepRecognition();

}


// ============================================================
// START VOICE STEP
// ============================================================

function startVoiceStepRecognition() {

    if (!voiceEntryActive) {
        return;
    }


    const Recognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!Recognition) {
        return;
    }


    if (voiceRecognition) {

        try {

            voiceRecognition.stop();

        } catch {}

    }


    voiceRecognition =
        new Recognition();


    voiceRecognition.continuous =
        false;


    voiceRecognition.interimResults =
        false;


    const languageMap = {

        en: "en-IN",

        ta: "ta-IN",

        hi: "hi-IN",

        te: "te-IN"

    };


    voiceRecognition.lang =
        languageMap[
            selectedLanguage
        ] || "en-IN";


    voiceRecognition.onresult =
        function (event) {

            const text =
                event.results[0][0]
                    .transcript
                    .trim();


            console.log(
                "VOICE ENTRY:",
                text
            );


            processVoiceStep(
                text
            );

        };


    voiceRecognition.onerror =
        function (event) {

            console.log(
                "Voice entry error:",
                event.error
            );


            if (
                voiceEntryActive
            ) {

                setVoiceStatus(
                    getText(
                        "noSpeech"
                    )
                );

            }

        };


    voiceRecognition.onend =
        function () {

            voiceRecognition =
                null;

        };


    const prompt =
        voiceStep === "name"
            ? getText("speakName")
            : voiceStep === "dosage"
            ? getText("speakDosage")
            : getText("speakTime");


    speakText(
        prompt
    );


    setTimeout(
        function () {

            if (
                voiceEntryActive &&
                voiceRecognition
            ) {

                try {

                    voiceRecognition.start();

                    setVoiceStatus(
                        getText(
                            "voiceListening"
                        )
                    );

                } catch (error) {

                    console.log(
                        error
                    );

                }

            }

        },
        1800
    );

}


// ============================================================
// PROCESS VOICE STEP
// ============================================================

function processVoiceStep(text) {

    if (!voiceEntryActive) {
        return;
    }


    if (!text) {
        return;
    }


    // NAME

    if (voiceStep === "name") {

        const input =
            document.getElementById(
                "medicineName"
            );


        if (input) {

            input.value =
                text;

        }


        voiceStep =
            "dosage";


        updateVoiceStepUI();


        setTimeout(
            startVoiceStepRecognition,
            700
        );


        return;

    }


    // DOSAGE

    if (voiceStep === "dosage") {

        const input =
            document.getElementById(
                "dosage"
            );


        if (input) {

            input.value =
                text;

        }


        voiceStep =
            "time";


        updateVoiceStepUI();


        setTimeout(
            startVoiceStepRecognition,
            700
        );


        return;

    }


    // TIME

    if (voiceStep === "time") {

        const converted =
            convertSpokenTime(
                text
            );


        const input =
            document.getElementById(
                "medicineTime"
            );


        if (input) {

            input.value =
                converted || text;

        }


        updateVoiceStepUI();


        setTimeout(
            function () {

                stopVoiceMedicineEntry();

                addMedicine();

            },
            500
        );

    }

}


// ============================================================
// CONVERT SPOKEN TIME
// ============================================================

function convertSpokenTime(text) {

    if (!text) {
        return "";
    }


    text =
        text
            .toLowerCase()
            .trim();


    // Handle "8 pm"

    let match =
        text.match(
            /(\d{1,2})(?::(\d{1,2}))?\s*(am|pm)/
        );


    if (!match) {

        // Handle simple number

        match =
            text.match(
                /\b(\d{1,2})\b/
            );

    }


    if (!match) {
        return "";
    }


    let hour =
        parseInt(
            match[1],
            10
        );


    let minute =
        match[2]
            ? parseInt(
                match[2],
                10
            )
            : 0;


    const ampm =
        match[3];


    if (
        ampm === "pm" &&
        hour < 12
    ) {

        hour += 12;

    }


    if (
        ampm === "am" &&
        hour === 12
    ) {

        hour = 0;

    }


    if (
        hour > 23 ||
        minute > 59
    ) {

        return "";

    }


    return (
        String(hour)
            .padStart(2, "0") +
        ":" +
        String(minute)
            .padStart(2, "0")
    );

}


// ============================================================
// VOICE UI
// ============================================================

function updateVoiceStepUI() {

    document
        .querySelectorAll(
            ".voice-step"
        )
        .forEach(
            step => {

                step.classList.remove(
                    "active"
                );

            }
        );


    if (!voiceStep) {
        return;
    }


    const current =
        document.querySelector(
            `[data-step="${voiceStep}"]`
        );


    if (current) {

        current.classList.add(
            "active"
        );

    }

}


// ============================================================
// VOICE STATUS
// ============================================================

function setVoiceStatus(text) {

    const element =
        document.getElementById(
            "voiceEntryStatus"
        );


    if (element) {

        element.textContent =
            text;

    }

}


// ============================================================
// STOP VOICE MEDICINE ENTRY
// ============================================================

function stopVoiceMedicineEntry() {

    voiceEntryActive =
        false;


    voiceStep =
        null;


    if (voiceRecognition) {

        try {

            voiceRecognition.stop();

        } catch {}

    }


    voiceRecognition =
        null;


    updateVoiceStepUI();


    setVoiceStatus(
        getText(
            "voiceStopped"
        )
    );

}


// ============================================================
// ENABLE MOBILE VOICE
// ============================================================

function enableMobileVoice() {

    const Recognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!Recognition) {

        alert(
            getText(
                "voiceNotSupported"
            )
        );

        return;

    }


    voiceUnlocked =
        true;


    speakText(
        getText(
            "voiceEnabled"
        )
    );


    const status =
        document.getElementById(
            "voiceStatus"
        );


    if (status) {

        status.textContent =
            getText(
                "voiceEnabled"
            );

    }

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


    const number =
        input.value.trim();


    if (!number) {

        alert(
            getText(
                "noCaregiver"
            )
        );

        return;

    }


    localStorage.setItem(
        "jsMedicareCaregiver",
        number
    );


    alert(
        getText(
            "caregiverSaved"
        )
    );

}


// ============================================================
// CALL CAREGIVER
// ============================================================

function callCaregiver() {

    const number =
        localStorage.getItem(
            "jsMedicareCaregiver"
        ) ||
        document.getElementById(
            "caregiverPhone"
        )?.value ||
        "";


    if (!number) {

        alert(
            getText(
                "noCaregiver"
            )
        );

        return;

    }


    window.location.href =
        "tel:" +
        number;

}


// ============================================================
// CALL AMBULANCE
// ============================================================

function callAmbulance() {

    window.location.href =
        "tel:108";

}


// ============================================================
// REGIONAL SMS
// ============================================================

function sendCaregiverSMS(
    medicine
) {

    let language =
        document.getElementById(
            "dashboardLanguage"
        )?.value;


    if (
        !["en", "ta", "hi", "te"]
            .includes(language)
    ) {

        language =
            localStorage.getItem(
                "jsMedicareLanguage"
            );

    }


    if (
        !["en", "ta", "hi", "te"]
            .includes(language)
    ) {

        language =
            selectedLanguage;

    }


    if (
        !["en", "ta", "hi", "te"]
            .includes(language)
    ) {

        language =
            "en";

    }


    const medicineName =
        String(
            medicine.name || ""
        );


    const dosage =
        String(
            medicine.dosage || ""
        );


    let message;


    if (language === "ta") {

        message =
            "JS MEDICARE எச்சரிக்கை: " +
            medicineName +
            " (" +
            dosage +
            ") மருந்து தவறிவிட்டது. " +
            "தயவுசெய்து நோயாளியை கவனிக்கவும்.";

    }


    else if (language === "hi") {

        message =
            "JS MEDICARE चेतावनी: " +
            medicineName +
            " (" +
            dosage +
            ") दवा छूट गई है। " +
            "कृपया मरीज की जांच करें।";

    }


    else if (language === "te") {

        message =
            "JS MEDICARE హెచ్చరిక: " +
            medicineName +
            " (" +
            dosage +
            ") మందు మిస్ అయింది. " +
            "దయచేసి రోగిని తనిఖీ చేయండి.";

    }


    else {

        message =
            "JS MEDICARE Alert: " +
            medicineName +
            " (" +
            dosage +
            ") was missed. " +
            "Please check on the patient.";

    }


    console.log(
        "SMS LANGUAGE:",
        language
    );


    console.log(
        "SMS MESSAGE:",
        message
    );


    const caregiver =
        localStorage.getItem(
            "jsMedicareCaregiver"
        ) ||
        document.getElementById(
            "caregiverPhone"
        )?.value ||
        "";


    if (!caregiver) {

        alert(
            language === "ta"
                ? "முதலில் பராமரிப்பாளர் எண்ணை சேமிக்கவும்."
                : language === "hi"
                ? "पहले देखभालकर्ता नंबर सेव करें।"
                : language === "te"
                ? "ముందుగా కేర్‌గివర్ నంబర్‌ను సేవ్ చేయండి."
                : "Please save caregiver number first."
        );

        return;

    }


    const smsURL =
        "sms:" +
        encodeURIComponent(
            caregiver
        ) +
        "?body=" +
        encodeURIComponent(
            message
        );


    console.log(
        "SMS URL:",
        smsURL
    );


    window.location.href =
        smsURL;

}


// ============================================================
// ACTIVITY LOG
// ============================================================

function logActivity(message) {

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
        "activity-item";


    item.textContent =
        new Date().toLocaleTimeString() +
        " - " +
        message;


    log.prepend(
        item
    );

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
            "--";

        return;

    }


    element.textContent =
        pending[0].name +
        " - " +
        formatTime(
            pending[0].time
        );

}


// ============================================================
// MEDICATION REPORT
// ============================================================

function generateMedicationReport() {

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
                            ${escapeHTML(
                                medicine.status
                            )}
                        </td>

                    </tr>

                `
            )
            .join("");


    const report = `

        <!DOCTYPE html>

        <html>

        <head>

            <meta charset="UTF-8">

            <title>
                JS MEDICARE Report
            </title>

            <style>

                body {
                    font-family: Arial, sans-serif;
                    padding: 30px;
                }

                h1 {
                    text-align: center;
                    color: #087744;
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
                    background: #eaf7f0;
                }

            </style>

        </head>

        <body>

            <h1>
                JS MEDICARE
            </h1>

            <h2>
                ${getText("report")}
            </h2>

            <p>
                Patient:
                ${escapeHTML(
                    patientName
                )}
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

                    </tr>

                </thead>

                <tbody>

                    ${rows}

                </tbody>

            </table>

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
            "Please allow popups to generate the report."
        );

        return;

    }


    reportWindow.document.open();


    reportWindow.document.write(
        report
    );


    reportWindow.document.close();


    reportWindow.focus();


    setTimeout(
        function () {

            reportWindow.print();

        },
        500
    );

}


// ============================================================
// ESCAPE HTML
// ============================================================

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
