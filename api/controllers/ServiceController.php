<?php

Class ServiceController{
    public function getAllServices(){
       
            $service = new Service();
            return $service->getAllServices();
        
    }
}

?>