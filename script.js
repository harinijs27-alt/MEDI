The problem is that the previous full script did not include a proper login flow, so after clicking the login button the rest of the page may not initialize.

Use this version for the login part. The login button must have id="loginBtn", and your login form/container should have the IDs below.

HTML
<div id="loginPage">

    <h2>MEDICARE AI</h2>

    <input
        type="text"
        id="loginPatientName"
        placeholder="Patient Name"
    >

    <input
        type="tel"
        id="loginPatientPhone"
        placeholder="Phone Number"
    >

    <button
        type="button"
        id="loginBtn"
    >
        Login
    </button>

</div>


<div id="mainApp" style="display:none;">

    <!-- YOUR MEDICARE AI MAIN WEBSITE CONTENT HERE -->

</div>
Add this login code to the bottom of your script.js
// ============================================================
// MEDICARE AI LOGIN SYSTEM
// ============================================================

function loginUser() {

    console.log("LOGIN BUTTON CLICKED");


    const nameInput =
        document.getElementById(
            "loginPatientName"
        );


    const phoneInput =
        document.getElementById(
            "loginPatientPhone"
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


    if (!name) {

        alert(
            "Please enter patient name."
        );

        nameInput.focus();

        return;

    }


    if (!phone) {

        alert(
            "Please enter phone number."
        );

        phoneInput.focus();

        return;

    }


    // Save patient details

    patientName = name;

    patientPhone = phone;


    localStorage.setItem(
        "medicare_patientName",
        name
    );


    localStorage.setItem(
        "medicare_patientPhone",
        phone
    );


    localStorage.setItem(
        "medicare_loggedIn",
        "true"
    );


    console.log(
        "Login successful:",
        name
    );


    // Hide login

    const loginPage =
        document.getElementById(
            "loginPage"
        );


    if (loginPage) {

        loginPage.style.display =
            "none";

    }


    // Show main app

    const mainApp =
        document.getElementById(
            "mainApp"
        );


    if (mainApp) {

        mainApp.style.display =
            "block";

    }


    // Load saved information

    loadMedicines();

    loadCaregiver();


    // Refresh page content

    renderMedicines();

    updateDashboard();

    applyLanguage();

    startReminderChecker();


    console.log(
        "MEDICARE AI dashboard opened."
    );

}


// ============================================================
// LOGIN BUTTON
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const loginButton =
            document.getElementById(
                "loginBtn"
            );


        if (loginButton) {

            loginButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    loginUser();

                }
            );


            console.log(
                "Login button connected."
            );

        }


        // Check previous login

        const loggedIn =
            localStorage.getItem(
                "medicare_loggedIn"
            );


        if (loggedIn === "true") {

            const loginPage =
                document.getElementById(
                    "loginPage"
                );


            const mainApp =
                document.getElementById(
                    "mainApp"
                );


            if (loginPage) {

                loginPage.style.display =
                    "none";

            }


            if (mainApp) {

                mainApp.style.display =
                    "block";

            }


            loadPatient();

            loadMedicines();

            loadCaregiver();

            renderMedicines();

            updateDashboard();

            startReminderChecker();

        }

    }
);


// ============================================================
// LOGOUT
// ============================================================

function logout() {

    localStorage.removeItem(
        "medicare_loggedIn"
    );


    const loginPage =
        document.getElementById(
            "loginPage"
        );


    const mainApp =
        document.getElementById(
            "mainApp"
        );


    if (mainApp) {

        mainApp.style.display =
            "none";

    }


    if (loginPage) {

        loginPage.style.display =
            "block";

    }


    console.log(
        "Logged out."
    );

}
One important thing

If your existing login button looks like this:

<button onclick="login()">Login</button>

don't keep that if you're using the code above.

Use:

<button type="button" id="loginBtn">
    Login
</button>

Then the flow will be:

Login → Main MEDICARE AI page → Add Medicine → Test Voice → Reminder → I Took It

