$(document).ready( function() {
    var total = Math.ceil($("ul li").length / 3);
    var current = 1;
    $("ul li:gt(2)").hide();
    $("#btnPrev").attr("disabled", "disabled").click( function() {
        $("#btnNext").removeAttr("disabled");
        current -= 1;
        $("ul li").show();
        var indexStart = (current - 1) * 3;
        var indexEnd = indexStart + 2;
        $("li:lt(" + indexStart + "), li:gt(" + indexEnd + ")", $("ul")).hide();
        if (current == 1) $(this).attr("disabled", "disabled");
    });
    $("#btnNext").click( function() {
        $("#btnPrev").removeAttr("disabled");
        current += 1;
        $("ul li").show();
        var indexStart = (current - 1) * 3;
        var indexEnd = current * 3 - 1 > $("ul li").length - 1 ? $("ul li").length - 1 : current * 3 - 1;
        $("li:lt(" + indexStart + "), li:gt(" + indexEnd +")", $("ul")).hide();
        if (current == total) $(this).attr("disabled", "disabled");
    });
});