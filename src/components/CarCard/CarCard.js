import React, { useLayoutEffect } from "react";
import PropTypes from "prop-types";
import ButtonCta from "../Buttons/ButtonCta";
import gsap from "gsap";

const CarCard = (props) => {
  const handleSubject = (subject) => {
    sessionStorage.setItem("carSubject", subject);
  };
  const comp = React.useRef();
  const el = React.useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (document.location.pathname.match(/parc-auto/i)) {
        gsap.fromTo(
          ".car_card",
          { opacity: 0, scale: 0, y: 800 },
          {
            opacity: 1,
            duration: 0.3,
            scale: 1,
            y: 0,
            stagger: {
              each: 0.1,
              ease: "power1.inOut",
            },
          }
        );
      }
    }, comp.current);
    return () => ctx.revert();
  }, []);

  return (
    <figure
      className="car_card"
      ref={el}
      onLoad={(e) => props.setImgWidth && props?.setImgWidth(e.target.width)}
    >
      <img src={"/images/uploads/" + props.thumbnail} alt={props.model} />

      <figcaption className={"car_card_model"}>
        {props.make} {props.model}
      </figcaption>
      <div className={"car_card_details"}>
        {/*card_details_left*/}

        <div className={"car_card_details--left"}>
          <span className={"car_card_details--left_km"}>{props.km} km</span>
          <span className={"car_card_details--left_year"}>
            Année: {props.year}
          </span>
        </div>

        {/*card_details_right (price)*/}

        <div className={"car_card_details--right"}>
          {props.offer && props.offer > 0 ? (
            <span className={"car_card_details_offer_price"}>
              {props.price - props.offer} $
            </span>
          ) : (
            ""
          )}
          <span
            className={"car_card_details_price"}
            style={props.offer > 0 ? { textDecoration: "line-through" } : {}}
          >
            {props.price} $
          </span>
        </div>
      </div>
      {}
      {/*Buttons: Contacter, Details  (Links to pages)*/}

      <div className={"car_card_buttons"}>
        <ButtonCta
          className={"car_card_cta cta--white"}
          inner={"Details"}
          type={"carCard"}
          to={"/parc-auto/details/" + props.id}
          state={{
            id: props.id,
            make: props.make,
            thumbnail: props.thumbnail,
            model: props.model,
            year: props.year,
            km: props.km,
            price: props.price,
            offer: props.offer,
            vo: props.vo_number,
            gearbox: props.gearbox,
            din: props.din_power,
            fiscalPower: props.fiscal_power,
            color: props.color,
            doors: props.doors,
            seats: props.seats,
            energy: props.energy,
            currentPage: props.currentPage,
            lastlocation: props.lastlocation,
          }}
        />

        <ButtonCta
          className={"car_card_cta cta--red"}
          style={{ border: "none" }}
          inner="Contacter"
          onClick={() => handleSubject(props.model)}
          type="link"
          to={"/contact"}
          state={{
            make: props.make,
            mdoel: props.model,
            id: props.id,
            year: props.year
          }}
        />
      </div>
    </figure>
  );
};

export default CarCard;

CarCard.propTypes = {
  id: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  km: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  offer: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
};
