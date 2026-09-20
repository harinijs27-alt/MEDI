// ============================================================
// MEDICARE AI
// Complete Medication Reminder Script
// English / Tamil / Hindi / Telugu
// ============================================================

let medicines = [];
let activeReminder = null;
let reminderLoop = null;

let patientName = "";
let patientPhone = "";
let selectedLanguage = "en";

let medicareAudio = null;


// ============================================================
// TRANSLATIONS
// ============================================================

const translations = {

    en: {
        medicineAdded: "Medicine added successfully",
        medicineTaken: "Medicine marked as taken",
        medicineDeleted: "Medicine deleted",
        noMedicine: "No medicines added yet",
        nextReminder: "No upcoming reminders",
        taken: "Taken",
        pending: "Pending",
        missed: "Missed"
    },

    ta: {
        medicineAdded: "மருந்து வெற்றிகரமாக சேர்க்கப்பட்டது",
        medicineTaken: "மருந்து எடுத்ததாக பதிவு செய்யப்பட்டது",
        medicineDeleted: "மருந்து நீக்கப்பட்டது",
        noMedicine: "மருந்துகள் எதுவும் சேர்க்கப்படவில்லை",
        nextReminder: "அடுத்த நினைவூட்டல் இல்லை",
        taken: "எடுத்துக்கொண்டது",
        pending: "நிலுவையில்",
        missed: "தவறியது"
    },

    hi: {
        medicineAdded: "दवा सफलतापूर्वक जोड़ी गई",
        medicineTaken: "दवा लेने के रूप में दर्ज किया गया",
        medicineDeleted: "दवा हटा दी गई",
        noMedicine: "अभी तक कोई दवा नहीं जोड़ी गई",
        nextReminder: "कोई आगामी रिमाइंडर नहीं",
        taken: "लिया गया",
        pending: "लंबित",
        missed: "छूटी हुई"
    },

    te: {
        medicineAdded: "మందు విజయవంతంగా జోడించబడింది",
        medicineTaken: "మందు తీసుకున్నట్లు నమోదు చేయబడింది",
        medicineDeleted: "మందు తొలగించబడింది",
        noMedicine: "ఇంకా మందులు జోడించలేదు",
        nextReminder: "తదుపరి రిమైండర్ లేదు",
        taken: "తీసుకున్నారు",
        pending: "పెండింగ్",
        missed: "మిస్ అయింది"
    }
};


// ============================================================
// GET LANGUAGE
// ============================================================

function getLanguage() {

    const languageElement =
        document.getElementById("language") ||
        document.getElementById("languageSelect");

    if (languageElement && languageElement.value) {
        selectedLanguage = languageElement.value;
    }

    return selectedLanguage;
}


// ============================================================
// CHANGE LANGUAGE
// ============================================================

function changeLanguage(lang) {

    selectedLanguage = lang;

    localStorage.setItem(
        "medicare_language",
        lang
    );

    console.log(
        "MEDICARE AI Language:",
        lang
    );

    updateVoiceStatus();
}


// ============================================================
// LANGUAGE VOICE CODE
// ============================================================

function getVoiceLanguageCode() {

    const lang = getLanguage();

    if (lang === "ta") {
        return "ta";
    }

    if (lang === "hi") {
        return "hi";
    }

    if (lang === "te") {
        return "te";
    }

    return "en";
}


// ============================================================
// VOICE STATUS
// ============================================================

function updateVoiceStatus() {

    const element =
        document.getElementById("voiceStatus");

    if (!element) return;

    const lang = getLanguage();

    if (lang === "ta") {

        element.textContent =
            "✓ Tamil Voice Ready";

    } else if (lang === "hi") {

        element.textContent =
            "✓ Hindi Voice Ready";

    } else if (lang === "te") {

        element.textContent =
            "✓ Telugu Voice Ready";

    } else {

        element.textContent =
            "✓ English Voice Ready";
    }

    element.style.color = "green";
}


// ============================================================
// BUILD REMINDER MESSAGE
// IMPORTANT: NO PATIENT NAME
// ============================================================

function buildReminderMessage(medicineName) {

    const lang = getLanguage();

    const name =
        String(medicineName || "").trim();

    if (!name) {
        return "";
    }


    // -------------------------------
    // TAMIL
    // -------------------------------

    if (lang === "ta") {

        return `${name} மருந்தை எடுத்துக்கொள்ளும் நேரம் வந்துவிட்டது.`;
    }


    // -------------------------------
    // HINDI
    // -------------------------------

    if (lang === "hi") {

        return `${name} दवा लेने का समय हो गया है।`;
    }


    // -------------------------------
    // TELUGU
    // -------------------------------

    if (lang === "te") {

        return `${name} మందు తీసుకునే సమయం వచ్చింది.`;
    }


    // -------------------------------
    // ENGLISH
    // -------------------------------

    return `It is time to take ${name}.`;
}


