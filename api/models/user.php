<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
require_once("connection.php");
require_once 'vendor/autoload.php';

use \Firebase\JWT\JWT;

Class User{

    use Connection;

    private string $email;
    private string $password;
    private string $role;

   

    public function getEmail():string{
        return $this->email;
    }

    public function getPassword():string{
        return $this->password;
    }

    public function getRole():string{
        return $this->role;
    }

    public function filterEmailPwd(string $email,string $pwd){
        $email = filter_var($email, FILTER_VALIDATE_EMAIL);
        $pwd = filter_var($pwd,FILTER_VALIDATE_REGEXP,
        array("options"=>array("regexp"=>"/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,61}$/")));
        return ["email"=>$email,"pwd"=>$pwd];
    }


    public function createNewUser(string $email, string $pwd){
        $fields =$this->filterEmailPwd($email,$pwd);
        $email = $fields["email"];
        $pwd = $fields["pwd"];
         if ($email && $pwd) {
                $role = 1;
                $hashedPwd = password_hash($pwd,PASSWORD_BCRYPT);
                $stmt = $this->pdo->prepare("INSERT INTO Users(email,password,role_id) VALUES(:email,:pwd,:roles)");
                $stmt->bindParam(":email",$email,PDO::PARAM_STR);
                $stmt->bindParam(":pwd",$hashedPwd,PDO::PARAM_STR);
                $stmt->bindParam(":roles",$role,PDO::PARAM_INT);
                try {
                    if ($stmt->execute()) {
                        echo json_encode(["status"=> 1,"message"=>"Le compte pour $email a été créé " ]);
                     }else{
                         echo json_encode(["status"=> 0,"message"=>"Erreur pendant l'envois des données"]);
                     }
                } catch (Exception $e) {
                   echo json_encode(["status"=> 0,"message"=>"Erreur dans l'envois des données, verifier que l'email n'existe deja || Error : " . $e->getMessage()]);
                }
               
         }else{
            echo json_encode(["status"=> 0,"message"=>"Erreur pendant l'envois des données, email et password sont obbligatoires"]);
         }
        
       
    }

    public function login(string $email,string $pwd){
        $fields = $this->filterEmailPwd($email,$pwd);
        $email = $fields["email"];
        $pwd = $fields["pwd"];

        if ($email && $pwd) {
         
            if (!is_null($this->pdo)) {
                $query = "SELECT email, password, role_id FROM Users WHERE email = :email";
                $stmt = $this->pdo->prepare($query);
                $stmt->bindParam(":email",$email,PDO::PARAM_STR);
               
                if ($stmt->execute()) {
                    if($row = $stmt->fetch()){
                            if(password_verify($pwd,$row["password"])){
                                echo "siii";
                            }else{
                                echo json_encode(["status"=> 0,"message"=> "L'email ou le password est incorrect"]);;
                            }

                        }else{
                            echo "no";
                        }
                    }
                }
            }
        }


        public function getToken(){

        }
    }




?>