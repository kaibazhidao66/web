// 粒子动画
var particle={
	x:0,
	y:0,
	vx:0,
	vy:0,
	mass:1,
	radius:0,
	friction:1,
	gravity:0,
	mass:1,
	springs:null,

	create:function(x,y,speed,direction,grav){
		var obj=Object.create(this);
		obj.x=x;
		obj.y=y;
		obj.vx=Math.cos(direction)*speed;
		obj.vy=Math.sin(direction)*speed;
		obj.gravity=grav||0;
		obj.springs=[];
		return obj;
	},
	addSpring:function(point,k,length){
		this.removeSpring(point);
		this.springs.push({
			point:point,
			k:k,
			length:length||0,
		});
	},
	removeSpring:function(point){
		for(var i=0;i<this.springs.length;i++){
			if(point===this.springs[i].point){
				this.springs.splice(i,1);
				return;
			}
		}
	},
	getSpeed:function(){
		return Math.sqrt(this.vx*this.vx+this.vy*this.vy);
	},
	setSpeed:function(speed){
		var heading=this.getHeading();
		this.vx=Math.cos(heading)*speed;
		this.vy=Math.sin(heading)*speed;
	},
	getHeading:function(){
		return Math.atan2(this.vy,this.vx);
	},
	setHeading:function(heading){
		var speed=this.getSpeed();
		this.vx=Math.cos(heading)*speed;
		this.vy=Math.sin(heading)*speed;
	},
	accelerate:function(ax,ay){
		this.vx+=ax;
		this.vy+=ay;
	},
	update:function(){
		this.handleSprings();
		this.vy+=this.gravity;
		this.vx*=this.friction,
		this.vy*=this.friction,
		this.x+=this.vx;
		this.y+=this.vy;
	},
	handleSprings:function(){
		for(var i=0;i<this.springs.length;i++){
			var spring=this.springs[i];
			this.springTo(spring.point,spring.k,spring.length);
		}
	},
	angleTo:function(p2){
		return Math.atan2(p2.y-this.y, p2.x-this.x);
	},
	distanceTo:function(p2){
		var dx=p2.x-this.x,
			dy=p2.y-this.y;
		return Math.sqrt(dx*dx+dy*dy);
	},
	gravitateTo:function(p2){
		var dx=p2.x-this.x,
			dy=p2.y-this.y,
			distSQ=dx*dx+dy*dy,
			dist=Math.sqrt(distSQ),
			force=p2.mass/distSQ,
			ax=dx/dist*force,
			ay=dy/dist*force;
		this.vx+=ax;
		this.vy+=ay;
	},
	springTo:function(point,k,length){
		var dx=point.x-this.x,
			dy=point.y-this.y,
			distance=Math.sqrt(dx*dx+dy*dy),
			springForce=(distance-length ||0)*k;
		this.vx+=dx/distance*springForce;
		this.vy+=dy/distance*springForce;
	}
}

var canvas = document.getElementById("canvas"),
context = canvas.getContext("2d"),
width = canvas.width = window.innerWidth,
height = canvas.height = window.innerHeight,
dots = [];

for (var i = 0; i < width / 20; i++) {
var dot = particle.create(Math.random() * (width - width / 20) + width / 20, Math.random() * (height - height / 20) + height / 20, 2, Math.random() * Math.PI * 2);
dot.color = 'hsl(' + (i % 10) * 30 + ',100%,100%)';
dot.size = Math.random() * 3 + 2
dot.setSpeed(dot.size / 8)
dot.friction = 0.1
dots.push(dot)
}
var multiplier = 5;
window.onload = function () {
window.wallpaperRegisterAudioListener(wallpaperAudioListener);
window.wallpaperPropertyListener = {
    applyUserProperties: function (properties) {
	if (properties.multiplier) {
	multiplier = properties.multiplier.value
	}
	if (properties.combo) {
	if (properties.combo.value == 1 && properties.background) {
		var background = properties.background.value.split(' ').map(function (c) {
		  return Math.ceil(c * 255)
		})
		canvas.style.background = 'rgb(' + background + ')'
	} else if (properties.combo.value == 2 && properties.image) {
		canvas.style.background = 'url(file:///img)'.replace('img', properties.image.value)
	}
	} else {
	canvas.style.background = "#08303E"
	}
    }
}
};
var leftRightAverageLowFreq = 0;
function wallpaperAudioListener(audioArray) {
var lowFreqs = audioArray.slice(0, 5).concat(audioArray.slice(64, 64 + 5));
var sum = lowFreqs.reduce((a, b) => a + b, 0);
leftRightAverageLowFreq = sum / lowFreqs.length;
}

update()
var lol = 0

function update() {
lol++
context.clearRect(0, 0, width, height)
for (var i in dots) {
    dots[i].color = 'hsl(' + (i % 5) * 60 + ',100%,a%)'.replace('a', Number(100 - 14 * multiplier * leftRightAverageLowFreq) > 50 ? Number(100 - 14 * multiplier * leftRightAverageLowFreq) : 50)
    dots[i].update()
if (dots[i].x > width || dots[i].x < 0) {
	dots[i].vx *= -1
	dots[i].x = dots[i].x > width ? width : 0
    }
if (dots[i].y > height || dots[i].y < 0) {
	dots[i].vy *= -1
	dots[i].y = dots[i].y > height ? height : 0
    }
    context.beginPath()
    context.fillStyle = dots[i].color
    context.moveTo(dots[i].x, dots[i].y)
    context.arc(dots[i].x, dots[i].y, dots[i].size + 4 * multiplier * leftRightAverageLowFreq < 20 ? dots[i].size + 4 * multiplier * leftRightAverageLowFreq : 20, 0, Math.PI * 2, false);
    dots[i].setSpeed(dots[i].size / 4 + multiplier * 20 * leftRightAverageLowFreq)
    context.fill()
    context.closePath()
for (var j in dots) {
	if (j != i) {
	var dist = dots[i].distanceTo(dots[j])
	if (dist < 150) {
		context.beginPath()
		context.strokeWidth = 3
		context.strokeStyle = "rgba(255,255,255,opacity)".replace("opacity", 1 - dist / 150);
		context.moveTo(dots[i].x, dots[i].y)
		context.lineTo(dots[j].x, dots[j].y)
		context.stroke()
	}
	}
    }
}
requestAnimationFrame(update)
}

window.onresize = function () {
width = canvas.width = window.innerWidth
height = canvas.height = window.innerHeight
dots = []
for (var i = 0; i < width / 20; i++) {
    var dot = particle.create(Math.random() * (width - width / 20) + width / 20, Math.random() * (height - height / 20) + height / 20, 2, Math.random() * Math.PI * 2);
    dot.color = 'hsl(' + (i % 10) * 30 + ',100%,100%)';
    dot.size = Math.random() * 3 + 2
    dot.setSpeed(dot.size / 8)
    dot.friction = 0.1
    dots.push(dot)
}
}