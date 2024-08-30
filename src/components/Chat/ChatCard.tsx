import { Link } from 'react-router-dom';
import { Expert } from '../../types/expert';
import ExpertOne from '../../images/logo/logo.png';
import ExpertTwo from '../../images/logo/logo.png';
import ExpertThree from '../../images/logo/logo.png';
import ExpertFour from '../../images/logo/logo.png';
import ExpertFive from '../../images/logo/logo.png';

const expertData: Expert[] = [
  {
    avatar: ExpertOne,
    name: 'Devid Heilo',
    specialty: 'Cybersecurity',
    status: 'Available',
    color: '#10B981',
  },
  {
    avatar: ExpertTwo,
    name: 'Henry Fisher',
    specialty: 'Data Privacy',
    status: 'In a meeting',
    color: '#DC3545',
  },
  {
    avatar: ExpertFour,
    name: 'John Doe',
    specialty: 'Compliance',
    status: 'Available',
    color: '#10B981',
  },
  {
    avatar: ExpertFive,
    name: 'Jane Doe',
    specialty: 'Forensics',
    status: 'On a call',
    color: '#FFBA00',
  },
  {
    avatar: ExpertOne,
    name: 'Alice Smith',
    specialty: 'Network Security',
    status: 'Available',
    color: '#10B981',
  },
  {
    avatar: ExpertThree,
    name: 'John White',
    specialty: 'Cloud Security',
    status: 'Busy',
    color: '#FFBA00',
  },
];

const AuditExpertCard = () => {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Audit Experts
      </h4>

      <div>
        {expertData.map((expert, key) => (
          <Link
            to="/"
            className="flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4"
            key={key}
          >
            <div className="relative h-14 w-14 rounded-full">
              <img src={expert.avatar} alt="Expert" />
              <span
                className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white"
                style={{ backgroundColor: expert.color }}
              ></span>
            </div>

            <div className="flex flex-1 items-center justify-between">
              <div>
                <h5 className="font-medium text-black dark:text-white">
                  {expert.name}
                </h5>
                <p>
                  <span className="text-sm text-black dark:text-white">
                    {expert.specialty}
                  </span>
                  <span className="text-xs"> - {expert.status}</span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AuditExpertCard;
