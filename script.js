// =====================================================
// MEDICARE AI
// COMPLETE SCRIPT
// MOBILE VOICE + REGIONAL MEDICINE PRONUNCIATION
// MEDICINE REMINDER + CAREGIVER SMS + PDF REPORT
// =====================================================

let medicines = [];

let activeReminder = null;
let reminderLoop = null;
let missedTimer = null;
let reminderChecker = null;

let speechUnlocked = false;
let speechVoices = [];


// =====================================================
// TRANSLATIONS
// =====================================================

const translations = {

    en: {

        subtitle: "AI Powered Healthcare Assistant",
        aiStatus: "AI Monitoring Online",
        welcome: "Welcome",
        total: "Total Medicines",
        taken: "Taken",
        missed: "Missed",
        adherence: "Adherence",

        nextReminder: "Next Medication Reminder",
        noReminder: "No reminders",

        addMedicine: "Add Medicine",
        medicineList: "Medicine Schedule",

        medicineName: "Medicine name",
        dosage: "Dosage",
        add: "Add Medicine",

        pending: "Pending",
        takenStatus: "Taken",
        missedStatus: "Missed",

        take: "Take",
        delete: "Delete",

        caregiver: "Caregiver",
        caregiverPhone: "Caregiver Phone Number",
        saveCaregiver: "Save Caregiver",

        report: "Medication Report",
        totalMedicines: "Total Medicines",
        medicinesTaken: "Medicines Taken",
        medicinesMissed: "Medicines Missed",
        medicinesPending: "Pending Medicines",

        activityLog: "Activity Log",

        callCaregiver: "📞 Call Caregiver",
        emergency: "🚑 Emergency",
        logout: "Logout",

        aiTitle: "AI Healthcare Assistant",

        aiMessage:
            "Your medication schedule is being monitored automatically.",

        patientName: "Patient Name",
        phone: "Phone Number",
        language: "Select Language",
        login: "Login",

        voiceReady: "Mobile voice enabled",

        medicineAdded:
            "Medicine added successfully.",

        medicineAlreadyExists:
            "This medicine already exists at this time.",

        invalidDetails:
            "Please enter medicine name, dosage and time.",

        caregiverSaved:
            "Caregiver number saved.",

        voiceReminder:
            "Time to take",

        reminderMissed:
            "Medicine was not taken",

        caregiverAlert:
            "Caregiver alert sent.",

        medicineDeleted:
            "Medicine deleted.",

        time: "Time",
        status: "Status",
        actionTime: "Action Time",
        date: "Date",

        patientDetails:
            "Patient Details",

        generatedOn:
            "Generated On",

        reportButton:
            "📄 Generate Detailed PDF Report",

        printReport:
            "🖨️ Print / Save as PDF",

        noMedicines:
            "No medicines added yet."
    },


    // =================================================
    // TAMIL
    // =================================================

    ta: {

        subtitle:
            "AI மூலம் இயங்கும் சுகாதார உதவியாளர்",

        aiStatus:
            "AI கண்காணிப்பு செயல்பாட்டில்",

        welcome:
            "வரவேற்கிறோம்",

        total:
            "மொத்த மருந்துகள்",

        taken:
            "எடுத்தது",

        missed:
            "தவறியது",

        adherence:
            "பின்பற்றல்",

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
            "எடுத்தது",

        missedStatus:
            "தவறியது",

        take:
            "எடுத்துவிட்டேன்",

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
            "செயல் பதிவு",

        callCaregiver:
            "📞 பராமரிப்பாளரை அழைக்கவும்",

        emergency:
            "🚑 அவசரம்",

        logout:
            "வெளியேறு",

        aiTitle:
            "AI சுகாதார உதவியாளர்",

        aiMessage:
            "உங்கள் மருந்து அட்டவணை தானாக கண்காணிக்கப்படுகிறது.",

        patientName:
            "நோயாளியின் பெயர்",

        phone:
            "தொலைபேசி எண்",

        language:
            "மொழியைத் தேர்ந்தெடுக்கவும்",

        login:
            "உள்நுழைய",

        voiceReady:
            "மொபைல் குரல் இயக்கப்பட்டது",

        medicineAdded:
            "மருந்து வெற்றிகரமாக சேர்க்கப்பட்டது.",

        medicineAlreadyExists:
            "இந்த நேரத்தில் இந்த மருந்து ஏற்கனவே உள்ளது.",

        invalidDetails:
            "மருந்தின் பெயர், அளவு மற்றும் நேரத்தை உள்ளிடவும்.",

        caregiverSaved:
            "பராமரிப்பாளர் எண் சேமிக்கப்பட்டது.",

        voiceReminder:
            "மருந்தை எடுத்துக்கொள்ளும் நேரம்",

        reminderMissed:
            "மருந்து எடுக்கப்படவில்லை",

        caregiverAlert:
            "பராமரிப்பாளருக்கு தகவல் அனுப்பப்பட்டது.",

        medicineDeleted:
            "மருந்து நீக்கப்பட்டது.",

        time:
            "நேரம்",

        status:
            "நிலை",

        actionTime:
            "செயல் நேரம்",

        date:
            "தேதி",

        patientDetails:
            "நோயாளர் விவரங்கள்",

        generatedOn:
            "உருவாக்கப்பட்ட நேரம்",

        reportButton:
            "📄 விரிவான PDF அறிக்கையை உருவாக்கவும்",

        printReport:
            "🖨️ அச்சிடு / PDF ஆக சேமி",

        noMedicines:
            "மருந்துகள் இன்னும் சேர்க்கப்படவில்லை."
    },


    // =================================================
    // HINDI
    // =================================================

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
            "छूटी",

        adherence:
            "अनुपालन",

        nextReminder:
            "अगली दवा रिमाइंडर",

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
            "छूटी",

        take:
            "ले ली",

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
            "📞 देखभालकर्ता को कॉल करें",

        emergency:
            "🚑 आपातकाल",

        logout:
            "लॉगआउट",

        aiTitle:
            "AI स्वास्थ्य सहायक",

        aiMessage:
            "आपकी दवा अनुसूची स्वचालित रूप से निगरानी की जा रही है।",

        patientName:
            "मरीज का नाम",

        phone:
            "फोन नंबर",

        language:
            "भाषा चुनें",

        login:
            "लॉगिन",

        voiceReady:
            "मोबाइल आवाज़ सक्षम है",

        medicineAdded:
            "दवा सफलतापूर्वक जोड़ी गई।",

        medicineAlreadyExists:
            "इस समय यह दवा पहले से मौजूद है।",

        invalidDetails:
            "दवा का नाम, खुराक और समय दर्ज करें।",

        caregiverSaved:
            "देखभालकर्ता नंबर सेव किया गया।",

        voiceReminder:
            "दवा लेने का समय हो गया है",

        reminderMissed:
            "दवा नहीं ली गई",

        caregiverAlert:
            "देखभालकर्ता को सूचना भेजी गई।",

        medicineDeleted:
            "दवा हटा दी गई।",

        time:
            "समय",

        status:
            "स्थिति",

        actionTime:
            "कार्रवाई का समय",

        date:
            "तारीख",

        patientDetails:
            "मरीज का विवरण",

        generatedOn:
            "बनाने का समय",

        reportButton:
            "📄 विस्तृत PDF रिपोर्ट बनाएं",

        printReport:
            "🖨️ प्रिंट / PDF के रूप में सेव करें",

        noMedicines:
            "अभी कोई दवा नहीं जोड़ी गई है।"
    },


    // =================================================
    // TELUGU
    // =================================================

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
            "మిస్ అయినవి",

        adherence:
            "పాటింపు",

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
            "మిస్ అయింది",

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
            "మిస్ అయిన మందులు",

        medicinesPending:
            "పెండింగ్ మందులు",

        activityLog:
            "కార్యాచరణ లాగ్",

        callCaregiver:
            "📞 సంరక్షకుడికి కాల్ చేయండి",

        emergency:
            "🚑 అత్యవసరం",

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
            "మొబైల్ వాయిస్ ప్రారంభించబడింది",

        medicineAdded:
            "మందు విజయవంతంగా జోడించబడింది.",

        medicineAlreadyExists:
            "ఈ సమయంలో ఈ మందు ఇప్పటికే ఉంది.",

        invalidDetails:
            "మందు పేరు, మోతాదు మరియు సమయాన్ని నమోదు చేయండి.",

        caregiverSaved:
            "సంరక్షకుడి నంబర్ సేవ్ చేయబడింది.",

        voiceReminder:
            "మందు తీసుకునే సమయం వచ్చింది",

        reminderMissed:
            "మందు తీసుకోలేదు",

        caregiverAlert:
            "సంరక్షకుడికి సమాచారం పంపబడింది.",

        medicineDeleted:
            "మందు తొలగించబడింది.",

        time:
            "సమయం",

        status:
            "స్థితి",

        actionTime:
            "చర్య సమయం",

        date:
            "తేదీ",

        patientDetails:
            "రోగి వివరాలు",

        generatedOn:
            "రూపొందించిన సమయం",

        reportButton:
            "📄 వివరణాత్మక PDF నివేదికను రూపొందించండి",

        printReport:
            "🖨️ ప్రింట్ / PDFగా సేవ్ చేయండి",

        noMedicines:
            "ఇంకా మందులు జోడించబడలేదు."
    }

};


