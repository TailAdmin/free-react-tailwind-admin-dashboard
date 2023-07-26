import React, { useState } from "react";
import dataJSON from '../../public/data.json';



export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const fields=Object.keys(Object.values(dataJSON)[0]).filter((item:any)=>!(item.startsWith("delta_")));
  
  const [formState, setFormState] = useState(
    defaultValue || {
      id: "",
      para: "price",
        criterion: "0",
        value: "",
        type: "0",

    }
  );
  const [errors, setErrors] = useState<string[]>([]);

  const validateForm = () => {
    if (formState.id && formState.value) {
      setErrors([]);
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        console.log(key);
        console.log(value);
        if (!value) {
          errorFields.push(key=="id"?"Bond ID":key);
        }
        else{
        if (key=='id'){
          if (!(Object.keys(dataJSON).includes(value)||value=="ALL")){
            errorFields.push("INVALID_ID_"+value)
          }
        }
      }
      }
      console.log(errorFields);
      setErrors(errorFields);
      return false;
    }
  };

  const handleChange = (e) => {
    console.log(formState.criterion);
    console.log(e.target.name);
    console.log(e.target.name=="para"&&e.target.value=='rating');
    console.log(formState.criterion>1&&formState.criterion<4);
    console.log(e.target.value);
    console.log(e.target.name=="para"&&e.target.value=='rating'&&formState.criterion>1&&formState.criterion<4);
    if (e.target.name=="para"&&e.target.value=='rating'&&formState.criterion>1&&formState.criterion<4) {setFormState({ ...formState, ["criterion"]: 0 });}
    
    console.log(formState.criterion);
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };

  return (
    <div
      className="modal-container fixed z-50 flex top-25 bottom-5 "
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
    
      <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
      <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
        <div className="w-full flex justify-end">
      <strong className="text-xl align-center cursor-pointer "
      onClick={closeModal}
      >&times;</strong>
      </div>
        <form>
        <div className="grid grid-cols-3 gap-5 justify-normal">
          <div className="form-group w-full col-span-3">
            <label  className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="id">Bond ID (Input "ALL" to track all bonds with paramaters below)</label>
            <input className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          name="id" onChange={handleChange} value={formState.id} />
          </div>
          
          <div className="form-group ">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="para">Parameter</label>
            <div className="relative z-20 w-full rounded border border-stroke p-1.5 pr-8 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                  <div className="flex flex-wrap items-center"></div>
                  <span className="m-1.5 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray py-1.5 px-2.5 text-sm font-medium dark:border-strokedark dark:bg-white/30">
                      {formState.para}
                      
                            
                    </span>
                    <select
                    className="absolute top-0 left-0 z-20 h-full w-full bg-transparent opacity-0"
                        
                    name="para"
                    onChange={handleChange}
                    value={formState.para}
                    >
                      {fields.map((item:any,idx:number)=>(<option key={idx} value={item}>{item}</option>))}
                    
                    </select>
                    <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                            <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <g opacity="0.8">
                                <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                fill="#637381"
                                ></path>
                            </g>
                            </svg>
                        </span>
                    </div>
            
            </div>
            
          
          
          <div className="form-group">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="criterion">Criterion</label>
            <div className="relative z-20 w-full rounded border border-stroke p-1.5 pr-8 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                  <div className="flex flex-wrap items-center"></div>
                  <span className="m-1.5 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray py-1.5 px-2.5 text-sm font-medium dark:border-strokedark dark:bg-white/30">
                      {formState.criterion==0?"goes down by":formState.criterion==1?"goes up by":formState.criterion==2?"is smaller than":formState.criterion==3?"is greater than":"is equal to"}
                    </span>
            <select
            className="absolute top-0 left-0 z-20 h-full w-full bg-transparent opacity-0"
              name="criterion"
              onChange={handleChange}
              value={formState.criterion}
            >
              <option value="0">goes down by</option>
              <option value="1">goes up by</option>
              {!(formState.para=='rating')&&<option value="2">is smaller than</option>}
              {!(formState.para=='rating')&&<option value="3">is greater than</option>}
              
              <option value="4">is equal to</option>
            </select>
            <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                            <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <g opacity="0.8">
                                <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                fill="#637381"
                                ></path>
                            </g>
                            </svg>
                        </span>
                        </div>
          </div>
            <div className="form-group w-full">
            <label  className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="value">Value to give Alert</label>
            <input className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                           name="value" onChange={handleChange} value={formState.value} />
          </div>
          
          <div className="form-group">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="type">Alert Type</label>
            <div className="relative z-20 w-full rounded border border-stroke p-1.5 pr-8 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                  <div className="flex flex-wrap items-center"></div>
                  <span className={`${formState.type==0?"bg-[#04b20c]":formState.type==1?"bg-[#eab90f]":"bg-[#e13f32]"} m-1.5 flex items-center justify-center rounded border-[.5px] border-stroke py-1.5 px-2.5 text-white font-medium dark:border-strokedark`}>
                      {formState.type==0?"Info":formState.type==1?"Warning":"Alert"}
                      
                            
                    </span>
            <select
            className="absolute top-0 left-0 z-20 h-full w-full bg-transparent opacity-0"
              name="type"
              onChange={handleChange}
              value={formState.type}
            >
              <option value="0">Info</option>
              <option value="1">Warning</option>
              <option value="2">Alert</option>
            </select>
            <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                            <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <g opacity="0.8">
                                <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                fill="#637381"
                                ></path>
                            </g>
                            </svg>
                        </span>
                    </div>
                </div>
          </div>
          {errors.filter((item:string)=>(item.startsWith("INVALID_ID"))).length>0 && <><br/><div className="error">{errors.filter((item:string)=>(item.startsWith("INVALID_ID")))[0].replace("INVALID_ID_","")} is not a valid bond</div></>}
          {errors.filter((item:string)=>!(item.startsWith("INVALID_ID"))).length>0 && (<div className="error">Please input {errors.filter((item:string)=>!(item.startsWith("INVALID_ID"))).join(", ")}</div>)}
          
          
          <br></br>
          <button className="btn flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                      type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
      </div>
    </div>
    
  );
};