// ============================================================
// BUILD MISSED MESSAGE
// ============================================================

function buildMissedMessage(medicineName) {

    const lang = getLanguage();

    const name =
        String(medicineName || "").trim();


    if (lang === "ta") {

        return `எச்சரிக்கை. ${name} மருந்தை எடுத்துக்கொள்ள தவறிவிட்டீர்கள்.`;
    }


    if (lang === "hi") {

        return `चेतावनी। आपने ${name} दवा लेना भूल गए हैं।`;
    }


    if (lang === "te") {

        return `హెచ్చరిక. మీరు ${name} మందు తీసుకోవడం మర్చిపోయారు.`;
    }


    return `Warning. You missed your ${name} medicine.`;
}


// ============================================================
// REGIONAL TTS
// ============================================================

function speakRegionalVoice(text) {

    if (!text || !text.trim()) {

        console.log(
            "MEDICARE AI: Nothing to speak."
        );

        return;
    }


    const language =
        getVoiceLanguageCode();


    console.log(
        "================================"
    );

    console.log(
        "MEDICARE AI VOICE"
    );

    console.log(
        "Language:",
        language
    );

    console.log(
        "Text:",
        text
    );

    console.log(
        "================================"
    );


    // Stop previous audio
    if (medicareAudio) {

        try {

            medicareAudio.pause();

            medicareAudio.currentTime = 0;

        } catch (error) {}
    }


    // --------------------------------------------------------
    // ENGLISH
    // --------------------------------------------------------

    if (language === "en") {

        speakBrowserVoice(
            text,
            "en-IN"
        );

        return;
    }


    // --------------------------------------------------------
    // TAMIL / HINDI / TELUGU
    // --------------------------------------------------------

    const audioURL =
        "https://translate.google.com/translate_tts" +
        "?ie=UTF-8" +
        "&client=tw-ob" +
        "&tl=" +
        language +
        "&q=" +
        encodeURIComponent(text);


    try {

        medicareAudio =
            new Audio(audioURL);


        medicareAudio.volume = 1.0;


        medicareAudio.onplay =
            function () {

                console.log(
                    "Regional voice started successfully."
                );
            };


        medicareAudio.onerror =
            function (error) {

                console.log(
                    "Regional audio failed:",
                    error
                );


                // Browser fallback
                speakBrowserVoice(
                    text,
                    getBrowserLanguage()
                );
            };


        medicareAudio.play()
            .then(() => {

                console.log(
                    "Audio playing."
                );

            })
            .catch(error => {

                console.log(
                    "Audio autoplay blocked:",
                    error
                );


                // Try browser voice
                speakBrowserVoice(
                    text,
                    getBrowserLanguage()
                );
            });


    } catch (error) {

        console.log(
            "TTS Error:",
            error
        );


        speakBrowserVoice(
            text,
            getBrowserLanguage()
        );
    }
}


// ============================================================
// BROWSER LANGUAGE
// ============================================================