// =====================================================
// LANGUAGE
// =====================================================

function getLanguage() {

    return (
        localStorage.getItem(
            "selectedLanguage"
        ) || "en"
    );

}


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


// =====================================================
// APPLY LANGUAGE
// =====================================================

function applyLanguage(lang) {

    const t =
        translations[lang] ||
        translations.en;


    const setText =
        (id, value) => {

            const el =
                document.getElementById(id);

            if (el) {

                el.textContent =
                    value;

            }

        };


    const setPlaceholder =
        (id, value) => {

            const el =
                document.getElementById(id);

            if (el) {

                el.placeholder =
                    value;

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
        "addButton",
        t.add
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
        "logTitle",
        t.activityLog
    );

    setText(
        "callCaregiverButton",
        t.callCaregiver
    );

    setText(
        "ambulanceButton",
        t.emergency
    );

    setText(
        "logoutButton",
        t.logout
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
        "reportButton",
        t.reportButton
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

}


// =====================================================
// LOGIN
// =====================================================

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
            "Please enter patient name and phone number."
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


    // Login is a user interaction.
    // Use it to unlock mobile speech.

    speechUnlocked =
        false;

    enableMobileVoice();


    document.getElementById(
        "loginSection"
    ).style.display =
        "none";


    document.getElementById(
        "dashboardSection"
    ).style.display =
        "block";


    document.getElementById(
        "dashboardLanguage"
    ).value =
        language;


    applyLanguage(
        language
    );

    loadMedicines();

    loadCaregiver();

    updateDashboard();

    updateNextReminder();

    startReminderChecker();

    prepareSpeech();

    addLog(
        "Login successful"
    );

}


// =====================================================
// MOBILE VOICE UNLOCK
// =====================================================

function enableMobileVoice() {

    if (
        !(
            "speechSynthesis"
            in window
        )
    ) {

        const status =
            document.getElementById(
                "voiceStatus"
            );


        if (status) {

            status.textContent =
                "Speech is not supported on this browser.";

        }

        return;

    }


    try {

        speechSynthesis.cancel();

        speechSynthesis.resume();


        const language =
            getSpeechLanguage();


        const unlockSpeech =
            new SpeechSynthesisUtterance(
                "ready"
            );


        unlockSpeech.lang =
            language;


        unlockSpeech.volume =
            0;


        unlockSpeech.rate =
            10;


        unlockSpeech.pitch =
            1;


        speechSynthesis.speak(
            unlockSpeech
        );


        speechUnlocked =
            true;


        setTimeout(
            function() {

                speechSynthesis.cancel();

            },
            500
        );


    }

    catch (error) {

        console.error(
            "Voice unlock error:",
            error
        );

    }

}


// =====================================================
// AUTOMATIC MOBILE VOICE UNLOCK
// =====================================================

function setupMobileVoiceUnlock() {

    const unlockFromUserAction =
        function() {

            if (!speechUnlocked) {

                enableMobileVoice();

            }

        };


    document.addEventListener(
        "pointerdown",
        unlockFromUserAction,
        {
            once: true,
            passive: true
        }
    );

}


// =====================================================
// STORAGE KEY
// =====================================================

function getMedicineStorageKey() {

    const phone =
        localStorage.getItem(
            "patientPhone"
        );


    return (
        "medicines_" +
        phone
    );

}


// =====================================================
// ADD MEDICINE
// =====================================================

function addMedicine() {

    // User interaction also unlocks voice.
    enableMobileVoice();


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


    const t =
        translations[
            getLanguage()
        ];


    if (
        !name ||
        !dosage ||
        !time
    ) {

        alert(
            t.invalidDetails
        );

        return;

    }


    const duplicate =
        medicines.some(
            medicine =>
                medicine.name
                    .toLowerCase() ===
                name.toLowerCase() &&
                medicine.time ===
                time &&
                medicine.status ===
                "Pending"
        );


    if (duplicate) {

        alert(
            t.medicineAlreadyExists
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
                .toLocaleString(),

        takenAt:
            "",

        missedAt:
            ""

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


    const status =
        document.getElementById(
            "voiceStatus"
        );


    if (status) {

        status.textContent =
            "✓ " +
            t.medicineAdded;

    }


    addLog(
        t.medicineAdded
    );

}


// =====================================================
// SAVE MEDICINES
// =====================================================

function saveMedicines() {

    localStorage.setItem(
        getMedicineStorageKey(),
        JSON.stringify(
            medicines
        )
    );

}


// =====================================================
// LOAD MEDICINES
// =====================================================

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


        medicines =
            medicines.map(
                medicine => ({

                    ...medicine,

                    takenAt:
                        medicine.takenAt ||
                        "",

                    missedAt:
                        medicine.missedAt ||
                        ""

                })
            );

    }

    catch (error) {

        console.error(
            error
        );

        medicines = [];

    }


    renderMedicines();

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


    const lang =
        getLanguage();


    const t =
        translations[lang];


    list.innerHTML =
        "";


    if (
        medicines.length ===
        0
    ) {

        list.innerHTML =
            `<p>${t.noMedicines}</p>`;

        return;

    }


    const sortedMedicines =
        [...medicines].sort(
            (a, b) =>
                a.time.localeCompare(
                    b.time
                )
        );


    sortedMedicines.forEach(
        medicine => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "medicine-item";


            let statusClass =
                "pending";


            let statusText =
                t.pending;


            if (
                medicine.status ===
                "Taken"
            ) {

                statusClass =
                    "taken";

                statusText =
                    t.takenStatus;

            }


            if (
                medicine.status ===
                "Missed"
            ) {

                statusClass =
                    "missed";

                statusText =
                    t.missedStatus;

            }


            let buttons =
                "";


            if (
                medicine.status ===
                "Pending"
            ) {

                buttons += `

                    <button
                        class="btn-success"
                        onclick="markTaken(${medicine.id})"
                    >
                        ✓ ${t.take}
                    </button>

                `;

            }


            buttons += `

                <button
                    class="btn-danger"
                    onclick="deleteMedicine(${medicine.id})"
                >
                    🗑 ${t.delete}
                </button>

            `;


            item.innerHTML = `

                <div class="medicine-info">

                    <h3>
                        ${escapeHTML(
                            medicine.name
                        )}
                    </h3>

                    <p>
                        💊 ${escapeHTML(
                            medicine.dosage
                        )}
                    </p>

                    <p>
                        ⏰ ${medicine.time}
                    </p>

                    <p
                        class="status ${statusClass}"
                    >
                        ${statusText}
                    </p>

                </div>

                <div class="medicine-actions">

                    ${buttons}

                </div>

            `;


            list.appendChild(
                item
            );

        }
    );

}


