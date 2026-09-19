// ============================================================
// MEDICARE AI - COMPLETE SCRIPT
// ============================================================

// -------------------------
// GLOBAL VARIABLES
// -------------------------

let medicines = [];
let patient = null;

let activeReminder = null;
let reminderLoop = null;
let reminderCheckInterval = null;

let currentLanguage = "en";


// ============================================================
// TRANSLATIONS
// ============================================================

const translations = {

    en: {
        patientName: "Patient Name",
        patientAge: "Age",
        patientPhone: "Patient Phone",
        caregiverPhone: "Caregiver Phone",
        language: "Language",

        login: "Login",
        logout: "Logout",

        addMedicine: "Add Medicine",
        medicineName: "Medicine Name",
        dosage: "Dosage",
        medicineTime: "Time",
        addMedicineButton: "Add Medicine",

        todaysMedicines: "Today's Medicines",

        totalMedicine: "Total Medicines",
        taken: "Taken",
        missed: "Missed",
        adherence: "Adherence",

        callCaregiver: "Call Caregiver",
        callAmbulance: "Emergency",

        report: "Medication Report",
        downloadReport: "Download Report",

        medicine: "Medicine",
        status: "Status",

        takenStatus: "Taken",
        pendingStatus: "Pending",
        missedStatus: "Missed",

        nextReminder: "Next Reminder",

        aiOnline: "AI Online",

        healthMessage:
            "Welcome to MEDICARE AI. Your medication assistant is ready.",

        reminderTitle: "Medicine Reminder",

        reminderText:
            "Please take your scheduled medicine.",

        markTaken:
            "Mark Taken",

        noMedicines:
            "No medicines added yet.",

        loginSuccess:
            "Login Successful",

        preparing:
            "AI Healthcare Assistant is Preparing...",

        patientLoggedOut:
            "Logged out successfully."
    },

    ta: {
        patientName: "நோயாளியின் பெயர்",
        patientAge: "வயது",
        patientPhone: "நோயாளி தொலைபேசி",
        caregiverPhone: "பராமரிப்பாளர் தொலைபேசி",
        language: "மொழி",

        login: "உள்நுழை",
        logout: "வெளியேறு",

        addMedicine: "மருந்து சேர்க்கவும்",
        medicineName: "மருந்தின் பெயர்",
        dosage: "அளவு",
        medicineTime: "நேரம்",
        addMedicineButton: "மருந்து சேர்க்கவும்",

        todaysMedicines: "இன்றைய மருந்துகள்",

        totalMedicine: "மொத்த மருந்துகள்",
        taken: "எடுத்தது",
        missed: "தவறியது",
        adherence: "பின்பற்றல்",

        callCaregiver: "பராமரிப்பாளரை அழைக்கவும்",
        callAmbulance: "அவசரம்",

        report: "மருந்து அறிக்கை",
        downloadReport: "அறிக்கையை பதிவிறக்கவும்",

        medicine: "மருந்து",
        status: "நிலை",

        takenStatus: "எடுத்தது",
        pendingStatus: "நிலுவையில்",
        missedStatus: "தவறியது",

        nextReminder: "அடுத்த நினைவூட்டல்",

        aiOnline: "AI இயங்குகிறது",

        healthMessage:
            "MEDICARE AI-க்கு வரவேற்கிறோம். உங்கள் மருந்து உதவியாளர் தயாராக உள்ளது.",

        reminderTitle: "மருந்து நினைவூட்டல்",

        reminderText:
            "திட்டமிட்ட மருந்தை எடுத்துக்கொள்ளவும்.",

        markTaken:
            "எடுத்துவிட்டேன்",

        noMedicines:
            "மருந்துகள் எதுவும் சேர்க்கப்படவில்லை.",

        loginSuccess:
            "உள்நுழைவு வெற்றிகரமாக முடிந்தது",

        preparing:
            "AI சுகாதார உதவியாளர் தயாராகிறது...",

        patientLoggedOut:
            "வெற்றிகரமாக வெளியேறிவிட்டீர்கள்."
    },

    hi: {
        patientName: "मरीज का नाम",
        patientAge: "उम्र",
        patientPhone: "मरीज का फोन",
        caregiverPhone: "देखभालकर्ता का फोन",
        language: "भाषा",

        login: "लॉगिन",
        logout: "लॉगआउट",

        addMedicine: "दवा जोड़ें",
        medicineName: "दवा का नाम",
        dosage: "खुराक",
        medicineTime: "समय",
        addMedicineButton: "दवा जोड़ें",

        todaysMedicines: "आज की दवाएं",

        totalMedicine: "कुल दवाएं",
        taken: "ली गई",
        missed: "छूटी",
        adherence: "पालन",

        callCaregiver: "देखभालकर्ता को कॉल करें",
        callAmbulance: "आपातकाल",

        report: "दवा रिपोर्ट",
        downloadReport: "रिपोर्ट डाउनलोड करें",

        medicine: "दवा",
        status: "स्थिति",

        takenStatus: "ली गई",
        pendingStatus: "लंबित",
        missedStatus: "छूटी",

        nextReminder: "अगला रिमाइंडर",

        aiOnline: "AI ऑनलाइन",

        healthMessage:
            "MEDICARE AI में आपका स्वागत है। आपका दवा सहायक तैयार है।",

        reminderTitle: "दवा रिमाइंडर",

        reminderText:
            "कृपया अपनी निर्धारित दवा लें।",

        markTaken:
            "ली गई",

        noMedicines:
            "अभी तक कोई दवा नहीं जोड़ी गई है।",

        loginSuccess:
            "लॉगिन सफल",

        preparing:
            "AI हेल्थकेयर असिस्टेंट तैयार हो रहा है...",

        patientLoggedOut:
            "सफलतापूर्वक लॉगआउट हो गया।"
    },

    te: {
        patientName: "రోగి పేరు",
        patientAge: "వయస్సు",
        patientPhone: "రోగి ఫోన్",
        caregiverPhone: "సంరక్షకుని ఫోన్",
        language: "భాష",

        login: "లాగిన్",
        logout: "లాగ్ అవుట్",

        addMedicine: "మందు జోడించండి",
        medicineName: "మందు పేరు",
        dosage: "మోతాదు",
        medicineTime: "సమయం",
        addMedicineButton: "మందు జోడించండి",

        todaysMedicines: "ఈరోజు మందులు",

        totalMedicine: "మొత్తం మందులు",
        taken: "తీసుకున్నవి",
        missed: "మిస్ అయినవి",
        adherence: "పాటింపు",

        callCaregiver: "సంరక్షకునికి కాల్ చేయండి",
        callAmbulance: "అత్యవసరం",

        report: "మందుల నివేదిక",
        downloadReport: "నివేదిక డౌన్‌లోడ్ చేయండి",

        medicine: "మందు",
        status: "స్థితి",

        takenStatus: "తీసుకున్నారు",
        pendingStatus: "పెండింగ్",
        missedStatus: "మిస్ అయింది",

        nextReminder: "తదుపరి రిమైండర్",

        aiOnline: "AI ఆన్‌లైన్",

        healthMessage:
            "MEDICARE AIకి స్వాగతం. మీ మందుల సహాయకుడు సిద్ధంగా ఉన్నాడు.",

        reminderTitle: "మందు రిమైండర్",

        reminderText:
            "దయచేసి మీ షెడ్యూల్ చేసిన మందును తీసుకోండి.",

        markTaken:
            "తీసుకున్నాను",

        noMedicines:
            "ఇంకా మందులు జోడించలేదు.",

        loginSuccess:
            "లాగిన్ విజయవంతమైంది",

        preparing:
            "AI హెల్త్‌కేర్ అసిస్టెంట్ సిద్ధమవుతోంది...",

        patientLoggedOut:
            "విజయవంతంగా లాగ్ అవుట్ అయ్యారు."
    }
};


