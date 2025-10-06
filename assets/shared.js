const $=(s,r=document)=>r.querySelector(s);

function headerMini(title){
  return <div class="topbar">
  <div class="brand-mini"><img src="./assets/hasseef-logo.svg" alt="حصيف"><b></b></div>
  <div class="socials">
    <a href="#"><img src="./assets/icon-x.svg" alt="X"></a>
    <a href="#"><img src="./assets/icon-snap.svg" alt="Snapchat"></a>
    <a href="#"><img src="./assets/icon-tiktok.svg" alt="TikTok"></a>
    <a href="#"><img src="./assets/icon-telegram.svg" alt="Telegram"></a>
  </div></div>;
}
function layout(){
  const m=document.querySelector('main');const L=document.createElement('div');L.className='layout';
  const content=document.createElement('section');content.className='space-y-3';content.id='content';
  const side=document.createElement('aside');side.className='sidebar';
  side.innerHTML=<div class="section-title">الحسابات</div><nav class="space-y-1">
    <a class="sidebar-item" href="./account.html?type=gov">الحكومة</a>
    <a class="sidebar-item" href="./account.html?type=emirate">الإمارة</a>
    <a class="sidebar-item" href="./account.html?type=private">القطاع الخاص</a>
    <a class="sidebar-item" href="./account.html?type=nonprofit">غير الربحي</a>
    <a class="sidebar-item" href="./account.html?type=university">الجامعات</a>
    <a class="sidebar-item" href="./account.html?type=individual">الأفراد</a>
    <a class="sidebar-item" href="./account.html?type=donor">المانحون</a>
    <a class="sidebar-item" href="./account.html?type=partners">الشركاء الاستراتيجيون</a>
  </nav>
  <div class="mt-3"><a class="btn" href="./contact.html">تواصل معنا</a></div>;
  L.appendChild(content);L.appendChild(side);m.appendChild(L);return content;
}
function card(title,body){return <section class="card"><div class="section-title"></div></section>;}
function tabs(root,t){
  const nav=document.createElement('div');nav.className='tabs';
  const area=document.createElement('div');let first=true;
  for(const [k,v] of Object.entries(t)){
    const b=document.createElement('button');b.className='tab';b.textContent=k;if(first)b.classList.add('active');nav.appendChild(b);
    const p=document.createElement('div');p.style.display=first?'block':'none';p.innerHTML=v;area.appendChild(p);
    b.addEventListener('click',()=>{nav.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));Array.from(area.children).forEach(x=>x.style.display='none');b.classList.add('active');p.style.display='block';});
    first=false;
  }
  root.appendChild(nav);root.appendChild(area);
}
function tableOf(arr, cols){
  const head='<thead><tr>'+cols.map(c=><th></th>).join('')+'</tr></thead>';
  const body='<tbody>'+arr.map(o=>'<tr>'+cols.map(c=><td></td>).join('')+'</tr>').join('')+'</tbody>';
  return <table class="interactive"></table>;
}
function kpis(){return <div class="grid3"><div class="kpi"><div class="text-sm">مشاريع</div><div class="text-2xl font-extrabold">27</div></div>
<div class="kpi"><div class="text-sm">تمويل</div><div class="text-2xl font-extrabold">6.4M</div></div>
<div class="kpi"><div class="text-sm">فعاليات</div><div class="text-2xl font-extrabold">19</div></div></div>;}
function bullets(items){return '<ul class="list-disc pr-5 space-y-1">'+items.map(x=><li></li>).join('')+'</ul>';}

