var region = {

    湖南:
    {

        "常德": ["石门", "桃源", "临澧", "汉寿"],

        "益阳": ["益阳1", "益阳2", "益阳3"],

        "岳阳": ["岳阳1", "岳阳2", "岳阳3", "岳阳4", "岳阳5", "岳阳6", "岳阳7"],

        "永州": ["永州1", "永州2"],

        "郴州": ["郴州1", "郴州2", "郴州3"],

        "湘潭": ["湘潭1", "湘潭2", "湘潭3"]

    },

    广东:
    {

        "广州": ["广州1", "广州2", "广州3"],

        "珠海": ["珠海1", "珠海2", "珠海3"],

        "佛山": ["佛山1"]

    }

}

//alert(region["湖南"]["常德"]);

var province = document.getElementById("province");

var city = document.getElementById("city");

var county = document.getElementById("county");

//二级联动不用定义你选的省份,直接用省份(key)来决定下面的市(value)值,

var provinceName = null;

for (ele in region)
{

    //alert(ele);

    var op = new Option(ele,ele,false,false);

    province.options[province.length] = op;

}

var change = function(src)
{

    city.innerHTML = "";

    for (index in region[src])
    {

        //alert(index);

        var op = new Option(index,index,false,false);

        city.options[city.length] = op;

    }

    //记住你选的省份的值是什么

    provinceName = src;

}

var countyChange = function(src2)
{

    county.innerHTML = "";

    //关键是如何表示:第三级县城的数据:??

    for (index in region[provinceName][src2])
    {

        //alert(index);

        var op = new Option(region[provinceName][src2][index],region[provinceName][src2][index],false,false);

        county.options[county.length] = op;

    }

}
