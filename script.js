// =====================================================
// MEDICARE AI - MEDICATION REMINDER
// Regional Language Voice Version
// English / Tamil / Hindi / Telugu
// =====================================================

let medicines = [];
let activeReminder = null;
let reminderLoop = null;

let patientName = "";
let patientPhone = "";
let selectedLanguage = "en";


// =====================================================
// TRANSLATIONS
// =====================================================

const translations = {

    en: {
        subtitle: "AI Powered Healthcare Assistant",
        aiMonitoring: "AI Monitoring Online",

        medicineName: "Medicine Name",
        dosage: "Dosage",
        time: "Time",
        addMedicine: "Add Medicine",

        medicineAdded: "Medicine added successfully",
        medicineTaken: "Medicine marked as taken",
        medicineDeleted: "Medicine deleted",

        takeMedicine: "It is time to take",
        missedMedicine: "You missed your medicine",
        taken: "Taken",
        pending: "Pending",
        missed: "Missed",

        noMedicine: "No medicines added yet",

        nextReminder: "Next Reminder",
        noUpcoming: "No upcoming reminders",

        caregiver: "Caregiver",
        caregiverNumber: "Caregiver Phone Number",
        saveCaregiver: "Save Caregiver",

        report: "Medication Report",
        generateReport: "Generate Report",

        logout: "Logout",

        voiceReady: "Voice Ready",
        voiceLanguage: "Voice Language"
    },

    ta: {
        subtitle: "AI இயக்கும் சுகாதார உதவியாளர்",
        aiMonitoring: "AI கண்காணிப்பு இயங்குகிறது",

        medicineName: "மருந்தின் பெயர்",
        dosage: "அளவு",
        time: "நேரம்",
        addMedicine: "மருந்தைச் சேர்க்கவும்",

        medicineAdded: "மருந்து வெற்றிகரமாக சேர்க்கப்பட்டது",
        medicineTaken: "மருந்து எடுத்ததாக பதிவு செய்யப்பட்டது",
        medicineDeleted: "மருந்து நீக்கப்பட்டது",

        takeMedicine: "மருந்தை எடுத்துக்கொள்ளும் நேரம் வந்துவிட்டது",
        missedMedicine: "மருந்தை எடுத்துக்கொள்ள தவறிவிட்டீர்கள்",
        taken: "எடுத்துக்கொண்டது",
        pending: "நிலுவையில்",
        missed: "தவறியது",

        noMedicine: "மருந்துகள் எதுவும் சேர்க்கப்படவில்லை",

        nextReminder: "அடுத்த நினைவூட்டல்",
        noUpcoming: "அடுத்த நினைவூட்டல்கள் இல்லை",

        caregiver: "பராமரிப்பாளர்",
        caregiverNumber: "பராமரிப்பாளர் தொலைபேசி எண்",
        saveCaregiver: "பராமரிப்பாளரை சேமிக்கவும்",

        report: "மருந்து அறிக்கை",
        generateReport: "அறிக்கையை உருவாக்கவும்",

        logout: "வெளியேறு",

        voiceReady: "குரல் தயார்",
        voiceLanguage: "குரல் மொழி"
    },

    hi: {
        subtitle: "AI संचालित स्वास्थ्य सहायक",
        aiMonitoring: "AI निगरानी ऑनलाइन",

        medicineName: "दवा का नाम",
        dosage: "खुराक",
        time: "समय",
        addMedicine: "दवा जोड़ें",

        medicineAdded: "दवा सफलतापूर्वक जोड़ी गई",
        medicineTaken: "दवा लेने के रूप में दर्ज किया गया",
        medicineDeleted: "दवा हटा दी गई",

        takeMedicine: "दवा लेने का समय हो गया है",
        missedMedicine: "आप अपनी दवा लेना भूल गए हैं",
        taken: "लिया गया",
        pending: "लंबित",
        missed: "छूटी हुई",

        noMedicine: "अभी तक कोई दवा नहीं जोड़ी गई",

        nextReminder: "अगला रिमाइंडर",
        noUpcoming: "कोई आगामी रिमाइंडर नहीं",

        caregiver: "देखभालकर्ता",
        caregiverNumber: "देखभालकर्ता फोन नंबर",
        saveCaregiver: "देखभालकर्ता सेव करें",

        report: "दवा रिपोर्ट",
        generateReport: "रिपोर्ट बनाएं",

        logout: "लॉगआउट",

        voiceReady: "आवाज़ तैयार",
        voiceLanguage: "आवाज़ की भाषा"
    },

    te: {
        subtitle: "AI ఆధారిత ఆరోగ్య సహాయకుడు",
        aiMonitoring: "AI పర్యవేక్షణ ఆన్‌లైన్‌లో ఉంది",

        medicineName: "మందు పేరు",
        dosage: "మోతాదు",
        time: "సమయం",
        addMedicine: "మందును జోడించండి",

        medicineAdded: "మందు విజయవంతంగా జోడించబడింది",
        medicineTaken: "మందు తీసుకున్నట్లు నమోదు చేయబడింది",
        medicineDeleted: "మందు తొలగించబడింది",

        takeMedicine: "మందు తీసుకునే సమయం వచ్చింది",
        missedMedicine: "మీరు మందు తీసుకోవడం మర్చిపోయారు",
        taken: "తీసుకున్నారు",
        pending: "పెండింగ్",
        missed: "మిస్ అయింది",

        noMedicine: "ఇంకా మందులు జోడించలేదు",

        nextReminder: "తదుపరి రిమైండర్",
        noUpcoming: "తదుపరి రిమైండర్లు లేవు",

        caregiver: "సంరక్షకుడు",
        caregiverNumber: "సంరక్షకుడి ఫోన్ నంబర్",
        saveCaregiver: "సంరక్షకుడిని సేవ్ చేయండి",

        report: "మందుల నివేదిక",
        generateReport: "నివేదికను రూపొందించండి",

        logout: "లాగ్ అవుట్",

        voiceReady: "వాయిస్ సిద్ధంగా ఉంది",
        voiceLanguage: "వాయిస్ భాష"
    }
};


