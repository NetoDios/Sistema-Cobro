setTimeout("GoSomewhere(5)", 180000); //180000=3min
function GoSomewhere(index) {
  window.location = "../index.html";
}

//  Datos basicos de utilidad: Fecha
const today = new Date();
var date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

fillDoc();
cargarCitas();

function fillDoc() {
  console.log("FillDoc:");
  table = document.getElementById("Main");
  for (let index = 10; index <= 20; index++) {
    auxSection = document.createElement("DIV");
    auxTime = document.createElement("BUTTON");
    auxDescription = document.createElement("DIV");

    num = index % 13;
    if (index >= 13) num++;
    auxTime.innerHTML = num + ":00";
    auxTime.className = "Time Center Color-Rojo";
    auxTime.onclick = function () {
      makeAppointment(index);
    };
    auxDescription.className = "Appoint Color-Amarillo";
    auxSection.id = "A" + index;
    auxSection.className = "Hour";
    auxSection.appendChild(auxTime);
    auxSection.appendChild(auxDescription);
    table.appendChild(auxSection);
  }
}

function cargarCitas() {
  console.log("CargarCitas:");
  sendData = {
    date: date,
    part: 1,
    user: "none",
    desc: "description",
    time: "7:00",
  };
  $.post(
    "../scripts/appoint.php", //<--Note http
    sendData,
    function (data, status) {
      auxData = data.split(":");
      if (data[0] == "[") {
        myData = JSON.parse(data);
        console.log(myData);
        for (const key in myData) {
          cita = myData[key];
          _time = cita["time"].split(":")[0];
          var auxDesc = document.getElementById("A" + _time).children[1];
          auxDesc.className = "Appoint";

          auxCita = document.createElement("DIV");
          citaTime = document.createElement("DIV");
          citaDesc = document.createElement("DIV");
          descWorker = document.createElement("SPAN");
          descClient = document.createElement("SPAN");

          descWorker.innerHTML = cita["worker"];
          descClient.innerHTML = cita["desc"];
          citaDesc.appendChild(descWorker);
          citaDesc.appendChild(descClient);
          citaDesc.className = "Columna";

          citaTime.innerHTML = cita["time"];
          citaTime.className = "Center Color-Oscureser Borde-Redondo";

          auxCita.appendChild(citaTime);
          auxCita.appendChild(citaDesc);
          auxDesc.appendChild(auxCita);

          fix(auxDesc.children);
        }
      } else if (auxData[1] != " ") {
        console.log(auxData);
        alert("Un error ocurrió. Intentar más tarde, o hablarle al chacho");
      }
    }
  );
}

function makeAppointment(time) {
  console.log("MakeAppoitment:");
  var des = ["Barbero:", "Descripción:", "Hora:"];
  var phd = ["Nombre", "Cliente", time + ":00"];
  var answ = [];
  for (let index = 0; index < des.length; index++) {
    answ[index] = prompt(des[index], phd[index]);
  }
  sendData = {
    date: date,
    part: 0,
    user: answ[0],
    desc: answ[1],
    time: answ[2],
  };
  $.post(
    "../scripts/appoint.php", //<--Note http
    sendData,
    function (data, status) {
      console.log(data);
      if (data != "failed") {
        _time = answ[2].split(":")[0];
        var auxDesc = document.getElementById("A" + _time).children[1];
        auxDesc.className = "Appoint";

        auxCita = document.createElement("DIV");
        citaTime = document.createElement("DIV");
        citaDesc = document.createElement("DIV");
        descWorker = document.createElement("SPAN");
        descClient = document.createElement("SPAN");

        descWorker.innerHTML = cita["worker"];
        descClient.innerHTML = cita["desc"];
        citaDesc.appendChild(descWorker);
        citaDesc.appendChild(descClient);
        citaDesc.className = "Columna";

        citaTime.innerHTML = cita["time"];
        citaTime.className = "Center Color-Oscureser Borde-Redondo";

        auxCita.appendChild(citaTime);
        auxCita.appendChild(citaDesc);
        auxCita.className = "Columna";
        auxDesc.appendChild(auxCita);

        fix(auxDesc.children);
      } else {
        alert("Un error ocurrió. Intentar más tarde, o hablarle al chacho");
      }
    }
  );
}

function fix(auxChildren) {
  var len = auxChildren.length;
  if (len > 4) len = 5;
  for (const key in auxChildren) {
    var fixWidth = auxChildren[key];
    fixWidth.className = "Borde-Redondo Color-Amarillo W" + len;
  }
}
