$(document).ready(function () {
	'use strict';

	//Раздел переменных
	//----------------------------------------------------------------------------------------------------
	var $registrationFormsInput = $('.username, .user-telephone'),
		$registrationFormPlaceholders = $('.field-placeholder'),
		showDigitsAnimationFirst = true,
		showDigitsAnimationSecond = true,
		showDigitsAnimationThird = true,
		$activitiesTypes = $('.article__link--activities-types'),
		$mtbContentDescription = $('.mtb-content-description__text'),
		$mtbContentLink = $('.mtb-items__item');
   



	// Футер
	//------------------------------------------------------------------------------------------------------
	initFields($registrationFormsInput);
	$('.user-telephone, .phone-input').mask('+7 (000) 000-00-00');
	$('.callback-form').validate({
		submitHandler: function(form) {
			$.ajax({
				url: '../ajax/response.json',
				success: function (data) {  
					var hideSelectors = $('.form__fields, .agreement-checkbox');
					$.each(hideSelectors, function () { 
						$(this).addClass('fully-hidden');	 
					});
					
					if(data.answer === 1) {
			
						$('.thank-you').removeClass('fully-hidden'); 
					}

					if(data.answer === 0) {
					
						$('.something-wrong').removeClass('fully-hidden'); 
					}
				}
			});
		},
		invalidHandler: function(event, validator) {
			// 'this' refers to the form
			var errors = validator.numberOfInvalids(),
			$tel_state = validator.element( '.utl' ),
			$usn_state = validator.element( '.username' ),
			$telWrapper = $('.user-telephone__wrapper'),
			$usnWrapper = $('.username__wrapper');
			$tel_state = String($tel_state).trim();
			$usn_state = String($usn_state).trim();
		
				if($tel_state === 'false'){
			
					$telWrapper.addClass('input-error'); 
				}

				if($usn_state === 'false'){
			
					$usnWrapper.addClass('input-error'); 
				}
		  },
	
		onkeyup: function(element){
			var $wrapper = $(element).parent();
			$(element).valid(); 
			if($(element).hasClass('valid')) {
	
				$wrapper.addClass('input-ok');
				$wrapper.removeClass('input-error');
			}
			if(!$(element).hasClass('valid')) {
				$wrapper.addClass('input-error');
				$wrapper.removeClass('input-ok');
			}
			if($(element).val().length <= 0) {
				$wrapper.removeClass('input-ok');
				$wrapper.removeClass('input-error');
			}
		}
	});

	$.validator.addClassRules({
		utl: {
		  required: true,
		  minlength: 18
		},
        'phone-input': {
            required: true,
            minlength: 18
        },
	
	  });



	  $registrationFormsInput.on('focus', function () {
		var $wrapper = $(this).parent();
		$wrapper.addClass('active');
		
		});

	$registrationFormsInput.on('blur', function () {
		var $wrappers = $registrationFormsInput.parent();

		$.each($wrappers, function (indexInArray, valueOfElement) { 
			$(this).removeClass('active');
		});

		
		
	
	});

	$registrationFormsInput.on('keydown keyup', function () {
		var $wrapper = $(this).parent(),
			value =  String($(this).val()).trim();

			if(value.length > 0) {
				$wrapper.addClass('filled');
			}

			if(value.length <= 0) {
				$wrapper.removeClass('filled');
			}
			
		
	});

	$registrationFormPlaceholders.click(function (e) { 
		e.preventDefault();
		var $wrapper = $(this).parent(),
		$wrappers = $registrationFormsInput.parent(),
		$activeField = $(this).siblings('input');
		$.each($wrappers, function (indexInArray, valueOfElement) { 
			$(this).removeClass('active');
		});
		$wrapper.addClass('active');
		$activeField.focus();
		
	});

	$('.usersubmit').click(function (e) { 
		e.preventDefault();
		$('.callback-form').submit();
		
	});
	//Отслеживание пунктов истории
	if($('.timeline__item').length > 0){
		$('.timeline__item').viewportChecker({
			classToAdd: 'onLook',
			repeat: false,

		});
	
				

	}

	//Отслеживание появления формы
	$('.advantages').viewportChecker({
		classToAdd: 'onLook',
		repeat: true,
		// scrollBox: $('.layout-template-wrapper'),

	});

	//Отслеживание появления формы
	$('.spincrement__first').viewportChecker({
		classToAdd: 'onLook',
		repeat: true,
		// scrollBox: $('.layout-template-wrapper'),

	});

	$('.spincrement__second').viewportChecker({
		classToAdd: 'onLook',
		repeat: true,
		// scrollBox: $('.layout-template-wrapper'),

	});

	$('.spincrement__third').viewportChecker({
		classToAdd: 'onLook',
		repeat: true,
		// scrollBox: $('.layout-template-wrapper'),

	});

		//Отслеживание появления морды
		$('.person-summary__person').viewportChecker({
			classToAdd: 'onLook',
			repeat: true,
			// scrollBox: $('.layout-template-wrapper'),
	
		});

	

	$activitiesTypes.click(function (e) { 
		e.preventDefault();
		var $formPosition = $('.callback-form').offset().top;
		animatedScrollToPosition($('body, html'), $formPosition, 500);
	

	});

	



	//Событие по скроллу
	$(window).on('scroll', function () {

		var $callBackForm = $('.advantages.onLook.full-visible').not('.done');
		var animationEnd = 'onanimationend animationend webKitAnimationEnd mozAnimationEnd MSAnimationEnd',
		$portfolioFirst = $('.spincrement__first.onLook'),
		$portfolioSecond = $('.spincrement__second.onLook'),
		$portfolioThird = $('.spincrement__third.onLook'),
		selector = $('.advantages-item__description'),
		animation = 'fadeInUp',
		$sticky = $('.about-aside__content-wrp--sticky'),
		$stickyParent = $('.sticky--wrp');
	


		//Запуск Position:sticky


		if($('div').is('.about-contant')){
			stickifyBlock($sticky, $stickyParent);
		}


		//Запуск стрелки наверх
		if($(this).scrollTop() > 500) {
			$('.up-arrow__wrapper').removeClass('hidden-down');
		} else {
			$('.up-arrow__wrapper').addClass('hidden-down');
		}

		//Запуск анимации блоков преимуществ
		if($callBackForm.length > 0){
			if(!selector.hasClass(animation)) {
				selector.addClass(animation).one(animationEnd, function(){
					$callBackForm.addClass('done');
				});
			}
			
		}

		// Запуск набегающих цифр 1* 
		
		
		if($portfolioFirst.length > 0 ){
	    
			if(showDigitsAnimationFirst){
				numbersAnimate($('.spincrement__first'), 0, 12, 1000);
				showDigitsAnimationFirst = false;	
			}
		}

		// Запуск набегающих цифр 2* 
	 
		if($portfolioSecond.length > 0 ){
	 
			if(showDigitsAnimationSecond){
				numbersAnimate($('.spincrement__second'), 0, 4, 1000);
				showDigitsAnimationSecond = false;	
			}
		}


		// Запуск набегающих цифр 3* 
		
		if($portfolioThird.length > 0 ){
	  
			if(showDigitsAnimationThird){
				numbersAnimate($('.spincrement__third'), 0, 19, 1000);
				showDigitsAnimationThird = false;	
				
			}
		}

	});



	//Активация стрелки наверх
	$('.up__arrow-area').click(function (e) { 
		e.preventDefault();
		animatedScrollToPosition($('body, html'), 0, 300);
		
	});

	/*Футер: конец*/ 

	if($mtbContentDescription.length > 0 ) {
		$mtbContentDescription.mCustomScrollbar({
			theme: 'dark',
			scrollbarPosition: 'inside'
		  });
	}

    (function addScrollForProjectDetail() {
        if ($('.project-detail__text').length > 0) {
            initCustomScrollBar($('.project-detail__text'));
        }
    })();

    (function initProductCustomScroll() {
        if ($('.all-project__list').length > 0) {
            initCustomScrollBar($('.all-project__list'));
        }
    })();

	function initCustomScrollBar(selectorInit) {
        selectorInit.mCustomScrollbar({
            theme: 'dark',
            scrollbarPosition: 'inside'
        });
    }

	$('.btn-brief-close').click(function (e) { 
	
		e.preventDefault();
	
		// 
		if($mtbContentLink.hasClass('active')) {
			e.stopPropagation();
			$mtbContentLink.removeClass('active');
		
		}

		
	});

	if($('.license-items__item').length > 0){
		$('.license-items__item').click(function (e) { 
			e.preventDefault();
			var $gallery = $(this).attr('href');
			$($gallery).magnificPopup({
				delegate: 'a',
				closeBtnInside : true,
				type: 'image',
				image: {
					markup: '<div class="mfp-figure  mfp-figure--license">'+
								'<div class="mfp-close"></div>'+
								'<div class="mfp-img"></div>'+
									'<div class="mfp-bottom-bar">'+
									'<div class="mfp-title">' +
	
									'</div>' +
									// '<div class="mfp-counter"></div>'+
								'</div>'+
							'</div>', // Popup HTML markup. `.mfp-img` div will be replaced with img tag, `.mfp-close` by close button
	
					  cursor: 'mfp-zoom-out-cur',
					  titleSrc: function(item) {
						var $gallery = $(item.el).parents('.license-gallery-item');
						var result = '';
						var $cl_active = '';
					
						
						if($gallery.find('a').length > 0) {
							result = '<div class="mfp-pager">'+
								'<ul class="mfp-thumbnails">';
								for (var index = 0; index < $gallery.find('a').length; index++) {
									$cl_active = (item.index == index) ? ' class="active"' : '';
									var $thumb = $gallery.find('a:eq('+index+')').find('img').attr('src');
									result += '<li' + $cl_active + '>'+
										'<div class="thumbnail__wrapper" onclick="javascript:$(\'.gallery\').magnificPopup(\'goTo\', ' + index + ');return false;">'+
											'<img src="' + $thumb + '">'+
										'</div>'+
									'</li>';
								
								}
	
						
	
								result += '</ul>'+
							'<div>';
							return result;
						}
						
	
					  }
				},
				gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1] // Will preload 0 - before current, and 1 after the current image
			},
	
		}).magnificPopup('open');
			
		});
	}

	if($('#collective-gallery-links').length > 0) {
		$('#collective-gallery-links').magnificPopup({
			delegate: 'a',
			closeBtnInside : true,
			type: 'image',
			gallery: {
				verticalFit: true,
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1] // Will preload 0 - before current, and 1 after the current image
			},
	
			image: {
				cursor: 'mfp-zoom-out-cur',
				markup: '<div class="mfp-figure  mfp-figure--collective">'+
				'<div class="mfp-close"></div>'+
				'<div class="mfp-img"></div>'+
					'<div class="mfp-bottom-bar">'+
					'<div class="mfp-title">' +

					'</div>' +
					// '<div class="mfp-counter"></div>'+
				'</div>'+
			'</div>',
			}


		});
	}
		
	//Медиа-запросы в javascript (Если нужно)
	//-------------------------------------------------------------------------------------------------------
    
    
	media('all and (min-width: 1170px)', function(){
		// console.log('1170px');
	});
   
	media('all and (min-width: 1270px)', function(){
		// console.log('1270px');
	});
	
	//spoiler on the page of vacancy
	
	$('li.list__item').click(function(event) {
		if (event.target.tagName === 'LABEL' || event.target.tagName === 'INPUT') {
			if (event.target.checked) {
				$(this).nextUntil('.list__details').next().find('.vacancy-details').slideDown(300);
			} else {
				$(this).nextUntil('.list__details').next().find('.vacancy-details').slideUp(300);
			}
			return;
		}
		this.querySelector('input').checked = this.querySelector('input').checked ? false : true;
		$(this).nextUntil('.list__details').next().find('.vacancy-details').slideToggle(300);
	});

	activateLinks($mtbContentLink);

	

	initTimeLineAnimation($('.timeline__item.onLook:not(.intialize)'), 0.5);

	$(document).mouseup(function (e){ // событие клика по веб-документу
	

		hidePopupListener($mtbContentLink, e, function(){
			$mtbContentLink.removeClass('active');
		});
	});

	
	
    
});




