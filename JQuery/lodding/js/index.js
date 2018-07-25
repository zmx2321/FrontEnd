   $(document).ready(function () {
        var _html = '<div class="circle-item"></div>';
        for (var i = 0; i < 12; i++) {
            var el = $(_html);
            el.addClass('circle-item-'+(i+1));
            el.css('transform',' rotate('+30*i+'deg)');
            $('#circle-box-1').append(el);
        }
    });