function showModal(selectorModal, timerModal) {
    modal = document.querySelector(selectorModal);
    modal.classList.add('show');
    modal.classList.remove('hide');

    document.body.style.overflow = 'hidden';
    if(timerModal){
        clearTimeout(timerModal);
    }
};

const closeModal = (selectorModal) => {
    modal = document.querySelector(selectorModal);
    modal.classList.add('hide');
    modal.classList.remove('show');

    document.body.style.overflow = '';
};

function modal(triggerModal, selectorModal, timerModal) {
    // Modal

    const modalTrigger = document.querySelectorAll(triggerModal),
          modal = document.querySelector(selectorModal);

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () =>{
            showModal(selectorModal, timerModal);
        });
    });

    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == ''){
            closeModal(selectorModal);
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.classList.contains('show')){
            closeModal(selectorModal);
        }
    });

    function showModalByScroll() {
        if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            showModal(selectorModal, timerModal);
            window.removeEventListener('scroll', showModalByScroll);
        } 
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {showModal, closeModal};