// =====================================================
// MEDICARE AI - COMPLETE SCRIPT.JS
// Voice-only medicine reminder
// No buzzer / no alarm sound
// =====================================================

let medicines = [];
let activeReminder = null;
let reminderLoop = null;
let reminderTimeout = null;


// =====================================================
// TRANSLATIONS
// =====================================================

const translations = {

    en: {
        subtitle: "AI Powered Healthcare Assistant",
        aiMonitoring: "AI Monitoring Online",

        patientName: "Patient Name",
        age: "Age",
        phone: "Phone Number",
        caregiver: "Caregiver Number",
        language: "Language",

        patientNamePlaceholder: "Enter Patient Name",
        agePlaceholder: "Enter Age",

        login: "Login",
        loginSuccessful: "Login Successful",
        aiPreparing: "🤖 AI Healthcare Assistant is Preparing...",

        monitoring: "AI Healthcare Monitoring System",
        aiOnline: "AI Online",

        profile: "Patient Profile",
        nextReminder: "⏰ Next Reminder",
        noReminder: "No Reminder",

        totalMedicines: "Total Medicines",
        taken: "Taken",
        missed: "Missed",
        adherence: "Adherence",

        addMedicine: "Add Medicine",
        medicineName: "Medicine Name",
        dosage: "Dosage",
        reminderTime: "Reminder Time",

        medicinePlaceholder: "Enter Medicine Name",
        dosagePlaceholder: "Example: 1 Tablet",

        todaysMedicines: "Today's Medicines",

        callCaregiver: "📞 Call Caregiver",
        ambulance: "🚑 Ambulance",

        aiAssistant: "🤖 AI Health Assistant",

        healthMessage:
            "Welcome!\n\nYour health is being monitored.\n\nRemember to take your medicines on time.",

        medicineReport: "📋 Medicine Report",

        total: "Total",
        medicine: "Medicine",
        time: "Time",
        status: "Status",

        downloadReport: "Download Report",

        activityLogs: "Activity Logs",

        darkMode: "Dark Mode",
        logout: "Logout",

        pending: "Pending",
        takenStatus: "Taken",
        missedStatus: "Missed",

        welcome: "Welcome"
    },


    ta: {
        subtitle: "AI மூலம் இயங்கும் சுகாதார உதவியாளர்",
        aiMonitoring: "AI கண்காணிப்பு ஆன்லைனில் உள்ளது",

        patientName: "நோயாளியின் பெயர்",
        age: "வயது",
        phone: "தொலைபேசி எண்",
        caregiver: "பராமரிப்பாளர் எண்",
        language: "மொழி",

        patientNamePlaceholder: "நோயாளியின் பெயரை உள்ளிடவும்",
        agePlaceholder: "வயதை உள்ளிடவும்",

        login: "உள்நுழைய",
        loginSuccessful: "உள்நுழைவு வெற்றிகரமாக முடிந்தது",
        aiPreparing: "🤖 AI சுகாதார உதவியாளர் தயாராகிறது...",

        monitoring: "AI சுகாதார கண்காணிப்பு அமைப்பு",
        aiOnline: "AI ஆன்லைனில் உள்ளது",

        profile: "நோயாளியின் விவரம்",
        nextReminder: "⏰ அடுத்த நினைவூட்டல்",
        noReminder: "நினைவூட்டல் இல்லை",

        totalMedicines: "மொத்த மருந்துகள்",
        taken: "எடுத்தது",
        missed: "தவறியது",
        adherence: "மருந்து பின்பற்றல்",

        addMedicine: "மருந்து சேர்க்கவும்",
        medicineName: "மருந்தின் பெயர்",
        dosage: "மருந்தின் அளவு",
        reminderTime: "நினைவூட்டும் நேரம்",

        medicinePlaceholder: "மருந்தின் பெயரை உள்ளிடவும்",
        dosagePlaceholder: "உதாரணம்: 1 மாத்திரை",

        todaysMedicines: "இன்றைய மருந்துகள்",

        callCaregiver: "📞 பராமரிப்பாளரை அழைக்கவும்",
        ambulance: "🚑 ஆம்புலன்ஸ்",

        aiAssistant: "🤖 AI சுகாதார உதவியாளர்",

        healthMessage:
            "வரவேற்கிறோம்!\n\nஉங்கள் உடல்நிலை கண்காணிக்கப்படுகிறது.\n\nஉங்கள் மருந்துகளை சரியான நேரத்தில் எடுத்துக்கொள்ளுங்கள்.",

        medicineReport: "📋 மருந்து அறிக்கை",

        total: "மொத்தம்",
        medicine: "மருந்து",
        time: "நேரம்",
        status: "நிலை",

        downloadReport: "அறிக்கையை பதிவிறக்கவும்",

        activityLogs: "செயல்பாட்டு பதிவுகள்",

        darkMode: "இருண்ட பயன்முறை",
        logout: "வெளியேறு",

        pending: "நிலுவையில்",
        takenStatus: "எடுத்தது",
        missedStatus: "தவறியது",

        welcome: "வரவேற்கிறோம்"
    },


    hi: {
        subtitle: "AI संचालित स्वास्थ्य सहायक",
        aiMonitoring: "AI निगरानी ऑनलाइन",

        patientName: "मरीज़ का नाम",
        age: "आयु",
        phone: "फ़ोन नंबर",
        caregiver: "देखभालकर्ता नंबर",
        language: "भाषा",

        patientNamePlaceholder: "मरीज़ का नाम दर्ज करें",
        agePlaceholder: "आयु दर्ज करें",

        login: "लॉगिन",
        loginSuccessful: "लॉगिन सफल हुआ",
        aiPreparing: "🤖 AI स्वास्थ्य सहायक तैयार हो रहा है...",

        monitoring: "AI स्वास्थ्य निगरानी प्रणाली",
        aiOnline: "AI ऑनलाइन",

        profile: "मरीज़ की जानकारी",
        nextReminder: "⏰ अगली याद दिलाने की सूचना",
        noReminder: "कोई रिमाइंडर नहीं",

        totalMedicines: "कुल दवाइयाँ",
        taken: "ली गई",
        missed: "छूटी",
        adherence: "दवा पालन",

        addMedicine: "दवा जोड़ें",
        medicineName: "दवा का नाम",
        dosage: "खुराक",
        reminderTime: "याद दिलाने का समय",

        medicinePlaceholder: "दवा का नाम दर्ज करें",
        dosagePlaceholder: "उदाहरण: 1 टैबलेट",

        todaysMedicines: "आज की दवाइयाँ",

        callCaregiver: "📞 देखभालकर्ता को कॉल करें",
        ambulance: "🚑 एम्बुलेंस",

        aiAssistant: "🤖 AI स्वास्थ्य सहायक",

        healthMessage:
            "स्वागत है!\n\nआपके स्वास्थ्य की निगरानी की जा रही है।\n\nअपनी दवाइयाँ समय पर लें।",

        medicineReport: "📋 दवा रिपोर्ट",

        total: "कुल",
        medicine: "दवा",
        time: "समय",
        status: "स्थिति",

        downloadReport: "रिपोर्ट डाउनलोड करें",

        activityLogs: "गतिविधि लॉग",

        darkMode: "डार्क मोड",
        logout: "लॉगआउट",

        pending: "लंबित",
        takenStatus: "ली गई",
        missedStatus: "छूटी",

        welcome: "स्वागत है"
    },


    te: {
        subtitle: "AI ఆధారిత ఆరోగ్య సహాయకుడు",
        aiMonitoring: "AI పర్యవేక్షణ ఆన్‌లైన్‌లో ఉంది",

        patientName: "రోగి పేరు",
        age: "వయస్సు",
        phone: "ఫోన్ నంబర్",
        caregiver: "సంరక్షకుడి నంబర్",
        language: "భాష",

        patientNamePlaceholder: "రోగి పేరును నమోదు చేయండి",
        agePlaceholder: "వయస్సును నమోదు చేయండి",

        login: "లాగిన్",
        loginSuccessful: "లాగిన్ విజయవంతమైంది",
        aiPreparing: "🤖 AI ఆరోగ్య సహాయకుడు సిద్ధమవుతోంది...",

        monitoring: "AI ఆరోగ్య పర్యవేక్షణ వ్యవస్థ",
        aiOnline: "AI ఆన్‌లైన్‌లో ఉంది",

        profile: "రోగి వివరాలు",
        nextReminder: "⏰ తదుపరి రిమైండర్",
        noReminder: "రిమైండర్ లేదు",

        totalMedicines: "మొత్తం మందులు",
        taken: "తీసుకున్నవి",
        missed: "మిస్ అయినవి",
        adherence: "మందుల అనుసరణ",

        addMedicine: "మందును జోడించండి",
        medicineName: "మందు పేరు",
        dosage: "మోతాదు",
        reminderTime: "రిమైండర్ సమయం",

        medicinePlaceholder: "మందు పేరును నమోదు చేయండి",
        dosagePlaceholder: "ఉదాహరణ: 1 టాబ్లెట్",

        todaysMedicines: "ఈరోజు మందులు",

        callCaregiver: "📞 సంరక్షకుడికి కాల్ చేయండి",
        ambulance: "🚑 అంబులెన్స్",

        aiAssistant: "🤖 AI ఆరోగ్య సహాయకుడు",

        healthMessage:
            "స్వాగతం!\n\nమీ ఆరోగ్యం పర్యవేక్షించబడుతోంది.\n\nమీ మందులను సమయానికి తీసుకోండి.",

        medicineReport: "📋 మందుల నివేదిక",

        total: "మొత్తం",
        medicine: "మందు",
        time: "సమయం",
        status: "స్థితి",

        downloadReport: "నివేదికను డౌన్‌లోడ్ చేయండి",

        activityLogs: "కార్యాచరణ లాగ్‌లు",

        darkMode: "డార్క్ మోడ్",
        logout: "లాగ్ అవుట్",

        pending: "పెండింగ్",
        takenStatus: "తీసుకున్నవి",
        missedStatus: "మిస్ అయినవి",

        welcome: "స్వాగతం"
    }

};


