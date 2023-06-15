<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once '../models/car.php';
require_once '../controllers/HomeController.php';

$homeController = new HomeController();

$homeController->getOffers();

?>