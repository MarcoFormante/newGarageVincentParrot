<?php 


abstract class AbstractController {
    
    protected function response($data){
        try {
            if ($data) {
                echo $this->successResponse($data);
            }else{
                throw new Exception("Error Processing Request");
            }
        } catch (Exception $e) {
            echo $this->showError($e->getMessage());
        }
    }
    


    protected function Error($message){
        return ['status'=>0,"message"=>"Erreur: "  . $message];
    }
    

    protected function Json($data){
        return json_encode($data,JSON_UNESCAPED_UNICODE);
    }

    protected function checkNumericParam($param,$index){
        if (!empty($param[$index]) && is_numeric($param[$index])) {
            return true;
        }else{
            return false;
        }
    }

        
protected function showError($data){
    echo $this->Json($this->Error($data));
}

private function successResponse($data){
    return json_encode($data,JSON_UNESCAPED_UNICODE);
}


protected function valueFromToken()
    {
        include("models/UserModel.php");
        if (!empty(apache_request_headers()["Authorization"])) {
            $auth = apache_request_headers()["Authorization"];
            $token = str_replace("Bearer ", "", $auth);
            if (trim($token) !== "") {
                $userModel = new userModel();
                $response =  $userModel->checkToken(trim($token));
                if (!empty($response['status']) && $response['status'] === 1) {
                    return $response['role'];
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    
}


}






