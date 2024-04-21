<?php
include_once("../inc/connection.php");
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    // Get Data..
    $name = $data["name"];
    $address = $data["address"];
    $email = $data["email"];
    $password = $data["password"];
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
    // ===== Email
    $pattern = "^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$^";
    if (!preg_match($pattern, $email)) {
        $error["email"] = "البريد الالكترونى غير صحيح .";
    }
    // ===== password 
    $passwordPattern = "#.*^(?=.{8,20})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$#";
    if (!preg_match($passwordPattern, $password)) {
        $error["password"] = "يجب أن يتكون الرقم السرى من 8 حروف على الاقل ويحتوى على أحرف كبيرة وصغيره وأرقام ورموز  .";
    } else {
        $password = password_hash($password, PASSWORD_DEFAULT);
    }
    // ===== address
    if (empty($address)) {
        $error["address"] = " يجب أدخال العنوان  .";
    } elseif (is_numeric($address)) {
        $error["address"] = " يجب أن  يتكون العنوان من احرف   .";
    }
    // query..
    if (empty($error["name"]) && empty($error["address"]) && empty($error["email"]) && empty($error["password"])) {
        $query = "INSERT INTO `hospital` (`name` , `address` , `email`, `password` , `add_by`) VALUES ('$name' , '$address' , '$email' , '$password', 1)";
        $runQuery = mysqli_query($connection, $query);
        if ($runQuery) {
            $response["status"] = true;
            $response["message"] = " تم أضافة المستشفى  ";
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