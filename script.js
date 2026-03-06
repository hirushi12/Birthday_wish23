let birthdayName="";
const countdownEl=document.getElementById("countdown");

// Get Name
document.addEventListener("DOMContentLoaded",()=>{
    const params=new URLSearchParams(window.location.search);
    birthdayName=params.get("name") || "Buddhi Akka";

    startCountdown();
    initFireworks();
});

/* 🎥 Netflix Countdown */
function startCountdown(){
    let count=3;
    const interval=setInterval(()=>{
        count--;
        if(count>0){
            countdownEl.textContent=count;
        }else{
            clearInterval(interval);
            countdownEl.style.display="none";
            document.getElementById("startSection").classList.remove("hidden");
        }
    },1000);
}

/* 🎉 Start Celebration */
function startCelebration(){
    document.getElementById("startSection").classList.add("hidden");
    document.getElementById("celebrationSection").classList.remove("hidden");

    document.getElementById("music").play().catch(()=>{});
    typeEffect();
    startFireworks();
    createSparkles();
    createBalloons();
    createConfetti();
}

/* Typing */
function typeEffect(){
    const text=`Happy Birthday, ${birthdayName}! 👑`;
    const display=document.getElementById("birthdayText");
    let i=0;
    display.innerHTML="";
    const typing=setInterval(()=>{
        if(i<text.length){
            display.innerHTML+=text.charAt(i);
            i++;
        }else clearInterval(typing);
    },80);
}

/* 🌌 Galaxy Fireworks */
let canvas=document.getElementById("fireworks");
let ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let particles=[];

function initFireworks(){
    window.addEventListener("resize",()=>{
        canvas.width=window.innerWidth;
        canvas.height=window.innerHeight;
    });
}

function startFireworks(){
    setInterval(()=>{
        for(let i=0;i<50;i++){
            particles.push({
                x:Math.random()*canvas.width,
                y:canvas.height/2,
                vx:(Math.random()-0.5)*6,
                vy:(Math.random()-0.5)*6,
                life:100
            });
        }
    },800);
    animate();
}

function animate(){
    ctx.fillStyle="rgba(0,0,0,0.2)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    particles.forEach((p,index)=>{
        p.x+=p.vx;
        p.y+=p.vy;
        p.life--;
        ctx.beginPath();
        ctx.arc(p.x,p.y,2,0,Math.PI*2);
        ctx.fillStyle=`hsl(${Math.random()*360},100%,50%)`;
        ctx.fill();
        if(p.life<=0) particles.splice(index,1);
    });

    requestAnimationFrame(animate);
}

/* 💎 Sparkles */
function createSparkles(){
    for(let i=0;i<40;i++){
        let s=document.createElement("div");
        s.className="sparkle";
        s.style.left=Math.random()*100+"vw";
        s.style.bottom="0";
        s.style.animationDuration=(Math.random()*2+2)+"s";
        document.body.appendChild(s);
    }
}
/* 🎈 Balloons */
function createBalloons(){
    const colors=["red","blue","yellow","pink","purple","orange"];

    setInterval(()=>{
        let balloon=document.createElement("div");
        balloon.className="balloon";

        balloon.style.left=Math.random()*100+"vw";
        balloon.style.background=colors[Math.floor(Math.random()*colors.length)];
        balloon.style.animationDuration=(Math.random()*5+5)+"s";

        document.body.appendChild(balloon);

        setTimeout(()=>balloon.remove(),10000);

    },500);
}

/* 🎊 Confetti */
function createConfetti(){
    const colors=["red","yellow","blue","green","pink","gold"];

    setInterval(()=>{
        let conf=document.createElement("div");
        conf.className="confetti";

        conf.style.left=Math.random()*100+"vw";
        conf.style.background=colors[Math.floor(Math.random()*colors.length)];
        conf.style.animationDuration=(Math.random()*3+3)+"s";

        document.body.appendChild(conf);

        setTimeout(()=>conf.remove(),6000);

    },150);

}
