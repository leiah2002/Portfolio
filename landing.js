/* Basic interactivity:
   - Mobile nav toggle
   - Smooth scrolling for nav anchors
   - Animate skill bars on scroll
   - Open project modal with project details
   - Basic contact form handling (demo)
*/

document.addEventListener('DOMContentLoaded', () => {
  // NAV toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  navToggle && navToggle.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? '' : 'flex';
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const target = document.querySelector(a.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // Skill bars animation when visible
  const skillBars = document.querySelectorAll('.skill-bar');
  const skillObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const bar = entry.target;
        const percent = bar.dataset.percent || 80;
        bar.querySelector('div').style.width = percent + '%';
        obs.unobserve(bar);
      }
    });
  }, {threshold: 0.35});

  skillBars.forEach(b => skillObserver.observe(b));

  // Projects modal
  const modal = document.getElementById('projectModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const closeBtn = modal.querySelector('.modal-close');

  document.querySelectorAll('.project .open-project').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const card = e.currentTarget.closest('.project');
      const img = card.querySelector('img').src;
      const title = card.dataset.title || card.querySelector('h3').innerText;
      const desc = card.dataset.desc || card.querySelector('h3').innerText;
      modalImg.src = img;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modal.setAttribute('aria-hidden','false');
    });
  });

  closeBtn.addEventListener('click', ()=> modal.setAttribute('aria-hidden','true'));
  modal.addEventListener('click', (e)=> {
    if(e.target === modal) modal.setAttribute('aria-hidden','true');
  });

  // Form handling (demo)
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    // tiny validation
    const formData = new FormData(form);
    if(!formData.get('name') || !formData.get('email') || !formData.get('message')){
      formMsg.textContent = 'Please fill all fields.';
      formMsg.style.color = 'crimson';
      return;
    }
    // In production you would send this to your backend or use a service (Formspree, Netlify Forms, email API)
    formMsg.style.color = '';
    formMsg.textContent = 'Thanks! Your message was sent (demo).';
    form.reset();
  });
});
