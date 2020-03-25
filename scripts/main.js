
window.addEventListener('scroll', (e) => {
    const header = document.querySelector('.header');
    header.style.backgroundPositionY = '' + window.pageYOffset/2 + 'px';
});