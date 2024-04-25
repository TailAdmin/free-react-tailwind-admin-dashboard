import { useState } from 'react';
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import { updateEvent } from '../../components/BACKEND-hookes/Eventapi';// Update the path accordingly
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateEVent = (props) => {
  const [eventData, setEventData] = useState({
    id: props.id,
    title: props.title,
    description:  props.description,
    dateTime: props.dateTime,
    type: props.type,
  });
  const { setShowUpdateForm } = props;  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleTypeChange = (type: string) => {
    setEventData(prevData => ({
      ...prevData,
      type: type
    }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  
        updateEvent(eventData);
     
        toast.success('Event updated successfully!');
    setShowUpdateForm(false);
   
  };
  const handleCancel = () => {
  
    setShowUpdateForm(false);
 };


  return (
    
  
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Event update form
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={eventData.title}
                      onChange={handleChange}
                      placeholder="Enter event title"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Date
                    </label>
                    <input
                      type="datetime-local"
                      name="dateTime"
                      value={eventData.dateTime}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <SelectGroupOne onSelectType={handleTypeChange} />
                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Description
                  </label>
                  <textarea
                    rows={6}
                    name="description"
                    value={eventData.description}
                    onChange={handleChange}
                    placeholder="Type your message"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>

                <div className="flex justify-between">
  <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
    Upload Event
  </button>
  <button type="button" style={{ backgroundColor: 'red' }} className="w-1/2 rounded p-3 font-medium text-gray hover:bg-opacity-90" onClick={handleCancel}>Cancel</button>
</div>

                <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              />
              </div>
            </form>
          </div>
        </div>
      </div>
   
  );
};

export default UpdateEVent;
