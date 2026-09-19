let medicines = [];

let activeReminder = null;
let reminderLoop = null;
let reminderTimeout = null;

// =====================================================
// ALARM SYSTEM
// =====================================================

let alarmAudioContext = null;
let alarmInterval = null;

function initAlarmAudio(){

    try{

        const AudioContextClass =
            window.AudioContext ||
            window.webkitAudioContext;

        if(!AudioContextClass){
            return false;
        }

        if(!alarmAudioContext){

            alarmAudioContext =
                new AudioContextClass();

        }

        if(
            alarmAudioContext.state ===
            "suspended"
        ){

            alarmAudioContext.resume();

        }

        return true;

    }
    catch(error){

        console.log(
            "Audio initialization error:",
            error
        );

        return false;

    }

}


function makeAlarmBeep(){

    if(!initAlarmAudio()){
        return;
    }

    try{

        const now =
            alarmAudioContext.currentTime;

        const oscillator =
            alarmAudioContext.createOscillator();

        const gain =
            alarmAudioContext.createGain();

        oscillator.type =
            "square";

        oscillator.frequency.setValueAtTime(
            880,
            now
        );

        gain.gain.setValueAtTime(
            0.0001,
            now
        );

        gain.gain.exponentialRampToValueAtTime(
            0.35,
            now + 0.02
        );

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            now + 0.45
        );

        oscillator.connect(gain);

        gain.connect(
            alarmAudioContext.destination
        );

        oscillator.start(now);

        oscillator.stop(
            now + 0.5
        );

    }
    catch(error){

        console.log(
            "Alarm beep error:",
            error
        );

    }

}


function playAlarm(){

    if(!initAlarmAudio()){

        alert(
            "Please click or tap the page once to enable the alarm sound."
        );

        return;

    }

    stopAlarm(false);

    makeAlarmBeep();

    alarmInterval =
        setInterval(
            makeAlarmBeep,
            1000
        );

}


function stopAlarm(closeContext = false){

    if(alarmInterval){

        clearInterval(
            alarmInterval
        );

        alarmInterval = null;

    }


    const alarm =
        document.getElementById("alarm");

    if(alarm){

        try{

            alarm.pause();

            alarm.currentTime = 0;

            alarm.loop = false;

        }
        catch(error){}

    }


    if(
        closeContext &&
        alarmAudioContext
    ){

        try{

            alarmAudioContext.close();

        }
        catch(error){}

        alarmAudioContext = null;

    }

}


// Unlock audio after user interaction

document.addEventListener(
    "pointerdown",
    initAlarmAudio
);


// =====================================================
// LANGUAGE TRANSLATIONS
// =====================================================

