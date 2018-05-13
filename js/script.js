$(window).load(function () {

    $(".loader_inner").fadeOut();
    $(".loader").delay(400).fadeOut("slow");

});
$(document).ready(function () {
    $('.top-slider.owl-carousel').owlCarousel({
        loop: true, //Зацикливаем слайдер
        //		margin:10, //Отступ от картино если выводите больше 1
        nav: false, //Отключил навигацию
        dots: true,
        dotsEach: true,
        autoplay: false, //Автозапуск слайдера
        smartSpeed: 1000, //Время движения слайда
        autoplayTimeout: 2000, //Время смены слайда
        animateOut: 'zoomIn',
        animateIn: 'zoomIn',
        responsive: { //Адаптация в зависимости от разрешения экрана
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
    var $tov_def = $('.tovar-carousel-list');
    var $tov_big = $('.tovar-carousel-list-big');
    //    $('.tovar-carousel-list').removeClass('owl-carousel');
    //    var $scroll = $('.tovar-carousel-list');

    // если блок слайдером
    $tov_def.owlCarousel({
        center: false,
        loop: true,
        dots: false,
        items: 4,
        margin: 20,
        //mouseDrag: false,
        nav: true,
        smartSpeed: 500,
        autoplay: false,
        navText: ['<span class="button-prev"><i class="material-icons">&#xE5CB;</i><span>',
          '<span class="button-next"><i class="material-icons">&#xE5CC;</i></span>'],

        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 2,
                margin: 40
            },
            650: {
                items: 3
            },
            1200: {
                items: 4
            }
        }

    });
    $tov_big.owlCarousel({
        center: false,
        loop: true,
        dots: false,
        items: 3,
        margin: 20,
        //mouseDrag: false,
        nav: true,
        smartSpeed: 500,
        autoplay: false,
        navText: ['<span class="button-prev"><i class="material-icons">&#xE5CB;</i><span>',
          '<span class="button-next"><i class="material-icons">&#xE5CC;</i></span>'],

        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 2
            },
            650: {
                items: 2,
                margin: 40
            },
            1200: {
                items: 3
            }
        }

    });
    
    $('.status').click(function (event) {
        event.preventDefault();
        if ($(this).hasClass('like')) {
            $(this).removeClass('like');
            $(this).addClass('notlike');
        } else {
            $(this).removeClass('notlike');
            $(this).addClass('like');
        }
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > 210) {
            $('.bott-header').addClass("sticky");
            $('header').css('margin-bottom', '60px');
        } else if ($(this).scrollTop() < 210) {
            $('.bott-header').removeClass("sticky");
            $('header').css('margin-bottom', '0');
        }
    });
    $('.togg-btn').click(function () {
        $('.fixtab-menu').toggleClass('togg-fixtab');
    });
    //fix-menu
    $(".catalog").click(function () {
        $(".fix-menu").fadeIn("500");
        $('body').addClass('not-scroll');
        $('.bott-header').removeClass('sticky');
    });

    $(".fix-close").click(function () {
        $(".fix-menu").fadeOut("500");
        $('body').removeClass('not-scroll');
    });

    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 500,
        values: [50, 355],
        slide: function (event, ui) {
            $("#amount").val(ui.values[0] + " руб - " + ui.values[1] + " руб");
        }
    });
    
    $("#amount").val($("#slider-range").slider("values", 0) +
        " руб - " + $("#slider-range").slider("values", 1) + " руб");
    
    $('.select-sort').styler();
    
    $('.search-include').click(function () {
        $('.search-wp').stop();
        $('.search-wp').toggleClass('mobile-hide');
        if ($('.search-ico').is(':visible')) {
            $('.search-ico').hide();
            $('.close-ico').show();
        } else {
            $('.close-ico').hide();
            $('.search-ico').show()
        }
    });

    $('.thumb-img').on('click', function () {
        $('.big-img').attr('src', $(this).data('big'));
        $(this).siblings('.thumb-img').removeClass('active-thumb');
        $(this).addClass('active-thumb');
    });
    
    $(window).load(windowSize);
    $(window).resize(windowSize);

    $(function () {
        $('div.section').elitTabs({
            'useCookie': false
        });
    });
    
