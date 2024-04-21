<?php
include_once("../inc/connection.php");
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $id=$_GET["id"];
    // query..
    $query = "SELECT icu_rate.comment , icu_rate.rate AS rate , user.name , DATE_FORMAT( Time(add_at), '%h:%i %p') As addTime , DATE(add_at) As addDate FROM icu_rate INNER JOIN user ON icu_rate.user_id = user.id WHERE icu_rate.icu_id=$id ORDER BY `icu_rate`.`id` DESC;";
    $runQuery = mysqli_query($connection, $query);
    if ($runQuery) {
        $comment = mysqli_fetch_all($runQuery , MYSQLI_ASSOC);
        $response["status"] = true;
        $response["message"] = " نجحت العملية  ";
        $response["data"] = $comment;
        echo json_encode($response);
    }
} else {
    $response["status"] = false;
    $response["message"] = "Method Not Allowd";
    echo json_encode($response);
}
mysqli_close($connection);