// ============================================================
// HELPER
// ============================================================

function t(key) {

    if (
        translations[currentLanguage] &&
        translations[currentLanguage][key]
    ) {
        return translations[currentLanguage][key];
    }

    return translations.en[key] || key;
}


// ============================================================
// SAVE / LOAD PATIENT
// ============================================================

function savePatient() {

    localStorage.setItem(
        "medicarePatient",
        JSON.stringify(patient)
    );
}


function loadPatient() {

    const savedPatient =
        localStorage.getItem("medicarePatient");

    if (savedPatient) {

        try {

            patient = JSON.parse(savedPatient);

        } catch (error) {

            console.log("Patient data error");

            patient = null;
        }
    }
}


// ============================================================
// SAVE / LOAD MEDICINES
// ============================================================

function saveMedicines() {

    localStorage.setItem(
        "medicareMedicines",
        JSON.stringify(medicines)
    );
}


function loadMedicines() {

    const savedMedicines =
        localStorage.getItem("medicareMedicines");

    if (savedMedicines) {

        try {

            medicines = JSON.parse(savedMedicines);

        } catch (error) {

            console.log("Medicine data error");

            medicines = [];
        }

    } else {

        medicines = [];
    }

    displayMedicines();
    updateDashboard();
    updateNextReminder();
}


