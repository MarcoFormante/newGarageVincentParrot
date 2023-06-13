<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

if (isset($_POST['email']) && isset($_POST['password']) ){

    //validate email
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);

    //password with regex for validate password
    
    $password = filter_var($_POST['password'],FILTER_VALIDATE_REGEXP,
    array("options"=>array("regexp"=>"/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,61}$/")
    ));
    
   

}else{
    die();
}

