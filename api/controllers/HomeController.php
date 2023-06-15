<?php


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