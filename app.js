const $ = (id) => document.getElementById(id);

const CONFIG = {
  pareja: "Carolina & Germán",
  titulo: "¡Nos casamos!",
  subtitulo: "y queremos compartirlo con vos.",
  fechaEventoISO: "2026-11-21T20:00:00-03:00",
  fechaBonita: "21 de noviembre de 2026",
  heroImage: "assets/hero.jpeg",
  fondos: {
    home: "assets/bg-hero.png",
    civil: "assets/bg-civil.png",
    ceremonia: "assets/bg-ceremonia.png",
    fiesta: "assets/bg-festejo.png",
    zona: "assets/test_fondon.png",
    regalos: "assets/bg-festejo.png",
    rsvp: "assets/bg-civil.png"
  },
  fondosTexto: {
    civil: "assets/bg-civil.png",
    ceremonia: "assets/fondo-card-iglesia.png",
    fiesta: "assets/bg-festejo.png",
    zona: "assets/test_fondon.png",
    regalos: "assets/bg-festejo.png",
    rsvp: "assets/bg-civil.png"
  },
  googleCalendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Casamiento%20C%26G&dates=20261121/20261122",
  eventos: [
    { key:"civil", tipo:"Civil", fecha:"20 de noviembre", hora:"18:00", lugar:"Registro Civil de Palermo", direccion:"Dirección 1234", frase:"ACÁ VA TU FRASE", mapsUrl:"https://maps.google.com/", foto:"assets/civil.jpeg" },
    { key:"ceremonia", tipo:"Ceremonia", fecha:"21 de noviembre", hora:"20:00", lugar:"Parroquia San Isidro Labrador", direccion:"Av. San Isidro Labrador 4630, Núñez, CABA.", frase:"¡Sí! ¡La misma del Eternauta!", mapsUrl:"https://www.google.com/maps/place/Parroquia+San+Isidro+Labrador/data=!4m2!3m1!1s0x0:0x3cbc436e85fd067b?sa=X&ved=1t:2428&ictx=111", foto:"assets/ceremonia.jpeg" },
    { key:"fiesta", tipo:"Fiesta", fecha:"21 de diciembre", hora:"21:30", lugar:"Augusto & Ros Recepciones", direccion:"Cuba 3380, Núñez, CABA.", frase:"A sólo 14 cuadras de la iglesia.", mapsUrl:"https://www.google.com/maps/place/Augusto+y+Ros/data=!4m2!3m1!1s0x0:0xda4ec7287a7daab1?sa=X&ved=1t:2428&ictx=111", foto:"assets/festejo.png" }
  ],
  zona: { titulo:"Dónde estacionar y moverse", intro:"Si venís con tutú, acá van algunos puntos útiles.", imagen:"assets/icon-poi.png" },
  puntosInteres: [
    { nombre:"Hotel 1", url:"https://example.com" },
    { nombre:"Hotel 2", url:"https://example.com" },
    { nombre:"Lugar para pasear", url:"https://example.com" }
  ],
  regalosImage: "assets/regalos.jpeg",
  regalosTexto: "Tu presencia es lo más importante para nosotros. Si además querés hacernos un regalo, acá van las opciones.",
  cuentaBancaria: { banco:"Banco X", titular:"Nombre Apellido", alias:"tu.alias", cbu:"0000000000000000000000" },
  rsvp: { fechaLimite:"20 de noviembre de 2026", formsubmitEmail:"TU_EMAIL_AQUI@ejemplo.com", adultos:"ACÁ VA TU TEXTO SOLO ADULTOS" }
};

