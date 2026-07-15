const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const deep=x=>JSON.parse(JSON.stringify(x));
const now=()=>new Date().toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"});
const isoNow=()=>new Date().toISOString();
const hoursBetween=(a,b)=>Math.max(0,(new Date(b)-new Date(a))/36e5);

const i18n={
  en:{
    "app.title":"NEXUS — PillowNotes",
    "bd.greeting":"Brain Dump",
    "bd.subtitle":"Unload what's on your mind before sleep.",
    "ws.main":"Main","ws.ideas":"Ideas","ws.research":"Research","ws.pillow":"Pillow",
    "wsTitle.main":"NEXUS / MAIN CANVAS","wsTitle.ideas":"NEXUS / IDEAS","wsTitle.research":"NEXUS / RESEARCH","wsTitle.pillow":"NEXUS / PILLOW",
    "tool.select":"Select (V)","tool.hand":"Hand (H)","tool.note":"Note (N)","tool.shape":"Shape (S)","tool.text":"Text (T)","tool.connect":"Connect (C)","tool.frame":"Frame (F)",
    "toolMode.select":"Select mode","toolMode.hand":"Hand mode","toolMode.note":"Note mode","toolMode.shape":"Shape mode","toolMode.text":"Text mode","toolMode.connect":"Connect mode","toolMode.frame":"Frame mode",
    "status.saved":"Saved","status.saving":"Saving…","fit":"Fit","share":"Share",
    "inspector.select":"Select something","inspector.hint":"Everything on the canvas can be edited.","inspector.selected":"{n} selected","inspector.properties":"PROPERTIES",
    "inspector.title":"Title","inspector.content":"Content","inspector.type":"Type","inspector.accent":"Accent","inspector.duplicate":"Duplicate","inspector.delete":"Delete",
    "ai.agent":"AI AGENT","ai.copilot":"Nexus Copilot","ai.organize":"Organize","ai.brainstorm":"Brainstorm","ai.summarize":"Summarize","ai.plan":"Plan","ai.sleep":"Sleep",
    "ai.context":"CONTEXT","ai.nodesSelected":"{n} nodes selected","ai.contextHint":"Agent can read canvas, dumps and sleep logs.",
    "ai.suggestOrganize":"Organize this canvas","ai.suggestPlan":"Turn ideas into a plan","ai.suggestSleep":"Wind-down plan for tonight","ai.suggestPatterns":"Find hidden patterns",
    "ai.placeholder":"Ask Nexus to create, edit or organize…","ai.promptAnalyze":"Analyze the selected node and suggest the next action.",
    "ai.replyOrganize":"I grouped related nodes into a clearer flow and created a new frame for the launch plan.",
    "ai.replyBrainstorm":"I added three new concept directions around adaptive interfaces, shared memory and agent collaboration.",
    "ai.replySummarize":"This canvas contains {nodes} nodes and {connectors} relationships. The dominant theme is turning ideas into an executable launch plan.",
    "ai.replyPlan":"I converted the selected ideas into a three-step execution plan on the canvas.",
    "ai.replySleep":"Tonight's wind-down: 1) dump remaining thoughts 2) stop screens in 60 min 3) checkpoint bed time. You have {dumps} open dumps and avg sleep {avg}h.",
    "ai.replyDefault":"I can create nodes, organize the canvas, summarize visible content, connect related ideas and plan your wind-down.",
    "ai.concept1":"Adaptive workspace","ai.concept2":"Shared agent memory","ai.concept3":"Multiplayer AI roles","ai.conceptContent":"AI-generated concept direction",
    "ai.stepDefine":"Define","ai.stepPrototype":"Prototype","ai.stepValidate":"Validate",
    "ai.step1":"Choose one core workflow","ai.step2":"Build the interaction","ai.step3":"Test with real users",
    "layers":"Layers","layersSearch":"Search layers…","history":"History",
    "commandPlaceholder":"Type a command or search anything…","command.enter":"ENTER",
    "cmd.createNote":"Create note","cmd.createCard":"Create card","cmd.createText":"Create text","cmd.createFrame":"Create frame",
    "cmd.openAI":"Open AI agent","cmd.fitCanvas":"Fit canvas","cmd.duplicate":"Duplicate selection","cmd.delete":"Delete selection",
    "cmd.group":"Group selection","cmd.export":"Export workspace","cmd.search":"Search nodes","cmd.braindump":"Open Brain Dump","cmd.dump":"New Brain Dump",
    "ctx.edit":"Edit","ctx.duplicate":"Duplicate","ctx.bringFront":"Bring to front","ctx.sendBack":"Send to back",
    "ctx.group":"Group selection","ctx.connect":"Connect from here","ctx.ai":"Ask AI about this","ctx.delete":"Delete",
    "searchPlaceholder":"Search every node…",
    "share.eyebrow":"SHARE WORKSPACE","share.title":"Share or export","share.exportJSON":"Export workspace JSON",
    "share.exportPNG":"Export canvas PNG","share.copyCode":"Copy local share code",
    "settings.eyebrow":"SETTINGS","settings.title":"Workspace preferences","settings.language":"Language",
    "settings.gridSize":"Grid size","settings.snap":"Snap to grid","settings.minimap":"Show minimap","settings.autosave":"Autosave",
    "settings.import":"Import workspace","settings.reset":"Reset workspace",
    "node.newNote":"New note","node.newCard":"New card","node.newText":"Text","node.newFrame":"New frame",
    "node.startTyping":"Start typing…","node.doubleClick":"Double-click to edit","node.copySuffix":" copy","node.group":"Group","node.frame":"FRAME",
    "hist.change":"Change","hist.initial":"Initial state","hist.move":"Move nodes","hist.editContent":"Edit content","hist.resize":"Resize node",
    "hist.editProps":"Edit properties","hist.create":"Create node","hist.duplicate":"Duplicate","hist.delete":"Delete","hist.bringFront":"Bring to front",
    "hist.sendBack":"Send to back","hist.group":"Group selection","hist.connect":"Connect nodes","hist.pan":"Pan canvas",
    "hist.aiOrganize":"AI organize","hist.aiBrainstorm":"AI brainstorm","hist.aiPlan":"AI plan","hist.grid":"Grid size","hist.snap":"Snap setting",
    "hist.minimap":"Minimap setting","hist.autosave":"Autosave setting","hist.lang":"Language","hist.reset":"Reset","hist.switchWs":"Switch workspace",
    "hist.pillow":"PillowNotes update","hist.mode":"Switch mode",
    "toast.nothingUndo":"Nothing to undo","toast.nothingRedo":"Nothing to redo","toast.undone":"Undone","toast.redone":"Redone",
    "toast.selectTwo":"Select at least 2 nodes","toast.selectConnect":"Select another node to connect","toast.shareCopied":"Share code copied",
    "toast.imported":"Workspace imported","toast.invalidFile":"Invalid file","confirm.reset":"Reset entire workspace?",
    "toast.dumpSaved":"Dump saved","toast.dumpCanvas":"Saved and created canvas node","toast.sleepSaved":"Sleep entry saved",
    "toast.bed":"Bedtime checkpoint recorded","toast.wake":"Wakeup checkpoint recorded","toast.stillAwake":"Still Awake noted — previous bed time adjusted",
    "toast.countdownDone":"Countdown finished — time to wind down","toast.synced":"Synced dumps to Pillow canvas","toast.tomorrow":"Parked for tomorrow morning"
  },
  zh:{
    "app.title":"NEXUS — PillowNotes",
    "bd.greeting":"Brain Dump",
    "bd.subtitle":"卸低腦入面嘅嘢，先至瞓得着",
    "ws.main":"主畫布","ws.ideas":"靈感","ws.research":"研究","ws.pillow":"枕頭",
    "wsTitle.main":"NEXUS / 主畫布","wsTitle.ideas":"NEXUS / 靈感","wsTitle.research":"NEXUS / 研究","wsTitle.pillow":"NEXUS / 枕頭區",
    "tool.select":"選取 (V)","tool.hand":"手掌 (H)","tool.note":"筆記 (N)","tool.shape":"卡片 (S)","tool.text":"文字 (T)","tool.connect":"連接 (C)","tool.frame":"框架 (F)",
    "toolMode.select":"選取模式","toolMode.hand":"手掌模式","toolMode.note":"筆記模式","toolMode.shape":"卡片模式","toolMode.text":"文字模式","toolMode.connect":"連接模式","toolMode.frame":"框架模式",
    "status.saved":"已儲存","status.saving":"儲存中…","fit":"適合畫面","share":"分享",
    "inspector.select":"請選取物件","inspector.hint":"畫布上的所有內容都可以編輯。","inspector.selected":"已選取 {n} 個","inspector.properties":"屬性",
    "inspector.title":"標題","inspector.content":"內容","inspector.type":"類型","inspector.accent":"強調色","inspector.duplicate":"複製","inspector.delete":"刪除",
    "ai.agent":"AI 代理","ai.copilot":"Nexus 副駕","ai.organize":"整理","ai.brainstorm":"腦力激盪","ai.summarize":"摘要","ai.plan":"規劃","ai.sleep":"睡眠",
    "ai.context":"情境","ai.nodesSelected":"已選取 {n} 個節點","ai.contextHint":"代理可讀取畫布、Dump 同睡眠紀錄。",
    "ai.suggestOrganize":"整理此畫布","ai.suggestPlan":"將靈感轉為計畫","ai.suggestSleep":"今晚放鬆計劃","ai.suggestPatterns":"找出隱藏模式",
    "ai.placeholder":"請 Nexus 建立、編輯或整理…","ai.promptAnalyze":"分析所選節點並建議下一步行動。",
    "ai.replyOrganize":"我已將相關節點整理成更清晰的流程，並為發布計畫建立了新框架。",
    "ai.replyBrainstorm":"我新增了三個概念方向：自適應工作空間、共享代理記憶與多人 AI 協作。",
    "ai.replySummarize":"此畫布共有 {nodes} 個節點與 {connectors} 條關聯。主題是將靈感轉為可執行的發布計畫。",
    "ai.replyPlan":"我已將所選靈感轉換為畫布上的三步驟執行計畫。",
    "ai.replySleep":"今晚建議：1）先 dump 未倒出嘅諗法 2）60 分鐘後熄螢幕 3）一鍵 checkpoint 瞓覺。你有 {dumps} 則未處理 dump，平均睡眠 {avg} 小時。",
    "ai.replyDefault":"我可以建立節點、整理畫布、摘要內容、連接靈感，同埋幫你計劃風乾放鬆。",
    "ai.concept1":"自適應工作空間","ai.concept2":"共享代理記憶","ai.concept3":"多人 AI 協作","ai.conceptContent":"AI 產生的概念方向",
    "ai.stepDefine":"定義","ai.stepPrototype":"原型","ai.stepValidate":"驗證",
    "ai.step1":"選擇一個核心工作流程","ai.step2":"建立互動原型","ai.step3":"與真實使用者測試",
    "layers":"圖層","layersSearch":"搜尋圖層…","history":"歷史紀錄",
    "commandPlaceholder":"輸入指令或搜尋任何內容…","command.enter":"ENTER",
    "cmd.createNote":"建立筆記","cmd.createCard":"建立卡片","cmd.createText":"建立文字","cmd.createFrame":"建立框架",
    "cmd.openAI":"開啟 AI 代理","cmd.fitCanvas":"適合畫面","cmd.duplicate":"複製選取","cmd.delete":"刪除選取",
    "cmd.group":"群組選取","cmd.export":"匯出工作空間","cmd.search":"搜尋節點","cmd.braindump":"打開 Brain Dump","cmd.dump":"新 Brain Dump",
    "ctx.edit":"編輯","ctx.duplicate":"複製","ctx.bringFront":"移至最上層","ctx.sendBack":"移至最下層",
    "ctx.group":"群組選取","ctx.connect":"從此處連接","ctx.ai":"詢問 AI","ctx.delete":"刪除",
    "searchPlaceholder":"搜尋所有節點…",
    "share.eyebrow":"分享工作空間","share.title":"分享或匯出","share.exportJSON":"匯出工作空間 JSON",
    "share.exportPNG":"匯出畫布 PNG","share.copyCode":"複製本機分享碼",
    "settings.eyebrow":"設定","settings.title":"工作空間偏好","settings.language":"語言",
    "settings.gridSize":"格線大小","settings.snap":"對齊格線","settings.minimap":"顯示小地圖","settings.autosave":"自動儲存",
    "settings.import":"匯入工作空間","settings.reset":"重設工作空間",
    "node.newNote":"新筆記","node.newCard":"新卡片","node.newText":"文字","node.newFrame":"新框架",
    "node.startTyping":"開始輸入…","node.doubleClick":"雙擊以編輯","node.copySuffix":" 副本","node.group":"群組","node.frame":"框架",
    "hist.change":"變更","hist.initial":"初始狀態","hist.move":"移動節點","hist.editContent":"編輯內容","hist.resize":"調整大小",
    "hist.editProps":"編輯屬性","hist.create":"建立節點","hist.duplicate":"複製","hist.delete":"刪除","hist.bringFront":"移至最上層",
    "hist.sendBack":"移至最下層","hist.group":"群組選取","hist.connect":"連接節點","hist.pan":"平移畫布",
    "hist.aiOrganize":"AI 整理","hist.aiBrainstorm":"AI 腦力激盪","hist.aiPlan":"AI 規劃","hist.grid":"格線大小","hist.snap":"對齊設定",
    "hist.minimap":"小地圖設定","hist.autosave":"自動儲存設定","hist.lang":"語言","hist.reset":"重設","hist.switchWs":"切換工作空間",
    "hist.pillow":"PillowNotes 更新","hist.mode":"切換模式",
    "toast.nothingUndo":"沒有可復原的動作","toast.nothingRedo":"沒有可重做的動作","toast.undone":"已復原","toast.redone":"已重做",
    "toast.selectTwo":"請至少選取 2 個節點","toast.selectConnect":"請選取另一個節點以連接","toast.shareCopied":"已複製分享碼",
    "toast.imported":"已匯入工作空間","toast.invalidFile":"無效的檔案","confirm.reset":"確定要重設整個工作空間嗎？",
    "toast.dumpSaved":"已儲存 Dump","toast.dumpCanvas":"已儲存並建立畫布節點","toast.sleepSaved":"已儲存睡眠紀錄",
    "toast.bed":"已記錄瞓覺 Checkpoint","toast.wake":"已記錄起身 Checkpoint","toast.stillAwake":"已記錄 Still Awake — 已調整上次瞓覺時間",
    "toast.countdownDone":"倒數完 — 係時候放鬆","toast.synced":"已同步 Dump 到枕頭畫布","toast.tomorrow":"已留待聽日朝早"
  }
};