// =====================================================
// ESCAPE HTML
// =====================================================

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


// =====================================================
// DASHBOARD
// =====================================================

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


    const completed =
        taken +
        missed;


    const adherence =
        completed === 0
            ? 0
            : Math.round(
                (
                    taken /
                    completed
                ) * 100
            );


    const totalElement =
        document.getElementById(
            "totalMedicines"
        );


    const takenElement =
        document.getElementById(
            "takenMedicines"
        );


    const missedElement =
        document.getElementById(
            "missedMedicines"
        );


    const adherenceElement =
        document.getElementById(
            "adherence"
        );


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


    if (totalElement)
        totalElement.textContent =
            total;


    if (takenElement)
        takenElement.textContent =
            taken;


    if (missedElement)
        missedElement.textContent =
            missed;


    if (adherenceElement)
        adherenceElement.textContent =
            adherence + "%";


    if (reportTotal)
        reportTotal.textContent =
            total;


    if (reportTaken)
        reportTaken.textContent =
            taken;


    if (reportMissed)
        reportMissed.textContent =
            missed;


    if (reportAdherence)
        reportAdherence.textContent =
            adherence + "%";


    const patient =
        localStorage.getItem(
            "patientName"
        );


    const welcome =
        translations[
            getLanguage()
        ].welcome;


    const welcomeTitle =
        document.getElementById(
            "welcomeTitle"
        );


    if (welcomeTitle) {

        welcomeTitle.textContent =
            `${welcome}, ${patient || ""}`;

    }

}


