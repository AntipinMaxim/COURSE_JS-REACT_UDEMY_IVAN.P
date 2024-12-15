function modal() {
    // Modal
    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          timerModal = setTimeout(showModal, 50000);

    function showModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');

        document.body.style.overflow = 'hidden';

        clearTimeout(timerModal);
        window.removeEventListener('scroll', showModalByScroll);
    };

    const closeModal = () => {
        modal.classList.add('hide');
        modal.classList.remove('show');

        document.body.style.overflow = '';
    };

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () =>{
            showModal();
        });
    });

    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == ''){
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.classList.contains('show')){
            closeModal();
        }
    });

    function showModalByScroll() {
        if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        } 
    }

    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;