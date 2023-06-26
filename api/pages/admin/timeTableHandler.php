
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once '../../models/timeTable.php';
require_once '../../controllers/TimeTableController.php';


if(isset($_GET['getTime'])) {
    $timeTableController = new TimeTableController();
    $timeTable = $timeTableController->getTimeTable();
   
    if ($timeTable) {
        echo json_encode(["status"=>1,"timeTable"=>$timeTable]);
    }
}


if(isset($_POST['id']) && isset($_POST['value']) && isset($_POST['column']) && isset($_POST['close'])) {
    try {
        $timeTableController = new TimeTableController();
        $timeTable = $timeTableController->updateTimeTable($_POST['id'],$_POST['value'],$_POST['column'], $_POST['close']);
    } catch (Exception $e) {
        echo json_encode(["status"=>0,"message"=>"Erreur: " . $e->getMessage()]);
    }
   
}