let medicines = [];

let activeReminder = null;
let reminderLoop;


// =====================================================
// LANGUAGE SYSTEM
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

    return localStorage.getItem("selectedLanguage") || "en";

}


// =====================================================
// TRANSLATE PAGE
// =====================================================

function applyLanguage(lang){

    if(!translations[lang]){
        lang = "en";
    }

    const t = translations[lang];

    localStorage.setItem("selectedLanguage", lang);

    document.documentElement.lang = lang;


    // ---------------- LOGIN PAGE ----------------

    const loginContent =
        document.querySelector("#loginSection .content");

    if(loginContent){

        const labels =
            loginContent.querySelectorAll(".input-group label");

        if(labels[0])
            labels[0].childNodes[labels[0].childNodes.length - 1].textContent =
                " " + t.patientName;

        if(labels[1])
            labels[1].childNodes[labels[1].childNodes.length - 1].textContent =
                " " + t.age;

        if(labels[2])
            labels[2].childNodes[labels[2].childNodes.length - 1].textContent =
                " " + t.phone;

        if(labels[3])
            labels[3].childNodes[labels[3].childNodes.length - 1].textContent =
                " " + t.caregiver;

        if(labels[4])
            labels[4].childNodes[labels[4].childNodes.length - 1].textContent =
                " " + t.language;
    }


    // Login subtitle
    const subtitle =
        document.querySelector("#loginSection .subtitle");

    if(subtitle)
        subtitle.textContent = t.subtitle;


    // AI monitoring
    const aiStatus =
        document.querySelector("#loginSection .ai-status");

    if(aiStatus){

        const dot = aiStatus.querySelector(".dot");

        aiStatus.textContent = "";

        if(dot)
            aiStatus.appendChild(dot);

        aiStatus.appendChild(
            document.createTextNode(" " + t.aiMonitoring)
        );
    }


    // Login button
    const loginButton =
        document.querySelector("#loginSection .login-btn");

    if(loginButton){

        const icon = loginButton.querySelector("i");

        loginButton.textContent = "";

        if(icon)
            loginButton.appendChild(icon);

        loginButton.appendChild(
            document.createTextNode(" " + t.login)
        );
    }


    // Placeholders
    const patientName =
        document.getElementById("patientName");

    if(patientName)
        patientName.placeholder = t.patientNamePlaceholder;


    const patientAge =
        document.getElementById("patientAge");

    if(patientAge)
        patientAge.placeholder = t.agePlaceholder;


    // ---------------- WELCOME PAGE ----------------

    const welcomeParagraphs =
        document.querySelectorAll("#welcomeSection .welcome-card p");

    if(welcomeParagraphs[0])
        welcomeParagraphs[0].textContent = t.loginSuccessful;

    if(welcomeParagraphs[1])
        welcomeParagraphs[1].textContent = t.aiPreparing;


    // ---------------- DASHBOARD ----------------

    const dashboardSubtitle =
        document.querySelector("#dashboardSection .dashboard-header .subtitle");

    if(dashboardSubtitle)
        dashboardSubtitle.textContent = t.monitoring;


    const online =
        document.querySelector(".status-online");

    if(online){

        const dot = online.querySelector(".online-dot");

        online.textContent = "";

        if(dot)
            online.appendChild(dot);

        online.appendChild(
            document.createTextNode(" " + t.aiOnline)
        );
    }


    // Patient profile
    const profileTitle =
        document.querySelector(".profile-card h3");

    if(profileTitle)
        profileTitle.textContent = t.profile;


    // Next reminder
    const reminderTitle =
        document.querySelector(".next-reminder-card h2");

    if(reminderTitle)
        reminderTitle.textContent = t.nextReminder;


    // Dashboard statistics
    const statTitles =
        document.querySelectorAll(".dashboard-card h3");

    statTitles.forEach((element) => {

        const text = element.textContent.trim();

        if(text.includes("Total Medicines"))
            element.textContent = t.totalMedicines;

        else if(text === "Taken")
            element.textContent = t.taken;

        else if(text === "Missed")
            element.textContent = t.missed;

        else if(text === "Adherence")
            element.textContent = t.adherence;
    });


    // Add medicine section
    const sectionTitles =
        document.querySelectorAll(".section-title");

    sectionTitles.forEach((element) => {

        if(element.textContent.includes("Add Medicine"))
            element.innerHTML = "💊 " + t.addMedicine;

        else if(element.textContent.includes("Today's Medicines"))
            element.textContent = t.todaysMedicines;
    });


    // Medicine inputs
    const medicineInputs =
        document.querySelectorAll("#medicineName, #dosage");

    if(medicineInputs[0])
        medicineInputs[0].placeholder = t.medicinePlaceholder;

    if(medicineInputs[1])
        medicineInputs[1].placeholder = t.dosagePlaceholder;


    // Medicine labels
    const medicineContainer =
        document.querySelector(".medicine-container");

    // Add medicine button
    const addButton =
        document.querySelector(".btn.primary");

    if(addButton){

        // Only change the first primary button
        if(addButton.getAttribute("onclick") === "addMedicine()"){

            const icon = addButton.querySelector("i");

            addButton.textContent = "";

            if(icon)
                addButton.appendChild(icon);

            addButton.appendChild(
                document.createTextNode(" " + t.addMedicine)
            );
        }
    }


    // Quick action buttons
    const caregiverButton =
        document.querySelector(".btn.caregiver");

    if(caregiverButton){

        caregiverButton.textContent = t.callCaregiver;
    }


    const ambulanceButton =
        document.querySelector(".btn.ambulance");

    if(ambulanceButton){

        ambulanceButton.textContent = t.ambulance;
    }


    // AI assistant
    const assistantTitle =
        document.querySelector(".ai-assistant h2");

    if(assistantTitle)
        assistantTitle.textContent = t.aiAssistant;


    const healthMessage =
        document.getElementById("healthMessage");

    if(healthMessage)
        healthMessage.innerText = t.healthMessage;


    // ---------------- REPORT ----------------

    const reportTitle =
        document.querySelector(".report-card h2");

    if(reportTitle)
        reportTitle.textContent = t.medicineReport;


    const reportCards =
        document.querySelectorAll(".report-card .dashboard-card p");

    if(reportCards[0])
        reportCards[0].textContent = t.total;

    if(reportCards[1])
        reportCards[1].textContent = t.taken;

    if(reportCards[2])
        reportCards[2].textContent = t.missed;

    if(reportCards[3])
        reportCards[3].textContent = t.adherence;


    // Report table headings
    const headers =
        document.querySelectorAll(".report-table th");

    if(headers[0])
        headers[0].textContent = t.medicine;

    if(headers[1])
        headers[1].textContent = t.dosage;

    if(headers[2])
        headers[2].textContent = t.time;

    if(headers[3])
        headers[3].textContent = t.status;


    // Download button
    const downloadButton =
        document.querySelector(
            '.report-card button[onclick="downloadReport()"]'
        );

    if(downloadButton){

        const icon = downloadButton.querySelector("i");

        downloadButton.textContent = "";

        if(icon)
            downloadButton.appendChild(icon);

        downloadButton.appendChild(
            document.createTextNode(" " + t.downloadReport)
        );
    }


    // Activity logs
    const logsTitle =
        document.querySelector(".logs h2");

    if(logsTitle){

        const icon = logsTitle.querySelector("i");

        logsTitle.textContent = "";

        if(icon)
            logsTitle.appendChild(icon);

        logsTitle.appendChild(
            document.createTextNode(" " + t.activityLogs)
        );
    }


    // Settings buttons
    const darkButton =
        document.querySelector(".dark-btn");

    if(darkButton){

        const icon = darkButton.querySelector("i");

        darkButton.textContent = "";

        if(icon)
            darkButton.appendChild(icon);

        darkButton.appendChild(
            document.createTextNode(" " + t.darkMode)
        );
    }


    const logoutButton =
        document.querySelector(".logout-btn");

    if(logoutButton){

        const icon = logoutButton.querySelector("i");

        logoutButton.textContent = "";

        if(icon)
            logoutButton.appendChild(icon);

        logoutButton.appendChild(
            document.createTextNode(" " + t.logout)
        );
    }


    // Reload medicine list so statuses/buttons use language
    if(typeof loadMedicines === "function"){
        loadMedicines();
    }

}


