<?php
    //  ---Variables
    $part=$_POST["part"];
    $user=$_POST["user"];
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
    if($part==1)
    {
        $sql = "SELECT * FROM `daily` WHERE `Date`='$date' AND `Worker`='$user';";
        $result = $conn->query($sql);
        //  ---Registro en la DB
        if ($result->num_rows == 0) {
            $return="failed";
        } else {
            $daily=$result->fetch_assoc();
            $sql = "SELECT * FROM `workers` WHERE `ID`='$user';";
            $result = $conn->query($sql);
            $worker=$result->fetch_assoc();
            $return=array("Pay"=>$daily["Payment"], "Tips"=>$daily["Tips"], "Worker"=>$worker["Name"]);
            echo json_encode($return);
        }
        $conn->close();
    }
    else{
        $sql = "SELECT * FROM `flux` WHERE `Date`='$date' AND `Worker`='$user';";
        $result = $conn->query($sql);
        //  ---Registro en la DB
        if ($result->num_rows > 0) {
            $index=0;
            while($row=$result->fetch_assoc())
            {
                $aux=array("Des"=>$row["Description"], "Charged"=>$row["Charged"], "Tip"=>$row["Tipped"], "Card"=>$row["isCard"]);
                $return[$index] = $aux;
                $index=$index+1;
            }
            echo json_encode($return);
        }
        $conn->close();
    }
    
?>