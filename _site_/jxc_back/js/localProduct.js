localProductUtil = {

}

// 提交图文详情 (富文本 wangEditor)
var submitEditor = function (){
    var E = window.wangEditor
    var editor = new E('#editorToolbar', '#editorContent')
    editor.customConfig.uploadImgShowBase64 = true  // 使用 base64 保存图片  

    editor.create();

    $('#editorTextSave').click(function(){
        var content = editor.txt.html();  // 读取 html

        if(content==""){  
            alert('请把内容填写完整！');  
            return false;  
        }  
          
         $.ajax({  
            type : "post",  
            url : "/upload",  
            data : {
                "content" : content  
            },  
            success : function(res) {  
                alert('保存成功!');
                editor.txt.clear();  //清空编辑器内容
            },  
            error : function(data) {  
                alert('保存失败！');  
            }  
        }); 
    });   
}

//编辑价格
var priedt = function(){
    util.fixInfo($('#editPrice'), $('.price span'), $('#price'), 
        $('.priedt_box .edit'), $('#comfirmPrice'), $('#closePrice'), 
        $('.pudtal_top_l'), 'edit_price_active');
}

//编辑原价
var oldPriedt = function(){
    util.fixInfo($('#editOldPriedt'), $('.oldprice span'), $('#oldprice'), 
            $('.old_priedt_box .edit'), $('#comfirmOldPriedt'), $('#closeOldPriedt'), 
            $('.pudtal_top_l'), 'edit_price_active');
}

//编辑份数
var prodnum = function(){
    util.fixInfo($('#editProdNum'), $('.editprodnum span'), $('#prodnum'), 
            $('.editprodnum .edit'), $('#comfirmProdNum'), $('#closeProdNum'), 
            $('.editprodnum'), 'edit_num_active');
}

//编辑产品名称
var pudtal = function(){
    util.fixInfo($('#editPudtal'), $('.pudtal_tit h1'), $('#pudtal'), 
            $('.pudtal_tit_edit .edit'), $('#comfirmPudtal'), $('#closePudtal'), 
            $('.pudtal_tit'), 'edit_pudtal_active');
}

//load
$(function(){
	submitEditor();  // 提交图文详情 (富文本 wangEditor)
    priedt();  //编辑价格
    oldPriedt();  //编辑原价
    prodnum();  //编辑份数
    pudtal();  //编辑产品名称
});