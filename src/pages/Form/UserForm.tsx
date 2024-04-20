import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { createUser } from '../../components/BACKEND-hookes/userapi';
import { useState } from 'react';





const handleSubmit = async () => {

  try {
    
    const createdUser = await createUser(nom ,prenom ,email,password);
    console.log('User created:', createdUser);
   
  } catch (error) {
    // Handle error
  }
};

const [nom, setNom] = useState('');
const [prenom, setPrenom] = useState('');
const [email, setEmail] = useState(''); 
const [password, setPaswword] = useState(''); 

const UserForm = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="User" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
         
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                User form
              </h3>
            </div>
            <form action="#" onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                     nom 
                    </label>
                    <input
                      type="text"
                      placeholder="Enter user name "
                      value={nom}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={e => setNom(e.target.value)} 
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                     prenom
                    </label>
                    <input
                      type="text" 
                      value={prenom}
                      onChange={e => setPrenom(e.target.value)} 
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    email <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)} 
                    placeholder="Enter user Email "
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                   password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPaswword(e.target.value)} 
                    placeholder="enter Password"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>  
                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Create user
                </button>
              </div>
            </form>
          </div>
        </div>

       
        
          </div>
    </DefaultLayout>
  );
};

export default UserForm;
