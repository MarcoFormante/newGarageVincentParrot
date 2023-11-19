<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once 'AbstractModel.php';
require_once $_SERVER['DOCUMENT_ROOT'] . "/" . getenv("path") . '/vendor/autoload.php';

use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

class UserModel extends AbstractModel
{

 

    private function filterEmailPwd(string $email, string $pwd)
    {
        $email = filter_var($email, FILTER_VALIDATE_EMAIL);
        $pwd = filter_var(
            $pwd,
            FILTER_VALIDATE_REGEXP,
            array("options" => array("regexp" => "/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,61}$/"))
        );

        $isEmailValid = false;
        $isPwdValid = false;

        if ($email) {
            $isEmailValid = true;
        } else {
            die("L'email est incorrect");
        }
        if ($pwd) {
            $isPwdValid = true;
        } else {
            die("Le password est incorrect");
        }
        if ($isEmailValid && $isPwdValid) {
            return ["email" => $email, "pwd" => $pwd];
        }
    }


    public function createNewUser(string $email, string $pwd)
    {
        $fields = $this->filterEmailPwd($email, $pwd);
        $email = $fields["email"];
        $pwd = $fields["pwd"];
        if ($email && $pwd) {
            $role = 1;
            $hashedPwd = password_hash($pwd, PASSWORD_BCRYPT);
            $query =
            "INSERT INTO users 
            (email,password,role_id) 
            VALUES
            (:email,:pwd,:roles)";

            $stmt = $this->pdo->prepare($query);
            $stmt->bindParam(":email", $email, PDO::PARAM_STR);
            $stmt->bindParam(":pwd", $hashedPwd, PDO::PARAM_STR);
            $stmt->bindParam(":roles", $role, PDO::PARAM_INT);
            try {
                if ($stmt->execute()) {
                   return
                        [
                            "status" => 1,
                            "message" => "Le compte pour $email a été créé",
                            "userId" => $this->pdo->lastInsertId()
                        ]
                    ;
                } else {
                    throw new Exception("Erreur pendant l'envois des données");
                }
            } catch (Exception $e) {
                return $this->error("Erreur pendant l'envois des données, vérifier que l'email n'existe deja, Error: " . $e->getMessage());
            }
        } else {
            return $this->error("Erreur pendant l'envois des données, email et password sont obbligatoires");
        }
    }



    public function login(string $email, string $pwd)
    {
        if ($email && $pwd) {
            if (!is_null($this->pdo)) {
                $query = "SELECT email, password, role FROM users 
                INNER JOIN roles ON role_id = roles.id
                WHERE email = :email";
                
                $stmt = $this->pdo->prepare($query);
               
                $stmt->bindParam(":email", $email, PDO::PARAM_STR);
                if ($stmt->execute()) {
                    if ($row = $stmt->fetch()) {
                        if (password_verify($pwd, $row["password"])) {
                            $role = $row["role"];
                            $token = $this->getToken($email, $role);
                           return ["status" => 1, "token" => $token, "role" => $role];
                        } else {
                            return $this->error("L'email ou le password est incorrect");
                        }
                    } else {
                        return $this->error("L'email ou le password est incorrect");
                    }
                } else {
                    return $this->error("Probleme de connection");
                }
            }
        } else {
            return $this->error("L'email et le mot de pass sont obligatoires");
        }
    }


    private function getToken(string $email, string $role): string
    {
        $payload = array(
            "email" => $email,
            "role" => $role
        );
        $token = JWT::encode($payload, getenv("JWTkey"), "HS256");

        return $token;
    }


    public function checkToken(string $token)
    {
        $decodeToken = JWT::decode($token, new Key(getenv("JWTkey"), "HS256"));
        if ($decodeToken) {
            return ["status" => 1, "role" => $decodeToken->role];
        } else {
            return false;
        }
    }


    public function getAllAccounts()
    {
        $query = "SELECT id,email FROM users WHERE role_id = 1";

        if (!is_null($this->pdo)) {
            $stmt = $this->pdo->prepare($query);
            if ($stmt->execute()) {
                $users = [];
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $users[] = $row;
                }
                return ["status" => 1, "users" => $users];
            } else {
                return $this->error("impossible de recuperer les données (accounts)");
            }
        }
    }


    public function deleteUser(int $id)
    {
        $query = "DELETE FROM users WHERE id = :id";

        if (!is_null($this->pdo)) {
            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(':id', $id, PDO::PARAM_INT);
            if ($stmt->execute()) {
                return ["status" => 1, "message" => "Supprimé avec succès"];
            } else {
                return $this->error("impossible de supprimer ce compte");
            }
        }
    }




    // public function createAdmin()
    //     {
    //         $email = "garagevincentparrot@gmail.com";
    //         $pwd = "Testadmin23";
    //         $role = 0;
    //         $hashedPwd = password_hash($pwd, PASSWORD_BCRYPT);

    //         $query =
    //         "INSERT INTO users (email,password,role_id) 
    //         VALUES (:email,:pwd,:roles)";

    //         $stmt = $this->pdo->prepare($query);
    //         $stmt->bindParam(":email", $email, PDO::PARAM_STR);
    //         $stmt->bindParam(":pwd", $hashedPwd, PDO::PARAM_STR);
    //         $stmt->bindParam(":roles", $role, PDO::PARAM_INT);

    //         try {
    //             if ($stmt->execute()) {
    //                 return  "success";
    //             } else {
    //                 throw new Exception("Erreur pendant la creation du compte");
    //             }
    //         } catch (PDOException $e) {
    //             return $this->error($e->getMessage()) ;
    //         }
       
    //     }

    }