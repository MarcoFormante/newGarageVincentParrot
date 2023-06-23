<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

Class CarController{
   

    public function getAllCars($page,$filters){
        $car = new Car();
        $car->getAllCars($page,$filters);    
        
    }

    public function getCarDetails(int $id){
        $car = new Car();
        $car->getCardDetails($id);
    }

    public function getCarImages(int $id){
        $car = new Car();
        $car->getCarImages($id);
    }

    public function getAllFilters(){
        $car = new Car();
        $car->getAllFilters();
    }
}

?>