const translations = {

    en: {

        subtitle:
            "AI Powered Healthcare Assistant",

        aiMonitoring:
            "AI Monitoring Online",

        patientName:
            "Patient Name",

        age:
            "Age",

        phone:
            "Phone Number",

        caregiver:
            "Caregiver Number",

        language:
            "Language",

        patientNamePlaceholder:
            "Enter Patient Name",

        agePlaceholder:
            "Enter Age",

        login:
            "Login",

        loginSuccessful:
            "Login Successful",

        aiPreparing:
            "🤖 AI Healthcare Assistant is Preparing...",

        monitoring:
            "AI Healthcare Monitoring System",

        aiOnline:
            "AI Online",

        profile:
            "Patient Profile",

        nextReminder:
            "⏰ Next Reminder",

        noReminder:
            "No Reminder",

        totalMedicines:
            "Total Medicines",

        taken:
            "Taken",

        missed:
            "Missed",

        adherence:
            "Adherence",

        addMedicine:
            "Add Medicine",

        medicineName:
            "Medicine Name",

        dosage:
            "Dosage",

        reminderTime:
            "Reminder Time",

        medicinePlaceholder:
            "Enter Medicine Name",

        dosagePlaceholder:
            "Example: 1 Tablet",

        todaysMedicines:
            "Today's Medicines",

        callCaregiver:
            "📞 Call Caregiver",

        ambulance:
            "🚑 Ambulance",

        aiAssistant:
            "🤖 AI Health Assistant",

        healthMessage:
            "Welcome!\n\nYour health is being monitored.\n\nRemember to take your medicines on time.",

        medicineReport:
            "📋 Medicine Report",

        total:
            "Total",

        medicine:
            "Medicine",

        time:
            "Time",

        status:
            "Status",

        downloadReport:
            "Download Report",

        activityLogs:
            "Activity Logs",

        darkMode:
            "Dark Mode",

        logout:
            "Logout",

        pending:
            "Pending",

        takenStatus:
            "Taken",

        missedStatus:
            "Missed",

        welcome:
            "Welcome"

    },


    ta: {

        subtitle:
            "AI மூலம் இயங்கும் சுகாதார உதவியாளர்",

        aiMonitoring:
            "AI கண்காணிப்பு ஆன்லைனில் உள்ளது",

        patientName:
            "நோயாளியின் பெயர்",

        age:
            "வயது",

        phone:
            "தொலைபேசி எண்",

        caregiver:
            "பராமரிப்பாளர் எண்",

        language:
            "மொழி",

        patientNamePlaceholder:
            "நோயாளியின் பெயரை உள்ளிடவும்",

        agePlaceholder:
            "வயதை உள்ளிடவும்",

        login:
            "உள்நுழைய",

        loginSuccessful:
            "உள்நுழைவு வெற்றிகரமாக முடிந்தது",

        aiPreparing:
            "🤖 AI சுகாதார உதவியாளர் தயாராகிறது...",

        monitoring:
            "AI சுகாதார கண்காணிப்பு அமைப்பு",

        aiOnline:
            "AI ஆன்லைனில் உள்ளது",

        profile:
            "நோயாளியின் விவரம்",

        nextReminder:
            "⏰ அடுத்த நினைவூட்டல்",

        noReminder:
            "நினைவூட்டல் இல்லை",

        totalMedicines:
            "மொத்த மருந்துகள்",

        taken:
            "எடுத்தது",

        missed:
            "தவறியது",

        adherence:
            "மருந்து பின்பற்றல்",

        addMedicine:
            "மருந்து சேர்க்கவும்",

        medicineName:
            "மருந்தின் பெயர்",

        dosage:
            "மருந்தின் அளவு",

        reminderTime:
            "நினைவூட்டும் நேரம்",

        medicinePlaceholder:
            "மருந்தின் பெயரை உள்ளிடவும்",

        dosagePlaceholder:
            "உதாரணம்: 1 மாத்திரை",

        todaysMedicines:
            "இன்றைய மருந்துகள்",

        callCaregiver:
            "📞 பராமரிப்பாளரை அழைக்கவும்",

        ambulance:
            "🚑 ஆம்புலன்ஸ்",

        aiAssistant:
            "🤖 AI சுகாதார உதவியாளர்",

        healthMessage:
            "வரவேற்கிறோம்!\n\nஉங்கள் உடல்நிலை கண்காணிக்கப்படுகிறது.\n\nஉங்கள் மருந்துகளை சரியான நேரத்தில் எடுத்துக்கொள்ளுங்கள்.",

        medicineReport:
            "📋 மருந்து அறிக்கை",

        total:
            "மொத்தம்",

        medicine:
            "மருந்து",

        time:
            "நேரம்",

        status:
            "நிலை",

        downloadReport:
            "அறிக்கையை பதிவிறக்கவும்",

        activityLogs:
            "செயல்பாட்டு பதிவுகள்",

        darkMode:
            "இருண்ட பயன்முறை",

        logout:
            "வெளியேறு",

        pending:
            "நிலுவையில்",

        takenStatus:
            "எடுத்தது",

        missedStatus:
            "தவறியது",

        welcome:
            "வரவேற்கிறோம்"

    },


    hi: {

        subtitle:
            "AI संचालित स्वास्थ्य सहायक",

        aiMonitoring:
            "AI निगरानी ऑनलाइन",

        patientName:
            "मरीज़ का नाम",

        age:
            "आयु",

        phone:
            "फ़ोन नंबर",

        caregiver:
            "देखभालकर्ता नंबर",

        language:
            "भाषा",

        patientNamePlaceholder:
            "मरीज़ का नाम दर्ज करें",

        agePlaceholder:
            "आयु दर्ज करें",

        login:
            "लॉगिन",

        loginSuccessful:
            "लॉगिन सफल हुआ",

        aiPreparing:
            "🤖 AI स्वास्थ्य सहायक तैयार हो रहा है...",

        monitoring:
            "AI स्वास्थ्य निगरानी प्रणाली",

        aiOnline:
            "AI ऑनलाइन",

        profile:
            "मरीज़ की जानकारी",

        nextReminder:
            "⏰ अगली याद दिलाने की सूचना",

        noReminder:
            "कोई रिमाइंडर नहीं",

        totalMedicines:
            "कुल दवाइयाँ",

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

        reminderTime:
            "याद दिलाने का समय",

        medicinePlaceholder:
            "दवा का नाम दर्ज करें",

        dosagePlaceholder:
            "उदाहरण: 1 टैबलेट",

        todaysMedicines:
            "आज की दवाइयाँ",

        callCaregiver:
            "📞 देखभालकर्ता को कॉल करें",

        ambulance:
            "🚑 एम्बुलेंस",

        aiAssistant:
            "🤖 AI स्वास्थ्य सहायक",

        healthMessage:
            "स्वागत है!\n\nआपके स्वास्थ्य की निगरानी की जा रही है।\n\nअपनी दवाइयाँ समय पर लें।",

        medicineReport:
            "📋 दवा रिपोर्ट",

        total:
            "कुल",

        medicine:
            "दवा",

        time:
            "समय",

        status:
            "स्थिति",

        downloadReport:
            "रिपोर्ट डाउनलोड करें",

        activityLogs:
            "गतिविधि लॉग",

        darkMode:
            "डार्क मोड",

        logout:
            "लॉगआउट",

        pending:
            "लंबित",

        takenStatus:
            "ली गई",

        missedStatus:
            "छूटी",

        welcome:
            "स्वागत है"

    },


    te: {

        subtitle:
            "AI ఆధారిత ఆరోగ్య సహాయకుడు",

        aiMonitoring:
            "AI పర్యవేక్షణ ఆన్‌లైన్‌లో ఉంది",

        patientName:
            "రోగి పేరు",

        age:
            "వయస్సు",

        phone:
            "ఫోన్ నంబర్",

        caregiver:
            "సంరక్షకుడి నంబర్",

        language:
            "భాష",

        patientNamePlaceholder:
            "రోగి పేరును నమోదు చేయండి",

        agePlaceholder:
            "వయస్సును నమోదు చేయండి",

        login:
            "లాగిన్",

        loginSuccessful:
            "లాగిన్ విజయవంతమైంది",

        aiPreparing:
            "🤖 AI ఆరోగ్య సహాయకుడు సిద్ధమవుతోంది...",

        monitoring:
            "AI ఆరోగ్య పర్యవేక్షణ వ్యవస్థ",

        aiOnline:
            "AI ఆన్‌లైన్‌లో ఉంది",

        profile:
            "రోగి వివరాలు",

        nextReminder:
            "⏰ తదుపరి రిమైండర్",

        noReminder:
            "రిమైండర్ లేదు",

        totalMedicines:
            "మొత్తం మందులు",

        taken:
            "తీసుకున్నవి",

        missed:
            "మిస్ అయినవి",

        adherence:
            "మందుల అనుసరణ",

        addMedicine:
            "మందును జోడించండి",

        medicineName:
            "మందు పేరు",

        dosage:
            "మోతాదు",

        reminderTime:
            "రిమైండర్ సమయం",

        medicinePlaceholder:
            "మందు పేరును నమోదు చేయండి",

        dosagePlaceholder:
            "ఉదాహరణ: 1 టాబ్లెట్",

        todaysMedicines:
            "ఈరోజు మందులు",

        callCaregiver:
            "📞 సంరక్షకుడికి కాల్ చేయండి",

        ambulance:
            "🚑 అంబులెన్స్",

        aiAssistant:
            "🤖 AI ఆరోగ్య సహాయకుడు",

        healthMessage:
            "స్వాగతం!\n\nమీ ఆరోగ్యం పర్యవేక్షించబడుతోంది.\n\nమీ మందులను సమయానికి తీసుకోండి.",

        medicineReport:
            "📋 మందుల నివేదిక",

        total:
            "మొత్తం",

        medicine:
            "మందు",

        time:
            "సమయం",

        status:
            "స్థితి",

        downloadReport:
            "నివేదికను డౌన్‌లోడ్ చేయండి",

        activityLogs:
            "కార్యాచరణ లాగ్‌లు",

        darkMode:
            "డార్క్ మోడ్",

        logout:
            "లాగ్ అవుట్",

        pending:
            "పెండింగ్",

        takenStatus:
            "తీసుకున్నవి",

        missedStatus:
            "మిస్ అయినవి",

        welcome:
            "స్వాగతం"

    }

};


