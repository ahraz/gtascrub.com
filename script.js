document.addEventListener('DOMContentLoaded',function(){
/* ── Nav toggle ── */
var t=document.querySelector('[data-toggle="nav-links"]');var n=document.getElementById('nav-links');
if(t&&n){t.addEventListener('click',function(){n.classList.toggle('open');t.setAttribute('aria-expanded',n.classList.contains('open'))});n.querySelectorAll('a').forEach(function(l){l.addEventListener('click',function(){n.classList.remove('open');t.setAttribute('aria-expanded','false')})})}

/* ── Scroll Observer for .reveal ── */
var r=document.querySelectorAll('.reveal,.reveal-stagger-children,.counter-row,.marquee-wrap');
if(r.length&&'IntersectionObserver' in window){
  var o=new IntersectionObserver(function(e){
    e.forEach(function(e){
      if(e.isIntersecting){e.target.classList.add('visible');o.unobserve(e.target)}
    })
  },{threshold:.12});
  r.forEach(function(e){o.observe(e)})
}

/* ── FAQ accordion ── */
var f=document.querySelectorAll('.faq-q');
f.forEach(function(b){b.addEventListener('click',function(){
  var e=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',!e);
  var a=b.nextElementSibling;while(a&&!a.classList.contains('faq-a')){a=a.nextElementSibling}
  if(a)a.classList.toggle('open')
})});

/* ── Counter animation ── */
var counters=document.querySelectorAll('.counter-row');
if(counters.length){
  var co=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(!entry.isIntersecting)return;
      var row=entry.target;co.unobserve(row);
      var nums=row.querySelectorAll('.counter-value');
      nums.forEach(function(el){
        var raw=el.getAttribute('data-target')||el.textContent.replace(/[^0-9.]/g,'');
        if(!raw)return;
        var target=parseFloat(raw);
        var suffix=el.textContent.replace(/[0-9.,]+/,'');
        var isInt=!raw.includes('.');
        var duration=1800;var start=performance.now();
        function step(now){
          var p=Math.min((now-start)/duration,1);
          var ease=1-Math.pow(1-p,3);
          var val=isInt?Math.floor(ease*target):ease*target;
          el.textContent=(isInt?val:val.toFixed(1))+suffix;
          if(p<1)requestAnimationFrame(step);
          else{el.textContent=(isInt?Math.round(target):target.toFixed(1))+suffix;el.style.opacity='1'}
        }
        el.style.opacity='0.4';requestAnimationFrame(step);
      });
    });
  },{threshold:.3});
  counters.forEach(function(el){co.observe(el)});
}

/* ── Nav scroll effect ── */
var nav=document.querySelector('.nav');if(nav){
  var ns=function(){nav.classList.toggle('nav-scrolled',window.scrollY>60)};
  window.addEventListener('scroll',ns,{passive:true});ns();
}

/* ── Marquee hover pause ── */
var mw=document.querySelector('.marquee-wrap');
if(mw){mw.addEventListener('mouseenter',function(){this.classList.add('paused')});
mw.addEventListener('mouseleave',function(){this.classList.remove('paused')})}
});
