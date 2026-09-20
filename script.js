// ============================================================
// MEDICARE AI
// COMPLETE MEDICATION REMINDER SCRIPT
// ============================================================


// ============================================================
// GLOBAL VARIABLES
// ============================================================

let medicines = [];

let activeReminder = null;

let reminderLoop = null;

let reminderLoopRepeat = null;

let missedTimer = null;

let mobileVoiceEnabled = false;

let availableVoices = [];

let reminderCheckerStarted = false;


// ============================================================
// TRANSLATIONS
// ============================================================

const translations = {

    en: {

        subtitle:
            "AI Powered Healthcare Assistant",

        aiStatus:
            "AI Monitoring Online",

        welcome:
            "Welcome",

        total:
            "Total Medicines",

        taken:
            "Taken",

        missed:
            "Missed",

        adherence:
            "Adherence",

        nextReminder:
            "Next Medication Reminder",

        noReminder:
            "No reminders",

        addMedicine:
            "Add Medicine",

        medicineList:
            "Medicine Schedule",

        medicineName:
            "Medicine Name",

        dosage:
            "Dosage",

        add:
            "Add Medicine",

        pending:
            "Pending",

        takenStatus:
            "Taken",

        missedStatus:
            "Missed",

        take:
            "Take",

        delete:
            "Delete",

        caregiver:
            "Caregiver",

        caregiverPhone:
            "Caregiver Phone Number",

        saveCaregiver:
            "Save Caregiver",

        report:
            "Medication Report",

        totalMedicines:
            "Total Medicines",

        medicinesTaken:
            "Medicines Taken",

        medicinesMissed:
            "Medicines Missed",

        medicinesPending:
            "Pending Medicines",

        activityLog:
            "Activity Log",

        callCaregiver:
            "Call Caregiver",

        emergency:
            "Emergency",

        logout:
            "Logout",

        aiTitle:
            "AI Healthcare Assistant",

        aiMessage:
            "Your medication schedule is being monitored automatically.",

        patientName:
            "Patient Name",

        phone:
            "Phone Number",

        language:
            "Select Language",

        login:
            "Login",

        voiceReady:
            "Voice reminder ready",

        medicineAdded:
            "Medicine added successfully",

        medicineAlreadyExists:
            "This medicine is already scheduled at this time.",

        invalidDetails:
            "Please enter medicine name, dosage and time.",

        caregiverSaved:
            "Caregiver number saved.",

        voiceReminder:
            "Voice reminder",

        reminderMissed:
            "Medicine was missed",

        caregiverAlert:
            "Caregiver alert sent.",

        medicineDeleted:
            "Medicine deleted.",

        enableVoice:
            "Enable Mobile Voice",

        fullReport:
            "View Full Medication Report",

        scheduledTime:
            "Scheduled Time",

        status:
            "Status",

        actionTime:
            "Taken / Missed Time",

        reportGenerated:
            "Report Generated",

        printSave:
            "Print / Save as PDF"

    },


    ta: {

        subtitle:
            "AI இயக்கும் சுகாதார உதவியாளர்",

        aiStatus:
            "AI கண்காணிப்பு செயல்பாட்டில் உள்ளது",

        welcome:
            "வரவேற்கிறோம்",

        total:
            "மொத்த மருந்துகள்",

        taken:
            "எடுத்தவை",

        missed:
            "தவறியவை",

        adherence:
            "மருந்து பின்பற்றல்",

        nextReminder:
            "அடுத்த மருந்து நினைவூட்டல்",

        noReminder:
            "நினைவூட்டல் இல்லை",

        addMedicine:
            "மருந்து சேர்க்கவும்",

        medicineList:
            "மருந்து அட்டவணை",

        medicineName:
            "மருந்தின் பெயர்",

        dosage:
            "அளவு",

        add:
            "மருந்து சேர்க்கவும்",

        pending:
            "நிலுவையில்",

        takenStatus:
            "எடுத்துவிட்டார்",

        missedStatus:
            "தவறிவிட்டது",

        take:
            "எடுத்தேன்",

        delete:
            "நீக்கு",

        caregiver:
            "பராமரிப்பாளர்",

        caregiverPhone:
            "பராமரிப்பாளர் தொலைபேசி எண்",

        saveCaregiver:
            "பராமரிப்பாளரை சேமிக்கவும்",

        report:
            "மருந்து அறிக்கை",

        totalMedicines:
            "மொத்த மருந்துகள்",

        medicinesTaken:
            "எடுத்த மருந்துகள்",

        medicinesMissed:
            "தவறிய மருந்துகள்",

        medicinesPending:
            "நிலுவையில் உள்ள மருந்துகள்",

        activityLog:
            "செயல்பாட்டு பதிவு",

        callCaregiver:
            "பராமரிப்பாளரை அழைக்கவும்",

        emergency:
            "அவசரம்",

        logout:
            "வெளியேறு",

        aiTitle:
            "AI சுகாதார உதவியாளர்",

        aiMessage:
            "உங்கள் மருந்து அட்டவணை தானாக கண்காணிக்கப்படுகிறது.",

        patientName:
            "நோயாளர் பெயர்",

        phone:
            "தொலைபேசி எண்",

        language:
            "மொழியை தேர்வு செய்யவும்",

        login:
            "உள்நுழைவு",

        voiceReady:
            "குரல் நினைவூட்டல் தயாராக உள்ளது",

        medicineAdded:
            "மருந்து வெற்றிகரமாக சேர்க்கப்பட்டது",

        medicineAlreadyExists:
            "இந்த மருந்து ஏற்கனவே இந்த நேரத்தில் உள்ளது.",

        invalidDetails:
            "மருந்தின் பெயர், அளவு மற்றும் நேரத்தை உள்ளிடவும்.",

        caregiverSaved:
            "பராமரிப்பாளர் எண் சேமிக்கப்பட்டது.",

        voiceReminder:
            "குரல் நினைவூட்டல்",

        reminderMissed:
            "மருந்து தவறிவிட்டது",

        caregiverAlert:
            "பராமரிப்பாளருக்கு தகவல் அனுப்பப்பட்டது.",

        medicineDeleted:
            "மருந்து நீக்கப்பட்டது.",

        enableVoice:
            "மொபைல் குரலை செயல்படுத்தவும்",

        fullReport:
            "முழு மருந்து அறிக்கையை பார்க்கவும்",

        scheduledTime:
            "திட்டமிட்ட நேரம்",

        status:
            "நிலை",

        actionTime:
            "எடுத்த / தவறிய நேரம்",

        reportGenerated:
            "அறிக்கை உருவாக்கப்பட்ட நேரம்",

        printSave:
            "அச்சிடு / PDF ஆக சேமி"

    },


    hi: {

        subtitle:
            "AI संचालित स्वास्थ्य सहायक",

        aiStatus:
            "AI निगरानी ऑनलाइन",

        welcome:
            "स्वागत है",

        total:
            "कुल दवाइयाँ",

        taken:
            "ली गई",

        missed:
            "छूटी हुई",

        adherence:
            "दवा पालन",

        nextReminder:
            "अगला दवा रिमाइंडर",

        noReminder:
            "कोई रिमाइंडर नहीं",

        addMedicine:
            "दवा जोड़ें",

        medicineList:
            "दवा अनुसूची",

        medicineName:
            "दवा का नाम",

        dosage:
            "खुराक",

        add:
            "दवा जोड़ें",

        pending:
            "लंबित",

        takenStatus:
            "ली गई",

        missedStatus:
            "छूट गई",

        take:
            "लिया",

        delete:
            "हटाएं",

        caregiver:
            "देखभालकर्ता",

        caregiverPhone:
            "देखभालकर्ता फोन नंबर",

        saveCaregiver:
            "देखभालकर्ता सेव करें",

        report:
            "दवा रिपोर्ट",

        totalMedicines:
            "कुल दवाइयाँ",

        medicinesTaken:
            "ली गई दवाइयाँ",

        medicinesMissed:
            "छूटी हुई दवाइयाँ",

        medicinesPending:
            "लंबित दवाइयाँ",

        activityLog:
            "गतिविधि लॉग",

        callCaregiver:
            "देखभालकर्ता को कॉल करें",

        emergency:
            "आपातकाल",

        logout:
            "लॉग आउट",

        aiTitle:
            "AI स्वास्थ्य सहायक",

        aiMessage:
            "आपकी दवा अनुसूची की स्वचालित निगरानी की जा रही है।",

        patientName:
            "मरीज का नाम",

        phone:
            "फोन नंबर",

        language:
            "भाषा चुनें",

        login:
            "लॉगिन",

        voiceReady:
            "वॉयस रिमाइंडर तैयार है",

        medicineAdded:
            "दवा सफलतापूर्वक जोड़ी गई",

        medicineAlreadyExists:
            "यह दवा इस समय पहले से निर्धारित है।",

        invalidDetails:
            "दवा का नाम, खुराक और समय दर्ज करें।",

        caregiverSaved:
            "देखभालकर्ता नंबर सेव किया गया।",

        voiceReminder:
            "वॉयस रिमाइंडर",

        reminderMissed:
            "दवा छूट गई",

        caregiverAlert:
            "देखभालकर्ता को सूचना भेजी गई।",

        medicineDeleted:
            "दवा हटा दी गई।",

        enableVoice:
            "मोबाइल वॉयस सक्षम करें",

        fullReport:
            "पूरी दवा रिपोर्ट देखें",

        scheduledTime:
            "निर्धारित समय",

        status:
            "स्थिति",

        actionTime:
            "ली / छूटी समय",

        reportGenerated:
            "रिपोर्ट बनाई गई",

        printSave:
            "प्रिंट / PDF के रूप में सेव करें"

    },


    te: {

        subtitle:
            "AI ఆధారిత ఆరోగ్య సహాయకుడు",

        aiStatus:
            "AI పర్యవేక్షణ ఆన్‌లైన్‌లో ఉంది",

        welcome:
            "స్వాగతం",

        total:
            "మొత్తం మందులు",

        taken:
            "తీసుకున్నవి",

        missed:
            "తప్పిపోయినవి",

        adherence:
            "మందుల అనుసరణ",

        nextReminder:
            "తదుపరి మందు రిమైండర్",

        noReminder:
            "రిమైండర్ లేదు",

        addMedicine:
            "మందు జోడించండి",

        medicineList:
            "మందుల షెడ్యూల్",

        medicineName:
            "మందు పేరు",

        dosage:
            "మోతాదు",

        add:
            "మందు జోడించండి",

        pending:
            "పెండింగ్",

        takenStatus:
            "తీసుకున్నారు",

        missedStatus:
            "తప్పిపోయింది",

        take:
            "తీసుకున్నాను",

        delete:
            "తొలగించు",

        caregiver:
            "సంరక్షకుడు",

        caregiverPhone:
            "సంరక్షకుడి ఫోన్ నంబర్",

        saveCaregiver:
            "సంరక్షకుడిని సేవ్ చేయండి",

        report:
            "మందుల నివేదిక",

        totalMedicines:
            "మొత్తం మందులు",

        medicinesTaken:
            "తీసుకున్న మందులు",

        medicinesMissed:
            "తప్పిపోయిన మందులు",

        medicinesPending:
            "పెండింగ్ మందులు",

        activityLog:
            "కార్యాచరణ లాగ్",

        callCaregiver:
            "సంరక్షకుడికి కాల్ చేయండి",

        emergency:
            "అత్యవసరం",

        logout:
            "లాగ్ అవుట్",

        aiTitle:
            "AI ఆరోగ్య సహాయకుడు",

        aiMessage:
            "మీ మందుల షెడ్యూల్ స్వయంచాలకంగా పర్యవేక్షించబడుతోంది.",

        patientName:
            "రోగి పేరు",

        phone:
            "ఫోన్ నంబర్",

        language:
            "భాషను ఎంచుకోండి",

        login:
            "లాగిన్",

        voiceReady:
            "వాయిస్ రిమైండర్ సిద్ధంగా ఉంది",

        medicineAdded:
            "మందు విజయవంతంగా జోడించబడింది",

        medicineAlreadyExists:
            "ఈ మందు ఇప్పటికే ఈ సమయంలో షెడ్యూల్ చేయబడింది.",

        invalidDetails:
            "మందు పేరు, మోతాదు మరియు సమయం నమోదు చేయండి.",

        caregiverSaved:
            "సంరక్షకుడి నంబర్ సేవ్ చేయబడింది.",

        voiceReminder:
            "వాయిస్ రిమైండర్",

        reminderMissed:
            "మందు తప్పిపోయింది",

        caregiverAlert:
            "సంరక్షకుడికి సమాచారం పంపబడింది.",

        medicineDeleted:
            "మందు తొలగించబడింది.",

        enableVoice:
            "మొబైల్ వాయిస్‌ను ప్రారంభించండి",

        fullReport:
            "పూర్తి మందుల నివేదికను చూడండి",

        scheduledTime:
            "షెడ్యూల్ సమయం",

        status:
            "స్థితి",

        actionTime:
            "తీసుకున్న / తప్పిపోయిన సమయం",

        reportGenerated:
            "నివేదిక రూపొందించిన సమయం",

        printSave:
            "ప్రింట్ / PDFగా సేవ్ చేయండి"

    }

};


