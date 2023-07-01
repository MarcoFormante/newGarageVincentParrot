<?php

require_once 'connection.php';


Class carHandler{

    use Connection;

    public function getAllEquipments(){
        $query= "SELECT * FROM equipments ORDER BY id";

        if (!is_null($this->pdo)) {
            $stmt = $this->pdo->prepare($query);
            if ($stmt->execute()) {
                $equipments=[];
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $equipments[]=$row;  
                }
                echo json_encode(["status"=>1,"equipments"=>$equipments]);
            }else{
                echo json_encode(["status"=>0,"message"=>"Erreur pendant la recuperation des données(equipments)"]);
            }
        }
    }


    public function createNewCar($thumbnail,$gallery,$details,$equipments){

    $path = $_SERVER['DOCUMENT_ROOT'] ."/app/public/images/uploads/" ;
    $thumbnailName =  uniqid() . uniqid().".jpg";
    $galleryPathArray = [];

    foreach ($_FILES['gallery']['tmp_name'] as $key => $value) {
        $fileName =  uniqid() . uniqid().".jpg";
        $galleryPathArray[$key] = $fileName; 
    }

    // uploadThumbnail($thumbnail,$path,$thumbnailName);
    // uploadGalleryImages($gallery,$path,$galleryPathArray);


    }

}


function uploadThumbnail($image,$path,$imageName){
    move_uploaded_file($image['tmp_name'], $path . $imageName);
}



function uploadGalleryImages($gallery,$path,$galleryPathArray){
    foreach ($gallery['tmp_name'] as $key => $imgTmp) {
       move_uploaded_file($imgTmp, $path . $galleryPathArray[$key]);
    } 
}