// =====================================================
// GET LANGUAGE
// =====================================================

function getLanguage(){

    return (
        localStorage.getItem(
            "selectedLanguage"
        ) || "en"
    );

}


// =====================================================
// APPLY LANGUAGE
// =====================================================

function applyLanguage(lang){

    if(!translations[lang]){

        lang = "en";

    }

    const t =
        translations[lang];


    localStorage.setItem(
        "selectedLanguage",
        lang
    );


    document.documentElement.lang =
        lang;


    // =================================================
    // LOGIN
    // =================================================

    const loginSection =
        document.getElementById(
            "loginSection"
        );


    if(loginSection){

        const labels =
            loginSection.querySelectorAll(
                ".input-group label"
            );


        const labelTexts = [

            t.patientName,
            t.age,
            t.phone,
            t.caregiver,
            t.language

        ];


        labels.forEach(
            function(label,index){

                if(!labelTexts[index]){
                    return;
                }


                const icon =
                    label.querySelector("i");


                label.innerHTML = "";


                if(icon){

                    label.appendChild(icon);

                }


                label.appendChild(
                    document.createTextNode(
                        " " +
                        labelTexts[index]
                    )
                );

            }
        );


        const subtitle =
            loginSection.querySelector(
                ".subtitle"
            );


        if(subtitle){

            subtitle.textContent =
                t.subtitle;

        }


        const aiStatus =
            loginSection.querySelector(
                ".ai-status"
            );


        if(aiStatus){

            const dot =
                aiStatus.querySelector(
                    ".dot"
                );


            aiStatus.innerHTML = "";


            if(dot){

                aiStatus.appendChild(dot);

            }


            aiStatus.appendChild(
                document.createTextNode(
                    " " +
                    t.aiMonitoring
                )
            );

        }


        const loginButton =
            loginSection.querySelector(
                ".login-btn"
            );


        if(loginButton){

            const icon =
                loginButton.querySelector(
                    "i"
                );


            loginButton.innerHTML = "";


            if(icon){

                loginButton.appendChild(icon);

            }


            loginButton.appendChild(
                document.createTextNode(
                    " " +
                    t.login
                )
            );

        }


        const patientName =
            document.getElementById(
                "patientName"
            );


        if(patientName){

            patientName.placeholder =
                t.patientNamePlaceholder;

        }


        const patientAge =
            document.getElementById(
                "patientAge"
            );


        if(patientAge){

            patientAge.placeholder =
                t.agePlaceholder;

        }

    }


    // =================================================
    // WELCOME
    // =================================================

    const welcomeParagraphs =
        document.querySelectorAll(
            "#welcomeSection .welcome-card p"
        );


    if(welcomeParagraphs[0]){

        welcomeParagraphs[0].textContent =
            t.loginSuccessful;

    }


    if(welcomeParagraphs[1]){

        welcomeParagraphs[1].textContent =
            t.aiPreparing;

    }


    // =================================================
    // DASHBOARD HEADER
    // =================================================

    const dashboardSubtitle =
        document.querySelector(
            "#dashboardSection .dashboard-header .subtitle"
        );


    if(dashboardSubtitle){

        dashboardSubtitle.textContent =
            t.monitoring;

    }


    const online =
        document.querySelector(
            ".status-online"
        );


    if(online){

        const dot =
            online.querySelector(
                ".online-dot"
            );


        online.innerHTML = "";


        if(dot){

            online.appendChild(dot);

        }


        online.appendChild(
            document.createTextNode(
                " " +
                t.aiOnline
            )
        );

    }


    // =================================================
    // PROFILE
    // =================================================

    const profileTitle =
        document.querySelector(
            ".profile-card h3"
        );


    if(profileTitle){

        profileTitle.textContent =
            t.profile;

    }


    // =================================================
    // NEXT REMINDER
    // =================================================

    const reminderTitle =
        document.querySelector(
            ".next-reminder-card h2"
        );


    if(reminderTitle){

        reminderTitle.textContent =
            t.nextReminder;

    }


    // =================================================
    // DASHBOARD CARDS
    // =================================================

    const dashboardCards =
        document.querySelectorAll(
            "#dashboardSection .dashboard-card"
        );


    let cardIndex = 0;


    dashboardCards.forEach(
        function(card){

            if(
                card.closest(
                    ".report-card"
                )
            ){

                return;

            }


            const heading =
                card.querySelector("h3");


            if(!heading){

                return;

            }


            const values = [

                t.totalMedicines,
                t.taken,
                t.missed,
                t.adherence

            ];


            if(cardIndex < 4){

                heading.textContent =
                    values[cardIndex];

                cardIndex++;

            }

        }
    );


    // =================================================
    // SECTION TITLES
    // =================================================

    const sectionTitles =
        document.querySelectorAll(
            "#dashboardSection .section-title"
        );


    if(sectionTitles[0]){

        sectionTitles[0].innerHTML =
            "💊 " +
            t.addMedicine;

    }


    if(sectionTitles[1]){

        sectionTitles[1].textContent =
            t.todaysMedicines;

    }


    // =================================================
    // MEDICINE INPUT LABELS
    // =================================================

    const medicineGroups =
        document.querySelectorAll(
            "#dashboardSection .content > .input-group"
        );


    const medicineLabels = [

        t.medicineName,
        t.dosage,
        t.reminderTime

    ];


    medicineGroups.forEach(
        function(group,index){

            if(index >= 3){

                return;

            }


            const label =
                group.querySelector(
                    "label"
                );


            if(label){

                label.textContent =
                    medicineLabels[index];

            }

        }
    );


    // =================================================
    // MEDICINE PLACEHOLDERS
    // =================================================

    const medicineName =
        document.getElementById(
            "medicineName"
        );


    if(medicineName){

        medicineName.placeholder =
            t.medicinePlaceholder;

    }


    const dosage =
        document.getElementById(
            "dosage"
        );


    if(dosage){

        dosage.placeholder =
            t.dosagePlaceholder;

    }


    // =================================================
    // ADD MEDICINE BUTTON
    // =================================================

    const addButton =
        document.querySelector(
            '.btn.primary[onclick="addMedicine()"]'
        );


    if(addButton){

        const icon =
            addButton.querySelector("i");


        addButton.innerHTML = "";


        if(icon){

            addButton.appendChild(icon);

        }


        addButton.appendChild(
            document.createTextNode(
                " " +
                t.addMedicine
            )
        );

    }


    // =================================================
    // QUICK ACTIONS
    // =================================================

    const caregiverButton =
        document.querySelector(
            ".btn.caregiver"
        );


    if(caregiverButton){

        caregiverButton.textContent =
            t.callCaregiver;

    }


    const ambulanceButton =
        document.querySelector(
            ".btn.ambulance"
        );


    if(ambulanceButton){

        ambulanceButton.textContent =
            t.ambulance;

    }


    // =================================================
    // AI ASSISTANT
    // =================================================

    const assistantTitle =
        document.querySelector(
            ".ai-assistant h2"
        );


    if(assistantTitle){

        assistantTitle.textContent =
            t.aiAssistant;

    }


    const healthMessage =
        document.getElementById(
            "healthMessage"
        );


    if(healthMessage){

        healthMessage.innerText =
            t.healthMessage;

    }


    // =================================================
    // REPORT
    // =================================================

    const reportTitle =
        document.querySelector(
            ".report-card h2"
        );


    if(reportTitle){

        reportTitle.textContent =
            t.medicineReport;

    }


    const reportCards =
        document.querySelectorAll(
            ".report-card .dashboard-card"
        );


    const reportTexts = [

        t.total,
        t.taken,
        t.missed,
        t.adherence

    ];


    reportCards.forEach(
        function(card,index){

            const paragraph =
                card.querySelector("p");


            if(
                paragraph &&
                reportTexts[index]
            ){

                paragraph.textContent =
                    reportTexts[index];

            }

        }
    );


    // =================================================
    // REPORT HEADERS
    // =================================================

    const headers =
        document.querySelectorAll(
            ".report-table th"
        );


    if(headers[0])
        headers[0].textContent =
            t.medicine;


    if(headers[1])
        headers[1].textContent =
            t.dosage;


    if(headers[2])
        headers[2].textContent =
            t.time;


    if(headers[3])
        headers[3].textContent =
            t.status;


    // =================================================
    // DOWNLOAD REPORT
    // =================================================

    const downloadButton =
        document.querySelector(
            '.report-card button[onclick="downloadReport()"]'
        );


    if(downloadButton){

        const icon =
            downloadButton.querySelector(
                "i"
            );


        downloadButton.innerHTML = "";


        if(icon){

            downloadButton.appendChild(icon);

        }


        downloadButton.appendChild(
            document.createTextNode(
                " " +
                t.downloadReport
            )
        );

    }


    // =================================================
    // LOGS
    // =================================================

    const logsTitle =
        document.querySelector(
            ".logs h2"
        );


    if(logsTitle){

        const icon =
            logsTitle.querySelector("i");


        logsTitle.innerHTML = "";


        if(icon){

            logsTitle.appendChild(icon);

        }


        logsTitle.appendChild(
            document.createTextNode(
                " " +
                t.activityLogs
            )
        );

    }


    // =================================================
    // SETTINGS
    // =================================================

    const darkButton =
        document.querySelector(
            ".dark-btn"
        );


    if(darkButton){

        const icon =
            darkButton.querySelector("i");


        darkButton.innerHTML = "";


        if(icon){

            darkButton.appendChild(icon);

        }


        darkButton.appendChild(
            document.createTextNode(
                " " +
                t.darkMode
            )
        );

    }


    const logoutButton =
        document.querySelector(
            ".logout-btn"
        );


    if(logoutButton){

        const icon =
            logoutButton.querySelector("i");


        logoutButton.innerHTML = "";


        if(icon){

            logoutButton.appendChild(icon);

        }


        logoutButton.appendChild(
            document.createTextNode(
                " " +
                t.logout
            )
        );

    }


    // Reload dynamic content

    if(
        typeof loadMedicines ===
        "function"
    ){

        loadMedicines();

    }


    if(
        typeof loadProfile ===
        "function"
    ){

        loadProfile();

    }


    if(
        typeof updateDashboard ===
        "function"
    ){

        updateDashboard();

    }

}


