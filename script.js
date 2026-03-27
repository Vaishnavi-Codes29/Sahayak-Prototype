
var lang='en',apiKey='',demo=false,hist=[],busy=false,rec=null,listening=false;
var G=JSON.parse(localStorage.getItem('sg')||'null')||[
  {id:'GRV-2026-10234',name:'Ramesh Kumar',phone:'9876543210',category:'Water Supply',desc:'No water supply for 3 days in our colony.',status:'In Progress',dept:'Water Resources',at:new Date(Date.now()-172800000).toISOString(),escalated:false},
  {id:'GRV-2026-10189',name:'Sunita Devi',phone:'9123456789',category:'Electricity',desc:'Street lights not working for a week.',status:'Pending',dept:'Power',at:new Date(Date.now()-432000000).toISOString(),escalated:false},
  {id:'GRV-2026-10098',name:'Arjun Patil',phone:'8765432109',category:'Roads & Infrastructure',desc:'Large pothole causing accidents near school.',status:'Resolved',dept:'PWD',at:new Date(Date.now()-864000000).toISOString(),escalated:false}
];

var T={
  en:{q:'Quick Actions',s:'Government Schemes',a:'Aadhar Card Help',r:'Ration Card',p:'Pension Enquiry',k:'PM-Kisan',ay:'Ayushman Bharat',pm:'PM Awas Yojana',mu:'Mudra Loan',uj:'Ujjwala Yojana',sc:'Scholarships',mg:'MGNREGA',f:'File a Complaint',sb:'Submit Complaint',t:'Track Complaint',tb:'Track',ad:'Filed Complaints',ph:'Type your query here...',wt:'Namaste! I am Sahayak',ws:'Your official government helpline. Ask about schemes, Aadhar, ration cards, pensions, or file a civic grievance.',
    chips:[{l:'Govt. Schemes',m:'What are the main government welfare schemes?'},{l:'Ayushman Bharat',m:'Explain Ayushman Bharat PM-JAY health insurance scheme.'},{l:'PM-Kisan',m:'Explain PM-Kisan yojana and how to apply.'},{l:'PM Awas Yojana',m:'Explain PM Awas Yojana for housing.'},{l:'Mudra Loan',m:'How to apply for PM Mudra Yojana loan?'},{l:'Ujjwala Yojana',m:'How to get free LPG connection under Ujjwala Yojana?'},{l:'Scholarships',m:'What government scholarships are available for students?'},{l:'MGNREGA',m:'How to get a job card and work under MGNREGA?'},{l:'Aadhar Update',m:'How do I update my Aadhar card details?'},{l:'Ration Card',m:'How to apply for a new ration card?'},{l:'RTI Filing',m:'How do I file an RTI application?'},{l:'Senior Pension',m:'What pension schemes exist for senior citizens?'}],
    qm:{schemes:'List all major government welfare schemes in India with eligibility and benefits.',ayushman:'Explain Ayushman Bharat PM-JAY — eligibility, benefits, how to apply, and hospitals covered.',pmay:'Explain PM Awas Yojana for urban and rural — eligibility, subsidy amount, and how to apply.',mudra:'Explain PM Mudra Yojana — Shishu, Kishore, Tarun categories and how to get a loan.',ujjwala:'Explain Pradhan Mantri Ujjwala Yojana — eligibility, how to apply for free LPG connection.',scholarship:'List all major government scholarship schemes for students in India with amounts.',mgnrega:'Explain MGNREGA — benefits, eligibility, how to get a job card, and payment tracking.',aadhar:'Step by step guide to update Aadhar card address or phone number.',ration:'How to check ration card status or apply for a new ration card, step by step.',pension:'What pension schemes are available for senior citizens, widows, and disabled persons?',pmkisan:'Explain PM-Kisan Samman Nidhi — eligibility, benefits, and how to check payment status.'},
    sys:'You are Sahayak, an official citizen helpline for the Indian government. Help citizens with schemes (PM-Kisan, Ayushman Bharat, PMAY, MGNREGA), Aadhar, ration cards, pensions, RTI, and utility complaints. After answering, suggest 1-2 related government schemes the user might be eligible for if relevant. Be concise, formal, empathetic, and use numbered steps. End with: "Is there anything else I can assist you with?"',
    da:{schemes:'Here are key Government of India welfare schemes:\n\n1. **PM-Kisan Samman Nidhi** — Rs 6,000/year to farmers in 3 instalments (pmkisan.gov.in)\n2. **Ayushman Bharat PM-JAY** — Free health insurance up to Rs 5 lakh/year for eligible families\n3. **MGNREGA** — 100 days guaranteed employment for rural households\n4. **PM Awas Yojana (PMAY)** — Subsidised housing for BPL families (urban & rural)\n5. **Jan Dhan Yojana** — Zero-balance accounts with Rs 2 lakh accident insurance\n6. **PM Mudra Yojana** — Loans up to Rs 10 lakh for small businesses (no collateral)\n7. **Ujjwala Yojana** — Free LPG connections for BPL women (pmuy.gov.in)\n8. **Sukanya Samriddhi Yojana** — Savings scheme for girl child with tax benefits\n9. **Atal Pension Yojana** — Guaranteed pension of Rs 1,000–5,000/month after age 60\n10. **NSP Scholarships** — Pre/post-matric scholarships for SC/ST/OBC/minority students\n11. **PM SVANidhi** — Rs 10,000–50,000 loans for street vendors\n12. **Skill India (PMKVY)** — Free skill training with Rs 8,000 reward on certification\n\nIs there anything else I can assist you with?',ayushman:'**Ayushman Bharat PM-JAY** (Pradhan Mantri Jan Arogya Yojana):\n\n**Benefits:**\n- Free health insurance up to Rs 5 lakh/year per family\n- Covers 1,961+ medical procedures\n- Cashless treatment at 25,000+ empanelled hospitals\n\n**Eligibility:**\n- Families listed in SECC 2011 database\n- No cap on family size or age\n\n**How to apply:**\n1. Visit pmjay.gov.in or nearest CSC centre\n2. Check eligibility using mobile number or ration card\n3. Get your e-card generated\n4. Use card at any empanelled hospital\n\n**Helpline:** 14555 / 1800-111-565\n\nIs there anything else I can assist you with?',pmay:'**Pradhan Mantri Awas Yojana (PMAY)**:\n\n**Urban (PMAY-U):**\n- Subsidy of Rs 1.5–2.67 lakh on home loans\n- For EWS (income < Rs 3L), LIG (Rs 3–6L), MIG-I (Rs 6–12L), MIG-II (Rs 12–18L)\n\n**Rural (PMAY-G):**\n- Rs 1.2 lakh (plain areas) or Rs 1.3 lakh (hilly/NE) to build pucca house\n- For homeless/kutcha house families in SECC list\n\n**How to apply:**\n1. Visit pmaymis.gov.in (urban) or pmayg.nic.in (rural)\n2. Register with Aadhar and bank details\n3. Track application status online\n\n**Helpline:** 1800-11-6446\n\nIs there anything else I can assist you with?',mudra:'**PM Mudra Yojana (PMMY)**:\n\n**Loan Categories:**\n- **Shishu** — Up to Rs 50,000 (for startups)\n- **Kishore** — Rs 50,001 to Rs 5 lakh (for growing businesses)\n- **Tarun** — Rs 5 lakh to Rs 10 lakh (for established businesses)\n\n**Features:**\n- No collateral required\n- Available from banks, NBFCs, MFIs\n- For non-farm income-generating activities\n\n**How to apply:**\n1. Visit any bank branch or mudra.org.in\n2. Carry Aadhar, PAN, business proof\n3. Fill Mudra loan application form\n4. Loan disbursed in 7–15 working days\n\n**Helpline:** 1800-180-1111\n\nIs there anything else I can assist you with?',ujjwala:'**Pradhan Mantri Ujjwala Yojana (PMUY)**:\n\n**Benefits:**\n- Free LPG connection to BPL women\n- Refundable security deposit covered by government\n- First refill and hotplate also free\n\n**Eligibility:**\n- Women from BPL households\n- No existing LPG connection in the household\n- Age 18+ years\n\n**How to apply:**\n1. Visit nearest LPG distributor or pmuy.gov.in\n2. Submit KYC form with Aadhar + bank passbook\n3. BPL certificate or ration card required\n4. Connection issued within 7 working days\n\n**Helpline:** 1906\n\nIs there anything else I can assist you with?',scholarship:'**Government Scholarship Schemes:**\n\n1. **NSP Pre-Matric Scholarship** — For SC/ST/OBC/minority students in Class 1–10\n   - Amount: Rs 500–1,000/month + maintenance allowance\n\n2. **NSP Post-Matric Scholarship** — For Class 11 to PhD level\n   - Amount: Up to Rs 12,000/year + tuition fees\n\n3. **Pragati Scholarship (AICTE)** — For girl students in technical education\n   - Amount: Rs 50,000/year\n\n4. **PM Scholarship for CAPF** — For children of central armed police forces\n   - Amount: Rs 2,500–3,000/month\n\n5. **Ishan Uday** — For NE students in undergraduate courses\n   - Amount: Rs 5,400–7,800/month\n\n**How to apply:** scholarships.gov.in (National Scholarship Portal)\n\n**Helpline:** 0120-6619540\n\nIs there anything else I can assist you with?',mgnrega:'**Mahatma Gandhi NREGA (MGNREGS)**:\n\n**Benefits:**\n- 100 days of guaranteed wage employment per year\n- Rs 220–316/day (varies by state)\n- Work provided within 5 km of residence\n- Unemployment allowance if work not provided\n\n**Eligibility:**\n- Any rural household member willing to do unskilled manual work\n- Must be 18 years or older\n\n**How to apply:**\n1. Visit your Gram Panchayat\n2. Fill Job Card application with Aadhar and photo\n3. Get Job Card within 15 days\n4. Request work at Gram Panchayat — must be given within 15 days\n\n**Track payments:** nrega.nic.in\n\n**Helpline:** 1800-111-555\n\nIs there anything else I can assist you with?',aadhar:'To update your Aadhar card:\n\n1. Visit uidai.gov.in or nearest Aadhar Enrollment Centre\n2. Online: Login at myaadhaar.uidai.gov.in\n3. Click Update Demographics — address, phone, or email\n4. Upload supporting document (utility bill, bank statement)\n5. Pay Rs 50 fee online\n6. Note your URN to track the update status\n\nFor urgent changes, visit an Aadhar Seva Kendra.\n\nIs there anything else I can assist you with?',def:'Thank you for your query. The portal is currently running in **Offline Mode** — to receive full smart responses, please provide your Anthropic API key (refresh the page to enter it).\n\nIn Offline Mode, I can answer questions about:\n- Government schemes (PM-Kisan, Ayushman Bharat)\n- Aadhar card procedures\n- Ration cards and pension schemes\n\nIs there anything else I can assist you with?'}
  },
  hi:{q:'त्वरित कार्य',s:'सरकारी योजनाएं',a:'आधार कार्ड सहायता',r:'राशन कार्ड',p:'पेंशन जानकारी',k:'पीएम-किसान',f:'शिकायत दर्ज करें',sb:'शिकायत सबमिट करें',t:'शिकायत ट्रैक करें',tb:'ट्रैक',ad:'दर्ज शिकायतें',ph:'यहाँ अपना प्रश्न लिखें...',wt:'नमस्ते! मैं सहायक हूं',ws:'आपका आधिकारिक सरकारी हेल्पलाइन सहायक।',
    chips:[{l:'सरकारी योजनाएं',m:'मुख्य सरकारी योजनाएं कौन सी हैं?'},{l:'आधार',m:'आधार कार्ड कैसे अपडेट करें?'},{l:'पीएम-किसान',m:'पीएम-किसान योजना क्या है?'},{l:'राशन कार्ड',m:'नया राशन कार्ड कैसे बनवाएं?'},{l:'RTI',m:'RTI आवेदन कैसे करें?'},{l:'पेंशन',m:'वरिष्ठ नागरिकों के लिए पेंशन योजनाएं?'}],
    qm:{schemes:'नागरिकों के लिए शीर्ष 5 सरकारी कल्याण योजनाएं बताएं।',aadhar:'आधार कार्ड में पता या फोन नंबर अपडेट करने की चरण-दर-चरण जानकारी दें।',ration:'राशन कार्ड स्थिति कैसे चेक करें या नया कैसे बनवाएं?',pension:'वरिष्ठ नागरिकों, विधवाओं और विकलांगों के लिए कौन सी पेंशन योजनाएं हैं?',pmkisan:'पीएम-किसान योजना, पात्रता और भुगतान स्थिति के बारे में बताएं।'},
    sys:'आप सहायक हैं, भारत सरकार की नागरिक हेल्पलाइन। हमेशा हिंदी में उत्तर दें। स्पष्ट चरणों में जानकारी दें। अंत में पूछें: "क्या मैं और कुछ सहायता कर सकता हूं?"',
    da:{def:'हिंदी में पूर्ण उत्तर के लिए कृपया Anthropic API key प्रदान करें।\n\nक्या मैं और कुछ सहायता कर सकता हूं?'}
  },
  mr:{q:'त्वरित क्रिया',s:'सरकारी योजना',a:'आधार कार्ड मदत',r:'रेशन कार्ड',p:'पेन्शन चौकशी',k:'पीएम-किसान',f:'तक्रार नोंदवा',sb:'तक्रार सबमिट करा',t:'तक्रार ट्रॅक करा',tb:'ट्रॅक',ad:'नोंदवलेल्या तक्रारी',ph:'येथे आपला प्रश्न लिहा...',wt:'नमस्कार! मी सहायक आहे',ws:'तुमचा अधिकृत सरकारी हेल्पलाइन सहाय्यक।',
    chips:[{l:'सरकारी योजना',m:'नागरिकांसाठी मुख्य सरकारी योजना कोणत्या?'},{l:'आधार',m:'आधार कार्ड कसे अपडेट करावे?'},{l:'पीएम-किसान',m:'पीएम-किसान योजना काय आहे?'},{l:'रेशन कार्ड',m:'नवीन रेशन कार्ड कसे मिळवावे?'},{l:'RTI',m:'RTI अर्ज कसा करावा?'},{l:'पेन्शन',m:'ज्येष्ठ नागरिकांसाठी पेन्शन योजना?'}],
    qm:{schemes:'नागरिकांसाठी शीर्ष ५ सरकारी कल्याणकारी योजना सांगा.',aadhar:'आधार कार्डमध्ये पत्ता अपडेट करण्याची माहिती द्या.',ration:'रेशन कार्डची स्थिती कशी तपासावी?',pension:'ज्येष्ठ नागरिकांसाठी पेन्शन योजना कोणत्या?',pmkisan:'पीएम-किसान योजनेबद्दल माहिती द्या.'},
    sys:'तुम्ही सहायक आहात, भारत सरकारची नागरिक हेल्पलाइन. नेहमी मराठीत उत्तर द्या. शेवटी विचारा: "मी आणखी काही सहाय्य करू का?"',
    da:{def:'मराठीत पूर्ण उत्तरासाठी Anthropic API key प्रदान करा.\n\nमी आणखी काही सहाय्य करू का?'}
  }
};

