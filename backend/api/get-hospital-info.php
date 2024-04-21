<?php
include_once("../inc/connection.php");
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $id = $_GET["id"];
    // query..
    $query = "SELECT hospital.name , hospital.address  FROM hospital where hospital.id=$id;";
    $runQuery = mysqli_query($connection, $query);
    if ($runQuery) {
        $hospital = mysqli_fetch_all($runQuery, MYSQLI_ASSOC);
        $query = "SELECT *  FROM icu where hospital_id=$id;";
        $runQuery = mysqli_query($connection, $query);
        if ($runQuery) {
            $runQuery = mysqli_query($connection, $query);
            $icu = mysqli_fetch_all($runQuery, MYSQLI_ASSOC);
            $hospital["icu"] = $icu;
            $response["status"] = true;
            $response["message"] = " نجحت العملية  ";
            $response["data"] = $hospital;
            echo json_encode($response);
        }
    }
} else {
    $response["status"] = false;
    $response["message"] = "Method Not Allowd";
    echo json_encode($response);
}
mysqli_close($connection);