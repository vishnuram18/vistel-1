/**
 * Seed the Realtime Database with the initial content catalog.
 *
 * Before running this, set RTDB rules in the Firebase console to:
 *   { "rules": { ".read": true, ".write": true } }
 *
 * Import and call seedContentIfEmpty(rtdb) once from any page, or
 * open the browser console and run:
 *   import('/javascript/rtdb-seed.js').then(m => m.seedContentIfEmpty(rtdb))
 */
import { ref, set, get } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

const CONTENT_SEED = {
    motioncomics: {
        "haunting-adeline": {
            id: "haunting-adeline",
            title: "Haunting Adeline",
            author: "H. D. Carlton",
            thumbnail: "image/haunting adeline.jpg",
            video: "motioncomic1.mp4",
            totalMinutes: 10,
            available: true
        },
        "art-of-being-alone": {
            id: "art-of-being-alone",
            title: "The Art of Being Alone",
            author: "Renuka Gavrani",
            thumbnail: "image/pexels-artem-saranin-1496373.jpg",
            video: "motioncomic2.mp4",
            totalMinutes: 8,
            available: true
        }
    },
    voicebooks: {
        "haunting-adeline-audio": {
            id: "haunting-adeline-audio",
            title: "Haunting Adeline",
            author: "H. D. Carlton",
            thumbnail: "image/haunting adeline.jpg",
            audio: "audio/haunting-adeline.mp3",
            chapters: 44,
            available: true
        },
        "poniyan-selvan": {
            id: "poniyan-selvan",
            title: "Poniyan Selvan",
            author: "Kalki Krishnamurthy",
            thumbnail: "image/poniyan selvan.jpg",
            audio: "audio/poniyan-selvan.mp3",
            chapters: 100,
            available: true
        },
        "naruto-audio": {
            id: "naruto-audio",
            title: "Naruto",
            author: "Masashi Kishimoto",
            thumbnail: "image/naruto1.jpg",
            audio: "audio/naruto.mp3",
            chapters: 50,
            available: true
        }
    }
};

export async function seedContentIfEmpty(rtdb) {
    const snap = await get(ref(rtdb, "content"));
    if (!snap.exists()) {
        await set(ref(rtdb, "content"), CONTENT_SEED);
        console.log("RTDB: content catalog seeded.");
    }
}

export async function seedAnnouncement(rtdb) {
    const snap = await get(ref(rtdb, "announcements"));
    if (!snap.exists()) {
        await set(ref(rtdb, "announcements/welcome"), {
            message: "Welcome to Vistel! New motion comics and voice books added every week.",
            timestamp: Date.now(),
            active: true
        });
    }
}
