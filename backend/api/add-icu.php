<?php
include_once("../inc/connection.php");
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get Data 
    $specialization = $_POST["specialization"];
    $number_of_beds = $_POST["number_of_beds"];
    $info = $_POST["info"];
    $price = $_POST["price"];
    $hospital_id = $_POST["hospital_id"];
    $img = $_FILES["img"];
    // validation..
    // ===== specialization
    $error = [];
    if (empty($specialization)) {
        $error["specialization"] = "يجب أدخال تخخص  العناية المركزة  ";
    }
    if (!is_string($specialization)) {
        $error["specialization"] = "يجب أن يتكون التخصص من أحرف ";
    }
    // ===== info
    if (empty($info)) {
        $error["info"] = "يجب أدخال التجهيزات الموجودة فى العناية ";
    }
    if (!is_string($info)) {
        $error["info"] = "يجب أن تتكون التجهيزات  من  أحرف ";
    }
    // ===== beds_number
    if (empty($number_of_beds)) {
        $error["number_of_beds"] = "  يجب أدخال عدد الأَسِرَّة المتاحة   .";
    } elseif (!is_numeric($number_of_beds)) {
        $error["number_of_beds"] = " يجب أن  يتكون عدد الأَسِرَّة من أرقام   .";
    }
    // ===== Price
    if (empty($price)) {
        $error["price"] = "  يجب أدخال السعر   .";
    } elseif (!is_numeric($price)) {
        $error["price"] = " يجب أن  يتكون السعر من أرقام   .";
    }
    // Img  check
    if (isset($_FILES["img"])) {
        $img = $_FILES["img"]["name"];
        $imgCount = count($img);
        $filename = [];
        $dir = "../upload/icuImg/";
        $errors = [];
        $exts = ["gif", "png", "jpg", "webp" , "jpeg"];
        foreach ($img as $key => $value) {
            $ext = pathinfo($value, PATHINFO_EXTENSION);
            $tmpName = $_FILES["img"]['tmp_name'][$key];
            $error = $_FILES["img"]["error"][$key];
            $random = uniqid();
            $newName = "$random.$ext";
            $filename[] = $newName;
            if ($error != 0) {
                $errors[] = "The image does not exist";
            } elseif (!in_array($ext, $exts)) {
                $errors[] = "The image is incorrect";
            } elseif ($imgCount > 5) {
                $errors[] = "أٌقص عدد يمكن تحميله هو 5 صور ";
            }
            move_uploaded_file($tmpName, $dir.$newName);
        }
    }
    // query..
    if (empty($errors)) {
        $filename = implode("|", $filename);
        $query = "INSERT INTO `icu` (`number_of_beds`, `specialization`, `hospital_id`, `img_name`, `price` , `info`) VALUES ('$number_of_beds', '$specialization', '$hospital_id','$filename', '$price','$info');";
        $runQuery = mysqli_query($connection, $query);
        if ($runQuery) {
            $response["status"] = true;
            $response["message"] = " تم أضافة العناية   ";
            echo json_encode($response);
        }
    } else {
        $response["status"] = false;
        $response["message"] = "خطأ فى الادخال";
        $response["data"] = $errors;
        echo json_encode($response);
    }
} else {
    $response["status"] = false;
    $response["message"] = "Method Not Allowd";
    echo json_encode($response);
}
mysqli_close($connection);