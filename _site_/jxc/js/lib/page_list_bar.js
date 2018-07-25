/// <reference path="jquery-1.9.1.min.js" />

/*
所需样式：
.commonPageUl span
{
list-style-type: none;

padding:6px 10px;
background:#FFF;
float:left;
border:solid 1px #ddd;
margin:1px;
cursor:pointer;
}

.commonPageUl .nowPage
{
list-style-type: none;
padding:7px 11px;
background:#F00;
color:#FFF;
float:left;
border:none;
border:solid 1px #F00;
margin:1px;
cursor:auto;
}

.commonPageUl .Disable
{
cursor:auto;
color:#AAA;
}
*/


/**
 * zxw@20150331
 * 说明：使用js将createPageButton(当前页码,数据总条数)填充到要显示的html标签中,
 * 并在页面中重载pagelist(当前页码)的方法，方法中同样需要调用createPageButton(当前页码,数据总条数)
 */
function createPageButton(pIndex, count) {
    var pageIndex = parseInt(pIndex);
    var strPage = "";
    var pageNum = parseInt(count / 20) + 1;

    if (pageIndex == 1) {
        strPage += "<span class='Disable'>首页</span>";
        strPage += "<span class='Disable'>上一页</span>";
    } else {
        strPage += "<span " + strVoid(1) + ">首页</span>";
        strPage += "<span " + strVoid(pageIndex - 1) + ">上一页</span>";
    }

    if (pageNum <= 9) {
        for (var i = 1; i <= pageNum; i++) {
            var style = "";
            if (i == pageIndex)
                style = "class='nowPage'";
            else
                style = strVoid(i);
            strPage += "<span " + style + " >" + i + "</span>";
        }
    } else {
        if (pageIndex < 6) {
            for (var i = 1; i < 9; i++) {
                var style = "";
                if (i == pageIndex)
                    style = "class='nowPage'";
                else
                    style = strVoid(i);
                strPage += "<span " + style + " >" + i + "</span>";
            }
            strPage += "<span class='Disable'>…</span>";
            strPage += "<span " + strVoid(pageNum) + ">" + pageNum + "</span>";

        } else {

            strPage += "<span " + strVoid(1) + ">1</span>";
            strPage += "<span class='Disable'>…</span>";

            if (pageIndex > pageNum - 5) {

                for (var i = pageNum - 7; i <= pageNum; i++) {
                    var style = "";
                    if (i == pageIndex)
                        style = "class='nowPage'";
                    else
                        style = strVoid(i);
                    strPage += "<span " + style + " >" + i + "</span>";
                }
            } else {
                for (var i = pageIndex - 3; i < pageIndex + 4; i++) {
                    var style = "";
                    if (i == pageIndex)
                        style = "class='nowPage'";
                    else
                        style = strVoid(i);
                    strPage += "<span " + style + " >" + i + "</span>";
                }
                strPage += "<span class='Disable'>…</span>";
                strPage += "<span " + strVoid(pageNum) + ">" + pageNum + "</span>";
            }
        }
    }
    if (pageIndex == pageNum) {
        strPage += "<span class='Disable'>下一页</span>";
        strPage += "<span class='Disable'>尾页</span>";
    } else {
        strPage += "<span " + strVoid(pageIndex + 1) + ">下一页</span>";
        strPage += "<span " + strVoid(pageNum) + ">尾页</span>";
    }
    return strPage;
}

function strVoid(num) {
    return "onclick = 'pagelist(" + num + ")'";
}