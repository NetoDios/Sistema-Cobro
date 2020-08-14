setTimeout("GoSomewhere()", 120000); //120000=2min

//  Datos basicos de utilidad: Usuario, y Fecha
const urlParams = window.location.search;
const user = urlParams.split("=")[1];
const today = new Date();
var date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

function GoSomewhere() {
  window.location = "../index.html";
}
cargaHeader();
cargaData();

function cargaHeader() {
  sendData = {
    date: date,
    user: user,
    part: 1,
  };
  $.post(
    "../scripts/loadData.php", //<--Note http
    sendData,
    function (data, status) {
      money = JSON.parse(data);
      document.getElementById("Name").innerHTML = money["Worker"];
      document.getElementById("Pay").innerHTML = money["Pay"];
      if (parseInt(money["Tips"]) > 0)
        document.getElementById("Pay").innerHTML += " + " + money["Tips"];
      document.getElementById("Pay").innerHTML +=
        " => " + (parseInt(money["Pay"]) + parseInt(money["Tips"]));
    }
  );
}

function cargaData() {
  sendData = {
    date: date,
    user: user,
    part: 2,
  };
  sec = document.getElementById("Cuts");
  $.post(
    "../scripts/loadData.php", //<--Note http
    sendData,
    function (data, status) {
      myCuts = JSON.parse(data);
      for (let i = 0; i < myCuts.length; i++) {
        job = myCuts[i];
        span = document.createElement("SPAN");
        span.innerHTML = job["Des"] + ": " + job["Charged"];
        if (job["Tip"] > 0) span.innerHTML += " + " + job["Tip"];
        sec.appendChild(span);
      }
    }
  );
}
