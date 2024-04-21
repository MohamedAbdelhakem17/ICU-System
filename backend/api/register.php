<?php
include_once("../inc/connection.php");
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    // Get Data
    $name = $data["name"];
    $address = $data["address"];
    $email = $data["email"];
    $password = $data["password"];
    $age = $data["age"];
    $phone = $data["phone"];
    // validation..
    $error = [];
// ===== Name
    $error = [];
    if (empty($name)) {
        $error[] = "يجب أدخال أسم المستخدم ";
    } elseif (!is_string($name)) {
        $error[] = "يجب أن يكون أسم المستخدم أحرف ";
    }
    // ===== Email
    $pattern = "^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$^";
    if (!preg_match($pattern, $email)) {
        $ErrMsg = "البريد الالكترونى غير صحيح .";
        $error[] = $ErrMsg;
        $response["status"] = false;
        $response["error"] = $error;
        echo json_encode($response);
    }
    // ===== password 
    $pattern = "#.*^(?=.{8,20})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$#";
    if (!preg_match($pattern, $password)) {
        $error[] = "يجب أن يتكون الرقم السرى من 8 حروف على الاقل ويحتوى على أحرف كبيرة وصغيره وأرقام ورموز  .";
    } else {
        $password = password_hash($password, PASSWORD_DEFAULT);
    }
// ===== address
    if (empty($address)) {
        $error[] = " يجب أدخال العنوان  .";
    } elseif (is_numeric($address)) {
        $error[] = " يجب أن  يتكون العنوان من احرف   .";
    }
    // ===== Age
    if (empty($age)) {
        $error[] = "  يجب أدخال العمر   .";
    } elseif (!is_numeric($age)) {
        $error[] = " يجب أن  يتكون العمر من أرقام   .";
    } elseif ($age < 16 || $age > 60) {
        $error[] = " يجب أن يكون العمر بين 16 و 60 سنة   .";
    }
    // ===== Phone
    $pattern = "/^01[0125][0-9]{8}$/";
    if (!preg_match($pattern, $phone)) {
        $error[] = "رقم الهاتف غير صحيح  .";
    }
    // query..
    if (empty($error)) {
        $query = "SELECT * FROM `user` WHERE `email`='$email';";
        $runQuery = mysqli_query($connection, $query);
        if (mysqli_num_rows($runQuery) !== 1) {
            $query = "INSERT INTO `user` (`name`, `address`, `email`, `password`, `phone`, `age`) VALUES ('$name','$address','$email','$password','$phone','$age');";
            $runQuery = mysqli_query($connection, $query);
            if ($runQuery) {
                $response["status"] = true;
                $response["message"] = "تم عمل الحساب بنجاح ";
                echo json_encode($response);
            } else {
                $error[] = "خطأ أثناء التسجيل .";
                $response["status"] = false;
                $response["error"] = $error;
                echo json_encode($response);
            }
        } else {
            $error[] = "البريد الالكترونى موجود بالفعل";
            $response["status"] = false;
            $response["error"] = $error;
            echo json_encode($response);
        }
    } else {
        $response["status"] = false;
        $response["error"] = $error;
        echo json_encode($response);
    }
} else {
    $response["status"] = false;
    $response["message"] = "Method Not Allowd";
    echo json_encode($response);
}
mysqli_close($connection);