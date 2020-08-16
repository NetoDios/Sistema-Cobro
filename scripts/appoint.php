<?php
    //  ---Variables
    $part=$_POST["part"];
    $date=$_POST["date"];
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
    if($part==1){
        $sql = "SELECT * FROM `appoint` WHERE `Date`='$date';";
        $result = $conn->query($sql);
        //  ---Registro en la DB
        if ($result->num_rows > 0) {
            $index=0;
            while($row=$result->fetch_assoc())
            {
                $aux=array("worker"=>$row["Worker"], "desc"=>$row["Description"], "time"=>$row["Time"]);
                $return[$index] = $aux;
                $index=$index+1;
            }
            echo json_encode($return);
        }else{
            echo "Error creating database: " . $conn->error;
        }
        $conn->close();
    }else{
        $worker=$_POST["user"];
        $description=$_POST["desc"];
        $time=$_POST["time"];
        $sql = "INSERT INTO `appoint` (`ID`, `Worker`, `Date`, `Description`, `Time`) 
        VALUES (NULL, '$worker', '$date', '$description', '$time');";
        $result = $conn->query($sql);
        if($result === TRUE) echo "success";
        else {
            echo "failed";
            echo "Error creating database: " . $conn->error;
        }
        $conn->close();
    }
?>