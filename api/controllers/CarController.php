<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once("models/CarModel.php");
require_once("AbstractController.php");


class CarController extends AbstractController
{

    public function index(string $method, $param = null)
    {

        switch ($method) {
            case 'GET':

                if ($param !== null) {
                    switch ($param[0]) {
                        case 'offers':
                            $this->getOffers($param);
                            break;

                        case 'filters':
                            $this->getAllFilterParams();
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

                        case 'all':
                            $this->getAllCars();
                            break;

                        case 'new':
                            $this->newCar();
                            break;
                            
                        case 'update':
                          
                            $this->updateCar();
                            break;

                        default:
                            throw new Exception("Error Processing Request");
                            break;
                    }
                }
                break;

            case 'DELETE':

                if ($param !== null) {

                    switch ($param[0]) {

                        case 'delete':
                            $this->deleteCar($param);
                            break;

                            case 'image':
                                $this->deleteSigleCarImage($param);
                                break;



                        default:
                            throw new Exception("Error Processing Request");
                            break;
                    }
                }
                break;

            default:

                break;
        }
    }



    public function getAllCars()
    {
        $carModel = new CarModel();
        if (isset($_POST['page']) && isset($_POST['filters']) && isset($_POST['filterValue'])) {
            if ($this->valueFromToken() === "admin") {
                $this->response($carModel->getAllCarsAD($_POST['page'], $_POST['filters'], $_POST['filterValue']));
            } else {
                $this->showError("Vous n'avez pas le droit d'administrateur");
            }
        } elseif (isset($_POST['page']) && isset($_POST['filters'])) {
            $this->response($carModel->getAllCars($_POST['page'], $_POST['filters']));
        } else {
            $this->showError("Impossible recuperer les voitures");
        }
    }




    public function getCarImages(array $param)
    {
        $carModel = new CarModel();
        if (!empty($param[1]) && is_numeric($param[1])) {
            $this->response($carModel->getCarImages($param[1]));
        } else {
            $this->showError("Impossible recuperer les images");
        }
    }


    public function getAllFilterParams()
    {
        $carModel = new CarModel();
        $this->response($carModel->getAllFilterParams());
    }


    public function getOffers(array $param)
    {
        $car = new CarModel();

        if (!empty($param[1]) && is_numeric($param[1])) {
            $limit = $param[1];
            $this->response($car->getOffers($limit));
        } else {
            $this->response($car->getOffers(0));
        }
    }


    public function newCar()
    {
        try {
            if ($this->valueFromToken() === "admin" || $this->valueFromToken() === "employee") {

                if (isset($_FILES['thumbnail']) && isset($_FILES['gallery']) && isset($_POST['details'])) {
                    $thumbnail = $_FILES['thumbnail'];
                    $gallery = $_FILES['gallery'];
                    $details = $_POST['details'];

                    if (isset($_POST['equipments'])) {
                        $equipments = $_POST['equipments'];
                    } else {
                        $equipments = [];
                    }
                    if (count($equipments) < 1) {
                       $equipments = null;
                    }

                    $car = new CarModel();

                    $this->response($car->newCar($thumbnail, $gallery, $details, $equipments));
                } else {
                    throw new Exception("Error Processing Request");
                }
            } else {
                throw new Exception("Error Processing Request");
            }
        } catch (\Exception $e) {
            $this->showError($e->getMessage());
        }
    }


    public function  deleteCar($param)
    {
        try {
            if ($this->valueFromToken() === "admin") {    
            if (!empty($param[1]) && !empty($param[2])) {
                if (is_numeric($param[1])) {
                    $id = $param[1];
                    $thumbnail = $param[2];
                    $carModel = new CarModel();
                    $this->response($carModel->deleteCar($id, $thumbnail));
                } else {
                    throw new Exception("Error Processing Request", 0);
                }
            } else {
                throw new Exception("Error Processing Request", 0);
            }
        }
        } catch (\Exception $e) {
            $this->showError($e->getMessage());
        }
    }


    public function deleteSigleCarImage($param){
        if ($this->valueFromToken() === "admin") {
            if (!empty($param[1]) && !empty($param[2])) {
                $carModel = new CarModel();
                $this->response($carModel->deleteImageGallery($param[1], $param[2]));
            }
        }
    }




    public function updateCar(){
        if ($this->valueFromToken() === "admin") {
            if (isset($_POST['column']) && isset($_POST['id'])) {
                $carModel = new CarModel();
                if ($_FILES) {
                    $this->response($carModel->updateCar($_POST['column'],$_FILES['value'],$_POST['id'],$_POST['imageData']));
                }else{
                    $this->response($carModel->updateCar($_POST['column'],$_POST['value'],$_POST['id']));
                } 
            }
        }
    }

}
