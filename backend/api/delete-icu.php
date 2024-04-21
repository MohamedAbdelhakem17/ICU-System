<?php
include_once("../inc/connection.php");
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $id = $_GET["id"] ;
    $query = "SELECT * FROM `icu` WHERE icu_code =$id;";
    $runQuery = mysqli_query($connection, $query);
    if (mysqli_num_rows($runQuery) == 1) {
        $icu_img= mysqli_fetch_assoc($runQuery)["img_name"];
        $icu_img= explode("|", $icu_img) ;
        foreach($icu_img as $img) {
            unlink("../upload/icuImg/".$img); 
        }
        $query = "DELETE FROM `icu` WHERE icu_code =$id;";
        $runQuery = mysqli_query($connection, $query);
        if ($runQuery) {
            $response["status"] = true;
            $response["message"] = " نجحت العملية  ";
            echo json_encode($response);
        }
    } else {
        $response["status"] = false;
        $response["message"] = "العناية المركزة غير موجودة";
        echo json_encode($response);
    }
} else {
    $response["status"] = false;
    $response["message"] = "Method Not Allowd";
    echo json_encode($response);
}
mysqli_close($connection);