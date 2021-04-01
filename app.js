var rs = require('jsrsasign');


function generate(data){
    var sig = new KJUR.Signature({alg: 'SHA256withRSA'});
    sig.init(privateKey);
    sig.updateString(plainText);
    var hSigVal = sig.sign();
}

function verify(data){
}