function lang(){return state.settings.lang||"zh"}
function t(key,vars={}){let s=(i18n[lang()]||i18n.zh)[key]||i18n.en[key]||key;Object.entries(vars).forEach(([k,v])=>s=s.replace(`{${k}}`,v));return s}
function applyI18n(){
  document.documentElement.lang=lang()==="zh"?"zh-Hant":"en";
  document.title=t("app.title");
  $("#bdGreeting").textContent=t("bd.greeting");
  $("#bdSubtitle").textContent=t("bd.subtitle");
  $$("[data-workspace]").forEach(b=>{const k="ws."+b.dataset.workspace;if(i18n.en[k])b.textContent=t(k)});
  $("#toolHint").textContent=t("toolMode."+tool);
  if($("#langSelect"))$("#langSelect").value=lang();
  if($("#defaultHomeSelect"))$("#defaultHomeSelect").value=state.settings.defaultHome||"braindump";
  if($("#morningPromptToggle"))$("#morningPromptToggle").checked=!!state.settings.morningPrompt;
  updateAIContext();
  renderBrainDump();
}
function setLang(l){state.settings.lang=l;applyI18n();render();save("hist.lang")}

const defaults={
  appMode:"braindump",
  mobileTab:"dump",
  view:{x:-700,y:-500,zoom:1},
  settings:{grid:24,snap:true,minimap:true,autosave:true,lang:null,defaultHome:"braindump",morningPrompt:true},
  activeWorkspace:"main",
  workspaces:{
    main:{
      title:"NEXUS / MAIN CANVAS",
      nodes:[
        {id:"n1",type:"text",title:"Vision",content:"Unload the day.\nProtect the night.",x:980,y:620,w:440,h:150,z:5,color:"#8b7cff"},
        {id:"n2",type:"note",title:"CORE IDEA",content:"PillowNotes × NEXUS：以 Brain Dump 即時卸荷，幫香港都市人瞓得更好。",x:820,y:860,w:320,h:200,z:4,color:"#ffd56a"},
        {id:"n3",type:"card",title:"PRODUCT",content:"• Brain Dump 主介面\n• Brain Dump\n• Sleep journal\n• 10-3-2-1-0\n• Canvas bridge",x:1220,y:900,w:280,h:220,z:4,color:"#68e1d1"},
        {id:"n4",type:"idea",title:"HK EDGE",content:"彈性 OT 倒數 · 煩惱標籤 · 粵語語氣 · 日間即時捕捉",x:1510,y:700,w:320,h:180,z:4,color:"#ff8eaa"},
        {id:"n5",type:"frame",title:"Launch Plan",content:"FRAME",x:740,y:1170,w:720,h:420,z:1,color:"#91e17c"},
        {id:"n6",type:"card",title:"WEEK 1",content:"Brain Dump MVP",x:800,y:1250,w:220,h:150,z:3,color:"#91e17c"},
        {id:"n7",type:"card",title:"WEEK 2",content:"Canvas + AI sleep coach",x:1080,y:1250,w:220,h:150,z:3,color:"#8b7cff"},
        {id:"n8",type:"card",title:"WEEK 3",content:"Demo story + polish",x:1080,y:1430,w:220,h:130,z:3,color:"#ff8eaa"}
      ],
      connectors:[
        {id:"c1",from:"n2",to:"n3"},{id:"c2",from:"n3",to:"n4"},
        {id:"c3",from:"n6",to:"n7"},{id:"c4",from:"n7",to:"n8"}
      ]
    },
    ideas:{title:"NEXUS / IDEAS",nodes:[],connectors:[]},
    research:{title:"NEXUS / RESEARCH",nodes:[],connectors:[]},
    pillow:{title:"NEXUS / PILLOW",nodes:[],connectors:[]}
  },
  pillownotes:{
    dumps:[],
    sleepEntries:[],
    checkpoints:[],
    stillAwake:[],
    protocols:[],
    pendingTomorrow:[],
    settings:{flexCountdownMinutes:30}
  }
};

let state=load();
let history=[],future=[],selected=new Set(),tool="select",drag=null,resize=null,pan=null,selection=null,connectFrom=null,zCounter=20,agentMode="organize",contextNode=null;
let activeTags=new Set();
let pillowCountdown=null;
const viewport=$("#canvasViewport"),world=$("#canvasWorld"),nodeLayer=$("#nodeLayer"),svg=$("#connectorLayer");

