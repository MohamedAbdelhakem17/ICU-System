<?php
include_once("../inc/connection.php");
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $id = $_GET["id"] ;
    $query = "SELECT * FROM `hospital` WHERE id =$id;";
    $runQuery = mysqli_query($connection, $query);
    if (mysqli_num_rows($runQuery) == 1) {
        $query = "DELETE FROM `hospital` WHERE id =$id;";
        $runQuery = mysqli_query($connection, $query);
        if ($runQuery) {
            $response["status"] = true;
            $response["message"] = " نجحت العملية  ";
            echo json_encode($response);
        }
    } else {
        $response["status"] = false;
        $response["message"] = "المستشفى غير موجودة";
        echo json_encode($response);
    }
} else {
    $response["status"] = false;
    $response["message"] = "Method Not Allowd";
    echo json_encode($response);
}
mysqli_close($connection);