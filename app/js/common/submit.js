var list = [
  'Q-Learning赞一个！',
  '感谢Q-Learning的美好课程',
  'Q-Learning越做越好！',
  '活动不错'
]
//将输入框里面注入内容
document.getElementsByTagName("iframe")[0].contentDocument.getElementsByTagName("div")[0].innerHTML = list[Math.floor(Math.random()*list.length)];
//点击发表回复按钮
document.querySelector('#submit_button').click();