function load(){
  try{
    const raw=JSON.parse(localStorage.getItem("nexusOS")||"{}");
    const s={...deep(defaults),...raw};
    s.settings={...deep(defaults.settings),...(raw.settings||{})};
    s.pillownotes={...deep(defaults.pillownotes),...(raw.pillownotes||{})};
    s.workspaces={...deep(defaults.workspaces),...(raw.workspaces||{})};
    if(!s.workspaces.pillow)s.workspaces.pillow=deep(defaults.workspaces.pillow);
    if(!s.settings.lang)s.settings.lang=/^zh/i.test(navigator.language||"")?"zh":"en";
    if(!s.settings.defaultHome)s.settings.defaultHome="braindump";
    if(s.settings.defaultHome==="bringdown")s.settings.defaultHome="braindump";
    if(s.appMode==="bringdown")s.appMode="braindump";
    if(!s.appMode)s.appMode=s.settings.defaultHome||"braindump";
    // migrate old dumps shape
    s.pillownotes.dumps=(s.pillownotes.dumps||[]).map(d=>({
      id:d.id||uid(),
      text:d.text||"",
      tags:d.tags||[],
      createdAt:d.createdAt||isoNow(),
      toCanvas:!!d.toCanvas,
      forTomorrow:!!d.forTomorrow,
      nodeId:d.nodeId||null
    }));
    s.pillownotes.sleepEntries=(s.pillownotes.sleepEntries||[]).map(e=>({
      id:e.id||uid(),
      start:e.start,end:e.end,quality:e.quality||2,
      note:e.note||"",
      createdAt:e.createdAt||isoNow(),
      durationHours:e.durationHours??hoursBetween(e.start,e.end),
      stillAwake:!!e.stillAwake
    }));
    return s;
  }catch(e){
    const s=deep(defaults);
    s.settings.lang=/^zh/i.test(navigator.language||"")?"zh":"en";
    return s;
  }
}
function ws(){return state.workspaces[state.activeWorkspace]}
function wsTitle(){return t("wsTitle."+state.activeWorkspace)}
function save(label="hist.change"){
  if(state.settings.autosave){
    localStorage.setItem("nexusOS",JSON.stringify(state));
    const el=$("#saveStatus");
    if(el){el.textContent=t("status.saved");setTimeout(()=>el.textContent=t("status.saved"),300)}
  }
  if(label){
    history.unshift({label:t(label),time:now(),snapshot:deep(state)});
    history=history.slice(0,50);future=[];renderHistory();
  }
}
function toast(msg){const x=$("#toast");x.textContent=msg;x.classList.add("show");clearTimeout(window.tt);window.tt=setTimeout(()=>x.classList.remove("show"),2400)}
function snap(v){return state.settings.snap?Math.round(v/state.settings.grid)*state.settings.grid:v}
function screenToWorld(clientX,clientY){const r=viewport.getBoundingClientRect();return{x:(clientX-r.left-state.view.x)/state.view.zoom,y:(clientY-r.top-state.view.y)/state.view.zoom}}
function applyView(){world.style.transform=`translate(${state.view.x}px,${state.view.y}px) scale(${state.view.zoom})`;$("#zoomLabel").textContent=Math.round(state.view.zoom*100)+"%";renderMinimap()}
function setTool(name){tool=name;$$("[data-tool]").forEach(b=>b.classList.toggle("active",b.dataset.tool===name));$("#toolHint").textContent=t("toolMode."+name);viewport.style.cursor=name==="hand"?"grab":name==="connect"?"crosshair":"default"}
$$("[data-tool]").forEach(b=>b.onclick=()=>setTool(b.dataset.tool));

/* ========== APP MODE: Brain Dump default ========== */
function setAppMode(mode, opts={}){
  state.appMode=mode;
  const app=$("#app");
  app.classList.toggle("mode-braindump",mode==="braindump");
  app.classList.toggle("mode-canvas",mode==="canvas");
  $$("[data-app-mode]").forEach(b=>b.classList.toggle("active",b.dataset.appMode===mode));
  const dock=$("#mobileCanvasDock");
  if(dock) dock.hidden = mode!=="canvas";
  if(mode==="canvas"){
    if(!opts.skipTab) setMobileTab("canvas", {skipMode:true});
    render();
    setTimeout(fitCanvas,50);
  }else{
    if(!opts.skipTab){
      const tab = opts.tab || (state.mobileTab && state.mobileTab!=="canvas" ? state.mobileTab : "dump");
      setMobileTab(tab, {skipMode:true});
    }
    renderBrainDump();
  }
  if(!opts.silent) save("hist.mode");
}

function setMobileTab(tab, opts={}){
  state.mobileTab = tab;
  const app=$("#app");
  if(app) app.dataset.mobileTab = tab;
  $$("[data-mobile-tab]").forEach(b=>{
    if(b.classList.contains("mtab") || b.hasAttribute("data-mobile-tab")){
      // only tabbar buttons
    }
  });
  $$(".mtab").forEach(b=>b.classList.toggle("active", b.dataset.mobileTab===tab));
  // sync header greeting context
  const titles = {
    dump: {zh:["Brain Dump","卸低腦入面嘅嘢，先至瞓得着"], en:["Brain Dump","Unload what's on your mind before sleep."]},
    sleep: {zh:["睡眠","Checkpoint + 日記，一鍵跟蹤作息"], en:["Sleep","Checkpoints and journal in one place"]},
    wind: {zh:["放鬆倒數","10-3-2-1-0 · 彈性 OT 倒數"], en:["Wind-down","10-3-2-1-0 and flexible OT countdown"]},
    more: {zh:["更多","重構、晨間回顧、畫布同步"], en:["More","Reframe, morning review, canvas bridge"]},
    canvas: {zh:["畫布","整理 Dump 成計劃"], en:["Canvas","Turn dumps into a plan"]}
  };
  const pack = (titles[tab]||titles.dump)[lang()==="zh"?"zh":"en"];
  if($("#bdGreeting") && tab!=="canvas"){ $("#bdGreeting").textContent = pack[0]; $("#bdSubtitle").textContent = pack[1]; }
  if(tab==="canvas"){
    if(!opts.skipMode) setAppMode("canvas", {skipTab:true, silent:!!opts.silent});
  }else{
    if(!opts.skipMode && state.appMode!=="braindump") setAppMode("braindump", {skipTab:true, silent:!!opts.silent, tab});
    // scroll panel into view top
    const view=$("#brainDumpView"); if(view) view.scrollTop=0;
  }
  if(!opts.silent){
    try{ localStorage.setItem("nexusMobileTab", tab) }catch(e){}
  }
}
$$("[data-app-mode]").forEach(b=>b.onclick=()=>setAppMode(b.dataset.appMode));
$("#homeBtn").onclick=()=>setMobileTab("dump");
if($("#bdToCanvas")) $("#bdToCanvas").onclick=()=>setMobileTab("canvas");
if($("#backToBrainDump")) $("#backToBrainDump").onclick=()=>setMobileTab("dump");
if($("#bdLangQuick")) $("#bdLangQuick").onclick=()=>setLang(lang()==="zh"?"en":"zh");
if($("#bdSettingsQuick")) $("#bdSettingsQuick").onclick=()=>$("#settingsModal").classList.add("open");
$$(".mtab").forEach(b=>b.onclick=()=>setMobileTab(b.dataset.mobileTab));
// mobile canvas dock mirrors tools
if($("#mAiBtn")) $("#mAiBtn").onclick=()=>openAI();
if($("#mFitBtn")) $("#mFitBtn").onclick=()=>fitCanvas();
if($("#mUndoBtn")) $("#mUndoBtn").onclick=()=>undo();
// PWA install prompt
let deferredInstall=null;
window.addEventListener("beforeinstallprompt", e=>{e.preventDefault();deferredInstall=e;const btn=$("#installPwaBtn");if(btn){btn.hidden=false}});
if($("#installPwaBtn")) $("#installPwaBtn").onclick=async()=>{
  if(!deferredInstall){toast(lang()==="zh"?"用瀏覽器選單「加到主畫面」":"Use browser menu: Add to Home Screen");return}
  deferredInstall.prompt();await deferredInstall.userChoice;deferredInstall=null;const btn=$("#installPwaBtn");if(btn)btn.hidden=true;
};

/* ========== BRAIN DUMP / PILLOWNOTES ========== */
function selectedTags(){return [...activeTags]}
$$("#worryTags .tag").forEach(b=>b.onclick=()=>{
  const tag=b.dataset.tag;
  if(activeTags.has(tag)){activeTags.delete(tag);b.classList.remove("active")}
  else{activeTags.add(tag);b.classList.add("active")}
});

function addDump({text,toCanvas=false,forTomorrow=false}){
  const item={id:uid(),text,tags:selectedTags(),createdAt:isoNow(),toCanvas:false,forTomorrow,nodeId:null};
  if(toCanvas){
    ensurePillowWs();
    const node=createNodeOn("pillow","note",900+Math.random()*120,700+state.pillownotes.dumps.length*40,{
      title:"Dump · "+text.split("\n")[0].slice(0,28),
      content:text+(item.tags.length?"\n#"+item.tags.join(" #"):""),
      color:"#ffd56a"
    });
    item.toCanvas=true;item.nodeId=node.id;
  }
  state.pillownotes.dumps.unshift(item);
  if(forTomorrow)state.pillownotes.pendingTomorrow.unshift({id:item.id,text,createdAt:item.createdAt});
  $("#pillowDump").value="";
  activeTags.clear();$$("#worryTags .tag").forEach(x=>x.classList.remove("active"));
  save("hist.pillow");
  renderBrainDump();
  return item;
}

$("#savePillowDump").onclick=()=>{
  const v=$("#pillowDump").value.trim();
  if(!v)return toast(lang()==="zh"?"未有內容":"Nothing to save");
  addDump({text:v});toast(t("toast.dumpSaved"));
};
$("#dumpToCanvas").onclick=()=>{
  const v=$("#pillowDump").value.trim();
  if(!v)return toast(lang()==="zh"?"未有內容":"Nothing to create");
  addDump({text:v,toCanvas:true});toast(t("toast.dumpCanvas"));
};
$("#dumpToTomorrow").onclick=()=>{
  const v=$("#pillowDump").value.trim();
  if(!v)return toast(lang()==="zh"?"未有內容":"Nothing to park");
  addDump({text:v,forTomorrow:true});toast(t("toast.tomorrow"));
};

function ensurePillowWs(){
  if(!state.workspaces.pillow)state.workspaces.pillow={title:"NEXUS / PILLOW",nodes:[],connectors:[]};
}
function createNodeOn(wsKey,type,x,y,extra={}){
  const map={note:["note",260,160],shape:["card",240,160],card:["card",240,160],text:["text",300,100],frame:["frame",500,320],idea:["idea",260,160]};
  const [tt,w,h]=map[type]||map.note;
  const n={id:uid(),type:tt,title:extra.title||t("node.newNote"),content:extra.content||t("node.startTyping"),x:snap(x),y:snap(y),w:extra.w||w,h:extra.h||h,z:++zCounter,color:extra.color||"#8b7cff"};
  state.workspaces[wsKey].nodes.push(n);
  return n;
}

