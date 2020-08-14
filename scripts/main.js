setTimeout("GoSomewhere(5)", 120000); //120000=2min

//  Datos basicos de utilidad: Usuario, y Fecha
const urlParams = window.location.search;
const user = urlParams.split("=")[1];
const today = new Date();
var date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

function GoSomewhere(index) {
  if (index == 0) window.location = "Menu.html";
  else if (index == 1) window.location = "Gain.html" + urlParams;
  else if (index == 2) window.location = "Spend.html" + urlParams;
  else if (index == 3) window.location = "Pay.html" + urlParams;
  else window.location = "../index.html";
}

function registra(aux) {
  var description = document.getElementById("Type").value.toLowerCase();
  var cost = document.getElementById("Cost").value;
  var tip = document.getElementById("Tip").value;
  var isCard = document.getElementById("Card").checked;
  if (isCard) isCard = 1;
  else isCard = 0;
  sendData = {
    do: aux,
    date: date,
    user: user,
    description: description,
    cost: cost,
    tip: tip,
    card: isCard,
  };
  if (isDataFull(sendData)) {
    $.post(
      "../scripts/update.php", //<--Note http
      sendData,
      function (data, status) {
        if (data == "success") {
          alert("Registro exitoso");
        } else {
          alert("Un error ocurrió. Intentar más tarde, o hablarle al chacho");
        }
      }
    );
  }
}

function isDataFull(checkData) {
  if (checkData["description"] == "" || checkData["cost"] == "") {
    alert("Los datos no estan completos");
    return false;
  }
  return true;
}
