<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once '../models/car.php';
require_once '../controllers/HomeController.php';
require_once '../models/service.php';
require_once '../controllers/ServiceController.php';

$homeController = new HomeController();

 $offers = $homeController->getOffers();

$serviceController = new ServiceController();
$services = $serviceController->getAllServices();

   
 echo json_encode(["cars"=>$offers,"services"=>$services]);
?>