$("#syncDumpsToCanvas").onclick=()=>{
  ensurePillowWs();
  let n=0;
  state.pillownotes.dumps.forEach((d,i)=>{
    if(d.toCanvas)return;
    const node=createNodeOn("pillow","note",860+(i%3)*300,720+Math.floor(i/3)*200,{
      title:"Dump · "+d.text.split("\n")[0].slice(0,28),
      content:d.text+(d.tags?.length?"\n#"+d.tags.join(" #"):""),
      color:"#ffd56a"
    });
    d.toCanvas=true;d.nodeId=node.id;n++;
  });
  save("hist.pillow");
  renderBrainDump();
  toast(t("toast.synced")+(n?` (${n})`:""));
  setAppMode("canvas");
  state.activeWorkspace="pillow";
  $$("[data-workspace]").forEach(x=>x.classList.toggle("active",x.dataset.workspace==="pillow"));
  render();setTimeout(fitCanvas,80);
};

/* Sleep journal */
$("#saveSleepEntry").onclick=()=>{
  const s=$("#sleepStart").value,e=$("#sleepEnd").value,q=+$("#sleepQuality").value,note=$("#sleepNote").value.trim();
  if(!s||!e)return toast(lang()==="zh"?"請設定起止時間":"Please set start and end");
  const today=new Date();
  let start=new Date(today.toDateString()+" "+s);
  let end=new Date(today.toDateString()+" "+e);
  if(end<=start)end.setDate(end.getDate()+1);
  const item={id:uid(),start:start.toISOString(),end:end.toISOString(),quality:q,note,createdAt:isoNow(),durationHours:(end-start)/36e5,stillAwake:false};
  state.pillownotes.sleepEntries.unshift(item);
  save("hist.pillow");toast(t("toast.sleepSaved"));renderBrainDump();
};
$("#editLastSleep").onclick=()=>{
  const arr=state.pillownotes.sleepEntries;
  if(!arr.length)return toast(lang()==="zh"?"未有紀錄":"No entries yet");
  const last=arr[0];
  const note=prompt(lang()==="zh"?"編輯備註 / 質素 1-3（格式：備註 | 質素）":"Edit note | quality 1-3",`${last.note||""} | ${last.quality}`);
  if(note==null)return;
  const parts=note.split("|").map(x=>x.trim());
  last.note=parts[0]||"";
  if(parts[1]&&[1,2,3].includes(+parts[1]))last.quality=+parts[1];
  save("hist.pillow");renderBrainDump();toast(t("toast.sleepSaved"));
};
$("#showSleepStats").onclick=()=>renderSleepStats(true);

function avgSleep(){
  const arr=state.pillownotes.sleepEntries;
  if(!arr.length)return 0;
  return arr.reduce((s,x)=>s+x.durationHours,0)/arr.length;
}
function renderSleepStats(force){
  const box=$("#sleepStats");
  const arr=state.pillownotes.sleepEntries;
  if(!arr.length){box.innerHTML=lang()==="zh"?"未有睡眠紀錄":"No entries yet";drawSleepChart([]);return}
  const avg=avgSleep();
  const good=arr.filter(x=>x.quality>=3).length;
  box.innerHTML=`<div><b>${arr.length}</b> ${lang()==="zh"?"筆紀錄":"entries"}</div>
    <div>${lang()==="zh"?"平均睡眠":"Avg sleep"}: <b>${avg.toFixed(2)}h</b></div>
    <div>${lang()==="zh"?"優質夜晚":"Good nights"}: <b>${good}</b></div>
    <div>${lang()==="zh"?"最近":"Last"}: ${new Date(arr[0].createdAt).toLocaleString()}</div>`;
  drawSleepChart(arr.slice(0,14).reverse());
  if(force)toast(lang()==="zh"?"已更新統計":"Stats updated");
}
function drawSleepChart(arr){
  const c=$("#sleepChart");if(!c)return;
  const ctx=c.getContext("2d"),w=c.width,h=c.height;
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle="#0f1418";ctx.fillRect(0,0,w,h);
  if(!arr.length){
    ctx.fillStyle="#667180";ctx.font="14px sans-serif";
    ctx.fillText(lang()==="zh"?"儲存紀錄後顯示趨勢":"Save entries to see trend",16,h/2);
    return;
  }
  const maxH=Math.max(8,...arr.map(x=>x.durationHours));
  const pad=24,bw=(w-pad*2)/arr.length;
  arr.forEach((e,i)=>{
    const bh=(e.durationHours/maxH)*(h-pad*2);
    const x=pad+i*bw+4,y=h-pad-bh;
    ctx.fillStyle=e.quality>=3?"#91e17c":e.quality===2?"#ffd56a":"#ff8eaa";
    ctx.fillRect(x,y,Math.max(8,bw-10),bh);
  });
  ctx.strokeStyle="rgba(255,255,255,.08)";ctx.beginPath();ctx.moveTo(pad,h-pad);ctx.lineTo(w-pad,h-pad);ctx.stroke();
}

/* Checkpoints + Still Awake */
function renderCheckpoints(){
  const cps=state.pillownotes.checkpoints||[];
  const last=cps[0];
  const el=$("#checkpointStatus");
  if(!last){el.textContent=lang()==="zh"?"今日未有 checkpoint":"No checkpoint yet today";return}
  const label=last.type==="bed"?(lang()==="zh"?"瞓覺":"Bed"):(lang()==="zh"?"起身":"Wake");
  el.textContent=`${lang()==="zh"?"最近":"Last"} ${label}: ${new Date(last.time).toLocaleString()}${last.stillAwake?" · Still Awake":""}`;
}
$("#bedCheckpoint").onclick=()=>{
  state.pillownotes.checkpoints.unshift({type:"bed",time:isoNow()});
  // auto fill sleep start
  const d=new Date();$("#sleepStart").value=String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0");
  save("hist.pillow");toast(t("toast.bed"));renderBrainDump();
};
$("#wakeCheckpoint").onclick=()=>{
  state.pillownotes.checkpoints.unshift({type:"wake",time:isoNow()});
  const d=new Date();$("#sleepEnd").value=String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0");
  // if previous bed exists, auto-create sleep entry
  const bed=state.pillownotes.checkpoints.find(c=>c.type==="bed");
  if(bed){
    const start=new Date(bed.time),end=new Date();
    if(end>start){
      state.pillownotes.sleepEntries.unshift({
        id:uid(),start:start.toISOString(),end:end.toISOString(),
        quality:2,note:"auto from checkpoint",createdAt:isoNow(),
        durationHours:(end-start)/36e5,stillAwake:false
      });
    }
  }
  save("hist.pillow");toast(t("toast.wake"));renderBrainDump();
};
$("#stillAwakeBtn").onclick=()=>{
  const nowIso=isoNow();
  state.pillownotes.stillAwake.unshift({time:nowIso});
  // adjust last bed checkpoint / last sleep entry
  const bed=state.pillownotes.checkpoints.find(c=>c.type==="bed");
  if(bed){bed.time=nowIso;bed.stillAwake=true}
  const lastSleep=state.pillownotes.sleepEntries[0];
  if(lastSleep && !lastSleep.end){/* n/a */}
  // if last sleep was created today with start earlier, mark stillAwake and shift start
  if(lastSleep){
    lastSleep.stillAwake=true;
    lastSleep.start=nowIso;
    if(lastSleep.end)lastSleep.durationHours=hoursBetween(lastSleep.start,lastSleep.end);
  }
  state.pillownotes.checkpoints.unshift({type:"bed",time:nowIso,stillAwake:true});
  const d=new Date();$("#sleepStart").value=String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0");
  save("hist.pillow");toast(t("toast.stillAwake"));renderBrainDump();
};

/* Countdown + 10-3-2-1-0 */
const protocolLabels={
  zh:{10:"10 小時前：停咖啡 / 刺激物",3:"3 小時前：停大餐 / 飲酒",2:"2 小時前：收工 · 卸低工作訊息",1:"1 小時前：熄螢幕 / 藍光",0:"0：瞓覺 · 按 Checkpoint"},
  en:{10:"10h: stop caffeine",3:"3h: stop heavy meals",2:"2h: stop work messages",1:"1h: screens off",0:"0: sleep · hit checkpoint"}
};
$$("[data-protocol]").forEach(b=>b.onclick=()=>{
  const p=b.dataset.protocol;
  const msg=(protocolLabels[lang()]||protocolLabels.en)[p];
  state.pillownotes.protocols.unshift({step:p,time:isoNow()});
  $("#countdownDisplay").textContent=msg;
  if(p==="0")$("#bedCheckpoint").click();
  if(p==="2"){
    // prompt dump work messages
    $("#pillowDump").focus();
    $("#pillowDump").placeholder=lang()==="zh"?"收工 Dump：有咩工作訊息未卸低？":"Off-work dump: any messages left in your head?";
  }
  save("hist.pillow");
  toast(msg);
});
function startCountdown(mins){
  if(pillowCountdown&&pillowCountdown.timer)clearInterval(pillowCountdown.timer);
  const end=Date.now()+mins*60000;
  $("#countdownDisplay").textContent=`Countdown: ${mins}m`;
  pillowCountdown={end,mins};
  pillowCountdown.timer=setInterval(()=>{
    const rem=Math.max(0,Math.round((end-Date.now())/1000));
    if(rem<=0){
      clearInterval(pillowCountdown.timer);pillowCountdown=null;
      $("#countdownDisplay").textContent="✓ "+t("toast.countdownDone");
      toast(t("toast.countdownDone"));
      save("hist.pillow");
      return;
    }
    const mm=Math.floor(rem/60),ss=rem%60;
    $("#countdownDisplay").textContent=`Countdown: ${mm}m ${String(ss).padStart(2,"0")}s`;
  },500);
}
$$("[data-countdown]").forEach(b=>b.onclick=()=>startCountdown(+b.dataset.countdown));
$("#flexCountdown").onclick=()=>{
  const v=prompt(lang()==="zh"?"彈性倒數（分鐘）— 適合 OT 收工時間不定":"Flexible countdown (minutes)",state.pillownotes.settings.flexCountdownMinutes);
  const m=Number(v);if(!m||m<=0)return;
  state.pillownotes.settings.flexCountdownMinutes=m;
  startCountdown(m);save("hist.pillow");
};

