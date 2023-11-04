<?php

require_once 'AbstractModel.php';

class ReviewModel extends AbstractModel
{

    public function getReviews()
    {
        $query = "SELECT * FROM reviews 
        WHERE review > 2 AND is_validate = 1
        ORDER BY id DESC 
        LIMIT 0,20";

        if (!is_null($this->pdo)) {
            $stmt = $this->pdo->prepare($query);
            if ($stmt->execute()) {

                $reviews = [];
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $reviews[] = $row;
                }
                return $reviews;
            }
        }
    }


    public function newReview(string $name, string $message, int $review)
    {
        $query = "INSERT INTO reviews(name,message,review) VALUES(:name,:message,:review)";
        try {
            if (!is_null($this->pdo)) {
                $stmt = $this->pdo->prepare($query);
                $stmt->bindParam(':name', $name, PDO::PARAM_STR);
                $stmt->bindParam(':message', $message, PDO::PARAM_STR);
                $stmt->bindParam(':review', $review, PDO::PARAM_INT);

                if ($stmt->execute()) {
                    return ["status" => 1, "message" => "Votre avis a été envoyé"];
                } else {
                    throw new PDOException("Un probleme est survenu");
                }
            } else {
                throw new PDOException("Un probleme est survenu");
            }
        } catch (\Exception $e) {
            return $this->showError($e->getMessage());
        }
    }


    public function reviewValidation($reviewValue, $reviewId)
    {

        $query = "UPDATE reviews SET is_validate = :value WHERE id = :id";
        try {
            if (!is_null($this->pdo)) {
                $stmt = $this->pdo->prepare($query);
                $stmt->bindValue(':value', $reviewValue, PDO::PARAM_INT);
                $stmt->bindValue(':id', $reviewId, PDO::PARAM_INT);

                if ($stmt->execute()) {
                   return ["status" => 1, "message" => "Modification effectuée"];
                } else {
                    throw new PDOException("Un probleme est survenu");
                }
            } else {
                throw new PDOException("Un probleme est survenu");
            }
        } catch (Exception $e) {
            return $this->error("Un probleme est survenu");
        }
    }

    public function getTotalReviews()
    {
        $query = "SELECT COUNT(review)*5 AS total,
        COUNT(IF(review = 1,1,NULL))*1 AS stars1,
        COUNT(IF(review = 2,1,NULL))*2 AS stars2,
        COUNT(IF(review = 3,1,NULL))*3 AS stars3,
        COUNT(IF(review = 4,1,NULL))*4 AS stars4,
        COUNT(IF(review = 5,1,NULL))*5 AS stars5 
        from reviews WHERE is_validate = 1";

        try {

            if (!is_null($this->pdo)) {
                $stmt = $this->pdo->prepare($query);

                if ($stmt->execute()) {
                    $total = [];
                    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        $total[] = $row;
                    }
                 
                    return ["status" => 1, "total" => $total];
                } else {
                    throw new PDOException("Un probleme est survenu");
                }
            }
        } catch (\Exception $e) {
            return $this->Error($e->getMessage());
        }
    }


    public function getReviewsToValidate(int $currentPage, int $filters)
    {
        try {
            if (!is_null($this->pdo)) {
                if ($filters === 0) {
                    $query = "SELECT *, (SELECT count(*) FROM reviews WHERE is_validate = 0) as count FROM reviews
                    WHERE is_validate = 0 ORDER BY id DESC LIMIT :currentPage,9";
                    $stmt = $this->pdo->prepare($query);
                    $stmt->bindValue(':currentPage', $currentPage, PDO::PARAM_INT);
                } elseif ($filters === 1) {
                    $query = "SELECT *, (SELECT count(*) FROM reviews) as count FROM reviews ORDER BY id DESC LIMIT :currentPage,9";
                    $stmt = $this->pdo->prepare($query);
                    $stmt->bindValue(':currentPage', $currentPage, PDO::PARAM_INT);
                } else {
                    throw new Exception("Un probleme est survenu");
                }
                if ($stmt->execute()) {
                    $reviews = [];
                    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        $reviews[] = $row;
                    }
                   return ["status" => 1, 'reviews' => $reviews, 'filter' => $filters];
                } else {
                    throw new PDOException("Un probleme est survenu");
                }
            } else {
                throw new PDOException("Un probleme est survenu");
            }
        } catch (\Exception $e) {
            return $this->Error($e->getMessage());
        }
    }
}
