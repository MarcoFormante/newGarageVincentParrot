<?php 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once '../../models/carHandler.php';
require_once '../../controllers/CarHandlerController.php';


if (isset($_GET['getAllEquipments'])) {
    $CarHandlerController = new CarHandlerController();
    $CarHandlerController->getAllEquipments();
}else{
    echo "Vous n'etes pas authorisé à acceder à ces données";
}