Also, don't put login() and loginUser() both on the same button, because that can cause the page to behave incorrectly.

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title> JS MEDICARE - Medication Reminder</title>

    <style>

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }

        body {
            background: linear-gradient(135deg, #e0f7fa, #e8eaf6);
            min-height: 100vh;
            color: #263238;
        }

        .container {
            width: 95%;
            max-width: 1200px;
            margin: auto;
        }

        header {
            background: linear-gradient(135deg, #00695c, #00897b);
            color: white;
            padding: 20px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        }

        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 15px;
        }

        .logo {
            font-size: 28px;
            font-weight: bold;
        }

        .subtitle {
            font-size: 14px;
            margin-top: 5px;
        }

        select,
        input,
        button {
            padding: 12px;
            border-radius: 8px;
            border: 1px solid #ccc;
            font-size: 15px;
        }

        select {
            cursor: pointer;
        }

        button {
            cursor: pointer;
            border: none;
            font-weight: bold;
        }

        .btn-primary {
            background: #00897b;
            color: white;
        }

        .btn-primary:hover {
            background: #00695c;
        }

        .btn-danger {
            background: #e53935;
            color: white;
        }

        .btn-success {
            background: #43a047;
            color: white;
        }

        .btn-warning {
            background: #fb8c00;
            color: white;
        }

        .login-section {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .login-card {
            background: white;
            padding: 35px;
            width: 100%;
            max-width: 450px;
            border-radius: 18px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }

        .login-card h1 {
            color: #00695c;
            margin-bottom: 10px;
            text-align: center;
        }

        .login-card p {
            text-align: center;
            margin-bottom: 25px;
            color: #607d8b;
        }

        .form-group {
            margin-bottom: 18px;
        }

        .form-group label {
            display: block;
            margin-bottom: 7px;
            font-weight: bold;
        }

        .form-group input,
        .form-group select {
            width: 100%;
        }

        .login-btn {
            width: 100%;
            background: #00897b;
            color: white;
            padding: 14px;
        }

        .voice-enable-btn {
            width: 100%;
            margin-top: 12px;
            background: #3949ab;
            color: white;
            padding: 14px;
        }

        .voice-enabled {
            background: #43a047 !important;
        }

        .dashboard {
            display: none;
        }

        .dashboard-header {
            padding: 25px 0;
        }

        .dashboard-header h1 {
            color: #00695c;
        }

        .ai-status {
            display: inline-block;
            margin-top: 8px;
            padding: 7px 12px;
            background: #c8e6c9;
            color: #2e7d32;
            border-radius: 20px;
            font-size: 13px;
            font-weight: bold;
        }

        .stats {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            margin-bottom: 25px;
        }

        .stat-card {
            background: white;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            text-align: center;
        }

        .stat-card h3 {
            color: #607d8b;
            font-size: 14px;
        }

        .stat-card .number {
            font-size: 30px;
            font-weight: bold;
            color: #00695c;
            margin-top: 8px;
        }

        .card {
            background: white;
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            margin-bottom: 25px;
        }

        .card h2 {
            color: #00695c;
            margin-bottom: 20px;
        }

        .medicine-form {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr auto;
            gap: 12px;
        }

        .medicine-form input {
            width: 100%;
        }

        .medicine-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .medicine-item {
            border: 1px solid #ddd;
            border-left: 5px solid #00897b;
            padding: 15px;
            border-radius: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 15px;
            flex-wrap: wrap;
        }

        .medicine-info h3 {
            color: #263238;
            margin-bottom: 6px;
        }

        .medicine-info p {
            color: #607d8b;
            margin: 3px 0;
        }

        .status {
            font-weight: bold;
        }

        .pending {
            color: #fb8c00;
        }

        .taken {
            color: #43a047;
        }

        .missed {
            color: #e53935;
        }

        .medicine-actions {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
        }

        .next-reminder {
            background: linear-gradient(135deg, #00897b, #26a69a);
            color: white;
            padding: 22px;
            border-radius: 15px;
            margin-bottom: 25px;
        }

        .next-reminder h3 {
            margin-bottom: 8px;
        }

        .next-reminder-time {
            font-size: 25px;
            font-weight: bold;
        }

        .actions {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
        }

        .action-btn {
            padding: 18px;
            color: white;
            border-radius: 10px;
        }

        .caregiver {
            background: #3949ab;
        }

        .ambulance {
            background: #d32f2f;
        }

        .logout {
            background: #455a64;
        }

        .ai-box {
            background: #f3e5f5;
            border-left: 5px solid #8e24aa;
            padding: 18px;
            border-radius: 10px;
        }

        .ai-box h3 {
            color: #6a1b9a;
            margin-bottom: 8px;
        }

        .report-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
        }

        .report-item {
            background: #f5f5f5;
            padding: 15px;
            border-radius: 10px;
        }

        .report-button {
            width: 100%;
            margin-top: 20px;
            padding: 15px;
            background: #00695c;
            color: white;
            font-size: 16px;
        }

        .log {
            max-height: 250px;
            overflow-y: auto;
        }

        .log-item {
            padding: 10px;
            border-bottom: 1px solid #ddd;
            font-size: 14px;
        }

        #voiceStatus {
            margin-top: 12px;
            font-weight: bold;
            color: #00695c;
        }

        .hidden {
            display: none !important;
        }

        @media(max-width: 800px) {

            .stats {
                grid-template-columns: repeat(2, 1fr);
            }

            .medicine-form {
                grid-template-columns: 1fr;
            }

            .actions {
                grid-template-columns: 1fr;
            }

            .report-grid {
                grid-template-columns: 1fr;
            }

        }

        @media(max-width: 500px) {

            .stats {
                grid-template-columns: 1fr;
            }

            .header-content {
                flex-direction: column;
                align-items: flex-start;
            }

            .login-card {
                width: 92%;
                padding: 25px;
            }

            .medicine-actions {
                width: 100%;
            }

            .medicine-actions button {
                flex: 1;
            }

        }

    </style>

</head>

<body>


<!-- ================= LOGIN ================= -->

<section id="loginSection" class="login-section">

    <div class="login-card">

        <h1> JS MEDICARE </h1>

        <p id="loginSubtitle">
            Right Medicine, Right Time
        </p>


        <div class="form-group">

            <label id="nameLabel">
                Patient Name
            </label>

            <input
                type="text"
                id="patientName"
                placeholder="Enter patient name"
            >

        </div>


        <div class="form-group">

            <label id="phoneLabel">
                Phone Number
            </label>

            <input
                type="tel"
                id="patientPhone"
                placeholder="Enter phone number"
            >

        </div>


        <div class="form-group">

            <label id="languageLabel">
                Select Language
            </label>

            <select id="languageSelect">

                <option value="en">English</option>
                <option value="ta">தமிழ்</option>
                <option value="hi">हिन्दी</option>
                <option value="te">తెలుగు</option>

            </select>

        </div>


        <button
            class="login-btn"
            onclick="login()"
            id="loginButton"
        >
            Login
        </button>


        <!-- MOBILE VOICE ENABLE -->

        <button
            class="voice-enable-btn"
            onclick="enableMobileVoice()"
            id="voiceEnableButton"
        >
            🔊 Enable Mobile Voice
        </button>

        <div id="voiceStatus"></div>

    </div>

</section>


<!-- ================= DASHBOARD ================= -->

<section id="dashboardSection" class="dashboard">


<header>

    <div class="container header-content">

        <div>

            <div class="logo">
                JS MEDICARE 
            </div>

            <div
                class="subtitle"
                id="headerSubtitle"
            >
                Right Medicine, Right Time
            </div>

        </div>


        <select
            id="dashboardLanguage"
            onchange="changeLanguage(this.value)"
        >

            <option value="en">English</option>
            <option value="ta">தமிழ்</option>
            <option value="hi">हिन्दी</option>
            <option value="te">తెలుగు</option>

        </select>

    </div>

</header>


<main class="container">


<!-- DASHBOARD HEADING -->

<div class="dashboard-header">

    <h1 id="welcomeTitle">
        Welcome
    </h1>

    <div class="ai-status">

        ●

        <span id="aiStatusText">
             Monitoring Online
        </span>

    </div>

</div>


<!-- STATISTICS -->

<div class="stats">


<div class="stat-card">

    <h3 id="totalLabel">
        Total Medicines
    </h3>

    <div
        class="number"
        id="totalMedicines"
    >
        0
    </div>

</div>


<div class="stat-card">

    <h3 id="takenLabel">
        Taken
    </h3>

    <div
        class="number"
        id="takenMedicines"
    >
        0
    </div>

</div>


<div class="stat-card">

    <h3 id="missedLabel">
        Missed
    </h3>

    <div
        class="number"
        id="missedMedicines"
    >
        0
    </div>

</div>


<div class="stat-card">

    <h3 id="adherenceLabel">
        Adherence
    </h3>

    <div
        class="number"
        id="adherence"
    >
        0%
    </div>

</div>

</div>


<!-- NEXT REMINDER -->

<div class="next-reminder">

    <h3 id="nextReminderTitle">
        Next Medication Reminder
    </h3>

    <div
        class="next-reminder-time"
        id="nextReminder"
    >
        No reminders
    </div>

</div>


<!-- ADD MEDICINE -->

<div class="card">

    <h2 id="addMedicineTitle">
        Add Medicine
    </h2>

    <div class="medicine-form">

        <input
            type="text"
            id="medicineName"
            placeholder="Medicine name"
        >

        <input
            type="text"
            id="dosage"
            placeholder="Dosage"
        >

        <input
            type="time"
            id="medicineTime"
        >

        <button
            class="btn-primary"
            onclick="addMedicine()"
            id="addButton"
        >
            Add Medicine
        </button>

    </div>

</div>


<!-- MEDICINE LIST -->

<div class="card">

    <h2 id="medicineListTitle">
        Medicine Schedule
    </h2>

    <div
        id="medicineList"
        class="medicine-list"
    ></div>

</div>


<!-- AI ASSISTANT -->

<div class="card">

    <div class="ai-box">

        <h3 id="aiTitle">
            AI Healthcare Assistant
        </h3>

        <p id="aiMessage">
            Your medication schedule is being monitored automatically.
        </p>

    </div>

</div>


<!-- CAREGIVER -->

<div class="card">

    <h2 id="caregiverTitle">
        Caregiver
    </h2>

    <div class="form-group">

        <label id="caregiverPhoneLabel">
            Caregiver Phone Number
        </label>

        <input
            type="tel"
            id="caregiverPhone"
            placeholder="Enter caregiver phone number"
        >

    </div>

    <button
        class="btn-primary"
        onclick="saveCaregiver()"
        id="saveCaregiverButton"
    >
        Save Caregiver
    </button>

</div>


<!-- REPORT -->

<div class="card">

    <h2 id="reportTitle">
        Medication Report
    </h2>

    <div class="report-grid">

        <div class="report-item">

            <strong id="reportTotalText">
                Total Medicines
            </strong>

            <div id="reportTotal">
                0
            </div>

        </div>


        <div class="report-item">

            <strong id="reportTakenText">
                Medicines Taken
            </strong>

            <div id="reportTaken">
                0
            </div>

        </div>


        <div class="report-item">

            <strong id="reportMissedText">
                Medicines Missed
            </strong>

            <div id="reportMissed">
                0
            </div>

        </div>


        <div class="report-item">

            <strong id="reportAdherenceText">
                Adherence
            </strong>

            <div id="reportAdherence">
                0%
            </div>

        </div>

    </div>


    <button
        class="report-button"
        onclick="generateMedicationReport()"
        id="reportButton"
    >
        📄 Generate Detailed PDF Report
    </button>

</div>


<!-- ACTIVITY LOG -->

<div class="card">

    <h2 id="logTitle">
        Activity Log
    </h2>

    <div
        id="activityLog"
        class="log"
    ></div>

</div>


<!-- BUTTONS -->

<div class="card">

    <div class="actions">

        <button
            class="action-btn caregiver"
            onclick="callCaregiver()"
            id="callCaregiverButton"
        >
            📞 Call Caregiver
        </button>


        <button
            class="action-btn ambulance"
            onclick="callAmbulance()"
            id="ambulanceButton"
        >
            🚑 Emergency
        </button>


        <button
            class="action-btn logout"
            onclick="logout()"
            id="logoutButton"
        >
            Logout
        </button>

    </div>

</div>


</main>

</section>


<script src="script.js"></script>

</body>

</html>

Yes — now I can see the exact problem. Your HTML uses login(), languageSelect, dashboardLanguage, takenMedicines, etc., while my previous script expected different IDs. That mismatch is why Login is not opening the dashboard.

Keep your HTML exactly as you sent it and replace the entire script.js with this compatible version:

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
One important correction in your HTML

Your Login button is already correct:

<button
    class="login-btn"
    onclick="login()"
    id="loginButton"
>
    Login
</button>

So do not change it.

Your language dropdown is also correctly named:

<select id="languageSelect">

and the dashboard dropdown is:

<select
    id="dashboardLanguage"
    onchange="changeLanguage(this.value)"
>

The new script above is specifically written for those IDs.

Test now
Save script.js.
Refresh the page with Ctrl + Shift + R.
Enter patient name.
Enter phone number.
Select Tamil/Hindi/Telugu.
Click Login.
Dashboard should open.
Add medicine.
Set the time.
The reminder will speak the medicine name, not the patient name.

For example, Tamil:

பாராசிட்டமால்

will produce:

பாராசிட்டமால் மருந்தை எடுத்துக்கொள்ளும் நேரம் வந்துவிட்டது.

No buzzer is used. The reminder uses voice only.

give html code

Yes. Use this complete index.html with the script.js I just gave you. I have kept the IDs exactly compatible with that script, including Login, language selection, medicine reminder, voice, caregiver, report, and logout.

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>JS MEDICARE - Medication Reminder</title>


    <style>

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }


        body {
            background: linear-gradient(
                135deg,
                #e0f7fa,
                #e8eaf6
            );

            min-height: 100vh;

            color: #263238;
        }


        .container {
            width: 95%;
            max-width: 1200px;
            margin: auto;
        }


        /* ================= HEADER ================= */

        header {
            background: linear-gradient(
                135deg,
                #00695c,
                #00897b
            );

            color: white;

            padding: 20px;

            box-shadow:
                0 3px 10px rgba(0,0,0,0.2);
        }


        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;

            flex-wrap: wrap;

            gap: 15px;
        }


        .logo {
            font-size: 28px;
            font-weight: bold;
        }


        .subtitle {
            font-size: 14px;
            margin-top: 5px;
        }


        /* ================= INPUTS ================= */

        select,
        input,
        button {
            padding: 12px;

            border-radius: 8px;

            border: 1px solid #ccc;

            font-size: 15px;
        }


        select {
            cursor: pointer;
        }


        input:focus,
        select:focus {
            outline: 2px solid #80cbc4;
        }


        button {
            cursor: pointer;

            border: none;

            font-weight: bold;
        }


        button:hover {
            opacity: 0.9;
        }


        .btn-primary {
            background: #00897b;
            color: white;
        }


        .btn-danger {
            background: #e53935;
            color: white;
        }


        .btn-success {
            background: #43a047;
            color: white;
        }


        .btn-warning {
            background: #fb8c00;
            color: white;
        }


        /* ================= LOGIN ================= */

        .login-section {
            min-height: 100vh;

            display: flex;

            align-items: center;

            justify-content: center;
        }


        .login-card {
            background: white;

            padding: 35px;

            width: 100%;

            max-width: 450px;

            border-radius: 18px;

            box-shadow:
                0 10px 30px rgba(0,0,0,0.15);
        }


        .login-card h1 {
            color: #00695c;

            margin-bottom: 10px;

            text-align: center;
        }


        .login-card p {
            text-align: center;

            margin-bottom: 25px;

            color: #607d8b;
        }


        .form-group {
            margin-bottom: 18px;
        }


        .form-group label {
            display: block;

            margin-bottom: 7px;

            font-weight: bold;
        }


        .form-group input,
        .form-group select {
            width: 100%;
        }


        .login-btn {
            width: 100%;

            background: #00897b;

            color: white;

            padding: 14px;
        }


        .voice-enable-btn {
            width: 100%;

            margin-top: 12px;

            background: #3949ab;

            color: white;

            padding: 14px;
        }


        .voice-enabled {
            background: #43a047 !important;
        }


        #voiceStatus {
            margin-top: 12px;

            text-align: center;

            font-weight: bold;

            color: #00695c;
        }


        /* ================= DASHBOARD ================= */

        .dashboard {
            display: none;
        }


        .dashboard-header {
            padding: 25px 0;
        }


        .dashboard-header h1 {
            color: #00695c;
        }


        .ai-status {
            display: inline-block;

            margin-top: 8px;

            padding: 7px 12px;

            background: #c8e6c9;

            color: #2e7d32;

            border-radius: 20px;

            font-size: 13px;

            font-weight: bold;
        }


        /* ================= STATS ================= */

        .stats {
            display: grid;

            grid-template-columns:
                repeat(4, 1fr);

            gap: 15px;

            margin-bottom: 25px;
        }


        .stat-card {
            background: white;

            padding: 20px;

            border-radius: 15px;

            box-shadow:
                0 4px 12px rgba(0,0,0,0.08);

            text-align: center;
        }


        .stat-card h3 {
            color: #607d8b;

            font-size: 14px;
        }


        .stat-card .number {
            font-size: 30px;

            font-weight: bold;

            color: #00695c;

            margin-top: 8px;
        }


        /* ================= CARDS ================= */

        .card {
            background: white;

            padding: 25px;

            border-radius: 15px;

            box-shadow:
                0 4px 12px rgba(0,0,0,0.08);

            margin-bottom: 25px;
        }


        .card h2 {
            color: #00695c;

            margin-bottom: 20px;
        }


        /* ================= NEXT REMINDER ================= */

        .next-reminder {
            background: linear-gradient(
                135deg,
                #00897b,
                #26a69a
            );

            color: white;

            padding: 22px;

            border-radius: 15px;

            margin-bottom: 25px;
        }


        .next-reminder h3 {
            margin-bottom: 8px;
        }


        .next-reminder-time {
            font-size: 25px;

            font-weight: bold;
        }


        /* ================= MEDICINE FORM ================= */

        .medicine-form {
            display: grid;

            grid-template-columns:
                2fr 1fr 1fr auto;

            gap: 12px;
        }


        .medicine-form input {
            width: 100%;
        }


        /* ================= MEDICINE LIST ================= */

        .medicine-list {
            display: flex;

            flex-direction: column;

            gap: 12px;
        }


        .medicine-item {
            border: 1px solid #ddd;

            border-left: 5px solid #00897b;

            padding: 15px;

            border-radius: 10px;

            display: flex;

            justify-content: space-between;

            align-items: center;

            gap: 15px;

            flex-wrap: wrap;
        }


        .medicine-info h3 {
            color: #263238;

            margin-bottom: 6px;
        }


        .medicine-info p {
            color: #607d8b;

            margin: 3px 0;
        }


        .status {
            font-weight: bold;
        }


        .pending {
            color: #fb8c00;
        }


        .taken {
            color: #43a047;
        }


        .missed {
            color: #e53935;
        }


        .medicine-actions {
            display: flex;

            gap: 8px;

            flex-wrap: wrap;
        }


        /* ================= AI ================= */

        .ai-box {
            background: #f3e5f5;

            border-left: 5px solid #8e24aa;

            padding: 18px;

            border-radius: 10px;
        }


        .ai-box h3 {
            color: #6a1b9a;

            margin-bottom: 8px;
        }


        /* ================= REPORT ================= */

        .report-grid {
            display: grid;

            grid-template-columns:
                repeat(2, 1fr);

            gap: 15px;
        }


        .report-item {
            background: #f5f5f5;

            padding: 15px;

            border-radius: 10px;
        }


        .report-item div {
            margin-top: 8px;

            font-size: 20px;

            font-weight: bold;

            color: #00695c;
        }


        .report-button {
            width: 100%;

            margin-top: 20px;

            padding: 15px;

            background: #00695c;

            color: white;

            font-size: 16px;
        }


        /* ================= ACTION BUTTONS ================= */

        .actions {
            display: grid;

            grid-template-columns:
                repeat(3, 1fr);

            gap: 12px;
        }


        .action-btn {
            padding: 18px;

            color: white;

            border-radius: 10px;
        }


        .caregiver {
            background: #3949ab;
        }


        .ambulance {
            background: #d32f2f;
        }


        .logout {
            background: #455a64;
        }


        /* ================= LOG ================= */

        .log {
            max-height: 250px;

            overflow-y: auto;
        }


        .log-item {
            padding: 10px;

            border-bottom:
                1px solid #ddd;

            font-size: 14px;
        }


        /* ================= REMINDER ALERT ================= */

        .reminder-alert {
            position: fixed;

            top: 20px;

            right: 20px;

            left: 20px;

            max-width: 500px;

            margin: auto;

            background: white;

            border: 4px solid #e53935;

            border-radius: 18px;

            padding: 25px;

            box-shadow:
                0 10px 40px rgba(0,0,0,0.3);

            z-index: 9999;

            text-align: center;

            display: none;
        }


        .reminder-alert h2 {
            color: #e53935;

            margin-bottom: 10px;
        }


        .reminder-alert p {
            font-size: 20px;

            margin-bottom: 18px;
        }


        .reminder-take-btn {
            background: #43a047;

            color: white;

            padding: 15px 30px;

            font-size: 17px;
        }


        /* ================= RESPONSIVE ================= */

        @media(max-width: 800px) {

            .stats {
                grid-template-columns:
                    repeat(2, 1fr);
            }


            .medicine-form {
                grid-template-columns:
                    1fr;
            }


            .actions {
                grid-template-columns:
                    1fr;
            }


            .report-grid {
                grid-template-columns:
                    1fr;
            }

        }


        @media(max-width: 500px) {

            .stats {
                grid-template-columns:
                    1fr;
            }


            .header-content {
                flex-direction: column;

                align-items: flex-start;
            }


            .login-card {
                width: 92%;

                padding: 25px;
            }


            .medicine-actions {
                width: 100%;
            }


            .medicine-actions button {
                flex: 1;
            }

        }

    </style>

