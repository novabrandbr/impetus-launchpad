/* IMPETUS × SHIPOFFERS — interactions */

// Progress bar
const progressFill = document.getElementById('progressFill');
function updateProgress(){
  const h = document.documentElement;
  const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
  progressFill.style.width = (scrolled * 100) + '%';
}
window.addEventListener('scroll', updateProgress, {passive:true});
updateProgress();

// Reveal on scroll with optional delay
const revealEls = document.querySelectorAll('.reveal, .reveal-line');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const delay = parseInt(e.target.dataset.delay || '0', 10);
      setTimeout(()=> e.target.classList.add('in'), delay);
      io.unobserve(e.target);
    }
  });
}, {threshold:0.15, rootMargin:'0px 0px -60px 0px'});
revealEls.forEach(el=> io.observe(el));

// Counter animation
const counters = document.querySelectorAll('[data-count]');
const counterIO = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(!e.isIntersecting) return;
    const el = e.target;
    const target = parseInt(el.dataset.count,10);
    const dur = 1400;
    const start = performance.now();
    function tick(t){
      const p = Math.min((t-start)/dur, 1);
      const eased = 1 - Math.pow(1-p, 3);
      el.textContent = Math.round(target * eased);
      if(p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    counterIO.unobserve(el);
  });
}, {threshold:0.5});
counters.forEach(c=> counterIO.observe(c));

// Parallax on media cards
const parallaxEls = document.querySelectorAll('.parallax');
function parallaxLoop(){
  const vh = window.innerHeight;
  parallaxEls.forEach(el=>{
    const r = el.getBoundingClientRect();
    const speed = parseFloat(el.dataset.speed || '0.15');
    const offset = (r.top + r.height/2 - vh/2) * speed * -1;
    el.style.transform = `translateY(${offset}px)`;
  });
  requestAnimationFrame(parallaxLoop);
}
if(window.matchMedia('(min-width: 901px)').matches){
  requestAnimationFrame(parallaxLoop);
}

// Subtle cursor glow on opportunity / stat cards
document.querySelectorAll('.opp-card, .stat-card, .exp-card').forEach(card=>{
  card.addEventListener('mousemove', (e)=>{
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left)/r.width)*100;
    const y = ((e.clientY - r.top)/r.height)*100;
    card.style.background = `radial-gradient(400px circle at ${x}% ${y}%, rgba(110,139,255,0.18), rgba(10,16,64,0.45) 50%)`;
  });
  card.addEventListener('mouseleave', ()=>{ card.style.background = ''; });
});