// =====================================================
// PATIENT STORAGE
// =====================================================

function getPatientKey(){

    return localStorage.getItem(
        "patientPhone"
    );

}


function loadPatientMedicines(){

    const key =
        "medicines_" +
        getPatientKey();


    medicines =
        JSON.parse(
            localStorage.getItem(key)
        ) || [];

}


function savePatientMedicines(){

    const key =
        "medicines_" +
        getPatientKey();


    localStorage.setItem(
        key,
        JSON.stringify(medicines)
    );

}


function loadPatientLogs(){

    const key =
        "logs_" +
        getPatientKey();


    return JSON.parse(
        localStorage.getItem(key)
    ) || [];

}


function savePatientLogs(logs){

    const key =
        "logs_" +
        getPatientKey();


    localStorage.setItem(
        key,
        JSON.stringify(logs)
    );

}


// =====================================================
// CLOCK
// =====================================================

function updateClock(){

    const clock =
        document.getElementById(
            "clock"
        );


    if(clock){

        clock.textContent =
            new Date().toLocaleTimeString();

    }

}


setInterval(
    updateClock,
    1000
);


// =====================================================
// LOGIN
// =====================================================

function loginPatient(){

    const name =
        document.getElementById(
            "patientName"
        ).value.trim();


    const age =
        document.getElementById(
            "patientAge"
        ).value.trim();


    const phone =
        document.getElementById(
            "patientPhone"
        ).value.trim();


    const caregiver =
        document.getElementById(
            "caregiverLogin"
        ).value.trim();


    const language =
        document.getElementById(
            "language"
        ).value;


    if(
        !name ||
        !age ||
        !phone ||
        !caregiver
    ){

        const lang =
            getLanguage();


        let message =
            "Please fill all fields";


        if(lang === "ta"){

            message =
                "அனைத்து விவரங்களையும் நிரப்பவும்";

        }
        else if(lang === "hi"){

            message =
                "कृपया सभी जानकारी भरें";

        }
        else if(lang === "te"){

            message =
                "దయచేసి అన్ని వివరాలను నమోదు చేయండి";

        }


        alert(message);

        return;

    }


    // Unlock browser audio

    initAlarmAudio();


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
        "caregiver",
        caregiver
    );


    localStorage.setItem(
        "selectedLanguage",
        language
    );


    loadPatientMedicines();


    document.getElementById(
        "loginSection"
    ).style.display = "none";


    document.getElementById(
        "welcomeSection"
    ).style.display = "flex";


    const welcomeUser =
        document.getElementById(
            "welcomeUser"
        );


    const t =
        translations[language];


    welcomeUser.textContent =
        `${t.welcome}, ${name}!`;


    applyLanguage(language);


    setTimeout(
        function(){

            document.getElementById(
                "welcomeSection"
            ).style.display = "none";


            document.getElementById(
                "dashboardSection"
            ).style.display = "block";


            document.getElementById(
                "welcomeText"
            ).textContent =
                `👋 ${t.welcome}, ${name}!`;


            applyLanguage(language);


            loadProfile();

            loadMedicines();

            loadLogs();

            updateDashboard();

        },
        3000
    );

}