/* Cognitive reframe + morning review */
$("#runReframe").onclick=()=>{
  const thought=$("#reframeInput").value.trim();
  if(!thought)return toast(lang()==="zh"?"先寫一句想法":"Write a thought first");
  const templates=lang()==="zh"?[
    `呢個諗法好正常，但唔等於事實。你可以改成：「我可以準備到最好，結果唔完全由我控制。」`,
    `將「一定會搞砸」改寫成：「我之前都處理過類似情況，今晚先休息，聽日再應對。」`,
    `把焦點由災難 foresight 轉成可控行動：寫低聽日第一個 10 分鐘步驟，然後 Brain Dump。`
  ]:[
    `This thought is valid, but not a fact. Try: "I can prepare well; outcomes aren't fully mine to control."`,
    `Rewrite catastrophe into: "I've handled similar situations. Rest now, respond tomorrow."`,
    `Shift from doom forecast to one controllable action: write tomorrow's first 10-minute step, then Brain Dump.`
  ];
  const reply=templates[Math.floor(Math.random()*templates.length)];
  $("#reframeOutput").innerHTML=`<strong>${lang()==="zh"?"原想法":"Thought"}</strong><p>${escape(thought)}</p><strong>${lang()==="zh"?"重構":"Reframe"}</strong><p>${escape(reply)}</p>`;
  // also save as dump
  state.pillownotes.dumps.unshift({id:uid(),text:`[Reframe] ${thought}\n→ ${reply}`,tags:["健康"],createdAt:isoNow(),toCanvas:false,forTomorrow:false,nodeId:null});
  save("hist.pillow");renderDumpList();
};
$("#morningReviewBtn").onclick=runMorningReview;
function runMorningReview(){
  const pending=state.pillownotes.pendingTomorrow||[];
  const dumps=state.pillownotes.dumps.slice(0,5);
  const sleep=state.pillownotes.sleepEntries[0];
  const lines=[];
  lines.push(lang()==="zh"?`早晨。昨晚平均相關睡眠：${sleep?sleep.durationHours.toFixed(1)+"h（質素 "+sleep.quality+"/3）":"未有紀錄"}`:`Morning. Last sleep: ${sleep?sleep.durationHours.toFixed(1)+"h (quality "+sleep.quality+"/3)":"no entry"}`);
  if(pending.length){
    lines.push(lang()==="zh"?`你留咗 ${pending.length} 則「聽日再處理」：`:`You parked ${pending.length} for today:`);
    pending.slice(0,5).forEach((p,i)=>lines.push(`${i+1}. ${p.text.slice(0,80)}`));
  }else if(dumps.length){
    lines.push(lang()==="zh"?"最近 Dump：":"Recent dumps:");
    dumps.forEach((d,i)=>lines.push(`${i+1}. ${d.text.slice(0,80)}`));
  }else{
    lines.push(lang()==="zh"?"未有待處理事項 — 可以開畫布開始今日計劃。":"Nothing pending — open canvas to plan today.");
  }
  $("#morningReview").innerHTML=lines.map(l=>`<p>${escape(l)}</p>`).join("");
  // clear pending after review
  if(pending.length){state.pillownotes.pendingTomorrow=[];save("hist.pillow")}
}
$("#openAIFromBD").onclick=()=>{setAppMode("canvas");openAI()};

