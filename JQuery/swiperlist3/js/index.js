var swiper = new Swiper('.swiper-container',{
    pagination: '.swiper-pagination',
    paginationClickable: true,
    paginationBulletRender: function(swiper, index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
    }
});