// ============================================================
// GET LANGUAGE
// ============================================================

function getLanguage() {

    return (
        localStorage.getItem(
            "selectedLanguage"
        ) || "en"
    );

}


// ============================================================
// CHANGE LANGUAGE
// ============================================================

function changeLanguage(lang) {

    localStorage.setItem(
        "selectedLanguage",
        lang
    );

    applyLanguage(lang);

    loadMedicines();

    updateDashboard();

    updateNextReminder();

    prepareSpeech();

}


// ============================================================
// APPLY LANGUAGE
// ============================================================

function applyLanguage(lang) {

    const t =
        translations[lang] ||
        translations.en;


    const setText =
        function(id, text) {

            const element =
                document.getElementById(id);

            if (element) {

                element.textContent =
                    text;

            }

        };


    const setPlaceholder =
        function(id, text) {

            const element =
                document.getElementById(id);

            if (element) {

                element.placeholder =
                    text;

            }

        };


    setText(
        "loginSubtitle",
        t.subtitle
    );

    setText(
        "headerSubtitle",
        t.subtitle
    );

    setText(
        "aiStatusText",
        t.aiStatus
    );

    setText(
        "nameLabel",
        t.patientName
    );

    setText(
        "phoneLabel",
        t.phone
    );

    setText(
        "languageLabel",
        t.language
    );

    setText(
        "loginButton",
        t.login
    );

    setText(
        "totalLabel",
        t.total
    );

    setText(
        "takenLabel",
        t.taken
    );

    setText(
        "missedLabel",
        t.missed
    );

    setText(
        "adherenceLabel",
        t.adherence
    );

    setText(
        "nextReminderTitle",
        t.nextReminder
    );

    setText(
        "addMedicineTitle",
        t.addMedicine
    );

    setText(
        "medicineListTitle",
        t.medicineList
    );

    setText(
        "caregiverTitle",
        t.caregiver
    );

    setText(
        "caregiverPhoneLabel",
        t.caregiverPhone
    );

    setText(
        "saveCaregiverButton",
        t.saveCaregiver
    );

    setText(
        "reportTitle",
        t.report
    );

    setText(
        "reportTotalText",
        t.totalMedicines
    );

    setText(
        "reportTakenText",
        t.medicinesTaken
    );

    setText(
        "reportMissedText",
        t.medicinesMissed
    );

    setText(
        "reportAdherenceText",
        t.adherence
    );

    setText(
        "fullReportButton",
        "📄 " + t.fullReport
    );

    setText(
        "logTitle",
        t.activityLog
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
        "callCaregiverButton",
        "📞 " + t.callCaregiver
    );

    setText(
        "ambulanceButton",
        "🚑 " + t.emergency
    );

    setText(
        "logoutButton",
        t.logout
    );

    setText(
        "enableVoiceButton",
        "🔊 " + t.enableVoice
    );


    setPlaceholder(
        "patientName",
        t.patientName
    );

    setPlaceholder(
        "patientPhone",
        t.phone
    );

    setPlaceholder(
        "medicineName",
        t.medicineName
    );

    setPlaceholder(
        "dosage",
        t.dosage
    );

    setPlaceholder(
        "caregiverPhone",
        t.caregiverPhone
    );


    const name =
        localStorage.getItem(
            "patientName"
        );


    if (name) {

        setText(
            "welcomeTitle",
            `${t.welcome}, ${name}!`
        );

    }

}


