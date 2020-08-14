<?php
    //  ---Variables
    $worker=$_POST["user"];
    $date=$_POST["date"];
    $description=$_POST["description"];
    $charged=$_POST["cost"];
    $tipped=$_POST["tip"];
    $isCard=$_POST["card"];
    $type=$_POST["do"];
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
    $sql = "INSERT INTO `flux` (`ID`, `Worker`, `Date`, `Type`, `Description`, `Charged`, `Tipped`, `isCard`) 
        VALUES (NULL, '$worker', '$date', '$type', '$description', '$charged', '$tipped', '$isCard');";
    $conn->query($sql);
    $sql = "SELECT * FROM `daily` WHERE `Date`='$date' AND `Worker`='$worker';";
    $result = $conn->query($sql);
    //  ---Registro en la DB
    if($type=="gasto"){
        // GASTO
        if ($result->num_rows == 0) {
            $payment=-$charged;
            $sql = "INSERT INTO `daily` (`Date`, `Worker`, `Payment`, `Tips`) 
                VALUES ('$date', '$worker', '$payment', '$tipped');";
        } else {
            $row=$result->fetch_assoc();
            $payment=$row["Payment"] - $charged;
            $sql = "UPDATE  `daily` SET `Payment`='$payment'
                WHERE `Date`='$date' AND `Worker`='$worker';";
        }
        
    }
    else{
        // INGRESO
        if ($result->num_rows == 0) {
            $payment=$charged/2;
            $sql = "INSERT INTO `daily` (`Date`, `Worker`, `Payment`, `Tips`) 
                VALUES ('$date', '$worker', '$payment', '$tipped');";
        } else {
            $row=$result->fetch_assoc();
            $payment=$row["Payment"] + ($charged/2);
            $tips=$row["Tips"] + $tipped;
            $sql = "UPDATE  `daily` SET `Payment`='$payment', `Tips`='$tips' 
                WHERE `Date`='$date' AND `Worker`='$worker';";
        }
    }
    if ($conn->query($sql) === FALSE) {
        $return="failed";
    }
    $conn->close();

    //  ---Valores a retornar en formato JSON
    echo $return;
?>