// =====================================================
// GET LANGUAGE
// =====================================================

function getLanguage() {

    const selector =
        document.getElementById("language") ||
        document.getElementById("languageSelect") ||
        document.querySelector("[data-language]");

    if (selector && selector.value) {
        selectedLanguage = selector.value;
    }

    return selectedLanguage;
}


// =====================================================
// CHANGE LANGUAGE
// =====================================================

function changeLanguage(lang) {

    selectedLanguage = lang;

    localStorage.setItem(
        "medicare_language",
        lang
    );

    applyLanguage(lang);

    updateVoiceStatus();
}


// =====================================================
// APPLY WEBSITE LANGUAGE
// =====================================================

function applyLanguage(lang) {

    const t = translations[lang] || translations.en;

    document.querySelectorAll("[data-translate]")
        .forEach(element => {

            const key =
                element.getAttribute("data-translate");

            if (t[key]) {
                element.textContent = t[key];
            }
        });

    document.querySelectorAll("[data-placeholder]")
        .forEach(element => {

            const key =
                element.getAttribute("data-placeholder");

            if (t[key]) {
                element.placeholder = t[key];
            }
        });
}


// =====================================================
// LOGIN
// =====================================================

function login() {

    const nameInput =
        document.getElementById("patientName");

    const phoneInput =
        document.getElementById("patientPhone");

    patientName =
        nameInput ? nameInput.value.trim() : "";

    patientPhone =
        phoneInput ? phoneInput.value.trim() : "";

    if (!patientName) {
        patientName = "Patient";
    }

    localStorage.setItem(
        "medicare_patient_name",
        patientName
    );

    localStorage.setItem(
        "medicare_patient_phone",
        patientPhone
    );

    loadMedicines();

    const loginPage =
        document.getElementById("loginPage");

    const appPage =
        document.getElementById("appPage");

    if (loginPage) {
        loginPage.style.display = "none";
    }

    if (appPage) {
        appPage.style.display = "block";
    }

    startReminderChecker();

    updateDashboard();

    // Unlock normal browser audio interaction
    unlockBrowser();

}


