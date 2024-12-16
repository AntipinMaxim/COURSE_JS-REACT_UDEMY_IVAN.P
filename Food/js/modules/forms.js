import { showModal, closeModal } from "./modal";
import { postData } from "./services/services";

function forms (formSelector, timerModal) {
    // Forms

    const statusMessage = {
        loading: 'img/form/spinner.svg',
        succsess: 'Спасибо скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так'
      }

  const forms = document.querySelectorAll(formSelector);
  forms.forEach(form => {
      bindPostDate(form);
  })

  function bindPostDate(form){
      form.addEventListener('submit', (e) => {
          e.preventDefault();
          
          const blockMessage = document.createElement('img');
          blockMessage.src = statusMessage.loading;
  
          form.append(blockMessage);

          const formData = new FormData(form);
          const json = JSON.stringify(Object.fromEntries(formData.entries()));
          
          postData('http://localhost:3000/requests', json)
          .then(data => {
              showThanksModal(statusMessage.succsess);
              blockMessage.remove();
          }).catch(()=>{
              showThanksModal(statusMessage.failure);
          }).finally(() => {
              form.reset();
          })
      });
  }

  function showThanksModal(message){
      const modalDialog = document.querySelector('.modal__dialog');
      modalDialog.classList.add('hide');
      showModal('.modal', timerModal);

      const modal = document.createElement('div');
      modal.classList.add('modal__dialog');

      modal.innerHTML = `
          <div class="modal__content">
              <div data-close class="modal__close">&times;</div>
              <div class="modal__title">${message}</div>
          </div>
      `;

      document.querySelector('.modal').append(modal);

      setTimeout(function(){
          modal.remove();
          modalDialog.classList.add('show');
          modalDialog.classList.remove('hide');
          closeModal('.modal');
      },2000)
  }
}

export default forms;
