//Проверка на браузер: Safari
function safariCheck(userAgent){
	'use strict';
	if(userAgent.indexOf('Safari') + 1) {
		return true;
	}else{
		return false;
	}
}

//Проверка на браузер: IE
function IECheck(userAgent){
	'use strict';
	if(userAgent.indexOf('Trident') + 1) {
		return true;
	}else{
		return false;
	}
}

//Активация медиа-запросов в javascript
//@param mediaQueryString (String) - строка медиа-запроса как в CSS
//@param action(function) - функция, которая выполняется при соблюдении условий медиа-запроса

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

//Блокировка скролла на странице
function blockScrollOnPage(){
	'use strict';
	$('body, html').addClass('no-scroll');
}

//Снятие блокировки со страницы
function unblockScrollOnPage(){
	'use strict';
	if($('body, html').hasClass('no-scroll')){
		$('body, html').removeClass('no-scroll');
	}
}


//Анимация для работы с коллбэком
//@param animationName (String) - название анимации
//@param selector(jquery block) - анимируемый селектор
//@param callback(function) - функция, которая выполняется при окончании анимации
function setAnimation(animationName, selector, callback){
	'use strict';
	var animationEnd = 'onanimationend animationend webKitAnimationEnd mozAnimationEnd MSAnimationEnd';
	var animation = 'animated ' + animationName;
	if (!callback) {
		if(!selector.hasClass(animation)) {
			selector.addClass(animation);
		}
	}
	if(callback) {
		if(!selector.hasClass(animation)) {
			selector.addClass(animation).one(animationEnd, function(){
			//Добавляем окончание
				callback();
			});
		}

	}

}

//Удаление анимации с селектора
//@param animationName (String) - название анимации
//@param selector(jquery block) - анимируемый селектор
function removeAnimation(animationName, selector) { 
	'use strict';
	if(selector.hasClass(animationName)) {
		selector.removeClass(animationName);
		selector.removeClass('animated');
	}
}
