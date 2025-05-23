<?php

require_once("models/ReviewModel.php");
require_once("controllers/AbstractController.php");


Class ReviewController extends AbstractController{

    public function index($method,$param = null){
        switch ($method) {
            case 'GET':
                
                if ($param !== null) {
                   switch ($param[0]) {
                    case 'all':
                        $this->getReviews();
                        break;

                        case 'total':
                            $this->getTotalReviews();
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

                        case 'allToValidate':
                            $this->getReviewsToValidate();
                            break;

                            case 'validation':
                                $this->reviewValidation($param);
                                break;

                                case 'new':
                                    $this->newReview();
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
    

    public function getReviews(){
        $Review = new ReviewModel();
        $this->response(["reviews"=>$Review->getReviews()]);
        
    }
    // string $name, string $message, int $review
    public function newReview(){
        if (isset($_POST['name']) && isset($_POST['message']) && isset($_POST['review'])) {
            $name = $_POST['name'] ;
            $message = $_POST['message'];
            $review = $_POST['review'];
            $Review = new ReviewModel();
            $this->response($Review->newReview($name,$message, $review));
        }
       
          
    }   

    public function reviewValidation($param){
       
        if (preg_match("/admin|employee/",$this->valueFromToken())) {
            
              
            if (isset($_POST["reviewValidationValue"]) && isset($_POST["reviewValidationId"])) {
                $Review = new ReviewModel();
                $this->response($Review->reviewValidation($_POST["reviewValidationValue"],$_POST["reviewValidationId"]));
            }else{
              
                $this->showError("un probleme est survenu");
            }
       
        }else{
           
            $this->showError("un probleme est survenu");
        }
    }

    public function getTotalReviews(){
        $review = new ReviewModel();
        $this->response($review->getTotalReviews());
    }

    public function getReviewsToValidate(){
        if (preg_match("/admin|employee/",$this->valueFromToken())) {
          
            if (isset($_POST['currentPage']) && isset($_POST['filters'])) {
                $currentPage = $_POST['currentPage'];
                $filters = $_POST['filters'];
                $review = new ReviewModel();
                $this->response($review->getReviewsToValidate($currentPage,$filters));
            }else{
                $this->showError("Erreur pendant la recuperation des données");
            }
           
        }else{
            $this->showError("Erreur pendant la recuperation des données");
        }
    }

  
}
?>