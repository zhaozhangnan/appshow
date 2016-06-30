function resetPage() {
	var deviceWidth = document.documentElement.clientWidth,
	scale = deviceWidth/320;
	document.body.style.zoom = scale;
}
window.onload = function(){
	resetPage();
}
window.onresize = function(){
	resetPage();
}