// Функции
//-------------------------------------------------------------

// //Запуск анимации при загрузке таймлайна на странице истории
function initTimeLineAnimation($selector, durationMultiplicator) {


		$.each($selector, function (indexInArray) {
				$(this).css({
					'-webkit-animation-delay': (indexInArray * durationMultiplicator) + 's',
					'animation-delay': (indexInArray * durationMultiplicator) + 's',
				});
				$(this).addClass('initialize');
				$(this).find('.timeline__border').css({
					'-webkit-animation-delay': (indexInArray * durationMultiplicator + 0.5) + 's',
					'animation-delay': (indexInArray * durationMultiplicator + 0.5) + 's',
				});
		});

}



//Имитация position:sticky
function stickifyBlock($sticky, $stickyParent) {
	var stickyParentHeight = $stickyParent.outerHeight(true),
	stickyHeight = $sticky.outerHeight(true), //Высота блока стикера
	stickyPositionTop = $('.about-contant').offset().top,
	stickyPositionBottom = ($('.sticky.done').length > 0) ? $('.sticky.done').offset().top : false,
	currentPositionInBlock = $(this).scrollTop() - stickyPositionTop;
	if ($(this).scrollTop() > stickyPositionTop) {
		//Значение стикера добавляем в любом случае
		if (!$sticky.hasClass('sticky')) {
			$sticky.addClass('sticky');
		}
		//Отслеживаем появление нижней границы
		// $stickyParent.css('border', '1px solid red');
		// $sticky.css('border', '1px solid green');
		if ((stickyParentHeight - currentPositionInBlock) <= stickyHeight) {
			if (!$sticky.hasClass('done')) {
				$sticky.addClass('done');
			
			}
			if ($sticky.hasClass('done')) {
				if (stickyPositionBottom) {
					if ($(this).scrollTop() < stickyPositionBottom) {
						if ($sticky.hasClass('done')) {
							$sticky.removeClass('done');
						}
					}
				}
			}
		}
		else {
			if ($sticky.hasClass('done')) {
				$sticky.removeClass('done');
			}
		}
	}
	else {
		if ($sticky.hasClass('sticky')) {
			$sticky.removeClass('sticky');
		}
	}
}

