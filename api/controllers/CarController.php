<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

Class CarController{
   

    public function getAllCars(){
        $car = new Car();
        if (isset($_GET["filters"]) && isset($_GET["page"])) {
            $car->getAllCars($_GET["page"],$_GET["filters"]);    
        }
    }

    public function getCarDetails(int $id){
        $car = new Car();
        $car->getCardDetails($id);
    }

    public function getCarImages(int $id){
        $car = new Car();
        $car->getCarImages($id);
    }
}

?>