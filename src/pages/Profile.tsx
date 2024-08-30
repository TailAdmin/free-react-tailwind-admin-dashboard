import { Link } from 'react-router-dom';
import ProfilePicture from '../images/user/user-06.png';
import CoverPhoto from '../images/cover/cover-01.png';

const Profile = () => {
  // Sample user data
  const user = {
    name: 'John Doe',
    role: 'Lead Auditor',
    department: 'Audit Department',
    email: 'johndoe@example.com',
    isExpert: true,
  };

  // Sample projects data
  const projects = [
    {
      id: 1,
      name: 'Financial Audit Q1 2024',
      status: 'In Progress',
      deadline: '2024-09-30',
      completedDate: 'N/A',
    },
    {
      id: 2,
      name: 'Compliance Audit 2023',
      status: 'Completed',
      deadline: '2023-07-15',
      completedDate: '2023-07-15',
    },
    {
      id: 3,
      name: 'IT Infrastructure Audit',
      status: 'In Progress',
      deadline: '2024-12-01',
      completedDate: 'N/A',
    },
  ];

  return (
    <div className="profile-page">
      {/* Cover Photo */}
      <div className="relative">
        <img
          src={CoverPhoto}
          alt="Cover"
          className="w-full h-32 object-cover rounded-t-lg" // Reduced the height from 64 to 32
        />
        <label htmlFor="cover-upload" className="absolute bottom-2 right-2">
          <input type="file" id="cover-upload" className="hidden" />
          <button className="bg-primary text-white py-1 px-3 rounded text-sm">
            Edit Cover
          </button>
        </label>
      </div>


      {/* Profile Info */}
      <div className="profile-info bg-white dark:bg-boxdark p-4 rounded-b-lg shadow">
        <div className="relative -mt-10">
          <div className="profile-picture w-24 h-24 mx-auto rounded-full overflow-hidden"> {/* Reduced size */}
            <img src={ProfilePicture} alt="Profile" />
            <label
              htmlFor="profile-upload"
              className="absolute bottom-0 right-0"
            >
              <label htmlFor="profile-upload" className="hidden">
                Upload Profile Picture
              </label>
              <input type="file" id="profile-upload" className="hidden" />
              <button className="bg-primary text-white p-1.5 rounded-full" title="Upload Profile Picture"> {/* Reduced button size */}
                <i className="fas fa-camera text-sm"></i> {/* Smaller icon */}
              </button>
            </label>
          </div>
        </div>
        <div className="text-center mt-3">
          <h2 className="text-2xl font-semibold">{user.name}</h2> {/* Reduced font size */}
          <p className="text-gray-600 text-sm">{user.role} - {user.department}</p> {/* Smaller text */}
          <p className="text-gray-500 text-sm">{user.email}</p> {/* Smaller text */}
        </div>
      </div>


      {/* Projects Section */}
      <div className="projects mt-8">
        <h3 className="text-2xl font-semibold mb-4">Assigned Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white p-6 rounded-lg shadow">
              <h4 className="text-xl font-semibold">{project.name}</h4>
              <p className="text-gray-600">Status: {project.status}</p>
              <p className="text-gray-600">Deadline: {project.deadline}</p>
              <Link to={`/projects/${project.id}`} className="text-primary">
                View Project
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Projects Section */}
      {user.isExpert && (
        <div className="completed-projects mt-8">
          <h3 className="text-2xl font-semibold mb-4">Completed Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects
              .filter((project) => project.status === 'Completed')
              .map((project) => (
                <div key={project.id} className="bg-white p-6 rounded-lg shadow">
                  <h4 className="text-xl font-semibold">{project.name}</h4>
                  <p className="text-gray-600">
                    Completed on: {project.completedDate}
                  </p>
                  <Link to={`/projects/${project.id}`} className="text-primary">
                    View Details
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