//Плавный скролл до позиции на странице
//$selector(jqblock) - анимируемый блок
//position(number) - целевое вертикальное смещение на странице
//duration(number) - длительность анимации

function animatedScrollToPosition($selector, position, duration){
	$($selector).animate({
		scrollTop: position
		}, duration);
		return false;
}

//Анимация цифр 
//$selector(jqblock) - анимируемый блок
//$from(number) - начальное значение
//$to(number) - конечное значение
//$duration(number) - длительность анимации
function numbersAnimate($selector, $from, $to, $duration) {
	$({numberValue: $from}).animate({numberValue: $to}, {
		duration: $duration, // Скорость анимации, где 500 = 0,5 одной секунды, то есть 500 миллисекунд
		easing: "linear",
		step: function(val) {
			$selector.html(Math.ceil(val)); // Блок, где необходимо сделать анимацию
		}
	});
}


//Очистка классов валидации обертки поля в форме
//value (string) - значение поля
//$wrappers(jqblock) - класс обертки поля
function clearValidationClasses($wrappers, value) {
	$.each($wrappers, function (indexInArray, valueOfElement) {
		$(this).removeClass('active');
		value = String($(this).children('input').val()).trim();
		if (value.length <= 0) {
			$(this).removeClass('input-ok');
			$(this).removeClass('input-error');
		}
	});
	return value;
}

