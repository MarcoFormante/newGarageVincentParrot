<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once '../models/car.php';
require_once '../controllers/CarController.php';

if (isset($_GET['details']) && isset($_GET['id'])) {
    $id = htmlspecialchars($_GET['id']);
   $carController = new CarController();
   $carController->getCarDetails($id);
}


?>