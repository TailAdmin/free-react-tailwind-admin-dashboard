import React from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const Faisal_calendar = () => {
  const [selected, setSelected] = React.useState<Date>();

  const activitiesByNumber = [
    {
      number: 25,
      data: [
        '10:00am - 11:00am',
        'Helen armstrong',
        'Chinese herbal medicine #1',
      ],
    },
    {
      number: 26,
      data: [
        '1:30pm - 3:00pm',
        'Julie falcon',
        'Acu-Facial with staff member #1',
      ],
    },
    {
      number: 27,
      data: [
        '11:00am - 2:00pm',
        'Faisak irfan',
        'Movie Night',
      ],
    },
    {
      number: 28,
      data: [
        '10:00am - 11:00am',
        'Dennis stewart',
        'Chess',
      ],
    },
    {
      number: 29,
      data: [
        '12:00pm - 1:00pm',
        'Jain san',
        'Meeting',
      ],
    },
    {
      number: 30,
      data: [
        '10:00am - 2:00pm',
        'Zyan de',
        'Art Exhibition',
      ],
    },
  ];

  let formattedDate = '';
  let footer = <p>Please pick a day.</p>;

  if (selected) {
    formattedDate = selected.getDate().toString();

    // Find the activities for the selected date
    const selectedActivities = activitiesByNumber.find(
      (item) => item.number === parseInt(formattedDate)
    );

    if (selectedActivities) {
      footer = (
        <div className="bg-white rounded-lg shadow-md p-4 max-w-screen-xl mx-auto">
          <p className="text-lg font-semibold">Activities for {format(selected, 'PP')}</p>
          <h2 className="text-xl font-semibold">{selectedActivities.data[0]}</h2>
          <p className="text-gray-600">{selectedActivities.data[1]}</p>
          <p className="text-gray-600">{selectedActivities.data[2]}</p>
        </div>
      );
    } else {
      footer = <p>No activities are listed on {format(selected, 'PP')}</p>;
    }
  }

  return (
    <div>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        footer={footer}
      />
    </div>
  );
};

export default Faisal_calendar;
