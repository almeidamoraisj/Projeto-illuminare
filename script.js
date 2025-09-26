// Evento para sticky header
window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  if (window.scrollY > 100) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
});

// Menu mobile
const mobileMenuBtn = document.getElementById('mobile-menu');
const nav = document.getElementById('nav');
mobileMenuBtn.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Sections reveal on scroll
const sections = document.querySelectorAll('.section-reveal');
const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < windowHeight - 100) {
      sec.classList.add('visible');
    }
  });
};
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Slider de depoimentos simples
let indexDepo = 0;
const depoimentos = document.querySelectorAll('.slider-depoimentos .depoimento');
const mostraDepo = () => {
  depoimentos.forEach((d, i) => {
    d.style.display = 'none';
  });
  indexDepo++;
  if (indexDepo > depoimentos.length) { indexDepo = 1; }
  depoimentos[indexDepo - 1].style.display = 'block';
};
setInterval(mostraDepo, 5000); // muda a cada 5 segundos

// Formulário de agendamento simulado
document.getElementById('form-agendamento').addEventListener('submit', function(e) {
  e.preventDefault();
  const nome = this.nome.value;
  // poderia validar mais ou enviar via AJAX etc
  document.getElementById('resultado-agendamento').textContent = `Obrigado, ${nome}! Agendamento solicitado com sucesso. Entraremos em contato.`;
  this.reset();
});