// =====================================================
// BROWSER UNLOCK
// =====================================================

let browserUnlocked = false;

function unlockBrowser() {

    browserUnlocked = true;

    // Small silent speech attempt
    // This is only to initialize browser media.
    if ("speechSynthesis" in window) {

        try {

            speechSynthesis.cancel();

        } catch (error) {}

    }
}


// =====================================================
// REGIONAL VOICE STATUS
// =====================================================

function getVoiceLanguageCode() {

    const lang = getLanguage();

    if (lang === "ta") return "ta";
    if (lang === "hi") return "hi";
    if (lang === "te") return "te";

    return "en";
}


function getVoiceStatusText() {

    const lang = getVoiceLanguageCode();

    if (lang === "ta") {
        return "Tamil Voice Ready";
    }

    if (lang === "hi") {
        return "Hindi Voice Ready";
    }

    if (lang === "te") {
        return "Telugu Voice Ready";
    }

    return "English Voice Ready";
}


function updateVoiceStatus() {

    const element =
        document.getElementById("voiceStatus");

    if (element) {

        element.textContent =
            "✓ " + getVoiceStatusText();

        element.style.color = "green";
    }
}


// =====================================================
// GOOGLE TRANSLATE TTS
// =====================================================

function speakRegionalVoice(text) {

    if (!text) return;

    const language =
        getVoiceLanguageCode();

    console.log(
        "MEDICARE AI Voice:",
        language,
        text
    );


    // =================================================
    // ENGLISH
    // =================================================

    if (language === "en") {

        speakBrowserEnglish(text);

        return;
    }


    // =================================================
    // REGIONAL LANGUAGE
    // =================================================

    try {

        const encodedText =
            encodeURIComponent(text);

        const audioURL =
            "https://translate.google.com/translate_tts" +
            "?ie=UTF-8" +
            "&client=tw-ob" +
            "&tl=" + language +
            "&q=" + encodedText;


        const audio =
            new Audio(audioURL);

        audio.volume = 1;

        audio.play()
            .then(() => {

                console.log(
                    "Regional voice started:",
                    language
                );

            })
            .catch(error => {

                console.log(
                    "Regional audio blocked:",
                    error
                );

                // Fallback to browser TTS
                speakBrowserRegional(text);

            });

    } catch (error) {

        console.log(
            "Regional TTS error:",
            error
        );

        speakBrowserRegional(text);
    }
}


// =====================================================
// BROWSER REGIONAL FALLBACK
// =====================================================

function speakBrowserRegional(text) {

    if (!("speechSynthesis" in window)) {

        alert(
            "Voice is not supported by this browser."
        );

        return;
    }

    let lang = "en-IN";

    if (selectedLanguage === "ta") {
        lang = "ta-IN";
    }

    if (selectedLanguage === "hi") {
        lang = "hi-IN";
    }

    if (selectedLanguage === "te") {
        lang = "te-IN";
    }


    const utterance =
        new SpeechSynthesisUtterance(text);

    utterance.lang = lang;

    utterance.rate = 0.8;

    utterance.pitch = 1;

    utterance.volume = 1;


    speechSynthesis.cancel();

    speechSynthesis.resume();

    speechSynthesis.speak(utterance);
}


// =====================================================
// ENGLISH BROWSER VOICE
// =====================================================

function speakBrowserEnglish(text) {

    if (!("speechSynthesis" in window)) {

        return;
    }

    const utterance =
        new SpeechSynthesisUtterance(text);

    utterance.lang = "en-IN";

    utterance.rate = 0.85;

    utterance.pitch = 1;

    utterance.volume = 1;


    speechSynthesis.cancel();

    speechSynthesis.resume();

    speechSynthesis.speak(utterance);
}


// =====================================================
// TEST REGIONAL VOICE
// =====================================================

