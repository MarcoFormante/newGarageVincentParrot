<?php



Class CarHandlerController{

    public function getAllEquipments(){
        $carHandler = new carHandler();
        $carHandler->getAllEquipments();
    }


    public function createNewCar($thumbnail,$gallery,$details,$equipments){
        $carHandler = new carHandler();
        $carHandler->createNewCar($thumbnail,$gallery,$details,$equipments);
    }
}