// =====================================================
// NEXT REMINDER
// =====================================================

function updateNextReminder() {

    const next =
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
            )[0];


    const element =
        document.getElementById(
            "nextReminder"
        );


    if (!element) {

        return;

    }


    if (!next) {

        element.textContent =
            translations[
                getLanguage()
            ].noReminder;

        return;

    }


    element.textContent =
        `${next.name} - ${next.time}`;

}


// =====================================================
// SPEECH LANGUAGE
// =====================================================

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


// =====================================================
// GET MOBILE VOICE
// =====================================================

function getVoice(languageCode) {

    if (
        !speechVoices.length
    ) {

        speechVoices =
            window.speechSynthesis
                .getVoices();

    }


    if (
        !speechVoices.length
    ) {

        return null;

    }


    const exact =
        speechVoices.find(
            voice =>
                voice.lang &&
                voice.lang
                    .toLowerCase() ===
                languageCode
                    .toLowerCase()
        );


    if (exact) {

        return exact;

    }


    const base =
        languageCode
            .split("-")[0]
            .toLowerCase();


    const matching =
        speechVoices.find(
            voice =>
                voice.lang &&
                voice.lang
                    .toLowerCase()
                    .startsWith(base)
        );


    return matching || null;

}


// =====================================================
// PREPARE SPEECH
// =====================================================

