<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

Class CarController{

    public function getAllCars(){
        $car = new CAR();
        if (isset($_GET["filters"]) && isset($_GET["page"])) {
           $car->getAllCars($_GET["page"],$_GET["filters"]);
        }
    }
}

?>