var DEPT={'Water Supply':'Water Resources','Roads & Infrastructure':'PWD','Health Services':'Health Dept.','Education':'Education Dept.','Electricity':'Power Dept.','Sanitation':'Municipal Corp.','Public Safety':'Police Dept.','Other':'General Admin'};
var SC={'Pending':'sp-pending','In Progress':'sp-progress','Resolved':'sp-resolved','Escalated':'sp-escalated'};
var TL_STEPS=['Filed','Assigned','In Progress','Resolved'];

function statusToTL(status){
  if(status==='Resolved')return 3;
  if(status==='In Progress')return 2;
  if(status==='Pending')return 1;
  return 0;
}

function renderTimeline(status){
  var cur=statusToTL(status);
  return '<div class="status-timeline">'+TL_STEPS.map(function(s,i){
    var cls=i<cur?'done':i===cur?'active':'';
    return '<div class="stl-step '+cls+'"><div class="stl-dot"></div><div class="stl-label">'+s+'</div></div>';
  }).join('')+'</div>';
}

function init(){
  document.getElementById('api-modal').classList.add('hidden');
  apiKey='built-in';
  document.getElementById('mode-badge').textContent='Powered by Claude · Available 24×7';
  renderChips();renderGL();setupVoice();
}

function saveKey(){
  var v=document.getElementById('api-key-in').value.trim();
  if(!v.startsWith('sk-')){document.getElementById('modal-err').style.display='block';document.getElementById('api-key-in').classList.add('err');return;}
  apiKey=v;localStorage.setItem('sk',v);document.getElementById('api-modal').classList.add('hidden');
  document.getElementById('mode-badge').textContent='Powered by Claude · Available 24×7';
  showToast('API key saved. Assistant ready.');
}
function skipKey(){
  demo=true;document.getElementById('api-modal').classList.add('hidden');
  document.getElementById('mode-badge').innerHTML='<span style="background:#FEF3C7;color:#92400E;border:1px solid #FCD34D;border-radius:2px;padding:1px 6px;font-size:9px;font-weight:700;letter-spacing:0.3px">OFFLINE MODE</span>';
  showToast('Offline Mode activated — pre-written answers only');
}
document.getElementById('api-key-in').addEventListener('keydown',function(e){if(e.key==='Enter')saveKey();});

