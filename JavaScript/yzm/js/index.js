var code;//未赋值  类型？   保存四位随机验证码
function createCode(){
    code = '';
    var codeLength = 4;//验证码长度
    //var checkCode = document.querySelector('#code')
    var checkCode = document.getElementById('code');//alert()   window.alert()
    var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H',
        'I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');//random[i]  i取值范围？
    // i Math.random()
    for(var i = 0;i<codeLength;i++){
        var index = Math.floor(Math.random()*36);//0,36  包括0不包括36 向下取整
        code += random[index];
    }
    checkCode.value = code;
}
function validCode(){
    var inputCode = document.getElementById('input').value.toUpperCase();
    //alert(inputCode);
    if(inputCode.length<=0 ){
        alert('请输入验证码');
        createCode();
    }else if(inputCode != code){
        alert('验证码输入错误');
        createCode();
        document.getElementById('input').value = '';
    }else{
        alert('^_^');
    }
}