// ============================================================
// LOGIN
// ============================================================

function loginPatient() {

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

    if (!name) {

        alert("Please enter patient name.");
        return;
    }

    if (!age) {

        alert("Please enter patient age.");
        return;
    }

    if (!phone) {

        alert("Please enter patient phone.");
        return;
    }

    if (!caregiver) {

        alert("Please enter caregiver phone.");
        return;
    }

    currentLanguage = language || "en";

    patient = {

        name: name,
        age: age,
        phone: phone,
        caregiver: caregiver,
        language: currentLanguage
    };

    savePatient();

    showWelcomeScreen();

    applyLanguage();
}


// ============================================================
// WELCOME SCREEN
// ============================================================

function showWelcomeScreen() {

    const loginSection =
        document.getElementById("loginSection");

    const welcomeSection =
        document.getElementById("welcomeSection");

    const dashboard =
        document.getElementById("dashboard");

    if (loginSection)
        loginSection.style.display = "none";

    if (welcomeSection)
        welcomeSection.style.display = "block";

    if (dashboard)
        dashboard.style.display = "none";

    const welcomeUser =
        document.getElementById("welcomeUser");

    if (welcomeUser && patient) {

        welcomeUser.textContent =
            patient.name;
    }

    setTimeout(() => {

        showDashboard();

    }, 1800);
}


// ============================================================
// SHOW DASHBOARD
// ============================================================

function showDashboard() {

    const loginSection =
        document.getElementById("loginSection");

    const welcomeSection =
        document.getElementById("welcomeSection");

    const dashboard =
        document.getElementById("dashboard");

    if (loginSection)
        loginSection.style.display = "none";

    if (welcomeSection)
        welcomeSection.style.display = "none";

    if (dashboard)
        dashboard.style.display = "block";

    updatePatientProfile();

    loadMedicines();

    updateClock();

    setInterval(updateClock, 1000);
}


// ============================================================
// PATIENT PROFILE
// ============================================================

function updatePatientProfile() {

    const profile =
        document.getElementById("patientProfile");

    if (!profile || !patient)
        return;

    profile.innerHTML = `
        <strong>${escapeHTML(patient.name)}</strong><br>
        Age: ${escapeHTML(patient.age)}<br>
        Phone: ${escapeHTML(patient.phone)}<br>
        Caregiver: ${escapeHTML(patient.caregiver)}
    `;

    const welcomeText =
        document.getElementById("welcomeText");

    if (welcomeText) {

        welcomeText.textContent =
            `Welcome, ${patient.name}`;
    }
}


// ============================================================
// ADD MEDICINE
// ============================================================

function addMedicine() {

    const name =
        document.getElementById("medicineName").value.trim();

    const dosage =
        document.getElementById("dosage").value.trim();

    const time =
        document.getElementById("medicineTime").value;

    if (!name) {

        alert("Please enter medicine name.");
        return;
    }

    if (!dosage) {

        alert("Please enter dosage.");
        return;
    }

    if (!time) {

        alert("Please select medicine time.");
        return;
    }

    const medicine = {

        id: Date.now(),

        name: name,

        dosage: dosage,

        time: time,

        status: "pending",

        lastTriggered: null,

        date: new Date().toISOString()
    };

    medicines.push(medicine);

    saveMedicines();

    document.getElementById("medicineName").value = "";

    document.getElementById("dosage").value = "";

    document.getElementById("medicineTime").value = "";

    displayMedicines();

    updateDashboard();

    updateNextReminder();

    alert("✅ Medicine added successfully.");
}


// ============================================================
// DISPLAY MEDICINES
// ============================================================