function scrollChat(){document.getElementById('cin').focus();}
function scrollToForm(){document.getElementById('complaint-section').scrollIntoView({behavior:'smooth'});}

function setLang(l){
  lang=l;
  ['en','hi','mr'].forEach(function(x){document.getElementById('btn-'+x).classList.toggle('active',x===l);});
  var t=T[l];
  document.getElementById('lq').childNodes[0].textContent=t.q+' ';
  document.getElementById('ls').textContent=t.s;document.getElementById('la').textContent=t.a;
  document.getElementById('lr').textContent=t.r;document.getElementById('lp').textContent=t.p;
  document.getElementById('lk').textContent=t.k;
  document.getElementById('lf').childNodes[0].textContent=t.f+' ';
  document.getElementById('lsub').textContent=t.sb;
  document.getElementById('lt').childNodes[0].textContent=t.t+' ';
  document.getElementById('ltb').textContent=t.tb;
  document.getElementById('ladm').childNodes[0].textContent=t.ad+' ';
  document.getElementById('cin').placeholder=t.ph;
  document.getElementById('wt').textContent=t.wt;
  document.getElementById('ws').textContent=t.ws;
  renderChips();
}

function renderChips(){
  var c=document.getElementById('chips');if(!c)return;
  c.innerHTML=T[lang].chips.map(function(ch){
    return '<button class="chip" onclick="sendM(\''+ch.m.replace(/'/g,"&#39;")+'\')">'+ch.l+'</button>';
  }).join('');
}

function hideW(){var w=document.getElementById('welc');if(w)w.remove();}
function gt(){return new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});}
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