function renderDumpList(){
  const list=$("#dumpList");
  const dumps=state.pillownotes.dumps.slice(0,12);
  $("#dumpCountChip").textContent=`${state.pillownotes.dumps.length} ${lang()==="zh"?"則":""}`;
  if(!dumps.length){list.innerHTML=`<div class="muted-line">${lang()==="zh"?"未有 dump — 由上面開始寫":"No dumps yet"}</div>`;return}
  list.innerHTML=dumps.map(d=>`<div class="dump-item" data-dump="${d.id}">
    <div class="dump-meta">
      <span>${new Date(d.createdAt).toLocaleString()}</span>
      <span>${(d.tags||[]).map(t=>`#${t}`).join(" ")}</span>
      ${d.toCanvas?'<span class="bd-chip mini">canvas</span>':''}
      ${d.forTomorrow?'<span class="bd-chip mini">tomorrow</span>':''}
    </div>
    <div class="dump-text">${escape(d.text)}</div>
    <div class="dump-item-actions">
      <button data-dump-canvas="${d.id}">→ Canvas</button>
      <button data-dump-del="${d.id}">Delete</button>
    </div>
  </div>`).join("");
  $$("[data-dump-canvas]").forEach(b=>b.onclick=()=>{
    const d=state.pillownotes.dumps.find(x=>x.id===b.dataset.dumpCanvas);if(!d||d.toCanvas)return;
    ensurePillowWs();
    const node=createNodeOn("pillow","note",900,800,{title:"Dump · "+d.text.split("\n")[0].slice(0,28),content:d.text,color:"#ffd56a"});
    d.toCanvas=true;d.nodeId=node.id;save("hist.pillow");renderBrainDump();toast(t("toast.dumpCanvas"));
  });
  $$("[data-dump-del]").forEach(b=>b.onclick=()=>{
    state.pillownotes.dumps=state.pillownotes.dumps.filter(x=>x.id!==b.dataset.dumpDel);
    save("hist.pillow");renderBrainDump();
  });
}
function renderSleepList(){
  const list=$("#sleepList");
  const arr=state.pillownotes.sleepEntries.slice(0,8);
  if(!arr.length){list.innerHTML="";return}
  list.innerHTML=arr.map(e=>`<div class="sleep-item">
    <span>${new Date(e.start).toLocaleDateString()} · ${e.durationHours.toFixed(1)}h</span>
    <span>${"★".repeat(e.quality)}${"☆".repeat(3-e.quality)}</span>
    <span>${escape(e.note||"")}${e.stillAwake?" · Still Awake":""}</span>
  </div>`).join("");
}
function renderBridgeStats(){
  const open=state.pillownotes.dumps.filter(d=>!d.toCanvas).length;
  const total=state.pillownotes.dumps.length;
  const sleepN=state.pillownotes.sleepEntries.length;
  const cps=state.pillownotes.checkpoints.length;
  $("#bridgeStats").innerHTML=`
    <div class="bridge-pill"><b>${open}</b><span>${lang()==="zh"?"未同步 Dump":"Open dumps"}</span></div>
    <div class="bridge-pill"><b>${total}</b><span>${lang()==="zh"?"總 Dump":"Total dumps"}</span></div>
    <div class="bridge-pill"><b>${sleepN}</b><span>${lang()==="zh"?"睡眠紀錄":"Sleep logs"}</span></div>
    <div class="bridge-pill"><b>${cps}</b><span>Checkpoints</span></div>
    <div class="bridge-pill"><b>${avgSleep()?avgSleep().toFixed(1)+"h":"—"}</b><span>${lang()==="zh"?"平均睡眠":"Avg sleep"}</span></div>`;
}
function renderBrainDump(){
  renderDumpList();
  renderSleepStats(false);
  renderSleepList();
  renderCheckpoints();
  renderBridgeStats();
}

/* ========== CANVAS (existing core) ========== */
function render(){
  $("#workspaceTitle").textContent=wsTitle();
  nodeLayer.innerHTML=ws().nodes.sort((a,b)=>a.z-b.z).map(n=>nodeHTML(n)).join("");
  bindNodes();renderConnectors();renderLayers();renderInspector();updateAIContext();applyView();
}
function nodeHTML(n){return`<article class="workspace-node node-${n.type} ${selected.has(n.id)?"selected":""}" data-node="${n.id}" style="left:${n.x}px;top:${n.y}px;width:${n.w}px;height:${n.h}px;z-index:${n.z}">
  <header class="node-header"><strong>${escape(n.title)}</strong><button data-node-menu="${n.id}">•••</button></header>
  <div class="node-content" contenteditable="${selected.has(n.id)}" spellcheck="false">${escape(n.content)}</div>
  <span class="port port-left" data-port="left"></span><span class="port port-right" data-port="right"></span><span class="resize-handle"></span>
</article>`}
function escape(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function bindNodes(){
  $$(".workspace-node").forEach(el=>{
    const id=el.dataset.node,node=ws().nodes.find(n=>n.id===id),content=el.querySelector(".node-content"),handle=el.querySelector(".resize-handle");
    el.onpointerdown=e=>{
      if(e.button===2)return;
      if(tool==="connect"){startOrFinishConnection(id);e.stopPropagation();return}
      if(e.target.matches(".resize-handle,.port"))return;
      if(e.target.isContentEditable&&selected.has(id))return;
      if(!e.shiftKey&&!selected.has(id))selected.clear();
      selected.add(id);selectRender();
      if(tool==="hand")return;
      const p=screenToWorld(e.clientX,e.clientY);
      drag={start:p,orig:[...selected].map(sid=>{const n=ws().nodes.find(x=>x.id===sid);return{id:sid,x:n.x,y:n.y}}),pointerId:e.pointerId};
      el.setPointerCapture(e.pointerId);el.classList.add("dragging");e.stopPropagation();
    };
    el.onpointermove=e=>{
      if(!drag||drag.pointerId!==e.pointerId)return;
      const p=screenToWorld(e.clientX,e.clientY),dx=p.x-drag.start.x,dy=p.y-drag.start.y;
      drag.orig.forEach(o=>{const n=ws().nodes.find(x=>x.id===o.id);n.x=snap(o.x+dx);n.y=snap(o.y+dy)});
      renderPositions();renderConnectors();renderMinimap();
    };
    el.onpointerup=e=>{if(drag&&drag.pointerId===e.pointerId){drag=null;el.classList.remove("dragging");save("hist.move");renderLayers()}};
    el.oncontextmenu=e=>{e.preventDefault();if(!selected.has(id)){selected.clear();selected.add(id);selectRender()}contextNode=id;openContext(e.clientX,e.clientY)};
    el.ondblclick=e=>{selected.clear();selected.add(id);selectRender();content.focus();document.execCommand("selectAll",false,null);e.stopPropagation()};
    content.oninput=()=>{node.content=content.innerText;$("#saveStatus").textContent=t("status.saving")};
    content.onblur=()=>save("hist.editContent");
    handle.onpointerdown=e=>{e.stopPropagation();resize={id,startX:e.clientX,startY:e.clientY,w:node.w,h:node.h,pointerId:e.pointerId};handle.setPointerCapture(e.pointerId)};
    handle.onpointermove=e=>{if(!resize||resize.pointerId!==e.pointerId)return;node.w=Math.max(120,resize.w+(e.clientX-resize.startX)/state.view.zoom);node.h=Math.max(70,resize.h+(e.clientY-resize.startY)/state.view.zoom);el.style.width=node.w+"px";el.style.height=node.h+"px";renderConnectors();renderMinimap()};
    handle.onpointerup=e=>{if(resize){resize=null;save("hist.resize")}};
    el.querySelector("[data-node-menu]").onclick=e=>{e.stopPropagation();selected.clear();selected.add(id);selectRender();contextNode=id;const r=e.target.getBoundingClientRect();openContext(r.left,r.bottom+4)};
  });
}
function renderPositions(){$$(".workspace-node").forEach(el=>{const n=ws().nodes.find(x=>x.id===el.dataset.node);el.style.left=n.x+"px";el.style.top=n.y+"px"})}
function selectRender(){$$(".workspace-node").forEach(el=>el.classList.toggle("selected",selected.has(el.dataset.node)));renderInspector();updateAIContext();renderConnectors()}
function renderConnectors(){
  svg.innerHTML=ws().connectors.map(c=>{const a=ws().nodes.find(n=>n.id===c.from),b=ws().nodes.find(n=>n.id===c.to);if(!a||!b)return"";const x1=a.x+a.w,y1=a.y+a.h/2,x2=b.x,y2=b.y+b.h/2,dx=Math.max(80,Math.abs(x2-x1)*.45);return`<path class="connector ${(selected.has(a.id)&&selected.has(b.id))?"selected":""}" d="M ${x1} ${y1} C ${x1+dx} ${y1}, ${x2-dx} ${y2}, ${x2} ${y2}"/>`}).join("");
}
function renderInspector(){
  if(selected.size!==1){$("#inspector").innerHTML=`<div class="inspector-empty"><span>✦</span><h3>${selected.size?t("inspector.selected",{n:selected.size}):t("inspector.select")}</h3><p>${t("inspector.hint")}</p></div>`;return}
  const id=[...selected][0],n=ws().nodes.find(x=>x.id===id);
  $("#inspector").innerHTML=`<div class="inspector-form"><span class="eyebrow">${t("inspector.properties")}</span>
  <label>${t("inspector.title")}<input id="propTitle" value="${escape(n.title)}"></label>
  <label>${t("inspector.content")}<textarea id="propContent" rows="7">${escape(n.content)}</textarea></label>
  <label>${t("inspector.type")}<select id="propType">${["note","card","idea","frame","text"].map(tp=>`<option ${tp===n.type?"selected":""}>${tp}</option>`).join("")}</select></label>
  <label>${t("inspector.accent")}<input id="propColor" type="color" value="${n.color||"#8b7cff"}"></label>
  <div class="inspector-actions"><button id="duplicateProp">${t("inspector.duplicate")}</button><button id="deleteProp" class="danger">${t("inspector.delete")}</button></div>
  </div>`;
  $("#propTitle").oninput=e=>{n.title=e.target.value;renderNodeOnly(n.id)};
  $("#propContent").oninput=e=>{n.content=e.target.value;renderNodeOnly(n.id)};
  $("#propType").onchange=e=>{n.type=e.target.value;render()};
  $("#propColor").oninput=e=>{n.color=e.target.value};
  $("#duplicateProp").onclick=()=>duplicateSelected();
  $("#deleteProp").onclick=()=>deleteSelected();
}
function renderNodeOnly(id){const old=$(`[data-node="${id}"]`),n=ws().nodes.find(x=>x.id===id);if(!old)return;old.querySelector(".node-header strong").textContent=n.title;old.querySelector(".node-content").textContent=n.content;$("#saveStatus").textContent=t("status.saving");clearTimeout(window.saveLater);window.saveLater=setTimeout(()=>save("hist.editProps"),500)}
function updateAIContext(){const el=$("#aiContextCount");if(el)el.textContent=t("ai.nodesSelected",{n:selected.size})}
function renderLayers(){const q=$("#layerSearch")?.value.toLowerCase()||"";$("#layersList").innerHTML=ws().nodes.filter(n=>!q||[n.title,n.content].join(" ").toLowerCase().includes(q)).sort((a,b)=>b.z-a.z).map(n=>`<div class="layer-row"><span>${n.type.toUpperCase()} · ${escape(n.title)}</span><button data-layer="${n.id}">◎</button></div>`).join("");$$("[data-layer]").forEach(b=>b.onclick=()=>{selected.clear();selected.add(b.dataset.layer);selectRender();focusNode(b.dataset.layer)})}
$("#layerSearch").oninput=renderLayers;
function renderHistory(){$("#historyList").innerHTML=history.map((h,i)=>`<div class="history-row" data-history="${i}"><span>${h.label}</span><small>${h.time}</small></div>`).join("")}
function undo(){if(history.length<2)return toast(t("toast.nothingUndo"));const current=history.shift();future.unshift(current);state=deep(history[0].snapshot);setAppMode(state.appMode||"braindump");render();renderBrainDump();toast(t("toast.undone"))}
function redo(){if(!future.length)return toast(t("toast.nothingRedo"));const item=future.shift();history.unshift(item);state=deep(item.snapshot);setAppMode(state.appMode||"braindump");render();renderBrainDump();toast(t("toast.redone"))}
$("#undoBtn").onclick=undo;$("#redoBtn").onclick=redo;
$("#historyBtn").onclick=()=>$("#historyPanel").classList.toggle("open");
$("#layersBtn").onclick=()=>$("#layersPanel").classList.toggle("open");
$$("[data-close-panel]").forEach(b=>b.onclick=()=>$("#"+b.dataset.closePanel).classList.remove("open"));

viewport.onpointerdown=e=>{
  if(e.target!==viewport&&e.target!==world&&e.target!==nodeLayer)return;
  closeContext();
  if(tool==="note"||tool==="shape"||tool==="text"||tool==="frame"){const p=screenToWorld(e.clientX,e.clientY);createNode(tool,p.x,p.y);return}
  if(tool==="hand"||e.button===1||e.altKey){pan={x:e.clientX,y:e.clientY,vx:state.view.x,vy:state.view.y,pid:e.pointerId};viewport.setPointerCapture(e.pointerId);viewport.style.cursor="grabbing";return}
  selected.clear();selectRender();
  const p=screenToWorld(e.clientX,e.clientY);selection={sx:p.x,sy:p.y,cx:p.x,cy:p.y,pid:e.pointerId};viewport.setPointerCapture(e.pointerId);$("#selectionBox").style.display="block";updateSelectionBox();
};
viewport.onpointermove=e=>{
  const p=screenToWorld(e.clientX,e.clientY);$("#canvasCoords").textContent=`${Math.round(p.x)}, ${Math.round(p.y)}`;
  if(pan&&pan.pid===e.pointerId){state.view.x=pan.vx+(e.clientX-pan.x);state.view.y=pan.vy+(e.clientY-pan.y);applyView()}
  if(selection&&selection.pid===e.pointerId){selection.cx=p.x;selection.cy=p.y;updateSelectionBox()}
};
viewport.onpointerup=e=>{
  if(pan){pan=null;viewport.style.cursor=tool==="hand"?"grab":"default";save("hist.pan")}
  if(selection){const x=Math.min(selection.sx,selection.cx),y=Math.min(selection.sy,selection.cy),w=Math.abs(selection.cx-selection.sx),h=Math.abs(selection.cy-selection.sy);selected.clear();ws().nodes.forEach(n=>{if(n.x>=x&&n.y>=y&&n.x+n.w<=x+w&&n.y+n.h<=y+h)selected.add(n.id)});selection=null;$("#selectionBox").style.display="none";selectRender()}
};
function updateSelectionBox(){const b=$("#selectionBox"),x=Math.min(selection.sx,selection.cx),y=Math.min(selection.sy,selection.cy),w=Math.abs(selection.cx-selection.sx),h=Math.abs(selection.cy-selection.sy);Object.assign(b.style,{left:x+"px",top:y+"px",width:w+"px",height:h+"px"})}
viewport.onwheel=e=>{e.preventDefault();if(e.ctrlKey||e.metaKey){const before=screenToWorld(e.clientX,e.clientY);const factor=e.deltaY>0?.9:1.1;state.view.zoom=clamp(state.view.zoom*factor,.2,3);const r=viewport.getBoundingClientRect();state.view.x=e.clientX-r.left-before.x*state.view.zoom;state.view.y=e.clientY-r.top-before.y*state.view.zoom;applyView()}else{state.view.x-=e.deltaX;state.view.y-=e.deltaY;applyView()}},{passive:false};

function createNode(kind,x,y){
  const map={note:["note","node.newNote",260,160],shape:["card","node.newCard",240,160],text:["text","node.newText",300,100],frame:["frame","node.newFrame",500,320]};
  const [type,titleKey,w,h]=map[kind]||map.note;const n={id:uid(),type,title:t(titleKey),content:type==="text"?t("node.doubleClick"):t("node.startTyping"),x:snap(x),y:snap(y),w,h,z:++zCounter,color:"#8b7cff"};ws().nodes.push(n);selected.clear();selected.add(n.id);save("hist.create");render();setTool("select");setTimeout(()=>{const el=$(`[data-node="${n.id}"] .node-content`);if(el){el.focus();document.execCommand("selectAll",false,null)}},50);
}
function duplicateSelected(){const ids=[...selected],newIds=[];ids.forEach(id=>{const n=ws().nodes.find(x=>x.id===id),copy={...deep(n),id:uid(),x:n.x+36,y:n.y+36,z:++zCounter,title:n.title+t("node.copySuffix")};ws().nodes.push(copy);newIds.push(copy.id)});selected=new Set(newIds);save("hist.duplicate");render()}
function deleteSelected(){if(!selected.size)return;ws().nodes=ws().nodes.filter(n=>!selected.has(n.id));ws().connectors=ws().connectors.filter(c=>!selected.has(c.from)&&!selected.has(c.to));selected.clear();save("hist.delete");render()}
function bringFront(){[...selected].forEach(id=>ws().nodes.find(n=>n.id===id).z=++zCounter);save("hist.bringFront");render()}
function sendBack(){let z=1;[...selected].forEach(id=>ws().nodes.find(n=>n.id===id).z=z++);save("hist.sendBack");render()}
function groupSelection(){if(selected.size<2)return toast(t("toast.selectTwo"));const nodes=[...selected].map(id=>ws().nodes.find(n=>n.id===id));const minX=Math.min(...nodes.map(n=>n.x))-40,minY=Math.min(...nodes.map(n=>n.y))-60,maxX=Math.max(...nodes.map(n=>n.x+n.w))+40,maxY=Math.max(...nodes.map(n=>n.y+n.h))+40;const frame={id:uid(),type:"frame",title:t("node.group"),content:t("node.frame"),x:minX,y:minY,w:maxX-minX,h:maxY-minY,z:1,color:"#8b7cff"};ws().nodes.push(frame);save("hist.group");render()}
function startOrFinishConnection(id){if(!connectFrom){connectFrom=id;toast(t("toast.selectConnect"))}else if(connectFrom!==id){ws().connectors.push({id:uid(),from:connectFrom,to:id});connectFrom=null;save("hist.connect");render();setTool("select")}else connectFrom=null}
function focusNode(id){const n=ws().nodes.find(x=>x.id===id),r=viewport.getBoundingClientRect();state.view.x=r.width/2-(n.x+n.w/2)*state.view.zoom;state.view.y=r.height/2-(n.y+n.h/2)*state.view.zoom;applyView()}
function fitCanvas(){if(!ws().nodes.length)return;const minX=Math.min(...ws().nodes.map(n=>n.x)),minY=Math.min(...ws().nodes.map(n=>n.y)),maxX=Math.max(...ws().nodes.map(n=>n.x+n.w)),maxY=Math.max(...ws().nodes.map(n=>n.y+n.h)),r=viewport.getBoundingClientRect(),zoom=Math.min((r.width-120)/(maxX-minX||1),(r.height-120)/(maxY-minY||1),1.4);state.view.zoom=clamp(zoom,.2,2);state.view.x=(r.width-(maxX-minX)*zoom)/2-minX*zoom;state.view.y=(r.height-(maxY-minY)*zoom)/2-minY*zoom;applyView()}
$("#fitBtn").onclick=fitCanvas;$("#zoomIn").onclick=()=>{state.view.zoom=clamp(state.view.zoom*1.15,.2,3);applyView()};$("#zoomOut").onclick=()=>{state.view.zoom=clamp(state.view.zoom/1.15,.2,3);applyView()};

function openContext(x,y){const m=$("#contextMenu");m.style.left=Math.min(x,innerWidth-200)+"px";m.style.top=Math.min(y,innerHeight-330)+"px";m.classList.add("open")}
function closeContext(){$("#contextMenu").classList.remove("open")}
document.addEventListener("pointerdown",e=>{if(!e.target.closest(".context-menu"))closeContext()});
$$("[data-context]").forEach(b=>b.onclick=()=>{const a=b.dataset.context;closeContext();if(a==="edit"){const id=[...selected][0];if(id){const el=$(`[data-node="${id}"] .node-content`);el.focus()}}if(a==="duplicate")duplicateSelected();if(a==="bring-front")bringFront();if(a==="send-back")sendBack();if(a==="group")groupSelection();if(a==="connect"){connectFrom=[...selected][0];setTool("connect");toast(t("toast.selectConnect"))};if(a==="ai"){openAI();$("#aiInput").value=t("ai.promptAnalyze")}if(a==="delete")deleteSelected()});

function renderMinimap(){
  if(!state.settings.minimap){$("#minimap").style.display="none";return}else $("#minimap").style.display="block";
  const c=$("#minimapCanvas"),ctx=c.getContext("2d"),scale=.035;ctx.clearRect(0,0,c.width,c.height);ctx.fillStyle="#0b0e12";ctx.fillRect(0,0,c.width,c.height);ws().nodes.forEach(n=>{ctx.fillStyle=n.color||"#8b7cff";ctx.fillRect(n.x*scale,n.y*scale,Math.max(3,n.w*scale),Math.max(3,n.h*scale))});const r=viewport.getBoundingClientRect(),mv=$("#minimapViewport");mv.style.left=(-state.view.x/state.view.zoom*scale)+"px";mv.style.top=(-state.view.y/state.view.zoom*scale)+"px";mv.style.width=(r.width/state.view.zoom*scale)+"px";mv.style.height=(r.height/state.view.zoom*scale)+"px";
}
$("#minimap").onclick=e=>{const r=$("#minimap").getBoundingClientRect(),wx=(e.clientX-r.left)/.035,wy=(e.clientY-r.top)/.035,vr=viewport.getBoundingClientRect();state.view.x=vr.width/2-wx*state.view.zoom;state.view.y=vr.height/2-wy*state.view.zoom;applyView()};

function openAI(){$("#aiPanel").classList.add("open")}
$("#aiBtn").onclick=openAI;$("#closeAI").onclick=()=>$("#aiPanel").classList.remove("open");
$$("[data-agent-mode]").forEach(b=>b.onclick=()=>{$$("[data-agent-mode]").forEach(x=>x.classList.remove("active"));b.classList.add("active");agentMode=b.dataset.agentMode});
function aiMessage(role,text){$("#aiChat").insertAdjacentHTML("beforeend",`<div class="ai-msg ${role}">${escape(text)}</div>`);$("#aiChat").scrollTop=$("#aiChat").scrollHeight}
function runAgent(prompt){
  aiMessage("user",prompt);
  setTimeout(()=>{
    let reply="";
    if(agentMode==="sleep"||/sleep|wind|瞓|睡眠|放鬆/i.test(prompt)){
      reply=t("ai.replySleep",{dumps:state.pillownotes.dumps.filter(d=>!d.toCanvas).length,avg:avgSleep()?avgSleep().toFixed(1):"—"});
      // create wind-down plan on pillow canvas
      ensurePillowWs();
      ["Dump remaining thoughts","Screens off in 60m","Bed checkpoint"].forEach((title,i)=>{
        createNodeOn("pillow","card",800+i*280,1100,{title:`WIND ${i+1}`,content:title,color:["#ffd56a","#8b7cff","#68e1d1"][i]});
      });
      save("hist.aiPlan");
    }
    else if(agentMode==="organize"||/organize|整理/i.test(prompt)){reply=t("ai.replyOrganize");autoOrganize()}
    else if(agentMode==="brainstorm"||/idea|brainstorm|靈感|腦力/i.test(prompt)){reply=t("ai.replyBrainstorm");addBrainstorm()}
    else if(agentMode==="summarize"||/summarize|摘要/i.test(prompt)){reply=t("ai.replySummarize",{nodes:ws().nodes.length,connectors:ws().connectors.length})}
    else if(agentMode==="plan"||/plan|計畫|規劃/i.test(prompt)){reply=t("ai.replyPlan");addPlan()}
    else reply=t("ai.replyDefault");
    aiMessage("ai",reply);if(state.appMode==="canvas")render();
  },500);
}
$("#sendAI").onclick=()=>{const v=$("#aiInput").value.trim();if(!v)return;$("#aiInput").value="";runAgent(v)};
$("#aiInput").onkeydown=e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();$("#sendAI").click()}};
$$("[data-ai-suggestion]").forEach(b=>b.onclick=()=>runAgent(t(b.dataset.aiSuggestion)));
function autoOrganize(){const nodes=selected.size?[...selected].map(id=>ws().nodes.find(n=>n.id===id)):ws().nodes.filter(n=>n.type!=="frame");const cols=3;nodes.forEach((n,i)=>{n.x=800+(i%cols)*340;n.y=700+Math.floor(i/cols)*250});save("hist.aiOrganize");render()}
function addBrainstorm(){[t("ai.concept1"),t("ai.concept2"),t("ai.concept3")].forEach((title,i)=>ws().nodes.push({id:uid(),type:"idea",title,content:t("ai.conceptContent"),x:1650+i*300,y:1050+i*70,w:260,h:150,z:++zCounter,color:"#ff8eaa"}));save("hist.aiBrainstorm");render()}
function addPlan(){[t("ai.stepDefine"),t("ai.stepPrototype"),t("ai.stepValidate")].forEach((step,i)=>ws().nodes.push({id:uid(),type:"card",title:`STEP ${i+1} · ${step}`,content:[t("ai.step1"),t("ai.step2"),t("ai.step3")][i],x:780+i*290,y:1750,w:240,h:140,z:++zCounter,color:["#68e1d1","#8b7cff","#91e17c"][i]}));save("hist.aiPlan");render()}

const commands=[
  ["cmd.braindump","braindump"],["cmd.dump","dump"],
  ["cmd.createNote","create-note"],["cmd.createCard","create-card"],["cmd.createText","create-text"],["cmd.createFrame","create-frame"],
  ["cmd.openAI","ai"],["cmd.fitCanvas","fit"],["cmd.duplicate","duplicate"],["cmd.delete","delete"],["cmd.group","group"],["cmd.export","export"],["cmd.search","search"]
];
function renderCommands(q=""){const list=commands.filter(c=>t(c[0]).toLowerCase().includes(q.toLowerCase()));$("#commandResults").innerHTML=list.map(c=>`<div class="command-item" data-command="${c[1]}"><span>${t(c[0])}</span><small>${t("command.enter")}</small></div>`).join("");$$("[data-command]").forEach(x=>x.onclick=()=>{closeCommand();execCommand(x.dataset.command)})}
function openCommand(){$("#commandPalette").classList.add("open");renderCommands();setTimeout(()=>$("#commandInput").focus(),20)}
function closeCommand(){$("#commandPalette").classList.remove("open");$("#commandInput").value=""}
$("#commandBtn").onclick=openCommand;$("#commandInput").oninput=e=>renderCommands(e.target.value);
function execCommand(c){
  if(c==="braindump")return setAppMode("braindump");
  if(c==="dump"){setAppMode("braindump");setTimeout(()=>$("#pillowDump").focus(),50);return}
  if(state.appMode!=="canvas")setAppMode("canvas");
  const r=viewport.getBoundingClientRect(),p=screenToWorld(r.left+r.width/2,r.top+r.height/2);
  if(c.startsWith("create-"))createNode(c.replace("create-",""),p.x,p.y);
  if(c==="ai")openAI();if(c==="fit")fitCanvas();if(c==="duplicate")duplicateSelected();if(c==="delete")deleteSelected();if(c==="group")groupSelection();if(c==="export")$("#shareBtn").click();if(c==="search")$("#searchBtn").click();
}

$("#searchBtn").onclick=()=>{$("#searchOverlay").classList.add("open");setTimeout(()=>$("#globalSearch").focus(),20)};
$$("[data-close-overlay]").forEach(b=>b.onclick=()=>$("#"+b.dataset.closeOverlay).classList.remove("open"));
$("#globalSearch").oninput=e=>{const q=e.target.value.toLowerCase();$("#searchResults").innerHTML=ws().nodes.filter(n=>[n.title,n.content].join(" ").toLowerCase().includes(q)).map(n=>`<div class="search-result" data-search-node="${n.id}"><strong>${escape(n.title)}</strong><small>${escape(n.content.slice(0,70))}</small></div>`).join("");$$("[data-search-node]").forEach(x=>x.onclick=()=>{$("#searchOverlay").classList.remove("open");selected.clear();selected.add(x.dataset.searchNode);selectRender();focusNode(x.dataset.searchNode)})};

$("#shareBtn").onclick=()=>$("#shareModal").classList.add("open");
$("#settingsBtn").onclick=()=>$("#settingsModal").classList.add("open");
$$("[data-close-modal]").forEach(b=>b.onclick=()=>$("#"+b.dataset.closeModal).classList.remove("open"));
$$(".modal-backdrop").forEach(m=>m.onclick=e=>{if(e.target===m)m.classList.remove("open")});

$("#exportJSON").onclick=()=>download("NEXUS_workspace.json",JSON.stringify(state,null,2));
$("#exportPillowJSON").onclick=()=>download("PillowNotes_data.json",JSON.stringify(state.pillownotes,null,2));
$("#exportPNG").onclick=()=>{const c=document.createElement("canvas"),nodes=ws().nodes;if(!nodes.length)return;const minX=Math.min(...nodes.map(n=>n.x)),minY=Math.min(...nodes.map(n=>n.y)),maxX=Math.max(...nodes.map(n=>n.x+n.w)),maxY=Math.max(...nodes.map(n=>n.y+n.h));c.width=Math.min(4000,maxX-minX+120);c.height=Math.min(3000,maxY-minY+120);const ctx=c.getContext("2d");ctx.fillStyle="#0b0e12";ctx.fillRect(0,0,c.width,c.height);nodes.forEach(n=>{ctx.fillStyle="#171b21";ctx.strokeStyle=n.color||"#8b7cff";ctx.lineWidth=3;ctx.fillRect(n.x-minX+60,n.y-minY+60,n.w,n.h);ctx.strokeRect(n.x-minX+60,n.y-minY+60,n.w,n.h);ctx.fillStyle="#f5f7fb";ctx.font="bold 16px sans-serif";ctx.fillText(n.title,n.x-minX+74,n.y-minY+90)});const a=document.createElement("a");a.href=c.toDataURL("image/png");a.download="NEXUS_canvas.png";a.click()};
$("#copyShareLink").onclick=()=>{const code=btoa(unescape(encodeURIComponent(JSON.stringify({workspace:state.activeWorkspace,nodes:ws().nodes,connectors:ws().connectors})))).slice(0,800);$("#shareCode").textContent=code;navigator.clipboard?.writeText(code);toast(t("toast.shareCopied"))};
function download(name,text){const blob=new Blob([text],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=name;a.click();URL.revokeObjectURL(a.href)}

$("#gridSizeInput").onchange=e=>{state.settings.grid=+e.target.value;viewport.style.backgroundSize=`${state.settings.grid}px ${state.settings.grid}px`;save("hist.grid")};
$("#snapToggle").onchange=e=>{state.settings.snap=e.target.checked;save("hist.snap")};
$("#minimapToggle").onchange=e=>{state.settings.minimap=e.target.checked;renderMinimap();save("hist.minimap")};
$("#autosaveToggle").onchange=e=>{state.settings.autosave=e.target.checked;save("hist.autosave")};
$("#langSelect").onchange=e=>setLang(e.target.value);
$("#defaultHomeSelect").onchange=e=>{state.settings.defaultHome=e.target.value;save("hist.change");toast(lang()==="zh"?"預設主頁已更新":"Default home updated")};
$("#morningPromptToggle").onchange=e=>{state.settings.morningPrompt=e.target.checked;save("hist.change")};
$("#importWorkspaceBtn").onclick=()=>$("#importWorkspaceFile").click();
$("#importWorkspaceFile").onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{state=JSON.parse(r.result);if(!state.settings)state.settings=deep(defaults.settings);if(!state.settings.lang)state.settings.lang=lang();if(!state.pillownotes)state.pillownotes=deep(defaults.pillownotes);applyI18n();render();renderBrainDump();toast(t("toast.imported"))}catch(err){toast(t("toast.invalidFile"))}};r.readAsText(f)};
$("#resetWorkspaceBtn").onclick=()=>{if(confirm(t("confirm.reset"))){const currentLang=lang();state=deep(defaults);state.settings.lang=currentLang;history=[];future=[];save("hist.reset");applyI18n();render();renderBrainDump();setAppMode(state.settings.defaultHome||"braindump");$("#settingsModal").classList.remove("open")}};

$$("[data-workspace]").forEach(b=>b.onclick=()=>{$$("[data-workspace]").forEach(x=>x.classList.remove("active"));b.classList.add("active");state.activeWorkspace=b.dataset.workspace;selected.clear();render();fitCanvas();save("hist.switchWs")});

document.addEventListener("keydown",e=>{
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();openCommand()}
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="z"){e.preventDefault();e.shiftKey?redo():undo()}
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="d"){e.preventDefault();if(state.appMode==="canvas")duplicateSelected()}
  if(e.key==="Delete"||e.key==="Backspace"){if(!e.target.matches("input,textarea,[contenteditable='true']")&&state.appMode==="canvas")deleteSelected()}
  if(e.key==="Escape"){closeCommand();closeContext();selected.clear();selectRender()}
  if(state.appMode==="canvas"){
    const map={v:"select",h:"hand",n:"note",s:"shape",t:"text",c:"connect",f:"frame"};
    if(map[e.key.toLowerCase()]&&!e.target.matches("input,textarea,[contenteditable='true']"))setTool(map[e.key.toLowerCase()]);
  }
});
window.addEventListener("resize",()=>{renderMinimap();if(state.appMode==="braindump")renderBrainDump()});

function maybeMorningPrompt(){
  if(!state.settings.morningPrompt)return;
  const h=new Date().getHours();
  if(h>=5&&h<11&&(state.pillownotes.pendingTomorrow||[]).length){
    setTimeout(()=>{
      toast(lang()==="zh"?"有留待今日處理嘅 Dump — 打開晨間回顧":"Parked dumps waiting — open morning review");
    },800);
  }
}

function init(){
  viewport.style.backgroundSize=`${state.settings.grid}px ${state.settings.grid}px`;
  $("#gridSizeInput").value=state.settings.grid;
  $("#snapToggle").checked=state.settings.snap;
  $("#minimapToggle").checked=state.settings.minimap;
  $("#autosaveToggle").checked=state.settings.autosave;
  if($("#langSelect"))$("#langSelect").value=lang();
  if($("#defaultHomeSelect"))$("#defaultHomeSelect").value=state.settings.defaultHome||"braindump";
  if($("#morningPromptToggle"))$("#morningPromptToggle").checked=!!state.settings.morningPrompt;
  applyI18n();
  history=[{label:t("hist.initial"),time:now(),snapshot:deep(state)}];
  renderHistory();
  // default home = Brain Dump (mobile-first)
  const home=state.settings.defaultHome||"braindump";
  state.appMode=home;
  let tab="dump";
  try{ tab=localStorage.getItem("nexusMobileTab")|| (home==="canvas"?"canvas":"dump") }catch(e){}
  if(home==="canvas") tab="canvas";
  state.mobileTab=tab;
  const app=$("#app");
  app.classList.toggle("mode-braindump",home!=="canvas" && tab!=="canvas");
  app.classList.toggle("mode-canvas",tab==="canvas" || home==="canvas");
  state.appMode = (tab==="canvas" || home==="canvas") ? "canvas" : "braindump";
  $$("[data-app-mode]").forEach(b=>b.classList.toggle("active",b.dataset.appMode===state.appMode));
  const dock=$("#mobileCanvasDock"); if(dock) dock.hidden = state.appMode!=="canvas";
  setMobileTab(tab, {skipMode:true, silent:true});
  render();
  renderBrainDump();
  if(state.appMode==="canvas")setTimeout(()=>{if(!localStorage.getItem("nexusOS_fitted")){fitCanvas();localStorage.setItem("nexusOS_fitted","1")}},100);
  maybeMorningPrompt();
  // service worker for PWA / offline — prefer fresh UI after deploy
  setupServiceWorker();
}

function setupServiceWorker(){
  if(!("serviceWorker" in navigator)) return;
  let refreshing=false;
  // When a new SW takes control, reload once so the new UI shows
  navigator.serviceWorker.addEventListener("controllerchange",()=>{
    if(refreshing) return;
    refreshing=true;
    location.reload();
  });
  navigator.serviceWorker.register("./sw.js",{updateViaCache:"none"}).then(reg=>{
    const askWaiting=()=>{
      if(reg.waiting) reg.waiting.postMessage({type:"SKIP_WAITING"});
    };
    askWaiting();
    reg.addEventListener("updatefound",()=>{
      const worker=reg.installing;
      if(!worker) return;
      worker.addEventListener("statechange",()=>{
        if(worker.state==="installed" && navigator.serviceWorker.controller){
          worker.postMessage({type:"SKIP_WAITING"});
        }
      });
    });
    // Check for updates on load + when app returns to foreground
    const check=()=>{ try{ reg.update(); }catch(e){} };
    check();
    document.addEventListener("visibilitychange",()=>{ if(document.visibilityState==="visible") check(); });
    window.addEventListener("focus",check);
    setInterval(check, 5*60*1000);
  }).catch(()=>{});
}
init();
