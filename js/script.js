// 鼠标样式
var CURSOR;
Math.lerp = (a, b, n) => (1 - n) * a + n * b;
const getStyle = (el, attr) => {
    try {
    return window.getComputedStyle ?
        window.getComputedStyle(el)[attr] :
        el.currentStyle[attr];
    } catch (e) {}
    return "";
};
class Cursor {
constructor() {
this.pos = {
curr: null,
prev: null
};
this.pt = [];
this.create();
this.init();
this.render();
}
move(left, top) {
this.cursor.style["left"] = `${left}px`;
this.cursor.style["top"] = `${top}px`;
}
create() {
if (!this.cursor) {
this.cursor = document.createElement("div");
this.cursor.id = "cursor";
this.cursor.classList.add("hidden");
document.body.append(this.cursor);
}
var el = document.getElementsByTagName('*');
for (let i = 0; i < el.length; i++)
if (getStyle(el[i], "cursor") == "pointer")
this.pt.push(el[i].outerHTML);
document.body.appendChild((this.scr = document.createElement("style")));
this.scr.innerHTML =
`* {cursor: url("https://pic.imgdb.cn/item/61cf0e182ab3f51d91f0bcd7.png") 4 4, auto}`;
}
refresh() {
this.scr.remove();
this.cursor.classList.remove("hover");
this.cursor.classList.remove("active");
this.pos = {
curr: null,
prev: null
};
this.pt = [];
this.create();
this.init();
this.render();
}
init() {
document.onmouseover = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.add("hover");
document.onmouseout = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.remove("hover");
document.onmousemove = e => {
(this.pos.curr == null) && this.move(e.clientX - 8, e.clientY - 8);
this.pos.curr = {
x: e.clientX - 8,
y: e.clientY - 8
};
this.cursor.classList.remove("hidden");
};
document.onmouseenter = e => this.cursor.classList.remove("hidden");
document.onmouseleave = e => this.cursor.classList.add("hidden");
document.onmousedown = e => this.cursor.classList.add("active");
document.onmouseup = e => this.cursor.classList.remove("active");
}
render() {
if (this.pos.prev) {
this.pos.prev.x = Math.lerp(this.pos.prev.x, this.pos.curr.x, 0.45);
this.pos.prev.y = Math.lerp(this.pos.prev.y, this.pos.curr.y, 0.45);
this.move(this.pos.prev.x, this.pos.prev.y);
} else {
this.pos.prev = this.pos.curr;
}
requestAnimationFrame(() => this.render());
}
}
(() => {
CURSOR = new Cursor();
// 需要重新获取列表时，使用 CURSOR.refresh()
})();

// 弹窗功能

// 屏蔽右键
// document.oncontextmenu = function () {
//     iziToast.info({
//         timeout: 2000,
//         //icon: 'fad fa-do-not-enter',
//         iconUrl: './img/warn.png',
//         closeOnEscape: 'true',
//         transitionIn: 'bounceInLeft',
//         transitionOut: 'fadeOutRight',
//         displayMode: 'replace',
//         layout: '2',
//         position: 'topRight',
//         backgroundColor: '#909399',
//         // title: '温馨提醒',
//         message: '本站禁止使用右键'
//     });
//     return false;
// }
// 复制提醒
document.body.oncopy = function () {
    iziToast.info({
        timeout: 3000,
        icon: 'fa fa-copy fa-fw',
        closeOnEscape: 'true',
        transitionIn: 'bounceInLeft',
        transitionOut: 'fadeOutRight',
        displayMode: 'replace',
        layout: '2',
        position: 'topRight',
        backgroundColor: '#FFFFFF',
        title: '复制成功',
        message: '请遵守 CC BY-NC-SA 4.0 协议'
    });
}
// 国家纪念日
var myDate = new Date;
var mon = myDate.getMonth() + 1;
var date = myDate.getDate();
var days = ['4.4', '5.12', '7.7', '9.9', '9.18', '12.13'];
for (var day of days) {
    var d = day.split('.');
    if (mon == d[0] && date == d[1]) {
    document.write(
        '<style>html{-webkit-filter:grayscale(100%);-moz-filter:grayscale(100%);-ms-filter:grayscale(100%);-o-filter:grayscale(100%);filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);_filter:none}</style>'
    )
    console.log('今天是纪念日');
    console.log('默哀...');
    }
}

// 相册卡片
window.addEventListener('load', function () {
    setTimeout(lazyLoad, 1000);
});
    function lazyLoad() {
    var card_images = document.querySelectorAll('.card-image');
    card_images.forEach(function (card_image) {
    var image_url = card_image.getAttribute('data-image-full');
    var content_image = card_image.querySelector('img');
    content_image.src = image_url;
    content_image.addEventListener('load', function () {
        card_image.style.backgroundImage = 'url(' + image_url + ')';
        card_image.className = card_image.className + ' is-loaded';
        });
    });
}

// 禁止右键
document.addEventListener("contextmenu", function () {
    return false;
});
document.oncontextmenu = function () {
    return false;
};

// 控制台输出
if (window.console) {
    var cons = console;
    if (cons) {
        console.log('%c欢迎来到本站 代码开源 请勿滥用',
        'color:#fff; background: #5e72e4;font-size: 12px;border-radius:5px;padding:3px 10px 3px 10px;');
        console.log('%c本站基于無名大佬的博客源码搭建',
        'color:#fff; background: #5e72e4;font-size: 12px;border-radius:5px;padding:3px 10px 3px 10px;');
        console.log('%c本站遵守 CC BY-NC-SA 4.0 协议',
        'font-size: 12px;border-radius:5px;padding:3px 10px 3px 10px;border:1px solid #5e72e4;');
    }
}