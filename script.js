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

/* ── Showcase section immersive animations ── */
var scrubSection=document.getElementById('scrub-section');

function setShowcaseAnim(el,visible,delay,y,duration,opacityFrom){
  if(!el)return;
  var oF=opacityFrom||0;
  var startY=y||24;
  el.style.opacity=visible?'1':''+oF;
  el.style.transform=visible?'translate3d(0,0,0) scale(1)':'translate3d(0,'+startY+'px,0) scale('+(visible?1:0.96)+')';
  el.style.filter=visible?'blur(0px)':'blur(4px)';
  el.style.transition='opacity '+duration+'ms cubic-bezier(0.16,1,0.3,1) '+delay+'ms, transform '+duration+'ms cubic-bezier(0.16,1,0.3,1) '+delay+'ms, filter '+duration+'ms cubic-bezier(0.16,1,0.3,1) '+delay+'ms';
}

var showcaseAnims=[
  {id:'anim-top',delay:0,y:16,dur:1200},
  {id:'anim-img',delay:200,y:30,dur:1400},
  {id:'anim-caption',delay:400,y:12,dur:1000},
  {id:'anim-services',delay:600,y:20,dur:1200},
  {id:'anim-stats',delay:800,y:16,dur:1000},
  {id:'anim-bottom',delay:1000,y:16,dur:1000},
  {id:'anim-btn',delay:1200,y:12,dur:1000},
];

showcaseAnims.forEach(function(a){setShowcaseAnim(document.getElementById(a.id),false,0,a.y,a.dur)});

function triggerShowcase(){
  showcaseAnims.forEach(function(a){setShowcaseAnim(document.getElementById(a.id),true,a.delay,a.y,a.dur)});
  // Fire counter animation
  setTimeout(triggerPanelCounters,1400);
}

function triggerPanelCounters(){
  var vals=document.querySelectorAll('#anim-stats .panel-stat-value');
  vals.forEach(function(el){
    var raw=el.getAttribute('data-target');
    if(!raw)return;
    var target=parseFloat(raw);
    var suffix=el.textContent.replace(/[0-9.,]+/,'');
    var isInt=!raw.includes('.');
    var duration=1800;
    var start=performance.now();
    function step(now){
      var p=Math.min((now-start)/duration,1);
      var ease=1-Math.pow(1-p,3);
      var val=isInt?Math.floor(ease*target):(ease*target).toFixed(1);
      el.textContent=(isInt?val:val)+suffix;
      if(p<1)requestAnimationFrame(step);
      else el.textContent=(isInt?Math.round(target):target.toFixed(1))+suffix;
    }
    requestAnimationFrame(step);
  });
}

if(scrubSection&&'IntersectionObserver' in window){
  var so=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){triggerShowcase();so.unobserve(scrubSection)}
    })
  },{threshold:0.12});
  so.observe(scrubSection);
  setTimeout(triggerShowcase,500);
}
});
