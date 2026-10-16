const f=document.getElementById('f'),err=document.getElementById('err');
f.addEventListener('submit',async e=>{e.preventDefault();err.textContent='';const d=Object.fromEntries(new FormData(f));
if(d.site)return; if(!d.prenom?.trim())return err.textContent='Ton prénom, s\'il te plaît.';
if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email||''))return err.textContent='Cet email ne semble pas valide.';
if(!d.consent)return err.textContent='Coche la case pour qu\'on puisse te prévenir.';
const b=f.querySelector('button');b.disabled=true;b.textContent='…';const c=window.BAYAN_CFG||{};
try{ if(c.SUPABASE_URL){const r=await fetch(c.SUPABASE_URL+'/rest/v1/waitlist',{method:'POST',headers:{apikey:c.SUPABASE_ANON_KEY,Authorization:'Bearer '+c.SUPABASE_ANON_KEY,'Content-Type':'application/json',Prefer:'return=minimal'},
 body:JSON.stringify({prenom:d.prenom.trim(),email:d.email.trim().toLowerCase(),tiktok:(d.tiktok||'').replace(/^@/,'').trim()||null,consent:true,source:'tiktok_live'})});
 if(!r.ok&&r.status!==409){const t=await r.text();if(!/duplicate|23505/.test(t))throw 0;}}
 else{console.warn('Mode aperçu : aucun envoi (config vide)');}
 document.getElementById('nm').textContent=d.prenom.trim();f.hidden=true;document.getElementById('ok').hidden=false;
}catch(_){err.textContent='Oups, réessaie dans un instant.';b.disabled=false;b.textContent='Je réserve ma place';}});
// reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
// Ustadh chat
const lines=["Salam 👋 Moi c'est Ustadh.","Je t'aide à mémoriser, à reprendre là où tu t'es arrêté, à ton rythme.","Inscris-toi, je te préviens dès que j'arrive."];
let started=false;const msgs=document.getElementById('msgs'),ty=document.getElementById('typing');
const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function play(){if(started)return;started=true;for(const l of lines){ty.classList.add('on');await wait(900);ty.classList.remove('on');const b=document.createElement('div');b.className='b';msgs.appendChild(b);for(const ch of l){b.textContent+=ch;await wait(22)}await wait(500)}}
new IntersectionObserver(es=>{if(es[0].isIntersecting)play()},{threshold:.4}).observe(document.getElementById('chat'));
if(matchMedia('(prefers-reduced-motion:reduce)').matches||navigator.webdriver){started=true;lines.forEach(l=>{const b=document.createElement('div');b.className='b';b.textContent=l;msgs.appendChild(b)})}
// tilt hero
const h=document.querySelector('.hero-img');addEventListener('pointermove',e=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;h.style.transform=`perspective(900px) rotateY(${x*10}deg) rotateX(${-y*8}deg)`});
// gallery focus scale
const tr=document.getElementById('track');const fx=()=>{const c=tr.getBoundingClientRect().left+tr.clientWidth/2;tr.querySelectorAll('.arch').forEach(a=>{const r=a.getBoundingClientRect(),d=Math.min(1,Math.abs(r.left+r.width/2-c)/r.width);a.style.transform=`scale(${1-d*.08})`;a.style.opacity=1-d*.35})};tr.addEventListener('scroll',fx,{passive:true});fx();
// sticky CTA hide near form
const st=document.getElementById('sticky');new IntersectionObserver(es=>st.classList.toggle('hide',es[0].isIntersecting),{threshold:.05}).observe(document.getElementById('rejoindre'));
