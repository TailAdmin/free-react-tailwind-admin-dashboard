type insertedEvent = {
  time: string;
  name: string;
  details: string;
};

type insertedDate = {
  date: Date;
  events: insertedEvent[];
};

export const calandardata: insertedDate[] = [
  {
    date: new Date('2023-09-25'),
    events: [
      {
        time: '2:00 PM - 3:00 PM',
        name: 'John Doe',
        details: 'Physical Therapy Session - Room A',
      },
      {
        time: '3:30 PM - 4:30 PM',
        name: 'Alice Johnson',
        details: 'Nutrition Consultation - Meeting Room B',
      },

      {
        time: '11:20 AM - 12:11 PM',
        name: 'Amanda Smith',
        details: 'Details for Event 1',
      },
    ],
  },

  {
    date: new Date('2023-09-26'),
    events: [
      {
        time: '10:00 AM - 11:00 AM',
        name: 'Helen Armstrong',
        details: 'Chinease Herbal Medicine With Staff Member and Doctor',
      },
      {
        time: '12:15 AM - 1:15 PM',
        name: 'Julie Falcon',
        details: 'Details for Event 1',
      },
      {
        time: '9:00 AM - 10:00 AM',
        name: 'Bob Smith',
        details: 'Yoga Class - Yoga Studio',
      },
      {
        time: '4:00 PM - 5:00 PM',
        name: 'Michael Davis',
        details: 'Mental Health Counseling - Counseling Center',
      },
      {
        time: '2:30 PM - 3:30 PM',
        name: 'Emily Wilson',
        details: 'Art Therapy Session - Art Studio',
      },
    ],
  },

  {
    date: new Date('2023-09-27'),
    events: [
      {
        time: '11:30 AM - 12:30 PM',
        name: 'Sarah Johnson',
        details: 'Physical Exam - Room C',
      },
    ],
  },
];
