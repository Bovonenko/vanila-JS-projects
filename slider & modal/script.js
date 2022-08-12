const toggle = document.getElementById('toggle');
const closeBtn = document.getElementById('close');
const openBtn = document.getElementById('open');
const modal = document.getElementById('modal');

// Toggle nav
toggle.addEventListener('click', () => document.body.classList.toggle('show-nav'));


// Show modal
openBtn.addEventListener('click', () => modal.classList.add('show-modal'));

// Hide modal
closeBtn.addEventListener('click', () => modal.classList.remove('show-modal'));

modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-container')) {
        modal.classList.remove('show-modal');
    }
});