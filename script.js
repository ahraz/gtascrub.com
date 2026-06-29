document.addEventListener('DOMContentLoaded',function(){

  /* Navigation toggle */
  var t=document.querySelector('[data-toggle="nav-links"]');var n=document.getElementById('nav-links');
  if(t&&n){t.addEventListener('click',function(){n.classList.toggle('open');t.setAttribute('aria-expanded',n.classList.contains('open'))});n.querySelectorAll('a').forEach(function(l){l.addEventListener('click',function(){n.classList.remove('open');t.setAttribute('aria-expanded','false')})})}

  /* Cursor glow (desktop only) */
  if(window.matchMedia('(pointer: fine)').matches){var glow=document.createElement('div');glow.className='cursor-glow';document.body.appendChild(glow);document.addEventListener('mousemove',function(e){requestAnimationFrame(function(){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'})})}

  /* Pricing Calculator */
  var calcTotals={home:120,office:150,commercial:200};var bedRate=25,bathRate=20;
  var multi={standard:1,deep:1.4,move:1.6};var curProp='home',curClean='standard',beds=1,baths=1;
  function updateCalc(){
    var base=calcTotals[curProp]||120;var total=(base+(beds*bedRate)+(baths*bathRate))*multi[curClean];
    document.querySelectorAll('#addons input:checked').forEach(function(cb){total+=parseFloat(cb.getAttribute('data-price')||0)});
    var el=document.getElementById('calcTotal');if(el){
      if(typeof window.bumpPrice==='function'){window.bumpPrice(Math.round(total));}else{el.textContent='$'+Math.round(total);}
    }
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

  /* Blog Filter */
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

  /* Contact Form Validation */
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
});