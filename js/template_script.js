$(document).ready(function () {
	'use strict';

	//Раздел переменных
	//----------------------------------------------------------------------------------------------------
	var $registrationFormsInput = $('.username, .user-telephone'),
		$registrationFormPlaceholders = $('.field-placeholder');

   


	//Раздел функций
	//------------------------------------------------------------------------------------------------------
	$('.user-telephone').mask('PP (YYY) YYY YY YY',{
		'translation': {
			P: {pattern: /[\+7]/},
			Y: {pattern: /[0-9]/},
		
		}
	  });

	  $registrationFormsInput.on('focus', function () {
		var $wrapper = $(this).parent(),
			$wrappers = $registrationFormsInput.parent();
		$.each($wrappers, function (indexInArray, valueOfElement) { 
			$(this).removeClass('active');
		});
		$wrapper.addClass('active');
		
	
	});

	$registrationFormsInput.on('blur', function () {
		var $wrappers = $registrationFormsInput.parent();
		$.each($wrappers, function (indexInArray, valueOfElement) { 
			$(this).removeClass('active');
		});
		
		
	
	});

	$registrationFormsInput.on('keydown keyup', function () {
		var $wrappers = $registrationFormsInput.parent(),
			$wrapper = $(this).parent(),
			value =  String($(this).val()).trim();

			if(value.length > 0) {
				$wrapper.addClass('filled');
			}

			if(value.length <= 0) {
				$wrapper.removeClass('filled');
			}
		
		
		
	
	});
   
	//Активация медиа-запросов в javascript
	//@param mediaQueryString (String) - строка медиа-запроса как в CSS
	//@param action(function) - функция, которая выполняется при соблюдении условий медиа-запроса





	//Медиа-запросы в javascript (Если нужно)
	//-------------------------------------------------------------------------------------------------------
    
    
	media('all and (min-width: 1170px)', function(){
		// console.log('1170px');
	});
   
	media('all and (min-width: 1270px)', function(){
		// console.log('1270px');
	});
	
	
	
    
});




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


