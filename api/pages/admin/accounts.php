<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
include '../../models/user.php';
include '../../controllers/UserController.php';

$userController = new UserController();

$userController->createNewUser()

?>