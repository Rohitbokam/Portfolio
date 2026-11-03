const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
requestAnimationFrame(()=>requestAnimationFrame(()=>document.body.classList.add('go')));

/* spring: damping ratio z, response (seconds) */
function Spring(z,resp,x0,onTick){const k=Math.pow(2*Math.PI/resp,2),c=2*z*Math.sqrt(k);let x=x0,v=0,t=x0,raf=0,last=0;
 const step=n=>{const dt=Math.min((n-last)/1000,.032);last=n;const a=-k*(x-t)-c*v;v+=a*dt;x+=v*dt;onTick(x);
  if(Math.abs(v)<.05&&Math.abs(x-t)<.1){x=t;onTick(x);raf=0}else raf=requestAnimationFrame(step)};
 return{get x(){return x},set x(n){x=n},get v(){return v},set v(n){v=n},to(n,vel){t=n;if(vel!=null)v=vel;if(RM){x=n;v=0;onTick(x);return}if(!raf){last=performance.now();raf=requestAnimationFrame(step)}},stop(){cancelAnimationFrame(raf);raf=0}}}



const P=[
{t:'Heart Stroke Detection',w:'Dec 2024 – Mar 2025',k:'ML and predictive analytics',d:'Random Forest, SVM, Logistic Regression, KNN and AdaBoost models that predict heart disease and stroke risk, with a preprocessing pipeline and a model comparison report.',g:'Python · Scikit-Learn · Pandas',u:'https://github.com/Rohitbokam/Heart-Stroke-Prediction'},
{t:'Automated Penetration Testing Platform',w:'Mar 2025 – Jul 2025',k:'Cybersecurity and DevSecOps',d:'An end-to-end platform that scans for vulnerabilities, exploits them and writes the report. It plugs into CI/CD pipelines for continuous security checks.',g:'Python · Bash · CI/CD',u:'https://github.com/Rohitbokam/Penetration-testing'},
{t:'Automated Job Application Workflow',w:'Jun 2025 – Sep 2025',k:'Automation and web scraping',d:'A Python and Selenium system that finds jobs, filters them, submits applications and tracks progress. It cut manual effort by over 80%.',g:'Python · Selenium'},
{t:'Startupz',w:'Aug 2022 – Dec 2022',k:'UI/UX design and prototyping',d:'A SaaS platform concept with mentor access, funding discovery, patent filing support and talent matching, delivered as an interactive Figma prototype.',g:'Figma · UI/UX · SaaS'}];
$('#pg').innerHTML=P.map((p,i)=>`<button class="card press rv" data-p="${i}"><span class="tag a">${p.k}</span><h3>${p.t}</h3><p>${p.d.split('. ')[0].replace(/\.$/,'')}.</p><span class="tag">${p.g}</span></button>`).join('');
const C=[['AI Through Visualization','Columbia+','https://badges.plus.columbia.edu/83145fdd-e77b-4022-b9d4-117cbccf0ef5#acc.Xzew8OcE'],['Neo4j Certified Professional','Neo4j','https://graphacademy.neo4j.com/c/f088a375-fa32-4c14-a8c0-8ce0dd8919aa/'],['Cloud Cybersecurity','Google','https://www.credly.com/badges/948bc585-3a43-4388-ace5-16f958abd8e3/linked_in_profile'],['Oracle Foundations Associate','Oracle','https://catalog-education.oracle.com/ords/certview/sharebadge?id=059B313F5DE072A3730229BB818D6AFA9B989C1BCEDA9E37127A4CD04EEA34EE'],['Ethical Hacker','Cisco','https://www.credly.com/badges/6672e8bc-e19a-448d-b251-741f7972d02f/linked_in_profile'],['Data Analytics','AWS','https://www.credly.com/badges/24f98514-422c-4380-ba3d-fbbc370d93e4/linked_in_profile'],['Cybersecurity Compliance','edX','https://courses.edx.org/certificates/84253314b3c44df496e9fcb5a4f10582'],['Essentials in Generative AI','Microsoft / LinkedIn Learning','https://www.linkedin.com/learning/certificates/38e06a8d02b782520b09178496db49b137daf64e8db0010294a788eb1d1198c2'],['AWS Cloud Essentials','AWS','https://www.credly.com/badges/64c0bf04-6379-4a18-bf17-29062b353826/linked_in_profile']];
$('#certs').innerHTML=C.map(c=>`<a class="press" href="${c[2]}" target="_blank" rel="noopener">${c[0]}<small>${c[1]}</small></a>`).join('');
/* reveal on scroll + count-up + active nav */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');
 const n=e.target.querySelector('[data-c]');if(n){const T=+n.dataset.c,sm=n.innerHTML.replace(/^\d+/,''),t0=performance.now();(function f(t){const r=Math.min((t-t0)/1100,1),v=RM?T:Math.round(T*(1-Math.pow(1-r,3)));n.innerHTML=v+sm;if(r<1&&!RM)requestAnimationFrame(f)})(t0)}}else e.target.classList.remove('in')}),{threshold:.2});
