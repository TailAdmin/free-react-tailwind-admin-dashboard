import { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { calandardata } from './calendardata';

const SumitCalendar = () => {
  type insertedEvent = {
    time: string;
    name: string;
    details: string;
  };
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(today);
  const [filteredData, setFilteredData] = useState<insertedEvent[]>([]);
  const [noMeeting, setNoMeeting] = useState<boolean>(false);

  useEffect(() => {
    function filterDataByDate(dateToFilter: Date): insertedEvent[] {
      const filtered = calandardata.find(
        (calendarDate) =>
          calendarDate.date.toDateString() === dateToFilter.toDateString(),
      )?.events;
      return filtered || [];
    }

    const desiredDate = selectedDay || today;
    const filteredEvents = filterDataByDate(desiredDate);

    if (filteredEvents.length === 0) {
      setNoMeeting(true);
    } else {
      setNoMeeting(false);
    }

    setFilteredData(filteredEvents);
  }, [selectedDay]);

  return (
    <>
      <Breadcrumb pageName="SK_Calendar" />
      <div className="flex justify-center">
        <DayPicker
          mode="single"
          required
          selected={selectedDay}
          onSelect={setSelectedDay}
          className="p-4 shadow-lg shadow-primary rounded-xl bg-[#f2eff3] text-[18px]"
        />
      </div>
      {noMeeting ? (
        <div className="text-[#090909] font-bold flex justify-center mt-6 md:mt-8">
          No Meeting Today! Just Enjoy😊
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 my-20">
          {filteredData.map((item, index) => (
            <div
              key={index}
              className="flex items-start md:items-center gap-4 shadow-lg rounded-xl p-2 md:p-8 justify-between"
            >
              <div>
                <div className="font-semibold">{item.time}</div>
                <div className="font-bold text-xl mt-2 mb-1 text-[#484848]">
                  {item.name}
                </div>
                <div className="font-bold text-[#a5a4a4]">{item.details}</div>
              </div>
              <div className="bg-[#f949ee] text-[white] md:text-lg font-semibold rounded-full p-4 md:p-6">
                HA
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SumitCalendar;
