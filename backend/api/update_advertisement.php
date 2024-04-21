<?php
include_once("../inc/connection.php");
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get Data..
    $data = json_decode(file_get_contents("php://input"), true);
    $name = $data["name"];
    $address = $data["address"];
    $info = $data["info"];
    $id = $_GET["id"];
    // validation..
    // ===== Name
    $error = [];
    if (empty($name)) {
        $error[] = "يجب أدخال أسم المستشفى ";
    }
    if (!is_string($name)) {
        $error[] = "يجب أن يكون أسم المستشفى أحرف ";
    }
    // ===== icu_info 
    if (empty($info)) {
        $error[] = "يجب أدخال معلومات عن  العناية المركزة ";
    }
    if (is_numeric($info)) {
        $error[] = "يجب أن تكون المعلومات عن  العناية المركزة  أحرف ";
    }
    // ===== address
    if (empty($address)) {
        $error[] = " يجب أدخال العنوان  .";
    } elseif (is_numeric($address)) {
        $error[] = " يجب أن  يتكون العنوان من احرف   .";
    }
    // query..
    if(empty($error)){
        $query = "SELECT * FROM `ads` WHERE id= $id;";
        $runQuery = mysqli_query($connection, $query);
        if (mysqli_num_rows($runQuery) == 1) {
            $query = "UPDATE `ads` SET `hosoital_name` = '$name', `address` = '$address ', `info` = '$info' WHERE `ads`.`id` = $id;";
            $runQuery = mysqli_query($connection, $query);
            if ($runQuery) {
                $response["status"] = true;
                $response["message"] = " نجحت العملية  ";
                echo json_encode($response);
            } else {
                $response["status"] = false;
                $response["message"] = "فشلت العملية ";
                echo json_encode($response);
            }
        } else {
            $response["status"] = false;
            $response["message"] = "الاعلان غير موجود";
            echo json_encode($response);
        }
    }else {
        $response["status"] = false;
        $response["message"] = $error;
        echo json_encode($response);
    }
} else {
    $response["status"] = false;
    $response["message"] = "Method Not Allowd";
    echo json_encode($response);
}
mysqli_close($connection);