function showNotification() {
  // document.title = "您有一条新消息 🎉"; // 设置新消息提示
  // setTimeout(() => {
  //   // document.title = originalTitle; // 恢复原始标题
  // }, 3000); // 3秒后恢复原始标题
  /** 滚动标题 */
  // const originalTitle = "有一条新消息"; // 长标题文本
  // let displayedTitle = originalTitle;
  // // 定义滚动函数
  // function scrollTitle() {
  //   displayedTitle = displayedTitle.substring(1) + displayedTitle.charAt(0); // 每次移除第一个字符并添加到末尾
  //   document.title = displayedTitle; // 更新标题
  // }
  // // 每200毫秒更新一次标题
  // setInterval(scrollTitle, 200);

  if (window.Notification) {
    // 检查用户是否允许通知
    if (Notification.permission === "granted") {
      // 如果已经允许，则直接创建通知
      var notification = new Notification("您有一条信息", {
        body: "这是通知的详细内容",
        icon: "favicon.ico", // 通知的图标
      });
    } else {
      // 如果尚未允许，请求用户授权
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          var notification = new Notification("您有一条信息", {
            body: "这是通知的详细内容",
            icon: "favicon.ico",
          });
        }
      });
    }
  }
}