function testRegionalVoice() {

    const lang =
        getLanguage();

    let text = "";

    if (lang === "ta") {

        text =
            "வணக்கம். இது மெடிகேர் AI தமிழ் குரல் சோதனை. பாராசிட்டமால் மருந்தை எடுத்துக்கொள்ளும் நேரம் வந்துவிட்டது.";

    } else if (lang === "hi") {

        text =
            "नमस्ते। यह मेडिकेयर एआई हिंदी आवाज़ परीक्षण है। पैरासिटामोल दवा लेने का समय हो गया है।";

    } else if (lang === "te") {

        text =
            "నమస్కారం. ఇది మెడికేర్ ఏఐ తెలుగు వాయిస్ పరీక్ష. పారాసిటామాల్ మందు తీసుకునే సమయం వచ్చింది.";

    } else {

        text =
            "Hello. This is the MEDICARE AI voice test. It is time to take your medicine.";
    }


    speakRegionalVoice(text);
}


// =====================================================
// ADD MEDICINE
// =====================================================

function addMedicine() {

    const nameInput =
        document.getElementById("medicineName");

    const dosageInput =
        document.getElementById("dosage");

    const timeInput =
        document.getElementById("medicineTime") ||
        document.getElementById("time");


    if (!nameInput || !timeInput) {

        console.log(
            "Medicine input fields not found."
        );

        return;
    }


    const name =
        nameInput.value.trim();

    const dosage =
        dosageInput ?
        dosageInput.value.trim() :
        "";


    const time =
        timeInput.value;


    if (!name) {

        alert(
            "Please enter medicine name."
        );

        return;
    }


    if (!time) {

        alert(
            "Please select medicine time."
        );

        return;
    }


    const medicine = {

        id: Date.now(),

        name: name,

        dosage: dosage,

        time: time,

        status: "pending",

        createdAt:
            new Date().toISOString(),

        takenAt: null,

        missedAt: null
    };


    medicines.push(medicine);

    saveMedicines();

    renderMedicines();

    updateDashboard();

    updateNextReminder();


    nameInput.value = "";

    if (dosageInput) {
        dosageInput.value = "";
    }


    alert(
        translations[getLanguage()].medicineAdded
    );
}


// =====================================================
// SAVE MEDICINES
// =====================================================

function saveMedicines() {

    localStorage.setItem(

        "medicines_" +
        patientPhone,

        JSON.stringify(medicines)

    );
}


// =====================================================
// LOAD MEDICINES
// =====================================================

function loadMedicines() {

    const data =
        localStorage.getItem(
            "medicines_" + patientPhone
        );


    if (data) {

        try {

            medicines =
                JSON.parse(data);

        } catch (error) {

            medicines = [];
        }

    } else {

        medicines = [];
    }


    renderMedicines();

    updateDashboard();

    updateNextReminder();
}


// =====================================================
// RENDER MEDICINES
// =====================================================

function renderMedicines() {

    const container =
        document.getElementById("medicineList") ||
        document.getElementById("medicinesList");


    if (!container) return;


    if (!medicines.length) {

        container.innerHTML =
            `<p>${translations[getLanguage()].noMedicine}</p>`;

        return;
    }


    container.innerHTML = medicines
        .sort((a, b) =>
            a.time.localeCompare(b.time)
        )
        .map(medicine => {

            let statusClass =
                medicine.status || "pending";

            let statusText =
                translations[getLanguage()][
                    statusClass
                ] || statusClass;


            return `

                <div
                    class="medicine-card ${statusClass}"
                    data-id="${medicine.id}"
                >

                    <div>

                        <h3>
                            ${escapeHTML(medicine.name)}
                        </h3>

                        <p>
                            ${escapeHTML(medicine.dosage || "")}
                        </p>

                        <p>
                            ⏰ ${medicine.time}
                        </p>

                        <p>
                            ${statusText}
                        </p>

                    </div>


                    <div>

                        ${
                            medicine.status !== "taken"
                            ?
                            `
                            <button
                                onclick="markTaken(${medicine.id})"
                            >
                                ${translations[getLanguage()].taken}
                            </button>
                            `
                            :
                            ""
                        }


                        <button
                            onclick="deleteMedicine(${medicine.id})"
                        >
                            🗑
                        </button>

                    </div>

                </div>
            `;
        })
        .join("");
}