const blocks={
  wallet: ()=>card(' المحفظة', kpis()),
  projects: ()=>card(' المشاريع والمحفظة', kpis()+<div class="mt-2 text-sm text-slate-600">لوحات ومؤشرات قابلة للتوصيل لاحقا.</div>),
  facilities: ()=>card(' المرافق والفعاليات', tableOf([{name:'مركز المؤتمرات',city:'الرياض',cap:1200,status:'متاح'}],[['name','المرفق'],['city','المدينة'],['cap','السعة'],['status','الحالة']] )+<div class="mt-2"><button class="btn btn-primary">طلب حجز</button></div>),
  solutions: ()=>card(' سوق الحلول', bullets(['بوابة الرعايات الوطنية','حاضنات/مسرعات','سوق المرافق والفعاليات'])),
  consult: ()=>card(' الاستشارات', <div class="grid3"><input class="search" placeholder="الموضوع"><select class="search"><option>حوكمة</option><option>أثر اجتماعي</option><option>تقني</option></select><button class="btn btn-primary">طلب استشارة</button></div>),
  jobs: ()=>card(' الوظائف/التدريب/التطوع', <div class="grid3"><button class="btn btn-accent">نشر فرصة</button><button class="btn">استيراد</button><button class="btn">تصدير</button></div>),
  prince: ()=>card(' طلب رعاية الأمير', <div class="text-sm text-slate-600 mb-2">تقدم من القطاعات (حكومي/خاص/مانح) مع موافقة الإمارة.</div><button class="btn btn-primary">فتح النموذج</button>),
  speakers: ()=>card(' المسح الأمني للمتحدثين', tableOf([{name:'د. مها',topic:'ذكاء اصطناعي',status:'متحقق'},{name:'م. أحمد',topic:'أمن سيبراني',status:'بانتظار التحقق'}],[['name','الاسم'],['topic','التخصص'],['status','الحالة']]))
};
const commonTabs={
  rbac: ()=>card(' الصلاحيات (RBAC)', tableOf([{role:'مشرف',R:'',C:'',A:'',P:''},{role:'مدير مشروع',R:'',C:'',A:'',P:''}],[['role','الدور'],['R','قراءة'],['C','إنشاء'],['A','اعتماد'],['P','صرف']])),
  profile: ()=>card(' الملف الشخصي', <div class="grid2"><input class="search" placeholder="الاسم"><input class="search" placeholder="البريد"><input class="search" placeholder="الجوال"><select class="search"><option>العربية</option><option>English</option></select></div><div class="mt-2"><button class="btn btn-primary">حفظ</button></div>),
  settings: ()=>card(' الإعدادات', <div class="grid2"><select class="search"><option>الرياض (GMT+3)</option><option>UTC</option></select><select class="search"><option>تنبيهات: بريد</option><option>رسائل</option><option>بريد + رسائل</option></select></div><div class="mt-2"><button class="btn">نسخة احتياطية</button> <button class="btn btn-primary">حفظ</button></div>)
};

function accountTitle(type){
  return {gov:'الجهات الحكومية', emirate:'الإمارات', private:'القطاع الخاص', nonprofit:'القطاع غير الربحي',
    university:'الجامعات', individual:'الأفراد', donor:'المانحون', partners:'الشركاء الاستراتيجيون'}[type]||'الجهات الحكومية';
}
function accountTabs(type){
  const T={};
  if(type==='gov'){ T[' المشاريع']=blocks.projects(); T[' الحلول']=blocks.solutions(); T[' المرافق']=blocks.facilities(); T[' رعاية الأمير']=blocks.prince(); T[' الاستشارات']=blocks.consult(); }
  if(type==='emirate'){ T[' مراجعة الرعاية']=blocks.prince(); T[' مسح المتحدثين']=blocks.speakers(); T[' المشاريع']=blocks.projects(); T[' المرافق']=blocks.facilities(); }
  if(type==='private'){ T['CSR/رعايات']=blocks.prince(); T[' الحلول']=blocks.solutions(); T[' المرافق']=blocks.facilities(); T[' الاستشارات']=blocks.consult(); T[' وظائف/تدريب/تطوع']=blocks.jobs(); T[' محفظة']=blocks.wallet(); }
  if(type==='nonprofit'){ T['مبادرات/حملات']=blocks.projects(); T[' حلول مجتمعية']=blocks.solutions(); T['تطوع']=blocks.jobs(); T[' الاستشارات']=blocks.consult(); T[' محفظة']=blocks.wallet(); }
  if(type==='university'){ T['التدريب التعاوني']=blocks.jobs(); T['حاضنات/مسرعات']=blocks.solutions(); T[' مرافق/فعاليات']=blocks.facilities(); T[' استشارات/بحوث']=blocks.consult(); T[' محفظة بحوث']=blocks.wallet(); }
  if(type==='individual'){ T[' اختبار الميول']=card(' اختبار الميول','<button class=\"btn btn-primary\">ابدأ الاختبار</button>'); T['وظائف/تدريب/تطوع']=blocks.jobs(); T[' متحدث/مدرب']=card('تقديم','<button class=\"btn\">إرسال</button>'); T[' محفظتي']=blocks.wallet(); }
  if(type==='donor'){ T['برامج منح']=blocks.projects(); T['رعاية مبادرات وطنية']=blocks.prince(); T[' محفظة المنح']=blocks.wallet(); T['تقارير الأثر']=blocks.projects(); }
  if(type==='partners'){ T['نظرة عامة']=blocks.projects(); T['التكامل']=blocks.solutions(); T[' محفظة']=blocks.wallet(); }
  T[' الصلاحيات']=commonTabs.rbac(); T[' الملف الشخصي']=commonTabs.profile(); T[' الإعدادات']=commonTabs.settings();
  return T;
}

