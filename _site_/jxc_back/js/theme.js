themeUtil = {

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

//load
$(function(){
	submitEditor();  // 提交图文详情 (富文本 wangEditor)
});