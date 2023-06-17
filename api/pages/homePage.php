<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once '../models/home.php';
require_once '../controllers/HomeController.php';
require_once '../models/service.php';
require_once '../controllers/ServiceController.php';

$homeController = new HomeController();
if (isset($_POST['limit'])) {
    $offers = $homeController->getOffers();
    echo json_encode(["cars"=>$offers]);
}

if (isset($_GET['openingTimes'])) {
    $openingTimes = $homeController->getOpeningTimes();
    echo json_encode(["openingTimes" => $openingTimes]);
}

if (isset($_GET['services'])) {
    $serviceController = new ServiceController();
    $services = $serviceController->getAllServices(); 
    echo json_encode(["services"=>$services]);

}





//  echo json_encode(["cars"=>$offers,"services"=>$services]);
?>