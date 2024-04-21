<?php
include_once("../inc/connection.php");
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $hospital_id = $data["id_hospital"];
    $icu_id = $data["id_icu"];
    $booking_code = $data["id_booking"];
    $select = "SELECT * FROM `booking` WHERE code = $booking_code;";
    $runQuery = mysqli_query($connection, $select);
    if (mysqli_num_rows($runQuery) === 1) {
        $select_beds = "SELECT icu.number_of_beds FROM icu INNER JOIN hospital ON hospital.id=$hospital_id AND icu.icu_code=$icu_id;;";
        $runQuery = mysqli_query($connection, $select_beds);
        if (mysqli_num_rows($runQuery) === 1) {
            $number_of_beds = mysqli_fetch_assoc($runQuery)["number_of_beds"];
            $updateNumberOfBeds = "UPDATE icu SET icu.number_of_beds = $number_of_beds+1 WHERE icu.hospital_id =$hospital_id ;";
            $runQuery = mysqli_query($connection, $updateNumberOfBeds);
            if ($runQuery) {
                if ($runQuery) {
                    $query = "UPDATE booking SET exit_time = NOW() WHERE code = $booking_code";
                    $runQuery = mysqli_query($connection, $query);
                    $response["status"] = true;
                    $response["message"] = "تم تسجيل الخروج بنجاح ";
                    echo json_encode($response);
                } else {
                    $response["status"] = false;
                    $response["message"] = "فشل فى تسجيل الخروج ";
                    echo json_encode($response);
                }
            }
        } else {
            $response["status"] = false;
            $response["message"] = "فشل فى تعديل  عدد الاسرة  ";
            echo json_encode($response);
        }
    } else {
        $response["status"] = false;
        $response["message"] = "لا يوجد حجز ";
        echo json_encode($response);
    }
} else {
    $response["status"] = false;
    $response["message"] = "Method Not Allowd";
    echo json_encode($response);
}
mysqli_close($connection);
?>