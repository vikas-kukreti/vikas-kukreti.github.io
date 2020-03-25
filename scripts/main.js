window.addEventListener('scroll', (e) => {
    const header = document.querySelector('.header');
    header.style.backgroundPositionY = '' + window.pageYOffset/3 + 'px';
});