addEventListener('scroll',()=>{const t=$('.tl'),r=t.getBoundingClientRect();$('#tp').style.transform=`scaleY(${Math.max(0,Math.min(1,(innerHeight*.6-r.top)/r.height))})`},{passive:true});
let scy=scrollY;
const sub=$('.sub');let wi=0;const spl=t=>t.split(' ').filter(Boolean).map(w=>`<span class="bw" style="--j:${wi++}">${w}</span>`).join(' ');
sub.innerHTML=[...sub.childNodes].map(n=>n.nodeType===1?`<b>${spl(n.textContent)}</b>`:' '+spl(n.textContent)).join(' ');
$$('h2.rv,.sub2.rv').forEach(h=>{const t=h.textContent;h.setAttribute('aria-label',t);let c=0;h.innerHTML=t.split(' ').map(w=>`<span class="wd" aria-hidden="true">${[...w].map(ch=>`<span class="ch" style="--c:${c++}">${ch}</span>`).join('')}</span>`).join(' ')});
const sc=$('#sc');sc.setAttribute('aria-label',sc.textContent);sc.innerHTML=sc.textContent.split(' ').map(w=>`<span class="sw" aria-hidden="true">${w}</span>`).join(' ');const sws=$$('.sw');
const R=['an AI & cybersecurity developer','a security researcher','a full-stack web builder','a machine learning developer'],tyEl=$('#ty');
if(RM)tyEl.textContent=R[0];else{let r=0,c=0,del=false;(function tk(){const w=R[r];c+=del?-1:1;tyEl.textContent=w.slice(0,c);let d=del?35:70;if(!del&&c===w.length){del=true;d=1400}else if(del&&c===0){del=false;r=(r+1)%R.length;d=300}setTimeout(tk,d)})()}
/* scroll-linked scene: everything is a function of scroll position, so it reverses when you scroll back */
const hero=$('.hero'),shp=$$('.shp'),mqs=$$('.mq span'),h2s=$$('h2.rv'),pb=$('#pb');h2s.forEach(h=>{h.style.transition='none';h.style.transformOrigin=h.closest('.contact')?'50% 50%':'0 50%'});
const mod=(a,n)=>((a%n)+n)%n,cl=x=>Math.max(0,Math.min(1,x));
(function loop(){scy+=(scrollY-scy)*(RM?1:.12);const vel=scrollY-scy,sk=Math.max(-14,Math.min(14,vel*.12));const vh=innerHeight,dh=document.documentElement.scrollHeight-vh;pb.style.transform=`scaleX(${dh>0?cl(scy/dh):0})`;
 if(!RM){const t=performance.now()/1000;
 shp.forEach(s=>{const k=+s.dataset.k,y=mod(+s.dataset.b/100*vh-scy*k+250,vh+500)-250;s.style.transform=`translate3d(${+s.dataset.x/100*innerWidth}px,${y}px,0) rotate(${scy*k*.2}deg)`});
 mqs.forEach(m=>{const r=m.parentNode.getBoundingClientRect(),d=+m.dataset.d,off=(r.top-vh/2)*.6*d;m.style.transform=`translateX(${(d>0?-m.offsetWidth*.35:0)+off-scy*.0}px) skewX(${sk}deg)`});
 h2s.forEach(h=>{const r=h.getBoundingClientRect(),p=cl((vh*.92-r.top)/(vh*.35));h.style.opacity=p;h.style.transform=`translateX(${(1-p)*-90}px) scale(${.9+.1*p})`});
 hero.style.transform=`translateY(${scy*.4}px) scale(${1-cl(scy/(vh*1.5))*.12})`;hero.style.opacity=1-cl(scy/(vh*.85));
 {const r=sc.getBoundingClientRect(),pr=cl((vh*.85-r.top)/(r.height+vh*.3));sws.forEach((w,i)=>{w.style.opacity=.14+.86*cl(pr*(sws.length+4)-i)})}
}
 requestAnimationFrame(loop)})();
