<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once '../models/review.php';
require_once '../controllers/ReviewController.php';

if (isset($_POST['newReview']) && isset($_POST['name']) && isset($_POST['message']) && isset($_POST['review'])) {

    $ReviewController = new ReviewController();
    $ReviewController->newReview($_POST['name'],$_POST['message'],$_POST['review']);

}

?>

