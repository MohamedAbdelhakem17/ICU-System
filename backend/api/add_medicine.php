<?php
include_once("../inc/connection.php");
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if(!empty($_POST)) {
    // Get Data 
    $user_id = $_POST["id"];
    $docName = $_POST["docName"];
    $title = $_POST["title"];
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
    // ===== RAY Title
    $error = [];
    if (empty($title)) {
        $error["title"] = "يجب أدخال أسم الاشعة  ";
    }
    if (!is_string($title)) {
        $error["title"] = "يجب أن يكون أسم الاشعة  أحرف ";
    }
    // File  check
        $medicine = $_FILES["medicine"];
        $rayName = $medicine["name"];
        $size = $medicine["size"];
        $dir = "../upload/rays/";
        $exts = ["pdf"];
        $ext = pathinfo($rayName, PATHINFO_EXTENSION);
        $tmpName = $medicine['tmp_name'];
        $errors = $medicine["error"];
        $random = uniqid();
        $newName = "$random.$ext";
        if ($errors != 0) {
            $error["medicine"] = "الملف به أخطاء";
        } elseif (!in_array($ext, $exts)) {
            $error["medicine"] = "الملف غير صحيح ";
        } elseif (empty($medicine)) {
            $error["medicine"] = "يجب تحميل الملف  ";
        }
    // query..
    if (empty($error)) {
        $select = "SELECT booking.user_id FROM booking INNER JOIN user ON user.id=booking.user_id where booking.user_id=$user_id" ;
        $runQuery = mysqli_query($connection, $select);
        if (mysqli_num_rows($runQuery)==1) {
            $insert = "INSERT INTO `medicine` (`user_id`, `hospital_id`, `medicine`, `title`, `doctor` , `size`) VALUES ('$user_id','$hospital_id', '$newName', ' $title', '$docName' , '$size');";
            $insertRunQuery = mysqli_query($connection, $insert);
            if ($insertRunQuery) {
                move_uploaded_file($tmpName, $dir . $newName);
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
        $response["message"] = "يجب أدخال  البيانات  ";
        $response["status"] = false;
        echo json_encode($response);
    }
} else {
    $response["status"] = false;
    $response["message"] = "Method Not Allowd";
    echo json_encode($response);
}
mysqli_close($connection);