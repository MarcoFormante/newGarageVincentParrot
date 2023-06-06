<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

if (isset($_POST["email"]) && isset($_POST["password"])) {
    $email = htmlspecialchars($_POST["email"]);
    $specialChars = preg_match('@[^\w]@', $_POST["password"]);
    if ($specialChars && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => 0]);
    } else {
        echo json_encode(["status" => 1, "token" => "18631863miklsadkn18631863","role" => "admin"]);
    } 
}







?>