function displayMedicines() {

    const list =
        document.getElementById("medicineList");

    if (!list)
        return;

    list.innerHTML = "";

    if (medicines.length === 0) {

        list.innerHTML = `
            <div class="empty-message">
                ${t("noMedicines")}
            </div>
        `;

        return;
    }

    medicines.forEach((medicine, index) => {

        let statusText = t("pendingStatus");

        if (medicine.status === "taken") {

            statusText = t("takenStatus");

        } else if (medicine.status === "missed") {

            statusText = t("missedStatus");
        }

        const card =
            document.createElement("div");

        card.className = "medicine-item";

        card.innerHTML = `
            <div>
                <strong>${escapeHTML(medicine.name)}</strong>
                <br>
                <small>
                    ${escapeHTML(medicine.dosage)}
                    &nbsp; | &nbsp;
                    ${formatTime(medicine.time)}
                </small>
                <br>
                <span>${statusText}</span>
            </div>

            <div>
                ${
                    medicine.status !== "taken"
                    ?
                    `<button onclick="markTaken(${index})">
                        ✓ ${t("markTaken")}
                    </button>`
                    :
                    `<span>✓ ${t("takenStatus")}</span>`
                }
            </div>
        `;

        list.appendChild(card);
    });
}


// ============================================================
// MARK MEDICINE AS TAKEN
// ============================================================

function markTaken(index) {

    if (!medicines[index])
        return;

    medicines[index].status = "taken";

    medicines[index].takenAt =
        new Date().toISOString();

    stopAlarm();

    clearInterval(reminderLoop);

    reminderLoop = null;

    activeReminder = null;

    saveMedicines();

    displayMedicines();

    updateDashboard();

    updateNextReminder();

    speak(
        getVoiceText(
            "Medicine marked as taken."
        )
    );
}


// ============================================================
// CLOCK
// ============================================================

function updateClock() {

    const clock =
        document.getElementById("clock");

    if (!clock)
        return;

    const now = new Date();

    clock.textContent =
        now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
}


// ============================================================
// MEDICINE TIME CHECKER
// ============================================================

function startReminderSystem() {

    if (reminderCheckInterval)
        clearInterval(reminderCheckInterval);

    checkReminders();

    reminderCheckInterval =
        setInterval(checkReminders, 1000);
}


function checkReminders() {

    if (!medicines || medicines.length === 0)
        return;

    const now = new Date();

    const currentHour =
        String(now.getHours()).padStart(2, "0");

    const currentMinute =
        String(now.getMinutes()).padStart(2, "0");

    const currentTime =
        `${currentHour}:${currentMinute}`;

    medicines.forEach((medicine, index) => {

        if (!medicine.time)
            return;

        if (medicine.status === "taken")
            return;

        if (medicine.status === "missed")
            return;

        if (medicine.time !== currentTime)
            return;

        const today =
            now.toISOString().split("T")[0];

        const triggerKey =
            `${today}_${medicine.time}`;

        if (medicine.lastTriggered === triggerKey)
            return;

        medicine.lastTriggered =
            triggerKey;

        saveMedicines();

        triggerReminder(index);
    });
}


// ============================================================
// TRIGGER REMINDER
// ============================================================

function triggerReminder(index) {

    if (!medicines[index])
        return;

    if (activeReminder === index)
        return;

    activeReminder = index;

    const medicine =
        medicines[index];

    // ==========================================
    // 🔊 PLAY ALARM
    // ==========================================

    playAlarm();

    // ==========================================
    // 🗣️ VOICE
    // ==========================================

    speak(
        getVoiceText(
            `Reminder. Please take your medicine ${medicine.name}, ${medicine.dosage}.`
        )
    );

    // ==========================================
    // REPEAT VOICE EVERY 10 SECONDS
    // ==========================================

    clearInterval(reminderLoop);

    reminderLoop =
        setInterval(() => {

            if (activeReminder === index) {

                speak(
                    getVoiceText(
                        `Reminder. Please take your medicine ${medicine.name}, ${medicine.dosage}.`
                    )
                );
            }

        }, 10000);


    // ==========================================
    // REMINDER POPUP
    // ==========================================

    setTimeout(() => {

        const shouldTake =
            confirm(
                `💊 ${t("reminderTitle")}\n\n` +
                `${medicine.name}\n` +
                `${medicine.dosage}\n` +
                `${formatTime(medicine.time)}\n\n` +
                `${t("reminderText")}\n\n` +
                `Press OK after taking the medicine.`
            );

        if (shouldTake) {

            markTaken(index);

        } else {

            startMissedTimer(index);
        }

    }, 500);
}


// ============================================================
// ALARM PLAY
// ============================================================

function playAlarm() {

    const alarm =
        document.getElementById("alarm");

    if (!alarm)
        return;

    try {

        alarm.pause();

        alarm.currentTime = 0;

        alarm.loop = true;

        const playPromise =
            alarm.play();

        if (playPromise !== undefined) {

            playPromise.catch(error => {

                console.log(
                    "Browser blocked alarm autoplay:",
                    error
                );

                // Fallback browser beep
                browserBeep();
            });
        }

    } catch (error) {

        console.log("Alarm error:", error);

        browserBeep();
    }
}


