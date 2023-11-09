import React, { useState, useEffect, useRef } from "react";
import Arrows from "../../Arrows/Arrows";
import { useLocation, Link, Navigate } from "react-router-dom";
import PageTitle from "../../PageTitle/PageTitle";
import axios from "../../../api/axios";
import Loading from "../../Loading/Loading";


const CarDetails = () => {
  const location = useLocation();
  const [loadingComponent, setLoadingComponent] = useState(null);
  const [detailsInLoading, setDetailsInLoading] = useState(true);
  const [carPhotosInLoading, setCarPhotosInLoading] = useState(true);
 
 
 
  useEffect(() => {
    if (detailsInLoading && carPhotosInLoading) {
      setLoadingComponent(true);
    } else {
      setTimeout(() => {
        setLoadingComponent(false);
      }, 800);
    }
  }, [detailsInLoading, carPhotosInLoading]);

  if (loadingComponent) {
    return <Loading isLoading={true} />;
  }


  return location.state?.make && !loadingComponent ? (
    <div>
      <PageTitle
        style={{
          maxWidth: "73vw",
          margin: "auto",
          maxHeight: "63px",
          overflow: "hidden",
        }}
        pageTitle={location.state.make + " " + location.state.model}
      />
      {location.state.lastlocation === "parcAuto" ? (
        <Link
          className={"exitBtn"}
          to={"/parc-auto/"}
          state={{ currentPage: location.state.currentPage }}
        />
      ) : (
        <Link className={"exitBtn"} to={"/"} />
      )}
      
      <CarPhotos
        thumbnail={location.state.thumbnail}
        year={location.state.year}
        km={location.state.km}
        price={location.state.price}
        offer={location.state.offer}
        setCarPhotosInLoading={(value) => setCarPhotosInLoading(value)}
      />
      <Details
        {...location.state}
        setDetailsInLoading={(value) => setDetailsInLoading(value)}
      />

    </div>
  ) : (
    <Navigate to={"/"} />
  );
};

export default CarDetails;