// =====================================================
// ESCAPE HTML
// =====================================================

function escapeHTML(value) {

    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// =====================================================
// DASHBOARD
// =====================================================

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

    const pending =
        medicines.filter(
            m => m.status === "pending"
        ).length;


    const totalElement =
        document.getElementById("totalMedicines");

    const takenElement =
        document.getElementById("takenMedicines");

    const missedElement =
        document.getElementById("missedMedicines");

    const pendingElement =
        document.getElementById("pendingMedicines");


    if (totalElement)
        totalElement.textContent = total;

    if (takenElement)
        takenElement.textContent = taken;

    if (missedElement)
        missedElement.textContent = missed;

    if (pendingElement)
        pendingElement.textContent = pending;
}


// =====================================================
// NEXT REMINDER
// =====================================================

function updateNextReminder() {

    const element =
        document.getElementById("nextReminder");

    if (!element) return;


    const pending =
        medicines
            .filter(m => m.status === "pending")
            .sort((a, b) =>
                a.time.localeCompare(b.time)
            );


    if (!pending.length) {

        element.textContent =
            translations[getLanguage()].noUpcoming;

        return;
    }


    element.textContent =
        `${pending[0].name} - ${pending[0].time}`;
}


// =====================================================
// REMINDER CHECKER
// =====================================================

function startReminderChecker() {

    if (reminderLoop) {

        clearInterval(reminderLoop);
    }


    // Check every 5 seconds
    reminderLoop =
        setInterval(
            checkMedicationReminder,
            5000
        );


    checkMedicationReminder();
}


// =====================================================
// CHECK REMINDER
// =====================================================

function checkMedicationReminder() {

    const now =
        new Date();


    const currentHours =
        String(now.getHours())
            .padStart(2, "0");


    const currentMinutes =
        String(now.getMinutes())
            .padStart(2, "0");


    const currentTime =
        `${currentHours}:${currentMinutes}`;


    medicines.forEach(medicine => {

        if (
            medicine.time === currentTime &&
            medicine.status === "pending"
        ) {

            if (
                activeReminder !== medicine.id
            ) {

                triggerReminder(medicine);
            }

        }

    });
}


// =====================================================
// TRIGGER REMINDER
// =====================================================

function triggerReminder(medicine) {

    activeReminder =
        medicine.id;


    const lang =
        getLanguage();


    let message = "";


    // IMPORTANT:
    // Medicine name is spoken EXACTLY
    // as entered by the user.

    const spokenMedicineName =
        String(medicine.name || "")
            .trim();


    if (lang === "ta") {

        message =
            `வணக்கம் ${patientName}. ${spokenMedicineName} மருந்தை எடுத்துக்கொள்ளும் நேரம் வந்துவிட்டது.`;

    }

    else if (lang === "hi") {

        message =
            `नमस्ते ${patientName}। ${spokenMedicineName} दवा लेने का समय हो गया है।`;

    }

    else if (lang === "te") {

        message =
            `నమస్కారం ${patientName}. ${spokenMedicineName} మందు తీసుకునే సమయం వచ్చింది.`;

    }

    else {

        message =
            `Hello ${patientName}. It is time to take ${spokenMedicineName}.`;
    }


    showVisualReminder(medicine);


    // NO BUZZER
    // ONLY VOICE

    speakRegionalVoice(message);


    // Repeat after 10 seconds
    setTimeout(() => {

        if (
            medicine.status === "pending"
        ) {

            speakRegionalVoice(message);
        }

    }, 10000);


    // Mark missed after 60 seconds
    setTimeout(() => {

        const currentMedicine =
            medicines.find(
                m => m.id === medicine.id
            );


        if (
            currentMedicine &&
            currentMedicine.status === "pending"
        ) {

            currentMedicine.status =
                "missed";

            currentMedicine.missedAt =
                new Date().toISOString();


            saveMedicines();

            renderMedicines();

            updateDashboard();

            speakMissedReminder(
                currentMedicine
            );

            sendCaregiverSMS(
                currentMedicine
            );
        }


        if (
            activeReminder === medicine.id
        ) {

            activeReminder = null;
        }

    }, 60000);
}


