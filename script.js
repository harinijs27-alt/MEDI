// ============================================================
// MEDICARE AI - MEDICATION REMINDER
// ============================================================

// Medicine storage
let medicines = [];

// Currently active reminder
let activeReminder = null;

// Reminder checking loop
let reminderLoop = null;

// Voice repetition loop
let reminderLoopRepeat = null;

// Missed medicine timer
let missedTimer = null;


// ============================================================
// TRANSLATIONS
// ============================================================

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

        take: "Taken",

        delete: "Delete",

        caregiver: "Caregiver",

        caregiverPhone: "Caregiver Phone Number",

        saveCaregiver: "Save Caregiver",

        report: "Medication Report",

        totalMedicines: "Total Medicines",

        medicinesTaken: "Medicines Taken",

        medicinesMissed: "Medicines Missed",

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

        voiceReady: "Voice reminder ready",

        medicineAdded: "Medicine added successfully",

        medicineAlreadyExists:
            "This medicine already exists at this time.",

        invalidDetails:
            "Please enter medicine name, dosage and time.",

        caregiverSaved:
            "Caregiver number saved.",

        voiceReminder:
            "Time to take",

        reminderMissed:
            "You missed your medicine",

        caregiverAlert:
            "Medicine missed. Please check the patient.",

        medicineDeleted:
            "Medicine deleted."

    },


    ta: {

        subtitle: "செயற்கை நுண்ணறிவு சுகாதார உதவியாளர்",

        aiStatus: "AI கண்காணிப்பு செயல்பாட்டில் உள்ளது",

        welcome: "வரவேற்கிறோம்",

        total: "மொத்த மருந்துகள்",

        taken: "எடுத்தது",

        missed: "தவறியது",

        adherence: "பின்பற்றுதல்",

        nextReminder: "அடுத்த மருந்து நினைவூட்டல்",

        noReminder: "நினைவூட்டல்கள் இல்லை",

        addMedicine: "மருந்தை சேர்க்கவும்",

        medicineList: "மருந்து அட்டவணை",

        medicineName: "மருந்தின் பெயர்",

        dosage: "அளவு",

        add: "மருந்தை சேர்க்கவும்",

        pending: "நிலுவையில்",

        takenStatus: "எடுத்துவிட்டார்",

        missedStatus: "தவறியது",

        take: "எடுத்துவிட்டேன்",

        delete: "நீக்கு",

        caregiver: "பராமரிப்பாளர்",

        caregiverPhone: "பராமரிப்பாளர் தொலைபேசி எண்",

        saveCaregiver: "சேமிக்கவும்",

        report: "மருந்து அறிக்கை",

        totalMedicines: "மொத்த மருந்துகள்",

        medicinesTaken: "எடுத்த மருந்துகள்",

        medicinesMissed: "தவறிய மருந்துகள்",

        activityLog: "செயல்பாட்டு பதிவு",

        callCaregiver: "📞 பராமரிப்பாளரை அழைக்கவும்",

        emergency: "🚑 அவசர உதவி",

        logout: "வெளியேறு",

        aiTitle: "AI சுகாதார உதவியாளர்",

        aiMessage:
            "உங்கள் மருந்து அட்டவணை தானாக கண்காணிக்கப்படுகிறது.",

        patientName: "நோயாளியின் பெயர்",

        phone: "தொலைபேசி எண்",

        language: "மொழியை தேர்வு செய்யவும்",

        login: "உள்நுழைக",

        voiceReady: "குரல் நினைவூட்டல் தயாராக உள்ளது",

        medicineAdded:
            "மருந்து வெற்றிகரமாக சேர்க்கப்பட்டது",

        medicineAlreadyExists:
            "இந்த நேரத்தில் இந்த மருந்து ஏற்கனவே உள்ளது.",

        invalidDetails:
            "மருந்தின் பெயர், அளவு மற்றும் நேரத்தை உள்ளிடவும்.",

        caregiverSaved:
            "பராமரிப்பாளர் எண் சேமிக்கப்பட்டது.",

        voiceReminder:
            "மருந்தை எடுத்துக்கொள்ளும் நேரம்",

        reminderMissed:
            "நீங்கள் மருந்தை எடுக்க தவறிவிட்டீர்கள்",

        caregiverAlert:
            "மருந்து தவறியுள்ளது. நோயாளியை சரிபார்க்கவும்.",

        medicineDeleted:
            "மருந்து நீக்கப்பட்டது."

    },


    hi: {

        subtitle: "AI संचालित स्वास्थ्य सहायक",

        aiStatus: "AI निगरानी ऑनलाइन",

        welcome: "स्वागत है",

        total: "कुल दवाइयाँ",

        taken: "ली गई",

        missed: "छूटी",

        adherence: "पालन",

        nextReminder: "अगली दवा की याद दिलाना",

        noReminder: "कोई रिमाइंडर नहीं",

        addMedicine: "दवा जोड़ें",

        medicineList: "दवा अनुसूची",

        medicineName: "दवा का नाम",

        dosage: "खुराक",

        add: "दवा जोड़ें",

        pending: "लंबित",

        takenStatus: "ली गई",

        missedStatus: "छूटी",

        take: "ले ली",

        delete: "हटाएं",

        caregiver: "देखभालकर्ता",

        caregiverPhone: "देखभालकर्ता फोन नंबर",

        saveCaregiver: "सेव करें",

        report: "दवा रिपोर्ट",

        totalMedicines: "कुल दवाइयाँ",

        medicinesTaken: "ली गई दवाइयाँ",

        medicinesMissed: "छूटी हुई दवाइयाँ",

        activityLog: "गतिविधि लॉग",

        callCaregiver: "📞 देखभालकर्ता को कॉल करें",

        emergency: "🚑 आपातकाल",

        logout: "लॉग आउट",

        aiTitle: "AI स्वास्थ्य सहायक",

        aiMessage:
            "आपकी दवा अनुसूची स्वचालित रूप से निगरानी की जा रही है।",

        patientName: "मरीज का नाम",

        phone: "फोन नंबर",

        language: "भाषा चुनें",

        login: "लॉगिन",

        voiceReady: "वॉयस रिमाइंडर तैयार है",

        medicineAdded:
            "दवा सफलतापूर्वक जोड़ दी गई है",

        medicineAlreadyExists:
            "इस समय यह दवा पहले से मौजूद है।",

        invalidDetails:
            "कृपया दवा का नाम, खुराक और समय दर्ज करें।",

        caregiverSaved:
            "देखभालकर्ता नंबर सेव किया गया।",

        voiceReminder:
            "दवा लेने का समय हो गया है",

        reminderMissed:
            "आप दवा लेना भूल गए हैं",

        caregiverAlert:
            "दवा छूट गई है। कृपया मरीज की जांच करें।",

        medicineDeleted:
            "दवा हटा दी गई।"

    },


    te: {

        subtitle: "AI ఆధారిత ఆరోగ్య సహాయకుడు",

        aiStatus: "AI పర్యవేక్షణ ఆన్‌లైన్‌లో ఉంది",

        welcome: "స్వాగతం",

        total: "మొత్తం మందులు",

        taken: "తీసుకున్నవి",

        missed: "మిస్ అయినవి",

        adherence: "పాటింపు",

        nextReminder: "తదుపరి మందు రిమైండర్",

        noReminder: "రిమైండర్లు లేవు",

        addMedicine: "మందును జోడించండి",

        medicineList: "మందుల షెడ్యూల్",

        medicineName: "మందు పేరు",

        dosage: "మోతాదు",

        add: "మందును జోడించండి",

        pending: "పెండింగ్",

        takenStatus: "తీసుకున్నారు",

        missedStatus: "మిస్ అయింది",

        take: "తీసుకున్నాను",

        delete: "తొలగించు",

        caregiver: "సంరక్షకుడు",

        caregiverPhone: "సంరక్షకుడి ఫోన్ నంబర్",

        saveCaregiver: "సేవ్ చేయండి",

        report: "మందుల నివేదిక",

        totalMedicines: "మొత్తం మందులు",

        medicinesTaken: "తీసుకున్న మందులు",

        medicinesMissed: "మిస్ అయిన మందులు",

        activityLog: "కార్యకలాప లాగ్",

        callCaregiver: "📞 సంరక్షకుడికి కాల్ చేయండి",

        emergency: "🚑 అత్యవసరం",

        logout: "లాగ్ అవుట్",

        aiTitle: "AI ఆరోగ్య సహాయకుడు",

        aiMessage:
            "మీ మందుల షెడ్యూల్ స్వయంచాలకంగా పర్యవేక్షించబడుతోంది.",

        patientName: "రోగి పేరు",

        phone: "ఫోన్ నంబర్",

        language: "భాషను ఎంచుకోండి",

        login: "లాగిన్",

        voiceReady: "వాయిస్ రిమైండర్ సిద్ధంగా ఉంది",

        medicineAdded:
            "మందు విజయవంతంగా జోడించబడింది",

        medicineAlreadyExists:
            "ఈ సమయంలో ఈ మందు ఇప్పటికే ఉంది.",

        invalidDetails:
            "దయచేసి మందు పేరు, మోతాదు మరియు సమయాన్ని నమోదు చేయండి.",

        caregiverSaved:
            "సంరక్షకుడి నంబర్ సేవ్ చేయబడింది.",

        voiceReminder:
            "మందు తీసుకునే సమయం వచ్చింది",

        reminderMissed:
            "మీరు మందు తీసుకోవడం మిస్ అయ్యారు",

        caregiverAlert:
            "మందు మిస్ అయింది. దయచేసి రోగిని తనిఖీ చేయండి.",

        medicineDeleted:
            "మందు తొలగించబడింది."

    }

};