// =====================================================
// PATIENT STORAGE
// =====================================================

function getPatientKey(){

    return localStorage.getItem("patientPhone");

}


function loadPatientMedicines(){

    const key =
        "medicines_" + getPatientKey();

    medicines =
        JSON.parse(localStorage.getItem(key)) || [];

}


function savePatientMedicines(){

    const key =
        "medicines_" + getPatientKey();

    localStorage.setItem(
        key,
        JSON.stringify(medicines)
    );

}


function loadPatientLogs(){

    const key =
        "logs_" + getPatientKey();

    return JSON.parse(
        localStorage.getItem(key)
    ) || [];

}


function savePatientLogs(logs){

    const key =
        "logs_" + getPatientKey();

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
        document.getElementById("clock");

    if(clock){

        clock.innerHTML =
            new Date().toLocaleTimeString();

    }

}

setInterval(updateClock,1000);


// =====================================================
// LOGIN
// =====================================================

function loginPatient(){

    const name =
        document.getElementById("patientName").value.trim();

    const age =
        document.getElementById("patientAge").value.trim();

    const phone =
        document.getElementById("patientPhone").value.trim();

    const caregiver =
        document.getElementById("caregiverLogin").value.trim();

    const language =
        document.getElementById("language").value;


    if(!name || !age || !phone || !caregiver){

        alert(
            getLanguage() === "ta"
            ? "அனைத்து விவரங்களையும் நிரப்பவும்"
            : getLanguage() === "hi"
            ? "कृपया सभी जानकारी भरें"
            : getLanguage() === "te"
            ? "దయచేసి అన్ని వివరాలను నమోదు చేయండి"
            : "Please fill all fields"
        );

        return;
    }


    localStorage.setItem("patientName",name);
    localStorage.setItem("patientAge",age);
    localStorage.setItem("patientPhone",phone);
    localStorage.setItem("caregiver",caregiver);

    localStorage.setItem(
        "selectedLanguage",
        language
    );


    loadPatientMedicines();


    document.getElementById("loginSection").style.display = "none";

    document.getElementById("welcomeSection").style.display = "flex";


    document.getElementById("welcomeUser").innerHTML =
        `Welcome, ${name}!`;


    applyLanguage(language);


    setTimeout(() => {

        document.getElementById("welcomeSection").style.display = "none";

        document.getElementById("dashboardSection").style.display = "block";

        document.getElementById("welcomeText").innerHTML =
            `👋 Hi, ${name}!`;

        loadProfile();
        loadMedicines();
        loadLogs();
        updateDashboard();

    },3000);

}


