window.onload = function() {
  $("#set").bind("click",clean);
  $("#submit").bind("click",change);
  if(window.location.href.indexOf("username") != -1)
    alert("尝试登录未注册用户!");
}

function clean() {
  $(".info").val("");
}

function change() {
  if(!check())
    return;
  $.ajax({
    method: 'POST',
    url: "/",
    data: {
      username: $("input:eq(0)").val(),
      number: $("input:eq(1)").val(),
      tel: $("input:eq(2)").val(),
      mail: $("input:eq(3)").val()
    },
    success: function(data) {
      var report = "";
      if(data[0] == "1")
        report += "用户名已被注册\n";
      if(data[1] == "1")
        report += "学号已被注册\n";
      if(data[2] == "1")
        report += "电话号码已被注册\n";
      if(data[3] == "1")
        report += "邮箱已被注册\n";
      if(report)
        alert(report);
      else
        window.location.href="?username="+$("input:eq(0)").val();    //GET second time
    }
  });
  // $.get("/","username="+$("input:eq(0)").val(),function(info) { 
  //   (function(info) {
  //     alert(info);
  //   })(info);
  // });  
}

function check() {
  var report = "";
  var name = /^[a-zA-Z][_0-9a-zA-Z]{5,17}$/;
  var number = /^[1-9]\d{7,}$/;
  var tel = /^[1-9]\d{10,}$/;
  var mail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  if(!$("input:eq(0)").val())
    report += "请填写用户名\n";
  else if(!name.test($("input:eq(0)").val()))
    report += "用户名6~18位英文字母、数字或下划线，必须以英文字母开头\n";
  if(!$("input:eq(1)").val())
    report += "请填写学号\n";
  else if(!number.test($("input:eq(1)").val()))
    report += "学号8位数字，不能以0开头\n";
  if(!$("input:eq(2)").val())
    report += "请填写手机号码\n";
  else if(!tel.test($("input:eq(2)").val()))
    report += "电话11位数字，不能以0开头\n";
  if(!$("input:eq(3)").val())
    report += "请填写邮箱\n";
  // else if(!tel.test($("input:eq(3)").val()))
  //   report += "邮箱格式不正确,请端正你的态度\n";
  if(report) {
    alert(report);
    return false;
  }
  return true;
}