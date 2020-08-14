function log() {
  var user = document.getElementById("UserName").value.toLowerCase();
  var pass = document.getElementById("Password").value;
  valid(user, pass);
}

function valid(u, p) {
  sendData = {
    user: u,
    pass: p,
  };
  $.post(
    "scripts/login.php", //<--Note http
    sendData,
    function (data, status) {
      if (data == "success") {
        window.location.href = "sections/Menu.html?user=" + u;
      } else {
        message = "Los datos no concuerdan, vuelva a revisarlos";
        alert(message);
      }
    }
  );
  return true;
}