//     var inp = $("#up-img");
//    
//    inp.change(function (e) {
//        $file_type = this.value.split('.').pop();
//        if($file_type!="jpeg" && $file_type!="jpg"  && $file_type!="png"){
//            $('.upl-message').text("Допускаются файлы только jpeg, jpg, png");
//            $('.upl-message').css("color", "red");
//            inp.val("");
//        }else {
//            $('.upl-message').text("");
//            readURL(this);
//            $('#blah').Jcrop({ // Привязываем плагин JСrop к изображению
//                bgColor: 'white',
//                aspectRatio: 0,
//                setSelect:   [ 0, 0, 900, 900 ],
//                minSize: [50, 50],
//                boxWidth: 413,
//                boxHeight: 237,
//                onChange: updateCoords,
//                onSelect: updateCoords
//            },function(){ 
//                jcrop_api = this; 
//            });
//        }
//    });
//
//    $("#close").click(function (e) {
//        $("#blah").attr("src", "#");
//        $(this).css('display', 'none');
//        $('#blah').addClass('hidden');
//        $('.upload-area .fa-file-image-o').removeClass('hidden');
//        jcrop_api.destroy();
//    });
//    $("#crop").click(function (e) {
//        ctx.drawImage(pic, x1, y1, w, h, 0, 0, 413, 237);
//    });

    $(".create-block input").on('change', function () {
        console.log('change');
        var thsParent = $(this).closest('.radio-label');
        thsParent.siblings().removeClass('red');

        if (thsParent.find('.checked')) {
            thsParent.addClass('red');
        }
    })
    $(".order-id-wp").click(function (e) {
        e.preventDefault();
        $(this).parent(".order-item").children(".toggle-details").fadeIn(500);
        $(this).parent(".order-item").addClass("open");
    });
    $(".order-price-wp").click(function (e) {
        $(this).parent(".order-item").children(".toggle-details").fadeOut(100);
        $(this).parent(".order-item").removeClass("open");
    });
    
});

function windowSize(){
    if ($(window).width() >= '810'){
        $('.tov-count').styler();
        $('.radio').styler();
        $('.delivery, .pay-way').styler();
    }
    if ($(window).width() < '810'){
        $('.tov-count').styler('destroy');
        $('.radio').styler('destroy');
        $('.delivery, .pay-way').styler('destroy');
    }
}

/*
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
            $('#blah').removeClass('hidden');
            $("#close").css('display', 'block');
            $('.upload-area .fa-file-image-o').addClass('hidden');
            pic.src = $('#blah').attr('src');
        }

        reader.readAsDataURL(input.files[0]);
    }
}

var example = document.getElementById('preview-img');
        ctx = example.getContext('2d');
        pic = new Image();
        example.height = 413;
        example.height = 237;

var x1, y1, x2, y2, w, h;

function updateCoords(c) {
    x1 = c.x;  $('#x1').val(c.x); 
    y1 = c.y;  $('#y1').val(c.y); 
    x2 = c.x2;  $('#x2').val(c.x2); 
    y2 = c.y2;  $('#y2').val(c.y2); 
    w = c.w; $('#w').val(c.w);
    h = c.h; $('#h').val(c.h); 
       if(c.w > 0  && c.h > 0){
        $('#crop').show();
    }else{
        $('#crop').hide();
    } 
};

function checkCoords() {
    if (parseInt($('#w').val())) return true;
    alert('Пожалуйста, выберите область для обрезки.');
    return false;
};
*/

/*pic.onload = function () {
    ctx.drawImage(pic, $('#x').val(), $('#y').val(), $('#w').val(), $('#h').val(), 0, 0, 170, 110);
}*/