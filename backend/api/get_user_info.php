<?php require_once("../inc/connection.php");
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $user_id = $_GET["id"];
    $query = "SELECT * from user where id=$user_id"  ;
    $runQuery = mysqli_query($connection, $query);
    if ($runQuery) {
        $user = mysqli_fetch_all($runQuery , MYSQLI_ASSOC);
        $response["status"] = true;
        $response["message"] = " نجحت العملية  ";
        $response["data"] = $user;
        echo json_encode($response);
    }
} else {
    $response["status"] = false;
    $response["message"] = "Method Not Allowd";
    echo json_encode($response);
}
mysqli_close($connection);

?>