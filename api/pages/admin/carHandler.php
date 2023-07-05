<?php 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

require_once '../../models/carHandler.php';
require_once '../../controllers/CarHandlerController.php';





$requestMethod = $_SERVER['REQUEST_METHOD'];
   
switch ($requestMethod) {

    case 'GET':
        if (isset($_GET['getAllEquipments'])) {
            $CarHandlerController = new CarHandlerController();
            $CarHandlerController->getAllEquipments();
        }else{
            echo "YOU HAVEN'T AUTHORIZATION";
        }

    break;

    case 'POST':
        if(isset($_FILES['thumbnail']) && isset($_FILES['gallery']) && isset($_POST['details'])) {
            $thumbnail = $_FILES['thumbnail'];
            $gallery = $_FILES['gallery'];
            $details = $_POST['details'];
        
            if (isset($_POST['equipments'])) {
                $equipments = $_POST['equipments'];
            }else{
                $equipments = [];
            }
            $CarHandlerController = new CarHandlerController();
            $CarHandlerController->createNewCar($thumbnail,$gallery,$details,$equipments);
        }

        if (isset($_POST['currentPage']) && isset($_POST['getAllCars'])) {
            $CarHandlerController = new CarHandlerController();
            $CarHandlerController->getAllCars($_POST['currentPage']);
        }


        if (isset($_POST['newEquipment'])) {
            $equipment = htmlspecialchars($_POST['newEquipment']);
            $CarHandlerController = new CarHandlerController();
            $CarHandlerController->addNewEquipment($equipment);
        }

        break;

    case 'PUT':

        break;

    case 'DELETE':
       
        if(isset($_GET['id']) && isset($_GET['thumbnail'])) {
          
                $id = htmlentities($_GET['id']);
                $thumbnail = htmlentities($_GET['thumbnail']);
                $CarHandlerController = new CarHandlerController();
                $CarHandlerController->deleteCar($id,$thumbnail);
        
        }

        break;

    default:
   
        break;
   }





    
































