<?php

Class ServiceController{
    public function getAllServices() :array
    {
       
        $service = new Service();
        return $service->getAllServices();
        
    }

    public function getAllServicesADM() :array{
        $service = new Service();
        return $service->getAllServicesADM();
    }


    public function updateService(string $editType,int $id, string $value){
        $service = new Service();
        $service->updateService($editType,$id,$value);
    }

    public function addNewService(string $value){
        $service = new Service();
        $service->addNewService($value);
    }
}

?>