function fmt(text){
  var t=esc(text);
  t=t.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');
  var lines=t.split('\n'),html='',inL=false;
  for(var i=0;i<lines.length;i++){
    var line=lines[i],bm=line.match(/^[\-\*] (.+)/),nm=line.match(/^\d+\. (.+)/);
    if(bm||nm){if(!inL){html+='<ul>';inL=true;}html+='<li>'+(bm?bm[1]:nm[1])+'</li>';}
    else{if(inL){html+='</ul>';inL=false;}if(line.trim())html+='<p>'+line+'</p>';}
  }
  if(inL)html+='</ul>';
  return html||'<p>'+t+'</p>';
}

// Smart scheme recommendations based on keywords
var SCHEME_MAP=[
  {k:['farmer','kisan','agriculture','crop'],r:'PM-Kisan Samman Nidhi — Rs 6,000/year for farmers'},
  {k:['health','hospital','medical','sick','disease'],r:'Ayushman Bharat PM-JAY — Free health cover up to Rs 5 lakh'},
  {k:['house','home','housing','shelter'],r:'PM Awas Yojana — Subsidised housing for eligible families'},
  {k:['job','work','employment','rural','labour'],r:'MGNREGA — 100 days guaranteed rural employment'},
  {k:['bank','account','save','insurance'],r:'Jan Dhan Yojana — Zero-balance account with accident insurance'},
  {k:['pension','old','elderly','senior','retire'],r:'Pradhan Mantri Vaya Vandana Yojana — Pension for senior citizens'}
];
function getSchemeRec(text){
  var t=text.toLowerCase();
  for(var i=0;i<SCHEME_MAP.length;i++){
    if(SCHEME_MAP[i].k.some(function(k){return t.includes(k);}))return SCHEME_MAP[i].r;
  }
  return null;
}

