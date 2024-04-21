<?php
include_once("../inc/connection.php");
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    // Get Data
    $user = $data["email"];
    $pass = $data["password"];
    // validation..
    $error = [];
    $pattern = "^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$^";
    if (!preg_match($pattern, $user)) {
        $ErrMsg = "البريد الالكترونى غير صحيح .";
        $error[] = $ErrMsg;
        $response["status"] = false;
        $response["error"] = $ErrMsg;
        echo json_encode($response);
    }
    // query..
    $query = "SELECT * FROM `user` WHERE email ='$user';";
    $runQuery = mysqli_query($connection, $query);
    if (mysqli_num_rows($runQuery) == 1) {
        $user = mysqli_fetch_assoc($runQuery);
        $oldPass = $user["password"];
        $checkPassword = password_verify($pass, $oldPass);
        if ($checkPassword) {
            $response["status"] = true;
            $response["message"] = "تم تسجيل الدخول بنجاح ";
            $response["data"] = $user;
            echo json_encode($response);
        } else {
            $response["status"] = false;
            $response["message"] = "البريد الالكترونى او  الرقم السري غير صحيح ";
            echo json_encode($response);
        }
    } else {
        $response["status"] = false;
        $response["message"] = "البريد الالكترونى غير موجود";
        echo json_encode($response);
    }
} else {
    $response["status"] = false;
    $response["message"] = "Method Not Allowd";
    echo json_encode($response);
}
mysqli_close($connection);