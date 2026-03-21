
// Helpers
const $ = (id) => document.getElementById(id);

/**
 * CONFIG GLOBAL
 * Cambiás TODO acá (textos, fechas, rutas a imágenes, iconos, links, etc.)
 */
const CONFIG = {
  pareja: "Carolina & Germán",
  titulo: "¡Nos casamos!",
  subtitulo: "y queremos compartirlo con vos.",
  fechaEventoISO: "2026-11-21T20:00:00-03:00",
  fechaBonita: "21 de noviembre de 2026",

  // Foto grande del hero (1/5)
  heroImage: "assets/hero.jpg",

  // Botón “Agendar”
  googleCalendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Casamiento%20C%26G&dates=20261121/20261122",


  // Agenda con fotos (3/5) + íconos watermark (transparente)
  eventos: [
    {
      tipo: "Civil",
      fecha: "20 de noviembre",
      hora: "18:00",
      lugar: "Registro Civil de Palermo",
      direccion: "Dirección 1234",
      frase: "ACÁ VA TU FRASE",
      mapsUrl: "https://maps.google.com/",
      foto: "assets/civil.png",
      icono: "assets/icon-civil.png"
    },
    {
      tipo: "Ceremonia",
      fecha: "21 de noviembre",
      hora: "20:00",
      lugar: "Parroquia San Isidro Labrador",
      direccion: "Av. San Isidro Labrador 4630, Núñez, CABA.",
      frase: "¡Sí! ¡La misma del Eternauta!",
      mapsUrl: "https://www.google.com/maps/place/Parroquia+San+Isidro+Labrador/data=!4m2!3m1!1s0x0:0x3cbc436e85fd067b?sa=X&ved=1t:2428&ictx=111",
      foto: "assets/ceremonia.png",
      icono: "assets/icon-ceremonia.png"
    },
    {
      tipo: "Festejo",
      fecha: "21 de diciembre",
      hora: "21:30",
      lugar: "Augusto & Ros Recepciones",
      direccion: "Cuba 3380, Núñez, CABA.",
      frase: "A sólo 14 cuadras de la iglesia.",
      mapsUrl: "https://www.google.com/maps/place/Augusto+y+Ros/data=!4m2!3m1!1s0x0:0xda4ec7287a7daab1?sa=X&ved=1t:2428&ictx=111",
      foto: "assets/festejo.png",
      icono: "assets/icon-festejo.png"
    }
  ],

  // Puntos de interés: icono watermark
  poiBgImage: "assets/test_fondon.png",
  poiIcon: "assets/icon-poi.png",
  puntosInteres: [
    { nombre: "Hotel 1", url: "https://example.com" },
    { nombre: "Hotel 2", url: "https://example.com" },
    { nombre: "Lugar para pasear", url: "https://example.com" }
  ],

  // Regalos con foto (5/5)
  regalosImage: "assets/regalos.png",
  regalosTexto: "Tu presencia es lo más importante para nosotros. Si además querés hacernos un regalo, acá van las opciones.",
  cuentaBancaria: {
    banco: "Banco X",
    titular: "Nombre Apellido",
    alias: "tu.alias",
    cbu: "0000000000000000000000"
  },

  // RSVP (por mail con FormSubmit por ahora)
  rsvp: {
    fechaLimite: "20 de noviembre de 2026",
    formsubmitEmail: "TU_EMAIL_AQUI@ejemplo.com"
  }
};

// Inject texts
$("brandText").textContent = CONFIG.pareja;
$("heroTitle").textContent = CONFIG.pareja;
$("heroSub").textContent = `${CONFIG.titulo} ${CONFIG.subtitulo}`;
$("fechaBonita").textContent = CONFIG.fechaBonita;
$("btnCalendar").href = CONFIG.googleCalendarUrl;

// Inject hero image
$("heroImg").src = CONFIG.heroImage;

