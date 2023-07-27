
import Breadcrumb from '../components/Breadcrumb';
import userThree from '../images/user/user-03.png';
import generateAlerts from '../hooks/generateAlerts';
import { Table } from "../components/TableSettings";
import { Modal } from "../components/ModalSettings";
import React, { useState,useEffect } from "react";
const Settings = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState(localStorage.getItem("alertSettings")?JSON.parse(localStorage.getItem("alertSettings")):[]);
 
  useEffect(() => {
    // storing input name
    localStorage.setItem("alertSettings", JSON.stringify(rows));
  }, [rows]);
  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };


  const [file, setFile] = useState();
  const fileReader = new FileReader();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (file) {
      fileReader.onload = function (event) {
        const csvOutput = event.target.result;
        // Process and use the csvOutput data as needed
        console.log(csvOutput);

        // Save the CSV data to local storage
        localStorage.setItem("csvData", csvOutput);
      };

      fileReader.readAsText(file);
    }
  };


  return (
    
    <>
     <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <button className="btn inline-flex items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
           onClick={() => setModalOpen(true)} >
        Add New Alert
      </button>
      <br />
      <br />
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      <br />
      <button className="btn inline-flex items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
           onClick={ generateAlerts} >
        Show Alerts
      </button>
      {modalOpen && (
        <div className="modal-container bg-white fixed z-40 flex top-0 w-full content-center items-center"
        onclick={() =>setModalOpen(false)}>
        <Modal 
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
        </div>
      )}
    </div>
      <div className="mx-auto max-w-270">
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Your Photo
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-14 w-14 rounded-full">
                      <img src={userThree} alt="User" />
                    </div>
                    <div>
                      <span className="mb-1.5 text-black dark:text-white">
                        Edit your photo
                      </span>
                      <span className="flex gap-2.5">
                        <button className="text-sm hover:text-primary">
                          Delete
                        </button>
                        <button className="text-sm hover:text-primary">
                          Update
                        </button>
                      </span>
                    </div>
                  </div>

                  <div
                    id="FileUpload"
                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                  >
                    <input
                        type="file"
                        accept=".csv"
                        className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                        onChange={handleFileChange}
                      />
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <span className="text-primary">
                          {file ? file.name : "Click to upload"}
                        </span>
                        <p>CSV files only</p>
                        {/* You can show more information about the selected file if needed */}
                      </div>
                    </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-70"
                      type="button"
                      onClick={handleFileUpload}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default Settings;
