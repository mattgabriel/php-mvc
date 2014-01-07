// JavaScript Document

$(document).ready(function(){
		
	//config
	var blackOutClass		= '.blackOutBox';
	var boxContainerClass	= '.centerBox';
	var openButton			= '.clickMe';
	var closeButton			= '.closeMe';
	var handleClass			= '.centerBox h1';
	
	$(window).resize(function(){		
		$(blackOutClass).css({
			'height'	: giveMeTheValueOf('height'),
			'width'		: giveMeTheValueOf('width')
		});		
		centerBox(boxContainerClass);
		dragMe(boxContainerClass,handleClass);	
	});	
			
	$(openButton).click(function(){	
		$(blackOutClass).fadeIn().css({
			'height'	: giveMeTheValueOf('height'),
			'width'		: giveMeTheValueOf('width')
		});		
		centerBox(boxContainerClass);
		dragMe(boxContainerClass,handleClass);
	});
	
	$(closeButton).click(function(){
		$(blackOutClass).fadeOut();
	});
	
	
	function centerBox(className){
		var windowHeight = $(window).height();
		var windowWidth = $(window).width();	
		var boxHeight	= $(className).height();
		var boxWidth 	= $(className).width();	
		
		var left = (parseInt(windowWidth) - parseInt(boxWidth)) / 2;
		var top = (parseInt(windowHeight) - parseInt(boxHeight)) / 2;
		
		$(className).css({
			'top'	: top,
			'left'	: left
		});	
	}
	
	function dragMe(className,handle){
		$(className)
		.on('dragstart',function(event){
			return $(event.target).is(handle);
			})
		.on('drag',function( event ){
			$(this).css({
				top: event.offsetY,
				left: event.offsetX
				});
			});
	}
	
	//calculate width and height
	function giveMeTheValueOf(value){
		var windowHeight = $(window).height();
		var windowWidth = $(window).width();		
		var documentHeight = $(document).height();
		var documentWidth = $(document).width();			
		if(documentHeight > windowHeight){ var height = documentHeight;
		} else { var height = windowHeight; }		
		if(documentWidth > windowWidth){ var width = documentWidth;
		} else { var width = windowWidth; }
		
		if(value === 'height'){ return height;
		} else { return width; }
	}
	
	
});