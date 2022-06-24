import Crypto from 'crypto'
import NodeRSA from 'node-rsa'
import Request from 'sync-request'
import FS from 'fs'
import dotenv from 'dotenv'

dotenv.config()

export default class Controller {
    constructor() {
        
    }

    aesEncrypt(key, iv, plainText) {
        const cipher = Crypto.createCipheriv("aes-128-cbc", key, iv)
        return cipher.update(plainText, "utf8", "base64") + cipher.final("base64")
    }

    rsaEncrypt(publicKey, aesKey, padding) {
        const key = new NodeRSA("-----BEGIN PUBLIC KEY-----\n" + publicKey + "\n-----END PUBLIC KEY-----", {"encryptionScheme": padding})
        return key.encrypt(aesKey, "base64", "utf8")
    }

    getPublicKey(apiHost) {
        const uri = apiHost + "/api/Auth/GetPublicKey?APIkey=" + apiKey
        const response = Request("GET", uri, { json: true })
        const rsaPublicKey = JSON.parse(response.getBody("utf8")).PublicKey
        return rsaPublicKey
    }

    healthCheck() {
        const rsaPublicKey  = getPublicKey(apiKey)
        console.log("rsaPublicKey:", rsaPublicKey)

        const aesKey = Crypto.randomBytes(16)
        const aesIv = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])

        const aesCipherKey = rsaEncrypt(rsaPublicKey, aesKey, "pkcs1")
        console.log("aesCipherKey:", aesCipherKey)

        const apiHost = "https://api.tilko.net/"
        const apiKey = process.env.API_KEY

        const url = apiHost + "api/v1.0/Nhis/Ggpab003M0105"

        const certPath  = "../config/certificate"
        const certFile  = certPath + "signCert.der"
        const keyFile   = certPath + "signPri.key"

        const options = {
            headers: {
                "Content-Type": "application/json",
                "API-KEY": apiKey,
                "ENC-KEY": aesCipherKey
            },
            json: {
                "CertFile": aesEncrypt(aesKey, aesIv, FS.readFileSync(certFile)),
                "KeyFile": aesEncrypt(aesKey, aesIv, FS.readFileSync(keyFile)),
                "CertPassword": aesEncrypt(aesKey, aesIv, "인증서 비밀번호")
            },
        }

        const res  = Request("POST", url, options)
        console.log(res.getBody("utf8"))
        const parsed = JSON.parse(res.getBody("utf8"))
        console.log(JSON.stringify(parsed))
    }
}