// ============================================================
// STOP ALARM
// ============================================================

function stopAlarm() {

    const alarm =
        document.getElementById("alarm");

    if (!alarm)
        return;

    try {

        alarm.pause();

        alarm.currentTime = 0;

        alarm.loop = false;

    } catch (error) {

        console.log(error);
    }
}


// ============================================================
// FALLBACK BROWSER BEEP
// ============================================================

function browserBeep() {

    try {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        if (!AudioContext)
            return;

        const context =
            new AudioContext();

        const oscillator =
            context.createOscillator();

        const gain =
            context.createGain();

        oscillator.connect(gain);

        gain.connect(context.destination);

        oscillator.frequency.value = 800;

        gain.gain.value = 0.2;

        oscillator.start();

        oscillator.stop(
            context.currentTime + 0.8
        );

    } catch (error) {

        console.log(
            "Browser beep unavailable"
        );
    }
}


// ============================================================
// MISSED MEDICINE TIMER
// ============================================================

function startMissedTimer(index) {

    const medicine =
        medicines[index];

    if (!medicine)
        return;

    // Stop alarm for now
    stopAlarm();

    // Stop repeating voice
    clearInterval(reminderLoop);

    reminderLoop = null;

    /*
       Wait 60 seconds.

       If medicine is still not marked as taken,
       mark it as missed and notify caregiver.
    */

    setTimeout(() => {

        if (!medicines[index])
            return;

        if (
            medicines[index].status !== "taken"
        ) {

            medicines[index].status = "missed";

            medicines[index].missedAt =
                new Date().toISOString();

            saveMedicines();

            displayMedicines();

            updateDashboard();

            updateNextReminder();

            activeReminder = null;

            sendMissedSMS(medicine);
        }

    }, 60000);
}


// ============================================================
// CAREGIVER SMS
// ============================================================

function sendMissedSMS(medicine) {

    if (!patient)
        return;

    const caregiver =
        patient.caregiver;

    if (!caregiver)
        return;

    const message =
        `MEDICARE AI ALERT: ${patient.name} has not confirmed taking ${medicine.name} (${medicine.dosage}) scheduled at ${formatTime(medicine.time)}.`;

    /*
       Browser SMS link.

       On mobile devices this can open
       the SMS application.
    */

    const smsURL =
        `sms:${caregiver}?body=${encodeURIComponent(message)}`;

    // Ask user before opening SMS
    const send =
        confirm(
            `⚠️ Medicine not confirmed.\n\n` +
            `${medicine.name}\n\n` +
            `Would you like to notify the caregiver?`
        );

    if (send) {

        window.location.href = smsURL;
    }
}


// ============================================================
// CALL CAREGIVER
// ============================================================

function callCaregiver() {

    if (!patient || !patient.caregiver) {

        alert("Caregiver phone number is not available.");

        return;
    }

    window.location.href =
        `tel:${patient.caregiver}`;
}


// ============================================================
// EMERGENCY CALL
// ============================================================

function callAmbulance() {

    const confirmed =
        confirm(
            "Do you want to call emergency services?"
        );

    if (confirmed) {

        window.location.href =
            "tel:108";
    }
}


// ============================================================
// NEXT REMINDER
// ============================================================

function updateNextReminder() {

    const nextReminder =
        document.getElementById("nextReminder");

    if (!nextReminder)
        return;

    const pending =
        medicines.filter(
            medicine =>
                medicine.status !== "taken" &&
                medicine.status !== "missed"
        );

    if (pending.length === 0) {

        nextReminder.textContent =
            `${t("nextReminder")}: --`;

        return;
    }

    const sorted =
        [...pending].sort(
            (a, b) =>
                timeToMinutes(a.time) -
                timeToMinutes(b.time)
        );

    nextReminder.textContent =
        `${t("nextReminder")}: ${formatTime(sorted[0].time)}`;
}


// ============================================================
// DASHBOARD UPDATE
// ============================================================

