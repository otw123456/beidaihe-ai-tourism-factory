const $=(s,r=document)=>r.querySelector(s);const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const toast=(msg)=>{const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),2200)};
const skillGroups={
 strategy:[
  {code:"SK-01",name:"游客画像扫描",desc:"将客群特征转译为内容偏好、情绪触点与决策障碍。",input:"客群 / 季节 / 场景",output:"洞察卡片 + 内容机会",gate:"信息完整度 ≥ 85%"},
  {code:"SK-02",name:"目的地母题提炼",desc:"从地域资源中提炼可长期经营的内容母题。",input:"资源清单 / 品牌目标",output:"母题矩阵 + 叙事边界",gate:"差异化与延展性审查"},
  {code:"SK-03",name:"平台趋势透镜",desc:"识别平台语境和内容结构，不盲目追逐短期热点。",input:"平台 / 人群 / 时间窗",output:"趋势机会 + 风险提示",gate:"品牌适配优先"}
 ],
 writing:[
  {code:"SK-08",name:"60秒短视频编剧",desc:"把传播主题转化为可拍摄的开场钩子、镜头与旁白。",input:"主题 / 人群 / 场景",output:"脚本 + 分镜 + 拍摄清单",gate:"前3秒钩子检查"},
  {code:"SK-09",name:"文旅微短剧架构",desc:"设计人物关系、情绪弧和连续剧集悬念。",input:"人物 / 地点 / 集数",output:"人物小传 + 分集梗概",gate:"场景可拍摄性审查"},
  {code:"SK-10",name:"一稿多平台改写",desc:"保持核心信息一致，自动适配不同平台表达。",input:"母稿 / 平台矩阵",output:"多规格发布稿",gate:"平台语气一致性"}
 ],
 visual:[
  {code:"SK-14",name:"视觉风格导演",desc:"建立色彩、光线、镜头和材质的统一视觉语言。",input:"主题 / 气质 / 季节",output:"视觉DNA + 参考方向",gate:"城市品牌一致性"},
  {code:"SK-15",name:"海报构图规划",desc:"生成可执行的主视觉构图与文案层级建议。",input:"传播主题 / 版式",output:"构图草案 + 元素清单",gate:"信息层级检查"},
  {code:"SK-16",name:"多规格资产适配",desc:"将主视觉适配横屏、竖屏、封面及户外比例。",input:"主视觉 / 渠道规格",output:"资产适配清单",gate:"安全区域检查"}
 ],
 governance:[
  {code:"SK-20",name:"文旅事实核验",desc:"对地点、文化与服务信息进行交付前检查。",input:"内容稿 / 知识库",output:"核验清单 + 修改建议",gate:"高风险项零遗漏"},
  {code:"SK-21",name:"品牌语气审校",desc:"检测表达是否符合目的地品牌语气与传播边界。",input:"品牌规范 / 内容稿",output:"一致性评分",gate:"评分 ≥ 85"},
  {code:"SK-22",name:"平台发布检查",desc:"识别标题、封面、长度与敏感表达风险。",input:"发布稿 / 平台",output:"上线检查单",gate:"全部必检项通过"}
 ]
};
let currentSkills=skillGroups.strategy;
function renderSkills(group="strategy",index=0){currentSkills=skillGroups[group];const list=$("#skillList");list.innerHTML=currentSkills.map((s,i)=>`<button class="${i===index?'active':''}" data-index="${i}"><span>${s.code.slice(-2)}</span><div><b>${s.name}</b><small>${s.code} · READY</small></div></button>`).join("");renderSkillDetail(currentSkills[index]);$$('#skillList button').forEach(b=>b.onclick=()=>{ $$('#skillList button').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderSkillDetail(currentSkills[+b.dataset.index])})}
function renderSkillDetail(s){$("#skillDetail").innerHTML=`<span class="skill-code">${s.code} · ENCAPSULATED SKILL</span><h3>${s.name}</h3><p>${s.desc}</p><div class="skill-schema"><div class="schema-row"><span>标准输入</span><b>${s.input}</b></div><div class="schema-row"><span>标准输出</span><b>${s.output}</b></div><div class="schema-row"><span>质量门禁</span><b>${s.gate}</b></div></div><div class="protected">🔒 核心提示词、模型参数与内部执行链路受保护</div>`}
$$('[data-skill-group]').forEach(btn=>btn.onclick=()=>{$$('[data-skill-group]').forEach(x=>x.classList.remove('active'));btn.classList.add('active');renderSkills(btn.dataset.skillGroup)});renderSkills();