function addM(role,content,isH){
  hideW();
  var msgs=document.getElementById('msgs');
  var d=document.createElement('div');d.className='msg '+role;
  var av=role==='bot'?'S':'YOU';
  var fc=isH?content:fmt(content);
  d.innerHTML='<div class="avatar">'+av+'</div><div><div class="bubble">'+fc+'</div><div class="msg-time">'+gt()+'</div></div>';
  msgs.appendChild(d);

  if(role==='bot'&&!isH){
    // Scheme recommendation
    var rec=getSchemeRec(content);
    if(rec){
      var rb=document.createElement('div');rb.className='rec-block';
      rb.innerHTML='<div class="rec-title">Recommended for You</div><div class="rec-item" onclick="sendM(\'Tell me more about '+rec.split(' — ')[0]+'\')" ><div class="rec-dot"></div><div class="rec-name">'+rec.split(' — ')[0]+'</div><div class="rec-desc">'+rec.split(' — ')[1]+'</div></div>';
      msgs.appendChild(rb);
    }
    // Follow-up chips
    var sugs=getFups(content);
    if(sugs.length){
      var fw=document.createElement('div');fw.className='fup-wrap';
      sugs.forEach(function(s){var b=document.createElement('button');b.className='fup';b.textContent=s;b.onclick=function(){fw.remove();sendM(s);};fw.appendChild(b);});
      msgs.appendChild(fw);
    }
  }
  msgs.scrollTop=msgs.scrollHeight;
}

var FUP_MAP=[
  {k:['scheme','yojana','welfare','pm-kisan','pmay','mgnrega'],s:['How do I apply for PM-Kisan?','Ayushman Bharat income limit?','Check MGNREGA payment status?']},
  {k:['aadhar','aadhaar'],s:['How long does Aadhar update take?','Can I update Aadhar online?','Documents needed for Aadhar?']},
  {k:['ration'],s:['Add family member to ration card?','BPL income limit?','Check ration card status online?']},
  {k:['pension'],s:['How to apply for PM Vaya Vandana?','Documents needed for pension?','Widow pension amount?']},
  {k:['rti'],s:['What is the RTI fee?','RTI response timeline?','File RTI online?']},
  {k:['water','electricity','road','sanitation','pothole'],s:['How to escalate my complaint?','Resolution timeline?','Track complaint status?']}
];
var FUP_DEF=['Eligible government schemes?','How to file a complaint?','Update Aadhar card?'];
function getFups(t){var tl=t.toLowerCase();for(var i=0;i<FUP_MAP.length;i++){if(FUP_MAP[i].k.some(function(k){return tl.includes(k);}))return FUP_MAP[i].s;}return FUP_DEF;}

function showTyp(){
  hideW();
  var msgs=document.getElementById('msgs');
  var d=document.createElement('div');d.className='msg bot';d.id='typ';
  d.innerHTML='<div class="avatar">SA</div><div class="typing-ind"><div class="td"></div><div class="td"></div><div class="td"></div></div>';
  msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight;
}
function remTyp(){var t=document.getElementById('typ');if(t)t.remove();}

function getDa(text){
  var q=text.toLowerCase(),da=T[lang].da;
  if(da.schemes&&(q.includes('scheme')||q.includes('yojana')||q.includes('\u092f\u094b\u091c\u0928')))return da.schemes;
  if(da.aadhar&&(q.includes('aadhar')||q.includes('aadhaar')||q.includes('\u0906\u0927\u093e\u0930')))return da.aadhar;
  return da.def;
}

async function sendM(text){
  if(!text.trim()||busy)return;
  addM('user',text);hist.push({role:'user',content:text});
  busy=true;document.getElementById('sbtn').disabled=true;showTyp();
  try{
    if(false){
      await new Promise(function(r){setTimeout(r,800);});remTyp();
      var rep=getDa(text);hist.push({role:'assistant',content:rep});addM('bot',rep);
    } else {
      var res=await fetch('https://api.anthropic.com/v1/messages',{
        method:'POST',
        headers:{'Content-Type':'application/json','anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},
        body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,system:T[lang].sys,messages:hist.slice(-10)})
      });
      var data=await res.json();remTyp();
      if(data.content&&data.content[0]){
        var rep=data.content[0].text;hist.push({role:'assistant',content:rep});addM('bot',rep);
      } else {
        addM('bot','&#9888; API Error: '+(data.error?data.error.message:'Unknown')+'.\n\nPlease verify your API key.');
      }
    }
  } catch(e){remTyp();addM('bot','&#9888; Connection error. Please check your internet connection.');}
  busy=false;document.getElementById('sbtn').disabled=false;
}

