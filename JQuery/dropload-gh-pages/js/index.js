// alert();
// // 按钮操作
// $('.header .btn').on('click',function(){
//     var $this = $(this);
//     if(!!$this.hasClass('lock')){
//         $this.attr('class','btn unlock');
//         $this.text('解锁');
//         // 锁定
//         dropload.lock();
//     }else{
//         $this.attr('class','btn lock');
//         $this.text('锁定');
//         // 解锁
//         dropload.unlock();
//     }
// });

// // dropload
// var dropload = $('.inner').dropload({
//     domUp : {
//         domClass   : 'dropload-up',
//         domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
//         domUpdate  : '<div class="dropload-update">↑释放更新</div>',
//         domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
//     },
//     domDown : {
//         domClass   : 'dropload-down',
//         domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
//         domUpdate  : '<div class="dropload-update">↓释放加载</div>',
//         domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
//     },
//     loadUpFn : function(me){
//         $.ajax({
//             type: 'GET',
//             url: 'json/update.json',
//             dataType: 'json',
//             success: function(data){
//                 var result = '';
//                 for(var i = 0; i < data.lists.length; i++){
//                     result +=   '<a class="item opacity">'
//                                     +'<img src="'+data.lists[i].pic+'" alt="">'
//                                     +'<h3 href="'+data.lists[i].link+'" >'+data.lists[i].title+'</h3>'
//                                     +'<span class="date">'+data.lists[i].date+'</span>'
//                                 +'</a>';
//                 }
//                 // 为了测试，延迟1秒加载
//                 setTimeout(function(){
//                     $('.lists').html('');
//                     $('.lists').prepend(result);
//                     me.resetload();
//                 },1000);
//             },
//             error: function(xhr, type){
//                 alert('Ajax error!');
//                 me.resetload();
//             }
//         });
//     },
//     loadDownFn : function(me){
//         $.ajax({
//             type: 'GET',
//             url: 'json/more.json',
//             dataType: 'json',
//             success: function(data){
//                 var result = '';
//                 for(var i = 0; i < data.lists.length; i++){
//                     result +=   '<a class="item opacity">'
//                                     +'<img src="'+data.lists[i].pic+'" alt="">'
//                                     +'<h3 href="'+data.lists[i].link+'" >'+data.lists[i].title+'</h3>'
//                                     +'<span class="date">'+data.lists[i].date+'</span>'
//                                 +'</a>';
//                 }
//                 // 为了测试，延迟1秒加载
//                 setTimeout(function(){
//                     $('.lists').append(result);
//                     me.resetload();
//                 },1000);
//             },
//             error: function(xhr, type){
//                 alert('Ajax error!');
//                 me.resetload();
//             }
//         });
//     }
// });