$(document).ready(() =>{
	let map = new BMap.Map("allmap");
	let point = new BMap.Point(this.model.longitude, this.model.latitude);
	map.centerAndZoom(point, 15);
	let myIcon = new BMap.Icon("http://api0.map.bdimg.com/images/marker_red_sprite.png", new BMap.Size(50, 50));
	let marker = new BMap.Marker(point, {
		icon: myIcon,
		enableDragging: false
	});
	let address = this.$filter(getAreaPath)(this.model.zone_id, this.$rootScope.area);
	address = ('地址' + address + this.model.address).replace(/\\s+/,"").replace(" ", "");
	let iw = createInfoWindow(this.model.name, address);
	let label = new BMap.Label(this.model.name,{"offset":new BMap.Size(20, -5)});
	label.setStyle({
	borderColor:"#808080",
	color:"#333",
	cursor:"pointer",
	maxWidth: "inherit"
	});
	marker.setLabel(label);
	map.addOverlay(marker);
	label.addEventListener("click",function(){
	marker.openInfoWindow(iw);
	});
	marker.addEventListener("click",function(){
	this.openInfoWindow(iw);
	});
	iw.addEventListener("open",function(){
	marker.getLabel().hide();
	});
	iw.addEventListener("close",function(){
	marker.getLabel().show();
	});
	label.hide();
	marker.openInfoWindow(iw);

	function createInfoWindow(title, address) {
	var content = "<b class=\'iw_poi_title\' title=\'" + title + "\'>" + title + "</b><div class=\'iw_poi_content\'>"+ address +"</div>";
	var iw = new BMap.InfoWindow(content, {
	width : 200,
	offset: new BMap.Size(-8, -10),
	enableCloseOnClick: true
	});
	return iw;
	}
});