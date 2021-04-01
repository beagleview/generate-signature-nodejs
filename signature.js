const rs = require('jsrsasign');
const rsu = require('jsrsasign-util');

module.exports.generate = function (privateKey,data){
    const sig = new rs.KJUR.Signature({alg: 'SHA256withRSA'})
    sig.init(privateKey)
    sig.updateString(data)
    const hSigVal = sig.sign()
    const base64String = hexToBase64(hSigVal)
    const signature = "digest-alg=RSA-SHA; key-id=KEY:RSA:rsf.org; data=" + base64String
    console.log("signature",signature)
    return signature
}

module.exports.verify = function (publicKey,sigHex,data){
    const sig = new rs.KJUR.Signature({alg: 'SHA256withRSA'})
    const value = rsu.readFile(data)
    sig.init(publicKey)
    sig.updateString(value)
    const isValid = sig.verify(sigHex)
    return isValid
}

function hexToBase64(hexString) {
    return btoa(hexString.match(/\w{2}/g).map(function(a) {
        return String.fromCharCode(parseInt(a, 16))
    }).join(""))
}

