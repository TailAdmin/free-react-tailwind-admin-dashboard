import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { useState } from 'react';
import EventSelect from '../../components/Forms/SelectGroup/EventSelect';
import TopicSelect from '../../components/Forms/SelectGroup/TopicSelect';
import { createPrograms } from '../../components/BACKEND-hookes/Programsapi';
  
import DateTimePickerSection from '../../components/Forms/DatePicker/DateTimePickerSection';
const ProgramsForm = () => {
  
const [speakers, setSpeakers] = useState([]);
const [newSpeaker, setNewSpeaker] = useState('');
const [images, setImages] = useState([]);
const [details, setDetails] = useState('');
const [selectedEvent, setSelectedEvent] = useState<string>('');
const [selectedTopic, setSelectedTopic] = useState<string>('');
const [topics, setTopics] = useState<string[]>([]);
const [dateTimePickerSections, setDateTimePickerSections] = useState([{ timeBegin: null, timeEnd: null }]);
const [dateBegin, setDateBegin] = useState(null);
const [dateEnd, setDateEnd] = useState(null);

const handleDateBeginChange = (newDateBegin) => {
 
  setDateBegin(newDateBegin);
};

const handleDateEndChange = (newDateEnd) => {
  setDateEnd(newDateEnd);
};
  const handleTopicChange = (topic: string) => {
    setSelectedTopic(topic);
  };

const handleEventChange = (event: string) => {
  setSelectedEvent(event);
};

  const addDateTimePickerSection = () => {
    setDateTimePickerSections([...dateTimePickerSections, { timeBegin: null, timeEnd: null }]);
  };
  
  const removeDateTimePickerSection = (index) => {
    const updatedSections = [...dateTimePickerSections];
    updatedSections.splice(index, 1);
    setDateTimePickerSections(updatedSections);
  };

const addSpeaker = () => {
  if (newSpeaker.trim() !== '') {
    setSpeakers([...speakers, newSpeaker.trim()]);
    setNewSpeaker('');
  }
};
const addTopic = (topic: string) => {
  if (topic.trim() !== '') {
    setTopics([...topics, topic]);
  }
};

const removeTopic = (index: number) => {
  const updatedTopics = [...topics];
  updatedTopics.splice(index, 1);
  setTopics(updatedTopics);
};
  const handleInputChange = (event) => {
    setNewSpeaker(event.target.value);
  };
  const removeSpeaker = (index) => {
    const updatedSpeakers = [...speakers];
    updatedSpeakers.splice(index, 1);
    setSpeakers(updatedSpeakers);
  };
  

  const handleFileChange = (event) => {
    const fileList = event.target.files;
    const newImages = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const reader = new FileReader();
      reader.onload = (e) => {
        newImages.push(e.target.result);
        if (newImages.length === fileList.length) {
          setImages([...images, ...newImages]);
        }
        console.log(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const uploadProgram = async () => {
 
    try {
      // Prepare event data
      const eventData = {
        schedules: dateTimePickerSections.map((section) => {
          return {
            start: `${dateBegin.toISOString().slice(0, 10)}T${section.timeBegin.toISOString().slice(11, 16)}:00`,
            end: `${dateEnd.toISOString().slice(0, 10)}T${section.timeEnd.toISOString().slice(11, 16)}:00`
          };
        }),
        speakers: speakers,
        event: {
          id: selectedEvent
        },
        topics: topics, 
        images: images,
        details: details 
      };

      console.log('Event Data:', eventData);
      const success = await createPrograms(eventData);
      if (success) {
       
        setNewSpeaker('');
        setImages([]);
        setDetails('');

      }
    } catch (error) {
      // Handle error
      console.error('Error uploading program:', error);
    }
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Programs" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Programs form
              </h3>
            </div>
            <form >
              <div className="p-6.5">
              {dateTimePickerSections.map((section, index) => (
                  <DateTimePickerSection
                  dateBegin={dateBegin}
                  setDateBegin={handleDateBeginChange}
                  dateEnd={dateEnd}
                  setDateEnd={handleDateEndChange}
                    key={index}
                    timeBegin={section.timeBegin}
                    setTimeBegin={(value) => {
                      const updatedSections = [...dateTimePickerSections];
                      updatedSections[index].timeBegin = value;
                      setDateTimePickerSections(updatedSections); 
                    }}
                    timeEnd={section.timeEnd}
                    setTimeEnd={(value) => {
                      const updatedSections = [...dateTimePickerSections];
                      updatedSections[index].timeEnd = value;
                      setDateTimePickerSections(updatedSections);
                    }}
                    
                    onRemove={() => removeDateTimePickerSection(index)}
                  />
                ))}
                
    
                <div className="flex justify-center">
  <button
    type="button"
    onClick={addDateTimePickerSection}
    className="mt-6 mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    DateTimePickerSection
  </button>
</div>
               <EventSelect onEventChange={handleEventChange} />
          
                
              <div className="mb-4.5">
      
        <TopicSelect onTopicChange={handleTopicChange}/>
        <button
       
          onClick={(e) => {
            e.preventDefault(); // Prevent default form submission behavior
            addTopic(selectedTopic) // Call the uploadProgram function
          }}
          className="ml-2 px-3 py-1 bg-primary text-white rounded hover:bg-primary-dark focus:outline-none focus:bg-primary-dark"
        >
          Add Topic
        </button>
      
      {/* Display the list of topics */}
      <div className="flex flex-wrap mt-3">
        {topics.map((topic, index) => (
          <div
            key={index}
            className="rounded-full border border-blue-500 bg-blue-500 text-white font-bold px-3 py-1.5 mr-2 mb-2 flex items-center"

          >
            <span className="mr-1">{topic}</span>
            <button
              type="button"
              onClick={() => removeTopic(index)}

              className="ml-1 text-sm font-bold outline-none focus:outline-none hover:text-red-500"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
                <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        {' '}
        Speakers{' '}
      </label>
      <div className="relative z-20 bg-transparent dark:bg-form-input flex flex-wrap">
        <input
          type="text"
          value={newSpeaker}
          onChange={handleInputChange}
          
          className="relative z-20 flex-grow rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          placeholder="Enter speaker name"
        />
        <button
       
          onClick={(e) => {
            e.preventDefault(); // Prevent default form submission behavior
            addSpeaker(); // Call the uploadProgram function
          }}
          className="ml-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark focus:outline-none focus:bg-primary-dark"
        >
          Add
        </button>
      </div>
      {/* Display the list of speakers */}
      <div className="flex flex-wrap mt-3">
        {speakers.map((speaker, index) => (
          <div
            key={index}
            className="rounded-full border border-green-500 bg-green-500 text-white font-bold px-3 py-1.5 mr-2 mb-2 flex items-center"
          >
            <span className="mr-1">{speaker}</span>
            <button
              type="button"
              onClick={() => removeSpeaker(index)}
              className="ml-1 text-sm font-bold outline-none focus:outline-none hover:text-red-500"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>

                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                  details
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Type your message"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                  
                </div>
                <label className="mb-2.5 block text-black dark:text-white">
                    Program image
                  </label>
                 <div
                    id="FileUpload"
                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                  >
                    
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                     onChange={handleFileChange}
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                    />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                            fill="#3C50E0"
                          />
                        </svg>
                      </span>
                      <p>
                        <span className="text-primary">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                      <p>(max, 800 X 800px)</p>
                    </div>
                    
                    
                  </div>
                  <div className="flex flex-wrap gap-2">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`Uploaded ${index + 1}`}
                className="rounded border border-stroke bg-white dark:border-strokedark"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 m-1 p-1 text-sm text-red-500 bg-white border border-red-500 rounded-full focus:outline-none"
              >
                X
              </button>
            </div>
          ))}
        </div>

                <button type="submit"   onClick={(e) => {
    e.preventDefault(); // Prevent default form submission behavior
    uploadProgram(); // Call the uploadProgram function
  }} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Upload Programe 
                </button>
              </div>
            </form>
          </div>
        </div>

       
        
          </div>
    </DefaultLayout>
  );
};

export default ProgramsForm;
