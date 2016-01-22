
/* 触发元素的transiton(过渡)，切换元素的类名可以触发该元素的transition(过渡)

暂停元素的transition(过渡)， 在你想要暂停过渡点，用getComputedStyle和getPropertyValue获取该元素相应的CSS属性值，然后设置该元素的对应的CSS属性等于你刚才获取到的CSS属性值。 */
var box = document.getElementsByClassName("box")[0];
var box1 = $(".box").eq(1);

document.getElementsByClassName("toggleButton")[0].onclick = function() {
	if(this.innerHTML === "play"){
		this.innerHTML = "push";
		box.classList.add("horizTranslate");
	}else{
		this.innerHTML = "play";
		var m_left = window.getComputedStyle(box).getPropertyValue('margin-left');
		box.classList.remove("horizTranslate");
		box.style.marginLeft = m_left;
	}
};


$(".toggleButton").eq(1).click(function() {
	if($(this).html() === "play"){
		$(this).html("push");
		box1.addClass('horizTranslate');
	}else{
		$(this).html("play");
		box1.css("margin-left",box1.css('margin-left'));
		box1.removeClass('horizTranslate');
	}
});



/*加强上一个方法 跟踪当前缩放率*/
var zoom1 = document.getElementsByClassName("zoomPic")[0];
var oldSize = window.getComputedStyle(zoom1).getPropertyValue("background-size");
document.getElementsByClassName("zoom")[0].onclick = function() {
	if(!zoom1.classList.contains('zoom')){
		zoom1.classList.add("zoom");
	}
};


document.getElementsByClassName("pause")[0].onclick = function() {
	zoom1.classList.remove("zoom");
	zoom1.style.backgroundSize = window.getComputedStyle(zoom1).getPropertyValue("background-size");
};

document.getElementsByClassName("zoomout")[0].onclick = function() {
	zoom1.classList.remove('zoom');
	zoom1.style.backgroundSize = oldSize;
};


var zoom2 = $(".zoomPic").eq(1);
var oldSize2 = zoom2.css("background-size");

zoom2.next(".zoom").click(function() {
	if(!zoom2.hasClass('zoom')){
		zoom2.addClass('zoom');
	}
});

                                 $(".pause").eq(1).click(function() {
	zoom2.removeClass('zoom');
	zoom2.css("background-size",zoom2.css("background-size"));
});

$(".zoomout").eq(1).click(function() {
	zoom2.removeClass('zoom');
	zoom2.css("background-size",oldSize2);
});


/*一些最有用但鲜为人知JavaScript技巧，就是利用监听Dom事件控制CSS transitions(过渡)和animations(动画)。如：与animations(动画)相关的animationEnd,animationStart和animationIteration；与transitions(过渡)相关的transitonEnd。你可能已经猜到它们是做什么的。这些动画事件分别是在元素的动画结束时，开始时，或者完成一次迭代时触发。

目前使用这些事件还需要添加浏览器前缀，所以在这个演示中，我们使用由Craig Buckler开发的叫PrefixedEvent的方法。该方法的参数有element(元素)，type(类型)和callback(回调)来实现跨浏览器的兼容。这里是他的一篇文章使用JavaScript捕获CSS animations(动画)。这里是另一篇关于通过判断动画名称来判断触发哪个事件。*/

var heart = document.getElementsByClassName("heart")[1],
	pfx = ['webkit','moz','MS','o',''],
	hovered = false;



function AnimationListener () {
	 if(hovered){
	 	heart.classList.remove('animated');
	 	heart.style.webkitTransform = 'scale(2)';
	 	heart.style.MozTransform = 'scale(2)';
	 	heart.style.msTransform = 'scale(2)';
	                             	heart.style.OTransform = 'scale(2)';
	 	heart.style.Transform = 'scale(2)';
	 } 
}

function TransitionListener () {
	 if(!hovered){
	 	heart.classList.add('animated');
	 } 
}

function PrefixedEvent (element, type, callback) {
	 for (var i = 0; i < pfx.length; i++) {
	                            	if(!pfx[i]) {type=type.toLowerCase();}
	 	element.addEventListener(pfx[i]+type, callback,false);
	 }
}



function defaults () {
	 console.log("default");
}

/*
    animationstart - CSS 动画开始后触发
    animationiteration - CSS 动画重复播放时触发
    animationend - CSS 动画完成后触发
*/

PrefixedEvent(heart,"AnimationIteration",AnimationListener); //动画重复播放时触发

heart.onmouseover = function() {
	hovered = true;
};

heart.onmouseout = function() {
	setTimeout(function() {
		hovered = false;
	},500);

	PrefixedEvent(heart,"TransitionEnd",TransitionListener); //TransitionEnd 动画完成后触发
	heart.style.webkitTransform = 'scale(1)';
	heart.style.MozTransform = 'scale(1)';
	heart.style.msTransform = 'scale(1)';
	heart.style.OTransform = 'scale(1)';
	heart.style.Transform = 'scale(1)';
};

console.log('');
