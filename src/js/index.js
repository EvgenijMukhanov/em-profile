"use strict"
import emAnimate from './modules.js';

window.onload = () => {

  let handleLogoAnimate = () => {
    let wordElems = [...document.querySelectorAll('.char')];
    wordElems.map((item, i) => {
      let animElem = () => {
        emAnimate(item, 'char', true, false)
      }
      let timeStep = (i * 90);
      setTimeout(animElem, timeStep);
    });
  };

  let handleMenuChange = (e) => {
    let changeMenu = () => {
      let menuItems = [...document.querySelectorAll('.headerMenu-itemLink')];
      let activeMenu;

      for (let menuItem of menuItems) {
        if (menuItem.dataset.active === 'active') {
          activeMenu = menuItem.dataset.name;
        }
      };
      let newMenu = e.target.dataset.name;
      for (let menuItem of menuItems) {
        if (menuItem.dataset.name === activeMenu) {
          for (let menuItem of menuItems) {
            if (menuItem.dataset.name === activeMenu) {
              menuItem.classList.remove('headerMenu-itemLink__active')
            }
          };
          menuItem.dataset.active = 'disabled';
          e.target.classList.add('headerMenu-itemLink__active');
        }
      };
      return {activeMenu, newMenu}
    };

    let getSection = (sections, activeMenu, newMenu) => {
      let activeSection;
      let newSection;
      for (let section of sections) {
        if (section.classList.contains(activeMenu)) {
          activeSection = section;
        }
        if (section.classList.contains(newMenu)) {
          newSection = section;
        }
      };
      return {activeSection, newSection}
    };

    let hideSection = (section) => {
      section.classList.remove('section__show');
    };

    let showSection = (section) => {
      section.classList.add('section__show');
      e.target.dataset.active = 'active';
    };

    e.preventDefault();
    let sections = [...document.querySelectorAll('section')];
    let { activeMenu, newMenu } = changeMenu();
    let { activeSection, newSection } = getSection(sections, activeMenu, newMenu);
    let hideContents = [...activeSection.querySelectorAll('.content')];
    let hideBodys = [...activeSection.querySelectorAll('.content-body')];
    let showContents = [...newSection.querySelectorAll('.content')];
    let showBodys = [...newSection.querySelectorAll('.content-body')];

    let show = () => {
      hideSection(activeSection);
      showSection(newSection);
      showContents.map((item) => {
        item.classList.remove('content__hide');
        item.classList.add('content__show');
      });
      showBodys.map((item) => {
        item.classList.remove('content-body__hide');
        item.classList.add('content-body__show');
      });
    };

    hideContents.map((item) => {
      item.classList.remove('content__show');
      item.classList.add('content__hide');
    });
    hideBodys.map((item) => {
      item.classList.remove('content-body__show');
      item.classList.add('content-body__hide');
    });
    let menuMobile = document.querySelector('.headerMenu-wrap-mobile');
    menuMobile.classList.remove('headerMenu-wrap-mobile__active');
    let burger = document.querySelector('.burger');
    burger.classList.remove('burger__active');
    setTimeout(show, 800);
  };

  let portfolioSelect = () => {
    let showed;
    let handleShowPortfolioItem = (e) => {
      showed = e.target.querySelector('.portfolioInfo');
      showed.classList.add('portfolioInfo__show');
    };
    let handleHidePortfolioItem = (e) => {
      showed.classList.remove('portfolioInfo__show');
    };
    let handleOnFocus = (e) => {
      let handleOnBlurButtons = (e) => {
        if (e.relatedTarget === null) {
          handleHidePortfolioItem();
        } else if (!e.relatedTarget.classList.contains('portfolioInfo-button')) {
          handleHidePortfolioItem();
        };
      };
      let buttons = [...e.target.querySelectorAll('.portfolioInfo-button')];
      buttons.map((item) => {
        item.addEventListener('blur', handleOnBlurButtons);
      });
      handleShowPortfolioItem(e);
    };

    let portfolioItems = [...document.querySelectorAll('.contentWrap-link')];
    portfolioItems.map((item) => {
      item.addEventListener('mouseenter', handleShowPortfolioItem);
      item.addEventListener('focus', handleOnFocus);
      item.addEventListener('mouseleave', handleHidePortfolioItem);
    });
  };

  let handleMobileMenu = (e) => {
    e.preventDefault();
    let menuMobile = document.querySelector('.headerMenu-wrap-mobile');    
    let burger = document.querySelector('.burger');
    if (burger.classList.contains('burger__active')) {
      burger.classList.remove('burger__active');
      menuMobile.classList.remove('headerMenu-wrap-mobile__active');
    } else {
      burger.classList.add('burger__active');
      menuMobile.classList.add('headerMenu-wrap-mobile__active');
    }
  };

  let handleResize = (e) => {
    let menuWrap = document.querySelector('.headerMenu-wrap-mobile');
    if (e.target.innerWidth <= 800) {
      if (menuWrap.style.transition !== 'transform 0.5s ease') {
        menuWrap.style.transition = 'transform 0.5s ease';
      }      
    } else {
      if (menuWrap.style.transition !== '') {
        menuWrap.style.transition = '';
      }      
    };
  }

  handleLogoAnimate();
  portfolioSelect();

  let menuItems = [...document.querySelectorAll('.headerMenu-itemLink')];
  for (let menuItem of menuItems) {
    menuItem.addEventListener('click', handleMenuChange)
  }

  let content = [...document.querySelectorAll('.about .content')];
  let body = [...document.querySelectorAll('.about .content-body')];
  content.map((item) => {
    item.classList.add('content__show');
  })
  body.map((item) => {
    item.classList.add('content-body__show');
  })

  let burger = document.querySelector('.burgerWrap');
  burger.addEventListener('click', handleMobileMenu);

  window.addEventListener('resize', handleResize);
  if (window.innerWidth <= 800) {
    let menuWrap = document.querySelector('.headerMenu-wrap-mobile');
    menuWrap.style.transition = 'transform 0.5s ease';
  };
};


