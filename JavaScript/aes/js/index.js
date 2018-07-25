!function(){
	for(var i=0; i<100; i++){
		var pwd="秘钥";

		function Encrypt(word){
		    return CryptoJS.AES.encrypt(word,pwd).toString();
		}

		function Decrypt(word){
		    return CryptoJS.AES.decrypt(word,pwd).toString(CryptoJS.enc.Utf8);
		}

		var mm = Encrypt('1111');
		console.log(mm);
		document.writeln("<p>" + mm + "</p>");
		
		var jm = Decrypt(mm);
		console.log(jm);
		document.writeln("<p>" + jm + "</p>");
	}
}();

/*var key = CryptoJS.enc.Utf8.parse("十六位十六进制数作为秘钥");  
var iv  = CryptoJS.enc.Utf8.parse('十六位十六进制数作为秘钥偏移量');  
function Encrypt(word){
    srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv,mode:CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7});
    return encrypted.ciphertext.toString().toUpperCase();
}

function Decrypt(word){  
    var encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    var decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv,mode:CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7});
    var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8); 
    return decryptedStr.toString();
}

var mm = Encrypt('nihao')
console.log(mm);
var jm = Decrypt(mm);
console.log(jm)*/