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
    if (!is_string($docName)) {
        $error["docName"] = "يجب أن يكون أسم الطبيب أحرف ";
    }
    // ===== Analysis Title
    $error = [];
    if (empty($title)) {
        $error["title"] = "يجب أدخال أسم التحليل ";
    }
    if (!is_string($title)) {
        $error["title"] = "يجب أن يكون أسم التحليل أحرف ";
    }
    // File  check
    if(!empty($_FILES["analysis"])) {
        $analysis = $_FILES["analysis"];
        $analysisName = $analysis["name"];
        $size = $analysis["size"] ;
        $dir = "../upload/analysis/";
        $exts = ["pdf"];
        $ext = pathinfo($analysisName, PATHINFO_EXTENSION);
        $tmpName = $analysis['tmp_name'];
        $errors = $analysis["error"];
        $random = uniqid();
        $newName = "$random.$ext";
        if ($errors != 0) {
            $error["analysis"] = "الملف به أخطاء";
        } elseif (!in_array($ext, $exts)) {
            $error["analysis"] = "الملف غير صحيح ";
        } 
    }else {
        $error["analysis"] = "يجب تحميل الملف  ";
        $response["status"] = false;
        $response["error"] = $error;
        echo json_encode($response);
    }
    // query..
    if (empty($error)) {
        $select = "SELECT booking.user_id FROM booking INNER JOIN user ON user.id=booking.user_id where booking.user_id=$user_id" ;
        $runQuery = mysqli_query($connection, $select);
        if (mysqli_num_rows($runQuery)==1) {
            $userId = mysqli_fetch_assoc($runQuery)["user_id"];
            $insert = "INSERT INTO `analysis` (`user_id`, `hospital_id`, `analysis`, `tilte`, `doctor` ,  `size`) VALUES ('$userId','$hospital_id', '$newName', ' $title', '$docName' , $size);";
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