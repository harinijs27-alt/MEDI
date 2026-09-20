```javascript
// ============================================================
// JS MEDICARE - MEDICATION REMINDER
// Regional Language Text-to-Speech
// ============================================================

let medicines = [];
let activeReminder = null;
let reminderLoop = null;
let voices = [];


// ============================================================
// LANGUAGE CONFIGURATION
// ============================================================

const languageConfig = {

    en: {
        code: "en-IN",

        reminder: (name) =>
            `It is time to take your medicine ${name}`,

        taken: (name) =>
            `${name} has been marked as taken`,

        missed: (name) =>
            `${name} has been missed`
    },

    ta: {
        code: "ta-IN",

        reminder: (name) =>
            `உங்கள் மருந்து ${name} எடுத்துக்கொள்ளும் நேரம் இது`,

        taken: (name) =>
            `${name} மருந்து எடுத்துக்கொண்டதாக குறிக்கப்பட்டுள்ளது`,

        missed: (name) =>
            `${name} மருந்து தவறிவிட்டது`
    },

    hi: {
        code: "hi-IN",

        reminder: (name) =>
            `आपकी दवा ${name} लेने का समय हो गया है`,

        taken: (name) =>
            `${name} दवा लेने के रूप में चिह्नित की गई है`,

        missed: (name) =>
            `${name} दवा छूट गई है`
    },

    te: {
        code: "te-IN",

        reminder: (name) =>
            `మీ మందు ${name} వేసుకునే సమయం వచ్చింది`,

        taken: (name) =>
            `${name} మందు తీసుకున్నట్లు గుర్తించబడింది`,

        missed: (name) =>
            `${name} మందు మిస్ అయింది`
    },

    kn: {
        code: "kn-IN",

        reminder: (name) =>
            `ನಿಮ್ಮ ಔಷಧಿ ${name} ತೆಗೆದುಕೊಳ್ಳುವ ಸಮಯ ಬಂದಿದೆ`,

        taken: (name) =>
            `${name} ಔಷಧಿಯನ್ನು ತೆಗೆದುಕೊಂಡಂತೆ ಗುರುತಿಸಲಾಗಿದೆ`,

        missed: (name) =>
            `${name} ಔಷಧಿ ತಪ್ಪಿಹೋಗಿದೆ`
    },

    ml: {
        code: "ml-IN",

        reminder: (name) =>
            `നിങ്ങളുടെ മരുന്ന് ${name} കഴിക്കേണ്ട സമയമായി`,

        taken: (name) =>
            `${name} മരുന്ന് കഴിച്ചതായി അടയാളപ്പെടുത്തിയിരിക്കുന്നു`,

        missed: (name) =>
            `${name} മരുന്ന് കഴിക്കാൻ വിട്ടുപോയി`
    }
};


// ============================================================
// LOAD TTS VOICES
// ============================================================

function loadVoices() {

    voices = window.speechSynthesis.getVoices();

    console.log("Available TTS voices:", voices);

}


// Some Android browsers load voices after page loading
if ("speechSynthesis" in window) {

    speechSynthesis.onvoiceschanged = loadVoices;

    loadVoices();
}


// ============================================================
// GET SELECTED LANGUAGE
// ============================================================

function getSelectedLanguage() {

    const dashboardLanguage =
        document.getElementById("dashboardLanguage");

    const loginLanguage =
        document.getElementById("languageSelect");

    if (dashboardLanguage && dashboardLanguage.value) {

        return dashboardLanguage.value;

    }

    if (loginLanguage && loginLanguage.value) {

        return loginLanguage.value;

    }

    return "en";
}


// ============================================================
// FIND BEST VOICE
// ============================================================

function getBestVoice(languageCode) {

    if (!voices || voices.length === 0) {

        voices = speechSynthesis.getVoices();

    }

    if (!voices || voices.length === 0) {

        return null;

    }


    const exactMatch =
        voices.find(voice =>
            voice.lang &&
            voice.lang.toLowerCase() ===
            languageCode.toLowerCase()
        );

    if (exactMatch) {

        return exactMatch;

    }


    const languageOnly =
        languageCode.split("-")[0].toLowerCase();

    const languageMatch =
        voices.find(voice =>
            voice.lang &&
            voice.lang.toLowerCase().startsWith(languageOnly)
        );

    if (languageMatch) {

        return languageMatch;

    }


    return null;
}


// ============================================================
// SPEAK FUNCTION
// ============================================================

function speak(text, language = null) {

    if (!("speechSynthesis" in window)) {

        console.log("Speech synthesis is not supported.");

        updateVoiceStatus(
            "❌ Text-to-speech is not supported on this browser."
        );

        return;

    }


    const selectedLanguage =
        language || getSelectedLanguage();


    const config =
        languageConfig[selectedLanguage] ||
        languageConfig.en;


    // Stop previous speech
    speechSynthesis.cancel();


    const utterance =
        new SpeechSynthesisUtterance(text);


    utterance.lang = config.code;


    // Find regional voice
    const voice =
        getBestVoice(config.code);


    if (voice) {

        utterance.voice = voice;

        console.log(
            "Using voice:",
            voice.name,
            voice.lang
        );

    } else {

        console.log(
            "No exact regional voice found. Browser will use:",
            config.code
        );

    }


    // Natural speaking settings
    utterance.rate = 0.85;
    utterance.pitch = 1;
    utterance.volume = 1;


    utterance.onstart = function () {

        updateVoiceStatus(
            "🔊 Speaking medicine reminder..."
        );

    };


    utterance.onend = function () {

        updateVoiceStatus(
            "✅ Regional voice ready"
        );

    };


    utterance.onerror = function (event) {

        console.log(
            "Speech error:",
            event
        );

        updateVoiceStatus(
            "⚠️ Voice could not be played. Check TTS settings."
        );

    };


    speechSynthesis.speak(utterance);

}


// ============================================================
// MEDICINE REMINDER SPEECH
// ============================================================

function speakMedicineReminder(medicineName) {

    const selectedLanguage =
        getSelectedLanguage();


    const config =
        languageConfig[selectedLanguage] ||
        languageConfig.en;


    const message =
        config.reminder(medicineName);


    console.log(
        "Reminder language:",
        config.code
    );

    console.log(
        "Reminder message:",
        message
    );


    speak(
        message,
        selectedLanguage
    );

}


// ============================================================
// ENABLE MOBILE VOICE
// ============================================================

function enableMobileVoice() {

    if (!("speechSynthesis" in window)) {

        updateVoiceStatus(
            "❌ Your browser does not support Text-to-Speech."
        );

        return;

    }


    // Reload voices
    voices =
        speechSynthesis.getVoices();


    const selectedLanguage =
        document.getElementById(
            "languageSelect"
        ).value;


    const config =
        languageConfig[selectedLanguage] ||
        languageConfig.en;


    const voice =
        getBestVoice(config.code);


    // Speak immediately because mobile browsers
    // require user interaction to unlock audio.
    const testMessage = {

        en:
            "MEDICARE voice is enabled.",

        ta:
            "மெடிகேர் குரல் செயல்படுத்தப்பட்டுள்ளது.",

        hi:
            "मेडिकेयर की आवाज़ सक्रिय कर दी गई है।",

        te:
            "మెడికేర్ వాయిస్ ప్రారంభించబడింది.",

        kn:
            "ಮೆಡಿಕೇರ್ ಧ್ವನಿ ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ.",

        ml:
            "മെഡികെയർ ശബ്ദം പ്രവർത്തനക്ഷമമാക്കി."
    };


    const utterance =
        new SpeechSynthesisUtterance(
            testMessage[selectedLanguage] ||
            testMessage.en
        );


    utterance.lang =
        config.code;


    if (voice) {

        utterance.voice = voice;

    }


    utterance.rate = 0.85;
    utterance.pitch = 1;
    utterance.volume = 1;


    utterance.onstart = function () {

        const button =
            document.getElementById(
                "voiceEnableButton"
            );

        if (button) {

            button.classList.add(
                "voice-enabled"
            );

            button.innerText =
                "✅ Mobile Voice Enabled";

        }


        updateVoiceStatus(
            `🔊 ${config.code} voice enabled`
        );

    };


    utterance.onerror = function () {

        updateVoiceStatus(
            "⚠️ Could not start voice. Check phone TTS settings."
        );

    };


    speechSynthesis.cancel();

    speechSynthesis.speak(
        utterance
    );

}


// ============================================================
// VOICE STATUS
// ============================================================

function updateVoiceStatus(message) {

    const status =
        document.getElementById(
            "voiceStatus"
        );


    if (status) {

        status.innerText =
            message;

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


    if (!name) {

        alert("Please enter patient name.");

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


    document.getElementById(
        "welcomeTitle"
    ).innerText =
        "Welcome, " + name;


    updateDashboard();


    // Load voices again after user interaction
    setTimeout(() => {

        voices =
            speechSynthesis.getVoices();

    }, 500);

}


// ============================================================
// CHANGE LANGUAGE
// ============================================================

function changeLanguage(language) {

    localStorage.setItem(
        "selectedLanguage",
        language
    );


    const loginLanguage =
        document.getElementById(
            "languageSelect"
        );


    if (loginLanguage) {

        loginLanguage.value =
            language;

    }


    updateLanguageText();


    // Refresh available voices
    voices =
        speechSynthesis.getVoices();


    const config =
        languageConfig[language] ||
        languageConfig.en;


    const voice =
        getBestVoice(config.code);


    if (voice) {

        updateVoiceStatus(
            `🔊 ${voice.lang} voice selected`
        );

    } else {

        updateVoiceStatus(
            `⚠️ ${config.code} voice not found on this device`
        );

    }

}


// ============================================================
// TRANSLATIONS FOR UI
// ============================================================

const translations = {

    en: {

        subtitle:
            "Right Medicine, Right Time",

        monitoring:
            "Monitoring Online",

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

        medicineName:
            "Medicine name",

        dosage:
            "Dosage",

        add:
            "Add Medicine",

        schedule:
            "Medicine Schedule",

        aiTitle:
            "AI Healthcare Assistant",

        aiMessage:
            "Your medication schedule is being monitored automatically.",

        caregiver:
            "Caregiver",

        caregiverPhone:
            "Caregiver Phone Number",

        saveCaregiver:
            "Save Caregiver",

        report:
            "Medication Report",

        reportTaken:
            "Medicines Taken",

        reportMissed:
            "Medicines Missed",

        reportAdherence:
            "Adherence",

        reportButton:
            "📄 Generate Detailed PDF Report",

        log:
            "Activity Log",

        callCaregiver:
            "📞 Call Caregiver",

        emergency:
            "🚑 Emergency",

        logout:
            "Logout"
    },


    ta: {

        subtitle:
            "சரியான மருந்து, சரியான நேரம்",

        monitoring:
            "கண்காணிப்பு செயல்பாட்டில் உள்ளது",

        total:
            "மொத்த மருந்துகள்",

        taken:
            "எடுத்துக்கொண்டவை",

        missed:
            "தவறியவை",

        adherence:
            "பின்பற்றுதல்",

        nextReminder:
            "அடுத்த மருந்து நினைவூட்டல்",

        noReminder:
            "நினைவூட்டல்கள் இல்லை",

        addMedicine:
            "மருந்தைச் சேர்க்கவும்",

        medicineName:
            "மருந்தின் பெயர்",

        dosage:
            "அளவு",

        add:
            "மருந்தைச் சேர்க்கவும்",

        schedule:
            "மருந்து அட்டவணை",

        aiTitle:
            "AI சுகாதார உதவியாளர்",

        aiMessage:
            "உங்கள் மருந்து அட்டவணை தானாக கண்காணிக்கப்படுகிறது.",

        caregiver:
            "பராமரிப்பாளர்",

        caregiverPhone:
            "பராமரிப்பாளர் தொலைபேசி எண்",

        saveCaregiver:
            "பராமரிப்பாளரை சேமிக்கவும்",

        report:
            "மருந்து அறிக்கை",

        reportTaken:
            "எடுத்துக்கொண்ட மருந்துகள்",

        reportMissed:
            "தவறிய மருந்துகள்",

        reportAdherence:
            "பின்பற்றுதல்",

        reportButton:
            "📄 விரிவான PDF அறிக்கையை உருவாக்கவும்",

        log:
            "செயல்பாட்டு பதிவு",

        callCaregiver:
            "📞 பராமரிப்பாளரை அழைக்கவும்",

        emergency:
            "🚑 அவசரநிலை",

        logout:
            "வெளியேறு"
    },


    hi: {

        subtitle:
            "सही दवा, सही समय",

        monitoring:
            "निगरानी चालू है",

        total:
            "कुल दवाइयाँ",

        taken:
            "ली गई",

        missed:
            "छूटी हुई",

        adherence:
            "पालन",

        nextReminder:
            "अगली दवा की याद",

        noReminder:
            "कोई याद नहीं",

        addMedicine:
            "दवा जोड़ें",

        medicineName:
            "दवा का नाम",

        dosage:
            "खुराक",

        add:
            "दवा जोड़ें",

        schedule:
            "दवा अनुसूची",

        aiTitle:
            "AI स्वास्थ्य सहायक",

        aiMessage:
            "आपकी दवा की समय-सारणी स्वचालित रूप से निगरानी की जा रही है।",

        caregiver:
            "देखभालकर्ता",

        caregiverPhone:
            "देखभालकर्ता फोन नंबर",

        saveCaregiver:
            "देखभालकर्ता सेव करें",

        report:
            "दवा रिपोर्ट",

        reportTaken:
            "ली गई दवाइयाँ",

        reportMissed:
            "छूटी हुई दवाइयाँ",

        reportAdherence:
            "पालन",

        reportButton:
            "📄 विस्तृत PDF रिपोर्ट बनाएं",

        log:
            "गतिविधि लॉग",

        callCaregiver:
            "📞 देखभालकर्ता को कॉल करें",

        emergency:
            "🚑 आपातकाल",

        logout:
            "लॉगआउट"
    },


    te: {

        subtitle:
            "సరైన మందు, సరైన సమయం",

        monitoring:
            "పర్యవేక్షణ ఆన్‌లైన్‌లో ఉంది",

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
            "రిమైండర్లు లేవు",

        addMedicine:
            "మందును జోడించండి",

        medicineName:
            "మందు పేరు",

        dosage:
            "మోతాదు",

        add:
            "మందును జోడించండి",

        schedule:
            "మందుల షెడ్యూల్",

        aiTitle:
            "AI ఆరోగ్య సహాయకుడు",

        aiMessage:
            "మీ మందుల షెడ్యూల్ స్వయంచాలకంగా పర్యవేక్షించబడుతోంది.",

        caregiver:
            "సంరక్షకుడు",

        caregiverPhone:
            "సంరక్షకుడి ఫోన్ నంబర్",

        saveCaregiver:
            "సంరక్షకుడిని సేవ్ చేయండి",

        report:
            "మందుల నివేదిక",

        reportTaken:
            "తీసుకున్న మందులు",

        reportMissed:
            "మిస్ అయిన మందులు",

        reportAdherence:
            "పాటింపు",

        reportButton:
            "📄 వివరణాత్మక PDF నివేదికను రూపొందించండి",

        log:
            "కార్యకలాపాల లాగ్",

        callCaregiver:
            "📞 సంరక్షకుడికి కాల్ చేయండి",

        emergency:
            "🚑 అత్యవసరం",

        logout:
            "లాగ్ అవుట్"
    }

};


// ============================================================
// UPDATE UI LANGUAGE
// ============================================================

function updateLanguageText() {

    const lang =
        getSelectedLanguage();


    const t =
        translations[lang] ||
        translations.en;


    const setText =
        (id, text) => {

            const element =
                document.getElementById(id);

            if (element) {

                element.innerText =
                    text;

            }

        };


    setText(
        "headerSubtitle",
        t.subtitle
    );

    setText(
        "aiStatusText",
        t.monitoring
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
        "addButton",
        t.add
    );

    setText(
        "medicineListTitle",
        t.schedule
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
        "reportTakenText",
        t.reportTaken
    );

    setText(
        "reportMissedText",
        t.reportMissed
    );

    setText(
        "reportAdherenceText",
        t.reportAdherence
    );

    setText(
        "reportButton",
        t.reportButton
    );

    setText(
        "logTitle",
        t.log
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


    document.getElementById(
        "nextReminder"
    ).innerText =
        medicines.length
            ? getNextReminderText()
            : t.noReminder;

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


    if (!name) {

        alert("Please enter medicine name.");

        return;

    }


    if (!time) {

        alert("Please select medicine time.");

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

        lastTriggered:
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


    addLog(
        `Medicine added: ${name}`
    );

}


// ============================================================
// SAVE MEDICINES
// ============================================================

function saveMedicines() {

    localStorage.setItem(
        "medicines",
        JSON.stringify(medicines)
    );

}


// ============================================================
// LOAD MEDICINES
// ============================================================

function loadMedicines() {

    const saved =
        localStorage.getItem(
            "medicines"
        );


    if (saved) {

        try {

            medicines =
                JSON.parse(saved);

        } catch {

            medicines = [];

        }

    }

}


// ============================================================
// RENDER MEDICINES
// ============================================================

function renderMedicines() {

    const list =
        document.getElementById(
            "medicineList"
        );


    list.innerHTML = "";


    medicines.forEach(
        medicine => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "medicine-item";


            const info =
                document.createElement(
                    "div"
                );


            info.className =
                "medicine-info";


            info.innerHTML = `

                <h3>
                    💊 ${escapeHTML(medicine.name)}
                </h3>

                <p>
                    Dosage:
                    ${escapeHTML(medicine.dosage || "-")}
                </p>

                <p>
                    ⏰ ${medicine.time}
                </p>

                <p class="status ${medicine.status}">
                    ${medicine.status}
                </p>

            `;


            const actions =
                document.createElement(
                    "div"
                );


            actions.className =
                "medicine-actions";


            const testButton =
                document.createElement(
                    "button"
                );


            testButton.className =
                "btn-warning";


            testButton.innerText =
                "🔊 Test Voice";


            testButton.onclick =
                function () {

                    speakMedicineReminder(
                        medicine.name
                    );

                };


            const takenButton =
                document.createElement(
                    "button"
                );


            takenButton.className =
                "btn-success";


            takenButton.innerText =
                "✓ Taken";


            takenButton.onclick =
                function () {

                    markTaken(
                        medicine.id
                    );

                };


            const deleteButton =
                document.createElement(
                    "button"
                );


            deleteButton.className =
                "btn-danger";


            deleteButton.innerText =
                "Delete";


            deleteButton.onclick =
                function () {

                    deleteMedicine(
                        medicine.id
                    );

                };


            actions.appendChild(
                testButton
            );

            actions.appendChild(
                takenButton
            );

            actions.appendChild(
                deleteButton
            );


            item.appendChild(
                info
            );

            item.appendChild(
                actions
            );


            list.appendChild(
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
            m => m.id === id
        );


    if (!medicine) return;


    medicine.status =
        "taken";


    saveMedicines();


    renderMedicines();


    updateDashboard();


    const lang =
        getSelectedLanguage();


    const config =
        languageConfig[lang] ||
        languageConfig.en;


    speak(
        config.taken(
            medicine.name
        ),
        lang
    );


    addLog(
        `Medicine taken: ${medicine.name}`
    );

}


// ============================================================
// DELETE MEDICINE
// ============================================================

function deleteMedicine(id) {

    medicines =
        medicines.filter(
            medicine =>
                medicine.id !== id
        );


    saveMedicines();


    renderMedicines();


    updateDashboard();

}


// ============================================================
// REMINDER CHECK
// ============================================================

function checkReminders() {

    const now =
        new Date();


    const currentHours =
        String(
            now.getHours()
        ).padStart(
            2,
            "0"
        );


    const currentMinutes =
        String(
            now.getMinutes()
        ).padStart(
            2,
            "0"
        );


    const currentTime =
        `${currentHours}:${currentMinutes}`;


    medicines.forEach(
        medicine => {

            if (
                medicine.time ===
                currentTime
            ) {

                const today =
                    now.toDateString();


                const triggerKey =
                    `${today}_${medicine.time}`;


                if (
                    medicine.lastTriggered !==
                    triggerKey
                ) {

                    medicine.lastTriggered =
                        triggerKey;


                    saveMedicines();


                    // 🔊 REGIONAL VOICE
                    speakMedicineReminder(
                        medicine.name
                    );


                    addLog(
                        `Reminder spoken: ${medicine.name}`
                    );


                    // Mark pending again for
                    // the new reminder cycle
                    medicine.status =
                        "pending";


                    renderMedicines();


                    updateDashboard();

                }

            }

        }
    );

}


// ============================================================
// START REMINDER MONITOR
// ============================================================

function startReminderMonitor() {

    if (reminderLoop) {

        clearInterval(
            reminderLoop
        );

    }


    // Check every second
    reminderLoop =
        setInterval(
            checkReminders,
            1000
        );

}


// ============================================================
// NEXT REMINDER
// ============================================================

function getNextReminderText() {

    if (
        medicines.length === 0
    ) {

        return "No reminders";

    }


    const now =
        new Date();


    const currentMinutes =
        now.getHours() * 60 +
        now.getMinutes();


    let nearest =
        null;


    let nearestDifference =
        Infinity;


    medicines.forEach(
        medicine => {

            const parts =
                medicine.time.split(
                    ":"
                );


            const hours =
                parseInt(
                    parts[0]
                );


            const minutes =
                parseInt(
                    parts[1]
                );


            let reminderMinutes =
                hours * 60 +
                minutes;


            let difference =
                reminderMinutes -
                currentMinutes;


            if (difference < 0) {

                difference +=
                    24 * 60;

            }


            if (
                difference <
                nearestDifference
            ) {

                nearestDifference =
                    difference;

                nearest =
                    medicine;

            }

        }
    );


    if (!nearest) {

        return "No reminders";

    }


    return `${nearest.name} - ${nearest.time}`;

}


// ============================================================
// UPDATE DASHBOARD
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
            ? Math.round(
                (taken / total) * 100
            )
            : 0;


    document.getElementById(
        "totalMedicines"
    ).innerText =
        total;


    document.getElementById(
        "takenMedicines"
    ).innerText =
        taken;


    document.getElementById(
        "missedMedicines"
    ).innerText =
        missed;


    document.getElementById(
        "adherence"
    ).innerText =
        adherence + "%";


    document.getElementById(
        "reportTotal"
    ).innerText =
        total;


    document.getElementById(
        "reportTaken"
    ).innerText =
        taken;


    document.getElementById(
        "reportMissed"
    ).innerText =
        missed;


    document.getElementById(
        "reportAdherence"
    ).innerText =
        adherence + "%";


    document.getElementById(
        "nextReminder"
    ).innerText =
        getNextReminderText();

}


// ============================================================
// ACTIVITY LOG
// ============================================================

function addLog(message) {

    const log =
        document.getElementById(
            "activityLog"
        );


    const item =
        document.createElement(
            "div"
        );


    item.className =
        "log-item";


    item.innerText =
        `${new Date().toLocaleTimeString()} - ${message}`;


    log.prepend(
        item
    );

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
        "Caregiver number saved."
    );


    addLog(
        "Caregiver number saved."
    );

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
            "Please save caregiver number first."
        );

        return;

    }


    window.location.href =
        `tel:${phone}`;

}


// ============================================================
// EMERGENCY
// ============================================================

function callAmbulance() {

    window.location.href =
        "tel:108";

}


// ============================================================
// LOGOUT
// ============================================================

function logout() {

    document.getElementById(
        "dashboardSection"
    ).style.display = "none";


    document.getElementById(
        "loginSection"
    ).style.display = "flex";

}


// ============================================================
// REPORT
// ============================================================

function generateMedicationReport() {

    const patient =
        localStorage.getItem(
            "patientName"
        ) || "Patient";


    let report =
        "MEDICARE MEDICATION REPORT\n\n";


    report +=
        `Patient: ${patient}\n\n`;


    report +=
        `Total Medicines: ${medicines.length}\n`;


    report +=
        `Taken: ${
            medicines.filter(
                m => m.status === "taken"
            ).length
        }\n`;


    report +=
        `Missed: ${
            medicines.filter(
                m => m.status === "missed"
            ).length
        }\n\n`;


    report +=
        "MEDICINE SCHEDULE\n\n";


    medicines.forEach(
        medicine => {

            report +=
                `${medicine.name} | ` +
                `${medicine.dosage} | ` +
                `${medicine.time} | ` +
                `${medicine.status}\n`;

        }
    );


    const blob =
        new Blob(
            [report],
            {
                type:
                    "text/plain"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        "MEDICARE_Report.txt";


    link.click();


    URL.revokeObjectURL(
        url
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


// ============================================================
// INITIALIZATION
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadMedicines();


        const savedLanguage =
            localStorage.getItem(
                "selectedLanguage"
            );


        if (savedLanguage) {

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

        }


        const caregiverPhone =
            localStorage.getItem(
                "caregiverPhone"
            );


        if (caregiverPhone) {

            document.getElementById(
                "caregiverPhone"
            ).value =
                caregiverPhone;

        }


        renderMedicines();


        updateDashboard();


        updateLanguageText();


        // Start reminder checking
        startReminderMonitor();


        // Load voices
        setTimeout(
            function () {

                voices =
                    speechSynthesis.getVoices();

                console.log(
                    "TTS voices loaded:",
                    voices
                );

            },
            1000
        );

    }
);
```
