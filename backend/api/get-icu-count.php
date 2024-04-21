<?php
include_once("../inc/connection.php");
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // query..
    $query = 'SELECT icu.icu_code , icu.specialization , icu.img_name , hospital.name as "hospitalName" FROM `icu`  LEFT JOIN hospital ON hospital.id = icu.hospital_id;';
    $runQuery = mysqli_query($connection, $query);
    if ($runQuery) {
        $hospital = mysqli_fetch_all($runQuery , MYSQLI_ASSOC);
        $response["status"] = true;
        $response["message"] = " نجحت العملية  ";
        $response["data"] = $hospital;
        echo json_encode($response);
    }
} else {
    $response["status"] = false;
    $response["message"] = "Method Not Allowd";
    echo json_encode($response);
}
mysqli_close($connection);
