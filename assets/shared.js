
const DEMO={projects:[{id:1,name:'سقيا الماء',owner:'جمعية البر',start:'2026-01-01',end:'2026-06-30',progress:65,budget:300000,spent:280000,status:'جارٍ',region:'الرياض'}],
speakers:[{id:11,name:'م. أحمد',topic:'الأمن السيبراني',org:'شركة',status:'بانتظار التحقق'}],
solutions:[{code:'S-01',title:'منصة حملات تبرع',for:'غير ربحي',desc:'حملات وربط الدفع وخارطة الأثر.'}],
facilities:[{id:11,provider:'جامعة الملك سعود',name:'قاعة المؤتمرات A',city:'الرياض',capacity:300,status:'متاح'}],
trainers:[{id:21,name:'د. سارة',topic:'تحليل البيانات',mode:'عن بعد',rating:4.8}]};
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
function buildSidebar(active){const isAcc=location.pathname.includes('/accounts/');const rel=isAcc?'..':'.';const side=document.createElement('aside');side.className='sidebar';
side.innerHTML=`<div class="flex items-center gap-3 mb-4"><img src="${rel}/assets/hasseef-logo.svg" width="40" height="40"><div><div class="font-extrabold">منصة حصيف</div><div class="text-xs text-slate-500">بوابة التكامل</div></div></div>
<div class="text-xs text-slate-500 mb-2">الحسابات</div>
<nav id="accountsNav" class="space-y-1">
<a class="sidebar-item" href="${rel}/accounts/gov.html" data-route="gov">الحكومة</a>
<a class="sidebar-item" href="${rel}/accounts/emirate.html" data-route="emirate">الإمارة</a>
<a class="sidebar-item" href="${rel}/accounts/private.html" data-route="private">القطاع الخاص</a>
<a class="sidebar-item" href="${rel}/accounts/nonprofit.html" data-route="nonprofit">غير الربحي</a>
<a class="sidebar-item" href="${rel}/accounts/university.html" data-route="university">الجامعات</a>
<a class="sidebar-item" href="${rel}/accounts/individual.html" data-route="individual">الأفراد</a>
<a class="sidebar-item" href="${rel}/accounts/donor.html" data-route="donor">المانحون</a>
<a class="sidebar-item" href="${rel}/accounts/partners.html" data-route="partners">الشركاء الاستراتيجيون</a></nav>
<div class="text-xs text-slate-500 mt-6 mb-2">روابط عامة</div>
<nav class="space-y-1"><a class="sidebar-item" href="${rel}/index.html">الرئيسية</a><a class="sidebar-item" href="${rel}/about.html">عن المنصة</a><a class="sidebar-item" href="${rel}/privacy.html">الخصوصية</a><a class="sidebar-item" href="${rel}/terms.html">الاتفاقية</a></nav>
<div class="text-xs text-slate-400 mt-6">© حصيف — v21-final</div>`;
$$('#accountsNav a',side).forEach(a=>a.classList.toggle('active',a.dataset.route===active)); return side;}
function buildTopbar(title){const t=document.createElement('div');t.className='topbar';t.innerHTML=`<div class="px-4 py-3 flex items-center justify-between"><div class="text-sm text-slate-500">${title}</div>
<div class="flex items-center gap-2"><a href="../index.html" class="btn">الرئيسية</a></div></div>`;return t;}
function buildLayout(route,title){const c=document.createElement('div');c.className='layout';const m=document.createElement('main');m.id='pageMain';m.appendChild(buildTopbar(title));const s=document.createElement('section');s.id='app';s.className='space-y-3';m.appendChild(s);c.appendChild(m);c.appendChild(buildSidebar(route));document.body.prepend(c);return s;}
function makeTabs(root,tabs){const nav=document.createElement('div');nav.className='tabs';const area=document.createElement('div');const panels={};let i=0;for(const [label,html] of Object.entries(tabs)){const b=document.createElement('button');b.className='tab';b.textContent=label;b.addEventListener('click',()=>{nav.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');for(const k in panels){panels[k].style.display=(k===label)?'block':'none';}});if(i===0)b.classList.add('active');nav.appendChild(b);const p=document.createElement('div');p.style.display=(i===0)?'block':'none';p.innerHTML=html;panels[label]=p;area.appendChild(p);i++;}root.appendChild(nav);root.appendChild(area);}
function panelProjects(){return `<div class="card"><div class="section-title">المشاريع</div><div class="overflow-auto"><table id="projectsTable" class="interactive"><thead><tr><th>المشروع</th><th>الجهة</th><th>المدة</th><th>الحالة</th></tr></thead><tbody>`+
DEMO.projects.map(p=>`<tr><td>${p.name}</td><td>${p.owner}</td><td>${p.start}→${p.end}</td><td>${p.status}</td></tr>`).join('')+`</tbody></table></div></div>`;}
function panelSolutions(){return `<div class="card"><div class="section-title">سوق الحلول</div>`+DEMO.solutions.map(s=>`<div class="card"><b>${s.title}</b><div class="text-sm text-slate-600">${s.desc}</div></div>`).join('')+`</div>`;}
function panelPrinceRequest(){return `<div class="card"><div class="section-title">طلب رعاية الأمير</div><button class="btn" onclick="openPrinceModal()">فتح النموذج</button></div>`;}
function panelFacilities(){return `<div class="card"><div class="section-title">المرافق</div><div class="overflow-auto"><table class="interactive"><thead><tr><th>المرفق</th><th>المزود</th><th>المدينة</th><th>السعة</th></tr></thead><tbody>`+
DEMO.facilities.map(f=>`<tr><td>${f.name}</td><td>${f.provider}</td><td>${f.city}</td><td>${f.capacity}</td></tr>`).join('')+`</tbody></table></div></div>`;}
function panelConsultations(){return `<div class="card"><div class="section-title">الاستشارات</div><button class="btn" onclick="openFilePicker()">طلب استشارة</button></div>`;}
function panelWallet(t){return `<div class="card"><div class="section-title">`+t+`</div><div class="kpi"><b>إجمالي الحافظة:</b> 6.4M</div></div>`;}
function panelAI(){return `<div class="card"><div class="section-title">المستشار الذكي</div><textarea class="search" rows="3" placeholder="اكتب سؤالك..."></textarea><div class="mt-2"><button class="btn btn-accent">تحليل</button></div></div>`;}
function panelJobs(){return `<div class="card"><div class="section-title">الوظائف/التدريب/التطوع</div><button class="btn btn-accent">تقديم</button></div>`;}
function panelTrainers(){return `<div class="card"><div class="section-title">المدربون والمتحدثون</div><div class="overflow-auto"><table class="interactive"><thead><tr><th>الاسم</th><th>المجال</th><th>النمط</th><th>التقييم</th></tr></thead><tbody>`+
DEMO.trainers.map(t=>`<tr><td>${t.name}</td><td>${t.topic}</td><td>${t.mode}</td><td>${t.rating}</td></tr>`).join('')+`</tbody></table></div></div>`;}
const ACCOUNT_TABS={gov:{title:'حساب الحكومة',tabs:{'📊 المشاريع':panelProjects(),'🧩 سوق الحلول':panelSolutions(),'🎯 فرص الرعاية (طلب الأمير)':panelPrinceRequest(),'🏟️ المرافق والفعاليات':panelFacilities(),'💡 الاستشارات':panelConsultations(),'💰 المحفظة':panelWallet('محفظة حكومية'),'🤖 الذكاء الاصطناعي':panelAI(),'📈 المؤشرات والتقارير':panelProjects()}},
emirate:{title:'حساب الإمارة',tabs:{'🎯 مراجعة رعاية الأمير':panelPrinceRequest(),'🛡️ المسح الأمني للمتحدثين':panelTrainers(),'📊 المشاريع':panelProjects(),'💰 المحفظة':panelWallet('محفظة الإمارة'),'🤖 الذكاء الاصطناعي':panelAI(),'📈 المؤشرات والتقارير':panelProjects()}},
private:{title:'حساب القطاع الخاص',tabs:{'🧩 سوق الحلول':panelSolutions(),'🤝 فرص CSR الوطنية':panelPrinceRequest(),'🏟️ المرافق والفعاليات':panelFacilities(),'💡 الاستشارات':panelConsultations(),'💳 محفظة CSR':panelWallet('محفظة CSR'),'🧑‍💼 الوظائف/التدريب/التطوع':panelJobs(),'🎤 المدربون والمتحدثون':panelTrainers(),'🤖 الذكاء الاصطناعي':panelAI(),'📈 المؤشرات والتقارير':panelProjects()}},
nonprofit:{title:'حساب القطاع غير الربحي',tabs:{'📊 المشاريع/الحملات':panelProjects(),'🧩 سوق الحلول':panelSolutions(),'🎯 فرص الرعاية (طلب الأمير)':panelPrinceRequest(),'🤝 التطوع':panelJobs(),'💡 الاستشارات':panelConsultations(),'💰 المحفظة':panelWallet('محفظة الجمعيات'),'🤖 الذكاء الاصطناعي':panelAI(),'📈 المؤشرات والتقارير':panelProjects()}},
university:{title:'حساب الجامعات',tabs:{'🎓 التدريب التعاوني':panelJobs(),'🧩 سوق الحلول':panelSolutions(),'🏟️ المرافق والفعاليات':panelFacilities(),'🚀 الحاضنات/المسرعات':panelConsultations(),'🎯 فرص الرعاية (طلب الأمير)':panelPrinceRequest(),'💳 المحفظة البحثية':panelWallet('محفظة البحوث'),'💡 الاستشارات':panelConsultations(),'🤖 الذكاء الاصطناعي':panelAI(),'📈 المؤشرات والتقارير':panelProjects()}},
individual:{title:'حساب الأفراد',tabs:{'🧭 تحديد الميول والرغبات':panelAI(),'🧑‍💼 الوظائف/التدريب/التطوع':panelJobs(),'🎤 التقديم كمتحدث/مدرب':panelTrainers(),'💡 الاستشارات':panelConsultations(),'💳 المحفظة الشخصية':panelWallet('محفظة شخصية'),'🤖 المستشار الذكي':panelAI()}},
donor:{title:'حساب المانحين',tabs:{'🎁 برامج المنح':panelConsultations(),'🎯 رعاية المبادرات (طلب الأمير)':panelPrinceRequest(),'💳 محفظة المنح':panelWallet('محفظة المنح'),'📈 تقارير الأثر':panelProjects(),'🤖 الذكاء الاصطناعي':panelAI()}},
partners:{title:'حساب الشركاء الاستراتيجيين',tabs:{'منظور الشريك':panelProjects()}}};
function bootAccount(slug){const conf=ACCOUNT_TABS[slug];const content=buildLayout(slug,conf.title);const host=document.createElement('div');host.className='card';host.innerHTML=`<div class="section-title"> ${conf.title}</div><div id="tabs"></div>`;content.appendChild(host);makeTabs($('#tabs',host),conf.tabs);}
function openPrinceModal(){const m=document.getElementById('princeModal'); if(m) m.style.display='flex';}
function closePrinceModal(){const m=document.getElementById('princeModal'); if(m) m.style.display='none';}
function openFilePicker(){document.getElementById('filePicker')?.click();}
