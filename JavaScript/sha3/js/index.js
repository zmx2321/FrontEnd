 var hash = CryptoJS.SHA3("Message");
 console.log(hash.toString()); //Same as hash.toString(CryptoJS.enc.Hex);