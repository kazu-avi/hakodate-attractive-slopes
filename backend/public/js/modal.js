(() => {
    const $body = document.body;
    const $modal = document.getElementById('modal');
    const $openBtn = document.getElementById('js-open-btn');
    const $closeBtn = document.getElementById('js-close-btn');
    console.log($openBtn);
    console.log($closeBtn);


    $openBtn.addEventListener('click', (event) => {
        event.preventDefault();
        $modal.classList.remove('modal-close');
        // 2重スクロールを防止するため、bodyに付与
        $body.style.overflow = 'hidden';
    })

    $closeBtn.addEventListener('click', (event) => {
        event.preventDefault();
        $modal.classList.add('modal-close');
        $body.style.overflow = 'visible';
    })
})();