// =====================================================
// AUTO LOGIN
// =====================================================

window.onload = function(){

    updateClock();


    const patient =
        localStorage.getItem(
            "patientName"
        );


    const savedLanguage =
        localStorage.getItem(
            "selectedLanguage"
        ) || "en";


    const languageSelector =
        document.getElementById(
            "language"
        );


    if(languageSelector){

        languageSelector.value =
            savedLanguage;


        languageSelector.addEventListener(
            "change",
            function(){

                applyLanguage(
                    this.value
                );

            }
        );

    }


    applyLanguage(
        savedLanguage
    );


    if(patient){

        loadPatientMedicines();


        document.getElementById(
            "loginSection"
        ).style.display = "none";


        document.getElementById(
            "welcomeSection"
        ).style.display = "flex";


        const t =
            translations[savedLanguage];


        document.getElementById(
            "welcomeUser"
        ).textContent =
            `${t.welcome}, ${patient}!`;


        setTimeout(
            function(){

                document.getElementById(
                    "welcomeSection"
                ).style.display = "none";


                document.getElementById(
                    "dashboardSection"
                ).style.display = "block";


                document.getElementById(
                    "welcomeText"
                ).textContent =
                    `👋 ${t.welcome}, ${patient}!`;


                applyLanguage(
                    savedLanguage
                );


                loadProfile();

                loadMedicines();

                loadLogs();

                updateDashboard();

            },
            3000
        );

    }

};


