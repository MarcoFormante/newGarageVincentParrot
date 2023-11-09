import React, { useEffect, useState } from "react";
import PageTitle from "../../../PageTitle/PageTitle";
import FormElement from "../../../FormElement/FormElement";
import DetailsInputs from "./DetailsInputs";
import EquipmentsInputs from "./EquipmentsInputs";
import NewCarGallery from "./NewCarGallery";
import axios from "../../../../api/axios";
import Resizer from "react-image-file-resizer";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../../Loading/Loading";


const NewCarPage = () => {
  const [thumb, setThumb] = useState(null);
  const [formValues, setFormValues] = useState({
    detailValues: {},
    equipmentValues: [],
    thumbnail: "",
    gallery: [],
  });
  const [newCarCreated, setNewCarCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const notifySuccess = (text) => toast.success(text);
  const notifyError = (text) => toast.error(text);

  useEffect(() => {
    setFormValues({ ...formValues, thumbnail: thumb });
  }, [thumb]);

  async function handleSubmit(e) {
    e.preventDefault();
    let formIsValid = false;
    let thumbnailIsValid = false;
    let galleryIsValid = false;
    let detailsAreValids = false;

    if (formValues.thumbnail) {
      thumbnailIsValid = true;
    }

    if (formValues.gallery[0]) {
      galleryIsValid = true;
    }

    let detailsCheck = [];
    for (const key in formValues.detailValues) {
      if (formValues.detailValues[key] === "") {
        detailsCheck.push("");
        return notifyError (`La valeur ${key.toUpperCase()} ne peut pas etre vide`);
      } else {
       
        if (+formValues.detailValues[key] < 0) {
          detailsCheck.push("")
          return notifyError("Erreur: Les nombres ne peuvent pas être des valeurs négatives");
        }
        detailsCheck.push("valid");
      }
    }

    if (detailsCheck.every((d) => d === "valid")) {
      detailsAreValids = true;
    }

    formIsValid = detailsAreValids && thumbnailIsValid && galleryIsValid;

    if (formIsValid) {
      setIsLoading(true);
      const resizedThumbnail = await resizeFile(formValues.thumbnail);
      const resizedGallery = await resizeGalleryImages(formValues.gallery);

      if (resizedThumbnail && resizedGallery) {
        const formData = new FormData();
        prepareFormData(formData, resizedGallery, resizedThumbnail);
        axios
          .post("car/new", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization" : "Bearer " + sessionStorage.getItem("token")
            },
          })
          .then((response) => {
            if (response?.data?.status === 1) {
              notifySuccess("Nouvelle voiture ajouté avec succès");
              setNewCarCreated(true);
              setFormValues({ formValues: "" });
            } else if (response?.data?.status === 0) {
              setNewCarCreated(false);
              if (response?.data?.message?.match(/vo_number/)) {
                notifyError("Erreur: le 'numero VO' existe deja");
              } else if (response?.data?.code === "23000") {
                notifyError("Erreur: Cet equipment existe deja");
              } else {
                notifyError(response.data.message);
              }
            } else {
              notifyError(response.data.message);
            }
          })
          .finally((response) => {
            setTimeout(() => {
              setIsLoading(false);
            }, 500);
          });
      }
    } else {
      if (!detailsAreValids) {
        notifyError("Erreur: Les champs 'details du vehicule' sont obligatoires");
      }

      if (!formValues.thumbnail) {
        notifyError("Erreur: Le champ 'photo principale est obligatoires'");
      }

      if (!galleryIsValid) {
        notifyError(
          "Erreur: Ajoutez au moins une image pour le champ 'Gallerie d'images"
        );
      }
    }
  }

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        600,
        400,
        "WEBP",
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        "file",
        246,
        199
      );
    });

  function prepareFormData(formData, gallery, thumbnail) {
    prepareDetailsToFormData(formData);
    prepareEquipmentsToFormData(formData);
    prepareGalleryToFormData(formData, gallery);
    formData.append("thumbnail", thumbnail);
  }

  useEffect(() => {
    if (newCarCreated) {
      setFormValues({
        detailValues: {},
        equipmentValues: [],
        thumbnail: "",
        gallery: [],
      });
      setThumb(null);
      window.scrollTo({
        top: 0,
      });
    }
    return () => {}
  }, [newCarCreated]);



  function prepareDetailsToFormData(formData) {
    for (const key in formValues.detailValues) {
      if (Object.hasOwnProperty.call(formValues.detailValues, key)) {
        const detail = formValues.detailValues[key];
        formData.append("details[]", detail);
      }
    }
  }

  function prepareEquipmentsToFormData(formData) {
    formValues.equipmentValues.forEach((equip) => {
      formData.append("equipments[]", equip);
    });
  }

  function prepareGalleryToFormData(formData, gallery) {
    gallery.forEach((image) => {
      formData.append("gallery[]", image);
    });
  }

  const resizeGalleryImages = async (images) => {
    let a = [];
    try {
      for (let i = 0; i < images.length; i++) {
        a.push(await resizeFile(images[i]));
      }
      return a;
    } catch (error) {
      return;
    }
  };

  return (
    <div>
      <Loading isLoading={isLoading} />
      <Toaster />
      <PageTitle pageTitle={"Nouveau véhicule"} />
      <form
        className="form"
        encType={"multipart/form-data"}
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="new_car inputs_container">
          {/* car img-thumb  */}
          <div className="new_car_img-thumb ">
            <FormElement
              label={{ for: "img-thumb", text: "Choisir la photo principal" }}
              input={{
                type: "file",
                required: true,
                accept: "image/jpeg , image/png",
                name: "img-thumb",
                id: "img-thumb",
                onChange: (e) => setThumb(e.target.files[0]),
              }}
              required={true}
            />
          </div>
          <div className="new_car_img-thumb_display">
            {thumb && (
              <img
                style={{ objectFit: "contain", margin: "auto" }}
                src={URL.createObjectURL(thumb)}
                width={300}
                height={300}
                alt=""
              />
            )}
          </div>
          {/* car details */}
          <div className="new_car_details container--pad-top inputs_container">
            <span className="new_car_details_title">Détails du vehicule</span>
            <div className="row_inputs_container inputs_container">
              <DetailsInputs
                formIsValid={newCarCreated}
                formValues={formValues}
                setFormValues={(values) =>
                  setFormValues({ ...formValues, ...values })
                }
              />
            </div>
          </div>

          {/* car equipments */}
          <div
            className={"new_car_details container--pad-top inputs_container"}
          >
            <span
              className={"new_car_details_title new_car_details_title--black"}
            >
              Equipements
            </span>
            <div className={"new_car_equip_list inputs_container"}>
              <EquipmentsInputs
                formIsValid={newCarCreated}
                formValues={formValues}
                setFormValues={(values) =>
                  setFormValues({ ...formValues, ...values })
                }
              />
            </div>
          </div>

          {/* car gallery */}
          <div
            className={"new_car_details container--pad-top inputs_container"}
          >
            <span className={"new_car_details_title"}>Gallerie images</span>
            <NewCarGallery
              formIsValid={newCarCreated}
              formValues={formValues}
              setFormValues={(values) =>
                setFormValues({ ...formValues, ...values })
              }
            />
          </div>
        </div>
        <input
          className={"cta cta--red mar-bot-20"}
          type="submit"
          onClick={handleSubmit}
          value="Envois"
        />
      </form>
    </div>
  );
};

export default NewCarPage;
