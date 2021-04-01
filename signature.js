const rs = require('jsrsasign')

module.exports.generate = function (privateKey,data){
    const sig = new rs.KJUR.crypto.Signature({alg: 'SHA256withRSA'})
    sig.init(privateKey)
    sig.updateString(data)
    const hSigVal = sig.sign()
    console.log("Before hex",hSigVal);

    const base64String = Buffer.from(hSigVal,"hex").toString('base64')
    const signature = base64String
    console.log("signature",signature)
    return signature
}

module.exports.verify = function (publicKey,sign,data){
    const sig = new rs.KJUR.crypto.Signature({alg: 'SHA256withRSA'})
    sig.init(publicKey)
    sig.updateString(data)
    const sigHex = Buffer.from(sign,"base64").toString("hex")
    console.log("Before verify",sigHex);

    const isValid = sig.verify(sigHex)
    if (isValid) {
        console.log("signature is valid");
    } else {
        console.log("signature is invalid");
    }
    return isValid
}


