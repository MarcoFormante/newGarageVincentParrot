<?php

header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");



    try {
        if(!empty($_GET['route'])){
            
            $url= explode("/", filter_var($_GET['route'],FILTER_SANITIZE_URL));
            $method = $_SERVER["REQUEST_METHOD"];
            $controllerName = ucfirst($url[0]) . "Controller" ?? false;
        
            $param = count($url) > 1 && !empty($url[1]) ? array_slice($url,1) : null;
           
            if (file_exists("controllers/" . $controllerName . ".php")) {
            
                require("controllers/" . $controllerName . ".php");
                $controller = new $controllerName();
                $controller->index($method, $param);
            } else {
                throw new Exception("Un erreur est survenu");
            }
    
        }else{
            throw new Exception("Erreur pendant la recuperation des données.");
        }
       
    } catch (Exception $e) {
        echo json_encode(['status' => 0, "message" => htmlspecialchars($e->getMessage()),"code"=>intval($e->getCode())],JSON_UNESCAPED_UNICODE);
    }
