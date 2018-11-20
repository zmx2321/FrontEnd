var demo = new Vue({
    el: '#main',
    data: {
        // 视图模型，可能的值是 "grid" 或 "list"。
        layout: 'grid',

        articles: [{
            "title": "HTML 教程",
            "url": "https://www.runoob.com/html/html-tutorial.html",
            "image": {
                "large": "https://static.runoob.com/images/mix/htmlbig.png",
                "small": "https://static.runoob.com/images/icon/html.png"
            }
        },
        {
            "title": "CSS 教程",
            "url": "https://www.runoob.com/css/css-tutorial.html",
            "image": {
                "large": "https://static.runoob.com/images/mix/cssbig.png",
                "small": "https://static.runoob.com/images/icon/css.png"
            }
        },
        {
            "title": "JS 教程",
            "url": "https://www.runoob.com/js/js-tutorial.html",
            "image": {
                "large": "https://static.runoob.com/images/mix/jsbig.jpeg",
                "small": "https://static.runoob.com/images/icon/js.png"
            }
        },
        {
            "title": "SQL  教程",
            "url": "https://www.runoob.com/sql/sql-tutorial.html",
            "image": {
                "large": "https://static.runoob.com/images/mix/sqlbig.png",
                "small": "https://static.runoob.com/images/icon/sql.png"
            }
        },
        {
            "title": "Ajax 教程",
            "url": "https://www.runoob.com/ajax/ajax-tutorial.html",
            "image": {
                "large": "https://static.runoob.com/images/mix/ajaxbig.png",
                "small": "https://static.runoob.com/images/icon/ajax.png"
            }
        },
        {
            "title": "Python 教程",
            "url": "https://www.runoob.com/pyhton/pyhton-tutorial.html",
            "image": {
                "large": "https://static.runoob.com/images/mix/pythonbig.png",
                "small": "https://static.runoob.com/images/icon/python.png"
            }
        }]

    }
});