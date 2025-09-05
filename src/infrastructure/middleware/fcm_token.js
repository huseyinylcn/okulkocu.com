const admin = require("firebase-admin");




let initFirebase = (serviceAccount) => {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}








// Tek bir token'a gönderim yapan fonksiyon
const sendNotification = async (registrationToken, title, body, data = {}) => {
    const message = {
        notification: { title, body },
        token: registrationToken,
        data
    };

    try {
        const response = await admin.messaging().send(message);
        console.log("Bildirim başarıyla gönderildi:", response);
        return response;
    } catch (error) {
        console.error("Hata oluştu:", error);
        throw error;
    }
};

// Dışarıya fonksiyonu açıyoruz
module.exports = { sendNotification, initFirebase };
