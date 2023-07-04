<?php 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once '../../models/carHandler.php';
require_once '../../controllers/CarHandlerController.php';


if (isset($_GET['getAllEquipments'])) {
    $CarHandlerController = new CarHandlerController();
    $CarHandlerController->getAllEquipments();
}


if (isset($_FILES['thumbnail']) && isset($_FILES['gallery']) && isset($_POST['details'])) {

    $thumbnail = $_FILES['thumbnail'];
    $gallery = $_FILES['gallery'];
    $details = $_POST['details'];

    if (isset($_POST['equipments'])) {
        $equipments = $_POST['equipments'];
    }else{
        $equipments = [];
    }

    $CarHandlerController = new CarHandlerController();
    $CarHandlerController->createNewCar($thumbnail,$gallery,$details,$equipments);

}



if (isset($_POST['newEquipment'])) {
   $equipment = htmlspecialchars($_POST['newEquipment']);
    $CarHandlerController = new CarHandlerController();
    $CarHandlerController->addNewEquipment($equipment);
    
}








