<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");




require_once  '../../controllers/ServiceController.php';


$AuthToken = apache_request_headers()["Authorization"];
var_dump(str_replace("Bearer ","",$AuthToken));

if (isset($_GET['service'])) {

   try{
        $serviceController = new ServiceController();
        $services = $serviceController->getAllServices();
        echo json_encode(["status"=> 1, "services" => $services]);
    }catch(Exception $e){
        echo json_encode(["status"=> 0, "message" => "Erreur: " . $e]);
    }
}

if (isset($_POST['edit']) && isset($_POST['id']) && isset($_POST['value'])) {
   $serviceController = new ServiceController();
   $serviceController->updateService($_POST['edit'],(int)$_POST['id'],$_POST['value']);
}


if (isset($_POST['add']) && isset($_POST['value'])) {
    if ($_POST !== "") {
        $serviceController = new ServiceController();
        $serviceController->addNewService($_POST['value']);
    }else{
        echo json_encode(["status"=> 0, "message" => "La valeur ne peut pas etre vide"]);
    }
   
}


?>

