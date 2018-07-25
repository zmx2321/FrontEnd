var arr = [true,true, true,true, true, true];
			$('.sub-li').click(function () {
			   var index =  $(this).attr('data-index');
			   console.log(index)
			   if(arr[index]){
                   $(this).find('.sub-ul').show();
                   arr[index] = false;
			   }else{
                   $(this).find('.sub-ul').hide();
                   arr[index] = true;
			   }
			});