// ============================================================
// LOGIN
// ============================================================

function login() {

    const name =
        document.getElementById(
            "patientName"
        ).value.trim();


    const phone =
        document.getElementById(
            "patientPhone"
        ).value.trim();


    const language =
        document.getElementById(
            "languageSelect"
        ).value;


    if (!name || !phone) {

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
        "patientPhone",
        phone
    );

    localStorage.setItem(
        "selectedLanguage",
        language
    );


    document.getElementById(
        "loginSection"
    ).style.display = "none";


    document.getElementById(
        "dashboardSection"
    ).style.display = "block";


    document.getElementById(
        "dashboardLanguage"
    ).value = language;


    loadMedicines();

    loadCaregiver();

    applyLanguage(language);

    updateDashboard();

    updateNextReminder();

    prepareSpeech();

    enableMobileVoiceSilently();

    startReminderChecker();

    addLog(
        translations[language].login
    );

}


// ============================================================
// STORAGE KEY
// ============================================================

function getMedicineStorageKey() {

    const phone =
        localStorage.getItem(
            "patientPhone"
        ) || "default";

    return (
        "medicines_" +
        phone
    );

}


// ============================================================
// SAVE MEDICINES
// ============================================================

function saveMedicines() {

    localStorage.setItem(
        getMedicineStorageKey(),
        JSON.stringify(
            medicines
        )
    );

}


