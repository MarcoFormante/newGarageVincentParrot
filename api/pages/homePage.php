<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once '../models/home.php';
require_once '../controllers/HomeController.php';
require_once '../models/service.php';
require_once '../controllers/ServiceController.php';

$homeController = new HomeController();

$offers = $homeController->getOffers();
$openingTimes = $homeController->getOpeningTimes();
$serviceController = new ServiceController();
$services = $serviceController->getAllServices();


 echo json_encode(["cars"=>$offers,"services"=>$services,"openingTimes"=>$openingTimes]);
?>