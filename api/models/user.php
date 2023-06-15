<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
require_once("connection.php");
require_once '/xampp/htdocs/app/vendor/autoload.php';

use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

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

        $isEmailValid = false;
        $isPwdValid = false;
        
        if ($email) {
            $isEmailValid = true;
        }else{
            die("L'email est incorrect");
        }
        if ($pwd) {
            $isPwdValid = true;

        }else{
            die("Le password est incorrect");
        }
        if ($isEmailValid && $isPwdValid) {
            return ["email"=>$email,"pwd"=>$pwd];
        }
        
      
    }


    public function createNewUser(string $email, string $pwd){
        $fields =$this->filterEmailPwd($email,$pwd);
        $email = $fields["email"];
        $pwd = $fields["pwd"];
         if ($email && $pwd) {
                $role = 1;
                $hashedPwd = password_hash($pwd,PASSWORD_BCRYPT);
                $stmt = $this->pdo->prepare("INSERT INTO users(email,password,role_id) VALUES(:email,:pwd,:roles)");
                $stmt->bindParam(":email",$email,PDO::PARAM_STR);
                $stmt->bindParam(":pwd",$hashedPwd,PDO::PARAM_STR);
                $stmt->bindParam(":roles",$role,PDO::PARAM_INT);
                
                try {
                    if ($stmt->execute()) {
                       
                        echo json_encode(["status"=> 1,"message"=>"Le compte pour $email a été créé"]);
                        
                     }else{
                         echo json_encode(["status"=> 0,"message"=>"Erreur pendant l'envois des données"]);
                     }
                } catch (Exception $e) {
                   echo json_encode(["status"=> 0,"message"=> "Erreur dans l'envois des données, verifier que l'email n'existe deja, Error : " . $e->getMessage()]);
                }
               
         }else{
            echo json_encode(["status"=> 0,"message"=>"Erreur pendant l'envois des données, email et password sont obbligatoires"]);
         }
        
       
    }

    public function login(string $email,string $pwd){
       
        if ($email && $pwd) {
         
            if (!is_null($this->pdo)) {
                $query = "SELECT email, password, role FROM users INNER JOIN Roles ON role_id = Roles.id WHERE email = :email";
                $stmt = $this->pdo->prepare($query);
                $stmt->bindParam(":email",$email,PDO::PARAM_STR);
                
                if ($stmt->execute()) {
                  
                    if($row = $stmt->fetch()){
                            if(password_verify($pwd,$row["password"])){
                                $role = $row["role"];
                                $token = $this->getToken($email,$role);

                                echo json_encode(["status"=> 1,"token" => $token,"role" => $role]);
                              
                            }else{
                                echo json_encode(["status"=> 0,"message"=> "L'email ou le password est incorrect"]);
                            }

                        }else{
                            echo json_encode(["status"=> 0,"message"=> "L'email ou le password est incorrect"]);
                        }
                    }else {
                        echo json_encode(["status"=> 0,"message"=> "Probleme de connection au Server"]);
                    }
                }
            }else{
                echo json_encode(["status"=> 0,"message"=> "L'email ou le password est incorrect"]);
            }
        }


        public function getToken(string $email, string $role) :string{
            $payload = array(
                "email"=>$email,
                "role"=>$role
            );
            $token = JWT::encode($payload, getenv("JWTkey"), "HS256");

            return $token;
        }


        public function checkToken(string $token){
            $decodeToken = JWT::decode($token, new Key(getenv("JWTkey"),"HS256"));
            if ($decodeToken) {
                echo json_encode(["status"=> 1,"role" => $decodeToken->role]);
            }

        }
    }




?>