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

}





?>