// Photos of single car ,car Photos carousel component
const CarPhotos = ({
  thumbnail,
  year,
  km,
  price,
  offer,
  setCarPhotosInLoading,
}) => {
  const [imgs, setImgs] = useState([]);
  const [imgLarge, setImgLarge] = useState("");
  const [arrowTarget, setArrowTarget] = useState();
  const [carouselWidth, setCarouselWidth] = useState();
  const [carouselX, setCarouselX] = useState();
  const [activeImg, setActiveImg] = useState();
  const [imgWidth,setImgWidth] = useState(0)
  const carousel = useRef();
  const location = useLocation();
  const imgRef = React.useRef()
  //carousel scroll event
  const handleScrollCarousel = (direction) => {
    setArrowTarget("");
    carousel.current.scrollBy({
      top: 0,
      left: direction + document.querySelector(".img_carousel_details").width,
      behavior: "smooth",
    });
  };

  const handleOnClick = (imgPath, imgId) => {
    setImgLarge(imgPath);
    setActiveImg(imgId);
  };

  useEffect(() => {
    setTimeout(() => {
      setArrowTarget("");
    }, 300);
  }, [arrowTarget]);

  useEffect(() => {
    setCarouselX(
      carousel?.current?.scrollLeft !== null && carousel?.current?.scrollLeft
    );
    setCarouselWidth(
      carousel?.current?.scrollWidth - carousel?.current?.offsetWidth
    );
    switch (arrowTarget) {
      case "left":
        handleScrollCarousel("-");
        break;
      case "right":
        handleScrollCarousel("+");
        break;

      default:
        break;
    }
  }, [arrowTarget, carouselWidth, carouselX]);

  // every tick check scrollLeft of carousel ref
  useEffect(() => {
        
    carousel?.current?.addEventListener("scroll", () => {
        setCarouselX(carousel?.current?.scrollLeft)
        setCarouselWidth(carousel?.current?.scrollWidth - carousel?.current?.offsetWidth);  
    })

    return carousel?.current?.removeEventListener("scroll", () => {
        setCarouselX(carousel?.current?.scrollLeft)
        setCarouselWidth(carousel?.current?.scrollWidth - carousel?.current?.offsetWidth);  
    })

}, [carouselX, carouselWidth, carousel?.current?.offsetWidth])

  useEffect(() => {
    window.addEventListener("resize", () => {
      setCarouselX(
        carousel?.current?.scrollLeft !== null && carousel?.current?.scrollLeft
      );
      setCarouselWidth(
        carousel?.current?.scrollWidth - carousel?.current?.offsetWidth
      );
      setImgWidth(imgRef?.current?.width)
    });

    return window.removeEventListener("resize", () => {
      setCarouselX(
        carousel?.current?.scrollLeft !== null && carousel?.current?.scrollLeft
      );
      setCarouselWidth(
        carousel?.current?.scrollWidth - carousel?.current?.offsetWidth
      );
      setImgWidth(imgRef?.current?.width)
    });
  }, []);
  useEffect(() => {
    
    //fetch data imgs from img folder by backend
    axios.get(`image/carGallery/${location.state.id}`).then((response) => {
      if (response?.data?.status === 1) {
        setImgs([{ id: "", path: thumbnail }]);
        setImgs((prev) => [...prev, ...response?.data.images]);
        setCarPhotosInLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    setImgLarge("/images/uploads/" + imgs[0]?.path);
    setActiveImg(imgs[0]?.id);
  }, [imgs]);

  return (
    <div className={"car_details_top_carousel_container"}>
      <div className={"img_show_large"}>
        <div className={"car_details_base"}>
          <div>
            <span>
              {" "}
              Année: <span style={{ display: "block" }}>{year}</span>{" "}
            </span>
            <span>
              Km: <span style={{ display: "block" }}>{km}</span>{" "}
            </span>
            <p>
              Prix:
              <span style={offer > 0 ? { textDecoration: "line-through" } : {}}>
                {" "}
                <span style={offer <= 0 ? { display: "block" } : {}}>
                  {" "}
                  {price} ${" "}
                </span>
              </span>
              {offer && offer > 0 ? (
                <span
                  style={{
                    minWidth: 60,
                    color: "white",
                    display: "block",
                    padding: "1px",
                    border: "1px solid",
                    borderRadius: 12,
                    background: "#D64E54",
                  }}
                >
                  {" "}
                  {price - offer} $
                </span>
              ) : (
                ""
              )}
            </p>
          </div>

          <img src={imgLarge} alt="" />
        </div>
      </div>
      {/**Carousel car details */}
      <Arrows
        cardsTotalWidth={imgs.length * imgWidth}
        carouselX={carouselX}
        carouselWidth={carouselWidth}
        onClick={(direction) => setArrowTarget(direction)}
      />

      <div className={"details_carousel_container"} ref={carousel}>
        <div className={"details_carousel_imgs"}>
          {imgs.map(
            (img, index) =>
              img.path !== "" && (
                <img
                  className={
                    activeImg === img.id
                      ? "img_carousel_details--active"
                      : "img_carousel_details"
                  }
                  key={"car_detail" + index}
                  src={"/images/uploads/" + img.path}
                  alt={""}
                  width={250}
                  height={180}
                  ref={index === 0 ? imgRef : null}
                  onLoad={(e)=>setImgWidth(e.target.width)}
                  onClick={() =>
                    handleOnClick("/images/uploads/" + img.path, img.id)
                  }
                />
              )
          )}
        </div>
      </div>
    </div>
  );
};

//car Details Component
const Details = ({
  id,
  year,
  km,
  gearbox,
  din_power,
  fiscalPower,
  color,
  doors,
  seats,
  vo,
  din,
  energy,
  setDetailsInLoading,
}) => {
  const [activeDetail, setActiveDetail] = useState(true);
  const [details, setDetails] = useState([]);
  const [equipements, setEquipements] = useState([]);
  const detailsTitles = [
    "Année",
    "Kilométrage",
    "Boîte de vitesses",
    "Puissance DIN",
    "Nùmero VO",
    "Puissance fiscale",
    "Couleur",
    "Portières",
    "Sièges",
    "Énergie",
  ];

  useEffect(() => {
    axios.get(`equipment/id/${id}`).then((response) => {
      if (response.data.status === 1) {
        const detailsArray = [
          year,
          km + " km",
          gearbox,
          din + "cv",
          vo,
          fiscalPower + "ch",
          color,
          doors,
          seats,
          energy,
        ];

        setDetails([...detailsArray]);
        setEquipements(response?.data?.equipments);
        setDetailsInLoading(false);
      }
    });
  }, []);

  const handleActiveDetailBlock = (clicked_element) => {
    switch (clicked_element) {
      case "first":
        if (activeDetail === false) {
          setActiveDetail(true);
        } else {
          setActiveDetail(true);
        }
        break;

      case "second":
        if (activeDetail === true) {
          setActiveDetail(false);
        } else {
          setActiveDetail(true);
        }
        break;

      default:
        break;
    }
  };
  return (
    <div>
      <div
        className={"container--center--row container--center--row--flex-end"}
      >
        {!details.length < 1 && (
          <div
            className={"details_first_container details_container"}
            style={
              activeDetail === true
                ? { border: "1px solid", backgroundColor: "#D64E54" }
                : { opacity: "0.3" }
            }
            onClick={() => handleActiveDetailBlock("first")}
          >
            <span className={"details_title_header"}>Détails du vehicule</span>
          </div>
        )}

        {equipements.length > 0 && (
          <div
            className={"details_second_container details_container"}
            style={
              activeDetail === false
                ? { border: "1px solid", backgroundColor: "#D64E54" }
                : { opacity: "0.3" }
            }
            onClick={() => handleActiveDetailBlock("second")}
          >
            <span className={"details_title_header"}>Equipements</span>
          </div>
        )}
      </div>

      <div className={"detail_first_inner"}>
        <ul className={"detail_first_inner_list"}>
          {activeDetail === true
            ? details &&
              detailsTitles.map((detail, index) => (
                <li key={"detail_" + index}>
                  <span className="detail_title">{detail}</span>{" "}
                  <span> {details[index]}</span>
                </li>
              ))
            : equipements &&
              equipements.map((equip, index) => (
                <li key={"equipement_" + index}>
                  <span className="detail_title--black">{equip.equipment}</span>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};