function setText(id, text){ const el=$(id); if(el) el.textContent=text; }
function setSrc(id, src){ const el=$(id); if(el && src) el.src=src; }
function setHref(id, href){ const el=$(id); if(el && href) el.href=href; }
function setPageBackground(){
  const page=document.querySelector(".page"); if(!page) return;
  const key=document.body.dataset.page || "home";
  if(CONFIG.fondos[key]) page.style.setProperty("--page-bg", `url("${CONFIG.fondos[key]}")`);
  document.querySelectorAll(".textCard").forEach(card=>{
    if(CONFIG.fondosTexto[key]) card.style.setProperty("--text-bg", `url("${CONFIG.fondosTexto[key]}")`);
  });
  document.querySelectorAll(`.links a[data-nav="${key}"]`).forEach(a=>a.classList.add("active"));
}
function fillCommon(){
  setText("brandText", CONFIG.pareja);
  setText("heroTitle", CONFIG.pareja);
  setText("heroSub", `${CONFIG.titulo} ${CONFIG.subtitulo}`);
  setText("fechaBonita", CONFIG.fechaBonita);
  setHref("btnCalendar", CONFIG.googleCalendarUrl);
  setSrc("heroImg", CONFIG.heroImage);
}
function fillEvent(){
  const key=document.body.dataset.page;
  const ev=CONFIG.eventos.find(e=>e.key===key); if(!ev) return;
  setText("eventTipo", ev.tipo); setText("eventTitulo", ev.lugar); setText("eventFecha", ev.fecha); setText("eventHora", `${ev.hora} hs`);
  setText("eventLugar", ev.lugar); setText("eventDireccion", ev.direccion); setText("eventFrase", ev.frase || ""); setHref("eventMaps", ev.mapsUrl); setSrc("eventImg", ev.foto);
}
function fillZona(){
  setText("zonaTitulo", CONFIG.zona.titulo); setText("zonaIntro", CONFIG.zona.intro); setSrc("zonaImg", CONFIG.zona.imagen);
  const list=$("poiList"); if(list){ list.innerHTML=""; CONFIG.puntosInteres.forEach(p=>{ const li=document.createElement("li"); li.innerHTML=`<a href="${p.url}" target="_blank" rel="noopener">${p.nombre}</a>`; list.appendChild(li); }); }
}
function fillRegalos(){
  setSrc("giftImg", CONFIG.regalosImage); setText("regalosTexto", CONFIG.regalosTexto);
  const c=CONFIG.cuentaBancaria; const box=$("cuentaInfo");
  if(box) box.innerHTML=`<div><strong>Banco:</strong> ${c.banco}</div><div><strong>Titular:</strong> ${c.titular}</div><div><strong>Alias:</strong> ${c.alias}</div><div><strong>CBU:</strong> <span id="cbuText">${c.cbu}</span></div>`;
  const btn=$("btnCopyCbu"); if(btn) btn.addEventListener("click", async()=>{ try{ await navigator.clipboard.writeText(c.cbu); setText("copyStatus","CBU copiado ✅"); setTimeout(()=>setText("copyStatus",""),2000); }catch(e){ setText("copyStatus","No pude copiar automáticamente. Copialo a mano."); } });
}
function setupRsvp(){
  setText("rsvpText", `Esperamos contar con tu presencia. Por favor confirmar antes del ${CONFIG.rsvp.fechaLimite}.`); setText("adultsNote", CONFIG.rsvp.adultos); setText("rsvpDeadline", CONFIG.rsvp.fechaLimite);
  const modal=$("rsvpModal"); const form=$("rsvpForm");
  if(form){ form.action=`https://formsubmit.co/${encodeURIComponent(CONFIG.rsvp.formsubmitEmail)}`; form.addEventListener("submit",()=>setText("rsvpStatus","Enviando…")); }
  const open=()=>modal && modal.showModal(); const close=()=>modal && modal.close();
  ["btnOpenRsvp","btnOpenRsvp2"].forEach(id=>{ const b=$(id); if(b) b.addEventListener("click",open); });
  ["btnCloseRsvp","btnCancelRsvp"].forEach(id=>{ const b=$(id); if(b) b.addEventListener("click",close); });
}
function setupCountdown(){
  if(!$('d')) return; const target=new Date(CONFIG.fechaEventoISO).getTime();
  function tick(){ const diff=Math.max(0,target-Date.now()); const sec=Math.floor(diff/1000); setText('d',Math.floor(sec/86400)); setText('h',Math.floor((sec%86400)/3600)); setText('m',Math.floor((sec%3600)/60)); setText('s',sec%60); }
  tick(); setInterval(tick,1000);
}
setPageBackground(); fillCommon(); fillEvent(); fillZona(); fillRegalos(); setupRsvp(); setupCountdown();
