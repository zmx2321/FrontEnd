    var analogData = ['事业单位', '医疗行业', '餐饮行业', 'IT行业'];
    var data = [];
    for (var i = 0; i < analogData.length; i++) {
        data.push({"id": '精英' + '.' + analogData[i], "name": i+1,"index":i,'style':'cursor:pointer;'});
    }
    data.unshift({"id": '精英', "name": 0});
    $('g').remove();
    //关系图谱
    var svg = d3.select("#svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height"),
        g = svg.append("g").attr("transform", "translate(1050,590)");
    var stratify = d3.stratify()
        .parentId(function (d) {
            return d.id.substring(0, d.id.lastIndexOf("."));
        });
    var tree = d3.tree()
        .size([360, 460])
        .separation(function (a, b) {
            return (a.parent == b.parent ? 1 : 2) / a.depth;
        });

    var root = tree(stratify(data));
    var link = g.selectAll(".link")
        .data(root.descendants().slice(1))
        .enter().append("path")
        .attr("class", "link")
        .attr('data-id', function (d) {
            return d.data.name
        })
        .attr("d", function (d) {
            return "M" + project(d.x, d.y)
                + "C" + project(d.x, (d.y + d.parent.y) / 2)
                + " " + project(d.parent.x, (d.y + d.parent.y) / 4)
                + " " + project(d.parent.x, d.parent.y);
        });

    var node = g.selectAll(".node")
        .data(root.descendants())
        .enter().append("g")
        .attr("class", function (d) {
            return "node" + (d.children ? " node--internal" : " node--leaf");
        })
        .attr("transform", function (d) {
            return "translate(" + project(d.x, d.y) + ")";
        });
    node.append("circle")
        .attr('data-id', function (d) {
            return d.data.name
        })
        .attr('index', function (d) { //序号
            return d.data.index
        })
        .attr('style', function (d) { //类
            return d.data.style
        });
    var circleArr = [55, 70, 85];
    $('.node--leaf').each(function () {
        var num = Math.floor(Math.random() * circleArr.length);
        $(this).find('circle')
            .attr('r', circleArr[num]);
    });
    $('.node--internal').find('circle')
        .attr('r', 100);
    node.append("text")
        .attr("dy", ".31em")
        .attr("x", function (d) {
            return d.x < 180 === !d.children ? 130 : -130;
        })
        .style("text-anchor", function (d) {
            return d.x < 180 === !d.children ? "start" : "end";
        })
        .attr('data-id', function (d) {
            return d.data.name
        })
        .attr("transform", function (d) {
            return "rotate(0)";
        })
        .text(function (d) {
            var v = d.id.substring(d.id.lastIndexOf(".") + 1);
            return v;
        });
    node.append('title')
        .text(function (d) {
            return d.id.substring(d.id.lastIndexOf("-") + 1);
        });
    var hoverBox = document.getElementById('hover-box');
    var allHoverData = [{'name':'小名','age':25,'work':'教师','work-year':'3年'},
                     {'name':'小点','age':25,'work':'医生','work-year':'3年'},
                     {'name':'小呢','age':26,'work':'厨师','work-year':'4年'},
                     {'name':'小哇','age':23,'work':'IT工程师','work-year':'1年'}];
    $('.node--leaf circle').on({
        'mouseover': function (e) {
            var index = $(this).attr('index');
            var hoverData = allHoverData[index];
            $('.fill-data').empty();
            $('.fill-data').each(function () {
                for(var k in hoverData){
                    if(k == $(this).attr('data-name')){
                        $(this).text(hoverData[k]);
                    }
                }
            });
            var event = e|| window.event;
            hoverBox.style.display='block';
            hoverBox.style.cursor = 'pointer';
            hoverBox.style.left = event.clientX-50 + "px";
            hoverBox.style.top = event.clientY-130 + "px";
        },
        'mouseout': function () {
            hoverBox.style.display='none';
            $('.node--leaf').onmousemove = null;
        }
    });
    function project(x, y) {
        var angle = (x - 90) / 180 * Math.PI, radius = y;
        return [radius * Math.cos(angle), radius * Math.sin(angle)];
    }