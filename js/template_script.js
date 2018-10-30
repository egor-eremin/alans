$(document).ready(function () {
    'use strict';
    var $registrationFormsInput = $('.username, .user-telephone, .phone-input, .callback-form__email, .callback__textarea, .mail-input'),
        $registrationFormPlaceholders = $('.field-placeholder'), showDigitsAnimationFirst = true,
        showDigitsAnimationSecond = true, showDigitsAnimationThird = true,
        $activitiesTypes = $('.article__link--activities-types, .article-header-stay__link'),
        $mtbContentDescription = $('.mtb-content-description__text'), $mtbContentLink = $('.mtb-items__item'),
        $mobileAdvantages = $('.advantages-mobile-list');
    $(function () {
        objectFitImages()
    });
    initFields($registrationFormsInput);
    $('.user-telephone, .phone-input').mask('+7 (000) 000-00-00');
    $('.callback-form').validate({
        submitHandler: function (form) {
            $.ajax({
                type: $(form).attr('method'),
                url: $(form).attr('action'),
                data: $(form).serialize(),
                success: function (data) {
                    var hideSelectors = $('.form__fields, .agreement-checkbox');
                    $.each(hideSelectors, function () {
                        $(this).addClass('fully-hidden');
                    });
                    $('.thank-you').removeClass('fully-hidden');
                },
                error: function () {
                    var hideSelectors = $('.form__fields, .agreement-checkbox');
                    $.each(hideSelectors, function () {
                        $(this).addClass('fully-hidden');
                    });
                    $('.something-wrong').removeClass('fully-hidden');
                }
            });
            return false;
        }, invalidHandler: function (event, validator) {
            var errors = validator.numberOfInvalids(), $tel_state = validator.element('.utl'),
                $usn_state = validator.element('.username'), $emailState = validator.element('.callback-form__email'),
                $telWrapper = $('.user-telephone__wrapper'), $usnWrapper = $('.username__wrapper');
            $tel_state = String($tel_state).trim();
            $usn_state = String($usn_state).trim();
            if ($tel_state === 'false') {
                $telWrapper.addClass('input-error');
            }
            if ($usn_state === 'false') {
                $usnWrapper.addClass('input-error');
            }
            if ($emailState === 'false') {
                $emailState.addClass('input-error');
            }
        }, onkeyup: function (element) {
            var $wrapper = $(element).parent();
            $(element).valid();
            if ($(element).hasClass('valid')) {
                $wrapper.addClass('input-ok');
                $wrapper.removeClass('input-error');
            }
            if (!$(element).hasClass('valid')) {
                $wrapper.addClass('input-error');
                $wrapper.removeClass('input-ok');
            }
            if ($(element).val().length <= 0) {
                $wrapper.removeClass('input-ok');
                $wrapper.removeClass('input-error');
            }
        }
    });
    jQuery.validator.addMethod("correctEmail", function (value, element) {
        return this.optional(element) || /[a-z]+@[a-z]+\.[a-z]+/.test(value);
    }, 'Please enter a valid email address.');
    $.validator.addClassRules({
        utl: {required: true, minlength: 18},
        'phone-input': {required: true, minlength: 18},
        'mail-input': {correctEmail: true,},
        'callback-form__email': {correctEmail: true,}
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
        var $wrapper = $(this).parent(), value = String($(this).val()).trim();
        if (value.length > 0) {
            $wrapper.addClass('filled');
        }
        if (value.length <= 0) {
            $wrapper.removeClass('filled');
        }
    });
    $registrationFormPlaceholders.click(function (e) {
        e.preventDefault();
        var $wrapper = $(this).parent(), $wrappers = $registrationFormsInput.parent(),
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
    if ($('.timeline__item').length > 0) {
        $('.timeline__item').viewportChecker({classToAdd: 'onLook', repeat: false,});
    }
    $('.advantages').viewportChecker({classToAdd: 'onLook', repeat: true,});
    $('.spincrement__first').viewportChecker({classToAdd: 'onLook', repeat: true,});
    $('.spincrement__second').viewportChecker({classToAdd: 'onLook', repeat: true,});
    $('.spincrement__third').viewportChecker({classToAdd: 'onLook', repeat: true,});
    $('.person-summary__person').viewportChecker({classToAdd: 'onLook', repeat: true,});
    $activitiesTypes.click(function (e) {
        e.preventDefault();
        var $formPosition = $('.callback-form').offset().top;
        animatedScrollToPosition($('body, html'), $formPosition, 500);
    });
    (function animationAdvantages() {
        var advantagesCoordinate = $('.advantages').offset().top;
        var heightWindow = $(window).height();
        var advantagesDescription = $('.advantages-item__description');

        if ((advantagesCoordinate < heightWindow) && (!advantagesDescription.hasClass('fadeInUp'))) {
            advantagesDescription.addClass('fadeInUp');
        }
    })();
    $(window).on('scroll', function () {
        var $callBackForm = $('.advantages.onLook.full-visible').not('.done');
        var animationEnd = 'onanimationend animationend webKitAnimationEnd mozAnimationEnd MSAnimationEnd',
            $portfolioFirst = $('.spincrement__first.onLook'), $portfolioSecond = $('.spincrement__second.onLook'),
            $portfolioThird = $('.spincrement__third.onLook'), selector = $('.advantages-item__description'),
            animation = 'fadeInUp', $sticky = $('.about-aside__content-wrp--sticky'), $stickyParent = $('.sticky--wrp');
        if ($('div').is('.about-contant')) {
            stickifyBlock($sticky, $stickyParent);
        }
        if ($(this).scrollTop() > 500) {
            $('.up-arrow__wrapper').removeClass('hidden-down');
        } else {
            $('.up-arrow__wrapper').addClass('hidden-down');
        }
        if ($callBackForm.length > 0)  {
            if (!selector.hasClass(animation)) {
                selector.addClass(animation).one(animationEnd, function () {
                    $callBackForm.addClass('done');
                });
            }
        }
        if ($portfolioFirst.length > 0) {
            if (showDigitsAnimationFirst) {
                numbersAnimate($('.spincrement__first'), 0, 12, 1000);
                showDigitsAnimationFirst = false;
            }
        }
        if ($portfolioSecond.length > 0) {
            if (showDigitsAnimationSecond) {
                numbersAnimate($('.spincrement__second'), 0, 4, 1000);
                showDigitsAnimationSecond = false;
            }
        }
        if ($portfolioThird.length > 0) {
            if (showDigitsAnimationThird) {
                numbersAnimate($('.spincrement__third'), 0, 19, 1000);
                showDigitsAnimationThird = false;
            }
        }
    });
    $('.up__arrow-area').click(function (e) {
        e.preventDefault();
        animatedScrollToPosition($('body, html'), 0, 300);
    });
    if ($mtbContentDescription.length > 0) {
        $mtbContentDescription.mCustomScrollbar({theme: 'dark', scrollbarPosition: 'inside'});
    }
    $("body").on("click", ".btn-brief-close", function (e) {
        e.preventDefault();
        if ($('body .mtb-items__item').hasClass('active')) {
            e.stopPropagation();
            $('body .mtb-items__item').removeClass('active');
        }
    });
    $("body").on("click", ".license-items__item", function (e) {
        e.preventDefault();
        var $gallery = $(this).attr('href');
        $($gallery).magnificPopup({
            delegate: 'a',
            closeBtnInside: true,
            type: 'image',
            image: {
                markup: '<div class="mfp-figure  mfp-figure--license">' + '<div class="mfp-close"></div>' + '<div class="mfp-img">' + '</div>' + '<div class="mfp-bottom-bar">' + '<div class="mfp-title">' + '</div>' + '</div>' + '</div>',
                cursor: 'mfp-zoom-out-cur',
                titleSrc: function (item) {
                    var $gallery = $(item.el).parents('.license-gallery-item');
                    var result = '';
                    var $cl_active = '';
                    if ($gallery.find('a').length > 0) {
                        result = '<div class="mfp-pager">' + '<ul class="mfp-thumbnails">';
                        for (var index = 0; index < $gallery.find('a').length; index++) {
                            $cl_active = (item.index == index) ? ' class="active"' : '';
                            var $thumb = $gallery.find('a:eq(' + index + ')').find('img').attr('src');
                            result += '<li' + $cl_active + '>' + '<div class="thumbnail__wrapper" onclick="javascript:$(\'.gallery\').magnificPopup(\'goTo\', ' + index + ');return false;">' + '<img src="' + $thumb + '">' + '</div>' + '</li>';
                        }
                        result += '</ul>' + '<div>';
                        return result;
                    }
                }
            },
            gallery: {
                tCounter: '<div class="mfp-counter">%curr% из %total%</div>',
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1]
            },
        }).magnificPopup('open');
    });
    if ($('#collective-gallery-links').length > 0) {
        $('#collective-gallery-links').magnificPopup({
            delegate: 'a',
            closeBtnInside: true,
            type: 'image',
            gallery: {verticalFit: true, enabled: true, navigateByImgClick: true, preload: [0, 1]},
            image: {
                cursor: 'mfp-zoom-out-cur',
                markup: '<div class="mfp-figure  mfp-figure--collective">' + '<div class="mfp-close"></div>' + '<div class="mfp-img"></div>' + '<div class="mfp-bottom-bar">' + '<div class="mfp-title">' + '</div>' + '</div>' + '</div>',
            }
        });
    }
    $('.burger-menu__link').click(function (e) {
        e.preventDefault();
        if (!$(this).hasClass('burger-menu__link--active')) {
            $(this).addClass('burger-menu__link--active');
            $('.burger-menu').addClass('burger-menu--active');
            blockScrollOnPage();
            return;
        }
        $(this).removeClass('burger-menu__link--active');
        $('.burger-menu').removeClass('burger-menu--active');
        unblockScrollOnPage();
    });
    if ($('.footer-link-list__mobile').length > 0) {
        initializeMobileFooterAccordions();
        $('.footer-link-list__item--header a').click(function (e) {
            e.preventDefault();
            var $currentActiveAccordion = null, currentIndex = $('.footer-link-list__item--header a').index($(this)),
                currentHeight = 0;
            $.each($('.footer-link-list__item--header a'), function (indexInArray) {
                if (indexInArray != currentIndex) {
                    $(this).parent().removeClass('footer-link-list__item__header--active');
                    $currentActiveAccordion = $(this).parent().siblings('.footer-mobile-accordeon');
                    $currentActiveAccordion.css('height', 0);
                }
            });
            $currentActiveAccordion = $(this).parent().siblings('.footer-mobile-accordeon');
            if ($(this).parent().hasClass('footer-link-list__item__header--active')) {
                $(this).parent().removeClass('footer-link-list__item__header--active');
                $currentActiveAccordion.css('height', 0);
                return;
            }
            $(this).parent().addClass('footer-link-list__item__header--active');
            currentHeight = $currentActiveAccordion.find('.footer-mobile-accorderon__wrapper').outerHeight(true);
            $currentActiveAccordion.css('height', currentHeight);
        });
    }
    $('.burger-menu__link').click(function (e) {
        e.preventDefault();
        if (!$(this).hasClass('burger-menu__link--active')) {
            $(this).addClass('burger-menu__link--active');
            $('.burger-menu').addClass('burger-menu--active');
            blockScrollOnPage();
            return;
        }
        $(this).removeClass('burger-menu__link--active');
        $('.burger-menu').removeClass('burger-menu--active');
        unblockScrollOnPage();
    });
    media('all and (min-width: 1025px)', function () {
        if ($mobileAdvantages.length > 0 && $mobileAdvantages.is('.slick-slider')) {
            $mobileAdvantages.slick('unslick');
        }
    });
    media('all and (max-width: 1100px)', function () {
        if ($('#fullpage').length > 0 && $('html').is('.fp-enabled')) {
            fullpage_api.destroy('all');
        }
        if ($('.services-slider__list').length > 0) {
            $('.services-slider__list').on('init', function (e, slick) {
                $('.slick-arrow, .slick-dots').wrapAll('<div class=\'main-slider-arrow\'></div>')
            });
            $('.services-slider__list').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                swipe: true,
                dots: true,
                arrows: true,
                fade: true,
                prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" width="12.969" height="23" viewBox="0 0 12.969 23">\n' + '<defs>\n' + '    <style>\n' + '      .main-arrow-prev {\n' + '        fill: #43b343;\n' + '        fill-rule: evenodd;\n' + '      }\n' + '    </style>\n' + '  </defs>\n' + '  <path class="main-arrow-prev" d="M431.449,235.835L423.19,227.5l8.26-8.336A1.854,1.854,0,0,0,430.175,216h0a1.791,1.791,0,0,0-1.274.535l-9.2,9.28a2.4,2.4,0,0,0,0,3.37l9.2,9.28a1.794,1.794,0,0,0,1.274.534h0A1.854,1.854,0,0,0,431.449,235.835Z" transform="translate(-419.031 -216)"></path>\n' + '</svg></button>',
                nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="23" viewBox="0 0 13 23">\n' + '<defs>\n' + '    <style>\n' + '      .main-slider-next {\n' + '        fill: #43b343;\n' + '        fill-rule: evenodd;\n' + '      }\n' + '    </style>\n' + '  </defs>\n' + '  <path class="main-slider-next" d="M500.551,235.835l8.259-8.335-8.26-8.336A1.854,1.854,0,0,1,501.825,216h0a1.791,1.791,0,0,1,1.275.535l9.2,9.28a2.4,2.4,0,0,1,0,3.37l-9.2,9.28a1.8,1.8,0,0,1-1.275.534h0A1.854,1.854,0,0,1,500.551,235.835Z" transform="translate(-500 -216)"></path>\n' + '</svg></button>',
            });
        }
        $('.burger-menu__link').click(function (e) {
            e.preventDefault();
            if (!$(this).hasClass('burger-menu__link--active')) {
                $(this).addClass('burger-menu__link--active');
                $('.burger-menu').addClass('burger-menu--active');
                blockScrollOnPage();
                return;
            }
            $(this).removeClass('burger-menu__link--active');
            $('.burger-menu').removeClass('burger-menu--active');
            unblockScrollOnPage();
        });
    });
    media('all and (min-width: 1101px)', function () {
        if ($('#fullpage').length > 0) {
            $('#fullpage').fullpage({
                verticalCentered: true,
                scrollOverflow: true,
                licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
                anchors: ['anchor0', 'anchor1', 'anchor2', 'anchor3', 'anchor4', 'anchor5', 'anchor6', 'anchor7', 'anchor8', 'anchor9', 'anchor10', 'anchor11', 'anchor12', 'anchor13', 'anchor14'],
                menu: '#menu-fullpage',
            })
        }
        ;
        if ($('.services-slider__list').length > 0 && $('.services-slider__list').is('.slick-slider')) {
            $('.services-slider__list').slick('unslick');
        }
    });
    media('all and (max-width: 1024px)', function () {
        initializeMobileFooterAccordions();
        if ($mobileAdvantages.length > 0) {
            $mobileAdvantages.slick({
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                swipe: true,
                arrows: true,
                nextArrow: '<button type="button" class="slider__arrow slider__arrow--right">&rarr;</button>',
                prevArrow: '<button type="button" class="slider__arrow slider__arrow--left">&larr;</button>',
                responsive: [{breakpoint: 640, settings: {slidesToShow: 1, slidesToScroll: 1, infinite: true,}},]
            });
        }
    });
    media('all and (max-width: 480px)', function () {
        activateMobilePageNav();
        initializeMobileFooterAccordions();
    });
    $('.navigation-opener, .activiteies-types-aside-item__close-btn').click(function (e) {
        e.preventDefault();
        if (!$('.navigation-opener').hasClass('navigation-opener--active')) {
            $('.navigation-opener').addClass('navigation-opener--active');
            return;
        }
        $('.navigation-opener').removeClass('navigation-opener--active');
    });
    $('li.list__item').click(function (event) {
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
    $(document).mouseup(function (e) {
        hidePopupListener($mtbContentLink, e, function () {
            $mtbContentLink.removeClass('active');
        });
    });
    (function initAccordionMobileMenu() {
        if ($('.burger-menu-list').length > 0) {
            $('.burger-menu-list__item').removeClass('burger-menu-list__item--active');
            $('.burger-menu-list__item:not(.burger-menu-list__item--no-second-level) .burger-menu-link__wrp').on('click', function () {
                var thisParent = $(this).parents('.burger-menu-list__item');
                var thisTopCoordinate = $(this);
                if (!thisParent.hasClass('burger-menu-list__item--active')) {
                    $('.burger-menu-list__item').removeClass('burger-menu-list__item--active');
                    $('.burger-menu-list-item__container').slideUp(300);
                    thisParent.addClass('burger-menu-list__item--active');
                    thisParent.find('.burger-menu-list-item__container').slideDown(300);
                } else {
                    thisParent.removeClass('burger-menu-list__item--active');
                    thisParent.find('.burger-menu-list-item__container').slideUp(300);
                }
            });
        }
    })();
    // (function scrollTopAccordion() {
    //     $('.burger-menu-list__item:not(.burger-menu-list__item--no-second-level) .burger-menu-link__wrp').on('click', function () {
    //         var thisSiblings = $(this).siblings('.burger-menu-list-item__container');
    //         var thisElement = $(this);
    //
    //         if (thisSiblings.css('display') == 'block') {
    //
    //             // console.log('vdf');
    //             // setTimeout(function () {
    //             //     $('.burger-menu-list').animate({scrollTop:thisElement.position().top}, 300);
    //             // }, 350)
    //         }
    //     });
    // })();
    (function selectProject() {
        $('.project-show-all').on('click', function () {
            var idProject = $(this).data('project');
            var thisParent = $(this).parents('.all-project__list-item');
            $('.all-project__list-item').removeClass('active');
            thisParent.addClass('active');
            $('.project-detail').hide();
            $('#' + idProject).show();
        });
        $(document).on('click', '.projects__item-in-link', function () {
            var idProject = $(this).data('project');
            var parentItemOnSidebar = $('span[data-project="' + idProject + '"]').parents('.all-project__list-item');
            if (!$('div').is('.mobile-map')) {
                if (!$('.all-project__title').hasClass('active')) {
                    $('.all-project__title').addClass('active');
                    $('.all-project__list').slideDown(300);
                }
                $('.project-detail').hide();
                $('#' + idProject).show();
                parentItemOnSidebar.addClass('active');
            } else {
                $('#' + idProject).addClass('active');
            }
        });
    })();
    (function closeProjectDetail() {
        $('.project-detail__close').on('click', function () {
            var thisParent = $(this).parents('.project-detail');
            $('.all-project__list-item').removeClass('active');
            thisParent.hide();
        });
    })();
    (function addSliderCommercialProposal() {
        $('.commercial-proposal__list').slick({
            centerMode: true,
            slidesToShow: 5,
            arrows: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 3000,
            responsive: [{breakpoint: 1231, settings: {slidesToShow: 3,}}, {
                breakpoint: 801,
                settings: {slidesToShow: 1, fade: true,}
            }]
        });
    })();
    (function uppTopButtonMain() {
        $('.up-arrow-main__button').on('click', function () {
            window.location.hash = 'anchor0';
        });
    })();
    (function onBlurInput() {
        $('.focus-element').blur(function () {
            if ($(this).val()) {
                $(this).addClass('text-yes');
            } else {
                $(this).removeClass('text-yes');
            }
        });
    })();
    (function initCustomSelect() {
        $('.custom-select').select2({placeholder: "По видам работ", dropdownParent: $('.mobile-select'),});
        $('.select2-search__field').attr("readonly", "readonly");
    })();
    (function activateMobileMenu() {
        $(document).on('click', '.mobile-menu', function (e) {
            e.preventDefault();
            if ($('.mobile-menu-wrapper').hasClass('active')) {
                $('.mobile-menu-wrapper').removeClass('active');
                $('.burger-menu-mobile').removeClass('active');
            } else {
                $('.mobile-menu-wrapper').addClass('active');
                $('.burger-menu-mobile').addClass('active');
            }
            ;
        });
    })();
    (function activateMobileAccordeon() {
        $(document).on('click', '.burger-menu-mobile__item:not(.burger-menu-mobile__item--no-second-level) .burger-menu-mobile__header', function (e) {
            e.preventDefault();
            var thisParent = $(this).parents('.burger-menu-mobile__item');
            if (thisParent.hasClass('active')) {
                thisParent.removeClass('active');
                thisParent.find('.burger-menu-mobile__container').slideUp(300);
            } else {
                thisParent.addClass('active')
                thisParent.find('.burger-menu-mobile__container').slideDown(300);
            }
        });
    })();
    (function openFilterMobilePopup() {
        $(document).on('click', '.filter-mb-button', function (e) {
            e.preventDefault();
            $('.mb-filter').addClass('active');
            $('.mobile-panel').css('opacity', '0');
            var numberValueClients = 0;
            var numberValueWorks = 0;
            $('.mb-filter-item_clients input:not(.all-checked)').each(function () {
                if ($(this).prop('checked')) {
                    numberValueClients += 1;
                }
            });
            $('.working-branches input:not(.all-works)').each(function () {
                if ($(this).prop('checked')) {
                    numberValueWorks += 1;
                }
            });
            if (numberValueClients > 0 || numberValueWorks > 0) {
                $('.mb-refresh-button').addClass('active');
            }
        });
    })();
    (function closeFilterMobilePopup() {
        $(document).on('click', '.mb-close-button', function (e) {
            e.preventDefault();
            $('.mb-filter').removeClass('active');
            $('.mb-refresh-button').removeClass('active');
            $('.mobile-panel').removeAttr('style');
        });
    })();
    (function openClientFilterMobile() {
        $(document).on('click', '.mb-filter-button_client', function (e) {
            e.preventDefault();
            $('.mb-filter-item_clients').addClass('active');
        });
    })();
    (function openWorkFilterMobile() {
        $(document).on('click', '.mb-filter-button_works', function (e) {
            e.preventDefault();
            $('.mb-filter-item_works').addClass('active');
        });
    })();
    (function closeFilterMobile() {
        $(document).on('click', '.mb-ok-button', function (e) {
            e.preventDefault();
            var numberValueClients = 0;
            var numberValueWorks = 0;
            $('.mb-filter-item_clients input:not(.all-checked)').each(function () {
                if ($(this).prop('checked')) {
                    numberValueClients += 1;
                }
            });
            $('.working-branches input:not(.all-works)').each(function () {
                if ($(this).prop('checked')) {
                    numberValueWorks += 1;
                }
            });
            if ($(this).parents('.mb-filter-item_clients').length > 0) {
                if (numberValueClients > 0) {
                    $('.mb-filter-button_client .mb-filter-button__text').text('Клиентов - ' + numberValueClients);
                } else {
                    $('.mb-filter-button_client .mb-filter-button__text').text('Клиенты');
                }
                ;$('.mb-filter-item_clients').removeClass('active');
            }
            if ($(this).parents('.mb-filter-item_works').length > 0) {
                if (numberValueWorks > 0) {
                    $('.mb-filter-button_works .mb-filter-button__text').text('Работ - ' + numberValueWorks);
                } else {
                    $('.mb-filter-button_works .mb-filter-button__text').text('По видам работ');
                }
                ;$('.mb-filter-item_works').removeClass('active');
            }
            if (numberValueClients > 0 || numberValueWorks > 0) {
                $('.mb-refresh-button').addClass('active');
                $('.mb-filter__wrapper').addClass('mb-filter__wrapper_width-footer');
            } else {
                $('.mb-refresh-button').removeClass('active');
                $('.mb-filter__wrapper').removeClass('mb-filter__wrapper_width-footer');
            }
        });
    })();
    (function refreshFilterMobile() {
        $(document).on('click', '.mb-refresh-button', function (e) {
            $('.mb-filter-button_client .mb-filter-button__text').text('Клиенты');
            $('.mb-filter-button_works .mb-filter-button__text').text('По видам работ');
            $('.mb-filter__wrapper').removeClass('mb-filter__wrapper_width-footer');
            $('.mb-filter-item_clients input').each(function () {
                $(this).prop('checked', false);
            });
            $('.working-branches input').each(function () {
                $(this).prop('checked', false);
            });
            $(this).removeClass('active');
        });
    })();
    (function showProjectMobile() {
        $(document).on('click', '.mb-filter__show-project', function () {
            $('.mb-filter').removeClass('active');
            $('.mb-refresh-button').removeClass('active');
        });
    })();
    (function openProjectMB() {
        $(document).on('click', '.project-mb-button', function () {
            $('.mobile-project').addClass('active');
            $('.mobile-panel').css('opacity', '0');
        });
    })();
    (function closeProjectMB() {
        $(document).on('click', '.close-project-mobile', function () {
            $('.mobile-project').removeClass('active');
            $('.mobile-panel').removeAttr('style');
        });
    })();
    (function openProjectInMap() {
        $(document).on('click', '.mobile-project__item-in-map', function () {
            $('.mobile-project').removeClass('active');
        });
    })();
    (function openProjectDetail() {
        $(document).on('click', '.project-open', function () {
            var idProject = $(this).data('project');
            $('#' + idProject).addClass('active');
        });
    })();
    (function closeProjectDetail() {
        $(document).on('click', '.mobile-project-detail-close', function () {
            var thisParent = $(this).parents('.mobile-project-detail__item');
            thisParent.removeClass('active');
        });
    })();
    (function addAnimationTop() {
        $('.footer-link-list__item--header a').on('click', function () {
            var thisTopCoordinate = $(this);
            setTimeout(function () {
                $('html, body').animate({scrollTop:thisTopCoordinate.position().top}, 300);
            }, 350)
        });
    })();
    (function clickToClaster() {
        $(document).on('click', 'clusterIcon', function () {
        });
    })();
    if ($('.mb-filter').length > 0) {
        function calcVH() {
            var vH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            var thisElement = document.getElementsByClassName("mb-filter")[0];
            thisElement.setAttribute("style", "height:" + vH + "px;");
        }

        calcVH();
        window.addEventListener('onorientationchange', calcVH, true);
        window.addEventListener('resize', calcVH, true);
    }
});

function activateMobilePageNav() {
    var $mobileSelector = $('.navigation-opener');
    $.each($mobileSelector, function (indexInArray, valueOfElement) {
        if ($(this).hasClass('navigation-opener--active')) {
            $(this).removeClass('navigation-opener--active');
        }
    });
}

function initializeMobileFooterAccordions() {
    var $items = $('.footer-link-list__mobile  .footer-link-list__item--header');
    var $currentActiveAccordion = null, currentAccordionHeight = 0;
    $.each($items, function (indexInArray, valueOfElement) {
        $currentActiveAccordion = $(this).siblings('.footer-mobile-accordeon');
        thisTopCoordinate = $(this);
        currentAccordionHeight = $currentActiveAccordion.find('.footer-mobile-accorderon__wrapper').outerHeight(true);
        if (indexInArray > 0) {
            $(this).removeClass('footer-link-list__item__header--active');
            $currentActiveAccordion.css('height', 0);
        } else {
            $currentActiveAccordion.css('height', currentAccordionHeight);
            // setTimeout(function () {
            //     console.log('sdfsd');
            // $('html, body').animate({scrollTop:thisTopCoordinate.position().top}, 300);
            // }, 500);
        }
    });
}

function blockScrollOnPage() {
    'use strict';
    $('body, html').addClass('no-scroll');
}

function unblockScrollOnPage() {
    'use strict';
    if ($('body, html').hasClass('no-scroll')) {
        $('body, html').removeClass('no-scroll');
    }
}

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

function stickifyBlock($sticky, $stickyParent) {
    var stickyParentHeight = $stickyParent.outerHeight(true), stickyHeight = $sticky.outerHeight(true),
        stickyPositionTop = $('.about-contant').offset().top,
        stickyPositionBottom = ($('.sticky.done').length > 0) ? $('.sticky.done').offset().top : false,
        currentPositionInBlock = $(this).scrollTop() - stickyPositionTop;
    if ($(this).scrollTop() > stickyPositionTop) {
        if (!$sticky.hasClass('sticky')) {
            $sticky.addClass('sticky');
        }
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
        } else {
            if ($sticky.hasClass('done')) {
                $sticky.removeClass('done');
            }
        }
    } else {
        if ($sticky.hasClass('sticky')) {
            $sticky.removeClass('sticky');
        }
    }
}

function animatedScrollToPosition($selector, position, duration) {
    $($selector).animate({scrollTop: position}, duration);
    return false;
}

function numbersAnimate($selector, $from, $to, $duration) {
    $({numberValue: $from}).animate({numberValue: $to}, {
        duration: $duration, easing: "linear", step: function (val) {
            $selector.html(Math.ceil(val));
        }
    });
}

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

function media(mediaQueryString, action) {
    'use strict';
    var handleMatchMedia = function (mediaQuery) {
        if (mediaQuery.matches) {
            if (action && typeof(action) === 'function') {
                action();
            }
        }
    };
    var mql = window.matchMedia(mediaQueryString);
    handleMatchMedia(mql);
    mql.addListener(handleMatchMedia);
}

function initFields($registrationFormsInput) {
    var value = '', $wrapper;
    $.each($registrationFormsInput, function (indexInArray, valueOfElement) {
        value = String($(this).val()).trim();
        $wrapper = $(this).parent();
        if (value.length > 0) {
            $wrapper.addClass('filled');
        }
        if (value.length <= 0) {
            $wrapper.removeClass('filled');
        }
    });
    (function initCallBackForm() {
        $('.btn__order-callback, .btn-call, .call-green-text').click(function (e) {
            e.preventDefault();
            $('.callback').show(0);
            $('body').css('overflow', 'hidden').css('position', 'relative').css('height', '100%').css('width', '100%');
            $('.callback').toggleClass('active');
        });
    })();
    (function closeCallbackForm() {
        $('.callback__close-icon, .callback__close').click(function (e) {
            e.preventDefault();
            if ($('.callback').hasClass('active')) {
                $('.callback').removeClass('active');
                setTimeout(function () {
                    $('.callback').hide(0);
                    $('body').removeAttr('style');
                }, 300);
            }
        });
    })();
    (function vaslidateCallBackForm() {
        $('#main-callback-form').validate({
            submitHandler: function (form) {
                $.ajax({
                    type: $(form).attr('method'),
                    url: $(form).attr('action'),
                    data: $(form).serialize(),
                    success: function (data) {
                        var hideSelectors = $('.callback__form');
                        $.each(hideSelectors, function () {
                            $(this).addClass('hide-information');
                        });
                        $('.thank-you-text').addClass('show');
                    },
                    error: function () {
                        var hideSelectors = $('.callback__form');
                        $.each(hideSelectors, function () {
                            $(this).addClass('hide-information');
                        });
                        $('.wrong-text').addClass('show');
                    }
                });
                return false;
            }, onkeyup: function (element) {
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

function addTabs(tabbed_selector) {
    var tabbed = document.querySelector(tabbed_selector);
    var tablist = tabbed.querySelector('ul');
    var tabs = tablist.querySelectorAll('a');
    var panels = tabbed.querySelectorAll('[id^="section"]');
    var switchTab = function switchTab(oldTab, newTab) {
        newTab.focus();
        newTab.removeAttribute('tabindex');
        newTab.setAttribute('aria-selected', 'true');
        oldTab.removeAttribute('aria-selected');
        oldTab.setAttribute('tabindex', '-1');
        var index = Array.prototype.indexOf.call(tabs, newTab);
        var oldIndex = Array.prototype.indexOf.call(tabs, oldTab);
        panels[oldIndex].hidden = true;
        panels[index].hidden = false;
    };
    tablist.setAttribute('role', 'tablist');
    Array.prototype.forEach.call(tabs, function (tab, i) {
        tab.setAttribute('role', 'tab');
        tab.setAttribute('id', 'tab' + (i + 1));
        tab.setAttribute('tabindex', '-1');
        tab.parentNode.setAttribute('role', 'presentation');
        tab.addEventListener('click', function (e) {
            e.preventDefault();
            var currentTab = tablist.querySelector('[aria-selected]');
            if (e.currentTarget !== currentTab) {
                switchTab(currentTab, e.currentTarget);
            }
        });
        tab.addEventListener('keydown', function (e) {
            var index = Array.prototype.indexOf.call(tabs, e.currentTarget);
            var dir = e.which === 37 ? index - 1 : e.which === 39 ? index + 1 : e.which === 40 ? 'down' : null;
            if (dir !== null) {
                e.preventDefault();
                dir === 'down' ? panels[i].focus() : tabs[dir] ? switchTab(e.currentTarget, tabs[dir]) : void 0;
            }
        });
    });
    Array.prototype.forEach.call(panels, function (panel, i) {
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('tabindex', '-1');
        var id = panel.getAttribute('id');
        panel.setAttribute('aria-labelledby', tabs[i].id);
        panel.hidden = true;
    });
    tabs[0].removeAttribute('tabindex');
    tabs[0].setAttribute('aria-selected', 'true');
    panels[0].hidden = false;
}

function activateLinks($selector) {
    $($selector).click(function (e) {
        e.preventDefault();
        $.each($selector, function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            }
        });
        if (!$(this).hasClass('active')) {
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