// =====================================================
// VISUAL REMINDER
// =====================================================

function showVisualReminder(medicine) {

    const card =
        document.querySelector(
            `[data-id="${medicine.id}"]`
        );


    if (card) {

        card.classList.add(
            "reminder-active"
        );


        setTimeout(() => {

            card.classList.remove(
                "reminder-active"
            );

        }, 15000);
    }


    // Accessibility vibration
    if (
        "vibrate" in navigator
    ) {

        try {

            navigator.vibrate([
                500,
                200,
                500
            ]);

        } catch (error) {}
    }
}


// =====================================================
// STOP ACTIVE REMINDER
// =====================================================

function stopActiveReminder() {

    activeReminder = null;

    if (
        "speechSynthesis" in window
    ) {

        speechSynthesis.cancel();
    }
}


// =====================================================
// MARK TAKEN
// =====================================================

function markTaken(id) {

    const medicine =
        medicines.find(
            m => m.id === id
        );


    if (!medicine) return;


    medicine.status =
        "taken";


    medicine.takenAt =
        new Date().toISOString();


    saveMedicines();

    renderMedicines();

    updateDashboard();

    updateNextReminder();


    stopActiveReminder();


    const lang =
        getLanguage();


    let message = "";


    if (lang === "ta") {

        message =
            `${medicine.name} மருந்து எடுத்துக்கொள்ளப்பட்டது.`;

    }

    else if (lang === "hi") {

        message =
            `${medicine.name} दवा ले ली गई है।`;

    }

    else if (lang === "te") {

        message =
            `${medicine.name} మందు తీసుకున్నారు.`;

    }

    else {

        message =
            `${medicine.name} medicine marked as taken.`;
    }


    speakRegionalVoice(message);
}


// =====================================================
// DELETE MEDICINE
// =====================================================

function deleteMedicine(id) {

    medicines =
        medicines.filter(
            m => m.id !== id
        );


    saveMedicines();

    renderMedicines();

    updateDashboard();

    updateNextReminder();
}


// =====================================================
// MISSED REMINDER VOICE
// =====================================================

function speakMissedReminder(medicine) {

    const lang =
        getLanguage();


    let message = "";


    if (lang === "ta") {

        message =
            `எச்சரிக்கை. ${medicine.name} மருந்தை எடுத்துக்கொள்ள தவறிவிட்டீர்கள்.`;

    }

    else if (lang === "hi") {

        message =
            `चेतावनी। आपने ${medicine.name} दवा लेना भूल गए हैं।`;

    }

    else if (lang === "te") {

        message =
            `హెచ్చరిక. మీరు ${medicine.name} మందు తీసుకోవడం మర్చిపోయారు.`;

    }

    else {

        message =
            `Warning. You missed your ${medicine.name} medicine.`;
    }


    speakRegionalVoice(message);
}


// =====================================================
// CAREGIVER SMS
// =====================================================

function sendCaregiverSMS(medicine) {

    const caregiver =
        localStorage.getItem(
            "medicare_caregiver"
        );


    if (!caregiver) {

        return;
    }


    const message =
        `MEDICARE AI ALERT: ${patientName} missed medicine ${medicine.name} at ${medicine.time}.`;


    const smsURL =
        `sms:${caregiver}?body=${encodeURIComponent(message)}`;


    // Opens SMS application on supported devices
    window.location.href =
        smsURL;
}


// =====================================================
// SAVE CAREGIVER
// =====================================================

function saveCaregiver() {

    const input =
        document.getElementById(
            "caregiverPhone"
        );


    if (!input) return;


    const number =
        input.value.trim();


    if (!number) {

        alert(
            "Please enter caregiver phone number."
        );

        return;
    }


    localStorage.setItem(
        "medicare_caregiver",
        number
    );


    alert(
        translations[getLanguage()].caregiver +
        " saved successfully."
    );
}


