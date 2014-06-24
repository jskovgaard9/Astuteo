
/*******************************************************************************
  INFIELD LABELS - http://fuelyourcoding.com/scripts/infield.html
********************************************************************************/

(function($){$.InFieldLabels=function(b,c,d){var f=this;f.$label=$(b);f.label=b;f.$field=$(c);f.field=c;f.$label.data("InFieldLabels",f);f.showing=true;f.init=function(){f.options=$.extend({},$.InFieldLabels.defaultOptions,d);if(f.$field.val()!=""){f.$label.hide();f.showing=false};f.$field.focus(function(){f.fadeOnFocus()}).blur(function(){f.checkForEmpty(true)}).bind('keydown.infieldlabel',function(e){f.hideOnChange(e)}).change(function(e){f.checkForEmpty()}).bind('onPropertyChange',function(){f.checkForEmpty()})};f.fadeOnFocus=function(){if(f.showing){f.setOpacity(f.options.fadeOpacity)}};f.setOpacity=function(a){f.$label.stop().animate({opacity:a},f.options.fadeDuration);f.showing=(a>0.0)};f.checkForEmpty=function(a){if(f.$field.val()==""){f.prepForShow();f.setOpacity(a?1.0:f.options.fadeOpacity)}else{f.setOpacity(0.0)}};f.prepForShow=function(e){if(!f.showing){f.$label.css({opacity:0.0}).show();f.$field.bind('keydown.infieldlabel',function(e){f.hideOnChange(e)})}};f.hideOnChange=function(e){if((e.keyCode==16)||(e.keyCode==9))return;if(f.showing){f.$label.hide();f.showing=false};f.$field.unbind('keydown.infieldlabel')};f.init()};$.InFieldLabels.defaultOptions={fadeOpacity:0.5,fadeDuration:300};$.fn.inFieldLabels=function(c){return this.each(function(){var a=$(this).attr('for');if(!a)return;var b=$("input#"+a+"[type='text'],"+"input#"+a+"[type='password'],"+"textarea#"+a);if(b.length==0)return;(new $.InFieldLabels(this,b[0],c))})}})(jQuery);

// fixed image background on hero, but not on iOS
$(document).ready(function(){
	var platform = navigator.platform.toLowerCase();
	var iDevices = {
        "ipod": true,
        "ipad": true,
        "iphone": true
    };
    if ( !(platform in iDevices) ) {
        $(window).scroll(function() {
			var scrolledY = $(window).scrollTop();
			$('.hero-wrap').css('background-position', 'center ' + ((scrolledY)) + 'px');
		});
    }
});

$(document).ready(function() {
  	$(".nav-btn,.close-btn").click(function () {$(".home-nav, .primary-nav").toggleClass("open");});  
  	$(".infield").inFieldLabels();
		$('.photo-wrap').css('min-height', window.innerHeight-276);
});

$(document).ready(function() {
    // validate signup form on keyup and submit
    $("#contact-form").validate({
        submitHandler: function(form) {
    		if($('input#url_gate').val().length == 0) { 
            	$.post('https://qe166.infusionsoft.com/app/form/process/c72ea92d0181c294f7c70c67a8c6fe24', $('#contact-form').serialize());
                $('#contact-form').animate({
                    opacity: 0,
                    height: 0
                }, function(){
                    $(this).hide().css({
                        opacity: 1,
                        height: 'auto'
                    });
                    $('#form-success').fadeIn();
                });
            }
            else {
            	$.post('', $('#contact-form').serialize());
                $('#form-problem').fadeIn();
            }
        }, 
        rules: {
            inf_field_FirstName: "required",
            inf_field_LastName: "required",
            inf_custom_YourMessage: "required",
            inf_field_Email: {
                required: true,
                email: true
            }
        },
        messages: {
            inf_field_FirstName: "Please enter your first name",
			inf_field_LastName: "Please enter your last name",
			inf_field_Email: "Please enter a valid email address",
			inf_custom_YourMessage: "A message of some sort is required"
        }
    });
});

$(document).ready(function() {
    // validate signup form on keyup and submit
    $("#subscribe-form").validate({
        submitHandler: function(form) {
        	$.post('https://qe166.infusionsoft.com/app/form/process/6ec77ad4f53bd80eb3e5264582aed807', $('#subscribe-form').serialize());
            $('#subscribe-form').animate({
                opacity: 0,
                height: 0
            }, function(){
                $(this).hide().css({
                    opacity: 1,
                    height: 'auto'
                });
                $('#subscribe-success').fadeIn();
                // track submission in Analytics
                _gaq.push(['_trackPageview', '/subscribe/thanks/']);
            });
        }, 
        rules: {
            inf_field_FirstName: "required",
            inf_field_LastName: "required",
            inf_field_Email: {
                required: true,
                email: true
            }
        },
        messages: {
            inf_field_FirstName: "Please enter your first name",
			inf_field_LastName: "Please enter your last name",
			inf_field_Email: "Please enter a valid email address"
        }
    });
});