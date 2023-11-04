<?php

require_once("models/ServiceModel.php");
require_once("AbstractController.php");

Class ServiceController extends AbstractController{

    public function index(string $method , $param = null){
        
        switch ($method) {
            case 'GET':
                if($param !== null){
                    switch ($param[0]) {
                        case 'all':
                            $this->getAllServices();
                            break;
                        
                        default:
                            # code...
                            break;
                    }
                    
                }else{
                    throw new Exception("Error Processing Request", 0);
                    
                }
                break;

                case 'POST': 
                    if($param !== null){
                        switch ($param[0]) {
                            case 'new':
                                $this->addNewService();
                                break;

                                case 'update':
                                    $this->updateService();
                                    break;
                            
                            default:
                                
                                break;
                        }
                    }
                        break;
            
            default:
                throw new Exception("Error Processing Request", 0);
                
                break;
        }

    }


    public function getAllServices()
    {
        $service = new ServiceModel();
        $this->response($service->getAllServices());
    }


    public function updateService(){
        if ($this->valueFromToken() === "admin") {
            if (isset($_POST['id']) && isset($_POST['editType']) && isset($_POST['value'])) {
                $editType = $_POST['editType'];
                $id = $_POST['id'];
                $value = trim($_POST['value']);
                $service = new ServiceModel();
               $this->response( $service->updateService($editType,$id,$value));
            }else{
                $this->showError("Un probleme est survenu");
            }
        
           }else{
            $this->showError("Un probleme est survenu");
           }
          
        }

    public function addNewService(){
       if ($this->valueFromToken() === "admin") {
        if (isset($_POST['value'])) {
            $service = new ServiceModel();
            $value = trim($_POST['value']);
           $this->response($service->addNewService($value));
        }else{
            $this->showError("Un probleme est survenu");
        }
    
       }else{
        $this->showError("Un probleme est survenu");
       }
      
    }
}

?>