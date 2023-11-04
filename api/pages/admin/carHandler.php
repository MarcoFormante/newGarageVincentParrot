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
        }elseif(isset($_GET['car_id']) && isset($_GET['equip_id'])){
            $carID = htmlspecialchars($_GET['car_id']);
            $equipID = htmlspecialchars($_GET['equip_id']);
                $CarHandlerController = new CarHandlerController();
                $CarHandlerController->addEquipment($carID,$equipID);
          
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

            break;
        }

        if (isset($_POST['currentPage']) && isset($_POST['getAllCars']) && isset($_POST['filters']) && isset($_POST["filterValue"])) {
            
            $CarHandlerController = new CarHandlerController();
            $CarHandlerController->getAllCars($_POST['currentPage'],$_POST['filters'],$_POST['filterValue']);
            break;
        }


        // if (isset($_POST['newEquipment'])) {
        //     $equipment = htmlspecialchars($_POST['newEquipment']);
        //     $CarHandlerController = new CarHandlerController();
        //     $CarHandlerController->addNewEquipment($equipment);
        //     break;
        // }


        // if (isset($_POST['table']) && isset($_POST['column']) && isset($_POST['id'])) {
        //     $CarHandlerController = new CarHandlerController();
        //     if ($_FILES) {
        //         $CarHandlerController->updateCar($_POST['table'],$_POST['column'],$_FILES['value'],$_POST['id'],$_POST['imageData']);
        //     }else{
        //         $CarHandlerController->updateCar($_POST['table'],$_POST['column'],$_POST['value'],$_POST['id']);
        //     } 

        //     break;
        // }

        if (isset($_POST['car_id']) && isset($_FILES['gallerie'])) {
            $CarHandlerController = new CarHandlerController();
            $CarHandlerController->addNewImages($_POST['car_id'],$_FILES['gallerie']);
        }

        

       

    case 'DELETE':
       
        if(isset($_GET['id']) && isset($_GET['thumbnail'])) {
          
                $id = htmlentities($_GET['id']);
                $thumbnail = htmlentities($_GET['thumbnail']);
                $CarHandlerController = new CarHandlerController();
                $CarHandlerController->deleteCar($id,$thumbnail);
                break;
        }

        if (isset($_GET["car_id"]) && isset($_GET['equip_id'])) {
           $carID = htmlspecialchars($_GET["car_id"]);
           $equipID = htmlspecialchars($_GET['equip_id']);
           $CarHandlerController = new CarHandlerController();
           $CarHandlerController->deleteEquipment($carID,$equipID);
           break;
        }

        if (isset($_GET["car_id"]) && isset($_GET['carImage'])) {
            $CarHandlerController = new CarHandlerController();
            $CarHandlerController->deleteImageGallery($_GET["car_id"],$_GET['carImage']);
            break;
        }

      

    default:
   
        break;
   }







    
































