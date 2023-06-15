<?php


Class HomeController{

    function getOffers(){
        $car = new Car();
        if (isset($_POST['limit'])) {
            $limit = $_POST['limit'];
            return $car->getOffers($limit);
           
        }else{
            return $car->getOffers(0);
        }
    }
}

?>