// =====================================================
// GET CURRENT LANGUAGE
// =====================================================

function getLanguage(){

    return localStorage.getItem(
        "selectedLanguage"
    ) || "en";

}


// =====================================================
// APPLY LANGUAGE TO WEBSITE
// =====================================================

function applyLanguage(lang){

    if(!translations[lang]){
        lang = "en";
    }

    const t = translations[lang];

    localStorage.setItem(
        "selectedLanguage",
        lang
    );

    document.documentElement.lang = lang;


    // -------------------------------------------------
    // LOGIN PAGE
    // -------------------------------------------------

    const loginSection =
        document.getElementById("loginSection");

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

        labels.forEach(function(label, index){

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
                    " " + labelTexts[index]
                )
            );

        });


        const subtitle =
            loginSection.querySelector(".subtitle");

        if(subtitle){
            subtitle.textContent =
                t.subtitle;
        }


        const aiStatus =
            loginSection.querySelector(".ai-status");

        if(aiStatus){

            const dot =
                aiStatus.querySelector(".dot");

            aiStatus.innerHTML = "";

            if(dot){
                aiStatus.appendChild(dot);
            }

            aiStatus.appendChild(
                document.createTextNode(
                    " " + t.aiMonitoring
                )
            );

        }


        const loginButton =
            loginSection.querySelector(
                ".login-btn"
            );

        if(loginButton){

            const icon =
                loginButton.querySelector("i");

            loginButton.innerHTML = "";

            if(icon){
                loginButton.appendChild(icon);
            }

            loginButton.appendChild(
                document.createTextNode(
                    " " + t.login
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


    // -------------------------------------------------
    // WELCOME SCREEN
    // -------------------------------------------------

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


    // -------------------------------------------------
    // DASHBOARD
    // -------------------------------------------------

    const dashboardSubtitle =
        document.querySelector(
            "#dashboardSection .dashboard-header .subtitle"
        );

    if(dashboardSubtitle){
        dashboardSubtitle.textContent =
            t.monitoring;
    }


    const online =
        document.querySelector(".status-online");

    if(online){

        const dot =
            online.querySelector(".online-dot");

        online.innerHTML = "";

        if(dot){
            online.appendChild(dot);
        }

        online.appendChild(
            document.createTextNode(
                " " + t.aiOnline
            )
        );

    }


    // -------------------------------------------------
    // PROFILE
    // -------------------------------------------------

    const profileTitle =
        document.querySelector(
            ".profile-card h3"
        );

    if(profileTitle){
        profileTitle.textContent =
            t.profile;
    }


    // -------------------------------------------------
    // NEXT REMINDER
    // -------------------------------------------------

    const reminderTitle =
        document.querySelector(
            ".next-reminder-card h2"
        );

    if(reminderTitle){
        reminderTitle.textContent =
            t.nextReminder;
    }


    if(!activeReminder){

        const nextReminder =
            document.getElementById(
                "nextReminder"
            );

        if(nextReminder){
            nextReminder.textContent =
                t.noReminder;
        }

    }


    // -------------------------------------------------
    // DASHBOARD STAT CARDS
    // -------------------------------------------------

    const dashboardCards =
        document.querySelectorAll(
            "#dashboardSection .dashboard-card"
        );

    const cardTexts = [
        t.totalMedicines,
        t.taken,
        t.missed,
        t.adherence
    ];

    let cardIndex = 0;

    dashboardCards.forEach(function(card){

        if(
            card.closest(".report-card")
        ){
            return;
        }

        const heading =
            card.querySelector("h3");

        if(!heading){
            return;
        }

        if(cardIndex < cardTexts.length){

            heading.textContent =
                cardTexts[cardIndex];

            cardIndex++;
        }

    });


    // -------------------------------------------------
    // SECTION TITLES
    // -------------------------------------------------

    const sectionTitles =
        document.querySelectorAll(
            "#dashboardSection .section-title"
        );

    if(sectionTitles[0]){
        sectionTitles[0].innerHTML =
            "💊 " + t.addMedicine;
    }

    if(sectionTitles[1]){
        sectionTitles[1].textContent =
            t.todaysMedicines;
    }


    // -------------------------------------------------
    // MEDICINE INPUTS
    // -------------------------------------------------

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
        function(group, index){

            if(index >= 3){
                return;
            }

            const label =
                group.querySelector("label");

            if(label){
                label.textContent =
                    medicineLabels[index];
            }

        }
    );


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


    // -------------------------------------------------
    // ADD MEDICINE BUTTON
    // -------------------------------------------------

    const addButton =
        document.querySelector(
            '[onclick="addMedicine()"]'
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
                " " + t.addMedicine
            )
        );

    }


    // -------------------------------------------------
    // CAREGIVER / AMBULANCE
    // -------------------------------------------------

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


    // -------------------------------------------------
    // AI ASSISTANT
    // -------------------------------------------------

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


    // -------------------------------------------------
    // REPORT
    // -------------------------------------------------

    const reportTitle =
        document.querySelector(
            ".report-card h2"
        );

    if(reportTitle){
        reportTitle.textContent =
            t.medicineReport;
    }


    const reportHeaders =
        document.querySelectorAll(
            ".report-table th"
        );

    if(reportHeaders[0])
        reportHeaders[0].textContent =
            t.medicine;

    if(reportHeaders[1])
        reportHeaders[1].textContent =
            t.dosage;

    if(reportHeaders[2])
        reportHeaders[2].textContent =
            t.time;

    if(reportHeaders[3])
        reportHeaders[3].textContent =
            t.status;


    const downloadButton =
        document.querySelector(
            '[onclick="downloadReport()"]'
        );

    if(downloadButton){

        const icon =
            downloadButton.querySelector("i");

        downloadButton.innerHTML = "";

        if(icon){
            downloadButton.appendChild(icon);
        }

        downloadButton.appendChild(
            document.createTextNode(
                " " + t.downloadReport
            )
        );

    }


    // -------------------------------------------------
    // LOGS
    // -------------------------------------------------

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
                " " + t.activityLogs
            )
        );

    }


    // -------------------------------------------------
    // SETTINGS
    // -------------------------------------------------

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
                " " + t.darkMode
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
                " " + t.logout
            )
        );

    }


    // Refresh dynamic content

    if(
        typeof loadProfile === "function"
    ){
        loadProfile();
    }

    if(
        typeof loadMedicines === "function"
    ){
        loadMedicines();
    }

    if(
        typeof updateDashboard === "function"
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

        const messages = {

            en: "Please fill all fields.",

            ta: "அனைத்து விவரங்களையும் நிரப்பவும்.",

            hi: "कृपया सभी जानकारी भरें।",

            te: "దయచేసి అన్ని వివరాలను నమోదు చేయండి."

        };

        alert(
            messages[language] ||
            messages.en
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


    const t =
        translations[language];


    document.getElementById(
        "welcomeUser"
    ).textContent =
        `${t.welcome}, ${name}!`;


    applyLanguage(
        language
    );


    setTimeout(function(){

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


        applyLanguage(
            language
        );


        loadProfile();
        loadMedicines();
        loadLogs();
        updateDashboard();

    }, 3000);

}


// =====================================================
// AUTO LOGIN
// =====================================================

window.onload = function(){

    updateClock();


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


        languageSelector.onchange =
            function(){

                applyLanguage(
                    this.value
                );

            };

    }


    applyLanguage(
        savedLanguage
    );


    const patient =
        localStorage.getItem(
            "patientName"
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


        setTimeout(function(){

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

        }, 3000);

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


    profile.innerHTML =
        `${t.patientName}: ${name}<br>
         ${t.age}: ${age}<br>
         ${t.phone}: ${phone}`;

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

        const messages = {

            en: "Please fill all medicine details.",

            ta: "அனைத்து மருந்து விவரங்களையும் நிரப்பவும்.",

            hi: "सभी दवा विवरण भरें।",

            te: "అన్ని మందుల వివరాలను నమోదు చేయండి."

        };

        alert(
            messages[lang] ||
            messages.en
        );

        return;

    }


    medicines.push({

        name: name,

        dosage: dosage,

        time: time,

        status: "Pending"

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

    const t =
        translations[
            getLanguage()
        ];


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


    const t =
        translations[
            getLanguage()
        ];


    medicines.forEach(
        function(med, index){

            const li =
                document.createElement(
                    "li"
                );


            const medicineName =
                document.createElement(
                    "b"
                );

            medicineName.textContent =
                med.name;


            li.appendChild(
                medicineName
            );


            li.appendChild(
                document.createElement(
                    "br"
                )
            );


            li.appendChild(
                document.createTextNode(
                    `${t.dosage}: ${med.dosage}`
                )
            );


            li.appendChild(
                document.createElement(
                    "br"
                )
            );


            li.appendChild(
                document.createTextNode(
                    `${t.time}: ${med.time}`
                )
            );


            li.appendChild(
                document.createElement(
                    "br"
                )
            );


            li.appendChild(
                document.createTextNode(
                    `${t.status}: ${translateStatus(med.status)}`
                )
            );


            li.appendChild(
                document.createElement(
                    "br"
                )
            );


            li.appendChild(
                document.createElement(
                    "br"
                )
            );


            if(
                med.status === "Pending"
            ){

                const button =
                    document.createElement(
                        "button"
                    );

                button.textContent =
                    t.taken;


                button.onclick =
                    function(){

                        markTaken(index);

                    };


                li.appendChild(
                    button
                );

            }


            list.appendChild(
                li
            );

        }
    );


    updateDashboard();

}


// =====================================================
// UPDATE DASHBOARD
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
            ? 0
            : Math.round(
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


    if(totalMedicine){
        totalMedicine.textContent =
            total;
    }

    if(takenCount){
        takenCount.textContent =
            taken;
    }

    if(missedCount){
        missedCount.textContent =
            missed;
    }

    if(adherenceElement){
        adherenceElement.textContent =
            adherence + "%";
    }


    // -------------------------------------------------
    // REPORT
    // -------------------------------------------------

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

            const row =
                document.createElement(
                    "tr"
                );


            const medicineCell =
                document.createElement(
                    "td"
                );

            medicineCell.textContent =
                med.name;


            const dosageCell =
                document.createElement(
                    "td"
                );

            dosageCell.textContent =
                med.dosage;


            const timeCell =
                document.createElement(
                    "td"
                );

            timeCell.textContent =
                med.time;


            const statusCell =
                document.createElement(
                    "td"
                );

            statusCell.textContent =
                translateStatus(
                    med.status
                );


            row.appendChild(
                medicineCell
            );

            row.appendChild(
                dosageCell
            );

            row.appendChild(
                timeCell
            );

            row.appendChild(
                statusCell
            );


            reportTable.appendChild(
                row
            );

        }
    );

}