</head>


<body>


<!-- =========================================================
     LOGIN PAGE
========================================================= -->

<section
    id="loginSection"
    class="login-section"
>

    <div class="login-card">

        <h1>
            JS MEDICARE
        </h1>


        <p id="loginSubtitle">
            Right Medicine, Right Time
        </p>


        <!-- PATIENT NAME -->

        <div class="form-group">

            <label id="nameLabel">
                Patient Name
            </label>

            <input
                type="text"
                id="patientName"
                placeholder="Enter patient name"
            >

        </div>


        <!-- PHONE -->

        <div class="form-group">

            <label id="phoneLabel">
                Phone Number
            </label>

            <input
                type="tel"
                id="patientPhone"
                placeholder="Enter phone number"
            >

        </div>


        <!-- LANGUAGE -->

        <div class="form-group">

            <label id="languageLabel">
                Select Language
            </label>

            <select id="languageSelect">

                <option value="en">
                    English
                </option>

                <option value="ta">
                    தமிழ்
                </option>

                <option value="hi">
                    हिन्दी
                </option>

                <option value="te">
                    తెలుగు
                </option>

            </select>

        </div>


        <!-- LOGIN -->

        <button
            type="button"
            class="login-btn"
            id="loginButton"
            onclick="login()"
        >
            Login
        </button>


        <!-- ENABLE VOICE -->

        <button
            type="button"
            class="voice-enable-btn"
            id="voiceEnableButton"
            onclick="enableMobileVoice()"
        >
            🔊 Enable Mobile Voice
        </button>


        <div id="voiceStatus"></div>

    </div>

