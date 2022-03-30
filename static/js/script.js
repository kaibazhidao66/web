/* 禁止右键，F12 */
function unmouse(){
	document.oncontextmenu = new Function("return false;");
	document.onkeydown = document.onkeyup = document.onkeypress = function(event) {
		var e = event || window.event || arguments.callee.caller.arguments[0];
		if (e && (e.keyCode == 123 || (e.keyCode == 116 && e.type!='keypress')))
		{
			e.returnValue = false;
			return (false);
		}
	}
}
unmouse()

//控制台输出
var styleTitle1 = `
font-size: 20px;
font-weight: 600;
color: rgb(244,167,89);
`
var styleTitle2 = `
font-size:12px;
color: rgb(244,167,89);
`
var styleContent = `
color: rgb(30,152,255);
`
var title1 = 'YYDS 站点检测'
var title2 = `版权所有`
var content = `
主页:  https://www.xukaiyyds.cn
地址:  https://github.com/kaibazhidao66/web
`
console.log(`%c${title1} %c${title2}
%c${content}`, styleTitle1, styleTitle2, styleContent)