function prepareSpeech() {

    if (
        !(
            "speechSynthesis"
            in window
        )
    ) {

        return;

    }


    speechVoices =
        speechSynthesis
            .getVoices();


    speechSynthesis.onvoiceschanged =
        function() {

            speechVoices =
                speechSynthesis
                    .getVoices();

        };

}


// =====================================================
// REGIONAL MEDICINE PRONUNCIATION
// =====================================================
//
// IMPORTANT:
// The medicine name shown in the website/report
// stays exactly as entered.
//
// Only the name spoken by the voice is converted.
//
// =====================================================

const medicinePronunciations = {

    paracetamol: {

        ta:
            "பாராசிட்டமால்",

        hi:
            "पैरासिटामोल",

        te:
            "పారాసిటామాల్"

    },


    crocin: {

        ta:
            "க்ரோசின்",

        hi:
            "क्रोसिन",

        te:
            "క్రోసిన్"

    },


    dolo: {

        ta:
            "டோலோ",

        hi:
            "डोलो",

        te:
            "డోలో"

    },


    "dolo 650": {

        ta:
            "டோலோ 650",

        hi:
            "डोलो 650",

        te:
            "డోలో 650"

    },


    cetirizine: {

        ta:
            "செடிரிசின்",

        hi:
            "सेटिरिज़िन",

        te:
            "సెటిరిజిన్"

    },


    amoxicillin: {

        ta:
            "அமோக்ஸிசிலின்",

        hi:
            "अमॉक्सिसिलिन",

        te:
            "అమోక్సిసిలిన్"

    },


    azithromycin: {

        ta:
            "அசித்ரோமைசின்",

        hi:
            "अज़िथ्रोमाइसिन",

        te:
            "అజిత్రోమైసిన్"

    },


    ibuprofen: {

        ta:
            "ஐபுப்ரோஃபென்",

        hi:
            "आइबुप्रोफेन",

        te:
            "ఐబుప్రోఫెన్"

    },


    metformin: {

        ta:
            "மெட்ஃபார்மின்",

        hi:
            "मेटफॉर्मिन",

        te:
            "మెట్‌ఫార్మిన్"

    },


    insulin: {

        ta:
            "இன்சுலின்",

        hi:
            "इंसुलिन",

        te:
            "ఇన్సులిన్"

    },


    aspirin: {

        ta:
            "ஆஸ்பிரின்",

        hi:
            "एस्पिरिन",

        te:
            "ఆస్పిరిన్"

    },


    omeprazole: {

        ta:
            "ஒமேப்ரசோல்",

        hi:
            "ओमेप्राज़ोल",

        te:
            "ఓమెప్రజోల్"

    },


    pantoprazole: {

        ta:
            "பான்டோப்ரசோல்",

        hi:
            "पैंटोप्राज़ोल",

        te:
            "పాంటోప్రజోల్"

    },


    montelukast: {

        ta:
            "மாண்டெலுகாஸ்ட்",

        hi:
            "मोंटेलुकास्ट",

        te:
            "మాంటెలుకాస్ట్"

    },


    levocetirizine: {

        ta:
            "லெவோசெடிரிசின்",

        hi:
            "लेवोसेटिरिज़िन",

        te:
            "లెవోసెటిరిజిన్"

    },


    ranitidine: {

        ta:
            "ரானிடிடின்",

        hi:
            "रैनिटिडिन",

        te:
            "రానిటిడిన్"

    },


    calcium: {

        ta:
            "கால்சியம்",

        hi:
            "कैल्शियम",

        te:
            "కాల్షియం"

    },


    vitamin: {

        ta:
            "வைட்டமின்",

        hi:
            "विटामिन",

        te:
            "విటమిన్"

    }

};


// =====================================================
// GET REGIONAL MEDICINE NAME
// =====================================================

function getRegionalMedicineName(
    name,
    lang
) {

    const original =
        String(name || "").trim();


    if (
        !original ||
        lang === "en"
    ) {

        return original;

    }


    const key =
        original
            .toLowerCase();


    // Exact match
    if (
        medicinePronunciations[key] &&
        medicinePronunciations[key][lang]
    ) {

        return medicinePronunciations[
            key
        ][lang];

    }


    // Handle names such as:
    // Dolo 500
    // Dolo 650
    // Dolo 1000

    const doloMatch =
        key.match(
            /^dolo\s*(\d+)$/
        );


    if (doloMatch) {

        const number =
            doloMatch[1];


        if (lang === "ta") {

            return (
                "டோலோ " +
                number
            );

        }


        if (lang === "hi") {

            return (
                "डोलो " +
                number
            );

        }


        if (lang === "te") {

            return (
                "డోలో " +
                number
            );

        }

    }


    // If not found, keep original.
    return original;

}


