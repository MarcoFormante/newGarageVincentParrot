import React, { useEffect, useInsertionEffect, useState } from "react";
import axios from "../../../../api/axios";
import toast, { Toaster } from "react-hot-toast";
import Modal from "../../../Modal/Modal";
import CheckToken from "../../../../helpers/CheckToken";

const ListAllAccounts = ({ newUser }) => {
  const [accountList, setAccountList] = useState([]);
  const [accountTarget, setAccountTarget] = useState({});
  const [modalToggle, setModalToggle] = useState(false);

  const notifySuccess = (text) => toast.success(text);
  const notifyError = (text) => toast.error(text);

    useEffect(() => {

            axios.post("user/all").then((response) => {
              console.log(response);
        if (response.data.status === 1) {
          setAccountList([...response.data.users]);
        } else {
          notifyError("Erreur: impossible de recuperer les comptes");
        }
      });
    }, []);
  

  function deleteUser(id) {
          axios
            .delete(`user/delete/${id}`)
            .then((response) => {
              if (response.data.status === 1) {
                notifySuccess(response.data.message);
                setAccountList([
                  ...accountList.filter((user) => user.id !== id),
                ]);
                setModalToggle(false);
                setAccountTarget({});
              } else {
                notifyError(
                  "Erreur: un problème est survenu, impossible de supprimer ce compte,rententez!"
                );
              }
            });
    }
  

  useEffect(() => {
    setAccountList((prev) => [...prev, newUser]);
  }, [newUser]);

  return (
    <div className="accountList mar-auto">
      <Toaster />
      {modalToggle === true && (
        <Modal
          type={"alert"}
          title={"Vous êtes sûr de vouloir supprimer ce compte?"}
          onExit={() => {
            setModalToggle(false);
            setAccountTarget({});
          }}
          onClick={() => deleteUser(accountTarget.id)}
        >
          <b>{accountTarget.email}</b>
        </Modal>
      )}

      <table
        className={"table_simple"}
        style={{ borderCollapse: "collapse", textAlign: "center" }}
      >
        <thead>
          <tr>
            <th>Index</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {accountList.map((user, index) => (
            <tr
              key={"user_account_" + index}
              style={{ border: "1px solid black" }}
            >
              <td>{index}</td>
              <td>{user.email}</td>
              <td
                className="delete-icon_container"
                onClick={() => {
                  setAccountTarget({ id: user.id, email: user.email });
                  setModalToggle(true);
                }}
              >
                <span className="delete-icon"></span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ListAllAccounts;
