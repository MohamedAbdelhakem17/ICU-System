<?php
include_once("../inc/connection.php");
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get Data 
    $data = json_decode(file_get_contents("php://input"), true);
    $icu_rate = $data["icu_rate"];
    $comment = $data["comment"];
    $icu_id = $data["icu_id"];
    $user_id = $data["user_id"];
    // validation..
    $error = [];
    // ===== info
    if (empty($comment)) {
        $error= "يجب أدخال التعليق ";
    }
    if (!is_string($comment)) {
        $error= "يجب أن تتكون التعليق  من  أحرف ";
    }

    // query..
    if (empty($error)) {
        $query = "INSERT INTO `icu_rate` (`user_id`, `icu_id`, `comment`, `rate`) VALUES ('$user_id', '$icu_id', ' $comment ', '$icu_rate');";
        $runQuery = mysqli_query($connection, $query);
        if ($runQuery) {
            $response["status"] = true;
            $response["message"] = " تم أضافة التعليق   ";
            echo json_encode($response);
        }
    } else {
        $response["status"] = false;
        $response["message"] = "خطأ فى الادخال";
        $response["error"] = $error;
        echo json_encode($response);
    }
} else {
    $response["status"] = false;
    $response["message"] = "Method Not Allowd";
    echo json_encode($response);
}
mysqli_close($connection);