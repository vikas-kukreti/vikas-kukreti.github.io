window.addEventListener('scroll', (e) => {
    if(window.pageYOffset > window.innerHeight)
        return;
    const header = document.querySelector('.header');
    header.style.backgroundPositionY = '' + window.pageYOffset/2 + 'px';
});
