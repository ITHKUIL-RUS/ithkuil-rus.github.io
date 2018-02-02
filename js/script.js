var bar_bg = document.getElementById("scrollbar-bg"),
    body = document.body,
    html = document.documentElement;
body.onload=function(){
	var heads = [],
		gaps = [],
		aGap,
		dh  = Math.max(body.scrollHeight, body.offsetHeight,  html.clientHeight, html.scrollHeight, html.offsetHeight),
		wh  = window.innerHeight;
		
	for(var i=0; i<document.getElementsByTagName("h2").length; i++){
		heads[i] = document.getElementsByTagName("h2")[i].offsetTop;
		gaps[i] = (heads[i] / (dh-wh)) * 100;
		document.getElementById("scrollbar").insertAdjacentHTML("beforeBegin", '<div class="gap" style="left: ' + gaps[i] + 'vw"></div>');
	}
};
bar_bg.style.minWidth = document.width + "px";

document.getElementsByTagName("body")[0].onresize = function() {
	// Update the gradient width
	bar_bg.style.minWidth = document.width + "px";
}

window.onscroll = function() {
	// Change the width of the progress bar
	var bar = document.getElementById("scrollbar"),
		dw  = document.documentElement.clientWidth,
		dh  = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight ),
		wh  = window.innerHeight,
		pos = pageYOffset || (document.documentElement.clientHeight ?
                              document.documentElement.scrollTop : document.body.scrollTop),
		bw  = ((pos / (dh - wh)) * 100);

	bar.style.width = bw + "%";
}

up.onclick = function() {
  html.style.fontSize = parseInt(getComputedStyle(html, '').fontSize) + 1 + 'px';
};
down.onclick = function() {
  html.style.fontSize = parseInt(getComputedStyle(html, '').fontSize) - 1 + 'px';
};