/* الشركاء الاستراتيجيون */
const partners={
  sdb:{ title:'بنك التنمية الاجتماعية (SDB)', logo:'./assets/partners/sdb.png',
    solutions:['تمويل مشاريع ومبادرات مع ربط الصرف بمؤشرات الأثر','حلول ريادة بالتكامل مع منشآت والجامعات','برنامج تدريب تعاوني للمشاريع الممولة'],
    reports:['محفظة القروض/الدعم','تقارير الأثر الاجتماعي','نسب التوطين وبناء القدرات'] },
  monshaat:{ title:'منشآت (Monshaat)', logo:'./assets/partners/monshaat.png',
    solutions:['حاضنات ومسرعات متكاملة','تمكين المنشآت الصغيرة والمتوسطة','لوحة تحديات مفتوحة تربط الجهات'],
    reports:['نمو الشركات المحتضنة','خلق الوظائف','الابتكار والتصدير'] },
  ncnp:{ title:'المركز الوطني لتنمية القطاع غير الربحي (NCNP)', logo:'./assets/partners/ncnp.png',
    solutions:['حوكمة الجمعيات والامتثال','إدارة مبادرات اجتماعية','تطوع متخصص وإدارة حملات'],
    reports:['مؤشرات الامتثال','أثر المبادرات','استدامة التمويل'] },
  hrsd:{ title:'وزارة الموارد البشرية والتنمية الاجتماعية (HRSD)', logo:'./assets/partners/hrsd.png',
    solutions:['تطوع وطني متخصص','مواءمة الوظائف وتوطين الكفاءات','تمكين الجمعيات ببرامج التنمية'],
    reports:['مؤشرات سوق العمل','التطوع والأثر','التمكين المؤسسي'] },
  mc:{ title:'وزارة التجارة (MC)', logo:'./assets/partners/mc.png',
    solutions:['بوابة فرص استثمارية','سجل تكاملي للموردين','مرصد تنافسي للقطاعات'],
    reports:['نمو القطاعات','تحسين رحلة المستثمر','التنافسية'] },
  mep:{ title:'وزارة الاقتصاد والتخطيط (MEP)', logo:'./assets/partners/mep.png',
    solutions:['مواءمة المبادرات مع مؤشرات الأداء الوطنية','تحديات وسياسات مبنية على البيانات','لوحات تنبؤية للعرض والطلب (Data Hub)'],
    reports:['اتساق المبادرات مع الرؤية','الأثر الاقتصادي','كفاءة الإنفاق'] },
  rdia:{ title:'هيئة البحث والتطوير والابتكار (RDIA)', logo:'./assets/partners/rdia.png',
    solutions:['سلاسل ابتكار: من الفكرة إلى السوق','ربط الباحثين بالصناعة','محافظ بحوث ممولة'],
    reports:['براءات ومنح','تحويل التقنيات','عائد الابتكار'] },
  ndf:{ title:'صندوق التنمية الوطني (NDF)', logo:'./assets/partners/ndf.png',
    solutions:['توحيد برامج الصناديق','نماذج تمويل مع القطاع الخاص','متابعة الصرف حسب مؤشرات الأثر'],
    reports:['أثر التنمية','معدلات السحب والصرف','الرافعة المالية'] },
  asda:{ title:'هيئة تطوير منطقة عسير (ASDA)', logo:'./assets/partners/asda.png',
    solutions:['كتالوج مرافق ومناطق فعاليات','حوكمة المشاريع التنموية','مسرعات للريادة المجتمعية'],
    reports:['نمو السياحة الاقتصادية','رضا المستفيدين','مؤشرات الرفاه الحضري'] },
  adaa:{ title:'المركز الوطني لقياس أداء الأجهزة العامة (أداء)', logo:'./assets/partners/adaa.png',
    solutions:['تكامل مؤشرات الأداء مع منصات القياس','لوحات تبادل بيانات','مقارنات معيارية (Benchmarking)'],
    reports:['تحقيق المستهدفات','سرعة ودقة التقارير','جودة البيانات'] }
};

function partnerHeader(name,logo){
  return <div class="card"><div class="logo-rail">
    <div class="cell"><img src=""><div><b></b><div class="text-xs text-slate-600">شريك استراتيجي</div></div></div>
    <div class="cell"><img src="./assets/hasseef-logo.svg"><div><b>منصة حصيف</b><div class="text-xs text-slate-600">التكامل والتنفيذ</div></div></div>
  </div></div>;
}
function partnerTabs(cfg){
  return {
    ' مؤشرات الشراكة': card('مؤشرات الشراكة', kpis()+<div class="mt-2 text-sm text-slate-600">لوحات قابلة للتوصيل عبر APIs.</div>),
    ' تكامل/حلول حسب الاختصاص': card('خارطة التكامل', bullets(cfg.solutions)),
    ' محفظة الشريك': card('محفظة التمويل/الدعم', kpis()),
    ' التقارير والامتثال': card('التقارير', bullets(cfg.reports)),
    ' الصلاحيات': commonTabs.rbac(),
    ' الملف الشخصي': commonTabs.profile(),
    ' الإعدادات': commonTabs.settings()
  }
}

window.HS={headerMini,layout,card,tabs,tableOf,kpis,bullets,
  accountTitle,accountTabs,partners,partnerHeader,partnerTabs};