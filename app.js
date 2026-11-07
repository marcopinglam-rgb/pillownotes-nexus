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
    "ai.agent":"Rule helper","ai.copilot":"Nexus Helper","ai.organize":"Organize","ai.brainstorm":"Brainstorm","ai.summarize":"Summarize","ai.plan":"Plan","ai.sleep":"Sleep",
    "ai.context":"CONTEXT","ai.nodesSelected":"{n} nodes selected","ai.contextHint":"Reads canvas, dumps and sleep logs, then replies with rules. Not a large language model.",
    "ai.suggestOrganize":"Organize this canvas","ai.suggestPlan":"Turn ideas into a plan","ai.suggestSleep":"Wind-down plan for tonight","ai.suggestPatterns":"Find hidden patterns",
    "ai.placeholder":"Ask the helper to rearrange, summarise, or plan a wind-down…","ai.promptAnalyze":"Analyze the selected node and suggest the next action.",
    "ai.replyOrganize":"I used a simple layout rule to space the nodes into a 3-column grid. No language model was used.",
    "ai.replyBrainstorm":"I dropped three placeholder idea cards so you can edit them. They are scaffolding, not generated insight.",
    "ai.replySummarize":"This canvas has {nodes} nodes and {connectors} links. You have {dumps} unsynced dumps and average sleep {avg}h.",
    "ai.replyPlan":"I added a three-step card row you can edit. It is a template, not a custom plan.",
    "ai.replySleep":"Tonight, rule-based: 1) dump leftover thoughts 2) screens off in 60 min 3) bed checkpoint. Open dumps: {dumps}. Avg sleep: {avg}h. Last dump: {last}.",
    "ai.replyDefault":"I can rearrange nodes, drop plan cards, summarise counts, and suggest a wind-down from your dumps. Replies are rules, not an LLM.",
    "ai.concept1":"Adaptive workspace","ai.concept2":"Shared agent memory","ai.concept3":"Multiplayer AI roles","ai.conceptContent":"Placeholder direction — edit this",
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
    "dump.suggestTags":"Suggest tags","dump.tagHint":"Pick a worry source, or tap Suggest tags — you can edit after.",
    "toast.dumpEmpty":"Write a dump first","toast.dumpNoTags":"No matching tags — pick manually","toast.dumpTags":"Suggested: {tags} (editable)",
    "toast.dumpSaved":"Dump saved","toast.dumpCanvas":"Saved and created canvas node","toast.sleepSaved":"Sleep entry saved",
    "rf.eyebrow":"Reframe · rule-based","rf.title":"Cognitive reframe · morning review","rf.lead":"Matches your sentence to a theme template. Not an LLM, not a diagnosis.","rf.inputLabel":"The thought you keep looping","rf.placeholder":"e.g. tomorrow’s meeting is going to go badly…","rf.run":"Suggest reframe","rf.openHelper":"Open helper","rf.thought":"Thought","rf.try":"Try seeing it this way","rf.next":"Next","rf.note":"Rule template — not diagnosis or medical advice.","rf.empty":"Write a thought first","rf.theme.work":"Work stress","rf.theme.social":"Relationships","rf.theme.self":"Self-doubt","rf.theme.body":"Body fatigue","rf.theme.future":"Future anxiety","rf.theme.money":"Money stress","rf.theme.family":"Family pressure","rf.theme.study":"Study stress","rf.theme.general":"Tonight","rf.crisis":"If you feel unsafe or at risk, stop here and contact local emergency services, or the Samaritans Hong Kong 24-hour hotline 2382 0000. This app cannot help in a crisis.",
    "bridge.lead":"Dumps become Pillow canvas nodes. The helper can only rearrange with rules.",
    "tn.eyebrow":"Tonight","tn.title":"From leftover thoughts to bed","tn.lead":"Four skippable steps. Follow them, or tuck the card away.","tn.dismiss":"Hide","tn.restore":"Tonight: Dump → wind-down → bed","tn.do":"Do this step","tn.skip":"Skip","tn.nextWind":"Go to wind-down","tn.nextBed":"Go to bed checkpoint","tn.nextStill":"I am still awake","tn.done":"Tonight's path is done. Sleep when you can.","tn.dump":"Dump","tn.dumpHint":"Unload what is still looping","tn.wind":"Wind-down","tn.windHint":"Start a countdown or screens-off","tn.bed":"Bed","tn.bedHint":"One-tap bedtime checkpoint","tn.still":"Still awake","tn.stillHint":"Optional. Shift bedtime if you are still up.","tn.step":"Step {n}",
    "toast.bed":"Bedtime checkpoint recorded","toast.wake":"Wakeup checkpoint recorded","toast.stillAwake":"Still Awake noted — previous bed time adjusted",
    "toast.countdownDone":"Countdown finished — time to wind down","toast.synced":"Synced dumps to Pillow canvas","toast.tomorrow":"Parked for tomorrow morning",
    "pwa.install":"Install Nexus","pwa.installMenu":"Use the Chrome menu to install Nexus","pwa.installed":"Nexus was added to your home screen"
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
    "ai.agent":"規則助手","ai.copilot":"Nexus Helper","ai.organize":"整理","ai.brainstorm":"腦力激盪","ai.summarize":"摘要","ai.plan":"規劃","ai.sleep":"睡眠",
    "ai.context":"情境","ai.nodesSelected":"已選取 {n} 個節點","ai.contextHint":"讀畫布、Dump、睡眠紀錄，用規則回覆。唔係大型語言模型。",
    "ai.suggestOrganize":"整理此畫布","ai.suggestPlan":"將靈感轉為計畫","ai.suggestSleep":"今晚放鬆計劃","ai.suggestPatterns":"找出隱藏模式",
    "ai.placeholder":"請助手排位、摘要，或者建議今晚 wind-down…","ai.promptAnalyze":"分析所選節點並建議下一步行動。",
    "ai.replyOrganize":"我用簡單排位規則將節點分成三欄。冇用語言模型。",
    "ai.replyBrainstorm":"我加咗三張可以改嘅靈感卡，係骨架唔係生成洞察。",
    "ai.replySummarize":"呢幅畫布有 {nodes} 個節點、{connectors} 條線。未同步 dump {dumps} 則，平均睡眠 {avg} 小時。",
    "ai.replyPlan":"我加咗三步模板卡，你可以改。唔係度身計劃。",
    "ai.replySleep":"今晚規則建議：1）dump 未倒出嘅諗法 2）60 分鐘後熄螢幕 3）checkpoint 瞓覺。未處理 dump：{dumps}。平均睡眠：{avg}h。最近一句：{last}。",
    "ai.replyDefault":"我可以排節點、加計劃卡、用數字做摘要、同埋按 dump 建議 wind-down。回覆係規則，唔係 LLM。",
    "ai.concept1":"自適應工作空間","ai.concept2":"共享代理記憶","ai.concept3":"多人 AI 協作","ai.conceptContent":"占位方向 — 請改呢句",
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
    "dump.suggestTags":"建議標籤","dump.tagHint":"揀煩惱來源，或者撳建議標籤（可再人手改）",
    "toast.dumpEmpty":"先寫一句 dump","toast.dumpNoTags":"未搵到對應標籤，可人手揀","toast.dumpTags":"建議咗：{tags}（可再改）",
    "toast.dumpSaved":"已儲存 Dump","toast.dumpCanvas":"已儲存並建立畫布節點","toast.sleepSaved":"已儲存睡眠紀錄",
    "rf.eyebrow":"重構 · 規則建議","rf.title":"認知重構 · 晨間回顧","rf.lead":"根據你寫低嘅一句配對主題模板。唔係 LLM，亦唔係診斷。","rf.inputLabel":"而家最掛住嘅一句想法","rf.placeholder":"例如：聽日個 meeting 一定會搞砸…","rf.run":"重構建議","rf.openHelper":"開助手","rf.thought":"原想法","rf.try":"試下咁睇","rf.next":"下一步","rf.note":"規則模板，唔係診斷或醫療建議。","rf.empty":"先寫一句想法","rf.theme.work":"工作壓力","rf.theme.social":"人際關係","rf.theme.self":"自我懷疑","rf.theme.body":"身體疲累","rf.theme.future":"未來焦慮","rf.theme.money":"金錢壓力","rf.theme.family":"家庭壓力","rf.theme.study":"學業壓力","rf.theme.general":"今晚","rf.crisis":"如果你覺得自己好危險，停低，打緊急服務或者撒瑪利亞會 24 小時熱線 2382 0000。呢個 app 處理唔到危機。",
    "bridge.lead":"Dump 會變成枕頭畫布節點；助手淨係可以用規則幫你排位。",
    "tn.eyebrow":"今晚","tn.title":"收工到瞓着","tn.lead":"四步，每步都可以 skip。跟住做，或者收起。","tn.dismiss":"收起","tn.restore":"今晚：Dump → 放鬆 → 瞓","tn.do":"做呢一步","tn.skip":"Skip","tn.nextWind":"去放鬆倒數","tn.nextBed":"去瞓覺 checkpoint","tn.nextStill":"我仲醒","tn.done":"今晚呢條路做完。得閒就瞓。","tn.dump":"Dump","tn.dumpHint":"倒出仲喺腦入面轉嘅嘢","tn.wind":"放鬆","tn.windHint":"開倒數或者熄螢幕","tn.bed":"瞓","tn.bedHint":"一鍵記錄開始瞓","tn.still":"仲醒","tn.stillHint":"可選。如果仲醒，將瞓覺時間移後。","tn.step":"第 {n} 步",
    "toast.bed":"已記錄瞓覺 Checkpoint","toast.wake":"已記錄起身 Checkpoint","toast.stillAwake":"已記錄 Still Awake — 已調整上次瞓覺時間",
    "toast.countdownDone":"倒數完 — 係時候放鬆","toast.synced":"已同步 Dump 到枕頭畫布","toast.tomorrow":"已留待聽日朝早",
    "pwa.install":"安裝 Nexus","pwa.installMenu":"用 Chrome 選單安裝 Nexus","pwa.installed":"Nexus 已加到主畫面"
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
  if($("#dumpTagHint"))$("#dumpTagHint").textContent=t("dump.tagHint");
  if($("#suggestDumpTags"))$("#suggestDumpTags").textContent=t("dump.suggestTags");
  if($("#reframeEyebrow"))$("#reframeEyebrow").textContent=t("rf.eyebrow");
  if($("#reframeTitle"))$("#reframeTitle").textContent=t("rf.title");
  if($("#reframeLead"))$("#reframeLead").textContent=t("rf.lead");
  if($("#reframeInputLabelText"))$("#reframeInputLabelText").textContent=t("rf.inputLabel");
  if($("#reframeInput"))$("#reframeInput").placeholder=t("rf.placeholder");
  if($("#runReframe"))$("#runReframe").textContent=t("rf.run");
  if($("#openAIFromBD"))$("#openAIFromBD").textContent=t("rf.openHelper");
  if($("#aiInput"))$("#aiInput").placeholder=t("ai.placeholder");
  if($("#aiAgentLabel"))$("#aiAgentLabel").textContent=t("ai.agent");
  if($("#aiCopilotTitle"))$("#aiCopilotTitle").textContent=t("ai.copilot");
  if($("#aiContextHint"))$("#aiContextHint").textContent=t("ai.contextHint");
  if($("#bridgeLead"))$("#bridgeLead").textContent=t("bridge.lead");
  if($("#tonightEyebrow"))$("#tonightEyebrow").textContent=t("tn.eyebrow");
  if($("#tonightTitle"))$("#tonightTitle").textContent=t("tn.title");
  if($("#tonightLead"))$("#tonightLead").textContent=t("tn.lead");
  if($("#tonightDismiss"))$("#tonightDismiss").textContent=t("tn.dismiss");
  if($("#tonightRestore"))$("#tonightRestore").textContent=t("tn.restore");
  if($("#installPwaBtn"))$("#installPwaBtn").textContent=t("pwa.install");
  renderTonight();
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
    reframeUsed:[],
    tonight:null,
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
    if(!Array.isArray(s.pillownotes.reframeUsed))s.pillownotes.reframeUsed=[];
    if(!s.pillownotes.tonight||typeof s.pillownotes.tonight!=="object")s.pillownotes.tonight=null;
    // migrate old dumps shape
    s.pillownotes.dumps=(s.pillownotes.dumps||[]).map(d=>({
      id:d.id||uid(),
      text:d.text||"",
      tags:d.tags||[],
      createdAt:d.createdAt||isoNow(),
      toCanvas:!!d.toCanvas,
      forTomorrow:!!d.forTomorrow,
      nodeId:d.nodeId||null,
      source:d.source||"text"
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
function toast(msg){
  const x=$("#toast");
  if(!x) return;
  x.textContent=String(msg||"");
  // force reflow so repeated toasts re-animate cleanly
  x.classList.remove("show");
  void x.offsetWidth;
  x.classList.add("show");
  clearTimeout(window.tt);
  window.tt=setTimeout(()=>x.classList.remove("show"),2600);
}
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
// PWA install prompt — shown only after Chrome fires beforeinstallprompt.
let deferredInstall=null;
function runningStandalone(){
  return window.matchMedia("(display-mode: standalone)").matches
    || window.matchMedia("(display-mode: fullscreen)").matches
    || window.navigator.standalone===true;
}
function syncInstallButton(){
  const btn=$("#installPwaBtn");
  if(!btn) return;
  btn.hidden=!(deferredInstall && !runningStandalone());
}
window.addEventListener("beforeinstallprompt",(e)=>{
  e.preventDefault();
  deferredInstall=e;
  syncInstallButton();
});
window.addEventListener("appinstalled",()=>{
  deferredInstall=null;
  syncInstallButton();
});
if($("#installPwaBtn")) $("#installPwaBtn").onclick=async()=>{
  if(!deferredInstall){toast(t("pwa.installMenu"));return}
  const promptEvent=deferredInstall;
  try{
    promptEvent.prompt();
    deferredInstall=null;
    syncInstallButton();
    const choice=await promptEvent.userChoice;
    if(choice && choice.outcome==="accepted") toast(t("pwa.installed"));
  }catch(err){
    deferredInstall=null;
    syncInstallButton();
  }
};
syncInstallButton();

/* ========== BRAIN DUMP / PILLOWNOTES ========== */
function selectedTags(){return [...activeTags]}
$$("#worryTags .tag").forEach(b=>b.onclick=()=>{
  const tag=b.dataset.tag;
  if(activeTags.has(tag)){activeTags.delete(tag);b.classList.remove("active")}
  else{activeTags.add(tag);b.classList.add("active")}
});

/* Rule-based dump tags — maps to #worryTags chips, not textarea hashtags */
const DUMP_TAG_RULES={
  "工作":["工作","上班","會議","開會","deadline","meeting","work","項目","project","code","代碼","開發","面試","待辦","todo","plan","計劃","清單","預約","實習"],
  "人情":["人情","同事","上司","老闆","老板","關係","吵架","誤會"],
  "錢":["錢","錢銀","租金","薪水","salary","bill","卡數","樓價"],
  "屋企":["屋企","屋企人","阿媽","阿爸","家人","family"],
  "健康":["健康","身體","體檢","飲食","失眠","瞓覺","瞓唔着","睡眠","入睡","作息","sleep","insomnia","頭痛"],
  "靈感":["靈感","想法","創意","構思","方案","idea"],
  "OT":["ot","加班","收工","overtime","夜班"]
};
function textHasDumpKeyword(hay,word){
  const w=String(word||"").toLowerCase();
  if(!w) return false;
  if(/^[a-z0-9]+$/.test(w) && w.length<=3){
    return new RegExp(`(?:^|[^a-z0-9])${w}(?:$|[^a-z0-9])`,"i").test(hay);
  }
  return hay.includes(w);
}
function suggestDumpTagsFromText(text){
  const hay=String(text||"").toLowerCase();
  return Object.entries(DUMP_TAG_RULES).filter(([,words])=>words.some(w=>textHasDumpKeyword(hay,w))).map(([tag])=>tag);
}
function applySuggestedDumpTags(tags){
  tags.forEach(tag=>{
    activeTags.add(tag);
    const btn=$(`#worryTags .tag[data-tag="${tag}"]`);
    if(btn) btn.classList.add("active");
  });
}
if($("#suggestDumpTags")) $("#suggestDumpTags").onclick=()=>{
  const text=$("#pillowDump")?.value.trim();
  if(!text) return toast(t("toast.dumpEmpty"));
  const matched=suggestDumpTagsFromText(text);
  if(!matched.length) return toast(t("toast.dumpNoTags"));
  applySuggestedDumpTags(matched);
  toast(t("toast.dumpTags",{tags:lang()==="zh"?matched.join("、"):matched.join(", ")}));
};

const CRISIS_WORDS=["自殺","想死","尋死","自殘","kill myself","suicide","end my life","self-harm","自盡"];
const REFRAME_THEME_ORDER=["study","money","family","social","work","future","self","body"];
const REFRAME_THEME_WORDS={
  study:["dissertation", "professor", "assignment", "midterm", "thesis", "essay", "exam", "gpa", "dse", "fyp", "功課", "考試", "成績", "分數", "溫唔切", "肥佬", "補考", "畢業", "測驗", "讀唔切", "溫唔晒", "大考"],
  money:["credit card", "mortgage", "卡數", "欠債", "租金", "供樓", "冇錢", "人工", "出糧", "薪水", "蝕錢", "債", "錢", "還唔起", "月光族"],
  family:["阿媽", "阿爸", "老豆", "老母", "父母", "屋企人", "返屋企", "幾時拍拖", "幾時生", "相睇", "阿哥", "家姐"],
  social:["男朋友", "女朋友", "另一半", "已讀不回", "冷戰", "ghost", "鬧交", "朋友", "拍拖", "約會", "同事", "前度"],
  work:["presentation", "deadline", "meeting", "report", "加班", "開ot", "老細", "上司", "boss", "返工", "聽日返工", "做唔切", "未做完", "開會", "ot", "開call", "未搞掂", "趕唔切", "返office"],
  future:["前途", "前路", "將來", "轉工", "辭職", "裁員", "見工", "買樓", "升職", "career", "layoff", "冇將來"],
  self:["懷疑自己", "冇信心", "唔夠好", "好失敗", "好廢", "後悔", "imposter", "burnout", "好迷茫"],
  body:["瞓唔着", "瞓唔到", "失眠", "頭痛", "好攰", "超攰", "周身痛", "冇精神", "眼瞓", "瞓唔夠"]
};
const REFRAME_TEMPLATES={
  work:[
    {"id": "work-1", "zh": {"reframe": "你已經為今日做咗好多，而家嘅任務係俾自己真正休息，唔係繼續喺腦入面開OT。", "action": "試下喺手機寫低 3 樣今日完成咗嘅嘢，然後合埋眼深呼吸 3 次。"}, "en": {"reframe": "You already did a lot today. The job now is to rest — not to keep overtime running in your head.", "action": "Write three things you finished today, then close your eyes and take three slow breaths."}},
    {"id": "work-2", "zh": {"reframe": "工作永遠做唔完，但你嘅精神需要 recharge。放低嘅嘢聽日唔會消失，但你嘅精力會。", "action": "今晚淨係諗一件事：你值得休息。其他嘢交俾聽日嘅你。"}, "en": {"reframe": "Work never ends, but your energy does. What you put down tonight will still be there; you may not be.", "action": "Hold one thought: you deserve rest. Leave the rest for tomorrow-you."}},
    {"id": "work-3", "zh": {"reframe": "你嘅焦慮嚟自責任感，而唔係能力不足。識得停低嘅人，先至行得遠。", "action": "試下用 4-7-8 呼吸法：吸 4 秒、hold 7 秒、呼 8 秒，重複 3 次。"}, "en": {"reframe": "The anxiety comes from responsibility, not lack of ability. People who can stop go further.", "action": "Try 4-7-8 breathing: in 4, hold 7, out 8. Repeat three times."}}
  ],
  social:[
    {"id": "social-1", "zh": {"reframe": "人與人之間有起有伏係正常嘅。今晚唔需要解決所有問題，俾啲空間自己同對方。", "action": "如果件事仲喺心入面轉，試下寫低你真正想表達嘅一句說話，然後放低。"}, "en": {"reframe": "Relationships rise and fall. You do not have to resolve everything tonight.", "action": "If it is still looping, write the one sentence you actually want to say — then put it down."}},
    {"id": "social-2", "zh": {"reframe": "你嘅感受係 valid 嘅，唔好因為瞓唔著就否定自己嘅情緒。但呢一刻，你嘅平靜比任何嘢都重要。", "action": "想像將呢段關係嘅煩惱放喺一個盒度，聽日先打開。今晚個盒鎖住。"}, "en": {"reframe": "Your feelings are valid. Tonight, your calm matters more than any conversation.", "action": "Put the relationship worry in a box. Open it tomorrow. Tonight the box stays closed."}},
    {"id": "social-3", "zh": {"reframe": "關係嘅嘢急唔嚟。今晚你唯一需要照顧嘅關係，係同自己嘅關係。", "action": "合埋眼，想像一個令你感到安心嘅人或者地方，停留 30 秒。"}, "en": {"reframe": "Relationships cannot be rushed. The only relationship to care for tonight is the one with yourself.", "action": "Close your eyes and picture a safe person or place for 30 seconds."}}
  ],
  self:[
    {"id": "self-1", "zh": {"reframe": "你比自己想像中更有能力，只係而家太攰所以睇唔到。每個人都有懷疑自己嘅時候，但呢啲想法唔代表事實。", "action": "諗一樣你最近做到而你覺得自豪嘅事，幾細都得。"}, "en": {"reframe": "You are more capable than the tired version of you can see. These thoughts are not facts.", "action": "Name one recent thing you are proud of, however small."}},
    {"id": "self-2", "zh": {"reframe": "負面嘅自我評價通常喺夜晚放大十倍。聽日朝早你睇返同一件事，感覺會好唔同。", "action": "今晚嘅目標唔係解決所有問題，只係安全咁渡過呢個晚上。"}, "en": {"reframe": "Self-criticism grows tenfold at night. The same thought will look different in the morning.", "action": "Tonight's goal is not solving everything. It is getting through the night safely."}},
    {"id": "self-3", "zh": {"reframe": "你喺度努力緊，呢一點本身就值得尊重。成長唔係一條直線，而係有高有低嘅旅程。", "action": "對自己講一句：「我已經做得夠好，而家我需要休息。」"}, "en": {"reframe": "You are already trying. That itself deserves respect. Growth is not a straight line.", "action": "Say: I have done enough. Now I need rest."}}
  ],
  body:[
    {"id": "body-1", "zh": {"reframe": "身體攰嘅時候，情緒都會被拖低。而家最重要嘅唔係解決問題，而係俾身體恢復。", "action": "做一個簡單嘅身體掃描：由頭頂開始，慢慢感受每個部位，放鬆佢。"}, "en": {"reframe": "When the body is tired, mood follows. Recovery comes before problem-solving.", "action": "Do a slow body scan from the crown down, and let each part drop a little."}},
    {"id": "body-2", "zh": {"reframe": "你嘅身體今日為你撐咗成日，而家係時候回報佢。攰唔係 weakness，係 signal。", "action": "試下慢慢轉動膊頭 5 次，然後深深呼一口氣，感受身體嘅重量落喺床上面。"}, "en": {"reframe": "Your body carried you all day. Tiredness is a signal, not a weakness.", "action": "Roll your shoulders five times, then exhale and let your weight drop into the bed."}},
    {"id": "body-3", "zh": {"reframe": "攰嘅時候唔好逼自己正面，接受「今日就係攰」反而係最好嘅放鬆。", "action": "閂眼，想像自己浮喺溫暖嘅水面，每呼一口氣就下沉少少，更放鬆。"}, "en": {"reframe": "When you are exhausted, do not force positivity. Accepting 'today I am tired' is the rest.", "action": "Close your eyes. Imagine floating on warm water, more relaxed with each exhale."}}
  ],
  future:[
    {"id": "future-1", "zh": {"reframe": "未來係由無數個「今日」組成嘅。你今日好好休息，就係為未來做咗最重要嘅投資。", "action": "今晚淨係諗一件事：聽日嘅第一步係乜？淨係第一步就夠。"}, "en": {"reframe": "The future is made of todays. Rest tonight is an investment, not a delay.", "action": "Name only tomorrow's first step. That is enough."}},
    {"id": "future-2", "zh": {"reframe": "焦慮嚟自對未知嘅想像，而唔係現實。大部份你擔心嘅事，最後都冇發生。", "action": "試下將你擔心嘅嘢寫成一句話，然後喺旁邊寫「呢個係事實定係想像？」"}, "en": {"reframe": "Anxiety is often imagination, not fact. Most of what you fear does not arrive.", "action": "Write the worry as one sentence, then add: fact or imagination?"}},
    {"id": "future-3", "zh": {"reframe": "你唔需要今晚就知道所有答案。好多人生最好嘅轉變，都係喺你冇計劃嘅時候出現。", "action": "合埋眼，想像 3 個月後嘅你——健康、平靜、安然。你正在朝呢個方向行緊。"}, "en": {"reframe": "You do not need every answer tonight. Many good turns arrive unplanned.", "action": "Close your eyes and picture a calmer you in three months."}}
  ],
  money:[
    {"id": "money-1", "zh": {"reframe": "財務壓力好真實，但失眠唔會令戶口多咗錢。好好休息，聽日嘅你會有更清晰嘅頭腦去應對。", "action": "今晚淨係 focus 喺你可控制嘅事：呼吸、放鬆、俾身體恢復。"}, "en": {"reframe": "Money stress is real. Staying awake will not add to the account. A rested mind thinks clearer.", "action": "Focus on what you can control tonight: breath, rest, recovery."}},
    {"id": "money-2", "zh": {"reframe": "錢嘅問題通常需要時間解決，而唔係一個晚上。你嘅健康係最重要嘅資產，唔好為錢犧牲佢。", "action": "想像將財務煩惱放喺一個文件夾入面，標籤「聽日處理」，然後放埋一邊。"}, "en": {"reframe": "Money problems take time, not a single night. Your health is the asset that remains.", "action": "File the money worry under 'tomorrow'. Put the folder aside."}},
    {"id": "money-3", "zh": {"reframe": "好多人都面對緊類似嘅壓力，你唔係一個人。一步一步嚟，今晚嘅任務只係休息。", "action": "諗一樣唔使錢但令你感到富足嘅嘢——可能係一個關係、一個回憶、一個技能。"}, "en": {"reframe": "Many people carry similar pressure. You are not alone. Tonight the task is rest.", "action": "Name one thing that makes you feel rich without costing money."}}
  ],
  family:[
    {"id": "family-1", "zh": {"reframe": "家人嘅說話有時好有重量，但佢哋嘅擔憂往往嚟自關心，只係表達方式唔同。你嘅感受同樣重要。", "action": "今晚俾自己一個 break：你唔需要滿足所有人嘅期望，尤其是臨瞓前。"}, "en": {"reframe": "Family words can land heavily. Your feelings count too. This does not have to be solved tonight.", "action": "Give yourself a break: you do not have to meet every expectation before sleep."}},
    {"id": "family-2", "zh": {"reframe": "家庭關係係長期嘅功課，唔需要一晚解決。你嘅平靜比任何對話都更有價值。", "action": "想像喺你同家人之間有一道柔和嘅光牆，保護你今晚嘅休息空間。"}, "en": {"reframe": "Family work is long-term. Your calm tonight is more valuable than any late conversation.", "action": "Imagine a soft wall of light between you and the family topic, just for tonight."}},
    {"id": "family-3", "zh": {"reframe": "你嘅人生係屬於你嘅。家人嘅期望可以參考，但你嘅幸福先係終極目標。", "action": "寫低一句：「我有權選擇自己嘅節奏。」然後深呼吸，放低。"}, "en": {"reframe": "Your life is yours. Family hopes can inform you; they do not have to drive tonight.", "action": "Write: I get to choose my own pace. Then put the pen down."}}
  ],
  study:[
    {"id": "study-1", "zh": {"reframe": "一條攰嘅大腦吸收唔到任何嘢。與其夾硬繼續，不如俾自己真正休息，聽日效率會更高。", "action": "閂晒所有 notes，今晚嘅任務係 sleep。知識會喺你瞓覺嘅時候自己整理。"}, "en": {"reframe": "A tired brain absorbs almost nothing. Rest is the higher-efficiency move.", "action": "Close the notes. Tonight's task is sleep."}},
    {"id": "study-2", "zh": {"reframe": "你嘅價值唔係由分數定義嘅。盡咗力嘅你，已經值得尊重。", "action": "諗一樣你學到而唔關考試事嘅嘢——可能係一個概念、一個技能、一個領悟。"}, "en": {"reframe": "Your worth is not a score. Effort already deserves respect.", "action": "Name one thing you learned that is not about the exam."}},
    {"id": "study-3", "zh": {"reframe": "學業壓力好多時係暫時嘅，但你嘅心理健康係長期嘅。唔好為短期目標犧牲長期健康。", "action": "合埋眼，想像你畢咗業之後嘅自己回頭望呢一刻——佢會同你講「冇事嘅，你做到」。"}, "en": {"reframe": "Study stress is often temporary. Sleep is the longer asset.", "action": "Close your eyes and hear a later you say: you made it."}}
  ],
  general:[
    {"id": "gen-1", "zh": {"reframe": "今晚唔需要解決所有問題。你嘅任務只係安全、平靜咁渡過呢個晚上。", "action": "深呼吸 3 次，每一次呼氣嘅時候想像將一個煩惱放出身體。"}, "en": {"reframe": "You do not have to solve everything tonight. The task is to get through the night safely.", "action": "Take three breaths. On each exhale, put one worry down."}},
    {"id": "gen-2", "zh": {"reframe": "煩惱喺夜晚睇落總係更大。俾自己 permission to rest——你值得。", "action": "試下喺心入面數 10 樣令你感恩嘅小事，幾簡單都得。"}, "en": {"reframe": "Worries look larger at night. Give yourself permission to rest. You deserve it.", "action": "Name ten small things you are grateful for, however ordinary."}},
    {"id": "gen-3", "zh": {"reframe": "你已經捱過咗好多你以為過唔到嘅日子。今晚都一樣會過。", "action": "將手放喺心口，感受心跳，同自己講：「我喺度，我安全，我放鬆。」"}, "en": {"reframe": "You have already survived nights you thought you would not. This one will pass too.", "action": "Hand on chest. Say: I am here. I am safe. I can rest."}}
  ]
};
function isCrisisText(text){
  const hay=String(text||"").toLowerCase();
  return CRISIS_WORDS.some(w=>hay.includes(w.toLowerCase()));
}
function extractReframeTheme(text){
  const hay=String(text||"").toLowerCase();
  for(const theme of REFRAME_THEME_ORDER){
    const words=REFRAME_THEME_WORDS[theme]||[];
    if(words.some(w=>textHasDumpKeyword(hay,w))) return theme;
  }
  return "general";
}
function pickReframeTemplate(theme){
  const pool=REFRAME_TEMPLATES[theme]||REFRAME_TEMPLATES.general;
  const used=state.pillownotes.reframeUsed||[];
  const fresh=pool.filter(item=>!used.includes(item.id));
  const pick=(fresh.length?fresh:pool)[0];
  if(pick){
    const next=[...used.filter(id=>id!==pick.id),pick.id].slice(-8);
    state.pillownotes.reframeUsed=next;
  }
  return pick;
}
function themeToWorryTag(theme){
  return {work:"工作",social:"人情",money:"錢",family:"屋企",body:"健康",study:"工作",future:"工作",self:"健康"}[theme]||"健康";
}

function addDump({text,toCanvas=false,forTomorrow=false,source="text"}){
  const tags=selectedTags();
  if(source==="voice" && !tags.includes("語音")) tags.push("語音");
  const item={id:uid(),text,tags,createdAt:isoNow(),toCanvas:false,forTomorrow,nodeId:null,source};
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
  markTonight("dump");
  save("hist.pillow");
  renderBrainDump();
  return item;
}

$("#savePillowDump").onclick=()=>{
  const v=$("#pillowDump").value.trim();
  if(!v)return toast(lang()==="zh"?"未有內容":"Nothing to save");
  addDump({text:v,source:voiceDumpUsed?"voice":"text"});
  voiceDumpUsed=false;
  toast(t("toast.dumpSaved"));
};
$("#dumpToCanvas").onclick=()=>{
  const v=$("#pillowDump").value.trim();
  if(!v)return toast(lang()==="zh"?"未有內容":"Nothing to create");
  addDump({text:v,toCanvas:true,source:voiceDumpUsed?"voice":"text"});
  voiceDumpUsed=false;
  toast(t("toast.dumpCanvas"));
};
$("#dumpToTomorrow").onclick=()=>{
  const v=$("#pillowDump").value.trim();
  if(!v)return toast(lang()==="zh"?"未有內容":"Nothing to park");
  addDump({text:v,forTomorrow:true,source:voiceDumpUsed?"voice":"text"});
  voiceDumpUsed=false;
  toast(t("toast.tomorrow"));
};

/* ========== Voice dump — Web Speech API (方案 A) ========== */
let voiceDumpUsed=false;
let voiceRec=null;
let voiceListening=false;
let voiceBaseText="";
let voiceFinalChunk="";

function speechRecognitionCtor(){
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}
function preferredSpeechLang(){
  if(lang()==="zh"){
    // Prefer HK / Cantonese where the engine supports it
    const nav=(navigator.language||"").toLowerCase();
    if(nav.startsWith("yue")||nav.includes("hk")) return "zh-HK";
    return "zh-HK";
  }
  return "en-US";
}
function setVoiceUi(state,msg){
  const btn=$("#voiceDumpBtn");
  const label=$("#voiceDumpLabel");
  const status=$("#voiceDumpStatus");
  if(!btn||!label||!status) return;
  btn.classList.toggle("listening",state==="listening");
  btn.setAttribute("aria-pressed",state==="listening"?"true":"false");
  if(state==="listening"){
    label.textContent=lang()==="zh"?"⏹ 停止":"⏹ Stop";
    status.hidden=false;
    status.className="voice-status live";
    status.textContent=msg||(lang()==="zh"?"聽緊…直接講，完成後撳停止":"Listening… tap stop when done");
  }else if(state==="unsupported"){
    label.textContent=lang()==="zh"?"🎤 不支援":"🎤 N/A";
    btn.classList.add("unsupported");
    btn.disabled=true;
    status.hidden=false;
    status.className="voice-status err";
    status.textContent=msg||(lang()==="zh"?"此瀏覽器不支援語音聽寫（建議 Chrome / Edge / Safari）":"Speech recognition not supported here");
  }else if(state==="error"){
    label.textContent=lang()==="zh"?"🎤 語音":"🎤 Voice";
    status.hidden=false;
    status.className="voice-status err";
    status.textContent=msg||"";
  }else if(state==="done"){
    label.textContent=lang()==="zh"?"🎤 語音":"🎤 Voice";
    status.hidden=false;
    status.className="voice-status ok";
    status.textContent=msg||(lang()==="zh"?"已轉成文字，可改完再儲存":"Transcribed — edit then save");
  }else{
    label.textContent=lang()==="zh"?"🎤 語音":"🎤 Voice";
    if(msg){
      status.hidden=false;
      status.className="voice-status";
      status.textContent=msg;
    }else{
      status.hidden=true;
      status.textContent="";
    }
  }
}
function stopVoiceDump(){
  // Keep voiceListening true until onend so UI settles on "done" if text arrived
  try{ if(voiceRec) voiceRec.stop(); }catch(e){}
}
function startVoiceDump(){
  const Ctor=speechRecognitionCtor();
  if(!Ctor){
    setVoiceUi("unsupported");
    toast(lang()==="zh"?"此瀏覽器不支援語音聽寫":"Speech recognition not supported");
    return;
  }
  const ta=$("#pillowDump");
  if(!ta) return;
  voiceBaseText=ta.value;
  voiceFinalChunk="";
  voiceRec=new Ctor();
  voiceRec.lang=preferredSpeechLang();
  voiceRec.continuous=true;
  voiceRec.interimResults=true;
  voiceRec.maxAlternatives=1;
  voiceRec.onstart=()=>{
    voiceListening=true;
    setVoiceUi("listening");
  };
  voiceRec.onresult=(event)=>{
    let interim="";
    for(let i=event.resultIndex;i<event.results.length;i++){
      const res=event.results[i];
      const txt=res[0]?.transcript||"";
      if(res.isFinal) voiceFinalChunk+=txt;
      else interim+=txt;
    }
    const sep=voiceBaseText && !/\s$/.test(voiceBaseText)?" ":"";
    ta.value=(voiceBaseText||"")+sep+voiceFinalChunk+(interim?interim:"");
    // keep caret at end for live dictation feel
    try{ ta.selectionStart=ta.selectionEnd=ta.value.length; }catch(e){}
    voiceDumpUsed=true;
    if(interim){
      setVoiceUi("listening", lang()==="zh"?`聽緊… ${interim.slice(-24)}`:`Listening… ${interim.slice(-24)}`);
    }
  };
  voiceRec.onerror=(event)=>{
    voiceListening=false;
    const code=event.error||"";
    let msg=lang()==="zh"?"語音輸入失敗":"Voice input failed";
    if(code==="not-allowed"||code==="service-not-allowed"){
      msg=lang()==="zh"?"請允許咪高峰權限後再試":"Allow microphone permission and retry";
    }else if(code==="no-speech"){
      msg=lang()==="zh"?"聽唔到聲音，再試一次":"No speech detected — try again";
    }else if(code==="network"){
      msg=lang()==="zh"?"語音服務需要網絡連線":"Speech service needs network";
    }else if(code==="aborted"){
      setVoiceUi(voiceFinalChunk?"done":"idle");
      return;
    }
    setVoiceUi("error",msg);
    toast(msg);
  };
  voiceRec.onend=()=>{
    const was=voiceListening;
    voiceListening=false;
    if(voiceFinalChunk.trim()||($("#pillowDump")?.value||"").trim()!==(voiceBaseText||"").trim()){
      voiceDumpUsed=true;
      setVoiceUi("done");
    }else if(was){
      setVoiceUi("idle", lang()==="zh"?"已停止":"Stopped");
    }else{
      setVoiceUi("idle");
    }
  };
  try{
    voiceRec.start();
  }catch(e){
    setVoiceUi("error", lang()==="zh"?"無法啟動語音輸入":"Could not start voice input");
  }
}
function setupVoiceDump(){
  const btn=$("#voiceDumpBtn");
  if(!btn) return;
  if(!speechRecognitionCtor()){
    setVoiceUi("unsupported");
    return;
  }
  setVoiceUi("idle");
  btn.onclick=()=>{
    if(voiceListening) stopVoiceDump();
    else startVoiceDump();
  };
}
setupVoiceDump();

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
  markTonight("bed");
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
  markTonight("still");
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
  if(p==="1"||p==="0") markTonight("wind");
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
  markTonight("wind");
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
  if(!thought)return toast(t("rf.empty"));
  if(isCrisisText(thought)){
    $("#reframeOutput").innerHTML=`<p class="rf-note">${escape(t("rf.crisis"))}</p>`;
    return;
  }
  const theme=extractReframeTheme(thought);
  const tpl=pickReframeTemplate(theme);
  if(!tpl) return toast(t("rf.empty"));
  const copy=tpl[lang()]||tpl.zh;
  $("#reframeOutput").innerHTML=`<p class="rf-theme">${escape(t("rf.theme."+theme))}</p>
    <strong>${escape(t("rf.thought"))}</strong><p>${escape(thought)}</p>
    <strong>${escape(t("rf.try"))}</strong><p>${escape(copy.reframe)}</p>
    <p class="rf-action">${escape(t("rf.next"))}：${escape(copy.action)}</p>
    <p class="rf-note">${escape(t("rf.note"))}</p>`;
  state.pillownotes.dumps.unshift({id:uid(),text:`[Reframe] ${thought}\n→ ${copy.reframe}`,tags:[themeToWorryTag(theme)],createdAt:isoNow(),toCanvas:false,forTomorrow:false,nodeId:null});
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
      ${d.source==="voice"?'<span class="bd-chip mini">voice</span>':''}
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
const TONIGHT_ORDER=["dump","wind","bed","still"];
function localDateKey(){
  const d=new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
function ensureTonight(){
  const key=localDateKey();
  let tn=state.pillownotes.tonight;
  if(!tn||tn.date!==key){
    tn={date:key,dismissed:false,done:{dump:false,wind:false,bed:false,still:false}};
    state.pillownotes.tonight=tn;
  }
  if(!tn.done) tn.done={dump:false,wind:false,bed:false,still:false};
  return tn;
}
function tonightNextId(tn){
  return TONIGHT_ORDER.find(id=>!tn.done[id])||null;
}
function markTonight(id){
  if(!TONIGHT_ORDER.includes(id)) return;
  const tn=ensureTonight();
  tn.done[id]=true;
}
function tonightGo(id){
  if(id==="dump"){
    setMobileTab("dump");
    setTimeout(()=>$("#pillowDump")&&$("#pillowDump").focus(),40);
  }else if(id==="wind"){
    setMobileTab("wind");
  }else{
    setMobileTab("sleep");
    if(id==="bed") setTimeout(()=>$("#bedCheckpoint")&&$("#bedCheckpoint").focus(),40);
    if(id==="still") setTimeout(()=>$("#stillAwakeBtn")&&$("#stillAwakeBtn").focus(),40);
  }
}
function tonightDo(id){
  tonightGo(id);
  if(id==="bed") $("#bedCheckpoint").click();
  if(id==="still") $("#stillAwakeBtn").click();
}
function tonightSkip(id){
  markTonight(id);
  const next=tonightNextId(ensureTonight());
  save("hist.pillow");
  renderTonight();
  if(next) tonightGo(next);
}
function renderTonight(){
  const card=$("#tonightCard"), restore=$("#tonightRestore");
  if(!card) return;
  const tn=ensureTonight();
  const next=tonightNextId(tn);
  const hidden=!!tn.dismissed && !!next;
  card.classList.toggle("is-hidden", hidden);
  if(restore) restore.hidden=!hidden;
  $("#tonightSteps").innerHTML=TONIGHT_ORDER.map((id,i)=>{
    const done=!!tn.done[id];
    const active=next===id;
    return `<li class="tonight-step${done?" done":""}${active?" active":""}"><b>${t("tn.step",{n:i+1})}</b>${escape(t("tn."+id))}<div>${escape(t("tn."+id+"Hint"))}</div></li>`;
  }).join("");
  const actions=$("#tonightActions");
  if(!next){
    actions.innerHTML=`<p class="tonight-note">${escape(t("tn.done"))}</p>`;
    return;
  }
  const goLabel=id=>({dump:t("tn.do"),wind:t("tn.nextWind"),bed:t("tn.nextBed"),still:t("tn.nextStill")}[id]||t("tn.do"));
  actions.innerHTML=`<button class="primary-btn" id="tonightDo">${escape(goLabel(next))}</button>
    <button class="wide-btn" id="tonightSkip">${escape(t("tn.skip"))}</button>
    <p class="tonight-note">${escape(t("tn."+next+"Hint"))}</p>`;
  $("#tonightDo").onclick=()=>tonightDo(next);
  $("#tonightSkip").onclick=()=>tonightSkip(next);
}
if($("#tonightDismiss")) $("#tonightDismiss").onclick=()=>{
  const tn=ensureTonight();
  tn.dismissed=true;
  save("hist.pillow");
  renderTonight();
};
if($("#tonightRestore")) $("#tonightRestore").onclick=()=>{
  const tn=ensureTonight();
  tn.dismissed=false;
  save("hist.pillow");
  renderTonight();
};

function renderBrainDump(){
  renderDumpList();
  renderSleepStats(false);
  renderSleepList();
  renderCheckpoints();
  renderBridgeStats();
  renderTonight();
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
function lastDumpPreview(){
  const dump=state.pillownotes.dumps.find(d=>!(d.text||"").startsWith("[Reframe]"))||state.pillownotes.dumps[0];
  if(!dump) return lang()==="zh"?"未有":"none";
  const text=(dump.text||"").replace(/\s+/g," ").slice(0,40);
  return text+(dump.text.length>40?"…":"");
}
function helperCounts(){
  return {
    dumps:state.pillownotes.dumps.filter(d=>!d.toCanvas).length,
    avg:avgSleep()?avgSleep().toFixed(1):"—",
    last:lastDumpPreview(),
    nodes:ws().nodes.length,
    connectors:ws().connectors.length
  };
}
function runAgent(prompt){
  aiMessage("user",prompt);
  setTimeout(()=>{
    const counts=helperCounts();
    let reply="";
    if(isCrisisText(prompt)) reply=t("rf.crisis");
    else if(agentMode==="sleep"||/sleep|wind|瞓|睡眠|放鬆/i.test(prompt)){
      reply=t("ai.replySleep",counts);
    }
    else if(agentMode==="organize"||/organize|整理/i.test(prompt)){reply=t("ai.replyOrganize",counts);autoOrganize()}
    else if(agentMode==="brainstorm"||/idea|brainstorm|靈感|腦力/i.test(prompt)){reply=t("ai.replyBrainstorm",counts);addBrainstorm()}
    else if(agentMode==="summarize"||/summarize|摘要/i.test(prompt)){reply=t("ai.replySummarize",counts)}
    else if(agentMode==="plan"||/plan|計畫|規劃/i.test(prompt)){reply=t("ai.replyPlan",counts);addPlan()}
    else reply=t("ai.replyDefault",counts);
    aiMessage("ai",reply);if(state.appMode==="canvas")render();
  },220);
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