// =====================================================
// SPEAK MEDICINE REMINDER
// =====================================================

function speakMedicineReminder(
    medicine
) {

    if (
        !(
            "speechSynthesis"
            in window
        )
    ) {

        alert(
            "Speech is not supported on this browser."
        );

        return;

    }


    const lang =
        getLanguage();


    const languageCode =
        getSpeechLanguage();


    // IMPORTANT:
    // Convert medicine name only for voice.

    const spokenMedicineName =
        getRegionalMedicineName(
            medicine.name,
            lang
        );


    let message =
        "";


    // =================================================
    // TAMIL
    // =================================================

    if (lang === "ta") {

        message =
            `${spokenMedicineName} மருந்தை எடுத்துக்கொள்ளும் நேரம் வந்துவிட்டது`;

    }


    // =================================================
    // HINDI
    // =================================================

    else if (lang === "hi") {

        message =
            `${spokenMedicineName} दवा लेने का समय हो गया है`;

    }


    // =================================================
    // TELUGU
    // =================================================

    else if (lang === "te") {

        message =
            `${spokenMedicineName} మందు తీసుకునే సమయం వచ్చింది`;

    }


    // =================================================
    // ENGLISH
    // =================================================

    else {

        message =
            `Time to take ${medicine.name}`;

    }


    try {

        speechSynthesis.cancel();

        speechSynthesis.resume();


        const utterance =
            new SpeechSynthesisUtterance(
                message
            );


        utterance.lang =
            languageCode;


        utterance.rate =
            0.82;


        utterance.pitch =
            1;


        utterance.volume =
            1;


        const voice =
            getVoice(
                languageCode
            );


        if (voice) {

            utterance.voice =
                voice;

        }


        utterance.onstart =
            function() {

                const status =
                    document.getElementById(
                        "voiceStatus"
                    );


                if (status) {

                    status.textContent =
                        "🔊 " +
                        message;

                }

            };


        utterance.onend =
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


        utterance.onerror =
            function(event) {

                console.error(
                    "Speech error:",
                    event.error
                );


                const status =
                    document.getElementById(
                        "voiceStatus"
                    );


                if (status) {

                    status.textContent =
                        "Voice error. Please check phone TTS language.";

                }

            };


        speechSynthesis.speak(
            utterance
        );

    }

    catch (error) {

        console.error(
            error
        );

    }

}


// =====================================================
// REMINDER CHECKER
// =====================================================

function startReminderChecker() {

    if (reminderChecker) {

        clearInterval(
            reminderChecker
        );

    }


    reminderChecker =
        setInterval(
            checkMedicationReminder,
            1000
        );

}


// =====================================================
// CHECK REMINDER
// =====================================================

function checkMedicationReminder() {

    if (activeReminder) {

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


    const medicine =
        medicines.find(
            item =>
                item.status ===
                "Pending" &&
                item.time ===
                currentTime
        );


    if (medicine) {

        triggerReminder(
            medicine
        );

    }

}


// =====================================================
// TRIGGER REMINDER
// =====================================================

function triggerReminder(
    medicine
) {

    if (activeReminder) {

        return;

    }


    activeReminder =
        medicine;


    clearInterval(
        reminderLoop
    );


    clearTimeout(
        missedTimer
    );


    // FIRST VOICE
    speakMedicineReminder(
        medicine
    );


    // REPEAT EVERY 10 SECONDS
    reminderLoop =
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


    // AFTER 60 SECONDS -> MISSED
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
                        `${medicine.name} - ${
                            translations[
                                getLanguage()
                            ].missedStatus
                        }`
                    );

                }


                stopActiveReminder();

            },
            60000
        );

}


// =====================================================
// STOP ACTIVE REMINDER
// =====================================================

function stopActiveReminder() {

    clearInterval(
        reminderLoop
    );


    clearTimeout(
        missedTimer
    );


    reminderLoop =
        null;


    missedTimer =
        null;


    activeReminder =
        null;


    if (
        "speechSynthesis"
        in window
    ) {

        speechSynthesis.cancel();

    }

}


// =====================================================
// MARK TAKEN
// =====================================================

function markTaken(id) {

    enableMobileVoice();


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


    saveMedicines();


    if (
        activeReminder &&
        activeReminder.id === id
    ) {

        stopActiveReminder();

    }


    loadMedicines();

    updateDashboard();

    updateNextReminder();


    addLog(
        `${medicine.name} - ${
            translations[
                getLanguage()
            ].takenStatus
        }`
    );

}


// =====================================================
// DELETE MEDICINE
// =====================================================

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
        `${medicine.name} - ${
            translations[
                getLanguage()
            ].medicineDeleted
        }`
    );

}


