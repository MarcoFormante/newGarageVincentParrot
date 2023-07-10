<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
include '../../models/user.php';
include '../../controllers/UserController.php';

$userController = new UserController();

if (strlen(explode(" ",apache_request_headers()["Authorization"])[1]) > 5) {
   
if (isset($_POST['email']) && isset($_POST['password'])){
    $userController->createNewUser();
}

if (isset($_GET['getAllAccounts'])) {
    $userController->getAllAccounts();
}


//Delete user account
if (isset($_POST['id'])) {
    $id = $_POST['id'];
    $userController->deleteUser($id);
}
}

?>