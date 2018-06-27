var videoHeight;
var videoWidth;
var webkit;
var isiPad;
var mobileWidth = 760;
$(function(){
    
    if($.browser){
        $.browser.chrome = $.browser.webkit && !!window.chrome;
        if($.browser.chrome){ 
            webkit = true;
        }else{
            webkit = false;
        }
       
    }else{
        webkit = false;
    } 

    var screenHeight = $(window).height();
    var screenWidth = $(window).width();

    //fading block are initially transparent
    if(!webkit){
        $('body').css('background-color', '#000');
        $('.panel.fade').css('opacity', 0);
    }else{
        $('.panel.fade').css('opacity', 1);
    }
    
    
    //panel fullscreen size
    $('.slide').height(screenHeight);
    
    //video size calculating
    videoHeight = 9;
    videoWidth = 16;
    $calulatedWidth = Math.round(videoWidth * (screenHeight - 110) / videoHeight);
    $('#panel-2').find('iframe').width($calulatedWidth);
    $('#panel-2').find('iframe').height(screenHeight - 110);
    $('#panel-2').find('object').width($calulatedWidth);
    $('#panel-2').find('object').height(screenHeight - 110);
    $('#panel-2').find('embed').width($calulatedWidth);
    $('#panel-2').find('embed').height(screenHeight - 110);
    
    $('#panel-5').find('.span2').css('opacity', 0);
    
    //mobile menu switcher
    $('.share-a').click(function(){
        if($('.social-close').css('display') == 'block'){
            $('.social-close').css('display', 'none');
        }else{
            $('.social-close').css('display', 'block');
        }
        return false;
    });
        
    $(window).scroll(function(){
        //navigation background inverting
        if(screenWidth > mobileWidth){
            if($(window).scrollTop() >= $('#panel-2').offset().top - 110){
                $('#navigation').addClass('white');
            }else{
                $('#navigation').removeClass('white');
            }  
        }else{
            if($(window).scrollTop() >= 110){
                $('#navigation').addClass('white');
            }else{
                $('#navigation').removeClass('white');
            }  
        }
        
        //charts fading out        
            if($(window).scrollTop() >= $('#panel-5').offset().top-110){
                $('#panel-5').find('.span2').animate({opacity: 1}, 2000);
            }        
        
        //panels fading out
        if(!webkit){
            $('.panel.fade').each(function(){
                var panel = $(this)
                if($(window).scrollTop() > panel.offset().top - screenHeight){
                    panel.css('opacity', ($(window).scrollTop()-panel.offset().top + screenHeight)/350);
                }
            });
        }
        
        if(screenWidth <= mobileWidth){
            if($('.social-close').css('display') == 'block'){
                $('.social-close').css('display', 'none');
            }            
        }
    });
    
    isiPad = navigator.userAgent.match(/iPad/i) != null;
    if(screenWidth <= mobileWidth || isiPad){
        $('#panel-2').find('object').css('display', 'none');
        $('#panel-2').find('iframe').css('display', 'inline');
    }else{
        $('#panel-2').find('iframe').css('display', 'none');
        $('#panel-2').find('object').css('display', 'inline');
    }
});

$(window).resize(function(){
    var screenHeight1 = $(window).height();
    var screenWidth1 = $(window).width();
    
    //panel fullscreen size on resize    
        $('.slide').height(screenHeight1);    
    
        //video size calculating on resize    
        /*var calulatedWidth = Math.round(videoWidth * (screenHeight - 120) / videoHeight);
        $('#panel-2').find('iframe').width(calulatedWidth);
        $('#panel-2').find('iframe').height(screenHeight - 120);*/
        var calulatedHeight = Math.round(videoHeight * (screenWidth1 - 200) / videoWidth);
        $('#panel-2').find('iframe').width(screenWidth1 - 200);
        $('#panel-2').find('iframe').height(calulatedHeight);
        $('#panel-2').find('object').width(screenWidth1 - 200);
        $('#panel-2').find('object').height(calulatedHeight);
        $('#panel-2').find('embed').width(screenWidth1 - 200);
        $('#panel-2').find('embed').height(calulatedHeight);
    
    if(screenWidth1 > mobileWidth){
        $('.social-close').css('display', 'block');
        if(isiPad){
            $('#panel-2').find('object').css('display', 'none');
            $('#panel-2').find('iframe').css('display', 'inline');
        }else{
            $('#panel-2').find('iframe').css('display', 'none');
            $('#panel-2').find('object').css('display', 'inline');
        }        
    }else{
        $('.social-close').css('display', 'none');
        $('#panel-2').find('object').css('display', 'none');
        $('#panel-2').find('iframe').css('display', 'inline');
    }
        
    
});

//sliders autoplay
	//intro slider
	$('#carousel_fade_intro').carousel({
		interval: 2500,
		pause: "false"
	})
	//works sliders
	$('#carousel_horizontal_slide, #carousel_vertical_slide, #carousel_fade_1, #carousel_fade_2').carousel({
		interval: false
	})

//make section height of window
	$(function(){
		$('#intro').css({'height':($(window).height())+'px'});
		$(window).resize(function(){
		$('#intro').css({'height':($(window).height())+'px'});
		});
	});

//custom scrollbar
	$(document).ready(
	function() {  
		$("html").niceScroll();
		}
	);

//contact form
	$(document).ready(function() {
	var options = {
	target: '.alert',
	beforeSubmit: showRequest,
	success: showResponse
	};
	$('#contactForm').ajaxForm(options);
	});
	function showRequest(formData, jqForm, options) {
	var queryString = $.param(formData);
	return true;
	}
	function showResponse(responseText, statusText)  {
	}
	$.fn.clearForm = function() {
		return this.each(function() {
		var type = this.type, tag = this.tagName.toLowerCase();
		if (tag == 'form')
			return $(':input',this).clearForm();
		if (type == 'text' || type == 'password' || tag == 'textarea')
			this.value = '';
		else if (type == 'checkbox' || type == 'radio')
			this.checked = false;
		else if (tag == 'select')
			this.selectedIndex = -1;
		});
	};

//smooth scroll on page
	$(function() {
		$('#more a, .nav a, .nav li a, .brand, #footer li a').bind('click',function(event){
		var $anchor = $(this);

		$('[data-spy="scroll"]').each(function () {
		var $spy = $(this).scrollspy('refresh')
		});

		$('html, body').stop().animate({
		scrollTop: $($anchor.attr('href')).offset().top -61
		}, 1500,'easeInOutExpo');

		event.preventDefault();
		});
	});

//gallery image hover tooltip trigger
	$("[data-thumb=tooltip]").tooltip();

//collapse menu on click on mobile and tablet devices
	$('.nav a').click(function () { $(".nav-collapse").collapse("hide") });