// ============================================================
// LOAD MEDICINES
// ============================================================

function loadMedicines() {

    try {

        const data =
            localStorage.getItem(
                getMedicineStorageKey()
            );


        medicines =
            data
                ? JSON.parse(data)
                : [];


        if (!Array.isArray(medicines)) {

            medicines = [];

        }

    }

    catch(error) {

        console.log(
            "Medicine loading error:",
            error
        );

        medicines = [];

    }


    renderMedicines();

}


// ============================================================
// ADD MEDICINE
// ============================================================

function addMedicine() {

    const name =
        document.getElementById(
            "medicineName"
        ).value.trim();


    const dosage =
        document.getElementById(
            "dosage"
        ).value.trim();


    const time =
        document.getElementById(
            "medicineTime"
        ).value;


    const lang =
        getLanguage();


    const t =
        translations[lang];


    if (!name || !dosage || !time) {

        alert(
            t.invalidDetails
        );

        return;

    }


    const duplicate =
        medicines.some(
            medicine =>
                medicine.name.toLowerCase() ===
                name.toLowerCase() &&
                medicine.time === time &&
                medicine.status === "Pending"
        );


    if (duplicate) {

        alert(
            t.medicineAlreadyExists
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
            new Date().toLocaleString(),

        takenAt: "",

        missedAt: ""

    };


    medicines.push(
        medicine
    );


    saveMedicines();

    loadMedicines();

    updateDashboard();

    updateNextReminder();


    document.getElementById(
        "medicineName"
    ).value = "";


    document.getElementById(
        "dosage"
    ).value = "";


    document.getElementById(
        "medicineTime"
    ).value = "";


    document.getElementById(
        "voiceStatus"
    ).textContent =
        "💊 " + t.medicineAdded;


    addLog(
        "💊 " +
        name +
        " - " +
        t.medicineAdded
    );


    // Mobile browser user interaction
    enableMobileVoiceSilently();

}


// ============================================================
// RENDER MEDICINES
// ============================================================

function renderMedicines() {

    const list =
        document.getElementById(
            "medicineList"
        );


    if (!list) {

        return;

    }


    list.innerHTML = "";


    const lang =
        getLanguage();


    const t =
        translations[lang];


    if (medicines.length === 0) {

        list.innerHTML = `

            <div
                style="
                    padding:20px;
                    text-align:center;
                    color:#607d8b;
                "
            >

                ${t.noReminder}

            </div>

        `;

        return;

    }


    const sorted =
        medicines
            .slice()
            .sort(
                (a, b) =>
                    a.time.localeCompare(
                        b.time
                    )
            );


    sorted.forEach(
        medicine => {


            let statusText =
                t.pending;


            if (
                medicine.status ===
                "Taken"
            ) {

                statusText =
                    t.takenStatus;

            }

            else if (
                medicine.status ===
                "Missed"
            ) {

                statusText =
                    t.missedStatus;

            }


            let actionButtons = "";


            if (
                medicine.status ===
                "Pending"
            ) {

                actionButtons = `

                    <button
                        class="btn-success"
                        onclick="markTaken(${medicine.id})"
                    >

                        ✓ ${t.take}

                    </button>

                `;

            }


            list.innerHTML += `

                <div class="medicine-item">

                    <div class="medicine-info">

                        <h3>
                            💊
                            ${escapeHTML(
                                medicine.name
                            )}
                        </h3>

                        <p>
                            <strong>
                                ${t.dosage}:
                            </strong>

                            ${escapeHTML(
                                medicine.dosage
                            )}
                        </p>

                        <p>
                            🕐
                            ${medicine.time}
                        </p>

                        <p
                            class="status
                            ${medicine.status.toLowerCase()}"
                        >

                            ${statusText}

                        </p>

                        ${
                            medicine.takenAt
                            ? `
                                <p>
                                    ✓ ${medicine.takenAt}
                                </p>
                            `
                            : ""
                        }

                        ${
                            medicine.missedAt
                            ? `
                                <p>
                                    ✕ ${medicine.missedAt}
                                </p>
                            `
                            : ""
                        }

                    </div>


                    <div class="medicine-actions">

                        ${actionButtons}


                        <button
                            class="btn-danger"
                            onclick="deleteMedicine(${medicine.id})"
                        >

                            🗑 ${t.delete}

                        </button>

                    </div>

                </div>

            `;

        }
    );

}


// ============================================================
// ESCAPE HTML
// ============================================================

function escapeHTML(value) {

    return String(value ?? "")
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
// UPDATE DASHBOARD
// ============================================================

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


    const completed =
        taken + missed;


    const adherence =
        completed > 0
            ? Math.round(
                (taken / completed) *
                100
            )
            : 0;


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


    setElementText(
        "reportTotal",
        total
    );


    setElementText(
        "reportTaken",
        taken
    );


    setElementText(
        "reportMissed",
        missed
    );


    setElementText(
        "reportAdherence",
        adherence + "%"
    );

}


// ============================================================
// HELPER
// ============================================================

function setElementText(
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


    if (pending.length === 0) {

        element.textContent =
            translations[
                getLanguage()
            ].noReminder;

        return;

    }


    const medicine =
        pending[0];


    element.innerHTML = `

        💊
        ${escapeHTML(
            medicine.name
        )}

        <br>

        🕐
        ${medicine.time}

        <br>

        <small>
            ${escapeHTML(
                medicine.dosage
            )}
        </small>

    `;

}


// ============================================================
// SPEECH LANGUAGE
// ============================================================

function getSpeechLanguage() {

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


// ============================================================
// PREPARE SPEECH
// ============================================================

function prepareSpeech() {

    if (
        !(
            "speechSynthesis"
            in window
        )
    ) {

        return;

    }


    function loadVoices() {

        availableVoices =
            window.speechSynthesis
                .getVoices();

        console.log(
            "Available voices:",
            availableVoices
        );

    }


    loadVoices();


    window.speechSynthesis
        .onvoiceschanged =
        loadVoices;

}


// ============================================================
// FIND VOICE
// ============================================================

function getVoice(
    languageCode
) {

    if (
        !availableVoices ||
        availableVoices.length === 0
    ) {

        availableVoices =
            window.speechSynthesis
                .getVoices();

    }


    const exact =
        availableVoices.find(
            voice =>
                voice.lang
                    .toLowerCase() ===
                languageCode
                    .toLowerCase()
        );


    if (exact) {

        return exact;

    }


    const prefix =
        languageCode
            .split("-")[0]
            .toLowerCase();


    const matching =
        availableVoices.find(
            voice =>
                voice.lang
                    .toLowerCase()
                    .startsWith(prefix)
        );


    return matching || null;

}


// ============================================================
// ENABLE MOBILE VOICE
// ============================================================

function enableMobileVoice() {

    if (
        !(
            "speechSynthesis"
            in window
        )
    ) {

        alert(
            "Voice reminders are not supported by this browser."
        );

        return;

    }


    mobileVoiceEnabled = true;


    prepareSpeech();


    const lang =
        getLanguage();


    let testMessage =
        "Voice reminder enabled";


    if (lang === "ta") {

        testMessage =
            "குரல் நினைவூட்டல் செயல்படுத்தப்பட்டது";

    }

    else if (lang === "hi") {

        testMessage =
            "वॉयस रिमाइंडर सक्रिय किया गया है";

    }

    else if (lang === "te") {

        testMessage =
            "వాయిస్ రిమైండర్ ప్రారంభించబడింది";

    }


    window.speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(
            testMessage
        );


    speech.lang =
        getSpeechLanguage();


    speech.rate =
        0.85;


    speech.pitch =
        1;


    speech.volume =
        1;


    const voice =
        getVoice(
            speech.lang
        );


    if (voice) {

        speech.voice =
            voice;

    }


    speech.onstart =
        function() {

            const status =
                document.getElementById(
                    "voiceStatus"
                );


            if (status) {

                status.textContent =
                    testMessage;

            }

        };


    speech.onend =
        function() {

            const status =
                document.getElementById(
                    "voiceStatus"
                );


            if (status) {

                status.textContent =
                    translations[
                        getLanguage()
                    ].voiceReady;

            }

        };


    speech.onerror =
        function(event) {

            console.log(
                "Voice error:",
                event.error
            );

        };


    try {

        window.speechSynthesis.resume();

        window.speechSynthesis.speak(
            speech
        );

    }

    catch(error) {

        console.log(
            error
        );

    }

}


// ============================================================
// SILENT MOBILE VOICE UNLOCK
// ============================================================

function enableMobileVoiceSilently() {

    if (mobileVoiceEnabled) {

        return;

    }


    if (
        !(
            "speechSynthesis"
            in window
        )
    ) {

        return;

    }


    try {

        const unlockSpeech =
            new SpeechSynthesisUtterance(
                " "
            );


        unlockSpeech.lang =
            getSpeechLanguage();


        unlockSpeech.volume =
            0;


        unlockSpeech.rate =
            10;


        window.speechSynthesis.speak(
            unlockSpeech
        );


        window.speechSynthesis.resume();


        mobileVoiceEnabled = true;

    }

    catch(error) {

        console.log(
            "Voice unlock error:",
            error
        );

    }

}


// ============================================================
// SPEAK MEDICINE REMINDER
// ============================================================

function speakMedicineReminder(
    medicine
) {

    if (
        !(
            "speechSynthesis"
            in window
        )
    ) {

        return;

    }


    const lang =
        getLanguage();


    const speechLanguage =
        getSpeechLanguage();


    let message = "";


    if (lang === "ta") {

        message =
            `${medicine.name} மருந்தை எடுத்துக்கொள்ளும் நேரம் வந்துவிட்டது`;

    }

    else if (lang === "hi") {

        message =
            `${medicine.name} दवा लेने का समय हो गया है`;

    }

    else if (lang === "te") {

        message =
            `${medicine.name} మందు తీసుకునే సమయం వచ్చింది`;

    }

    else {

        message =
            `Time to take ${medicine.name}`;

    }


    console.log(
        "VOICE:",
        message
    );


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


    const voice =
        getVoice(
            speechLanguage
        );


    if (voice) {

        speech.voice =
            voice;

    }


    speech.onstart =
        function() {

            const status =
                document.getElementById(
                    "voiceStatus"
                );


            if (status) {

                status.textContent =
                    "🔊 " + message;

            }

        };


    speech.onerror =
        function(event) {

            console.log(
                "Speech error:",
                event.error
            );

        };


    try {

        window.speechSynthesis.resume();

        window.speechSynthesis.speak(
            speech
        );

    }

    catch(error) {

        console.log(
            "Speech error:",
            error
        );

    }

}


// ============================================================
// START REMINDER CHECKER
// ============================================================

function startReminderChecker() {

    if (reminderCheckerStarted) {

        return;

    }


    reminderCheckerStarted = true;


    setInterval(
        checkMedicationReminder,
        1000
    );

}


// ============================================================
// CHECK MEDICATION REMINDER
// ============================================================

function checkMedicationReminder() {

    const now =
        new Date();


    const currentTime =
        now.toTimeString()
            .slice(0, 5);


    medicines.forEach(
        medicine => {

            if (
                medicine.status !==
                "Pending"
            ) {

                return;

            }


            if (
                medicine.time ===
                currentTime
            ) {

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

function triggerReminder(
    medicine
) {

    if (
        activeReminder &&
        activeReminder.id ===
        medicine.id
    ) {

        return;

    }


    stopActiveReminder();


    activeReminder =
        medicine;


    // Speak immediately

    speakMedicineReminder(
        medicine
    );


    // Repeat voice every 10 seconds

    reminderLoopRepeat =
        setInterval(
            function() {

                if (
                    medicine.status ===
                    "Pending"
                ) {

                    speakMedicineReminder(
                        medicine
                    );

                }

            },
            10000
        );


    // Mark missed after 60 seconds

    missedTimer =
        setTimeout(
            function() {

                if (
                    medicine.status ===
                    "Pending"
                ) {

                    medicine.status =
                        "Missed";


                    medicine.missedAt =
                        new Date()
                            .toLocaleString();


                    medicine.takenAt =
                        "";


                    saveMedicines();


                    loadMedicines();


                    updateDashboard();

                    updateNextReminder();


                    speakMissedReminder(
                        medicine
                    );


                    sendCaregiverSMS(
                        medicine
                    );


                    addLog(
                        "❌ " +
                        medicine.name +
                        " - " +
                        translations[
                            getLanguage()
                        ].reminderMissed
                    );

                }


                stopActiveReminder();

            },
            60000
        );

}


// ============================================================
// STOP ACTIVE REMINDER
// ============================================================

function stopActiveReminder() {

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


    if (
        "speechSynthesis"
        in window
    ) {

        window.speechSynthesis.cancel();

    }


    activeReminder =
        null;

}


// ============================================================
// MARK TAKEN
// ============================================================

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
        "Taken";


    medicine.takenAt =
        new Date()
            .toLocaleString();


    medicine.missedAt =
        "";


    if (
        activeReminder &&
        activeReminder.id === id
    ) {

        stopActiveReminder();

    }


    saveMedicines();

    loadMedicines();

    updateDashboard();

    updateNextReminder();


    const t =
        translations[
            getLanguage()
        ];


    addLog(
        "✓ " +
        medicine.name +
        " - " +
        t.takenStatus
    );

}


// ============================================================
// DELETE MEDICINE
// ============================================================

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
        activeReminder &&
        activeReminder.id === id
    ) {

        stopActiveReminder();

    }


    medicines =
        medicines.filter(
            item =>
                item.id !== id
        );


    saveMedicines();

    loadMedicines();

    updateDashboard();

    updateNextReminder();


    addLog(
        "🗑 " +
        medicine.name +
        " - " +
        translations[
            getLanguage()
        ].medicineDeleted
    );

}


// ============================================================
// MISSED VOICE
// ============================================================

function speakMissedReminder(
    medicine
) {

    if (
        !(
            "speechSynthesis"
            in window
        )
    ) {

        return;

    }


    const lang =
        getLanguage();


    let message = "";


    if (lang === "ta") {

        message =
            `${medicine.name} மருந்து தவறிவிட்டது`;

    }

    else if (lang === "hi") {

        message =
            `${medicine.name} दवा छूट गई है`;

    }

    else if (lang === "te") {

        message =
            `${medicine.name} మందు తప్పిపోయింది`;

    }

    else {

        message =
            `${medicine.name} medicine was missed`;

    }


    const speech =
        new SpeechSynthesisUtterance(
            message
        );


    speech.lang =
        getSpeechLanguage();


    speech.rate =
        0.85;


    const voice =
        getVoice(
            speech.lang
        );


    if (voice) {

        speech.voice =
            voice;

    }


    window.speechSynthesis.speak(
        speech
    );

}


// ============================================================
// CAREGIVER SMS
// ============================================================

function sendCaregiverSMS(
    medicine
) {

    const caregiver =
        localStorage.getItem(
            "caregiverPhone"
        );


    if (!caregiver) {

        console.log(
            "No caregiver number saved."
        );

        return;

    }


    const lang =
        getLanguage();


    let message = "";


    if (lang === "ta") {

        message =
            `மருந்து நினைவூட்டல்: நோயாளி ${medicine.name} மருந்தை எடுக்கவில்லை. தயவுசெய்து சரிபார்க்கவும்.`;

    }

    else if (lang === "hi") {

        message =
            `दवा रिमाइंडर: मरीज ने ${medicine.name} दवा नहीं ली है। कृपया जांच करें।`;

    }

    else if (lang === "te") {

        message =
            `మందు రిమైండర్: రోగి ${medicine.name} మందు తీసుకోలేదు. దయచేసి తనిఖీ చేయండి.`;

    }

    else {

        message =
            `Medication Reminder: Patient did not take ${medicine.name}. Please check the patient.`;

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


    addLog(
        translations[
            lang
        ].caregiverAlert
    );

}


// ============================================================
// SAVE CAREGIVER
// ============================================================

function saveCaregiver() {

    const phone =
        document.getElementById(
            "caregiverPhone"
        ).value.trim();


    if (!phone) {

        alert(
            translations[
                getLanguage()
            ].caregiverPhone
        );

        return;

    }


    localStorage.setItem(
        "caregiverPhone",
        phone
    );


    alert(
        translations[
            getLanguage()
        ].caregiverSaved
    );


    addLog(
        "📞 " +
        translations[
            getLanguage()
        ].caregiverSaved
    );

}


// ============================================================
// LOAD CAREGIVER
// ============================================================

function loadCaregiver() {

    const caregiver =
        localStorage.getItem(
            "caregiverPhone"
        );


    const input =
        document.getElementById(
            "caregiverPhone"
        );


    if (
        caregiver &&
        input
    ) {

        input.value =
            caregiver;

    }

}


// ============================================================
// CALL CAREGIVER
// ============================================================

function callCaregiver() {

    const caregiver =
        localStorage.getItem(
            "caregiverPhone"
        );


    if (!caregiver) {

        alert(
            translations[
                getLanguage()
            ].caregiverPhone
        );

        return;

    }


    window.location.href =
        "tel:" + caregiver;

}


// ============================================================
// EMERGENCY
// ============================================================

function callAmbulance() {

    window.location.href =
        "tel:108";

}


// ============================================================
// ACTIVITY LOG
// ============================================================

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


    const time =
        new Date()
            .toLocaleString();


    const item =
        document.createElement(
            "div"
        );


    item.className =
        "log-item";


    item.textContent =
        `${time} - ${message}`;


    log.prepend(
        item
    );


    while (
        log.children.length >
        50
    ) {

        log.removeChild(
            log.lastChild
        );

    }

}


// ============================================================
// LOGOUT
// ============================================================

function logout() {

    stopActiveReminder();


    if (
        "speechSynthesis"
        in window
    ) {

        window.speechSynthesis.cancel();

    }


    document.getElementById(
        "dashboardSection"
    ).style.display =
        "none";


    document.getElementById(
        "loginSection"
    ).style.display =
        "flex";


    mobileVoiceEnabled =
        false;

}


// ============================================================
// FULL MEDICATION REPORT
// PRINT / SAVE AS PDF
// ============================================================

function generateMedicationReport() {

    const lang =
        getLanguage();


    const t =
        translations[lang];


    const patientName =
        localStorage.getItem(
            "patientName"
        ) || "Patient";


    const patientPhone =
        localStorage.getItem(
            "patientPhone"
        ) || "";


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


    const pending =
        medicines.filter(
            medicine =>
                medicine.status ===
                "Pending"
        ).length;


    const completed =
        taken + missed;


    const adherence =
        completed > 0
            ? Math.round(
                (
                    taken /
                    completed
                ) * 100
            )
            : 0;


    let tableRows = "";


    medicines
        .slice()
        .sort(
            (a, b) =>
                a.time.localeCompare(
                    b.time
                )
        )
        .forEach(
            medicine => {


                let statusText =
                    t.pending;


                if (
                    medicine.status ===
                    "Taken"
                ) {

                    statusText =
                        t.takenStatus;

                }

                else if (
                    medicine.status ===
                    "Missed"
                ) {

                    statusText =
                        t.missedStatus;

                }


                let actionTime =
                    "-";


                if (
                    medicine.status ===
                    "Taken"
                ) {

                    actionTime =
                        medicine.takenAt ||
                        "-";

                }

                else if (
                    medicine.status ===
                    "Missed"
                ) {

                    actionTime =
                        medicine.missedAt ||
                        "-";

                }


                tableRows += `

                    <tr>

                        <td>
                            💊
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

                        <td class="
                            ${medicine.status.toLowerCase()}
                        ">

                            ${statusText}

                        </td>

                        <td>
                            ${actionTime}
                        </td>

                    </tr>

                `;

            }
        );


    if (!tableRows) {

        tableRows = `

            <tr>

                <td
                    colspan="5"
                    style="
                        text-align:center;
                        padding:30px;
                    "
                >

                    ${t.noReminder}

                </td>

            </tr>

        `;

    }


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


    reportWindow.document.write(`

<!DOCTYPE html>

<html lang="${lang}">

<head>

<meta charset="UTF-8">

<meta
    name="viewport"
    content="width=device-width,
             initial-scale=1.0"
>

<title>
    MEDICARE AI - ${t.report}
</title>


<style>

* {
    box-sizing: border-box;
}


body {

    font-family:
        Arial,
        "Noto Sans",
        sans-serif;

    margin: 0;

    padding: 30px;

    background: #f5f7f8;

    color: #263238;

}


.report-container {

    max-width: 1100px;

    margin: auto;

    background: white;

    padding: 30px;

    border-radius: 15px;

}


.header {

    text-align: center;

    border-bottom:
        3px solid #00897b;

    padding-bottom: 20px;

    margin-bottom: 20px;

}


.header h1 {

    color: #00695c;

    margin: 0 0 8px 0;

}


.patient {

    background: #e0f2f1;

    padding: 18px;

    border-radius: 10px;

    margin-bottom: 20px;

    line-height: 1.7;

}


.summary {

    display: grid;

    grid-template-columns:
        repeat(4, 1fr);

    gap: 15px;

    margin-bottom: 25px;

}


.summary-card {

    text-align: center;

    padding: 18px;

    border-radius: 10px;

    background: #f5f5f5;

}


.summary-card h3 {

    margin: 0;

    font-size: 14px;

}


.summary-card p {

    font-size: 28px;

    font-weight: bold;

    color: #00695c;

    margin: 8px 0 0;

}


table {

    width: 100%;

    border-collapse: collapse;

    margin-top: 15px;

}


th {

    background: #00897b;

    color: white;

    padding: 12px;

    text-align: left;

}


td {

    padding: 12px;

    border-bottom:
        1px solid #ddd;

}


.taken {

    color: #2e7d32;

    font-weight: bold;

}


.missed {

    color: #c62828;

    font-weight: bold;

}


.pending {

    color: #ef6c00;

    font-weight: bold;

}


.report-footer {

    margin-top: 25px;

    padding: 18px;

    background: #f5f5f5;

    border-radius: 10px;

}


.print-btn {

    display: block;

    margin: 25px auto 0;

    background: #00897b;

    color: white;

    border: none;

    padding: 14px 25px;

    border-radius: 8px;

    font-size: 16px;

    cursor: pointer;

}


.footer {

    margin-top: 25px;

    text-align: center;

    color: #607d8b;

    font-size: 13px;

}


@media(max-width:700px) {

    body {

        padding: 10px;

    }


    .report-container {

        padding: 15px;

    }


    .summary {

        grid-template-columns:
            repeat(2, 1fr);

    }


    table {

        font-size: 11px;

    }


    th,
    td {

        padding: 7px;

    }

}


@media print {

    body {

        background: white;

        padding: 0;

    }


    .report-container {

        box-shadow: none;

        max-width: none;

    }


    .print-btn {

        display: none;

    }

}

</style>

</head>


<body>


<div class="report-container">


    <div class="header">

        <h1>
            💊 MEDICARE AI
        </h1>

        <p>
            ${t.report}
        </p>

    </div>


    <div class="patient">

        <strong>
            ${t.patientName}:
        </strong>

        ${escapeHTML(
            patientName
        )}

        <br>


        <strong>
            ${t.phone}:
        </strong>

        ${escapeHTML(
            patientPhone
        )}

        <br>


        <strong>
            ${t.reportGenerated}:
        </strong>

        ${new Date().toLocaleString()}

    </div>


    <div class="summary">


        <div class="summary-card">

            <h3>
                ${t.totalMedicines}
            </h3>

            <p>
                ${total}
            </p>

        </div>


        <div class="summary-card">

            <h3>
                ${t.medicinesTaken}
            </h3>

            <p>
                ${taken}
            </p>

        </div>


        <div class="summary-card">

            <h3>
                ${t.medicinesMissed}
            </h3>

            <p>
                ${missed}
            </p>

        </div>


        <div class="summary-card">

            <h3>
                ${t.adherence}
            </h3>

            <p>
                ${adherence}%
            </p>

        </div>


    </div>


    <h2>
        ${t.medicineList}
    </h2>


    <table>

        <thead>

            <tr>

                <th>
                    ${t.medicineName}
                </th>

                <th>
                    ${t.dosage}
                </th>

                <th>
                    ${t.scheduledTime}
                </th>

                <th>
                    ${t.status}
                </th>

                <th>
                    ${t.actionTime}
                </th>

            </tr>

        </thead>


        <tbody>

            ${tableRows}

        </tbody>

    </table>


    <div class="report-footer">

        <strong>
            ${t.medicinesPending}:
        </strong>

        ${pending}

        <br><br>

        <strong>
            ${t.adherence}:
        </strong>

        ${adherence}%

    </div>


    <button
        class="print-btn"
        onclick="window.print()"
    >

        📄 ${t.printSave}

    </button>


    <div class="footer">

        MEDICARE AI

        <br>

        ${t.subtitle}

    </div>


</div>


</body>

</html>

    `);


    reportWindow.document.close();

}


// ============================================================
// PAGE LOAD
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const savedLanguage =
            localStorage.getItem(
                "selectedLanguage"
            ) || "en";


        const savedName =
            localStorage.getItem(
                "patientName"
            );


        const savedPhone =
            localStorage.getItem(
                "patientPhone"
            );


        const languageSelect =
            document.getElementById(
                "languageSelect"
            );


        const dashboardLanguage =
            document.getElementById(
                "dashboardLanguage"
            );


        if (languageSelect) {

            languageSelect.value =
                savedLanguage;

        }


        if (dashboardLanguage) {

            dashboardLanguage.value =
                savedLanguage;

        }


        applyLanguage(
            savedLanguage
        );


        prepareSpeech();


        // ------------------------------------------------
        // Mobile browser voice unlock
        // First user touch/click enables speech.
        // ------------------------------------------------

        document.addEventListener(
            "pointerdown",
            function() {

                enableMobileVoiceSilently();

            },
            {
                once: true,
                passive: true
            }
        );


        if (
            savedName &&
            savedPhone
        ) {

            document.getElementById(
                "patientName"
            ).value =
                savedName;


            document.getElementById(
                "patientPhone"
            ).value =
                savedPhone;


            document.getElementById(
                "loginSection"
            ).style.display =
                "none";


            document.getElementById(
                "dashboardSection"
            ).style.display =
                "block";


            loadMedicines();

            loadCaregiver();

            applyLanguage(
                savedLanguage
            );

            updateDashboard();

            updateNextReminder();

            startReminderChecker();

        }

    }
);


// ============================================================
// LOAD SPEECH VOICES
// ============================================================

if (
    "speechSynthesis"
    in window
) {

    window.speechSynthesis
        .onvoiceschanged =
        function() {

            availableVoices =
                window.speechSynthesis
                    .getVoices();

        };

}
