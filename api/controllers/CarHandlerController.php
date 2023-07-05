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


    public function addNewEquipment(string $equipment){
        $carHandler = new carHandler();
        $carHandler->addNewEquipment($equipment);
    }

    public function getAllCars(int $currentPage){
        $carHandler = new carHandler();
        $carHandler->getAllCars($currentPage);
    }


    public function deleteCar(int $id, string $thumbnail){
        $carHandler = new carHandler();
        $carHandler->deleteCar($id,$thumbnail);
    }
}
