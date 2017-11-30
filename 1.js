window.onload = function() {
  $("#set").bind("click",clean);
  $("#submit").bind("click",change);
  if(window.location.href.indexOf("username") != -1)
    alert("尝试登录未注册用户!");

  document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode == 13)  //left
          change();      
  };   
}

function clean() {
  $(".info").val("");
  clean_warn();
}

function change() {
  if(!check())
    return;
  clean_warn();
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
      if(data[0] == "1")
        warn("0","Username is already taken");
      if(data[1] == "1")
        warn("1","Id is already taken");
      if(data[2] == "1")
        warn("2","Telephone is already taken");
      if(data[3] == "1")
        warn("3","Email is already taken");
      if(data[0] == "0" && data[1] == "0" && data[2] == "0" && data[3] == "0")
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
  var check = true;
  var name = /^[a-zA-Z][_0-9a-zA-Z]{5,17}$/;
  var number = /^[1-9]\d{7,}$/;
  var tel = /^[1-9]\d{10,}$/;
  var mail = /^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/;
  if(!$("input:eq(0)").val()) {
    warn("0","Username can't be blank");
    check = false;
  }
  else if(!name.test($("input:eq(0)").val())) {
    warn("0","Use letter,numeral or underline and begin with letter.\
               (minimum is 6 and maximum is 18)");
    check = false;
  }
  if(!$("input:eq(1)").val()) {
    warn("1","Id can't be blank");
    check = false;
  }
  else if(!number.test($("input:eq(1)").val())) {
    warn("1","Use eight numeral and should not begin with zero")
    check = false;
  }
  if(!$("input:eq(2)").val()) {
    warn("2","Telephone can't be blank");
    check = false;
  }
  else if(!tel.test($("input:eq(2)").val())) {
    warn("2","Use elevent numeral and should not begin with zero");
    check = false;
  }
  if(!$("input:eq(3)").val()) {
    warn("3","Email can't be blank");
    check = false;
  }
  else if(!mail.test($("input:eq(3)").val())) {
    warn("3","Email format is not correct");
    check = false;
  }
  return check;
}

function warn(id, report) {
  $(".warning:eq("+id+")").text(report);
}

function clean_warn() {
  $(".warning").text("");
}