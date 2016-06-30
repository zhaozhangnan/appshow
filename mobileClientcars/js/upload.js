

var adwoImgUpload = function (adwoPS, isBigObj) {
    var uploader = document.createElement('input');
    uploader.type = 'file';
    uploader.id = 'upload-img';
    uploader.accept = 'image/*';
    var uploaderContainer = document.createElement('div');
    uploaderContainer.appendChild(uploader);
    document.body.appendChild(uploaderContainer);
    uploaderContainer.style.cssText = "width: 100; height: 0;overflow: hidden;";
    this.reader = {};
    this.uploader = uploader;
    this.base64Data = '';
    this.state = 'onprogress';
    this.newAdwoPS = adwoPS;
    this.isBigObj = isBigObj;
    this.init();
}

adwoImgUpload.prototype.init = function (func, obj) {
    var t = this;
    t.uploader.addEventListener("change", function () {
        var file = t.uploader.files[0];
        var mpImg = new MegaPixImage(file);
        var canv = document.createElement('canvas');
        mpImg.render(canv, { maxWidth: bigWidth, maxHeight: bigHeight });
        t.state = "success";
        setTimeout(setImgCallback, 500);
        function setImgCallback() {
            t.newAdwoPS.setImage(canv);
            t.newAdwoPS.setCover();
        }
    });
}

var adwoPhotoShop = function (opts, w, h, isBigObj) {
    this.container;
    this.top = 'common/images/word-top.png';
    this.bottom = 'common/images/word-bottom.png'
    this.options = {
        containerId: '',
        canvasW: 0,
        canvasH: 0
    }
    this.isBigObj = isBigObj;
    this.ctx;
    if (typeof opts !== "object") {
        return;
    }
    if (typeof opts.containerId !== "undefined") {
        this.options.containerId = opts.containerId;
    }
    if (typeof opts.canvasW !== "undefined") {
        this.options.canvasW = opts.canvasW;
    }
    if (typeof opts.canvasH !== "undefined") {
        this.options.canvasH = opts.canvasH;
    }
    var canvasId = 'upload' + Date.parse(new Date());
    var canvas = document.createElement('canvas');
    canvas.width = this.options.canvasW;
    canvas.height = this.options.canvasH;
    if (isBigObj) {
        canvas.id = canvasId + 1;
    } else {
        canvas.id = canvasId + 2;
    }
    document.querySelector('#' + this.options.containerId).appendChild(canvas);
    this.canvas = canvas;
    this.img = {};
    this.coverColor = '';
    this.ctx = canvas.getContext('2d');
    this.completedData = '';
    if (orient == 1) {
        this.orientation = 0;
    } else {
        this.orientation = 0.5;
    }
    this.width = w;
    this.height = h;
}

adwoPhotoShop.prototype.setImage = function (opts) {
    var p = parseInt(window.localStorage.getItem("lw")) / parseInt(window.localStorage.getItem("lh"));
    //alert("w:" + window.localStorage.getItem("lw") + "h:" + window.localStorage.getItem("lh"));
    if (orient == 1) {
        if (p > 1.8) {
            $(".bj").show();
            $(".share5").show();
            $(".guanbi").show();
            $(".content_1").show();
            $(".content_2").hide();
        }
    } else {
        if (p < 0.57) {
            $(".bj").show();
            $(".share5").show();
            $(".guanbi").show();
            $(".content_1").show();
            $(".content_2").hide();
        }
    }
    blnc = false;
    var t = this;
    if (typeof opts !== "undefined") {
        t.img = opts;
    }
    t.ctx.clearRect(0, 0, t.options.canvasW, t.options.canvasH);
    t.ctx.save();
    var y0 = t.img.width;
    var x0 = t.img.height;
    if (x0 == 273) {
        x0 = 365;
    }
    if (orient == 1) {
        switch (t.orientation) {
            case 0.5: t.ctx.rotate(t.orientation * Math.PI);
                t.ctx.translate(0, -t.height);
                t.ctx.drawImage(t.img, 0, 0, y0, x0);
                break;
            case 1: t.ctx.rotate(t.orientation * Math.PI);
                t.ctx.translate(-t.width, -t.height);
                t.ctx.drawImage(t.img, 0, 0, y0, x0);
                break;
            case 1.5: t.ctx.rotate(t.orientation * Math.PI);
                t.ctx.translate(-t.height, 0);
                t.ctx.drawImage(t.img, 0, 0, y0, x0);
                break;
            default: t.ctx.drawImage(t.img, 0, 0, y0, x0);
        }
    } else {
        switch (t.orientation) {
            case 0.5: t.ctx.rotate(t.orientation * Math.PI);
                t.ctx.translate(0, -t.height);
                t.ctx.drawImage(t.img, 0, 365, y0, x0);
                break;
            case 1: t.ctx.rotate(t.orientation * Math.PI);
                t.ctx.translate(-t.width, -t.height);
                t.ctx.drawImage(t.img, 0, 365, y0, x0);
                blnc = true;
                break;
            case 1.5: t.ctx.rotate(t.orientation * Math.PI);
                t.ctx.translate(-t.height, 0);
                if (x0 > 365) x0 = 365;
                t.ctx.drawImage(t.img, 244, 0, y0, x0);
                break;
            default:
                if (x0 > 365) x0 = 365;
                t.ctx.drawImage(t.img, 0, 0, x0, y0);
        }
    }
    t.ctx.restore();
}

