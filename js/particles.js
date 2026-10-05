/*=========================================================
    STEPS TO LIFE
    PROFESSIONAL PARTICLE ENGINE
=========================================================*/

const canvas = document.getElementById("particles");

if(canvas){

const ctx = canvas.getContext("2d");

let particles=[];

const mouse={

x:null,
y:null,
radius:120

};

/*==============================
CANVAS SIZE
==============================*/

function resizeCanvas(){

canvas.width=window.innerWidth;

canvas.height=window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize",()=>{

resizeCanvas();

createParticles();

});

/*==============================
MOUSE
==============================*/

window.addEventListener("mousemove",(e)=>{

mouse.x=e.clientX;

mouse.y=e.clientY;

});

window.addEventListener("mouseleave",()=>{

mouse.x=null;

mouse.y=null;

});

/*==============================
PARTICLE CLASS
==============================*/

class Particle{

constructor(){

this.reset();

this.y=Math.random()*canvas.height;

}

reset(){

this.x=Math.random()*canvas.width;

this.y=Math.random()*canvas.height;

this.size=Math.random()*2+0.4;

this.speedX=(Math.random()-0.5)*0.15;

this.speedY=(Math.random()-0.5)*0.15;

this.opacity=Math.random()*0.8+0.2;

this.direction=Math.random()>0.5?1:-1;

}

draw(){

ctx.beginPath();

ctx.arc(this.x,this.y,this.size,0,Math.PI*2);

ctx.fillStyle=`rgba(255,255,255,${this.opacity})`;

ctx.fill();

}

update(){

this.x+=this.speedX;

this.y+=this.speedY;

if(this.x<0||this.x>canvas.width||

this.y<0||this.y>canvas.height){

this.reset();

}

this.opacity+=0.002*this.direction;

if(this.opacity>=1){

this.direction=-1;

}

if(this.opacity<=0.2){

this.direction=1;

}

/* Mouse interaction */

if(mouse.x!==null){

const dx=this.x-mouse.x;

const dy=this.y-mouse.y;

const distance=Math.sqrt(dx*dx+dy*dy);

if(distance<mouse.radius){

this.x+=dx*0.01;

this.y+=dy*0.01;

}

}

this.draw();

}

}

/*==============================
CREATE PARTICLES
==============================*/

function createParticles(){

particles=[];

const amount=Math.min(

Math.floor((canvas.width*canvas.height)/9000),

350

);

for(let i=0;i<amount;i++){

particles.push(new Particle());

}

}

createParticles();
/*=========================================================
    PART 2
    CONNECTIONS • ANIMATION • PERFORMANCE
=========================================================*/

/*==============================
DRAW CONNECTIONS
==============================*/

function connectParticles(){

    for(let a=0;a<particles.length;a++){

        for(let b=a;b<particles.length;b++){

            const dx=particles[a].x-particles[b].x;
            const dy=particles[a].y-particles[b].y;

            const distance=Math.sqrt(dx*dx+dy*dy);

            if(distance<120){

                ctx.beginPath();

                ctx.strokeStyle=
                `rgba(255,255,255,${0.12-(distance/1200)})`;

                ctx.lineWidth=1;

                ctx.moveTo(
                    particles[a].x,
                    particles[a].y
                );

                ctx.lineTo(
                    particles[b].x,
                    particles[b].y
                );

                ctx.stroke();

            }

        }

    }

}

/*==============================
ANIMATION LOOP
==============================*/

function animate(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(p=>{

        p.update();

    });

    connectParticles();

    requestAnimationFrame(animate);

}

animate();

/*==============================
CLICK EFFECT
==============================*/

window.addEventListener("click",(e)=>{

    for(let i=0;i<15;i++){

        const star=new Particle();

        star.x=e.clientX;

        star.y=e.clientY;

        star.size=Math.random()*3+1;

        star.speedX=(Math.random()-0.5)*5;

        star.speedY=(Math.random()-0.5)*5;

        particles.push(star);

    }

});

/*==============================
LIMIT PARTICLE COUNT
==============================*/

setInterval(()=>{

    if(particles.length>350){

        particles.splice(350);

    }

},1000);

/*==============================
TAB OPTIMIZATION
==============================*/

document.addEventListener("visibilitychange",()=>{

    if(document.hidden){

        cancelAnimationFrame(animate);

    }else{

        animate();

    }

});
}

/*=========================================================
END OF PARTICLES.JS
=========================================================*/