// =====================================================
// LOAD CAREGIVER
// =====================================================

function loadCaregiver() {

    const number =
        localStorage.getItem(
            "medicare_caregiver"
        );


    const input =
        document.getElementById(
            "caregiverPhone"
        );


    if (
        input &&
        number
    ) {

        input.value = number;
    }
}


// =====================================================
// CALL CAREGIVER
// =====================================================

function callCaregiver() {

    const number =
        localStorage.getItem(
            "medicare_caregiver"
        );


    if (!number) {

        alert(
            "Please save caregiver number first."
        );

        return;
    }


    window.location.href =
        `tel:${number}`;
}


// =====================================================
// EMERGENCY CALL
// =====================================================

function callAmbulance() {

    window.location.href =
        "tel:108";
}


// =====================================================
// LOG
// =====================================================

function addLog(message) {

    console.log(
        "[MEDICARE AI]",
        message
    );
}


// =====================================================
// MEDICATION REPORT
// =====================================================

function generateMedicationReport() {

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

    const pending =
        medicines.filter(
            m => m.status === "pending"
        ).length;


    let reportHTML = `

        <html>

        <head>

            <meta charset="UTF-8">

            <title>
                MEDICARE AI Medication Report
            </title>

            <style>

                body {
                    font-family: Arial, sans-serif;
                    padding: 30px;
                }

                h1 {
                    text-align: center;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }

                th, td {
                    border: 1px solid #999;
                    padding: 10px;
                    text-align: left;
                }

                th {
                    background: #eeeeee;
                }

            </style>

        </head>

        <body>

            <h1>
                MEDICARE AI
            </h1>

            <h2>
                Medication Report
            </h2>

            <p>
                Patient:
                ${escapeHTML(patientName)}
            </p>

            <p>
                Total Medicines:
                ${total}
            </p>

            <p>
                Taken:
                ${taken}
            </p>

            <p>
                Missed:
                ${missed}
            </p>

            <p>
                Pending:
                ${pending}
            </p>


            <table>

                <tr>
                    <th>Medicine</th>
                    <th>Dosage</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Action Time</th>
                </tr>

                ${
                    medicines.map(m => {

                        return `

                            <tr>

                                <td>
                                    ${escapeHTML(m.name)}
                                </td>

                                <td>
                                    ${escapeHTML(m.dosage)}
                                </td>

                                <td>
                                    ${m.time}
                                </td>

                                <td>
                                    ${m.status}
                                </td>

                                <td>
                                    ${
                                        m.takenAt
                                        ?
                                        new Date(
                                            m.takenAt
                                        ).toLocaleString()
                                        :
                                        "-"
                                    }
                                </td>

                            </tr>

                        `;

                    }).join("")
                }

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
            "Please allow popups for the report."
        );

        return;
    }


    reportWindow.document.write(
        reportHTML
    );

    reportWindow.document.close();


    setTimeout(() => {

        reportWindow.print();

    }, 500);
}


// =====================================================
// LOGOUT
// =====================================================

function logout() {

    stopActiveReminder();


    if (reminderLoop) {

        clearInterval(
            reminderLoop
        );

        reminderLoop = null;
    }


    const appPage =
        document.getElementById("appPage");

    const loginPage =
        document.getElementById("loginPage");


    if (appPage) {

        appPage.style.display =
            "none";
    }


    if (loginPage) {

        loginPage.style.display =
            "block";
    }
}


// =====================================================
// INITIALIZATION
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        selectedLanguage =
            localStorage.getItem(
                "medicare_language"
            ) || "en";


        patientName =
            localStorage.getItem(
                "medicare_patient_name"
            ) || "";


        patientPhone =
            localStorage.getItem(
                "medicare_patient_phone"
            ) || "";


        applyLanguage(
            selectedLanguage
        );


        loadMedicines();

        loadCaregiver();

        updateVoiceStatus();


        // Start reminder checking
        startReminderChecker();


        // Test voice only from an actual user interaction
        document.addEventListener(
            "click",
            () => {

                browserUnlocked = true;

            },
            {
                once: true
            }
        );

    }
);
