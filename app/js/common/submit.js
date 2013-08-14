//将输入框里面注入内容
document.getElementsByTagName("iframe")[0].contentDocument.getElementsByTagName("div")[0].innerHTML = '顶顶';
//点击发表回复按钮
document.querySelector('#submit_button').click();