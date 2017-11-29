window.onload = function() {
  $("#set").bind("click",clean);
  $("#submit").bind("click",change);
}

function clean() {
  $(".info").val("");
}

function change() {
  $.ajax({
    method: 'POST',
    url: "/",
    data: {
      username: $("input:eq(0)").val(),
      number: $("input:eq(1)").val(),
      tel: $("input:eq(2)").val(),
      mail: $("input:eq(3)").val()
    },
  });
  window.location.href="?username="+$("input:eq(0)").val(); 
}