function media(mediaQueryString, action){
	'use strict';
	var handleMatchMedia = function (mediaQuery) {
		if (mediaQuery.matches) { //Попадает в запроc
			if (action  && typeof(action) === 'function') {
				action();
			}
		} 
	};
	var mql = window.matchMedia(mediaQueryString); //стандартный медиазапрос для смены режима просмотра
	handleMatchMedia(mql);
	mql.addListener(handleMatchMedia);
}

//Инициализация полей в футере. Если поле заполнено - убирает placehoder
//$registrationFormsInput (jqblock) - выборка полей формы
function initFields($registrationFormsInput) {
	var value='',
		$wrapper;
	$.each($registrationFormsInput, function (indexInArray, valueOfElement) { 
		value =  String($(this).val()).trim();
		$wrapper = $(this).parent();
		if(value.length > 0) {
			$wrapper.addClass('filled');
		}

		if(value.length <= 0) {
			$wrapper.removeClass('filled');
		}
	});

//init callback form
(function initCallBackForm() {
    $('.btn__order-callback, .btn-call').click(function (e) {
        e.preventDefault();
       $('.callback').show(0);
       $('.callback').toggleClass('active');
    });
})();

//close callback form
(function closeCallbackForm() {
    $('.callback__close-icon, .callback__close').click(function (e) {
        e.preventDefault();
       if ($('.callback').hasClass('active')) {
           $('.callback').removeClass('active');
           setTimeout(function () {
               $('.callback').hide(0);
           }, 300);
       }
    });

})();

//validate main-callback
(function vaslidateCallBackForm() {
    $('#main-callback-form').validate({
        submitHandler: function(form) {
            $.ajax({
                url: '../ajax/response.json',
                success: function (data) {
                    var hideSelectors = $('.callback__form');
                    $.each(hideSelectors, function () {
                        $(this).addClass('hide-information');
                    });

                    if(data.answer === 1) {

                        $('.thank-you-text').addClass('show');
                    }

                    if(data.answer === 0) {

                        $('.wrong-text').addClass('show');
                    }
                }
            });
        },
        onkeyup: function(element){
            $(element).valid();
        }
    });
})();

(function editCallbackText() {
    $('#main-callback-form').on('submit', function () {
        var userName = $('.user-callback-name').val();

        $('.callback-text__title').text(userName + ',');
    });
})();
}

