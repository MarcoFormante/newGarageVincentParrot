<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

// from Reserved-Area
if (isset($_POST["email"]) && isset($_POST["password"])) {
    $email = htmlspecialchars($_POST["email"]);
    $specialChars = preg_match('@[^\w]@', $_POST["password"]);
    if ($specialChars && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => 0, "message" => "Que des lettres et de nombre sont admisent"]);
    } else {
        echo json_encode(["status" => 1, "token" => "18631863miklsadkn18631863","role" => "admin"]);
    } 
    //check with Token
}else if(isset($_POST["token"])){
    $token = $_POST["token"];

   if ($token ==="18631863miklsadkn18631863" ) {
        echo json_encode(["status" => 1, "role" => "admin"]);
   }else{
    echo json_encode(["status" => 0, "message" => "User hasn't permission"]);
   }

}else{
    echo json_encode(["status" => -1, "message" => "User Not Found"]);
}







?>