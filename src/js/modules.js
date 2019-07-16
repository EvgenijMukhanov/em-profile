/* Universal animation function */
let emAnimate = (elem, className, show, removeElem, callback = () => {}) => {
  /* Next Frame Animation */
  let nextFrame = (fn) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        fn();
      })
    })
  };
  /* End - Next Frame Animation */
  let animateEnterStart = className + '-enter-start';
  let animateEnterActive = className + '-enter-active';
  let animateEnterEnd = className + '-enter-end';
  let animateLeaveStart = className + '-leave-start';
  let animateLeaveActive = className + '-leave-active';
  let animateLeaveEnd = className + '-leave-end';
  if (show == true) {
    let handlerShow = () => {
      elem.classList.remove(animateEnterStart);
      elem.classList.remove(animateEnterActive);
      elem.removeEventListener('transitionend', handlerShow);
      callback();
    };
    if (removeElem == true) {elem.style.display = 'block'};
    elem.classList.remove(animateLeaveEnd);
    elem.classList.add(animateEnterStart);
    elem.classList.add(animateEnterActive);
    nextFrame(() => {elem.classList.add(animateEnterEnd)});
    elem.addEventListener('transitionend', handlerShow);
  } else {
    let handlerHide = () => {
      if (removeElem == true) {
        elem.style.display = 'none';
      };
      elem.classList.remove(animateLeaveStart);
      elem.classList.remove(animateLeaveActive);
      elem.removeEventListener('transitionend', handlerHide);
      callback();
    };
    elem.classList.remove(animateEnterEnd);
    elem.classList.add(animateLeaveStart);
    elem.classList.add(animateLeaveActive);
    nextFrame(() => {elem.classList.add(animateLeaveEnd)});
    elem.addEventListener('transitionend', handlerHide);
  }
}
/* End - Universal animation function */
export default emAnimate;