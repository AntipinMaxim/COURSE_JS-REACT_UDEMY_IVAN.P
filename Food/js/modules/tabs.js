function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
        //TABS

    const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsWrapper = document.querySelector(tabsParentSelector);

  
    const hideTabs = () => {
        tabsContent.forEach((item, i) => {
          item.classList.add('hide');
          item.classList.remove('show', 'fade');
        });

        tabs.forEach((item) => {
          item.classList.remove(activeClass);
        });
    }
    

    const showTabs = (i = 0) => {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');

      tabs[i].classList.add(activeClass);
    }

    tabsWrapper.addEventListener('click', (event)=> {
      const target = event.target;

        if(target && target.classList.contains(tabsSelector.slice(1))){
            tabs.forEach((item, i) => {
                if(target == item){
                    hideTabs();
                    showTabs(i);
                }   
            });
        }
    });

  hideTabs();
  showTabs();

}

export default tabs;