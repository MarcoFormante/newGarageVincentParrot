<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once '../models/car.php';
require_once '../controllers/CarController.php';


if (isset($_GET['page']) && isset($_GET['filters'])) {
    $carController = new CarController();
    $carController->getAllCars($_GET['page'],$_GET['filters']);
    
}else if(isset($_GET['getFilters'])){
    $carController = new CarController();
     $carController->getAllFilters();
}

// if (isset($_GET['getFilters'])) {
//     
// }


?>