function getBrowserLanguage() {

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
// BROWSER SPEECH FALLBACK
// ============================================================

function speakBrowserVoice(
    text,
    language
) {

    if (
        !("speechSynthesis" in window)
    ) {

        alert(
            "Speech is not supported by this browser."
        );

        return;
    }


    try {

        speechSynthesis.cancel();

        speechSynthesis.resume();


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


        speech.onstart =
            function () {

                console.log(
                    "Browser voice started."
                );
            };


        speech.onerror =
            function (event) {

                console.log(
                    "Browser speech error:",
                    event
                );
            };


        speechSynthesis.speak(
            speech
        );


    } catch (error) {

        console.log(
            "Speech error:",
            error
        );
    }
}


// ============================================================
// TEST VOICE
// ============================================================

function testMedicineVoice() {

    const medicineInput =
        document.getElementById(
            "medicineName"
        );


    if (!medicineInput) {

        alert(
            "Medicine name input not found."
        );

        return;
    }


    const medicineName =
        medicineInput.value.trim();


    if (!medicineName) {

        alert(
            "Please enter a medicine name first."
        );

        return;
    }


    const message =
        buildReminderMessage(
            medicineName
        );


    console.log(
        "TEST MESSAGE:",
        message
    );


    speakRegionalVoice(
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
        ) ||
        document.getElementById(
            "time"
        );


    if (!nameInput) {

        alert(
            "Medicine name input not found."
        );

        return;
    }


    if (!timeInput) {

        alert(
            "Medicine time input not found."
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

        createdAt:
            new Date().toISOString(),

        takenAt:
            null,

        missedAt:
            null
    };


    medicines.push(
        medicine
    );


    saveMedicines();

    renderMedicines();

    updateDashboard();

    updateNextReminder();


    nameInput.value = "";


    if (dosageInput) {

        dosageInput.value = "";
    }


    const lang =
        getLanguage();


    alert(
        translations[lang]
            .medicineAdded
    );
}


// ============================================================
// SAVE
// ============================================================

function saveMedicines() {

    localStorage.setItem(

        "medicines_" +
        patientPhone,

        JSON.stringify(
            medicines
        )
    );
}


// ============================================================
// LOAD
// ============================================================

function loadMedicines() {

    const data =
        localStorage.getItem(

            "medicines_" +
            patientPhone
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
        ) ||
        document.getElementById(
            "medicinesList"
        );


    if (!container) {

        return;
    }


    const lang =
        getLanguage();


    if (
        !medicines ||
        medicines.length === 0
    ) {

        container.innerHTML =
            `<p>${
                translations[lang]
                    .noMedicine
            }</p>`;

        return;
    }


    const sorted =
        [...medicines].sort(
            (a, b) =>
                a.time.localeCompare(
                    b.time
                )
        );


    container.innerHTML =
        sorted
            .map(
                medicine => {

                    const status =
                        medicine.status ||
                        "pending";


                    const statusText =
                        translations[lang][
                            status
                        ] ||
                        status;


                    return `

                    <div
                        class="medicine-card ${status}"
                        data-id="${medicine.id}"
                    >

                        <div class="medicine-info">

                            <h3>
                                ${escapeHTML(
                                    medicine.name
                                )}
                            </h3>

                            <p>
                                ${escapeHTML(
                                    medicine.dosage
                                )}
                            </p>

                            <p>
                                ⏰ ${medicine.time}
                            </p>

                            <strong>
                                ${statusText}
                            </strong>

                        </div>


                        <div class="medicine-actions">

                            ${
                                status !== "taken"
                                ?
                                `
                                <button
                                    onclick="markTaken(${medicine.id})"
                                >
                                    ✓ ${
                                        translations[lang]
                                            .taken
                                    }
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
                }
            )
            .join("");
}


// ============================================================
// DASHBOARD
// ============================================================

function updateDashboard() {

    const total =
        medicines.length;


    const taken =
        medicines.filter(
            m =>
                m.status === "taken"
        ).length;


    const missed =
        medicines.filter(
            m =>
                m.status === "missed"
        ).length;


    const pending =
        medicines.filter(
            m =>
                m.status === "pending"
        ).length;


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


    const pendingElement =
        document.getElementById(
            "pendingMedicines"
        );


    if (totalElement) {

        totalElement.textContent =
            total;
    }


    if (takenElement) {

        takenElement.textContent =
            taken;
    }


    if (missedElement) {

        missedElement.textContent =
            missed;
    }


    if (pendingElement) {

        pendingElement.textContent =
            pending;
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


    const lang =
        getLanguage();


    const pending =
        medicines
            .filter(
                m =>
                    m.status ===
                    "pending"
            )
            .sort(
                (a, b) =>
                    a.time.localeCompare(
                        b.time
                    )
            );


    if (!pending.length) {

        element.textContent =
            translations[lang]
                .nextReminder;

        return;
    }


    element.textContent =
        `${pending[0].name} - ${pending[0].time}`;
}


// ============================================================
// START REMINDER CHECKER
// ============================================================

function startReminderChecker() {

    if (reminderLoop) {

        clearInterval(
            reminderLoop
        );
    }


    // Check every 5 seconds
    reminderLoop =
        setInterval(
            checkMedicationReminder,
            5000
        );


    checkMedicationReminder();
}


// ============================================================
// CHECK REMINDER
// ============================================================

function checkMedicationReminder() {

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
        `${hours}:${minutes}`;


    medicines.forEach(
        medicine => {

            if (
                medicine.time ===
                currentTime &&
                medicine.status ===
                "pending"
            ) {

                if (
                    activeReminder !==
                    medicine.id
                ) {

                    triggerReminder(
                        medicine
                    );
                }
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

    activeReminder =
        medicine.id;


    // EXACT MEDICINE NAME
    // NO PATIENT NAME

    const medicineName =
        String(
            medicine.name || ""
        ).trim();


    const message =
        buildReminderMessage(
            medicineName
        );


    console.log(
        "********************************"
    );

    console.log(
        "MEDICARE AI REMINDER"
    );

    console.log(
        "Medicine:",
        medicineName
    );

    console.log(
        "Message:",
        message
    );

    console.log(
        "********************************"
    );


    // Visual reminder
    showVisualReminder(
        medicine
    );


    // VOICE ONLY
    speakRegionalVoice(
        message
    );


    // Repeat after 10 seconds
    setTimeout(
        () => {

            const currentMedicine =
                medicines.find(
                    m =>
                        m.id ===
                        medicine.id
                );


            if (
                currentMedicine &&
                currentMedicine.status ===
                "pending"
            ) {

                speakRegionalVoice(
                    message
                );
            }

        },
        10000
    );


    // Missed after 60 seconds
    setTimeout(
        () => {

            const currentMedicine =
                medicines.find(
                    m =>
                        m.id ===
                        medicine.id
                );


            if (
                currentMedicine &&
                currentMedicine.status ===
                "pending"
            ) {

                currentMedicine.status =
                    "missed";


                currentMedicine.missedAt =
                    new Date()
                        .toISOString();


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
                activeReminder ===
                medicine.id
            ) {

                activeReminder =
                    null;
            }

        },
        60000
    );
}


// ============================================================
// VISUAL REMINDER
// ============================================================

function showVisualReminder(
    medicine
) {

    const card =
        document.querySelector(
            `[data-id="${medicine.id}"]`
        );


    if (card) {

        card.classList.add(
            "reminder-active"
        );


        setTimeout(
            () => {

                card.classList.remove(
                    "reminder-active"
                );

            },
            15000
        );
    }


    // Vibration for accessibility
    if (
        navigator.vibrate
    ) {

        try {

            navigator.vibrate(
                [
                    500,
                    200,
                    500
                ]
            );

        } catch (error) {}
    }
}


// ============================================================
// MARK TAKEN
// ============================================================

function markTaken(
    id
) {

    const medicine =
        medicines.find(
            m =>
                m.id === id
        );


    if (!medicine) {

        return;
    }


    medicine.status =
        "taken";


    medicine.takenAt =
        new Date()
            .toISOString();


    saveMedicines();

    renderMedicines();

    updateDashboard();

    updateNextReminder();


    if (
        activeReminder === id
    ) {

        activeReminder =
            null;
    }


    // Stop current audio
    if (medicareAudio) {

        try {

            medicareAudio.pause();

            medicareAudio.currentTime =
                0;

        } catch (error) {}
    }


    if (
        "speechSynthesis"
        in window
    ) {

        speechSynthesis.cancel();
    }


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


    speakRegionalVoice(
        message
    );
}


// ============================================================
// MISSED REMINDER
// ============================================================

function speakMissedReminder(
    medicine
) {

    const message =
        buildMissedMessage(
            medicine.name
        );


    speakRegionalVoice(
        message
    );
}


// ============================================================
// DELETE MEDICINE
// ============================================================

function deleteMedicine(
    id
) {

    medicines =
        medicines.filter(
            m =>
                m.id !== id
        );


    saveMedicines();

    renderMedicines();

    updateDashboard();

    updateNextReminder();
}


// ============================================================
// CAREGIVER
// ============================================================

function saveCaregiver() {

    const input =
        document.getElementById(
            "caregiverPhone"
        );


    if (!input) {

        return;
    }


    const number =
        input.value.trim();


    if (!number) {

        alert(
            "Enter caregiver phone number."
        );

        return;
    }


    localStorage.setItem(
        "medicare_caregiver",
        number
    );


    alert(
        "Caregiver number saved."
    );
}


function loadCaregiver() {

    const input =
        document.getElementById(
            "caregiverPhone"
        );


    const number =
        localStorage.getItem(
            "medicare_caregiver"
        );


    if (
        input &&
        number
    ) {

        input.value =
            number;
    }
}


// ============================================================
// CAREGIVER SMS
// ============================================================

function sendCaregiverSMS(
    medicine
) {

    const caregiver =
        localStorage.getItem(
            "medicare_caregiver"
        );


    if (!caregiver) {

        console.log(
            "No caregiver number saved."
        );

        return;
    }


    const message =
        `MEDICARE AI ALERT: Medicine ${medicine.name} scheduled at ${medicine.time} was missed.`;


    const smsURL =
        `sms:${caregiver}?body=${
            encodeURIComponent(
                message
            )
        }`;


    console.log(
        "Caregiver SMS:",
        smsURL
    );

    // Open SMS application
    // Uncomment if required during demo:
    // window.location.href = smsURL;
}


// ============================================================
// CALL CAREGIVER
// ============================================================

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


// ============================================================
// AMBULANCE
// ============================================================

function callAmbulance() {

    window.location.href =
        "tel:108";
}


// ============================================================
// MEDICATION REPORT
// ============================================================

function generateMedicationReport() {

    const total =
        medicines.length;


    const taken =
        medicines.filter(
            m =>
                m.status === "taken"
        ).length;


    const missed =
        medicines.filter(
            m =>
                m.status === "missed"
        ).length;


    const pending =
        medicines.filter(
            m =>
                m.status === "pending"
        ).length;


    const rows =
        medicines.map(
            medicine => {

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
                            ${medicine.status}
                        </td>

                        <td>
                            ${
                                medicine.takenAt
                                ?
                                new Date(
                                    medicine.takenAt
                                ).toLocaleString()
                                :
                                "-"
                            }
                        </td>

                    </tr>

                `;
            }
        ).join("");


    const report =
        `

        <!DOCTYPE html>

        <html>

        <head>

            <meta charset="UTF-8">

            <title>
                MEDICARE AI Report
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

                th,
                td {
                    border: 1px solid #999;
                    padding: 10px;
                }

                th {
                    background: #eee;
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
                ${escapeHTML(
                    patientName
                )}
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

                <thead>

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

                        <th>
                            Taken At
                        </th>

                    </tr>

                </thead>


                <tbody>

                    ${rows}

                </tbody>

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
            "Please allow popups."
        );

        return;
    }


    reportWindow.document.write(
        report
    );


    reportWindow.document.close();


    setTimeout(
        () => {

            reportWindow.print();

        },
        500
    );
}


// ============================================================
// LOGIN
// ============================================================

function login() {

    const nameInput =
        document.getElementById(
            "patientName"
        );


    const phoneInput =
        document.getElementById(
            "patientPhone"
        );


    patientName =
        nameInput
        ? nameInput.value.trim()
        : "";


    patientPhone =
        phoneInput
        ? phoneInput.value.trim()
        : "";


    if (!patientName) {

        patientName =
            "Patient";
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

    loadCaregiver();


    const loginPage =
        document.getElementById(
            "loginPage"
        );


    const appPage =
        document.getElementById(
            "appPage"
        );


    if (loginPage) {

        loginPage.style.display =
            "none";
    }


    if (appPage) {

        appPage.style.display =
            "block";
    }


    startReminderChecker();


    updateVoiceStatus();


    // Browser now has user interaction
    console.log(
        "MEDICARE AI ready."
    );
}


// ============================================================
// LOGOUT
// ============================================================

function logout() {

    if (reminderLoop) {

        clearInterval(
            reminderLoop
        );

        reminderLoop =
            null;
    }


    if (medicareAudio) {

        try {

            medicareAudio.pause();

        } catch (error) {}
    }


    if (
        "speechSynthesis"
        in window
    ) {

        speechSynthesis.cancel();
    }


    activeReminder =
        null;


    const loginPage =
        document.getElementById(
            "loginPage"
        );


    const appPage =
        document.getElementById(
            "appPage"
        );


    if (appPage) {

        appPage.style.display =
            "none";
    }


    if (loginPage) {

        loginPage.style.display =
            "block";
    }
}


// ============================================================
// INITIALIZATION
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "MEDICARE AI loading..."
        );


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


        const languageElement =
            document.getElementById(
                "language"
            ) ||
            document.getElementById(
                "languageSelect"
            );


        if (languageElement) {

            languageElement.value =
                selectedLanguage;
        }


        loadMedicines();

        loadCaregiver();

        updateVoiceStatus();

        startReminderChecker();


        // ----------------------------------------------------
        // IMPORTANT
        // User interaction unlocks audio on browsers.
        // No Enable Voice button required.
        // ----------------------------------------------------

        document.addEventListener(
            "click",
            function () {

                console.log(
                    "MEDICARE AI audio interaction unlocked."
                );

            },
            {
                once: true
            }
        );
    }
);
