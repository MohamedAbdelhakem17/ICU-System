<?php
require_once("../inc/connection.php");
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get Data 
    // $data = json_decode(file_get_contents("php://input"), true);
    $user_id = $_POST["id"];
    $docName = $_POST["docName"];
    $health_status = $_POST["health_status"];
    $hospital_id = $_POST["hospital_id"];
    // validation..
    // ===== User Name
    $error = [];
    if (empty($user_id)) {
        $error["userName"] = "يجب أدخال أسم المريض  ";
    }

    // ===== Doctor Name
    $error = [];
    if (empty($docName)) {
        $error["docName"] = "يجب أدخال أسم الطبيب ";
    }
    if (is_numeric($docName)) {
        $error["docName"] = "يجب أن يكون أسم الطبيب أحرف ";
    }
        // query..
        if (empty($error)) {
            $select = "SELECT booking.user_id FROM booking INNER JOIN user ON user.id=booking.user_id WHERE booking.user_id='$user_id'";
            $runQuery = mysqli_query($connection, $select);
            if (mysqli_num_rows($runQuery)) {
                $insert = "INSERT INTO `ehr` (`user_id`, `hospital_id`, `health_status`, `doctor`) VALUES ('$user_id', '$hospital_id', '$health_status', '$docName' );";
                $insertRunQuery = mysqli_query($connection, $insert);
                if ($insertRunQuery) {
                    $response["status"] = true;
                    $response["message"] = " نجحت العملية  ";
                    echo json_encode($response);
                } else {
                    $response["status"] = false;
                    $response["message"] = "فشل أثناء الادخال";
                    echo json_encode($response);
                }
            } else {
                $response["status"] = false;
                $response["message"] = "المستخدم غير موجود";
                echo json_encode($response);
            }
        } else {
            $response["status"] = false;
            $response["message"] = "ادخل بيانات صحيحه ";
            $response["error"] = $error;
            echo json_encode($response);
        } 
} else {
    $response["status"] = false;
    $response["message"] = "Method Not Allowd";
    echo json_encode($response);
}
mysqli_close($connection);