// Build events with photos + watermark icons
const grid = $("eventGrid");
grid.innerHTML = "";
CONFIG.eventos.forEach(ev => {
  const el = document.createElement("div");
  el.className = "card";

  el.innerHTML = `
    <div class="eventPhoto">
      <img src="${ev.foto}" alt="Foto ${ev.tipo}">
    </div>

    <div class="cardWatermark">
      <img src="${ev.icono}" alt="Icono ${ev.tipo}">
    </div>

    <div class="pill">${ev.tipo}</div>
    <h3 style="margin:0 0 6px;">${ev.fecha}</h3>
    <div class="muted"><strong>${ev.hora}</strong> hs</div>
    <div style="height:8px;"></div>
    <div>${ev.lugar}</div>
    <div class="muted">${ev.direccion}</div>
    <div style="height:10px;"></div>
    <div class="eventExtra">${ev.frase ?? ""}</div>
    <a class="btn" href="${ev.mapsUrl}" target="_blank" rel="noopener">Cómo llegar</a>
  `;
  grid.appendChild(el);
});

// POIs + fondo + watermark icon
const poiCard = document.querySelector(".poiCard");
poiCard.style.setProperty("--poi-bg-image", `url("${CONFIG.poiBgImage}")`);

$("poiIcon").src = CONFIG.poiIcon;
const poi = $("poiList");
poi.innerHTML = "";
CONFIG.puntosInteres.forEach(p => {
  const li = document.createElement("li");
  li.innerHTML = `<a href="${p.url}" target="_blank" rel="noopener">${p.nombre}</a>`;
  poi.appendChild(li);
});

// Regalos
$("giftImg").src = CONFIG.regalosImage;
$("regalosTexto").textContent = CONFIG.regalosTexto;

const c = CONFIG.cuentaBancaria;
$("cuentaInfo").innerHTML = `
  <div><strong>Banco:</strong> ${c.banco}</div>
  <div><strong>Titular:</strong> ${c.titular}</div>
  <div><strong>Alias:</strong> ${c.alias}</div>
  <div><strong>CBU:</strong> <span id="cbuText">${c.cbu}</span></div>
`;

$("btnCopyCbu").addEventListener("click", async () => {
  try{
    await navigator.clipboard.writeText(c.cbu);
    $("copyStatus").textContent = "CBU copiado ✅";
    setTimeout(()=> $("copyStatus").textContent = "", 2000);
  }catch(e){
    $("copyStatus").textContent = "No pude copiar automáticamente. Copialo a mano.";
  }
});

// RSVP
$("rsvpText").textContent = `Esperamos contar con tu presencia. Por favor confirmar antes del ${CONFIG.rsvp.fechaLimite}.`;
$("adultsNote").textContent = "ACÁ VA TU TEXTO SOLO ADULTOS";
$("rsvpDeadline").textContent = CONFIG.rsvp.fechaLimite;

const modal = $("rsvpModal");
const openModal = () => modal.showModal();
const closeModal = () => modal.close();

$("btnOpenRsvp").addEventListener("click", openModal);
$("btnOpenRsvp2").addEventListener("click", openModal);
$("btnCloseRsvp").addEventListener("click", closeModal);
$("btnCancelRsvp").addEventListener("click", closeModal);

// FormSubmit endpoint
$("rsvpForm").action = `https://formsubmit.co/${encodeURIComponent(CONFIG.rsvp.formsubmitEmail)}`;
$("rsvpForm").addEventListener("submit", () => {
  $("rsvpStatus").textContent = "Enviando…";
});

// Countdown
const target = new Date(CONFIG.fechaEventoISO).getTime();
function tick(){
  const now = Date.now();
  const diff = Math.max(0, target - now);

  const sec = Math.floor(diff / 1000);
  const d = Math.floor(sec / 86400);
  const h = Math.floor((sec % 86400) / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;

  $("d").textContent = d;
  $("h").textContent = h;
  $("m").textContent = m;
  $("s").textContent = s;
}
tick();
setInterval(tick, 1000);