function updateDashboard() {

    const total =
        medicines.length;

    const taken =
        medicines.filter(
            m => m.status === "taken"
        ).length;

    const missed =
        medicines.filter(
            m => m.status === "missed"
        ).length;

    const adherence =
        total > 0
        ?
        Math.round(
            (taken / total) * 100
        )
        :
        0;


    const totalElement =
        document.getElementById("totalMedicine");

    const takenElement =
        document.getElementById("takenCount");

    const missedElement =
        document.getElementById("missedCount");

    const adherenceElement =
        document.getElementById("adherence");


    if (totalElement)
        totalElement.textContent = total;

    if (takenElement)
        takenElement.textContent = taken;

    if (missedElement)
        missedElement.textContent = missed;

    if (adherenceElement)
        adherenceElement.textContent =
            `${adherence}%`;


    updateReport();
}


// ============================================================
// REPORT
// ============================================================

function updateReport() {

    const total =
        medicines.length;

    const taken =
        medicines.filter(
            m => m.status === "taken"
        ).length;

    const missed =
        medicines.filter(
            m => m.status === "missed"
        ).length;

    const adherence =
        total > 0
        ?
        Math.round(
            (taken / total) * 100
        )
        :
        0;


    const reportTotal =
        document.getElementById("reportTotal");

    const reportTaken =
        document.getElementById("reportTaken");

    const reportMissed =
        document.getElementById("reportMissed");

    const reportAdherence =
        document.getElementById("reportAdherence");


    if (reportTotal)
        reportTotal.textContent = total;

    if (reportTaken)
        reportTaken.textContent = taken;

    if (reportMissed)
        reportMissed.textContent = missed;

    if (reportAdherence)
        reportAdherence.textContent =
            `${adherence}%`;


    const table =
        document.getElementById("reportTable");

    if (!table)
        return;

    table.innerHTML = `
        <tr>
            <th>${t("medicine")}</th>
            <th>${t("dosage")}</th>
            <th>${t("medicineTime")}</th>
            <th>${t("status")}</th>
        </tr>
    `;


    medicines.forEach(medicine => {

        let status =
            t("pendingStatus");

        if (medicine.status === "taken") {

            status =
                t("takenStatus");

        } else if (medicine.status === "missed") {

            status =
                t("missedStatus");
        }

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>${escapeHTML(medicine.name)}</td>
            <td>${escapeHTML(medicine.dosage)}</td>
            <td>${formatTime(medicine.time)}</td>
            <td>${status}</td>
        `;

        table.appendChild(row);
    });
}


// ============================================================
// DOWNLOAD PDF REPORT
// ============================================================

function downloadReport() {

    if (
        !window.jspdf ||
        !window.jspdf.jsPDF
    ) {

        alert(
            "PDF library is not available. Please check your internet connection."
        );

        return;
    }

    const {
        jsPDF
    } = window.jspdf;

    const doc =
        new jsPDF();


    doc.setFontSize(20);

    doc.text(
        "MEDICARE AI - Medication Report",
        20,
        20
    );


    if (patient) {

        doc.setFontSize(12);

        doc.text(
            `Patient: ${patient.name}`,
            20,
            32
        );

        doc.text(
            `Age: ${patient.age}`,
            20,
            40
        );

        doc.text(
            `Phone: ${patient.phone}`,
            20,
            48
        );
    }


    let y = 65;

    doc.text(
        `Total Medicines: ${medicines.length}`,
        20,
        y
    );

    y += 8;

    const taken =
        medicines.filter(
            m => m.status === "taken"
        ).length;

    const missed =
        medicines.filter(
            m => m.status === "missed"
        ).length;

    const adherence =
        medicines.length
        ?
        Math.round(
            (taken / medicines.length) * 100
        )
        :
        0;

    doc.text(
        `Taken: ${taken}`,
        20,
        y
    );

    y += 8;

    doc.text(
        `Missed: ${missed}`,
        20,
        y
    );

    y += 8;

    doc.text(
        `Adherence: ${adherence}%`,
        20,
        y
    );

    y += 15;


    medicines.forEach((medicine, index) => {

        let status =
            medicine.status;

        doc.text(
            `${index + 1}. ${medicine.name}`,
            20,
            y
        );

        y += 7;

        doc.text(
            `Dosage: ${medicine.dosage}`,
            25,
            y
        );

        y += 7;

        doc.text(
            `Time: ${formatTime(medicine.time)}`,
            25,
            y
        );

        y += 7;

        doc.text(
            `Status: ${status}`,
            25,
            y
        );

        y += 12;


        if (y > 270) {

            doc.addPage();

            y = 20;
        }
    });


    doc.save(
        "MEDICARE_AI_Medication_Report.pdf"
    );
}


// ============================================================
// AI / HEALTH MESSAGE
// ============================================================

function updateHealthMessage() {

    const message =
        document.getElementById("healthMessage");

    if (!message)
        return;

    message.textContent =
        t("healthMessage");
}


// ============================================================
// VOICE FUNCTION
// ============================================================

function speak(text) {

    if (
        !("speechSynthesis" in window)
    ) {

        return;
    }

    try {

        window.speechSynthesis.cancel();

        const speech =
            new SpeechSynthesisUtterance(text);

        speech.rate = 0.9;

        speech.pitch = 1;

        speech.volume = 1;

        if (currentLanguage === "ta") {

            speech.lang = "ta-IN";

        } else if (currentLanguage === "hi") {

            speech.lang = "hi-IN";

        } else if (currentLanguage === "te") {

            speech.lang = "te-IN";

        } else {

            speech.lang = "en-IN";
        }

        window.speechSynthesis.speak(
            speech
        );

    } catch (error) {

        console.log(
            "Voice error:",
            error
        );
    }
}


// ============================================================
// LANGUAGE VOICE TEXT
// ============================================================

function getVoiceText(text) {

    if (currentLanguage === "ta") {

        return "மருந்து நினைவூட்டல். தயவுசெய்து உங்கள் மருந்தை எடுத்துக்கொள்ளவும்.";

    }

    if (currentLanguage === "hi") {

        return "दवा रिमाइंडर। कृपया अपनी दवा लें.";

    }

    if (currentLanguage === "te") {

        return "మందు రిమైండర్. దయచేసి మీ మందును తీసుకోండి.";

    }

    return text;
}


// ============================================================
// LANGUAGE CHANGE
// ============================================================

function applyLanguage() {

    const language =
        document.getElementById("language");

    if (language) {

        currentLanguage =
            language.value || currentLanguage;
    }


    if (patient) {

        patient.language =
            currentLanguage;

        savePatient();
    }


    updateLanguageLabels();

    displayMedicines();

    updateDashboard();

    updateNextReminder();

    updateHealthMessage();
}


// ============================================================
// UPDATE LANGUAGE LABELS
// ============================================================

function updateLanguageLabels() {

    const labels =
        document.querySelectorAll(
            ".login-card label"
        );


    labels.forEach(label => {

        const icon =
            label.querySelector("i");

        let key = null;

        const text =
            label.textContent
                .trim()
                .toLowerCase();


        if (
            text.includes("patient name") ||
            text.includes("நோயாளியின் பெயர்") ||
            text.includes("मरीज का नाम") ||
            text.includes("రోగి పేరు")
        ) {

            key = "patientName";

        } else if (
            text.includes("age") ||
            text.includes("வயது") ||
            text.includes("उम्र") ||
            text.includes("వయస్సు")
        ) {

            key = "patientAge";

        } else if (
            text.includes("patient phone") ||
            text.includes("நோயாளி தொலைபேசி") ||
            text.includes("मरीज का फोन") ||
            text.includes("రోగి ఫోన్")
        ) {

            key = "patientPhone";

        } else if (
            text.includes("caregiver") ||
            text.includes("பராமரிப்பாளர்") ||
            text.includes("देखभालकर्ता") ||
            text.includes("సంరక్షక")
        ) {

            key = "caregiverPhone";

        } else if (
            text.includes("language") ||
            text.includes("மொழி") ||
            text.includes("भाषा") ||
            text.includes("భాష")
        ) {

            key = "language";
        }


        if (key) {

            label.innerHTML = "";

            if (icon) {

                label.appendChild(
                    icon.cloneNode(true)
                );
            }

            label.appendChild(
                document.createTextNode(
                    " " + t(key)
                )
            );
        }
    });


    // Login button
    const loginButton =
        document.querySelector(
            '.login-card button[onclick="loginPatient()"]'
        );

    if (loginButton) {

        loginButton.innerHTML =
            `<i class="fas fa-sign-in-alt"></i> ${t("login")}`;
    }


    // Add medicine section
    const sectionTitles =
        document.querySelectorAll(
            ".section-title"
        );

    if (sectionTitles.length >= 1) {

        sectionTitles[0].textContent =
            t("addMedicine");
    }

    if (sectionTitles.length >= 2) {

        sectionTitles[1].textContent =
            t("todaysMedicines");
    }


    // Add Medicine button
    const addButton =
        document.querySelector(
            'button[onclick="addMedicine()"]'
        );

    if (addButton) {

        addButton.innerHTML =
            `<i class="fas fa-plus"></i> ${t("addMedicineButton")}`;
    }


    // Caregiver button
    const caregiverButton =
        document.querySelector(
            'button[onclick="callCaregiver()"]'
        );

    if (caregiverButton) {

        caregiverButton.innerHTML =
            `<i class="fas fa-phone"></i> ${t("callCaregiver")}`;
    }


    // Emergency button
    const emergencyButton =
        document.querySelector(
            'button[onclick="callAmbulance()"]'
        );

    if (emergencyButton) {

        emergencyButton.innerHTML =
            `<i class="fas fa-ambulance"></i> ${t("callAmbulance")}`;
    }


    // Download report
    const reportButton =
        document.querySelector(
            'button[onclick="downloadReport()"]'
        );

    if (reportButton) {

        reportButton.innerHTML =
            `<i class="fas fa-download"></i> ${t("downloadReport")}`;
    }


    // Stats
    const totalCard =
        document.querySelector(
            ".dashboard-card.total h3"
        );

    if (totalCard) {

        // Keep number intact
    }


    // Update buttons containing logout
    const allButtons =
        document.querySelectorAll("button");

    allButtons.forEach(button => {

        const text =
            button.textContent.trim().toLowerCase();

        if (
            text === "logout" ||
            text === "வெளியேறு" ||
            text === "लॉगआउट" ||
            text === "లాగ్ అవుట్"
        ) {

            button.innerHTML =
                `<i class="fas fa-sign-out-alt"></i> ${t("logout")}`;
        }
    });
}


// ============================================================
// DARK MODE
// ============================================================

function toggleDarkMode() {

    document.body.classList.toggle(
        "dark-mode"
    );
}


// ============================================================
// LOGOUT
// ============================================================

function logout() {

    stopAlarm();

    clearInterval(reminderLoop);

    clearInterval(reminderCheckInterval);

    reminderLoop = null;

    reminderCheckInterval = null;

    activeReminder = null;

    localStorage.removeItem(
        "medicarePatient"
    );

    patient = null;

    const loginSection =
        document.getElementById("loginSection");

    const welcomeSection =
        document.getElementById("welcomeSection");

    const dashboard =
        document.getElementById("dashboard");


    if (loginSection)
        loginSection.style.display = "block";

    if (welcomeSection)
        welcomeSection.style.display = "none";

    if (dashboard)
        dashboard.style.display = "none";


    alert(
        t("patientLoggedOut")
    );
}


// ============================================================
// FORMAT TIME
// ============================================================

function formatTime(time) {

    if (!time)
        return "--";

    const parts =
        time.split(":");

    if (parts.length < 2)
        return time;

    let hour =
        parseInt(parts[0]);

    const minute =
        parts[1];

    const period =
        hour >= 12
        ?
        "PM"
        :
        "AM";

    hour =
        hour % 12 || 12;

    return `${hour}:${minute} ${period}`;
}


// ============================================================
// TIME TO MINUTES
// ============================================================

function timeToMinutes(time) {

    if (!time)
        return 9999;

    const parts =
        time.split(":");

    return (
        parseInt(parts[0]) * 60 +
        parseInt(parts[1])
    );
}


// ============================================================
// ESCAPE HTML
// ============================================================

function escapeHTML(value) {

    if (value === undefined || value === null)
        return "";

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// ============================================================
// INITIALIZATION
// ============================================================

window.onload = function () {

    // Load patient
    loadPatient();

    // Load language
    if (patient && patient.language) {

        currentLanguage =
            patient.language;
    }


    // Language selector
    const language =
        document.getElementById("language");

    if (language) {

        language.value =
            currentLanguage;

        language.addEventListener(
            "change",
            applyLanguage
        );
    }


    // Initial language
    applyLanguage();


    // Start reminder checker
    startReminderSystem();


    // ==========================================
    // UNLOCK AUDIO AFTER USER INTERACTION
    // ==========================================

    document.addEventListener(
        "click",
        unlockAlarmAudio,
        {
            once: true
        }
    );


    // ==========================================
    // AUTO LOGIN
    // ==========================================

    if (patient) {

        showWelcomeScreen();
    }
};


// ============================================================
// UNLOCK ALARM AUDIO
// ============================================================

function unlockAlarmAudio() {

    const alarm =
        document.getElementById("alarm");

    if (!alarm)
        return;

    try {

        alarm.load();

    } catch (error) {

        console.log(
            "Audio initialization error:",
            error
        );
    }
};