// ============================================================
// LANGUAGE SETTINGS
// ============================================================

function getLanguage() {

    return localStorage.getItem("selectedLanguage") || "en";

}


function changeLanguage(lang) {

    localStorage.setItem("selectedLanguage", lang);

    applyLanguage(lang);

    loadMedicines();

    updateDashboard();

}


function applyLanguage(lang) {

    const t = translations[lang] || translations.en;


    // Header
    setText("headerSubtitle", t.subtitle);

    setText("aiStatusText", t.aiStatus);

    setText("welcomeTitle",
        `${t.welcome}, ${localStorage.getItem("patientName") || ""}`);


    // Dashboard
    setText("totalLabel", t.total);

    setText("takenLabel", t.taken);

    setText("missedLabel", t.missed);

    setText("adherenceLabel", t.adherence);

    setText("nextReminderTitle", t.nextReminder);

    setText("addMedicineTitle", t.addMedicine);

    setText("medicineListTitle", t.medicineList);

    setText("caregiverTitle", t.caregiver);

    setText("caregiverPhoneLabel", t.caregiverPhone);

    setText("saveCaregiverButton", t.saveCaregiver);

    setText("reportTitle", t.report);

    setText("reportTotalText", t.totalMedicines);

    setText("reportTakenText", t.medicinesTaken);

    setText("reportMissedText", t.medicinesMissed);

    setText("reportAdherenceText", t.adherence);

    setText("logTitle", t.activityLog);

    setText("callCaregiverButton", t.callCaregiver);

    setText("ambulanceButton", t.emergency);

    setText("logoutButton", t.logout);

    setText("aiTitle", t.aiTitle);

    setText("aiMessage", t.aiMessage);


    // Login
    setText("loginSubtitle", t.subtitle);

    setText("nameLabel", t.patientName);

    setText("phoneLabel", t.phone);

    setText("languageLabel", t.language);

    setText("loginButton", t.login);


    // Placeholders
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

    setText("addButton", t.add);


    // Keep dropdown synchronized
    const dashboardLanguage =
        document.getElementById("dashboardLanguage");

    if (dashboardLanguage) {
        dashboardLanguage.value = lang;
    }


    const loginLanguage =
        document.getElementById("languageSelect");

    if (loginLanguage) {
        loginLanguage.value = lang;
    }

}


