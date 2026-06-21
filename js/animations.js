// Global scroll-triggered animation system
(function(){
  if('IntersectionObserver' in window){
    var observer=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },{threshold:0.12});
    document.querySelectorAll('[data-animate]').forEach(function(el){observer.observe(el)});
  } else {
    document.querySelectorAll('[data-animate]').forEach(function(el){el.classList.add('is-visible')});
  }
})();
