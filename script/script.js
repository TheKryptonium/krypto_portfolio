import { CV_B64 } from "./cv.js";
function downloadCV(e){
    e&&e.preventDefault();
    const link = document.createElement("a");
    link.href = "data:application/pdf;base64," + CV_B64;
    link.download = "CV_Atangana_Fouda_Valere_Benoit.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

const titles_fr = ["Ingénieur en Génie Électrique","Développeur Full-Stack","Spécialiste IA & ML","Expert Systèmes Embarqués","Consultant Drone & AgriTech","Data Scientist"];

const titles_en = ["Electrical Engineer","Full-Stack Developer","AI & ML Specialist","Embedded Systems Expert","Drone & AgriTech Consultant","Data Scientist"];

let lang="fr",tIdx=0,cIdx=0,del=false;

const tw=document.getElementById("typewriter");
function type(){
    const arr=lang==="fr"?titles_fr:titles_en,cur=arr[tIdx];

    if(!del){tw.textContent=cur.slice(0,cIdx+1);cIdx++;
        if(cIdx===cur.length){
            del=true;
            setTimeout(type,1800);
            return
        }
    }else{
        tw.textContent=cur.slice(0,cIdx-1);cIdx--;
        if(cIdx===0){
            del=false;
            tIdx=(tIdx+1)%arr.length;
        }
    }
    setTimeout(type,del?55:85);
}
type();

function setLang(l,btn){
    lang=l;
    document.querySelectorAll(".lang-btn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll("[data-"+l+"]").forEach(el=>{
        const v=el.getAttribute("data-"+l);
        if(el.tagName==="INPUT"||el.tagName==="TEXTAREA"){el.placeholder=v}
        else if(el.tagName==="BUTTON"){el.textContent=v}
        else{el.innerHTML=v}
    });
    tIdx=0;cIdx=0;del=false;
}

function sendContact(){
    const name=document.getElementById("cname").value.trim(),email=document.getElementById("cemail").value.trim(),sub=document.getElementById("csubject").value.trim(),msg=document.getElementById("cmessage").value.trim(),fb=document.getElementById("form-feedback");
    
    if(!name||!email||!msg){
        fb.style.color="#ff4466";
        fb.textContent=lang==="fr"?"> Veuillez remplir tous les champs.":"> Please fill in all fields.";
        fb.style.display="block";
        return
    }
    
    window.location.href="mailto:lekryptonium@gmail.com?subject="+encodeURIComponent(sub||"Contact Portfolio")+"&body="+encodeURIComponent("De: "+name+"\nEmail: "+email+"\n\n"+msg);
    
    fb.style.color="var(--accent)";
    fb.textContent=lang==="fr"?"> Message prêt — votre client mail va s'ouvrir.":"> Message ready — your mail client will open.";
    fb.style.display="block";
}

const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){
        e.target.querySelectorAll(".skill-fill").forEach(b=>{const w=b.getAttribute("data-w");b.style.width=w+"%"});obs.unobserve(e.target)
    }})},{threshold:0.2});
document.querySelectorAll("#skills").forEach(s=>obs.observe(s));
