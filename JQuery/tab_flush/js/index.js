var shash = location.hash;
console.log(shash);
if(shash){
    tab(shash.match(/\d+/)[0]);
}
$('.b').click(function(){
    tab($(this).index());
});
function tab(index){
    $('.a').siblings('.a').hide().end().eq(index).show();
}

/*jQuery(document).ready(function($) {
	if (window.history && window.history.pushState) {

	  $(window).on('popstate', function() {
	    var hashLocation = location.hash;
	    var hashSplit = hashLocation.split("#!/");
	    var hashName = hashSplit[1];

	    if (hashName !== '') {
	      var hash = window.location.hash;
	      if (hash === shash) {
	        tab($(this).index());
	      }
	    }
	  });

      window.history.pushState('forward', null, './#forward');     } });*/
