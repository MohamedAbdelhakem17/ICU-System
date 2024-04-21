<?php
include_once("../inc/connection.php");
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // query..
    $query = "SELECT icu.specialization, icu.icu_code,icu.img_name , icu.price, CAST(AVG(icu_rate.rate) AS UNSIGNED) AS avg_rating FROM icu INNER JOIN icu_rate ON icu.icu_code = icu_rate.icu_id GROUP BY icu.icu_code ORDER BY avg_rating DESC LIMIT 3;;
    ";
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
