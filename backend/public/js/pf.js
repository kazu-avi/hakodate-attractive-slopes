(() => {
    const $header = document.getElementById('header');
    console.log($header);
    const vh = window.innerHeight;

    // スクロール量が100vhを超えた場合に、ヘッダーに背景色をつける
    window.addEventListener('scroll', () => {
        $header.classList.toggle('header-scroll',window.scrollY > vh);
    } )

})();
