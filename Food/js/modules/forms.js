function forms () {
    // Forms

    const statusMessage = {
        loading: 'img/form/spinner.svg',
        succsess: 'Спасибо скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так'
      }

  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
      bindPostDate(form);
  })
  
  const postData = async (url, data) => {
      const res = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-type': 'application/json'
          },
          body: data
      });

      return await res.json();
  };

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
              console.log(data);
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
      showModal();

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
          closeModal();
      },2000)
  }
}

module.exports = forms;