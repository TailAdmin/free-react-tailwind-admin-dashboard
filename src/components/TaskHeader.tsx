import { useEffect, useRef, useState } from 'react';
import userSeven from '../images/user/user-07.png';
import userEight from '../images/user/user-08.png';
import userNine from '../images/user/user-09.png';
import userTen from '../images/user/user-10.png';

const TaskHeader = () => {
  const [popupOpen, setPopupOpen] = useState(false);

  const trigger = useRef<any>(null);
  const popup = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!popup.current) return;
      if (
        !popupOpen ||
        popup.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setPopupOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!popupOpen || keyCode !== 27) return;
      setPopupOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="flex flex-col gap-y-4 rounded-sm border border-stroke bg-white p-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="pl-2 text-title-lg font-semibold text-black dark:text-white">
          Tasks
        </h3>
      </div>
      <div className="flex flex-col gap-4 2xsm:flex-row 2xsm:items-center">
        <div className="flex -space-x-2">
          <button className="h-9 w-9 rounded-full border-2 border-white dark:border-boxdark">
            <img src={userSeven} alt="User" />
          </button>
          <button className="h-9 w-9 rounded-full border-2 border-white dark:border-boxdark">
            <img src={userEight} alt="User" />
          </button>
          <button className="h-9 w-9 rounded-full border-2 border-white dark:border-boxdark">
            <img src={userNine} alt="User" />
          </button>
          <button className="h-9 w-9 rounded-full border-2 border-white dark:border-boxdark">
            <img src={userTen} alt="User" />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-stroke bg-white text-primary dark:border-strokedark dark:bg-[#4f5e77] dark:text-white">
            <svg
              className="fill-current"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 7H9V1C9 0.4 8.6 0 8 0C7.4 0 7 0.4 7 1V7H1C0.4 7 0 7.4 0 8C0 8.6 0.4 9 1 9H7V15C7 15.6 7.4 16 8 16C8.6 16 9 15.6 9 15V9H15C15.6 9 16 8.6 16 8C16 7.4 15.6 7 15 7Z"
                fill=""
              />
            </svg>
          </button>
        </div>

        <div>
          <button
            ref={trigger}
            onClick={() => setPopupOpen(!popupOpen)}
            className="flex items-center gap-2 rounded bg-primary py-2 px-4.5 font-medium text-white hover:bg-opacity-80"
          >
            <svg
              className="fill-current"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 7H9V1C9 0.4 8.6 0 8 0C7.4 0 7 0.4 7 1V7H1C0.4 7 0 7.4 0 8C0 8.6 0.4 9 1 9H7V15C7 15.6 7.4 16 8 16C8.6 16 9 15.6 9 15V9H15C15.6 9 16 8.6 16 8C16 7.4 15.6 7 15 7Z"
                fill=""
              />
            </svg>
            Add task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskHeader;
