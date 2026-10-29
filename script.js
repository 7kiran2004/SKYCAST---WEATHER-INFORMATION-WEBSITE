const $=s=>document.querySelector(s);
const pages=[['index','Home'],['forecast','Compare Cities'],['articles','Articles'],['about','About']];
const cur=location.pathname.split('/').pop().replace('.html','')||'index';
document.body.insertAdjacentHTML('afterbegin',`<div class="sky"><span class="cloud c1">☁️</span><span class="cloud c2">☁️</span><span class="cloud c3">⛅</span><span class="sun">☀️</span></div><header><a class="logo" href="index.html"><span class="spin">☀️</span> SkyCast</a><nav>${pages.map(p=>`<a href="${p[0]}.html" class="${p[0]==cur?'on':''}">${p[1]}</a>`).join('')}</nav></header>`);
document.body.insertAdjacentHTML('beforeend','<footer>© 2026 SkyCast · MCA Web Programming Mini Project · Data: Open-Meteo.com</footer>');
const wx=c=>c==0?['☀️','Clear sky']:c<3?['⛅','Partly cloudy']:c==3?['☁️','Overcast']:c<50?['🌫️','Foggy']:c<68?['🌧️','Rain']:c<78?['❄️','Snow']:c<83?['🌦️','Showers']:['⛈️','Thunderstorm'];
let unit=localStorage.getItem('u')||'C';
const T=t=>(unit=='C'?Math.round(t):Math.round(t*9/5+32))+'°'+unit;
const api=(lat,lon)=>fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`).then(r=>r.json());
const geo=q=>fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=1`).then(r=>r.json()).then(d=>{if(!d.results)throw 0;return d.results[0]});
let last=null;
function show(name,d){last=[name,d];const c=d.current,[e,t]=wx(c.weather_code);
$('#now').innerHTML=`<div class="card hero"><h2>${name}</h2><span class="big">${e}</span><div class="temp">${T(c.temperature_2m)}</div><p>${t} · Feels like ${T(c.apparent_temperature)}</p></div>
<div class="grid" style="margin-top:16px"><div class="card">💧 Humidity<h2>${c.relative_humidity_2m}%</h2></div><div class="card">🌬️ Wind<h2>${c.wind_speed_10m} km/h</h2></div><div class="card">🔺 High<h2>${T(d.daily.temperature_2m_max[0])}</h2></div><div class="card">🔻 Low<h2>${T(d.daily.temperature_2m_min[0])}</h2></div></div>`;
$('#week').innerHTML=d.daily.time.map((x,i)=>`<div class="card day"><b>${new Date(x).toLocaleDateString('en',{weekday:'short',day:'numeric'})}</b><span class="e">${wx(d.daily.weather_code[i])[0]}</span>${T(d.daily.temperature_2m_max[i])} / ${T(d.daily.temperature_2m_min[i])}</div>`).join('');}
async function load(q){const m=$('#err');m.textContent='Loading...';try{const g=await geo(q);show(g.name+', '+(g.country||''),await api(g.latitude,g.longitude));m.textContent='';localStorage.setItem('city',q)}catch{m.textContent='City not found or network error.'}}
function setUnit(u){unit=u;localStorage.setItem('u',u);document.querySelectorAll('.u').forEach(b=>b.classList.toggle('on',b.dataset.u==u));if(last)show(...last);if(window.cities)cities()}
document.querySelectorAll('.u').forEach(b=>{b.onclick=()=>setUnit(b.dataset.u);b.classList.toggle('on',b.dataset.u==unit)});
if($('#search')){$('#search').onsubmit=e=>{e.preventDefault();load($('#q').value)};
$('#loc').onclick=()=>navigator.geolocation.getCurrentPosition(async p=>show('Your location',await api(p.coords.latitude,p.coords.longitude)),()=>$('#err').textContent='Location permission denied.');
load(localStorage.getItem('city')||'Ludhiana')}
if($('#cities')){const L=[['Ludhiana',30.9,75.85],['Delhi',28.61,77.21],['Mumbai',19.08,72.88],['London',51.51,-.13],['New York',40.71,-74.01],['Tokyo',35.68,139.69]];
window.cities=async()=>{const r=await Promise.all(L.map(c=>api(c[1],c[2])));let h=r.map((d,i)=>({n:L[i][0],t:d.current.temperature_2m,w:wx(d.current.weather_code)}));
const s=$('#sort').value;h.sort((a,b)=>s=='hot'?b.t-a.t:s=='cold'?a.t-b.t:a.n.localeCompare(b.n));
$('#cities').innerHTML=h.map(c=>`<div class="card day"><h3>${c.n}</h3><span class="e">${c.w[0]}</span><div class="temp" style="font-size:2.2rem">${T(c.t)}</div>${c.w[1]}</div>`).join('')};
$('#sort').onchange=cities;cities()}
document.querySelectorAll('.f').forEach(b=>b.onclick=()=>{document.querySelectorAll('.f').forEach(x=>x.classList.remove('on'));b.classList.add('on');document.querySelectorAll('.art').forEach(a=>a.style.display=b.dataset.t=='all'||a.dataset.t==b.dataset.t?'block':'none')});
if($('#contact'))$('#contact').onsubmit=e=>{e.preventDefault();const n=$('#nm').value.trim(),m=$('#em').value;if(n.length<3||!/^\S+@\S+\.\S+$/.test(m)||$('#ms').value.length<10){$('#res').textContent='⚠️ Enter a valid name, email and a message of 10+ characters.';return}$('#res').textContent='✅ Thanks '+n+'! Your message was received.';e.target.reset()};
