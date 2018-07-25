let title = ['标题1', '标题2', '标题3'];

Page({
  data: {
    // index:全局下标 inner:内部滑块下标 outer:外部滑块下标 # 第一个外部滑块里套了两个内部滑块
    swiperSelected: { index: 0, inner: 0, outer: 0 },

    titleSlider: {
      width: 100 / title.length,        // 百分比
      left: 0
    },

    text_title: title
  },
  bindTitleTap: function (e) {
    let id = e.currentTarget.dataset.id,
      swiperSelected = this.data.swiperSelected,
      titleSlider = this.data.titleSlider;

    console.info('当前点击：', id);

    if (swiperSelected.index !== id) {
      swiperSelected.index = id;

      if (id < 2) {
        // 内部滑块
        swiperSelected.inner = id;
        swiperSelected.outer = 0;
      } else {
        // 外部滑块
        swiperSelected.outer = 1;
      }

      titleSlider.left = titleSlider.width * id;

      this.setData({
        swiperSelected,
        titleSlider
      });
    }
  },
  forbidSwiperMove: function () {
    // 禁止左右滑动
  }
});