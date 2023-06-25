<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once '../../models/review.php';
require_once '../../controllers/ReviewController.php';;

if (isset($_POST['reviewValidationNumber'])) {
    $ReviewController = new ReviewController();
    $ReviewController->reviewValidation();
}
?>