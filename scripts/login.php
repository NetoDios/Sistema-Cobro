<?php
    //  ---Variables
    $user=$_POST["user"];
    $pass=$_POST["pass"];
    $return="success";
    
    //  ---Base de Datos, Coneccion
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "mlbs";
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        $return="failed";
        die("Connection failed: " . $conn->connect_error);
    }
    $sql = "SELECT * FROM `workers` WHERE `ID`='$user';";
    $result = $conn->query($sql);
    //  ---Registro en la DB
    if ($result->num_rows == 0) {
        $return="failed";
    } else {
        $row=$result->fetch_assoc();
        if($row["isActive"]==0) $return="failed";
        if($row["Password"] != $pass) $return="failed";
    }
    $conn->close();
    //  ---Valores a retornar en formato JSON
    echo $return;
?>