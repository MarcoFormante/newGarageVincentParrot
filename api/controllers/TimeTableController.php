<?php 

require_once("models/TimetableModel.php");
require_once("AbstractController.php");

Class TimeTableController extends AbstractController{

    public function index(string $method, $param = null){
        switch ($method) {
            case 'GET':
                if ($param !== null) {
                   switch ($param[0]) {
                    case 'all':
                       $this->getTimeTable();
                        break;
                    
                    default:
                        # code...
                        break;
                   }
                }
                break;

                case 'POST':
                    if ($param !== null) {
                       switch ($param[0]) {
                        case 'update':
                          
                           $this->updateTimeTable();
                            break;
                        
                        default:
                            # code...
                            break;
                       }
                    }
                    break;
            
            default:
                throw new Exception("Error Processing Request");
                break;
        }
    }

    public function getTimeTable(){
       
        $TimeTable = new TimetableModel();
        $this->response($TimeTable->getOpeningTimes());
        
    }


    public function updateTimeTable(){
        if ($this->valueFromToken() === "admin") {
            if (isset($_POST['id']) && isset($_POST['column']) && isset($_POST['value']) && isset($_POST['close']) ) {
                $id = $_POST['id'];
                $column = $_POST['column'];
                $value = $_POST['value'];
                $close = $_POST['close'];
                $TimeTable = new TimetableModel();
                $this->response($TimeTable->updateOpeningTimes($id,$value,$column,$close));
            }
          
        }
     
    }
}