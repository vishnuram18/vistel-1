/**
 * Seed the Realtime Database with the initial content catalog.
 *
 * Before running this, set RTDB rules in the Firebase console to:
 *   { "rules": { ".read": true, ".write": true } }
 *
 * Import and call seedContentIfEmpty(rtdb) once from any page, or
 * open the browser console and run:
 *   import('/javascript/rtdb-seed.js').then(m => m.seedContentIfEmpty(rtdb))
 *
 * If content was already seeded without genre metadata, call:
 *   import('/javascript/rtdb-seed.js').then(m => m.updateContentMetadata(rtdb))
 */
import { ref, set, get, update } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

const CONTENT_SEED = {
    motioncomics: {
        "haunting-adeline": {
            id: "haunting-adeline",
            title: "Haunting Adeline",
            author: "H. D. Carlton",
            thumbnail: "image/haunting adeline.jpg",
            video: "motioncomic1.mp4",
            totalMinutes: 10,
            available: true,
            genre: ["drama", "horror"],
            trending: true,
            imdbRating: 7.8
        },
        "art-of-being-alone": {
            id: "art-of-being-alone",
            title: "The Art of Being Alone",
            author: "Renuka Gavrani",
            thumbnail: "image/pexels-artem-saranin-1496373.jpg",
            video: "motioncomic2.mp4",
            totalMinutes: 8,
            available: true,
            genre: ["drama"],
            trending: false,
            imdbRating: 7.2
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
            available: true,
            genre: ["drama", "horror"],
            trending: true,
            imdbRating: 7.8
        },
        "poniyan-selvan": {
            id: "poniyan-selvan",
            title: "Poniyan Selvan",
            author: "Kalki Krishnamurthy",
            thumbnail: "image/poniyan selvan.jpg",
            audio: "audio/poniyan-selvan.mp3",
            chapters: 100,
            available: true,
            genre: ["action", "drama", "romance"],
            trending: false,
            imdbRating: 8.5
        },
        "naruto-audio": {
            id: "naruto-audio",
            title: "Naruto",
            author: "Masashi Kishimoto",
            thumbnail: "image/naruto1.jpg",
            audio: "audio/naruto.mp3",
            chapters: 50,
            available: true,
            genre: ["action", "fantasy", "comedy"],
            trending: true,
            imdbRating: 8.0
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

// Patches genre/trending/imdbRating onto already-seeded content without overwriting it.
export async function updateContentMetadata(rtdb) {
    const updates = {};
    for (const [type, items] of Object.entries(CONTENT_SEED)) {
        for (const [id, item] of Object.entries(items)) {
            updates[`content/${type}/${id}/genre`] = item.genre;
            updates[`content/${type}/${id}/trending`] = item.trending;
            updates[`content/${type}/${id}/imdbRating`] = item.imdbRating;
        }
    }
    await update(ref(rtdb), updates);
    console.log("RTDB: content metadata updated.");
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
