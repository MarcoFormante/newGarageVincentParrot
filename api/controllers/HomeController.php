<?php


Class HomeController{

    public function getOffers(){
        $home = new Home();
        if (isset($_POST['limit'])) {
            $limit = $_POST['limit'];
            return $home->getOffers($limit);
           
        }else{
            return $home->getOffers(0);
        }
    }

    public function getOpeningTimes(){
        $home = new Home();
        return $home->getOpeningTimes();   
    }


    public function getReviews(){
        $review = new Review();
        return $review->getReviewsHome();
    }

   
    
}

?>