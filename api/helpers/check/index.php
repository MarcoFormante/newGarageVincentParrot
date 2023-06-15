<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
require_once '../../models/user.php';
require_once '../../controllers/UserController.php';

$userController = new UserController();

$userController->checkToken();


?>