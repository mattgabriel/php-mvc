// JavaScript Document

$(document).ready(function(){
		
	//center box in the middle of the screen
	var centerBox_className = '#centerMe';
	centerBox(centerBox_className);
	$(window).resize(function(){
		centerBox(centerBox_className);
	});
	function centerBox(centerBox_className){
		var centerBox_windowHeight = $(window).height();
		var centerBox_boxHeight	= $(centerBox_className).height();
		
		var centerBox_marginTop = ((parseInt(centerBox_windowHeight) - parseInt(centerBox_boxHeight)) / 2) - 50;
		// - 50; from header height.
		
		$(centerBox_className).css({
			'margin-top'	: centerBox_marginTop
		});	
	}	
	
	
	////Minimize adminMenu panel
	//define classes/id's
	var adminMenu 				= '.adminMenu'; 		//needed
	var adminMenuClose 			= '.adminMenuClose';	//needed
	var adminBody 				= '.adminBody'; 		//needed
	var adminMenuWidth 			= $(adminMenu).width();
	var adminBodyMargin 		= $(adminBody).css('margin-left');
	var adminMenuCloseWidth 	= $(adminMenuClose).width();
	var isPanelOpen 			= 1;
	
	$(adminMenuClose).on('click', function(){
		if(isPanelOpen === 1){
			$(this).parent().animate({
				width : adminMenuCloseWidth + 'px'
			},500);
			$(adminBody).animate({
				'margin-left' : '0px'
			},500);
			isPanelOpen = 0;
		} else {
			$(this).parent().animate({
				width : adminMenuWidth + 'px'
			},500);
			$(adminBody).animate({
				'margin-left' : adminBodyMargin
			},500);
			isPanelOpen = 1;
		}
	});
	
	
	
	//jQuery UI Tooltip
	$(function() {
		$( document ).tooltip({
			position: {
			my: "left top+20",
			using: function( position, feedback ) {
				$( this ).css( position );
				$( "<div>" )
				.addClass( "arrow" )
				.addClass( feedback.vertical )
				.addClass( feedback.horizontal )
				.appendTo( this );
				}
			}
		});
	});
	
	
	//header settings btn
	var settingsExpanded = 0;
	$(document).on("click",".headerDropDownBtnShowHide", function(){
		$(".headerDropDownList").fadeToggle("fast", function(){
			if(settingsExpanded == 0){ settingsExpanded = 1;
			} else { settingsExpanded = 0; }
		});
		return false;
	});
	$(document.body).on("click",function(){
		if(settingsExpanded == 1){
			if(!$(".headerDropDownBtn li a").has(this).length) { // if the click was not within the headerDropDownBtnShowHide
				$(".headerDropDownList").fadeOut("fast");
				settingsExpanded = 0;
				event.stopPropagation();
			}
		}
	});
	
	
	//user search bar
	var searchExpanded = 0;
	$(".searchBtn").on("click",function(event){
		if(searchExpanded == 0){ 
			searchExpanded = 1; 
			$(".searchBtn").css("background-color","#555");
		} else { 
			searchExpanded = 0; 
			$(".searchBtn").css("background-color","transparent");
		}
		$(".searchBox").animate({width:"toggle"},200);
		$(".searchBar input").focus();
		$(".headerDropDownList").fadeOut("fast"); ////////bonus
		event.stopPropagation();
	});
	$(".searchBar").on("click",function(event){
		event.stopPropagation();
	});
	$(document.body).on("click",function(){
		if(searchExpanded == 1){
			if(!$(".searchBox").has(this).length) { // if the click was not within the searchBox
				$(".searchBtn").css("background-color","transparent");
				$(".searchBox").animate({width:"toggle"},200 );
				searchExpanded = 0;
			}
		}
		
	});
	
	//setup before functions
	var typingTimer;                //timer identifier
	var doneTypingInterval = 500;  //search 1/2 second after the last key stroke
	
	//on keyup, start the countdown
	$('.searchField').keyup(function(){
		typingTimer = setTimeout(doneTyping, doneTypingInterval);
	});
	
	//on keydown, clear the countdown 
	$('.searchField').keydown(function(){
		clearTimeout(typingTimer);
	});
	
	//user is "finished typing," do something
	function doneTyping () {
		var value = $(".searchField").val();
		if(value.length > 2){
			var Action = "search";
			$.ajax({
				type: "POST",
				url: "/user/search_actions",
				data: { Action: Action, value: value }
			}).done(function(msg) {
				//created successfully
				$(".searchResults").html(msg);
			}).fail(function(jqXHR, textStatus) {
				$(".searchResults").html("<div class=\"divider\"><p>No results</p></div><p>I couldn't find any results matching '" + value + "'.</p><p>Try a different keyword and I'm sure I'll find somehting.</p>");
			});
		}
	}
	
	
	//position footer at the bottom of the page
	setFooter();
	function setFooter(){
		if($(".footer, .homePageFooter")[0]){
			var windowH = $(window).height();
			var footerOffset = $(".footer, .homePageFooter").offset();
			var footerHeight = $(".footer, .homePageFooter").height();
			var newFooterH = parseInt(windowH) - parseInt(footerOffset.top);
			if((parseInt(footerOffset.top) + parseInt(footerHeight)) < windowH){
				$(".footer, .homePageFooter").css("height",(newFooterH) + "px");
			}
		}
	}
	
	
	
});