// =====================================================
// PROFILE
// =====================================================

function loadProfile(){

    const profile =
        document.getElementById(
            "patientProfile"
        );


    if(!profile){

        return;

    }


    const lang =
        getLanguage();


    const t =
        translations[lang];


    profile.innerHTML =
        `${t.patientName}: ${
            localStorage.getItem("patientName")
        }<br>
        ${t.age}: ${
            localStorage.getItem("patientAge")
        }<br>
        ${t.phone}: ${
            localStorage.getItem("patientPhone")
        }`;

}


// =====================================================
// ADD MEDICINE
// =====================================================

function addMedicine(){

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


    if(
        !name ||
        !dosage ||
        !time
    ){

        const lang =
            getLanguage();


        let message =
            "Fill all medicine details";


        if(lang === "ta"){

            message =
                "அனைத்து மருந்து விவரங்களையும் நிரப்பவும்";

        }
        else if(lang === "hi"){

            message =
                "सभी दवा विवरण भरें";

        }
        else if(lang === "te"){

            message =
                "అన్ని మందుల వివరాలను నమోదు చేయండి";

        }


        alert(message);

        return;

    }


    // Unlock audio

    initAlarmAudio();


    medicines.push({

        name:
            name,

        dosage:
            dosage,

        time:
            time,

        status:
            "Pending"

    });


    savePatientMedicines();


    addLog(
        name + " added"
    );


    document.getElementById(
        "medicineName"
    ).value = "";


    document.getElementById(
        "dosage"
    ).value = "";


    document.getElementById(
        "medicineTime"
    ).value = "";


    loadMedicines();

    updateDashboard();

}


// =====================================================
// STATUS TRANSLATION
// =====================================================

function translateStatus(status){

    const lang =
        getLanguage();


    const t =
        translations[lang];


    if(status === "Pending"){

        return t.pending;

    }


    if(status === "Taken"){

        return t.takenStatus;

    }


    if(status === "Missed"){

        return t.missedStatus;

    }


    return status;

}


// =====================================================
// LOAD MEDICINES
// =====================================================

function loadMedicines(){

    const list =
        document.getElementById(
            "medicineList"
        );


    if(!list){

        return;

    }


    list.innerHTML = "";


    const lang =
        getLanguage();


    const t =
        translations[lang];


    medicines.forEach(
        function(med,index){

            const li =
                document.createElement(
                    "li"
                );


            li.innerHTML =

                `<b>${med.name}</b><br>
                ${t.dosage}: ${med.dosage}<br>
                ${t.time}: ${med.time}<br>
                ${t.status}: ${
                    translateStatus(med.status)
                }<br><br>

                ${
                    med.status === "Pending"

                    ?

                    `<button onclick="markTaken(${index})">
                        ${t.taken}
                    </button>`

                    :

                    ""
                }`;


            list.appendChild(li);

        }
    );


    updateDashboard();

}


// =====================================================
// DASHBOARD & REPORT
// =====================================================

