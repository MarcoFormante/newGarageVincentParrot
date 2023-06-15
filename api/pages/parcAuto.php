<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once '../models/car.php';
require_once '../controllers/CarController.php';

$carController = new CarController();

$carController->getAllCars();

?>