function sendFI(){var el=document.getElementById('cin');var t=el.value.trim();if(!t||busy)return;el.value='';el.style.height='auto';sendM(t);}
function hk(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendFI();}}
function ar(el){el.style.height='auto';el.style.height=Math.min(el.scrollHeight,88)+'px';}
function sq(k){sendM(T[lang].qm[k]);}

/* GRIEVANCE */
function gid(){return'GRV-2026-'+String(10000+Math.floor(Math.random()*90000));}
function sg(){localStorage.setItem('sg',JSON.stringify(G));}
function statusClass(s){return SC[s]||'sp-pending';}

function fileG(){
  var name=document.getElementById('gn').value.trim();
  var phone=document.getElementById('gph').value.trim();
  var email=document.getElementById('gem').value.trim();
  var address=document.getElementById('gadr').value.trim();
  var cat=document.getElementById('gcat').value;
  var desc=document.getElementById('gdesc').value.trim();
  var hasFile=document.getElementById('gfile').files.length>0;
  if(!name||!phone||!cat||!desc){showToast('Please fill all required fields');return;}
  if(!address){showToast('Please enter your address');return;}
  if(!/^\d{10}$/.test(phone)){showToast('Enter a valid 10-digit mobile number');return;}
  if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){showToast('Enter a valid email address');return;}
  var g={id:gid(),name:name,phone:phone,email:email||null,address:address,category:cat,desc:desc,
    attachment:hasFile?document.getElementById('gfile').files[0].name:null,
    status:'Pending',dept:DEPT[cat]||'General Admin',at:new Date().toISOString(),escalated:false};
  G.push(g);sg();renderGL();
  ['gn','gph','gem','gadr','gdesc'].forEach(function(id){document.getElementById(id).value='';});
  document.getElementById('gcat').value='';document.getElementById('gfile').value='';
  document.getElementById('gfile-txt').textContent='Attach document (optional)';
  document.getElementById('gfile-label').className='fupload';
  showToast('Complaint filed. Reference: '+g.id);
  hideW();
  var html='<div class="success-card">'+
    '<div style="font-size:10px;font-weight:700;color:var(--success);margin-bottom:5px;text-transform:uppercase;letter-spacing:0.4px">&#10003; Complaint Successfully Registered</div>'+
    '<div class="success-card-id">'+g.id+'</div>'+
    '<div class="sc-row"><b>Category:</b> '+g.category+'</div>'+
    '<div class="sc-row"><b>Department:</b> '+g.dept+'</div>'+
    (g.email?'<div class="sc-row"><b>Email:</b> '+g.email+'</div>':'')+
    (g.attachment?'<div class="sc-row"><b>Attachment:</b> '+g.attachment+'</div>':'')+
    '<div class="sc-timeline"><div class="sc-tl-label">Progress Timeline</div>'+renderTimeline('Pending')+'</div>'+
    '<button class="escalate-btn" onclick="escalateG(\''+g.id+'\',this)">&#9888; Escalate Complaint</button>'+
    '<div style="font-size:10px;color:var(--text4);margin-top:7px;padding-top:7px;border-top:1px solid var(--border)">Save your reference ID. Expected resolution: 3–5 working days.</div></div>';
  addM('bot',html,true);
}

function escalateG(id,btn){
  var g=G.find(function(x){return x.id===id;});
  if(g&&!g.escalated){g.escalated=true;g.status='Escalated';sg();renderGL();showToast('Complaint '+id+' escalated to senior officer');btn.textContent='&#10003; Escalated';btn.disabled=true;btn.style.opacity='0.5';}
}

function handleFile(input){
  var txt=document.getElementById('gfile-txt');
  if(input.files&&input.files[0]){txt.textContent=input.files[0].name;document.getElementById('gfile-label').className='fupload has-file';}
  else{txt.textContent='Attach document (optional)';document.getElementById('gfile-label').className='fupload';}
}

function clearDates(){document.getElementById('dfrom').value='';document.getElementById('dto').value='';rAt();}

function trackG(){
  var id=document.getElementById('trin').value.trim().toUpperCase();
  var el=document.getElementById('trres');
  if(!id){showToast('Enter a grievance ID');return;}
  var g=G.find(function(x){return x.id===id;});
  if(!g){el.className='track-result show';el.innerHTML='<span style="color:var(--danger);font-size:12px">&#10060; No record found for <b>'+id+'</b></span>';return;}
  el.className='track-result show';
  el.innerHTML='<div class="track-id">'+g.id+'</div>'+
    '<div style="font-size:11px;font-weight:600;color:var(--text1);margin-top:2px">'+g.name+'</div>'+
    '<div style="font-size:10px;color:var(--text3)">'+g.category+' &middot; '+g.dept+'</div>'+
    '<span class="sp '+statusClass(g.status)+'" style="margin-top:5px;display:inline-flex">'+g.status+'</span>'+
    renderTimeline(g.status)+
    '<div style="font-size:10px;color:var(--text4);margin-top:5px">Filed: '+new Date(g.at).toLocaleDateString('en-IN')+'</div>';
}

