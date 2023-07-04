<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

Class UserController {
    
public function createNewUser(){
    if (isset($_POST['email']) && isset($_POST['password'])){
        $user = new User();
        $user->createNewUser($_POST['email'],$_POST['password']);
    }else{
        echo json_encode(["status"=>0,"message"=> 'Erreur : L\'email et le password sont obbligatoires']);  
    }
}


public function login(){
    if (isset($_POST['email']) && isset($_POST['password'])){
        $user = new User();
        $user->login($_POST['email'],$_POST['password']);
    }else{
        echo json_encode(["status"=>0,"message"=> 'Erreur : L\'email et le password sont obbligatoires']);  
    }
}


public function checkToken(){
    if (isset($_POST['token'])){
        $user = new User();
        $user->checkToken($_POST['token']);
    }else{
        echo json_encode(["status"=>0,"message"=> "Erreur : Vous n'avez pas les droit d'un administrateur"]);  
    }
}

public function getAllAccounts(){
    $user = new User();
    $user->getAllAccounts();
}


public function deleteUser(int $id){
    $user = new User();
    $user->deleteUser($id);
}


}


?>