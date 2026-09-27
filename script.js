const cursor = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, {threshold: .12});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const themeBtn = document.getElementById('themeBtn');
const saved = localStorage.getItem('theme');
if (saved === 'dark') document.body.classList.add('dark');
themeBtn.textContent = document.body.classList.contains('dark') ? '☾' : '☼';

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const dark = document.body.classList.contains('dark');
  localStorage.setItem('theme', dark ? 'dark' : 'light');
  themeBtn.textContent = dark ? '☾' : '☼';
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth'});
    }
  });
});
