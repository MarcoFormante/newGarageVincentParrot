<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
include '../../models/user.php';
include '../../controllers/UserController.php';

$userController = new UserController();

if ((explode(" ",apache_request_headers()["Authorization"])[1])) {

    $AuthToken = explode(" ",apache_request_headers()["Authorization"])[1];

    $data = $userController->checkToken($AuthToken);
    $isAdmin = json_decode($data,true)['role'] === "admin";
    
    if ($isAdmin) {
        $userController->index();
        // if (isset($_POST['email']) && isset($_POST['password'])){
        //     $userController->createNewUser();
        // }
    
        // if (isset($_GET['getAllAccounts'])) {
        //     $userController->getAllAccounts();
        // }
        
        // //Delete user account
        // if (isset($_POST['id'])) {
        //     $id = $_POST['id'];
        //     $userController->deleteUser($id);
        // }
    }
   
}else{
    echo json_encode(['status'=>0,'message'=> "Vous n'avez pas les droits d'administrateur"] );
    exit();
}

?>