// =====================================================
// AUTO LOGIN
// =====================================================

window.onload = function(){

    updateClock();


    const patient =
        localStorage.getItem("patientName");


    const savedLanguage =
        localStorage.getItem("selectedLanguage") || "en";


    const languageSelector =
        document.getElementById("language");


    if(languageSelector){

        languageSelector.value =
            savedLanguage;

        languageSelector.onchange = function(){

            applyLanguage(this.value);

        };

    }


    applyLanguage(savedLanguage);


    if(patient){

        loadPatientMedicines();


        document.getElementById("loginSection").style.display = "none";

        document.getElementById("welcomeSection").style.display = "flex";


        document.getElementById("welcomeUser").innerHTML =
            `Welcome, ${patient}!`;


        setTimeout(() => {

            document.getElementById("welcomeSection").style.display = "none";

            document.getElementById("dashboardSection").style.display = "block";

            document.getElementById("welcomeText").innerHTML =
                `👋 Hi, ${patient}!`;

            loadProfile();
            loadMedicines();
            loadLogs();
            updateDashboard();

        },3000);

    }

};


// =====================================================
// PROFILE
// =====================================================

function loadProfile(){

    const profile =
        document.getElementById("patientProfile");

    if(!profile) return;


    const lang = getLanguage();

    const t = translations[lang];


    profile.innerHTML =
        `${t.patientName}: ${localStorage.getItem("patientName")}<br>
         ${t.age}: ${localStorage.getItem("patientAge")}<br>
         ${t.phone}: ${localStorage.getItem("patientPhone")}`;

}


// =====================================================
// ADD MEDICINE
// =====================================================

