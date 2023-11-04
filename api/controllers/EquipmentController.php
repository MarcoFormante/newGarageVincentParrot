<?php


require_once("controllers/AbstractController.php");
require_once("models/EquipmentModel.php");

class EquipmentController extends AbstractController
{

    public function index($method, $param = null)
    {
        switch ($method) {
            case 'GET':

                if ($param !== null) {

                    switch ($param[0]) {
                        case 'all':
                            $this->getAllEquipments();
                            break;

                        case 'id':

                            $this->getCarEquipments($param);
                            break;



                        default:
                            throw new Exception("Error Processing Request");
                            break;
                    }
                }
                break;

            case 'POST':

                if ($param !== null) {

                    switch ($param[0]) {
                        case 'add':
                            $this->addCarEquipment($param);
                            break;
                        case 'new':
                            $this->addNewEquipment($param);
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
                            $this->deleteCarEquipment($param);
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


    public function getAllEquipments()
    {
        $eqModel = new EquipmentModel;
        $this->response($eqModel->getAllEquipments());
    }




    public function getCarEquipments(array $param)
    {
        $eqModel = new EquipmentModel;
        try {

            if ($this->checkNumericParam($param, 1)) {

                $this->response($eqModel->getCarEquipments($param[1]));
            } else {
                throw new Exception("Impossible recuperer les equipements");
            }
        } catch (\Exception $e) {
            $this->showError($e->getMessage());
        }
    }


    public function addCarEquipment($param)
    {
        if ($this->valueFromToken() === "admin" || $this->valueFromToken() === "employee") {
            $eqModel = new EquipmentModel;
            if ($this->checkNumericParam($param, 1) &&  $this->checkNumericParam($param, 2)) {
                $this->response($eqModel->addCarEquipment($param[1], $param[2]));
            } else {
                $this->showError("Un probleme est survenu");
            }
        } else {
            $this->showError("Un probleme est survenu");
        }
    }

    

    public function addNewEquipment($param)
    {
        if ($this->valueFromToken() === "admin" || $this->valueFromToken() === "employee") {
            $eqModel = new EquipmentModel;
            if (!empty($param[1]) && is_string($param[1])) {
                $this->response($eqModel->addNewEquipment($param[1]));
            } else {
                $this->showError("Un probleme est survenu");
            }
        } else {
            $this->showError("Un probleme est survenu");
        }
    }



    public function deleteCarEquipment($param)
    {
        if ($this->valueFromToken() === "admin") {
            $eqModel = new EquipmentModel;
            if ($this->checkNumericParam($param, 1) &&  $this->checkNumericParam($param, 2)) {
                $this->response($eqModel->deleteCarEquipment($param[1], $param[2]));
            } else {
                $this->showError("Un probleme est survenu");
            }
        } else {
            $this->showError("Un probleme est survenu");
        }
    }
}
