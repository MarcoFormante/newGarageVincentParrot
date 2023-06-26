<?php 

Class TimeTableController{

    public function getTimeTable():array{
        $TimeTable = new TimeTable();
        return $TimeTable->getTimeTable();
    }

    public function updateTimeTable(int $id,string $value,string $column,int $close){
        $TimeTable = new TimeTable();
        $TimeTable->updateTimeTable($id,$value,$column,$close);
    }
}