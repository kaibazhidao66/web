var _hmt = _hmt || [];
(function () {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?6e0626c0821ff3cf84e26ce36ca8c492";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();

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

// 禁止右键
document.addEventListener("contextmenu", function () {
  return false;
});
document.oncontextmenu = function () {
  return false;
};
// 禁止 F12
document.onkeydown = function (event) {
  if (window.event && window.event.keyCode === 123) {
    event.keyCode = 0;
    event.returnValue = false;
    return false;
  }
}
// 控制台输出
if (window.console) {
  var cons = console;
  if (cons) {
      console.log('%c欢迎来到本站 代码开源 请勿滥用',
      'color:#fff; background: #5e72e4;font-size: 12px;border-radius:5px;padding:3px 10px 3px 10px;');
      console.log('%c本站基于鱼皮大佬的编程导航搭建',
      'color:#fff; background: #5e72e4;font-size: 12px;border-radius:5px;padding:3px 10px 3px 10px;');
      console.log('%c本站遵守 CC BY-NC-SA 4.0 协议',
      'font-size: 12px;border-radius:5px;padding:3px 10px 3px 10px;border:1px solid #5e72e4;');
  }
}