// =====================================================
// MISSED VOICE
// =====================================================

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


    const languageCode =
        getSpeechLanguage();


    const spokenMedicineName =
        getRegionalMedicineName(
            medicine.name,
            lang
        );


    let message =
        "";


    if (lang === "ta") {

        message =
            `${spokenMedicineName} மருந்து எடுக்கப்படவில்லை`;

    }

    else if (lang === "hi") {

        message =
            `${spokenMedicineName} दवा नहीं ली गई है`;

    }

    else if (lang === "te") {

        message =
            `${spokenMedicineName} మందు తీసుకోలేదు`;

    }

    else {

        message =
            `${medicine.name} medicine was not taken`;

    }


    speechSynthesis.cancel();

    speechSynthesis.resume();


    const utterance =
        new SpeechSynthesisUtterance(
            message
        );


    utterance.lang =
        languageCode;


    utterance.rate =
        0.82;


    utterance.pitch =
        1;


    utterance.volume =
        1;


    const voice =
        getVoice(
            languageCode
        );


    if (voice) {

        utterance.voice =
            voice;

    }


    speechSynthesis.speak(
        utterance
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
            "caregiverPhone"
        );


    if (!caregiver) {

        return;

    }


    const lang =
        getLanguage();


    let message =
        "";


    if (lang === "ta") {

        message =
            `மருந்து நினைவூட்டல்: ${medicine.name} மருந்தை நோயாளி எடுக்கவில்லை. தயவுசெய்து சரிபார்க்கவும்.`;

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
        `sms:${caregiver}?body=${
            encodeURIComponent(
                message
            )
        }`;


    window.location.href =
        smsURL;

}


// =====================================================
// CAREGIVER
// =====================================================

function saveCaregiver() {

    const phone =
        document.getElementById(
            "caregiverPhone"
        ).value.trim();


    if (!phone) {

        alert(
            "Please enter caregiver phone number."
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
        translations[
            getLanguage()
        ].caregiverSaved
    );

}


// =====================================================
// LOAD CAREGIVER
// =====================================================

function loadCaregiver() {

    const phone =
        localStorage.getItem(
            "caregiverPhone"
        );


    if (phone) {

        const input =
            document.getElementById(
                "caregiverPhone"
            );


        if (input) {

            input.value =
                phone;

        }

    }

}


// =====================================================
// CALL CAREGIVER
// =====================================================

function callCaregiver() {

    const phone =
        localStorage.getItem(
            "caregiverPhone"
        );


    if (!phone) {

        alert(
            "Please save caregiver phone number first."
        );

        return;

    }


    window.location.href =
        `tel:${phone}`;

}


// =====================================================
// EMERGENCY
// =====================================================

function callAmbulance() {

    window.location.href =
        "tel:108";

}


// =====================================================
// ACTIVITY LOG
// =====================================================

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
        `${
            new Date()
                .toLocaleTimeString()
        } - ${message}`;


    log.prepend(
        item
    );

}


// =====================================================
// DETAILED PDF REPORT
// =====================================================

