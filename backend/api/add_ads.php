<?php
include_once("../inc/connection.php");
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    // Get Data..
    $name = $data["name"];
    $address = $data["address"];
    $info = $data["info"];
    $add_by = $data["add_by"];
    // validation..
    // ===== Name
    $error = [];
    if (empty($name)) {
        $error["name"] = "يجب أدخال أسم المستشفى ";
    }
    if (!is_string($name)) {
        $error["name"] = "يجب أن يكون أسم المستشفى أحرف ";
    }
    // ===== icu_info 
    if (empty($info)) {
        $error["info"] = "يجب أدخال معلومات عن  العناية المركزة ";
    }
    if (is_numeric($info)) {
        $error["info"] = "يجب أن تكون المعلومات عن  العناية المركزة  أحرف ";
    }
    // ===== address
    if (empty($address)) {
        $error["address"] = " يجب أدخال العنوان  .";
    } elseif (is_numeric($address)) {
        $error["address"] = " يجب أن  يتكون العنوان من احرف   .";
    }
    // query..
    if (empty($error)) {
        $query="INSERT INTO `ads` (`hosoital_name`, `address`, `info`, `add_by`) VALUES ('$name', '$address', '$info', '$add_by');";
        $runQuery = mysqli_query($connection , $query) ; 
        if ($runQuery) {
            $response["status"] = true;
            $response["message"] = " تم أضافة الاعلان  ";
            echo json_encode($response);
        }
    } else {
        $response["status"] = false;
        $response["message"] = "خطأ فى الادخال";
        $response["data"] = $error;
        echo json_encode($response);
    }
} else {
    $response["status"] = false;
    $response["message"] = "Method Not Allowd";
    echo json_encode($response);
}
mysqli_close($connection);
?>