function renderGL(){
  var el=document.getElementById('glist');
  if(!G.length){el.innerHTML='<div style="font-size:12px;color:var(--text4);text-align:center;padding:10px 0">No complaints filed yet</div>';return;}
  el.innerHTML=[...G].reverse().map(function(g){
    return '<div class="complaint-card" onclick="chatA(\''+g.id+'\')"><div class="cc-id">'+g.id+'</div><div class="cc-name">'+g.name+'</div><div class="cc-cat">'+g.category+'</div><div class="cc-footer"><span class="sp '+statusClass(g.status)+'" style="font-size:9px;padding:2px 5px">'+g.status+'</span><span style="font-size:10px;color:var(--text4)">'+new Date(g.at).toLocaleDateString('en-IN')+'</span></div></div>';
  }).join('');
}

function chatA(id){
  var g=G.find(function(x){return x.id===id;});if(!g)return;
  sendM('Please help resolve complaint '+g.id+' — Category: "'+g.category+'", Issue: "'+g.desc+'". What steps should be taken by the '+g.dept+'?');
}

/* ADMIN */
function showAdm(){document.getElementById('main-app').style.display='none';document.getElementById('adm').classList.add('show');rAs();rAt();}
function hideAdm(){document.getElementById('adm').classList.remove('show');document.getElementById('main-app').style.display='flex';}

function rAs(){
  var t=G.length,pe=G.filter(function(g){return g.status==='Pending';}).length;
  var pr=G.filter(function(g){return g.status==='In Progress';}).length;
  var re=G.filter(function(g){return g.status==='Resolved';}).length;
  var icons={
    total:'<svg viewBox="0 0 24 24" fill="none" stroke="#0B1F45" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/></svg>',
    pending:'<svg viewBox="0 0 24 24" fill="none" stroke="#92400E" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    progress:'<svg viewBox="0 0 24 24" fill="none" stroke="#1E40AF" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
    resolved:'<svg viewBox="0 0 24 24" fill="none" stroke="#065F46" stroke-width="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
  };
  document.getElementById('stats').innerHTML=[
    {n:t,l:'Total',cls:'s-total',ic:icons.total},
    {n:pe,l:'Pending',cls:'s-pending',ic:icons.pending},
    {n:pr,l:'In Progress',cls:'s-progress',ic:icons.progress},
    {n:re,l:'Resolved',cls:'s-resolved',ic:icons.resolved}
  ].map(function(s){return'<div class="stat-card '+s.cls+'"><div class="stat-icon">'+s.ic+'</div><div class="stat-num">'+s.n+'</div><div class="stat-label">'+s.l+'</div></div>';}).join('');
}

function rAt(){
  var srch=(document.getElementById('srch').value||'').toLowerCase();
  var filt=document.getElementById('fsel').value;
  var dfrom=document.getElementById('dfrom').value,dto=document.getElementById('dto').value;
  var rows=G.filter(function(g){return!filt||g.status===filt;})
    .filter(function(g){return!srch||g.name.toLowerCase().includes(srch)||g.id.toLowerCase().includes(srch)||g.category.toLowerCase().includes(srch);})
    .filter(function(g){var d=new Date(g.at);if(dfrom&&d<new Date(dfrom))return false;if(dto&&d>new Date(dto+'T23:59:59'))return false;return true;})
    .sort(function(a,b){return new Date(b.at)-new Date(a.at);});
  var el=document.getElementById('at');
  if(!rows.length){el.innerHTML='<div class="table-empty">No complaints match the selected filters.</div>';return;}
  el.innerHTML=rows.map(function(g){
    return '<div class="table-row"><div><div class="tr-id">'+g.id+(g.escalated?'<span style="font-size:8px;background:#FEE2E2;color:#991B1B;border-radius:2px;padding:1px 4px;margin-left:4px;font-family:sans-serif;letter-spacing:0.3px">ESC</span>':'')+'</div><div class="tr-name">'+g.name+'</div><div class="tr-date">'+new Date(g.at).toLocaleDateString('en-IN')+'</div></div><div class="tr-cat">'+g.category+'</div><div class="tr-desc" title="'+g.desc+'">'+g.desc+'</div><div class="tr-dept">'+g.dept+'</div><div><select class="status-select" onchange="updS(\''+g.id+'\',this.value)"><option'+(g.status==='Pending'?' selected':'')+'>Pending</option><option'+(g.status==='In Progress'?' selected':'')+'>In Progress</option><option'+(g.status==='Resolved'?' selected':'')+'>Resolved</option></select><button class="ai-ask-btn" onclick="hideAdm();chatA(\''+g.id+'\')">Ask &rarr;</button></div></div>';
  }).join('');
  document.getElementById('ac').textContent='Showing '+rows.length+' of '+G.length+' complaint(s)';
  rAs();
}