function generateMedicationReport() {

    const lang =
        getLanguage();


    const t =
        translations[lang];


    const patientName =
        localStorage.getItem(
            "patientName"
        ) || "-";


    const patientPhone =
        localStorage.getItem(
            "patientPhone"
        ) || "-";


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
        taken +
        missed;


    const adherence =
        completed === 0
            ? 0
            : Math.round(
                (
                    taken /
                    completed
                ) * 100
            );


    const reportDate =
        new Date()
            .toLocaleString();


    const rows =
        [...medicines]

            .sort(
                (a, b) =>
                    a.time.localeCompare(
                        b.time
                    )
            )

            .map(
                medicine => {

                    let status =
                        t.pending;


                    if (
                        medicine.status ===
                        "Taken"
                    ) {

                        status =
                            t.takenStatus;

                    }


                    if (
                        medicine.status ===
                        "Missed"
                    ) {

                        status =
                            t.missedStatus;

                    }


                    const actionTime =
                        medicine.status ===
                            "Taken"

                            ? medicine.takenAt

                            : medicine.status ===
                                "Missed"

                                ? medicine.missedAt

                                : "-";


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
                                ${medicine.time}
                            </td>

                            <td>
                                ${status}
                            </td>

                            <td>
                                ${escapeHTML(
                                    actionTime
                                )}
                            </td>

                        </tr>

                    `;

                }
            )
            .join("");


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

<meta name="viewport"
      content="width=device-width,initial-scale=1.0">

<title>${t.report}</title>

<style>

body {

    font-family: Arial, sans-serif;

    margin: 0;

    padding: 30px;

    color: #263238;

    background: white;

}

.header {

    text-align: center;

    border-bottom: 3px solid #00897b;

    padding-bottom: 20px;

    margin-bottom: 25px;

}

.header h1 {

    color: #00695c;

    margin: 0;

}

.header p {

    margin: 6px 0;

}

.patient {

    background: #f1f8f7;

    padding: 18px;

    border-radius: 10px;

    margin-bottom: 25px;

}

.summary {

    display: grid;

    grid-template-columns:
        repeat(4, 1fr);

    gap: 12px;

    margin-bottom: 25px;

}

.summary-card {

    background: #f5f5f5;

    padding: 15px;

    text-align: center;

    border-radius: 10px;

}

.summary-card strong {

    display: block;

    color: #607d8b;

    margin-bottom: 8px;

}

.summary-card span {

    font-size: 24px;

    font-weight: bold;

    color: #00695c;

}

table {

    width: 100%;

    border-collapse: collapse;

    margin-top: 20px;

}

th {

    background: #00897b;

    color: white;

    padding: 12px;

    text-align: left;

}

td {

    padding: 11px;

    border: 1px solid #ddd;

}

tr:nth-child(even) {

    background: #f7f7f7;

}

.print-button {

    background: #00695c;

    color: white;

    border: none;

    padding: 14px 22px;

    border-radius: 8px;

    font-size: 16px;

    font-weight: bold;

    cursor: pointer;

    margin-bottom: 20px;

}

.footer {

    margin-top: 30px;

    text-align: center;

    color: #607d8b;

    font-size: 13px;

}

@media(max-width:700px) {

    body {

        padding: 15px;

    }

    .summary {

        grid-template-columns:
            repeat(2, 1fr);

    }

    table {

        font-size: 12px;

    }

    th,
    td {

        padding: 7px;

    }

}

@media print {

    .print-button {

        display: none;

    }

}

</style>

</head>

<body>

<div class="header">

    <h1>
        MEDICARE AI
    </h1>

    <h2>
        ${t.report}
    </h2>

</div>


<div class="patient">

    <h3>
        ${t.patientDetails}
    </h3>

    <p>

        <strong>
            ${t.patientName}:
        </strong>

        ${escapeHTML(
            patientName
        )}

    </p>


    <p>

        <strong>
            ${t.phone}:
        </strong>

        ${escapeHTML(
            patientPhone
        )}

    </p>


    <p>

        <strong>
            ${t.generatedOn}:
        </strong>

        ${escapeHTML(
            reportDate
        )}

    </p>

</div>


<div class="summary">

    <div class="summary-card">

        <strong>
            ${t.totalMedicines}
        </strong>

        <span>
            ${total}
        </span>

    </div>


    <div class="summary-card">

        <strong>
            ${t.medicinesTaken}
        </strong>

        <span>
            ${taken}
        </span>

    </div>


    <div class="summary-card">

        <strong>
            ${t.medicinesMissed}
        </strong>

        <span>
            ${missed}
        </span>

    </div>


    <div class="summary-card">

        <strong>
            ${t.adherence}
        </strong>

        <span>
            ${adherence}%
        </span>

    </div>

</div>


<p>

<strong>
    ${t.medicinesPending}:
</strong>

${pending}

</p>


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
    ${t.time}
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

${
    rows ||
    `
    <tr>

        <td colspan="5">

            ${t.noMedicines}

        </td>

    </tr>
    `
}

</tbody>

</table>


<br>


<button
    class="print-button"
    onclick="window.print()"
>
    ${t.printReport}
</button>


<div class="footer">

    MEDICARE AI - Medication Reminder

</div>


</body>

</html>

`);


    reportWindow.document.close();

}


// =====================================================
// LOGOUT
// =====================================================

function logout() {

    stopActiveReminder();


    if (reminderChecker) {

        clearInterval(
            reminderChecker
        );

        reminderChecker =
            null;

    }


    if (
        "speechSynthesis"
        in window
    ) {

        speechSynthesis.cancel();

    }


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


    speechUnlocked =
        false;

}


// =====================================================
// PAGE LOAD
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        prepareSpeech();

        setupMobileVoiceUnlock();


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


        if (savedName) {

            const nameInput =
                document.getElementById(
                    "patientName"
                );


            if (nameInput) {

                nameInput.value =
                    savedName;

            }

        }


        if (savedPhone) {

            const phoneInput =
                document.getElementById(
                    "patientPhone"
                );


            if (phoneInput) {

                phoneInput.value =
                    savedPhone;

            }

        }


        if (
            savedName &&
            savedPhone
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


            loadMedicines();

            loadCaregiver();

            updateDashboard();

            updateNextReminder();

            startReminderChecker();

        }

    }
);


// =====================================================
// VOICE LIST UPDATE
// =====================================================

if (
    "speechSynthesis"
    in window
) {

    speechSynthesis.onvoiceschanged =
        function() {

            speechVoices =
                speechSynthesis
                    .getVoices();

        };

}