const outputTemplates={
 strategy:d=>`<div class="generated"><div class="output-meta"><span>CAMPAIGN MASTER PLAN · AI协同生成</span><b>审校通过</b></div><h3>${d.place} · 季节传播主案</h3><p class="slogan">到北戴河，把时间还给自己。</p><div class="theme-card"><span>核心传播母题</span><b>「海边的另一种时间」</b><p>面向${d.audience}，以${d.tone}为内容气质，在${d.channel}建立从清晨到夜晚的连续叙事。</p></div><div class="output-list"><div class="output-item"><span>01</span><div><b>情绪钩子：城市很快，海风很慢</b><small>用时间反差建立第一记忆点</small></div></div><div class="output-item"><span>02</span><div><b>内容支柱：日出 / 海风 / 候鸟 / 慢生活</b><small>四条内容线可连续运营一个季节</small></div></div><div class="output-item"><span>03</span><div><b>转化设计：收藏路线＋周末出发清单</b><small>把观看兴趣转化为出游行动</small></div></div></div><div class="tag-row"><span>#北戴河的另一种时间</span><span>#把周末还给海风</span><span>#日出收藏计划</span></div></div>`,
 video:d=>`<div class="generated"><div class="output-meta"><span>60S VIDEO SCRIPT · SK-08</span><b>可拍摄</b></div><h3>《把清晨交给北戴河》</h3><p class="slogan">${d.place}主题短视频 · 60秒电影感版本</p><div class="output-list"><div class="output-item"><span>0-3</span><div><b>黑场海浪声，第一束光切入海平面</b><small>字幕：你有多久，没有认真等一次日出？</small></div></div><div class="output-item"><span>4-18</span><div><b>鞋踩湿沙、热咖啡、候鸟掠过的细节组接</b><small>旁白：城市用分钟计算生活，海边用潮汐。</small></div></div><div class="output-item"><span>19-42</span><div><b>游客从独处到同行，镜头由近景逐渐打开</b><small>音乐进入主旋律，构建情绪上扬。</small></div></div><div class="output-item"><span>43-60</span><div><b>日出全景＋主题落版</b><small>结尾：到北戴河，把时间还给自己。</small></div></div></div><div class="tag-row"><span>9:16 主版</span><span>16:9 城市屏</span><span>3条15秒切片</span></div></div>`,
 drama:d=>`<div class="generated"><div class="output-meta"><span>MICRO DRAMA BIBLE · SK-09</span><b>3集结构</b></div><h3>微短剧《日出之前》</h3><p class="slogan">一场错过的约定，在北戴河重新开始。</p><div class="theme-card"><span>人物关系</span><b>返乡摄影师 × 城市策展人 × 一封未寄出的信</b><p>用三次日出串联重逢、选择与和解，让景点成为推动故事的角色。</p></div><div class="output-list"><div class="output-item"><span>EP1</span><div><b>《没有等到的人》</b><small>鸽子窝日出前，女主捡到十年前未寄出的明信片。</small></div></div><div class="output-item"><span>EP2</span><div><b>《海风知道答案》</b><small>两人在旧路线中寻找寄信人，城市记忆逐步显影。</small></div></div><div class="output-item"><span>EP3</span><div><b>《今天的第一束光》</b><small>答案并非重来，而是决定从这里重新出发。</small></div></div></div></div>`,
 social:d=>`<div class="generated"><div class="output-meta"><span>SOCIAL MATRIX · SK-10</span><b>7日内容</b></div><h3>${d.place}种草矩阵</h3><p class="slogan">为${d.audience}设计的七天连续发布计划</p><div class="output-list"><div class="output-item"><span>D1</span><div><b>收藏型：北戴河日出机位与时间清单</b><small>价值钩子 · 提升收藏</small></div></div><div class="output-item"><span>D2</span><div><b>情绪型：一个人看海的松弛瞬间</b><small>共鸣钩子 · 提升评论</small></div></div><div class="output-item"><span>D3</span><div><b>路线型：24小时慢游地图</b><small>行动钩子 · 促进出发</small></div></div><div class="output-item"><span>D4-7</span><div><b>人物、味觉、候鸟与夜色四组内容</b><small>建立完整目的地记忆</small></div></div></div><div class="tag-row"><span>首图模板 × 3</span><span>标题方向 × 12</span><span>评论区引导 × 4</span></div></div>`
};
let lastData=null,activeTab="strategy";
function getData(){return {place:$('input[name="place"]:checked').value,audience:$('#audience').value,channel:$('#channel').value,format:$('#format').value,tone:$('#tone').value,objective:$('#objective').value}}
function renderOutput(){if(lastData)$('#resultContent').innerHTML=outputTemplates[activeTab](lastData)}
$$('[data-tab]').forEach(btn=>btn.onclick=()=>{$$('[data-tab]').forEach(x=>x.classList.remove('active'));btn.classList.add('active');activeTab=btn.dataset.tab;renderOutput()});
$('#briefForm').addEventListener('submit',e=>{e.preventDefault();lastData=getData();const steps=$$('.flow-step'),map=$('#flowMap'),log=$('#flowLog'),status=$('#flowStatus'),button=$('.run-btn');button.disabled=true;map.classList.add('running');status.textContent='协作执行中';$('#resultContent').innerHTML='<div class="empty-result"><div class="pulse-logo">✦</div><h3>正在装配智能体工作流</h3><p>任务解构完成，正在调用场景知识与创意 Skills…</p></div>';steps.forEach(s=>s.classList.remove('active','done'));const logs=['识别目标客群与内容机会','装配北戴河场景知识包','生成并评估三组传播母题','将主创意转换为可拍摄脚本','创建视觉语言与资产规格','执行事实、品牌与平台审校'];steps.forEach((step,i)=>setTimeout(()=>{if(i>0){steps[i-1].classList.remove('active');steps[i-1].classList.add('done')}step.classList.add('active');log.innerHTML=`<span>Agent ${String(i+1).padStart(2,'0')}</span>${logs[i]}…`;if(i===steps.length-1)setTimeout(()=>{step.classList.remove('active');step.classList.add('done');status.textContent='任务完成';log.innerHTML='<span>系统</span>6个智能体已完成协作，内容资产通过4道质量门禁。';button.disabled=false;renderOutput();toast('内容资产包已生成')},650)},i*520))});
$('#copyBtn').onclick=async()=>{if(!lastData)return toast('请先生成一份内容方案');const text=$('#resultContent').innerText;try{await navigator.clipboard.writeText(text);toast('方案摘要已复制')}catch{toast('当前环境不支持复制')}};
$('#presentationBtn').onclick=()=>{document.body.classList.toggle('presentation');toast(document.body.classList.contains('presentation')?'已进入全屏演示模式':'已退出演示模式')};
$('#backToTop').onclick=()=>$('#factory').scrollIntoView({behavior:'smooth'});
$$('.topnav a').forEach(a=>a.addEventListener('click',()=>{$$('.topnav a').forEach(x=>x.classList.remove('active'));a.classList.add('active')}));

