import CryptoJS from 'crypto-js';
const key: any = process.env.NEXT_PUBLIC_SECRET_KEY;
export function encryptMessage(message: any): string {
    const messageStr = typeof message === 'string' ? message : JSON.stringify(message);
    return CryptoJS.AES.encrypt(messageStr, CryptoJS.enc.Utf8.parse(key), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }).toString();
}
export function decryptMessage(ciphertext: any): any {
    try {
        // Giải mã từ Base64
        const decodedCiphertext :any = CryptoJS.enc.Base64.parse(ciphertext);

        // Giải mã sử dụng AES-ECB
        const decrypted :any = CryptoJS.AES.decrypt(
            { ciphertext: decodedCiphertext },
            CryptoJS.enc.Utf8.parse(key),
            {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7,
            }
        );

        return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error:any) {
        console.error("Error during decryption:", error.message);
        return '';
    }
}
