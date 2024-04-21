<?php
require_once("../inc/connection.php");
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $hospital_id = $_GET["id"];
    $query = "SELECT booking.code, payment.pay_way, payment.price, booking.enter_time,icu.icu_code , booking.exit_time , user.name , icu.specialization FROM booking INNER JOIN user ON booking.user_id = user.id INNER JOIN icu ON booking.icu_id = icu.icu_code INNER JOIN payment ON booking.bayment_code = payment.code WHERE booking.hospital_id = $hospital_id  AND booking.exit_time IS NUll;" ;
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

?>