// =====================================================
// VOICE-ONLY MEDICINE REMINDER
// =====================================================

function speakMedicineReminder(
    medicineName
){

    if(
        !("speechSynthesis" in window)
    ){

        alert(
            "Voice reminder is not supported in this browser."
        );

        return;

    }


    const lang =
        getLanguage();


    let message =
        "";

    let speechLanguage =
        "en-US";


    // -------------------------------------------------
    // ENGLISH
    // -------------------------------------------------

    if(lang === "en"){

        message =
            "Time to take " +
            medicineName;

        speechLanguage =
            "en-US";

    }


    // -------------------------------------------------
    // TAMIL
    // -------------------------------------------------

    else if(lang === "ta"){

        message =
            medicineName +
            " மருந்தை எடுத்துக்கொள்ளும் நேரம்";

        speechLanguage =
            "ta-IN";

    }


    // -------------------------------------------------
    // HINDI
    // -------------------------------------------------

    else if(lang === "hi"){

        message =
            medicineName +
            " दवा लेने का समय हो गया है";

        speechLanguage =
            "hi-IN";

    }


    // -------------------------------------------------
    // TELUGU
    // -------------------------------------------------

    else if(lang === "te"){

        message =
            medicineName +
            " మందు తీసుకునే సమయం వచ్చింది";

        speechLanguage =
            "te-IN";

    }


    // Stop previous speech

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


    // -------------------------------------------------
    // FIND REGIONAL VOICE
    // -------------------------------------------------

    const voices =
        speechSynthesis.getVoices();


    const languageCode =
        speechLanguage
            .split("-")[0]
            .toLowerCase();


    const regionalVoice =
        voices.find(
            function(voice){

                return voice.lang
                    .toLowerCase()
                    .startsWith(
                        languageCode
                    );

            }
        );


    if(regionalVoice){

        speech.voice =
            regionalVoice;

    }


    speechSynthesis.speak(
        speech
    );

}