function updS(id,status){
  var g=G.find(function(x){return x.id===id;});
  if(g){g.status=status;sg();renderGL();rAt();showToast('Status updated: '+status);}
}

/* VOICE */
function setupVoice(){
  var SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR)return;
  rec=new SR();rec.continuous=false;rec.interimResults=true;
  rec.onresult=function(e){document.getElementById('cin').value=Array.from(e.results).map(function(r){return r[0].transcript;}).join('');};
  rec.onend=function(){listening=false;document.getElementById('micbtn').classList.remove('on');document.getElementById('micnav').classList.remove('on');var t=document.getElementById('cin').value.trim();if(t)sendFI();};
  rec.onerror=function(){listening=false;document.getElementById('micbtn').classList.remove('on');document.getElementById('micnav').classList.remove('on');};
}
function toggleVoice(){
  if(!rec){showToast('Voice input not supported in this browser');return;}
  var lm={en:'en-IN',hi:'hi-IN',mr:'mr-IN'};
  if(listening){rec.stop();listening=false;document.getElementById('micbtn').classList.remove('on');document.getElementById('micnav').classList.remove('on');}
  else{rec.lang=lm[lang]||'en-IN';rec.start();listening=true;document.getElementById('micbtn').classList.add('on');document.getElementById('micnav').classList.add('on');showToast('Listening... Please speak now');}
}

/* TOAST */
var tt;
function showToast(msg){
  clearTimeout(tt);var el=document.getElementById('toast');
  document.getElementById('tmsg').textContent=msg;
  el.classList.add('show');tt=setTimeout(function(){el.classList.remove('show');},3200);
}

init();

/* ── LOGIN SYSTEM ── */
var loggedInUser = null;

function showLogin(){document.getElementById('login-modal').classList.remove('hidden');}
function hideLogin(){document.getElementById('login-modal').classList.add('hidden');}

function switchTab(t){
  document.getElementById('form-login').classList.toggle('active', t==='login');
  document.getElementById('form-register').classList.toggle('active', t==='register');
  document.getElementById('tab-login').classList.toggle('active', t==='login');
  document.getElementById('tab-register').classList.toggle('active', t==='register');
  document.getElementById('login-err').style.display='none';
  document.getElementById('reg-err').style.display='none';
}

function doLogin(){
  var mob=document.getElementById('l-mobile').value.trim();
  var pass=document.getElementById('l-pass').value.trim();
  var err=document.getElementById('login-err');
  if(!mob||!pass){err.style.display='block';err.textContent='Please enter both fields.';return;}
  // Check registered users in localStorage
  var users=JSON.parse(localStorage.getItem('sahayak_users')||'[]');
  var user=users.find(function(u){return (u.mobile===mob||u.aadhar===mob)&&u.pass===pass;});
  if(!user&&!(mob==='admin'&&pass==='admin123')){err.style.display='block';err.textContent='Invalid credentials. Please try again.';return;}
  loggedInUser=user||{name:'Admin',mobile:'admin'};
  err.style.display='none';
  hideLogin();
  updateLoginBtn();
  showToast('Welcome back, '+loggedInUser.name+'!');
}

function doRegister(){
  var name=document.getElementById('r-name').value.trim();
  var mob=document.getElementById('r-mobile').value.trim();
  var aadhar=document.getElementById('r-aadhar').value.trim();
  var pass=document.getElementById('r-pass').value.trim();
  var err=document.getElementById('reg-err');
  if(!name||!mob||!aadhar||!pass){err.style.display='block';err.textContent='Please fill all required fields.';return;}
  if(mob.length!==10){err.style.display='block';err.textContent='Enter a valid 10-digit mobile number.';return;}
  if(aadhar.length!==12){err.style.display='block';err.textContent='Enter a valid 12-digit Aadhar number.';return;}
  var users=JSON.parse(localStorage.getItem('sahayak_users')||'[]');
  if(users.find(function(u){return u.mobile===mob;})){err.style.display='block';err.textContent='Mobile already registered. Please login.';return;}
  users.push({name:name,mobile:mob,aadhar:aadhar,pass:pass});
  localStorage.setItem('sahayak_users',JSON.stringify(users));
  loggedInUser={name:name,mobile:mob};
  err.style.display='none';
  hideLogin();
  updateLoginBtn();
  showToast('Account created! Welcome, '+name+'!');
}

function updateLoginBtn(){
  var btn=document.getElementById('login-nav-btn');
  if(loggedInUser){
    var initials=loggedInUser.name.split(' ').map(function(w){return w[0];}).join('').toUpperCase().slice(0,2);
    btn.className='user-nav-pill';
    btn.innerHTML='<div class="user-avatar">'+initials+'</div><span>'+loggedInUser.name.split(' ')[0]+'</span>';
    btn.onclick=function(){
      if(confirm('Logout from Sahayak?')){
        loggedInUser=null;
        btn.className='login-nav-btn';
        btn.innerHTML='<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><span>Login</span>';
        btn.onclick=showLogin;
        showToast('Logged out successfully');
      }
    };
  }
}