function addMedicine(){

    const name =
        document.getElementById("medicineName").value.trim();

    const dosage =
        document.getElementById("dosage").value.trim();

    const time =
        document.getElementById("medicineTime").value;


    if(!name || !dosage || !time){

        const lang = getLanguage();

        alert(
            lang === "ta"
            ? "அனைத்து மருந்து விவரங்களையும் நிரப்பவும்"
            : lang === "hi"
            ? "सभी दवा विवरण भरें"
            : lang === "te"
            ? "అన్ని మందుల వివరాలను నమోదు చేయండి"
            : "Fill all medicine details"
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


    addLog(`${name} added`);


    document.getElementById("medicineName").value = "";
    document.getElementById("dosage").value = "";
    document.getElementById("medicineTime").value = "";


    loadMedicines();
    updateDashboard();

}


// =====================================================
// MEDICINE STATUS TRANSLATION
// =====================================================

function translateStatus(status){

    const lang = getLanguage();

    const t = translations[lang];

    if(status === "Pending")
        return t.pending;

    if(status === "Taken")
        return t.takenStatus;

    if(status === "Missed")
        return t.missedStatus;

    return status;

}


// =====================================================
// LOAD MEDICINES
// =====================================================

function loadMedicines(){

    const list =
        document.getElementById("medicineList");

    if(!list) return;


    list.innerHTML = "";


    const lang = getLanguage();

    const t = translations[lang];


    medicines.forEach((med,index) => {

        const li =
            document.createElement("li");


        li.innerHTML =

            `<b>${med.name}</b><br>
             ${t.dosage}: ${med.dosage}<br>
             ${t.time}: ${med.time}<br>
             ${t.status}: ${translateStatus(med.status)}<br><br>

             <button onclick="markTaken(${index})">
                ${t.taken}
             </button>`;


        list.appendChild(li);

    });


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
            med => med.status === "Taken"
        ).length;


    const missed =
        medicines.filter(
            med => med.status === "Missed"
        ).length;


    const adherence =
        total === 0
        ? 0
        : Math.round((taken / total) * 100);


    document.getElementById("totalMedicine").innerHTML =
        total;


    document.getElementById("takenCount").innerHTML =
        taken;


    document.getElementById("missedCount").innerHTML =
        missed;


    document.getElementById("adherence").innerHTML =
        adherence + "%";


    // REPORT

    document.getElementById("reportTotal").innerHTML =
        total;


    document.getElementById("reportTaken").innerHTML =
        taken;


    document.getElementById("reportMissed").innerHTML =
        missed;


    document.getElementById("reportAdherence").innerHTML =
        adherence + "%";


    const reportTable =
        document.getElementById("reportTable");


    if(!reportTable) return;


    reportTable.innerHTML = "";


    medicines.forEach(med => {

        reportTable.innerHTML +=

            `<tr>
                <td>${med.name}</td>
                <td>${med.dosage}</td>
                <td>${med.time}</td>
                <td>${translateStatus(med.status)}</td>
            </tr>`;

    });

}


// =====================================================
// MARK TAKEN
// =====================================================

function markTaken(index){

    medicines[index].status = "Taken";


    savePatientMedicines();


    if(window.speechSynthesis){

        speechSynthesis.cancel();

    }


    clearInterval(reminderLoop);


    activeReminder = null;


    addLog(
        medicines[index].name + " taken"
    );


    loadMedicines();
    updateDashboard();

}


// =====================================================
// REMINDER CHECK
// =====================================================

function checkReminders(){

    const currentTime =
        new Date()
        .toTimeString()
        .substring(0,5);


    medicines.forEach((medicine,index) => {

        if(
            medicine.time === currentTime &&
            medicine.status === "Pending"
        ){

            triggerReminder(
                medicine,
                index
            );

        }

    });

}

setInterval(checkReminders,1000);


// =====================================================
// REMINDER ALERT
// =====================================================

function triggerReminder(medicine,index){

    if(activeReminder === index)
        return;


    activeReminder = index;


    const lang = getLanguage();


    let speechLanguage = "en-US";


    if(lang === "ta")
        speechLanguage = "ta-IN";

    else if(lang === "hi")
        speechLanguage = "hi-IN";

    else if(lang === "te")
        speechLanguage = "te-IN";


    reminderLoop =
        setInterval(() => {

            const speech =
                new SpeechSynthesisUtterance();


            if(lang === "ta"){

                speech.text =
                    `${medicine.name} மருந்தை எடுத்துக்கொள்ளும் நேரம்`;

            }

            else if(lang === "hi"){

                speech.text =
                    `${medicine.name} दवा लेने का समय हो गया है`;

            }

            else if(lang === "te"){

                speech.text =
                    `${medicine.name} మందు తీసుకునే సమయం వచ్చింది`;

            }

            else{

                speech.text =
                    `Time to take ${medicine.name}`;

            }


            speech.lang =
                speechLanguage;


            speechSynthesis.speak(speech);


        },5000);


    addLog(
        "Reminder started for " +
        medicine.name
    );


    const nextReminder =
        document.getElementById("nextReminder");


    if(nextReminder){

        nextReminder.innerHTML =
            `${medicine.name} (${medicine.time})`;

    }


    // MISS AFTER 1 MINUTE

    setTimeout(() => {

        clearInterval(reminderLoop);


        if(medicines[index].status === "Pending"){

            medicines[index].status = "Missed";


            savePatientMedicines();


            addLog(
                medicine.name + " missed"
            );


            sendMissedSMS(medicine);


            loadMedicines();
            updateDashboard();

        }

    },60000);

}


// =====================================================
// SMS FUNCTION
// =====================================================

function sendMissedSMS(medicine){

    const caregiver =
        localStorage.getItem("caregiver");


    if(!caregiver) return;


    const smsText =
        encodeURIComponent(

            `Medicine Missed Alert\n` +
            `Medicine: ${medicine.name}\n` +
            `Time: ${medicine.time}`

        );


    window.location.href =
        `sms:${caregiver}?body=${smsText}`;


    setTimeout(() => {

        const confirmCall =
            confirm("Call caregiver now?");


        if(confirmCall){

            window.location.href =
                `tel:${caregiver}`;

        }

    },4000);

}


// =====================================================
// LOG SYSTEM
// =====================================================

function addLog(message){

    let logs =
        loadPatientLogs();


    logs.unshift(

        new Date().toLocaleString()
        +
        " - "
        +
        message

    );


    savePatientLogs(logs);


    loadLogs();

}


function loadLogs(){

    const list =
        document.getElementById("logList");


    if(!list) return;


    list.innerHTML = "";


    const logs =
        loadPatientLogs();


    logs.forEach(log => {

        const li =
            document.createElement("li");


        li.innerHTML = log;


        list.appendChild(li);

    });

}


// =====================================================
// OTHER FEATURES
// =====================================================

function callAmbulance(){

    addLog("Calling ambulance");

    window.location.href =
        "tel:108";

}


function toggleDarkMode(){

    document.body.classList.toggle(
        "dark-mode"
    );

}


function logout(){

    localStorage.removeItem(
        "patientName"
    );

    location.reload();

}


function callCaregiver(){

    const caregiver =
        localStorage.getItem("caregiver");


    if(!caregiver){

        alert(
            "No caregiver number found."
        );

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

    // Use the CURRENT patient's medicines
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


    const { jsPDF } =
        window.jspdf;


    let pdf =
        new jsPDF();


    let patient =
        localStorage.getItem(
            "patientName"
        ) || "Patient";


    pdf.setFontSize(20);

    pdf.text(
        "MEDICARE AI",
        20,
        20
    );


    pdf.setFontSize(14);

    pdf.text(
        "Medicine Report",
        20,
        32
    );


    pdf.setFontSize(12);

    pdf.text(
        "Patient Name: " + patient,
        20,
        45
    );


    let y = 65;


    pdf.text(
        "Medicine",
        20,
        y
    );


    pdf.text(
        "Dosage",
        75,
        y
    );


    pdf.text(
        "Time",
        120,
        y
    );


    pdf.text(
        "Status",
        160,
        y
    );


    y += 10;


    currentMedicines.forEach((med) => {

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
            med.status || "Pending",
            160,
            y
        );


        y += 10;


        if(y > 280){

            pdf.addPage();

            y = 20;

        }

    });


    pdf.text(
        "Generated by MEDICARE AI",
        20,
        y + 15
    );


    pdf.save(
        "MEDICARE_AI_Medicine_Report.pdf"
    );

}
