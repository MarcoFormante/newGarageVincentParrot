import React, { useEffect, useState } from "react";
import Modal from "../../../Modal/Modal";
import axios from "../../../../api/axios";
import PageTitle from "../../../PageTitle/PageTitle";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ServicesHandler = () => {
  const role = useSelector(state => state.role.value)
  const [services, setServices] = useState([]);
  const [modalToggle, setModalToggle] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalInptValue, setModalInptValue] = useState("");
  const [serviceId, setServiceId] = useState(null);
  const [serviceIndex, setServiceIndex] = useState(null);
  const [Type, setType] = useState("");
  const [newService, setNewService] = useState("");
  const navigate = useNavigate()
  const notifySuccess = (text) => toast.success(text);
  const notifyError = (text) => toast.error(text);

  useEffect(() => {
    if (role && role === "admin") {
      axios
      .get("service/all")
      .then((response) => {
        if (response.data.status === 1) {
          if (response.data.services) {
            setServices(response.data.services);
          } else {
            notifyError("Erreur: Impossible recevoir les données");
          }
        } else {
          notifyError("Erreur: Impossible recevoir les données");
        }
      })
      .catch((error) =>
      notifyError("Erreur: Impossible recevoir les données"))
    } else {
      navigate("/")
    }
   
  }, []);

  function handleModal(title, inptValue, id, index, editType) {
    setModalToggle(true);
    setModalTitle(title);
    setModalInptValue(inptValue);
    setServiceId(id);
    setServiceIndex(index);
    setType(editType);
  }

  function resetValues() {
    setModalToggle(false);
    setModalTitle("");
    setModalInptValue("");
    setServiceId(null);
    setServiceIndex(null);
    setType(null);
    setNewService("");
  }

  function updateService() {
    if (Type === "update" || Type === "delete") {
      const formData = new FormData();
      if (Type && Type === "update") {
        formData.append("editType", "update");
        formData.append("value", modalInptValue.trim());
      } else if (Type && Type === "delete") {
        formData.append("editType", "delete");
        formData.append("value", "null");
      }

      formData.append("id", serviceId);

      axios
        .post("service/update", formData, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          if (response.data.status === 1) {
            if (Type === "update") {
              services[serviceIndex].service = modalInptValue;
              setServices([...services]);
            } else if (Type === "delete") {
              let newServices = services.filter((s, i) => s.id !== serviceId);
              setServices([...newServices]);
            }
            notifySuccess(response.data.message);
          } else {
            notifyError(
              "Erreur pendant la modification du service, rententez. Status = 0"
            );
          }
        })
        .finally(resetValues());
    } else {
      notifyError(
        "Erreur : Impossible de modifier le service sans Valeur ou ID Service"
      );
    }
  }

  function addNewService() {
    const servicesPath = "service/new";
    if (newService) {
      const formData = new FormData();
      formData.append("value", newService);
      axios
        .post(servicesPath, formData, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          if (response.data.status === 1) {
            setServices((prev) => [
              ...prev,
              {
                id: response.data.lastId,
                service: newService,
              },
            ]);
            notifySuccess(response.data.message);
            setType(null);
            setNewService("");
          } else {
            notifyError("Erreur: Impossible ajouter un nouveau service");
          }
        })
        .finally(resetValues());
    } else {
      notifyError("Ce champs peut pas etre vide");
    }
  }

  function handleNewService(type) {
    setType(type);
    addNewService();
  }

  return (
    <div>
      <Toaster />
        {modalToggle && (
            <Modal
            title={
                Type === "update" ? modalTitle : "Voulez-vous supprimer ce service?"
            }
            type={Type === "update" ? "input" : "alert"}
            buttonText={"Sauvegarder"}
            onExit={() => resetValues()}
            onClick={() => updateService()}
            >
            <div className="container--center--column gap-20">
                <label htmlFor="serviceInpt">
                {Type === "update" ? "Modifier" : "Service à supprimer"}
                </label>
                <textarea
                disabled={Type === "delete"}
                style={{
                    padding: 10,
                    width: 300,
                    height: "fit-content",
                    maxHeight: 100,
                }}
                type="text"
                id="serviceInpt"
                value={modalInptValue}
                onChange={(e) => setModalInptValue(e.target.value)}
                />
            </div>
            </Modal>
        )}

      <PageTitle pageTitle={"Gestion des services"} />
      <div className="container--pad-top">
              <div className="input_center_handler container--center--column gap-20 mar-bot-20">
                  
          <label htmlFor="newService" className="text-bold">
            Nouveau service :
          </label>
          <textarea
              placeholder="Ecrir ici le nouveau service"
              value={newService}
              id="newService"
              onChange={(e) => setNewService(e.target.value)}
              style={{
              minWidth: 300,
              paddingLeft: 5,
              minHeight: 80,
              paddingTop: 4,
              }}
          />
            <button
                className="cta cta--red"
                onClick={() => handleNewService("add")}
            >
            Ajoute
            </button>
                  
              </div>
              
        <table className="table_servicesHandler">
          <thead>
            <tr>
              <th>Service</th>
              <th>Edit</th>
              <th>Effacer</th>
            </tr>
          </thead>
          <tbody>
            {services &&
              services.map((service, index) => (
                <tr key={`service_row${service.id}`}>
                  <td>{service.service}</td>
                  <td>
                    <span
                      className="edit-icon"
                      onClick={() =>handleModal("Service",service.service,service.id,index,"update")
                      }
                    ></span>
                  </td>
                  <td>
                    <span
                      className="delete-icon"
                      onClick={() =>handleModal("Service",service.service,service.id,index,"delete")
                      }
                    ></span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServicesHandler;