function updateDashboard(){

    const total =
        medicines.length;


    const taken =
        medicines.filter(
            function(med){

                return med.status === "Taken";

            }
        ).length;


    const missed =
        medicines.filter(
            function(med){

                return med.status === "Missed";

            }
        ).length;


    const adherence =
        total === 0

        ?

        0

        :

        Math.round(
            (taken / total) * 100
        );


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


    if(totalMedicine)
        totalMedicine.textContent =
            total;


    if(takenCount)
        takenCount.textContent =
            taken;


    if(missedCount)
        missedCount.textContent =
            missed;


    if(adherenceElement)
        adherenceElement.textContent =
            adherence + "%";


    // =================================================
    // REPORT
    // =================================================

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


    if(reportTotal)
        reportTotal.textContent =
            total;


    if(reportTaken)
        reportTaken.textContent =
            taken;


    if(reportMissed)
        reportMissed.textContent =
            missed;


    if(reportAdherence)
        reportAdherence.textContent =
            adherence + "%";


    const reportTable =
        document.getElementById(
            "reportTable"
        );


    if(!reportTable){

        return;

    }


    reportTable.innerHTML = "";


    medicines.forEach(
        function(med){

            reportTable.innerHTML +=

                `<tr>
                    <td>${med.name}</td>
                    <td>${med.dosage}</td>
                    <td>${med.time}</td>
                    <td>${translateStatus(med.status)}</td>
                </tr>`;

        }
    );

}


// =====================================================
// VOICE REMINDER
// =====================================================

function speakMedicineReminder(
    medicineName
){

    if(!("speechSynthesis" in window)){

        return;

    }


    const lang =
        getLanguage();


    let speechLanguage =
        "en-US";


    let message =
        `Time to take ${medicineName}`;


    if(lang === "ta"){

        speechLanguage =
            "ta-IN";

        message =
            `${medicineName} மருந்தை எடுத்துக்கொள்ளும் நேரம்`;

    }


    else if(lang === "hi"){

        speechLanguage =
            "hi-IN";

        message =
            `${medicineName} दवा लेने का समय हो गया है`;

    }


    else if(lang === "te"){

        speechLanguage =
            "te-IN";

        message =
            `${medicineName} మందు తీసుకునే సమయం వచ్చింది`;

    }


    try{

        speechSynthesis.cancel();


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


        // Try to select matching voice

        const voices =
            speechSynthesis.getVoices();


        const matchingVoice =
            voices.find(
                function(voice){

                    return voice.lang
                        .toLowerCase()
                        .startsWith(
                            speechLanguage
                                .split("-")[0]
                                .toLowerCase()
                        );

                }
            );


        if(matchingVoice){

            speech.voice =
                matchingVoice;

        }


        speechSynthesis.speak(
            speech
        );

    }
    catch(error){

        console.log(
            "Voice reminder error:",
            error
        );

    }

}


// =====================================================
// REMINDER CHECK
// =====================================================

function checkReminders(){

    const currentTime =
        new Date()
            .toTimeString()
            .substring(0,5);


    medicines.forEach(
        function(medicine,index){

            if(
                medicine.time === currentTime &&
                medicine.status === "Pending"
            ){

                triggerReminder(
                    medicine,
                    index
                );

            }

        }
    );

}


setInterval(
    checkReminders,
    1000
);


// =====================================================
// TRIGGER REMINDER
// =====================================================

function triggerReminder(
    medicine,
    index
){

    if(activeReminder === index){

        return;

    }


    activeReminder =
        index;


    // Start alarm

    playAlarm();


    // Speak immediately

    speakMedicineReminder(
        medicine.name
    );


    // Repeat voice every 5 seconds

    reminderLoop =
        setInterval(
            function(){

                if(
                    medicines[index] &&
                    medicines[index].status === "Pending"
                ){

                    speakMedicineReminder(
                        medicine.name
                    );

                }

            },
            5000
        );


    addLog(
        "Reminder started for " +
        medicine.name
    );


    const nextReminder =
        document.getElementById(
            "nextReminder"
        );


    if(nextReminder){

        nextReminder.textContent =
            `${medicine.name} (${medicine.time})`;

    }


    // =================================================
    // MISS AFTER 1 MINUTE
    // =================================================

    reminderTimeout =
        setTimeout(
            function(){

                clearInterval(
                    reminderLoop
                );


                reminderLoop =
                    null;


                stopAlarm();


                if(
                    window.speechSynthesis
                ){

                    speechSynthesis.cancel();

                }


                if(
                    medicines[index] &&
                    medicines[index].status === "Pending"
                ){

                    medicines[index].status =
                        "Missed";


                    savePatientMedicines();


                    addLog(
                        medicine.name +
                        " missed"
                    );


                    sendMissedSMS(
                        medicine
                    );


                    loadMedicines();

                    updateDashboard();

                }


                activeReminder =
                    null;


                reminderTimeout =
                    null;

            },
            60000
        );

}


// =====================================================
// MARK TAKEN
// =====================================================

function markTaken(index){

    if(!medicines[index]){

        return;

    }


    medicines[index].status =
        "Taken";


    savePatientMedicines();


    // Stop voice

    if(window.speechSynthesis){

        speechSynthesis.cancel();

    }


    // Stop alarm

    stopAlarm();


    // Stop reminder loop

    if(reminderLoop){

        clearInterval(
            reminderLoop
        );

        reminderLoop =
            null;

    }


    // Stop miss timer

    if(reminderTimeout){

        clearTimeout(
            reminderTimeout
        );

        reminderTimeout =
            null;

    }


    activeReminder =
        null;


    addLog(
        medicines[index].name +
        " taken"
    );


    loadMedicines();

    updateDashboard();

}