(function allCheckedClient() {
    $('.all-checked').on('change', function () {
        if ($(this).prop('checked')) {
            $('.clients-list__label input:not(.all-checked)').prop('checked', true);
        } else {
            $('.clients-list__label input:not(.all-checked)').prop('checked', false);
        }
    });
    $('.clients-list__label input:not(.all-checked)').on('change', function () {
        var valueChecked= [];

        $('.clients-list__label input:not(.all-checked)').each(function (   ) {
            valueChecked.push($(this).prop('checked'));
        });

        for (var i=0; i < valueChecked.length; i++) {
            if (!valueChecked[i]) {
                $('.all-checked').prop('checked', false);
                return false;
            }
        }

        $('.all-checked').prop('checked', true);
    });
})();

(function activateSlideAllProject() {
    $('.all-project__title').on('click', function () {
       if ($(this).hasClass('active')) {
           $(this).removeClass('active');
           $('.all-project__list').slideUp(300);
       } else {
           $(this).addClass('active');
           $('.all-project__list').slideDown(300);
       }
    });
})();

(function showAllClient() {
    $('.clients-show-all__button').on('click', function () {
       var heightClientBlock = $('.clients-list').innerHeight();

       if (!$(this).hasClass('active')) {
            $('.clients-wrapper').css('max-height',heightClientBlock);
            $(this).addClass('active');
       } else {
           $('.clients-wrapper').removeAttr('style');
           $(this).removeClass('active');
       }
    });
})();

(function allCheckedWorks() {
    $('.all-works').on('change', function () {
        if ($(this).prop('checked')) {
            $('.working-branches__item input:not(.all-works)').prop('checked', true);
        } else {
            $('.working-branches__item input:not(.all-works)').prop('checked', false);
        }
    });
    $('.working-branches__item input:not(.all-works)').on('change', function () {
        var valueChecked= [];

        $('.working-branches__item input:not(.all-works)').each(function (   ) {
            valueChecked.push($(this).prop('checked'));
        });

        for (var i=0; i < valueChecked.length; i++) {
            if (!valueChecked[i]) {
                $('.all-works').prop('checked', false);
                return false;
            }
        }

        $('.all-works').prop('checked', true);
    });
})();

(function selectProject() {
    $('.project-show-all').on('click', function () {
      var idProject = $(this).data('project');
      var thisParent = $(this).parents('.all-project__list-item');

      $('.all-project__list-item').removeClass('active');
      thisParent.addClass('active');

      $('.project-detail').hide();
      $('#' + idProject).show();
    });
    $(document).on('click','.projects__item-in-link', function () {
        var idProject = $(this).data('project');
        var parentItemOnSidebar = $('span[data-project="' + idProject + '"]').parents('.all-project__list-item');

        if (!$('.all-project__title').hasClass('active')) {
            $('.all-project__title').addClass('active');
            $('.all-project__list').slideDown(300);
        }
        $('.project-detail').hide();
        $('#' + idProject).show();
        parentItemOnSidebar.addClass('active');
    });
})();

(function closeProjectDetail() {
    $('.project-detail__close').on('click', function () {
        var thisParent = $(this).parents('.project-detail');

        $('.all-project__list-item').removeClass('active');
        thisParent.hide();
    });
})();

(function fullPageInit() {
    $('#fullpage').fullpage({
        // autoScrolling:true,
        scrollHorizontally: true,
        verticalCentered: false,
        // scrollBar: true,
        // slidesNavigation: true,
        scrollOverflow: true,
        anchors: ['anchor0', 'anchor1', 'anchor2', 'anchor3', 'anchor4', 'anchor5', 'anchor6', 'anchor7', 'anchor8', 'anchor9','anchor10'],
        menu: '#menu-fullpage',

    });
})();

