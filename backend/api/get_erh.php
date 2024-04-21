<?php
include_once("../inc/connection.php");
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $error = [];
    function getRays($conn, $id, $error)
    {
        $query = "SELECT hospital.name as hospitalName ,tilte , rays , doctor , size , add_at FROM rays INNER JOIN hospital  ON hospital.id= rays.hospital_id WHERE user_id=$id;";
        $runQuery = mysqli_query($conn, $query);
        if ($runQuery) {
            $hospital = mysqli_fetch_all($runQuery, MYSQLI_ASSOC);
            return $hospital;
        } else {
            $error[] = "خطأ فى جلب الاشعة ";
        }
    }
    function getmedicine($conn, $id, $error)
    {
        $query = "SELECT hospital.name as hospitalName , medicine , doctor , size ,title , add_at FROM medicine INNER JOIN hospital  ON hospital.id= medicine.hospital_id WHERE user_id=$id;";
        $runQuery = mysqli_query($conn, $query);
        if ($runQuery) {
            $hospital = mysqli_fetch_all($runQuery, MYSQLI_ASSOC);
            return $hospital;
        } else {
            $error[] = "خطأ فى جلب الادوية ";
        }
    }
    function getanalysis($conn, $id, $error)
    {
        $query = "SELECT hospital.name as hospitalName ,tilte , analysis , doctor , size , add_at FROM analysis INNER JOIN hospital  ON hospital.id= analysis.hospital_id WHERE user_id=$id;";
        $runQuery = mysqli_query($conn, $query);
        if ($runQuery) {
            $hospital = mysqli_fetch_all($runQuery, MYSQLI_ASSOC);
            return $hospital;
        } else {
            $error[] = "خطأ فى جلب التحاليل ";
        }
    }
    function getehr($conn, $id, $error)
    {
        $query = "SELECT hospital.name as hospitalName ,health_status , doctor , add_at FROM ehr INNER JOIN hospital  ON hospital.id= ehr.hospital_id WHERE user_id=$id;";
        $runQuery = mysqli_query($conn, $query);
        if ($runQuery) {
            $hospital = mysqli_fetch_all($runQuery, MYSQLI_ASSOC);
            return $hospital;
        } else {
            $error[] = "خطأ فى جلب الحالة الصحية ";
        }
    }
    $id = $_GET["id"];
    // query..
    if (empty($error)) {
        $rays = getRays($connection, $id, $error);
        $medicine = getmedicine($connection, $id, $error);
        $ehr = getehr($connection, $id, $error);
        $analysis = getanalysis($connection, $id, $error);
        $response["status"] = true;
        $response["message"] = " نجحت العملية  ";
        $response["data"]["rays"] = $rays;
        $response["data"]["medicine"] = $medicine;
        $response["data"]["ehr"] = $ehr;
        $response["data"]["analysis"] = $analysis;
        echo json_encode($response);
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