</section>



<!-- =========================================================
     DASHBOARD
========================================================= -->

<section
    id="dashboardSection"
    class="dashboard"
>


<!-- HEADER -->

<header>

    <div class="container header-content">

        <div>

            <div class="logo">
                JS MEDICARE
            </div>

            <div
                class="subtitle"
                id="headerSubtitle"
            >
                Right Medicine, Right Time
            </div>

        </div>


        <!-- DASHBOARD LANGUAGE -->

        <select
            id="dashboardLanguage"
            onchange="changeLanguage(this.value)"
        >

            <option value="en">
                English
            </option>

            <option value="ta">
                தமிழ்
            </option>

            <option value="hi">
                हिन्दी
            </option>

            <option value="te">
                తెలుగు
            </option>

        </select>

    </div>

</header>



<main class="container">


<!-- DASHBOARD TITLE -->

<div class="dashboard-header">

    <h1 id="welcomeTitle">
        Welcome
    </h1>


    <div class="ai-status">

        ●

        <span id="aiStatusText">
            Monitoring Online
        </span>

    </div>

</div>



<!-- =====================================================
     STATISTICS
===================================================== -->

<div class="stats">


    <div class="stat-card">

        <h3 id="totalLabel">
            Total Medicines
        </h3>

        <div
            class="number"
            id="totalMedicines"
        >
            0
        </div>

    </div>


    <div class="stat-card">

        <h3 id="takenLabel">
            Taken
        </h3>

        <div
            class="number"
            id="takenMedicines"
        >
            0
        </div>

    </div>


    <div class="stat-card">

        <h3 id="missedLabel">
            Missed
        </h3>

        <div
            class="number"
            id="missedMedicines"
        >
            0
        </div>

    </div>


    <div class="stat-card">

        <h3 id="adherenceLabel">
            Adherence
        </h3>

        <div
            class="number"
            id="adherence"
        >
            0%
        </div>

    </div>

