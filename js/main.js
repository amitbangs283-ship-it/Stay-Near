const navToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}
const current = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.main-nav a').forEach(link => {
  if (link.getAttribute('href') === current) link.classList.add('active');
});
const listings = [
 {type:'Shared', name:'Bright shared room in Hill Station', area:'Hill Station', price:'Ask provider', beds:'Shared room', image:'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=85', features:['Shared kitchen','Study-friendly','Confirm availability'], description:'A light-filled room concept for students who prefer shared living.'},
 {type:'Private', name:'Private room near central Freetown', area:'Central Freetown', price:'Ask provider', beds:'Private room', image:'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=85', features:['Private space','Water access to confirm','Confirm monthly costs'], description:'A private-room sample listing. Confirm facilities and total cost with the provider.'},
 {type:'Residence', name:'Student residence near campus', area:'Near campus', price:'Ask provider', beds:'Student residence', image:'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1000&q=85', features:['Study area','Ask about rules','Utilities to confirm'], description:'A residence-style sample listing for students looking for a campus-oriented location.'},
 {type:'Shared', name:'Shared student apartment', area:'Wilkinson Road', price:'Ask provider', beds:'Shared room', image:'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=85', features:['Shared living','Ask about transport','View before paying'], description:'An illustrative shared apartment listing. Details have not been verified.'},
 {type:'Private', name:'Compact furnished room', area:'Lumley', price:'Ask provider', beds:'Private room', image:'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=85', features:['Furnished example','Ask about electricity','Confirm availability'], description:'A sample furnished room concept; contact details are not connected in this demo.'},
 {type:'Residence', name:'Quiet residence-style room', area:'Hill Station', price:'Ask provider', beds:'Student residence', image:'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85', features:['Quiet study setting','Ask about access','Verify terms'], description:'A residence-style example with space to study. Verify all information in person.'}
];
function renderListings() {
 const grid = document.querySelector('#listingResults');
 if (!grid) return;
 const search = (document.querySelector('#searchArea')?.value || '').trim().toLowerCase();
 const type = document.querySelector('#searchType')?.value || 'All';
 const budget = document.querySelector('#searchBudget')?.value || 'Any';
 const filtered = listings.filter(item => (type === 'All' || item.type === type) && (!search || `${item.name} ${item.area} ${item.description}`.toLowerCase().includes(search)));
 const count = document.querySelector('#resultCount');
 if (count) count.textContent = `${filtered.length} sample ${filtered.length === 1 ? 'listing' : 'listings'}`;
 if (!filtered.length) {
   grid.innerHTML = '<div class="empty-state"><h3>No sample listings match yet</h3><p>Try another area or select a different room type.</p></div>';
   return;
 }
 grid.innerHTML = filtered.map(item => `<article class="card listing-card">
   <img class="card-photo" src="${item.image}" alt="Example accommodation interior" loading="lazy">
   <div class="card-body"><span class="tag">${item.type}</span><h3>${item.name}</h3>
   <div class="listing-meta"><span>⌖ ${item.area}</span><span>⌂ ${item.beds}</span></div>
   <p>${item.description}</p><div class="listing-meta">${item.features.map(f=>`<span>• ${f}</span>`).join('')}</div>
   <div class="price">${item.price}</div><p class="disclaimer" style="color:#718585">Illustrative listing · not verified</p>
   <a class="btn small" href="contact.html?topic=Finding%20accommodation">Ask about a room</a></div></article>`).join('');
}
if (document.querySelector('#listingResults')) {
 document.querySelector('#filterButton')?.addEventListener('click', renderListings);
 document.querySelector('#searchArea')?.addEventListener('keydown', e => { if(e.key==='Enter') renderListings(); });
 renderListings();
}
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
 const topic = new URLSearchParams(location.search).get('topic');
 const topicSelect = document.querySelector('#topic');
 if (topic && topicSelect) topicSelect.value = topic;
 contactForm.addEventListener('submit', e => {
   e.preventDefault();
   const message = document.querySelector('#formMessage');
   if (message) message.textContent = 'Thanks! This prototype form is working locally, but it does not send or store your message.';
   contactForm.reset();
 });
}
document.querySelectorAll('[data-search-link]').forEach(link => link.addEventListener('click', () => {
 const term = link.getAttribute('data-search-link');
 sessionStorage.setItem('staynearSearch', term);
}));
if (document.querySelector('#searchArea') && sessionStorage.getItem('staynearSearch')) {
 document.querySelector('#searchArea').value = sessionStorage.getItem('staynearSearch');
 sessionStorage.removeItem('staynearSearch');
 renderListings();
}