adwoPhotoShop.prototype.setCover = function (coverIndex) {
    $(".content_1").hide();
    $(".content_2").show();
    var t = this;
    if (orient != 1) {
        t.canvas.width = 365;
        t.canvas.height = 487;
    }
    t.setImage();
    var coverImg = new Image();
    var w, h;
    var imgurl = '';
    if (orient == 1) {
        switch (type) {
            case 0:
                imgurl = 'images/heng_1.png';
                window.localStorage.setItem("imgtype", 0);
                break;
            case 1:
                imgurl = 'images/heng_2.png';
                window.localStorage.setItem("imgtype", 1);
                break;
            case 2:
                imgurl = 'images/heng_3.png';
                window.localStorage.setItem("imgtype", 2);
                break;
        }
        bigWidth = 487, bigHeight = 365;
    } else {
        switch (type) {
            case 0:
                imgurl = 'images/shu_1.png';
                window.localStorage.setItem("imgtype", 0);
                break;
            case 1:
                imgurl = 'images/shu_2.png';
                window.localStorage.setItem("imgtype", 1);
                break;
            case 2:
                imgurl = 'images/shu_3.png';
                window.localStorage.setItem("imgtype", 2);
                break;
        }
        bigWidth = 365, bigHeight = 487;
    }
    coverImg.src = imgurl;
    w = bigWidth, h = bigHeight;
    $("#" + obj).find(".rotate").show();
    coverImg.onload = function () {
        t.ctx.drawImage(coverImg, 0, 0, w, h);
        newAdwoPS.getData();
        var imgData = newAdwoPS.completedData;
        if (orient == 1) {
            $('#h_small').html('<img src="' + imgData + '" width="100%" />');
        } else {
            $('#s_small').html('<img src="' + imgData + '" width="100%" />');
            if (blnc)
                $(".rahmen_3 img").css({
                    "width": "183",
                    "height": "244",
                });
        }
    }
}

adwoPhotoShop.prototype.rotate = function () {
    var t = this;
    t.orientation = t.orientation == 1.5 ? 0 : t.orientation + 0.5;
    t.setImage();
    setTimeout(function () {
        t.setCover();
    }, 500);
}

adwoPhotoShop.prototype.getData = function () {
    var t = this;
    t.completedData = t.canvas.toDataURL();
    //    t.ctx.clearRect(0,0, t.options.canvasW, t.options.canvasH);
    //    t.setImage();
}

var img = function (imgObj) {
    this.src = '';
    this.size = 0;
    this.width = 0;
    this.height = 0;
    this.newWidth = 0;
    this.newHeight = 0;
    if (typeof imgObj !== "object")
        return;
    if (typeof imgObj.src !== "undefined") {
        this.src = imgObj.src;
    } if (typeof imgObj.size !== "undefined") {
        this.size = imgObj.size;
    } if (typeof imgObj.width !== "undefined") {
        this.width = imgObj.width;
    } if (typeof imgObj.src !== "undefined") {
        this.height = imgObj.height;
    }
}

var orient, blnc, type = 0;
var newAdwoPS, newAdwoPSBig, canClick = true;
var bigWidth, bigHeight, obj, objBig;
 
 $(function () {
     var zx = document.querySelector('#button_1');
     zx.addEventListener('click', function () {
         //上传照片
         if (orient == 1) {
             //smallWidth = 196,smallHeight = 148;
             bigWidth = 487, bigHeight = 365;
             obj = 'h_small';
             objBig = 'h_big';
             //横屏
         } else {
             //smallWidth = 148,smallHeight = 196;
             bigWidth = 487, bigHeight = 730;
             obj = 's_small';
             objBig = 's_big';
             //横屏
         }
         if (canClick) {
             canClick = false;
             newAdwoPS = new adwoPhotoShop({ containerId: objBig, canvasW: bigWidth, canvasH: bigHeight }, bigWidth, bigHeight, true);
         }
         var newAdwoUL = new adwoImgUpload(newAdwoPS, true);
         newAdwoUL.uploader.click();
     });

     $('.rotate').live('click', function () {
         newAdwoPS.rotate();
     });

     $('.guanbi').live('click', function () {
         if (orient == 1) {
             window.location.href = "change.html?heng=0";
         } else {
             window.location.href = "change.html?heng=1";
         }
     });
 });

var shareImgUrl;
function uploadImgToServer(data) {
    $.ajax({
        type: 'POST',
        url: 'http://newcms.mobile1.com.cn/advmessage/advimage/saveImg.action?advid=20072',
        cache: false,
        timeout: 60000,
        dataType: 'json',
        data: { imagebase64: data },
        success: function (d) {
            if (d.success == '1') {
                localStorage.setItem("imageid", d.imageid);
                localStorage.setItem("imageurl", d.imageurl);
                $('.bj').show();
                $('.share3').show();
                // setTimeout(function(){
                //     $('.bj').hide();
                //     $('.share3').hide();
                //     window.location.href = "order.html";
                // }, 3000);
            } else {
                alert('非常抱歉，上传失败。');
            }
        },
        error: function (d) {
            alert('抱歉，由于网络原因上传失败，请检查网络');
        }
    });
}

function createCard() {
    if (newAdwoPS) {
        var imgBase64 = newAdwoPS.completedData;
        uploadImgToServer(imgBase64);
        console.log(imgBase64);
    } else {
        alert("请上传您的精喜瞬间！");
    }
}