</div>



<!-- =====================================================
     NEXT REMINDER
===================================================== -->

<div class="next-reminder">

    <h3 id="nextReminderTitle">
        Next Medication Reminder
    </h3>


    <div
        class="next-reminder-time"
        id="nextReminder"
    >
        No reminders
    </div>

</div>



<!-- =====================================================
     ADD MEDICINE
===================================================== -->

<div class="card">

    <h2 id="addMedicineTitle">
        Add Medicine
    </h2>


    <div class="medicine-form">


        <input
            type="text"
            id="medicineName"
            placeholder="Medicine name"
        >


        <input
            type="text"
            id="dosage"
            placeholder="Dosage"
        >


        <input
            type="time"
            id="medicineTime"
        >


        <button
            type="button"
            class="btn-primary"
            id="addButton"
            onclick="addMedicine()"
        >
            Add Medicine
        </button>

    </div>


    <!-- VOICE TEST -->

    <button
        type="button"
        class="btn-primary"
        onclick="testMedicineVoice()"
        style="
            margin-top:15px;
            width:100%;
            background:#3949ab;
        "
    >
        🔊 Test Medicine Voice
    </button>

</div>



<!-- =====================================================
     MEDICINE LIST
===================================================== -->

<div class="card">

    <h2 id="medicineListTitle">
        Medicine Schedule
    </h2>


    <div
        id="medicineList"
        class="medicine-list"
    ></div>

</div>



<!-- ================================