(function addSliderCommercialProposal() {
    $('.commercial-proposal__list').slick({
        centerMode: true,
        slidesToShow: 5,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
    });
})();


function addTabs(tabbed_selector) {
    // Get relevant elements and collections
    var tabbed = document.querySelector(tabbed_selector);
    var tablist = tabbed.querySelector('ul');
    var tabs = tablist.querySelectorAll('a');
    var panels = tabbed.querySelectorAll('[id^="section"]');

    // The tab switching function
    var switchTab = function switchTab(oldTab, newTab) {
        newTab.focus();
        // Make the active tab focusable by the user (Tab key)
        newTab.removeAttribute('tabindex');
        // Set the selected state
        newTab.setAttribute('aria-selected', 'true');
        oldTab.removeAttribute('aria-selected');
        oldTab.setAttribute('tabindex', '-1');
        // Get the indices of the new and old tabs to find the correct
        // tab panels to show and hide
        var index = Array.prototype.indexOf.call(tabs, newTab);
        var oldIndex = Array.prototype.indexOf.call(tabs, oldTab);
        panels[oldIndex].hidden = true;
        panels[index].hidden = false;
    };

    // Add the tablist role to the first <ul> in the .tabbed container
    tablist.setAttribute('role', 'tablist');

    // Add semantics are remove user focusability for each tab
    Array.prototype.forEach.call(tabs, function (tab, i) {
        tab.setAttribute('role', 'tab');
        tab.setAttribute('id', 'tab' + (i + 1));
        tab.setAttribute('tabindex', '-1');
        tab.parentNode.setAttribute('role', 'presentation');

        // Handle clicking of tabs for mouse users
        tab.addEventListener('click', function (e) {
            e.preventDefault();
            var currentTab = tablist.querySelector('[aria-selected]');
            if (e.currentTarget !== currentTab) {
                switchTab(currentTab, e.currentTarget);
            }
        });

        // Handle keydown events for keyboard users
        tab.addEventListener('keydown', function (e) {
            // Get the index of the current tab in the tabs node list
            var index = Array.prototype.indexOf.call(tabs, e.currentTarget);
            // Work out which key the user is pressing and
            // Calculate the new tab's index where appropriate
            var dir = e.which === 37 ? index - 1 : e.which === 39 ? index + 1 : e.which === 40 ? 'down' : null;
            if (dir !== null) {
                e.preventDefault();
                // If the down key is pressed, move focus to the open panel,
                // otherwise switch to the adjacent tab
                dir === 'down' ? panels[i].focus() : tabs[dir] ? switchTab(e.currentTarget, tabs[dir]) : void 0;
            }
        });
    });

    // Add tab panel semantics and hide them all
    Array.prototype.forEach.call(panels, function (panel, i) {
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('tabindex', '-1');
        var id = panel.getAttribute('id');
        panel.setAttribute('aria-labelledby', tabs[i].id);
        panel.hidden = true;
    });

    // Initially activate the first tab and reveal the first tab panel
    tabs[0].removeAttribute('tabindex');
    tabs[0].setAttribute('aria-selected', 'true');
    panels[0].hidden = false;
}

function activateLinks($selector) {
	$($selector).click(function (e) { 
		e.preventDefault();

		$.each($selector, function () { 
			if($(this).hasClass('active')) {
			   $(this).removeClass('active');
			}
	   });
	   
	  if(!$(this).hasClass('active')) {
		$(this).addClass('active');

	 }
	  
	});

}


function hidePopupListener($windowPopupSelector, e, callback) {

	var div = $($windowPopupSelector); 
	if (!div.is(e.target) && div.has(e.target).length === 0) {
		if (callback) {
			callback();
		}
	}

}
// 	function isElementInViewport(el) {
// 	  var rect = el.getBoundingClientRect();
// 	  return (
// 		rect.top >= 0 &&
// 		rect.left >= 0 &&
// 		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
// 		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
// 	  );
// 	}
  
// 	function callbackFunc() {
// 	  for (var i = 0; i < items.length; i++) {
// 		if (isElementInViewport(items[i])) {
// 		  items[i].classList.add("in-view");
// 		}
// 	  }
// 	}
  
// 	// listen for events
// 	window.addEventListener("load", callbackFunc);
// 	window.addEventListener("resize", callbackFunc);
// 	window.addEventListener("scroll", callbackFunc);
  
//   })();