$$('.card').forEach(c=>c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')}));
$$('.rv').forEach((el,i)=>{el.style.transitionDelay=(i%3)*80+'ms';io.observe(el)});
const links=$$('nav a'),secs=$$('section');
new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(l=>l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'}).observe&&secs.forEach(s=>new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(l=>l.classList.toggle('on',l.getAttribute('href')==='#'+s.id))}),{rootMargin:'-45% 0px -50% 0px'}).observe(s));

/* bottom sheet: spring 0.8 / 0.3, interruptible, 1:1 drag, rubber-band up */
const sh=$('#sheet'),vl=$('#veil');let open=false,dragging=false,H0=()=>sh.offsetHeight*1.1;
const sp=Spring(.8,.3,1e4,y=>{sh.style.transform=`translateY(${y}px)`;const o=Math.max(0,Math.min(1,1-y/(sh.offsetHeight||1)));vl.style.opacity=o;vl.style.pointerEvents=o>.05&&open?'auto':'none'});
sp.x=H0();sh.style.transform=`translateY(${H0()}px)`;
function show(i){const p=P[i];$('#sbody').innerHTML=`<span class="tag a">${p.k}</span><h3>${p.t}</h3><p>${p.d}</p><p><b>${p.w}</b><br>${p.g}</p>${p.u?`<a class="btn press" href="${p.u}" target="_blank" rel="noopener">View on GitHub</a>`:''}`;open=true;sp.to(0)}
function hide(v){open=false;sp.to(H0(),v)}
$$('.card').forEach(c=>c.addEventListener('click',()=>show(+c.dataset.p)));
vl.addEventListener('click',()=>hide());addEventListener('keydown',e=>{if(e.key==='Escape'&&open)hide()});
let sy,sv,st,ly,lt;
sh.addEventListener('pointerdown',e=>{if(e.target.closest('a'))return;dragging=true;sh.setPointerCapture(e.pointerId);sp.stop();sy=e.clientY-sp.x;ly=e.clientY;lt=e.timeStamp;sv=0});
sh.addEventListener('pointermove',e=>{if(!dragging)return;let y=e.clientY-sy;if(y<0){const d=-y;y=-(1-1/(d*.55/300+1))*300}
 sv=(e.clientY-ly)/Math.max(1,e.timeStamp-lt);ly=e.clientY;lt=e.timeStamp;sp.x=y;sh.style.transform=`translateY(${y}px)`;});
const end=()=>{if(!dragging)return;dragging=false;const y=sp.x;if(y>120||sv>.6)hide(sv*1000);else{open=true;sp.to(0,sv*1000)}};
sh.addEventListener('pointerup',end);sh.addEventListener('pointercancel',end);
