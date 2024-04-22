import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

import { updateUser } from '../../components/BACKEND-hookes/userapi';
import SelectRole from '../Forms/SelectGroup/RoleSelect';
import { useState } from 'react';

const UserFormUpdate = (props) => {
  const [formData, setFormData] = useState({
    id: props.id,
    nom: props.nom,
    prenom: props.prenom,
    email: props.email,
    password: props.password
  });
  const [selectedRole, setSelectedRole] = useState('USER');
  const { setShowUpdateForm } = props;  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleRoleChange = (role) => {

    setSelectedRole(role);
 
  };
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      await updateUser(formData.id, formData.nom, formData.prenom,selectedRole, formData.email, formData.password);
      
    } catch (error) {
      console.error('Error updating user:', error);
    }
    setShowUpdateForm(false);
  };

  const handleCancel = () => {
  
    setShowUpdateForm(false);
 };

  return (
    <div>
      <Breadcrumb pageName="Update-User" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">User form</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">nom</label>
                    <input
                      type="text"
                      name="nom"
                      placeholder="Enter user name"
                      value={formData.nom}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">prenom</label>
                    <input
                      type="text"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">email <span className="text-meta-1">*</span></label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter user Email"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                 <div className="flex flex-wrap">
                    <div className="mb-4.5 flex-grow"> {/* Allow the input to grow */}
                        <label className="mb-2.5 block text-black dark:text-white">password</label>
                        <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter Password"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div className="mb-4.5 ml-4"> {/* Add margin to separate from the input */}
                    <SelectRole onRoleChange={handleRoleChange} />
                    </div>
                    </div>
                <div className="flex justify-between">
                  <button type="submit" className="w-1/2 rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">Update user</button>
                  <button type="button" style={{ backgroundColor: 'red' }} className="w-1/2 rounded p-3 font-medium text-gray hover:bg-opacity-90" onClick={handleCancel}>Cancel</button>

                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFormUpdate;
