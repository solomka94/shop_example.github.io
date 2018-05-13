/*
<div class="section">
  <ul class="tabs">
    <li class="current">1-я вкладка</li>
    <li>2-я вкладка</li>
  </ul>
  <div class="box visible">
    Содержимое первого блока
  </div>
  <div class="box">
    Содержимое второго блока
  </div>
</div><!-- .section -->

<a href="#tab1">1-я вкладка</a>
*/

/*
.box {
  display: none; // по умолчанию прячем все блоки
}
.box.visible {
  display: block; // по умолчанию показываем нужный блок
}
*/

/*
$(function(){
    $('div.section').elitTabs({
        'changeEffect': 'slide',
        'useCookie': false
    });
});
*/

(function( $ ) {
    
    var elitTabsConfig = {
        'useCookie': true, // запоминать ли состояние табов
        'useHashLink': true, // включить ли возможность переключения табов с помощью ссылок вне блока с табами и переключения табов в зависимости от хеш-данных в url (если на странице выводится несколько блоков с табами, отключите эту опцию)
        'changeEffect': 'fade', // способ смены табов
        'animateOptions': {}, // параметры используемые функциями анимации
        'globalTabsWrappSelector': 'div.section', // селектор обертки любого из присутствующих на странице блоков с табами, используется для переключения через URL и куки
        'tabSelector': 'div.box', // селектор одного таба
        'tabsLinksWrappSelector': 'ul.tabs', // селектор контейнера, содержащего ссылки на табы
        'tabsLinkSelector': 'li', // селектор контейнера, содержащего ссылки на табы
        'currentLinkClass': 'current', // класс активного заголовка таба
        'curentTabClass': 'visible', // класс активного таба
        'cookieName': 'tabCookie', // базовое имя куки в которой будет сохраняться активный таб
        'cookieExpires': 365, // количество дней, в течении которых будут храниться куки
        'hashName': 'tab', // имя параметра в URL в котором будет передаваться индекс активного таба
        'topOffsetSlideTo': 100 // отступ до верха активного слайда при прокрутке методом slideToElement (например при переходе к табу по параметам в адресной строке)
    };
    
    var elitTabsAnimate = {
        
        'fade': {
            'ready': function(wrappers){
                var defaultOptions = {
                    'animateSpeed': 150
                };
                elitTabsConfig.animateOptions = $.extend(defaultOptions, elitTabsConfig.animateOptions);
                return true;
            },
            'change': function(new_active_tab){
                var current_active_tab = new_active_tab.parent().find(elitTabsConfig.curentTabSelector);
                current_active_tab.hide().removeClass(elitTabsConfig.curentTabClass);
                new_active_tab.fadeIn(elitTabsConfig.animateOptions.animateSpeed).addClass(elitTabsConfig.curentTabClass);
                return true;
            }
        },
        
        'slide': {
            'ready': function(wrapp){
                
                var defaultOptions = {
                    'animateSpeed': 500, // скорость смены табов
                    'slidesWrappClass': 'tabs_wrap', // класс обертки карусели табов
                    'slidesInnerWrapp': 'tabs_slide', // класс ленты с табами
                    'adaptiveMode': true, // перестраивать ссылки для переключения табов в стрелки для их пролистывания в зависимости от ширины экрана
                    'adaptiveBreakPoint': false, // ширина экрана, начиная с которой нужно выводить стрелки вместо ссылок. Если не указано, то будет равна общей ширине ссылок для переключения, и если экран меньше, то будут выводиться стрелки
                    'adaptiveTabsWrappClass': 'slideAdaptiveTabs', // класс обертки для стрелок
                    'adaptiveWrappClass': 'slideLinksArrows', // класс обертки для стрелок
                    'adaptiveLinkClass': 'slideLinksArrow', // класс стрелок
                    'adaptiveLinkFirstClass': 'slideLinksArrow_left', // класс трелки назад
                    'adaptiveLinkLastClass': 'slideLinksArrow_right', // класс стрелки вперед
                    'adaptiveTitleClass': 'slideLinksArrow_current', // класс блока с текстом ссулки на активный таб
                    'adaptiveArrowNextContent': '&rarr;', // содержимое стрелки вперед
                    'adaptiveArrowPrevContent': '&larr;' // содержимое стрелки назад
                };
                elitTabsConfig.animateOptions = $.extend(defaultOptions, elitTabsConfig.animateOptions);
                elitTabsConfig.animateOptions.adaptiveWrappSelector = '.' + elitTabsConfig.animateOptions.adaptiveWrappClass.split(' ').join('.');
                elitTabsConfig.animateOptions.adaptiveLinkSelector = '.' + elitTabsConfig.animateOptions.adaptiveLinkClass.split(' ').join('.');
                elitTabsConfig.animateOptions.adaptiveLinkFirstSelector = '.' + elitTabsConfig.animateOptions.adaptiveLinkFirstClass.split(' ').join('.');
                elitTabsConfig.animateOptions.adaptiveLinkLastSelector = '.' + elitTabsConfig.animateOptions.adaptiveLinkLastClass.split(' ').join('.');
                elitTabsConfig.animateOptions.adaptiveTitleSelector = '.' + elitTabsConfig.animateOptions.adaptiveTitleClass.split(' ').join('.');
                
                tabs_wrap = $('<div>',{'class': elitTabsConfig.animateOptions.slidesWrappClass}).css({'overflow': 'hidden', 'position': 'relative', 'width': '100%'});
                tabs_slide = $('<div>',{'class': elitTabsConfig.animateOptions.slidesInnerWrapp}).css({'left': 0, 'position': 'relative'});
                slides = wrapp.find(elitTabsConfig.tabSelector);
                tabs_wrap.append(tabs_slide);
                wrapp.append(tabs_wrap);

                tabs_wrap_width = tabs_wrap.width();
                tabs_slide.width(tabs_wrap_width * slides.length);
                tabs_slide.append(slides);

                slides.each(function(idx, slide){
                    $(slide).css({'display': 'block', 'float': 'left', 'width': tabs_wrap_width});
                });
                
                setTimeout(function(){
                    tabs_wrap.css({'height': slides.eq(0).innerHeight() + tabs_wrap.css('paddingTop').replace('px','')*1 + tabs_wrap.css('paddingBottom').replace('px','')*1});
                }, 100);
                
                var links = wrapp.find(elitTabsConfig.tabsLinksWrappSelector + ' ' + elitTabsConfig.tabsLinkSelector);
                
                if(elitTabsConfig.animateOptions.adaptiveMode){
                    if(!elitTabsConfig.animateOptions.adaptiveBreakPoint){
                        links.each(function(idx, el){
                            link = $(el);
                            elitTabsConfig.animateOptions.adaptiveBreakPoint += link.outerWidth() + link.css('marginLeft').replace('px', '')*1 + link.css('marginRight').replace('px', '')*1;
                        });
                    }
                    if(wrapp.innerWidth() < elitTabsConfig.animateOptions.adaptiveBreakPoint){
                        wrapp.addClass(elitTabsConfig.animateOptions.adaptiveTabsWrappClass);
                        links.css({'display': 'none'});
                        var arrowWrapper = $('<div>', {'class': elitTabsConfig.animateOptions.adaptiveWrappClass});
                        var firstLink = $('<div>', {'class': elitTabsConfig.animateOptions.adaptiveLinkClass + ' ' + elitTabsConfig.animateOptions.adaptiveLinkFirstClass}).html(elitTabsConfig.animateOptions.adaptiveArrowPrevContent);
                        var lastLink = $('<div>', {'class': elitTabsConfig.animateOptions.adaptiveLinkClass + ' ' + elitTabsConfig.animateOptions.adaptiveLinkLastClass}).html(elitTabsConfig.animateOptions.adaptiveArrowNextContent);
                        var adaptiveTitle = $('<div>', {'class': elitTabsConfig.animateOptions.adaptiveTitleClass});
                        
                        arrowWrapper.append(firstLink, adaptiveTitle, lastLink);
                        
                        var link_wrapp = wrapp.find(elitTabsConfig.tabsLinksWrappSelector);
                        link_wrapp.before(arrowWrapper);
                        adaptiveTitle.html(link_wrapp.find(elitTabsConfig.currentLinkSelector).html());
                        
                        firstLink.on('click', function(){
                            var current_idx = links.index(link_wrapp.find(elitTabsConfig.currentLinkSelector));
                            if(current_idx == 0)
                                current_idx = links.length - 1;
                            else
                                current_idx -= 1;
                            var newCurrent = links.eq(current_idx)
                            newCurrent.trigger('click');
                        });
                        lastLink.on('click', function(){
                            var current_idx = links.index(link_wrapp.find(elitTabsConfig.currentLinkSelector));
                            if(current_idx == links.length - 1)
                                current_idx = 0;
                            else
                                current_idx += 1;
                            var newCurrent = links.eq(current_idx)
                            newCurrent.trigger('click');
                        });
                    }
                } 
                
                return slides.length > 0;
            },
            'change': function(new_active_tab){
                var current_active_tab = new_active_tab.parent().find(elitTabsConfig.curentTabSelector);

                var wrapper = new_active_tab.parents('.' + elitTabsConfig.animateOptions.slidesWrappClass);
                var new_height = new_active_tab.height() + wrapper.css('paddingTop').replace('px','')*1 + wrapper.css('paddingBottom').replace('px','')*1;
                var tab_width = current_active_tab.width();
                new_active_tab.css({'width': tab_width});

                var current_slide_position = new_active_tab.parent().css('left').replace('px','')*1;

                new_active_tab.parents('.' + elitTabsConfig.animateOptions.slidesWrappClass).css({'height': current_active_tab.height()});
                
                var new_position = new_active_tab.index()*tab_width*-1;
                new_active_tab.parent().animate({'left': new_position}, elitTabsConfig.animateOptions.animateSpeed);
                
                wrapper.animate({'height': new_height}, elitTabsConfig.animateOptions.animateSpeed);
                
                new_active_tab.addClass(elitTabsConfig.curentTabClass);
                current_active_tab.removeClass(elitTabsConfig.curentTabClass);
                
                var global_wrapp = $(new_active_tab).parents(elitTabsConfig.globalTabsWrappSelector);
                var adaptive_title = global_wrapp.find(elitTabsConfig.animateOptions.adaptiveTitleSelector);
                if(adaptive_title.length > 0)
                    adaptive_title.html(global_wrapp.find(elitTabsConfig.currentLinkSelector).html());

                return true;
            }
        }
    };
    
    var methods = {
        // создание куки чтоб сохранить активную вкладку
        'createCookie': function(name,value,days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime()+(days*24*60*60*1000));
                var expires = "; expires="+date.toGMTString();
            }
            else var expires = "";
            document.cookie = name+"="+value+expires+"; path=/";
        },
        
        // чтение сохраненной куки, чтоб определить какая вкладка активна
        'readCookie': function(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
        },
        
        // стирание куки
        'eraseCookie': function(name) {
            methods.createCookie(name,"",-1);
        },
        
        // прокрутка к элементу
        'slideToElement': function($target){
            var paddingTop = $target.css('paddingTop').replace('px', '') * 1;
            if(!paddingTop){
                var padding = $target.css('padding').split(' ');
                if(padding.length)
                    paddingTop = padding[0].replace('px', '') * 1;
            }
            var destination = $target.offset().top - paddingTop - elitTabsConfig.topOffsetSlideTo;
            $("html:not(:animated), body:not(:animated)").animate({ scrollTop: destination}, elitTabsConfig.animateOptions.animateSpeed);
        }
    }
    
    $.fn.elitTabs = function(options) {
        elitTabsConfig = $.extend(elitTabsConfig, options);
        elitTabsConfig.currentLinkSelector = '.' + elitTabsConfig.currentLinkClass.split(' ').join('.');
        elitTabsConfig.curentTabSelector = '.' + elitTabsConfig.curentTabClass.split(' ').join('.');
        
        // определим анимацию смены табов
        var TAB_ANIMATE = elitTabsAnimate[elitTabsConfig.changeEffect];
        
        return this.each(function(){
            
            var $TABS = $(this);
            var $TABS_LINKS = $TABS.find(elitTabsConfig.tabsLinksWrappSelector);
            var tabsIndex = $(elitTabsConfig.globalTabsWrappSelector).index($TABS); // определяем индекс текщих табов на странице, это понадобится позже, для установки кук и определения активного при загрузке страницы таба
            
            // запустим предобработку для реализации анимации
            if(typeof TAB_ANIMATE.ready == 'function')
                TAB_ANIMATE.ready($TABS);

            // вот тут вешаем обработку кликов по загоовкам табов
            $TABS_LINKS.delegate(elitTabsConfig.tabsLinkSelector + ':not(' + elitTabsConfig.currentLinkSelector + ')', 'click', function() {
                var curent_caption = $(this);
                
                curent_caption.addClass(elitTabsConfig.currentLinkClass)// добавляем активный класс нужной вкладке
                    .siblings().removeClass(elitTabsConfig.currentLinkClass);// удаляем активный класс у соседей
                
                var curent_tab = $TABS.find(elitTabsConfig.tabSelector).eq(curent_caption.index())// находим соответствующую заголовку вкладку
                TAB_ANIMATE.change(curent_tab);// запускаем анимацию переключения табов

                // запоминание активного таба
                if(elitTabsConfig.useCookie){
                    methods.eraseCookie(elitTabsConfig.cookieName + tabsIndex);
                    methods.createCookie(elitTabsConfig.cookieName + tabsIndex, curent_caption.index(), elitTabsConfig.cookieExpires);
                }
            });
            
            // по умолчанию мы при загрузке страницы будем открывать первый таб
            var active_on_start = 0;
            var use_hash_value = false;
            
            // теперь проверим есть ли в куках или URL вкладка, которую нужно открыть при загрузке страницы
            // более весомым будет параметр в URL
            if(elitTabsConfig.useHashLink){
                var hashTabIndex = window.location.hash.replace('#' + elitTabsConfig.hashName, '');
                if (hashTabIndex){
                    hashTabIndex = hashTabIndex.split('-');
                    if(hashTabIndex[0] == tabsIndex + 1){
                        active_on_start = hashTabIndex[1] * 1 - 1;
                        use_hash_value = true;
                        if(!$TABS.is(":visible")){
                            $TABS.slideDown(elitTabsConfig.animateOptions.animateSpeed / 2);
                            if(typeof TAB_ANIMATE.ready == 'function')
                                TAB_ANIMATE.ready($TABS);
                        }
                        methods.slideToElement($TABS);
                    }
                }
                
                // ну и за одно сразу повесим обработчики на ссылки с хешами для этих табов, просто чтоб рядышком было с обработкой хешей в адресной строке
                $('a[href^="#' + elitTabsConfig.hashName + (tabsIndex + 1) + '-"]').on('click', function(e) {
                    e.preventDefault();
                    var tabIndex = $(this).attr('href').replace('#' + elitTabsConfig.hashName + (tabsIndex + 1) + '-', '') * 1 - 1;
                    if(!$TABS.is(":visible")){
                        $TABS.slideDown(elitTabsConfig.animateOptions.animateSpeed / 2);
                        if(typeof TAB_ANIMATE.ready == 'function')
                            TAB_ANIMATE.ready($TABS);
                    }
                    methods.slideToElement($TABS);
                    $TABS_LINKS.find(elitTabsConfig.tabsLinkSelector).eq(tabIndex).trigger('click');
                });
            }
            
            // ну а если в URL нету ничего для нас интересного, то посмотрим в куках
            if(elitTabsConfig.useCookie && !use_hash_value){
                var cookie = methods.readCookie(elitTabsConfig.cookieName + tabsIndex);
                if(cookie)
                    active_on_start = cookie;
            }
            
            // ну а теперь кликаем по нужному табику
            $TABS_LINKS.find(elitTabsConfig.tabsLinkSelector).eq(active_on_start).trigger('click');
        });
        
    };
})(jQuery);