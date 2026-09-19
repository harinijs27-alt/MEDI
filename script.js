function triggerReminder(index) {
    if (activeReminder === index) return;

    activeReminder = index;

    const medicine = medicines[index];

    // 🔊 PLAY ALARM
    const alarm = document.getElementById("alarm");

    if (alarm) {
        alarm.currentTime = 0;
        alarm.loop = true;

        alarm.play().catch(error => {
            console.log("Alarm could not autoplay:", error);
        });
    }

    // 🗣️ VOICE REMINDER
    speak(
        `Reminder. Please take your medicine ${medicine.name}, ${medicine.dosage}.`
    );

    // Keep repeating voice reminder
    clearInterval(reminderLoop);

    reminderLoop = setInterval(() => {
        if (activeReminder === index) {
            speak(
                `Reminder. Please take your medicine ${medicine.name}, ${medicine.dosage}.`
            );
        }
    }, 10000);

    // Show reminder popup
    alert(
        `💊 Medicine Reminder\n\n${medicine.name}\n${medicine.dosage}\n\nPlease take your medicine and click "Mark Taken".`
    );
}
