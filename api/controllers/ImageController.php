<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once("models/imageModel.php");
require_once("AbstractController.php");


class ImageController extends AbstractController
{

    public function index(string $method, $param = null)
    {

        switch ($method) {
            case 'GET':

                if ($param !== null) {
                    switch ($param[0]) {

                        case 'carGallery':
                            $this->getCarImages($param);
                            break;

                        default:
                            throw new Exception("Error Processing Request");
                            break;
                    }
                } else {
                    throw new Exception("Error Processing Request");
                }
                break;

                case 'POST':

                    if ($param !== null) {
                        switch ($param[0]) {
    
                            case 'new':
                                $this->addNewImages();
                                break;
    
                            default:
                                throw new Exception("Error Processing Request");
                                break;
                        }
                    } else {
                        throw new Exception("Error Processing Request");
                    }
                    break;

               
                case 'DELETE':

                    if ($param !== null) {
                        switch ($param[0]) {
    
                            case 'single':
                                $this->deleteSigleCarImage($param);
                                break;
    
                            default:
                                throw new Exception("Error Processing Request");
                                break;
                        }
                    } else {
                        throw new Exception("Error Processing Request");
                    }
                    break;

            default:

                break;
        }
    }

   



    public function getCarImages(array $param)
    {
        $imageModel = new imageModel();
        if (!empty($param[1]) && is_numeric($param[1])) {
            $this->response($imageModel->getCarImages($param[1]));
        } else {
            $this->showError("Impossible recuperer les images");
        }
    }


    public function deleteSigleCarImage($param){
        if ($this->valueFromToken() === "admin") {
            if (!empty($param[1]) && !empty($param[2])) {
                $imageModel = new ImageModel();
                $this->response($imageModel->deleteSigleCarImage($param[1], $param[2]));
            }
        }
    }


    public function addNewImages(){
        try {
           
              if ($this->valueFromToken() === "admin") {
                  if (isset($_POST["carID"]) && isset($_FILES['gallery'])) {
                    $imageModel = new ImageModel();
                      $this->response($imageModel->addNewImages($_POST['carID'],$_FILES['gallery']));
                  }else{
                      throw new Exception("Error Processing Request");    
                  }
              }else{
                  throw new Exception("Error Processing Request");
                  
              }
        } catch (\Exception $e) {
          $this->showError($e->getMessage());
        }
      }
  


  
}