// =====================================================
// SMS MISSED MEDICINE
// =====================================================

function sendMissedSMS(
    medicine
){

    const caregiver =
        localStorage.getItem(
            "caregiver"
        );


    if(!caregiver){

        return;

    }


    const smsText =
        encodeURIComponent(

            `Medicine Missed Alert\n` +
            `Medicine: ${medicine.name}\n` +
            `Time: ${medicine.time}`

        );


    window.location.href =
        `sms:${caregiver}?body=${smsText}`;


    setTimeout(
        function(){

            const confirmCall =
                confirm(
                    "Call caregiver now?"
                );


            if(confirmCall){

                window.location.href =
                    `tel:${caregiver}`;

            }

        },
        4000
    );

}


// =====================================================
// LOG SYSTEM
// =====================================================

function addLog(message){

    let logs =
        loadPatientLogs();


    logs.unshift(

        new Date().toLocaleString() +
        " - " +
        message

    );


    savePatientLogs(
        logs
    );


    loadLogs();

}


function loadLogs(){

    const list =
        document.getElementById(
            "logList"
        );


    if(!list){

        return;

    }


    list.innerHTML = "";


    const logs =
        loadPatientLogs();


    logs.forEach(
        function(log){

            const li =
                document.createElement(
                    "li"
                );


            li.textContent =
                log;


            list.appendChild(
                li
            );

        }
    );

}


// =====================================================
// CALL AMBULANCE
// =====================================================

function callAmbulance(){

    addLog(
        "Calling ambulance"
    );


    window.location.href =
        "tel:108";

}


// =====================================================
// DARK MODE
// =====================================================

function toggleDarkMode(){

    document.body.classList.toggle(
        "dark-mode"
    );

}


// =====================================================
// LOGOUT
// =====================================================

function logout(){

    // Stop reminder

    if(reminderLoop){

        clearInterval(
            reminderLoop
        );

        reminderLoop =
            null;

    }


    if(reminderTimeout){

        clearTimeout(
            reminderTimeout
        );

        reminderTimeout =
            null;

    }


    stopAlarm();


    if(window.speechSynthesis){

        speechSynthesis.cancel();

    }


    activeReminder =
        null;


    localStorage.removeItem(
        "patientName"
    );


    location.reload();

}


// =====================================================
// CALL CAREGIVER
// =====================================================

function callCaregiver(){

    const caregiver =
        localStorage.getItem(
            "caregiver"
        );


    if(!caregiver){

        const lang =
            getLanguage();


        let message =
            "No caregiver number found.";


        if(lang === "ta"){

            message =
                "பராமரிப்பாளர் எண் இல்லை.";

        }
        else if(lang === "hi"){

            message =
                "देखभालकर्ता नंबर नहीं मिला।";

        }
        else if(lang === "te"){

            message =
                "సంరక్షకుడి నంబర్ కనుగొనబడలేదు.";

        }


        alert(message);

        return;

    }


    addLog(
        "Calling caregiver"
    );


    window.location.href =
        `tel:${caregiver}`;

}


// =====================================================
// DOWNLOAD REPORT
// =====================================================

function downloadReport(){

    const currentMedicines =
        medicines;


    if(
        !currentMedicines ||
        currentMedicines.length === 0
    ){

        alert(
            "No medicine data available!"
        );

        return;

    }


    if(!window.jspdf){

        alert(
            "PDF library is not loaded."
        );

        return;

    }


    const {
        jsPDF
    } =
        window.jspdf;


    const pdf =
        new jsPDF();


    const patient =
        localStorage.getItem(
            "patientName"
        ) || "Patient";


    const lang =
        getLanguage();


    const t =
        translations[lang];


    pdf.setFontSize(20);


    pdf.text(
        "MEDICARE AI",
        20,
        20
    );


    pdf.setFontSize(14);


    pdf.text(
        t.medicineReport,
        20,
        32
    );


    pdf.setFontSize(12);


    pdf.text(
        `${t.patientName}: ${patient}`,
        20,
        45
    );


    let y =
        65;


    pdf.text(
        t.medicine,
        20,
        y
    );


    pdf.text(
        t.dosage,
        75,
        y
    );


    pdf.text(
        t.time,
        120,
        y
    );


    pdf.text(
        t.status,
        160,
        y
    );


    y += 10;


    currentMedicines.forEach(
        function(med){

            pdf.text(
                med.name || "",
                20,
                y
            );


            pdf.text(
                med.dosage || "",
                75,
                y
            );


            pdf.text(
                med.time || "",
                120,
                y
            );


            pdf.text(
                translateStatus(
                    med.status
                ),
                160,
                y
            );


            y += 10;


            if(y > 280){

                pdf.addPage();

                y = 20;

            }

        }
    );


    pdf.text(
        "Generated by MEDICARE AI",
        20,
        y + 15
    );


    pdf.save(
        "MEDICARE_AI_Medicine_Report.pdf"
    );

}


// =====================================================
// SPEECH VOICES LOADED
// =====================================================

if(
    "speechSynthesis" in window
){

    speechSynthesis.onvoiceschanged =
        function(){

            // Voices are loaded by browser

        };

}
