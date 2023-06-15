<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

Class HomeController{

    function getOffers(){
        $car = new Car();
        if (isset($_POST['limit'])) {
            $limit = $_POST['limit'];
            $car->getOffers($limit);
        }else{
            $car->getOffers(0);
        }
    }
}

?>