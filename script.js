document.addEventListener('DOMContentLoaded',function(){

/* ── Nav toggle ── */
var t=document.querySelector('[data-toggle="nav-links"]');var n=document.getElementById('nav-links');
if(t&&n){t.addEventListener('click',function(){n.classList.toggle('open');t.setAttribute('aria-expanded',n.classList.contains('open'))});n.querySelectorAll('a').forEach(function(l){l.addEventListener('click',function(){n.classList.remove('open');t.setAttribute('aria-expanded','false')})})}

/* ── Page transitions ── */
document.querySelectorAll('a[href]').forEach(function(link){if(link.hostname===location.hostname&&!link.hasAttribute('target')&&!link.classList.contains('chat-btn')&&link.getAttribute('href')!=='#'){link.addEventListener('click',function(e){if(!e.metaKey&&!e.ctrlKey){e.preventDefault();var href=this.href;document.body.style.opacity='0';document.body.style.transform='translateY(-8px)';document.body.style.transition='opacity 0.25s,transform 0.25s';setTimeout(function(){window.location=href},260)}})}});

/* ── Hero floating particles ── */
var hero=document.querySelector('.hero');if(hero){for(var i=0;i<15;i++){var dot=document.createElement('div');dot.className='hero-particle';dot.style.cssText='position:absolute;width:'+(Math.random()*4+2)+'px;height:'+(Math.random()*4+2)+'px;border-radius:50%;background:rgba(255,255,255,'+(Math.random()*0.3+0.1)+');left:'+(Math.random()*100)+'%;top:'+(Math.random()*100)+'%;animation:float-particle '+(Math.random()*10+8)+'s ease-in-out infinite;animation-delay:'+(Math.random()*-10)+'s;';hero.appendChild(dot)}}
var style=document.createElement('style');style.textContent='@keyframes float-particle{0%,100%{transform:translateY(0px) translateX(0px);opacity:0.4}33%{transform:translateY(-20px) translateX(10px);opacity:0.8}66%{transform:translateY(10px) translateX(-8px);opacity:0.5}}';document.head.appendChild(style);

/* ── Word-reveal headline ── */
var h1=document.querySelector('.hero h1');if(h1){var html=h1.innerHTML.replace(/<em[^>]*>(.*?)<\/em>/g,'<span class="hl">$1</span>');var pts=html.split(/(<[^>]+>)/);var out='';var idx=0;for(var pi=0;pi<pts.length;pi++){var p=pts[pi];if(p[0]=='<'){out+=p}else{var ws=p.split(' ');for(var wi=0;wi<ws.length;wi++){if(ws[wi].trim()){out+='<span class="word-reveal" style="animation-delay:"+((idx++)*0.08+0.3)+"s">"+ws[wi]+"</span> "}else{out+=' '}}}}h1.innerHTML=out.trim()}).join(' ')}

/* ── Cursor glow (desktop only) ── */
if(window.matchMedia('(pointer: fine)').matches){var glow=document.createElement('div');glow.className='cursor-glow';document.body.appendChild(glow);document.addEventListener('mousemove',function(e){requestAnimationFrame(function(){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'})})}

/* ── Scroll-to-top ── */
var stt=document.createElement('button');stt.className='scroll-top';stt.textContent='\u2191';stt.setAttribute('aria-label','Scroll to top');document.body.appendChild(stt);window.addEventListener('scroll',function(){if(window.scrollY>600)stt.classList.add('visible');else stt.classList.remove('visible')},{passive:true});stt.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});

/* ── Stats counter animation ── */
var statsGrid=document.getElementById('statsGrid');
if(statsGrid&&'IntersectionObserver' in window){
  var so=new IntersectionObserver(function(e){
    e.forEach(function(entry){
      if(!entry.isIntersecting)return;
      so.unobserve(statsGrid);
      var vals=statsGrid.querySelectorAll('.stat-value');
      vals.forEach(function(el){
        var raw=el.getAttribute('data-target');if(!raw)return;
        var target=parseFloat(raw);var suffix=el.textContent.replace(/[0-9.,]+/,'');
        var isInt=!raw.includes('.')&&target>1;var duration=2200;var start=performance.now();
        function step(now){var p=Math.min((now-start)/duration,1);var e=1-Math.pow(1-p,3);var v=isInt?Math.floor(e*target):(e*target).toFixed(1);el.textContent=v+suffix;if(p<1)requestAnimationFrame(step);else el.textContent=(isInt?Math.round(target):target.toFixed(1))+suffix}
        requestAnimationFrame(step);
      });
    });
  },{threshold:.3});
  so.observe(statsGrid);
}

/* ── Pricing Calculator ── */
var calcTotals={home:120,office:150,commercial:200};var bedRate=25,bathRate=20;
var multi={standard:1,deep:1.4,move:1.6};var curProp='home',curClean='standard',beds=1,baths=1;
function updateCalc(){
  var base=calcTotals[curProp]||120;var total=(base+(beds*bedRate)+(baths*bathRate))*multi[curClean];
  document.querySelectorAll('#addons input:checked').forEach(function(cb){total+=parseFloat(cb.getAttribute('data-price')||0)});
  var el=document.getElementById('calcTotal');if(el){el.textContent='$'+Math.round(total);el.style.transform='scale(1.15)';setTimeout(function(){el.style.transform='scale(1)'},300)}
}
document.querySelectorAll('#propType .calc-toggle').forEach(function(btn){
  btn.addEventListener('click',function(){
    document.querySelectorAll('#propType .calc-toggle').forEach(function(b){b.classList.remove('active')});
    btn.classList.add('active');curProp=btn.getAttribute('data-value');updateCalc();
  });
});
['cleanType','addons'].forEach(function(id){
  var parent=document.getElementById(id);if(!parent)return;
  parent.addEventListener('change',function(e){
    if(id==='cleanType'){
      document.querySelectorAll('#'+id+' .calc-toggle').forEach(function(b){b.classList.remove('active')});
      if(e.target.classList)e.target.classList.add('active');curClean=e.target.getAttribute('data-value');
    }
    updateCalc();
  });
  if(id==='cleanType'){
    parent.querySelectorAll('.calc-toggle').forEach(function(btn){
      btn.addEventListener('click',function(){
        document.querySelectorAll('#'+id+' .calc-toggle').forEach(function(b){b.classList.remove('active')});
        btn.classList.add('active');curClean=btn.getAttribute('data-value');updateCalc();
      });
    });
  }
});
['bed','bath'].forEach(function(type){
  var minus=document.getElementById(type+'Minus'),plus=document.getElementById(type+'Plus'),count=document.getElementById(type+'Count');
  if(!minus||!plus||!count)return;
  minus.addEventListener('click',function(){var v=parseInt(count.textContent)||1;if(v>1){count.textContent=v-1;if(type==='bed')beds=v-1;else baths=v-1;updateCalc()}});
  plus.addEventListener('click',function(){var v=parseInt(count.textContent)||1;if(v<20){count.textContent=v+1;if(type==='bed')beds=v+1;else baths=v+1;updateCalc()}});
});
updateCalc();

/* ── FAQ Accordion v2 ── */
document.querySelectorAll('.faq-q').forEach(function(q){
  q.addEventListener('click',function(){
    var expanded=this.getAttribute('aria-expanded')==='true';
    document.querySelectorAll('.faq-item').forEach(function(o){o.classList.remove('open');o.querySelector('.faq-q').setAttribute('aria-expanded','false')});
    if(!expanded){this.parentNode.classList.add('open');this.setAttribute('aria-expanded','true')}
  });
});

/* ── Chat Bubble v2 ── */
var chatToggle=document.getElementById('chatToggle'),chatPopup=document.getElementById('chatPopup'),chatClose=document.getElementById('chatClose');
if(chatToggle&&chatPopup){
  chatToggle.addEventListener('click',function(e){e.stopPropagation();chatPopup.classList.toggle('open')});
  if(chatClose)chatClose.addEventListener('click',function(){chatPopup.classList.remove('open')});
  document.addEventListener('click',function(e){if(!chatPopup.contains(e.target)&&e.target!==chatToggle)chatPopup.classList.remove('open')});
}

/* ── Area Checker ── */
var areas=["Toronto","Mississauga","Brampton","Vaughan","Markham","Scarborough","Etobicoke","North York","Richmond Hill","Oakville","Burlington","Ajax","Whitby","Pickering","Mimico","Rexdale","Downsview","Willowdale","Don Mills","York","East York"];
var input=document.getElementById('areaInput'),result=document.getElementById('areaResult'),pills=document.getElementById('areaPills');
if(input&&result&&pills){
  areas.forEach(function(a){var p=document.createElement('span');p.className='area-pill';p.textContent=a;pills.appendChild(p)});
  input.addEventListener('input',function(){
    var v=this.value.trim().toLowerCase();if(!v){result.textContent='';result.className='area-result';return}
    var match=areas.find(function(a){return a.toLowerCase().includes(v)});
    if(match){result.textContent='\u2705 Yes! We serve '+match+' and surrounding areas.';result.className='area-result yes'}
    else{var close=areas.filter(function(a){return a.toLowerCase().slice(0,v.length)===v});if(close.length)result.textContent='\uD83D\uDD0D Did you mean: '+close.slice(0,3).join(', ')+'?';else{result.textContent='\u274C We don\'t currently serve that area.';result.className='area-result no'}}
  });
}

/* ── Testimonial Auto-Scroll Carousel ── */
var track=document.getElementById('testiTrack'),prevBtn=document.getElementById('testiPrev'),nextBtn=document.getElementById('testiNext');
if(track){
  var pos=0;var maxPos=Math.max(0,track.querySelectorAll('.testi-card').length-2);var testiTimer;
  function scrollTesti(){track.style.transform='translateX(-'+(pos*50)+'%)'}
  function autoScroll(){testiTimer=setInterval(function(){pos=pos<maxPos?pos+1:0;scrollTesti()},4000)}
  if(prevBtn)prevBtn.addEventListener('click',function(){pos=Math.max(pos-1,0);scrollTesti();clearInterval(testiTimer);autoScroll()});
  if(nextBtn)nextBtn.addEventListener('click',function(){pos=Math.min(pos+1,maxPos);scrollTesti();clearInterval(testiTimer);autoScroll()});
  track.addEventListener('mouseenter',function(){clearInterval(testiTimer)});
  track.addEventListener('mouseleave',function(){autoScroll()});
  autoScroll();
}

/* ── Blog Filter ── */
var blogFilters=document.getElementById('blogFilters');
if(blogFilters){
  blogFilters.querySelectorAll('.blog-filter').forEach(function(btn){
    btn.addEventListener('click',function(){
      blogFilters.querySelectorAll('.blog-filter').forEach(function(b){b.classList.remove('active')});
      btn.classList.add('active');var filter=btn.getAttribute('data-filter');
      document.querySelectorAll('#blogGrid .blog-card').forEach(function(card){
        if(filter==='all'||card.getAttribute('data-category')===filter){card.style.display='block';card.style.opacity='0';setTimeout(function(){card.style.opacity='1'},50)}
        else card.style.display='none';
      });
    });
  });
}

/* ── Contact Form Validation ── */
var cform=document.getElementById('contactForm');
if(cform){
  ['focus','blur','input'].forEach(function(evt){
    cform.addEventListener(evt,function(e){
      var fg=e.target.closest('.form-group');if(!fg)return;
      if(e.type==='focus')fg.classList.add('focused');
      else if(e.type==='blur'){fg.classList.remove('focused');if(e.target.value.trim())fg.classList.add('filled');else fg.classList.remove('filled')}
      if(e.type==='input'||e.type==='blur'){
        var inp=e.target;if(inp.hasAttribute('required')&&!inp.value.trim()){fg.classList.remove('valid');fg.classList.add('error')}
        else if(inp.type==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value)){fg.classList.remove('valid');if(inp.value.trim())fg.classList.add('error');else fg.classList.remove('error')}
        else{fg.classList.remove('error');if(inp.value.trim())fg.classList.add('valid');else fg.classList.remove('valid')}
      }
    });
  });
  cform.addEventListener('submit',function(e){
    e.preventDefault();var valid=true;
    cform.querySelectorAll('[required]').forEach(function(field){
      if(!field.value.trim()){valid=false;var fg=field.closest('.form-group');if(fg){fg.classList.add('error');fg.classList.remove('valid')}}
      if(field.type==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)){valid=false;var fg2=field.closest('.form-group');if(fg2){fg2.classList.add('error');fg2.classList.remove('valid')}}
    });
    if(valid){
      var btn=document.getElementById('formSubmit');if(btn)btn.classList.add('loading');
      setTimeout(function(){
        var success=document.getElementById('formSuccess');if(success)success.classList.add('show');
        var btn2=document.getElementById('formSubmit');if(btn2){btn2.classList.remove('loading');btn2.style.display='none'}
        cform.querySelectorAll('input,select,textarea').forEach(function(f){f.disabled=true});
      },1500);
    }
  });
}

;