//星星评价
var starEvaluate = function(){
    //获取星星评价
    $.fn.raty.defaults.path = 'images';

    //老师授课态度
    $('.total_points').raty({
        click: function(score, evt) {
            abilityScore = $(this).find("input").val();
            console.log(abilityScore);
        },
        score: function() {
            return $(this).attr('data-score');
        }
    });
}

$(function(){
    starEvaluate(); //星星评价
});