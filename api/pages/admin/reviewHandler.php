<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once '../../models/review.php';
require_once '../../controllers/ReviewController.php';

if (isset($_POST['reviewValidationValue']) && isset($_POST["reviewValidationId"])) {
  

        $ReviewController = new ReviewController();
        $ReviewController->reviewValidation($_POST['reviewValidationValue'],$_POST["reviewValidationId"]);
 
}else{
    echo json_encode(["status"=> 0 ,"message" => "Erreur : impossible de valider votre requete"]);
    die();
}
?>