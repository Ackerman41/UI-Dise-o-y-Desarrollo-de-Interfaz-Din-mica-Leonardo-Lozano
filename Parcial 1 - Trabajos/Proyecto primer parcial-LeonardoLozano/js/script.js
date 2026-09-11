
const menuToggle = document.getElementById('menuToggle');
const dropdownMenu = document.getElementById('dropdownMenu');

menuToggle.addEventListener('click', () => dropdownMenu.classList.toggle('show'));

document.addEventListener('click', (e) => {
  if (!menuToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.classList.remove('show');
  }
});

const layerBg = document.getElementById('layerBg');
const layerMid = document.getElementById('layerMid');
const layerFront = document.getElementById('layerFront');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  layerBg.style.transform = `translateY(${y * 0.3}px)`;
  layerMid.style.transform = `translateY(${y * 0.55}px)`;
  layerFront.style.transform = `translateY(${y * 0.85}px)`;
});

const heroImages = {
  'Kiriko': 'img/kiriko.webp',
  'Reinhardt': 'img/rein.webp',
  'Genji': 'img/genji.webp',
  'D.Va': 'img/OW_Dva.webp',
  'Mercy': 'img/mercy.webp',
  'Tracer': 'img/tracer.webp'
};

const squadList = document.getElementById('squadList');
const heroSelect = document.getElementById('heroSelect');
const btnAdd = document.getElementById('btnAdd');
const btnRemoveLast = document.getElementById('btnRemoveLast');
const itemCountDisplay = document.getElementById('itemCount');
const statusMessageDisplay = document.getElementById('statusMessage');

function updateStatus(msg) {
  itemCountDisplay.textContent = squadList.children.length;
  statusMessageDisplay.textContent = msg;
}

btnAdd.addEventListener('click', () => {
  const name = heroSelect.value;
  const imgSrc = heroImages[name];

  if (squadList.children.length >= 5) {
    squadList.removeChild(squadList.firstElementChild);
  }

  const member = document.createElement('div');
  member.className = 'squad-member';
  member.innerHTML = `
    <img src="${imgSrc}" alt="${name}" class="squad-avatar">
    <span class="squad-name">${name}</span>
  `;

  member.addEventListener('click', () => {
    document.querySelectorAll('.squad-member').forEach(el => el.classList.remove('selected'));
    member.classList.add('selected');
    updateStatus(`Héroe '${name}' seleccionado.`);
  });

  squadList.appendChild(member);
  updateStatus(`Héroe ${name} agregado al escuadrón.`);
});

btnRemoveLast.addEventListener('click', () => {
  if (squadList.lastElementChild) {
    squadList.removeChild(squadList.lastElementChild);
    updateStatus('Se eliminó el último héroe del escuadrón.');
  } else {
    updateStatus('No hay héroes para eliminar.');
  }
});

const payload = document.getElementById('payload');

const payloadAnimation = payload.animate([
  { transform: 'translateX(0px) rotate(0deg)', opacity: 0.8 },
  { transform: 'translateX(350px) rotate(180deg) scale(1.1)', opacity: 1 },
  { transform: 'translateX(700px) rotate(360deg)', opacity: 0.8 }
], {
  duration: 4000,
  iterations: Infinity,
  direction: 'alternate',
  easing: 'ease-in-out'
});

document.getElementById('btnPlay').addEventListener('click', () => payloadAnimation.play());
document.getElementById('btnPause').addEventListener('click', () => payloadAnimation.pause());
document.getElementById('btnReverse').addEventListener('click', () => payloadAnimation.reverse());
document.getElementById('btnCancel').addEventListener('click', () => payloadAnimation.cancel());