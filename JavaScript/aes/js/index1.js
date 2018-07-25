(function(){
	//The following code example enciphers the plaintext block '00 11 22 .. EE FF' with the 256 bit key '00 01 02 .. 1E 1F'. 
    AES_Init();
    var block = new Array(16);
    for(var i = 0; i < 16; i++)
      block[i] = 0x11 * i;
    //生成128位密钥
    var key = new Array(32);
    for(var i = 0; i < 32; i++)
      key[i] = i;
    AES_ExpandKey(key);
    AES_Encrypt(block, key);
    document.getElementById("AEScontrol").innerText = block;
    AES_Done();

    //下面对加密后的block进行解密
    AES_Init();
    //生成128位密钥
    var key = new Array(32);
    for(var i = 0; i < 32; i++)
      key[i] = i;
    AES_ExpandKey(key);
    AES_Decrypt(block, key);
    document.getElementById("decryptedValue").innerText = block;
    AES_Done();
})();