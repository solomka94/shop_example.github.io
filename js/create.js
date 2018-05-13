//Загрузка и обработка картинки на странице create
var x1, y1, x2, y2, w, h;
var jcrop_api;

var coords_arr = [
    { x: 12, y: 12, w: 80, h: 106 },
    { x: 92, y: 12, w: 64, h: 98 },
    { x: 157, y: 12, w: 64, h: 98 },
    { x: 222, y: 12, w: 64, h: 98 },
    { x: 287, y: 12, w: 64, h: 98 },
    { x: 352, y: 12, w: 64, h: 98 },
    { x: 12, y: 12, w: 80, h: 106, rotate: true },
    { x: 92, y: 12, w: 64, h: 98, rotate: true },
    { x: 157, y: 12, w: 64, h: 98, rotate: true },
    { x: 222, y: 12, w: 64, h: 98, rotate: true },
    { x: 287, y: 12, w: 64, h: 98, rotate: true },
    { x: 352, y: 12, w: 64, h: 98, rotate: true }
];

var example = document.getElementById('preview-img');
var ctx = example.getContext('2d');
var pic = new Image();
example.width = 418;
example.height = 237;

$(document).ready(function () {
    var inp = $("#up-img");

    inp.change(function (e) {
        $file_type = this.value.split('.').pop();
        if ($file_type != "jpeg" && $file_type != "jpg" && $file_type != "png") {
            $('.upl-message').text("Допускаются файлы только jpeg, jpg, png");
            $('.upl-message').css("color", "red");
            inp.val("");
        } else {
            $('.upl-message').text("");
            readURL(this);
            $('#blah').Jcrop({ // Привязываем плагин JСrop к изображению
                bgColor: 'white',
                aspectRatio: 3/4,
                setSelect: [0, 0, 900, 900],
                minSize: [50, 50],
                boxWidth: 413,
                boxHeight: 237,
                onChange: updateCoords,
                onSelect: updateCoords
            }, function () {
                jcrop_api = this;
            });
        }
    });

    $("#close").click(function (e) {
        $("#blah").attr("src", "#");
        $(this).css('display', 'none');
        $('#blah').addClass('hidden');
        $('.upload-area .fa-file-image-o').removeClass('hidden');
        jcrop_api.destroy();
    });
    $("#crop").click(function (e) {
        ctx.clearRect(0, 0, ctx.width, ctx.height);
        $.each(coords_arr,function(idx,data) {
            if(idx == 6) rotateCanvas(example);
            drawImg(data, x1, y1, w, h, pic, ctx);
        });
    });
});

function rotateCanvas(canvasElement){
    var razmer=parseInt(canvasElement.height/2);
    var cnvobj= canvasElement;
    var  ctx=cnvobj.getContext("2d");
    for (i=0;i<=razmer;i++)
    {
         imgd = ctx.getImageData(0,i, canvasElement.width, 1);
         imgd1 = ctx.getImageData(0,(canvasElement.height-i), canvasElement.width, 1);
         ctx.putImageData(imgd, 0, (canvasElement.height-i));
         ctx.putImageData(imgd1, 0, i);
    }

}

function drawImg(arr, x, y, w, h, pic, ctx) {
    ctx.drawImage(pic, x, y, w, h, arr.x, arr.y, arr.w, arr.h);
}

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
};

function updateCoords(c) {
    x1 = c.x;
    $('#x1').val(c.x);
    y1 = c.y;
    $('#y1').val(c.y);
    x2 = c.x2;
    $('#x2').val(c.x2);
    y2 = c.y2;
    $('#y2').val(c.y2);
    w = c.w;
    $('#w').val(c.w);
    h = c.h;
    $('#h').val(c.h);
    if (c.w > 0 && c.h > 0) {
        $('#crop').show();
    } else {
        $('#crop').hide();
    }
};

function checkCoords() {
    if (parseInt($('#w').val())) return true;
    alert('Пожалуйста, выберите область для обрезки.');
    return false;
};

var TO_RADIANS = Math.PI/180; 
function drawRotatedImage(image, x, y, angle) { 
 
	// save the current co-ordinate system 
	// before we screw with it
	ctx.save(); 
 
	// move to the middle of where we want to draw our image
	ctx.translate(x, y);
 
	// rotate around that point, converting our 
	// angle from degrees to radians 
	ctx.rotate(angle * TO_RADIANS);
 
	// draw it up and to the left by half the width
	// and height of the image 
	ctx.drawImage(image, -(image.width/2), -(image.height/2));
 
	// and restore the co-ords to how they were when we began
	ctx.restore(); 
}