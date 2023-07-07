<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once '../../models/review.php';
require_once '../../controllers/ReviewController.php';

if (isset($_POST['reviewValidationValue']) && isset($_POST["reviewValidationId"])) {
        $ReviewController = new ReviewController();
        $ReviewController->reviewValidation($_POST['reviewValidationValue'],$_POST["reviewValidationId"]);
}


 if (isset($_GET['currentPage']) && isset($_GET['filter'])) {
        $ReviewController = new ReviewController();
        $ReviewController->getReviewsToValidate($_GET['currentPage'],$_GET['filter']);
 }
?>