function setText(id, text) {

    const element = document.getElementById(id);

    if (element) {
        element.textContent = text;
    }

}


function setPlaceholder(id, text) {

    const element = document.getElementById(id);

    if (element) {
        element.placeholder = text;
    }

}


// ============================================================
// LOGIN
// ============================================================

function login() {

    const name =
        document.getElementById("patientName").value.trim();

    const phone =
        document.getElementById("patientPhone").value.trim();

    const language =
        document.getElementById("languageSelect").value;


    if (!name || !phone) {

        alert(
            translations[language].invalidDetails
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


    document.getElementById("loginSection")
        .style.display = "none";

    document.getElementById("dashboardSection")
        .style.display = "block";


    loadMedicines();

    loadCaregiver();

    applyLanguage(language);

    updateDashboard();

    updateNextReminder();

    startReminderChecker();

    prepareSpeech();


    addLog(
        "User logged into MEDICARE AI"
    );

}


// ============================================================
// MEDICINE STORAGE KEY
// ============================================================

function getMedicineStorageKey() {

    const phone =
        localStorage.getItem("patientPhone") || "default";

    return "medicines_" + phone;

}


// ============================================================
// ADD MEDICINE
// ============================================================

function addMedicine() {

    const name =
        document.getElementById("medicineName")
            .value.trim();

    const dosage =
        document.getElementById("dosage")
            .value.trim();

    const time =
        document.getElementById("medicineTime")
            .value;

    const lang = getLanguage();

    const t = translations[lang];


    if (!name || !dosage || !time) {

        alert(t.invalidDetails);

        return;

    }


    const existing =
        medicines.find(
            medicine =>
                medicine.name.toLowerCase() === name.toLowerCase() &&
                medicine.time === time &&
                medicine.status === "Pending"
        );


    if (existing) {

        alert(t.medicineAlreadyExists);

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

    saveMedicines();

    loadMedicines();

    updateDashboard();

    updateNextReminder();


    document.getElementById("medicineName").value = "";

    document.getElementById("dosage").value = "";

    document.getElementById("medicineTime").value = "";


    document.getElementById("voiceStatus")
        .textContent = t.voiceReady;


    addLog(
        `${name} - ${time} - ${t.medicineAdded}`
    );

}


// ============================================================
// SAVE MEDICINES
// ============================================================

function saveMedicines() {

    localStorage.setItem(
        getMedicineStorageKey(),
        JSON.stringify(medicines)
    );

}


// ============================================================
// LOAD MEDICINES
// ============================================================

function loadMedicines() {

    const stored =
        localStorage.getItem(
            getMedicineStorageKey()
        );


    medicines =
        stored
            ? JSON.parse(stored)
            : [];


    renderMedicines();

}


// ============================================================
// RENDER MEDICINES
// ============================================================

function renderMedicines() {

    const list =
        document.getElementById("medicineList");

    if (!list) return;


    list.innerHTML = "";


    if (medicines.length === 0) {

        const t = translations[getLanguage()];

        list.innerHTML = `
            <div class="medicine-item">
                ${t.noReminder}
            </div>
        `;

        return;

    }


    medicines
        .sort((a, b) =>
            a.time.localeCompare(b.time)
        )
        .forEach(medicine => {

            const item =
                document.createElement("div");

            item.className =
                "medicine-item";


            let statusClass =
                "pending";

            if (medicine.status === "Taken") {

                statusClass = "taken";

            }

            if (medicine.status === "Missed") {

                statusClass = "missed";

            }


            const t =
                translations[getLanguage()];


            let translatedStatus =
                t.pending;


            if (medicine.status === "Taken") {

                translatedStatus =
                    t.takenStatus;

            }

            if (medicine.status === "Missed") {

                translatedStatus =
                    t.missedStatus;

            }


            item.innerHTML = `

                <div class="medicine-info">

                    <h3>
                        💊 ${escapeHTML(medicine.name)}
                    </h3>

                    <p>
                        ${escapeHTML(medicine.dosage)}
                    </p>

                    <p>
                        ⏰ ${medicine.time}
                    </p>

                    <p class="status ${statusClass}">
                        ${translatedStatus}
                    </p>

                </div>

                <div class="medicine-actions">

                    ${
                        medicine.status === "Pending"
                        ?
                        `
                        <button
                            class="btn-success"
                            onclick="markTaken(${medicine.id})"
                        >
                            ${t.take}
                        </button>
                        `
                        :
                        ""
                    }

                    <button
                        class="btn-danger"
                        onclick="deleteMedicine(${medicine.id})"
                    >
                        ${t.delete}
                    </button>

                </div>
            `;


            list.appendChild(item);

        });

}


// ============================================================
// ESCAPE HTML
// ============================================================

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent = value;

    return div.innerHTML;

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
                (taken / completed) * 100
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

}


// ============================================================
// NEXT REMINDER
// ============================================================

function updateNextReminder() {

    const element =
        document.getElementById("nextReminder");

    if (!element) return;


    const pending =
        medicines
            .filter(
                medicine =>
                    medicine.status === "Pending"
            )
            .sort(
                (a, b) =>
                    a.time.localeCompare(b.time)
            );


    if (pending.length === 0) {

        element.textContent =
            translations[getLanguage()].noReminder;

        return;

    }


    const next =
        pending[0];


    element.textContent =
        `${next.name} - ${next.time}`;

}


// ============================================================
// SPEECH LANGUAGE
// ============================================================

function getSpeechLanguage() {

    const lang = getLanguage();


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
// FIND VOICE
// ============================================================

function getVoice(languageCode) {

    const voices =
        window.speechSynthesis.getVoices();


    if (!voices || voices.length === 0) {

        return null;

    }


    // Exact language match
    let voice =
        voices.find(
            v =>
                v.lang.toLowerCase() ===
                languageCode.toLowerCase()
        );


    if (voice) return voice;


    // Same language
    const shortCode =
        languageCode
            .split("-")[0]
            .toLowerCase();


    voice =
        voices.find(
            v =>
                v.lang
                    .toLowerCase()
                    .startsWith(shortCode)
        );


    return voice || null;

}


// ============================================================
// PREPARE SPEECH
// ============================================================

function prepareSpeech() {

    if (!("speechSynthesis" in window)) {

        console.log(
            "Speech synthesis is not supported."
        );

        return;

    }


    // Force browser to load voices
    window.speechSynthesis.getVoices();


    window.speechSynthesis.onvoiceschanged =
        function () {

            window.speechSynthesis.getVoices();

        };

}


// ============================================================
// SPEAK MEDICINE REMINDER
// ============================================================

function speakMedicineReminder(medicine) {

    if (!("speechSynthesis" in window)) {

        alert(
            "Your browser does not support voice reminders."
        );

        return;

    }


    const lang =
        getLanguage();


    const speechLanguage =
        getSpeechLanguage();


    const t =
        translations[lang];


    /*
     IMPORTANT:

     medicine.name is exactly the name
     entered by the user.

     Example:

     medicine.name = "Paracetamol"

     Tamil:
     "Paracetamol மருந்தை எடுத்துக்கொள்ளும் நேரம்"

     Hindi:
     "Paracetamol दवा लेने का समय हो गया है"

     Telugu:
     "Paracetamol మందు తీసుకునే సమయం వచ్చింది"

     */


    let message = "";


    if (lang === "ta") {

        message =
            `${medicine.name} மருந்தை எடுத்துக்கொள்ளும் நேரம்`;

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


    // Stop previous speech
    window.speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(
            message
        );


    speech.lang =
        speechLanguage;


    speech.rate = 0.85;

    speech.pitch = 1.0;

    speech.volume = 1.0;


    const voice =
        getVoice(speechLanguage);


    if (voice) {

        speech.voice = voice;

    }


    speech.onstart =
        function () {

            const status =
                document.getElementById(
                    "voiceStatus"
                );

            if (status) {

                status.textContent =
                    message;

            }

        };


    speech.onerror =
        function (event) {

            console.log(
                "Speech error:",
                event.error
            );

        };


    window.speechSynthesis.speak(
        speech
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
            1000
        );


    checkMedicationReminder();

}


// ============================================================
// CHECK CURRENT TIME
// ============================================================

function checkMedicationReminder() {

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
        `${currentHour}:${currentMinute}`;


    medicines.forEach(
        medicine => {

            if (
                medicine.status === "Pending" &&
                medicine.time === currentTime
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

function triggerReminder(medicine) {

    // Prevent duplicate reminder
    if (
        activeReminder &&
        activeReminder.id === medicine.id
    ) {

        return;

    }


    activeReminder =
        medicine;


    // Stop any previous repetition
    if (reminderLoopRepeat) {

        clearInterval(
            reminderLoopRepeat
        );

    }


    // Stop any previous missed timer
    if (missedTimer) {

        clearTimeout(
            missedTimer
        );

    }


    // Speak immediately
    speakMedicineReminder(
        medicine
    );


    // Repeat every 10 seconds
    reminderLoopRepeat =
        setInterval(
            function () {

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


    // After 60 seconds → Missed
    missedTimer =
        setTimeout(
            function () {

                if (
                    medicine.status ===
                    "Pending"
                ) {

                    medicine.status =
                        "Missed";


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
                        `${medicine.name} - Missed`
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


    window.speechSynthesis.cancel();

    activeReminder =
        null;

}


// ============================================================
// MARK MEDICINE TAKEN
// ============================================================

function markTaken(id) {

    const medicine =
        medicines.find(
            item =>
                item.id === id
        );


    if (!medicine) return;


    medicine.status =
        "Taken";


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


    const t =
        translations[getLanguage()];


    addLog(
        `${medicine.name} - ${t.takenStatus}`
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


    if (!medicine) return;


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
            translations[getLanguage()].medicineDeleted
        }`
    );

}


// ============================================================
// MISSED REMINDER VOICE
// ============================================================

function speakMissedReminder(medicine) {

    const lang =
        getLanguage();


    const speechLanguage =
        getSpeechLanguage();


    const t =
        translations[lang];


    const message =
        `${t.reminderMissed}: ${medicine.name}`;


    const speech =
        new SpeechSynthesisUtterance(
            message
        );


    speech.lang =
        speechLanguage;


    speech.rate =
        0.85;


    const voice =
        getVoice(
            speechLanguage
        );


    if (voice) {

        speech.voice =
            voice;

    }


    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(
        speech
    );

}


// ============================================================
// CAREGIVER SMS
// ============================================================

function sendCaregiverSMS(medicine) {

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
        `sms:${caregiver}?body=${encodeURIComponent(message)}`;


    window.location.href =
        smsURL;

}


// ============================================================
// CAREGIVER
// ============================================================

function saveCaregiver() {

    const phone =
        document.getElementById(
            "caregiverPhone"
        ).value.trim();


    if (!phone) {

        return;

    }


    localStorage.setItem(
        "caregiverPhone",
        phone
    );


    alert(
        translations[getLanguage()]
            .caregiverSaved
    );


    addLog(
        "Caregiver number saved"
    );

}


function loadCaregiver() {

    const phone =
        localStorage.getItem(
            "caregiverPhone"
        );


    if (phone) {

        document.getElementById(
            "caregiverPhone"
        ).value = phone;

    }

}


// ============================================================
// CALL CAREGIVER
// ============================================================

function callCaregiver() {

    const phone =
        localStorage.getItem(
            "caregiverPhone"
        );


    if (!phone) {

        alert(
            translations[getLanguage()]
                .caregiverPhone
        );

        return;

    }


    window.location.href =
        `tel:${phone}`;

}


// ============================================================
// AMBULANCE
// ============================================================

function callAmbulance() {

    window.location.href =
        "tel:108";

}


// ============================================================
// ACTIVITY LOG
// ============================================================

function addLog(message) {

    const log =
        document.getElementById(
            "activityLog"
        );


    if (!log) return;


    const item =
        document.createElement(
            "div"
        );


    item.className =
        "log-item";


    item.textContent =
        `${new Date().toLocaleTimeString()} - ${message}`;


    log.prepend(item);

}


// ============================================================
// LOGOUT
// ============================================================

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


    document.getElementById(
        "dashboardSection"
    ).style.display = "none";


    document.getElementById(
        "loginSection"
    ).style.display = "flex";


    addLog(
        "User logged out"
    );

}


// ============================================================
// PAGE LOAD
// ============================================================

window.addEventListener(
    "DOMContentLoaded",
    function () {

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


        document.getElementById(
            "languageSelect"
        ).value =
            savedLanguage;


        if (savedName) {

            document.getElementById(
                "patientName"
            ).value =
                savedName;

        }


        if (savedPhone) {

            document.getElementById(
                "patientPhone"
            ).value =
                savedPhone;

        }


        applyLanguage(
            savedLanguage
        );


        prepareSpeech();


        // If user was already logged in
        if (
            savedName &&
            savedPhone
        ) {

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
// VOICE LISTENER
// ============================================================

if ("speechSynthesis" in window) {

    window.speechSynthesis.onvoiceschanged =
        function () {

            window.speechSynthesis
                .getVoices();

        };

}
