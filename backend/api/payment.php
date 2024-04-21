<?php
include_once("../inc/connection.php");
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get Data
    $data = json_decode(file_get_contents("php://input"), true);
    $user_id = $data['user_id'];
    $pay_way = $data["pay_way"];
    $price = $data["price"];
    $hospital_id = $data['hospital_id'];
    $icu_id = $data['icu_id'];
    // validation..
    $error = [];
    if (empty($pay_way)) {
        $error[] = "يجب أدخال  طريقة الدفع ";
    }
    // query..
    if (empty($error)) {
        $checkBooking = "SELECT exit_time FROM booking WHERE user_id=$user_id AND hospital_id=$hospital_id AND icu_id=$icu_id  AND exit_time IS NULL";
        $runQuery = mysqli_query($connection, $checkBooking);
        if (mysqli_num_rows($runQuery) !== 1) {
            $pay_query = "INSERT INTO `payment` (`pay_way` , `price` , `pay_by`) VALUES ( '$pay_way' , '$price' , '$user_id')";
            $runQuery = mysqli_query($connection, $pay_query);
            if ($runQuery) {
                $selectPay = "SELECT * FROM payment WHERE pay_by= $user_id ORDER BY code LIMIT 1;";
                $runQuery = mysqli_query($connection, $selectPay);
                if (mysqli_num_rows($runQuery) === 1) {
                    $payment_code = mysqli_fetch_assoc($runQuery)["code"];
                    $bookInsert = "INSERT INTO `booking` (`bayment_code` , `hospital_id` , icu_id , `user_id`) VALUES ( '$payment_code' ,  '$hospital_id' ,  '$icu_id' , '$user_id')";
                    $runQuery = mysqli_query($connection, $bookInsert);
                    if ($runQuery) {
                        $number_of_beds = "SELECT * FROM `icu` WHERE icu_code= $icu_id;";
                        $runQuery = mysqli_query($connection, $number_of_beds);
                        if (mysqli_num_rows($runQuery) === 1) {
                            $number_of_beds = mysqli_fetch_assoc($runQuery)["number_of_beds"];
                            $number_of_beds = $number_of_beds - 1;
                            $update = "UPDATE `icu` SET `number_of_beds` = '$number_of_beds' WHERE `icu_code` = $icu_id and `hospital_id` =$hospital_id;";
                            $runQuery = mysqli_query($connection, $update);
                            if ($runQuery) {
                                $response["status"] = true;
                                $response["message"] = " تم تأكيد الحجز ";
                                echo json_encode($response);
                            } else {
                                $response["status"] = false;
                                $response["message"] = "خطأ أثناء تعديل  عدد  الاسرة ";
                                echo json_encode($response);
                            }
                        }
                    } else {
                        $response["status"] = false;
                        $response["message"] = "خطأ أثناء أضافة بيانات الحجز ";
                        echo json_encode($response);
                    }
                } else {
                    $response["status"] = false;
                    $response["message"] = " عملية الدفع غير موجودة  ";
                    echo json_encode($response);
                }
            } else {
                $response["status"] = false;
                $response["message"] = "خطأ أثناء أضافة بيانات الدفع ";
                echo json_encode($response);
            }
        } else {
            $response["status"] = false;
            $response["message"] = "تم الحجز مسبقا";
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