// =====================================================
// CHECK REMINDERS EVERY SECOND
// =====================================================

function checkReminders(){

    const now =
        new Date();


    const currentTime =
        now.toTimeString()
            .substring(0, 5);


    medicines.forEach(
        function(medicine, index){

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
// TRIGGER VOICE REMINDER
// =====================================================

function triggerReminder(
    medicine,
    index
){

    if(
        activeReminder === index
    ){

        return;

    }


    activeReminder =
        index;


    // -------------------------------------------------
    // VOICE ONLY
    // NO BUZZER
    // NO ALARM SOUND
    // -------------------------------------------------

    speakMedicineReminder(
        medicine.name
    );


    // -------------------------------------------------
    // REPEAT VOICE EVERY 5 SECONDS
    // -------------------------------------------------

    reminderLoop =
        setInterval(
            function(){

                if(
                    medicines[index] &&
                    medicines[index].status ===
                    "Pending"
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


    // -------------------------------------------------
    // DISPLAY NEXT REMINDER
    // -------------------------------------------------

    const nextReminder =
        document.getElementById(
            "nextReminder"
        );


    if(nextReminder){

        nextReminder.textContent =
            medicine.name +
            " (" +
            medicine.time +
            ")";

    }


    // -------------------------------------------------
    // AFTER 1 MINUTE → MISSED
    // -------------------------------------------------

    reminderTimeout =
        setTimeout(
            function(){

                if(reminderLoop){

                    clearInterval(
                        reminderLoop
                    );

                    reminderLoop =
                        null;

                }


                // Stop voice

                speechSynthesis.cancel();


                if(
                    medicines[index] &&
                    medicines[index].status ===
                    "Pending"
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
// MARK MEDICINE AS TAKEN
// =====================================================

function markTaken(index){

    if(!medicines[index]){
        return;
    }


    medicines[index].status =
        "Taken";


    savePatientMedicines();


    // Stop voice

    if(
        "speechSynthesis" in window
    ){

        speechSynthesis.cancel();

    }


    // Stop repeat

    if(reminderLoop){

        clearInterval(
            reminderLoop
        );

        reminderLoop =
            null;

    }


    // Cancel missed timer

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
// MISSED MEDICINE SMS
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

            "Medicine Missed Alert\n" +
            "Medicine: " +
            medicine.name +
            "\nTime: " +
            medicine.time

        );


    window.location.href =
        "sms:" +
        caregiver +
        "?body=" +
        smsText;


    setTimeout(
        function(){

            const call =
                confirm(
                    "Call caregiver now?"
                );


            if(call){

                window.location.href =
                    "tel:" +
                    caregiver;

            }

        },
        4000
    );

}


// =====================================================
// ACTIVITY LOG
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


        const messages = {

            en: "No caregiver number found.",

            ta: "பராமரிப்பாளர் எண் இல்லை.",

            hi: "देखभालकर्ता नंबर नहीं मिला।",

            te: "సంరక్షకుడి నంబర్ కనుగొనబడలేదు."

        };


        alert(
            messages[lang] ||
            messages.en
        );

        return;

    }


    addLog(
        "Calling caregiver"
    );


    window.location.href =
        "tel:" +
        caregiver;

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


    // Stop missed timer

    if(reminderTimeout){

        clearTimeout(
            reminderTimeout
        );

        reminderTimeout =
            null;

    }


    // Stop voice

    if(
        "speechSynthesis" in window
    ){

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
// DOWNLOAD PDF REPORT
// =====================================================

function downloadReport(){

    if(
        medicines.length === 0
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


    let y = 65;


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


    medicines.forEach(
        function(med){

            pdf.text(
                String(med.name),
                20,
                y
            );


            pdf.text(
                String(med.dosage),
                75,
                y
            );


            pdf.text(
                String(med.time),
                120,
                y
            );


            pdf.text(
                String(
                    translateStatus(
                        med.status
                    )
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
