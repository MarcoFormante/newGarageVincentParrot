<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once("AbstractController.php");
require_once("models/UserModel.php");
class UserController extends AbstractController
{



    public function index(string $method, $param = null)
    {
        switch ($method) {

            case 'POST':

                if ($param !== null) {
                    switch ($param[0]) {
                        case 'check':

                            $this->login();

                            break;

                        case 'checkToken':

                            $this->checkToken($param);

                            break;

                        case 'new':

                            $this->createNewUser();

                            break;

                        case 'all':

                            $this->getAllAccounts();

                            break;

                        default:
                            # code...
                            break;
                    }
                }
                break;

            case 'DELETE':

                if ($param !== null) {
                    switch ($param[0]) {
                        case 'delete':
                            $this->deleteUser($param);
                            break;

                        default:
                            # code...
                            break;
                    }
                    break;
                }



            default:
                throw new Exception("Error Processing Request");
                break;
        }
    }


    public function createNewUser()
    {

        $isAdmin = false;
        $userModel = new userModel();
        if ($token = apache_request_headers()["Authorization"]) {
            $token = str_replace("Bearer ", "", $token);
            if (trim($token) !== "") {

                $response =  $userModel->checkToken(trim($token));
                if (!empty($response['status']) && $response['status'] === 1) {
                    if ($response['role'] === "admin") {
                        $isAdmin = true;
                    }
                }
            }
        } else {
            $this->showError("un problem est survenu");
        }

        if (!$isAdmin) {
            $this->showError("un problem est survenu");
            exit();
        }

        if (isset($_POST['email']) && isset($_POST['password'])) {
            if (filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
                $email = $_POST['email'];
                $pwd = $_POST['password'];
                $this->response($userModel->createNewUser($email, $pwd));
            } else {
                $this->showError("un probleme est survenu");
            }
        } else {
            $this->showError("L\'email et le password sont obbligatoires");
        }
    }


    public function login()
    {

        if (isset($_POST['email']) && isset($_POST['password'])) {

            $user = new UserModel();
            $this->response($user->login($_POST['email'], $_POST['password']));
        } else {
            $this->showError("L\'email et le password sont obbligatoires");
        }
    }


    public function checkToken($param)
    {
        $user = new UserModel();
        if (isset($_POST['token'])) {

            $this->response($user->checkToken($_POST['token']));
        } elseif (!empty($param[1])) {
            $this->response($user->checkToken($param[1]));
        } else {
            $this->showError("Vous n'avez pas les droits d'administrateur");
        }
    }

    public function getAllAccounts()
    {
        $isAdmin = false;
        $userModel = new userModel();
        if (!empty(apache_request_headers()["Authorization"])) {
            $auth = apache_request_headers()["Authorization"];
            $token = str_replace("Bearer ", "", $auth);
            if (trim($token) !== "") {
                $response =  $userModel->checkToken(trim($token));
                if (!empty($response['status']) && $response['status'] === 1) {
                    if ($response['role'] === "admin") {
                        $isAdmin = true;
                    }
                }
            }
        }
        if (!$isAdmin) {
            $this->showError("un problem est survenu");
            exit();
        }
        $this->response($userModel->getAllAccounts());
    }


    public function deleteUser($param)
    {

        $isAdmin = false;
        $userModel = new userModel();
        if ($token = apache_request_headers()["Authorization"]) {
            $token = str_replace("Bearer ", "", $token);
            if (trim($token) !== "") {
                $response =  $userModel->checkToken(trim($token));
                if (!empty($response['status']) && $response['status'] === 1) {
                    if ($response['role'] === "admin") {
                        $isAdmin = true;
                    }
                }
            }
        }
        if (!$isAdmin) {
            $this->showError("un problem est survenu");
            exit();
        }

        if ($this->checkNumericParam($param, 1)) {

            $this->response($userModel->deleteUser($param[1]));
        } else {
            $this->showError("un probleme est survenu");
        }
    }
}
