<?php
include_once("../inc/connection.php");
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $id=$_GET["id"];
    // query..
    $query = "SELECT user.name , user.id FROM user INNER JOIN booking ON user.id=booking.user_id WHERE hospital_id =$id AND booking.exit_time IS NULL;
    ";
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
