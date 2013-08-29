var list = [
  '活动',
  '支持支持',
  '活动很给力',
  '我想中奖',
  '沙发沙发',
  '三国很好玩，期待期待',
  '惊世公测，绝不错过',
  '烽火戏诸侯'
]
//将输入框里面注入内容
document.getElementsByTagName("iframe")[0].contentDocument.getElementsByTagName("div")[0].innerHTML = list[Math.floor(Math.random()*list.length)];
//点击发表回复按钮
document.querySelector('#submit_button').click();