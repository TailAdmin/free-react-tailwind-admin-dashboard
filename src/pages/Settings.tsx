import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import userThree from '../images/user/user-03.png';

const Settings = () => {
  return (
    <div className="mx-auto max-w-4xl">
      <Breadcrumb pageName="Settings" />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Personal Information */}
        <div className="col-span-2 bg-white dark:bg-boxdark border border-stroke dark:border-strokedark rounded-sm shadow-default">
          <div className="border-b border-stroke dark:border-strokedark py-4 px-7">
            <h3 className="text-lg font-medium text-black dark:text-white">
              Personal Information
            </h3>
          </div>
          <div className="p-7">
            <form>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    className="block text-sm font-medium text-black dark:text-white mb-2"
                    htmlFor="fullName"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <label
                      className="block text-sm font-medium text-black dark:text-white mb-2"
                      htmlFor="fullName"
                    >
                      Full Name
                    </label>
                    <input
                      className="w-full rounded border border-stroke dark:border-strokedark bg-gray dark:bg-meta-4 py-3 px-4.5 pl-12 text-black dark:text-white focus:border-primary focus:outline-none"
                      type="text"
                      name="fullName"
                      id="fullName"
                      placeholder="John Doe"
                      defaultValue="John Doe"
                    />
                    <span className="absolute left-4 top-3">
                      <svg
                        className="fill-current text-gray-600 dark:text-gray-300"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.72 12.887C4.502 12.106 5.562 11.667 6.667 11.667h6.666c1.105 0 2.165.439 2.947 1.22.782.782 1.22 1.842 1.22 2.947V17.5a.833.833 0 11-1.667 0v-1.667c0-.663-.264-1.299-.733-1.768a2.499 2.499 0 00-1.767-.732H6.667c-.663 0-1.299.264-1.768.732-.469.469-.732 1.105-.732 1.768V17.5a.833.833 0 01-1.667 0v-1.667c0-1.105.438-2.165 1.22-2.947zM10 3.333c-1.38 0-2.5 1.119-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5zm-4.167 2.5c0-2.301 1.865-4.167 4.167-4.167s4.167 1.866 4.167 4.167c0 2.301-1.865 4.167-4.167 4.167S5.833 8.134 5.833 5.833z"
                          fill=""
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-black dark:text-white mb-2"
                    htmlFor="phoneNumber"
                  >
                    Phone Number
                  </label>
                  <input
                    className="w-full rounded border border-stroke dark:border-strokedark bg-gray dark:bg-meta-4 py-3 px-4.5 text-black dark:text-white focus:border-primary focus:outline-none"
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="+123 456 7890"
                    defaultValue="+123 456 7890"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  className="block text-sm font-medium text-black dark:text-white mb-2"
                  htmlFor="emailAddress"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    className="w-full rounded border border-stroke dark:border-strokedark bg-gray dark:bg-meta-4 py-3 px-4.5 pl-12 text-black dark:text-white focus:border-primary focus:outline-none"
                    type="email"
                    name="emailAddress"
                    id="emailAddress"
                    placeholder="johndoe@example.com"
                    defaultValue="johndoe@example.com"
                  />
                  <span className="absolute left-4 top-3">
                    <svg
                      className="fill-current text-gray-600 dark:text-gray-300"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.333 4.167C2.877 4.167 2.5 4.544 2.5 5v10c0 .456.377.833.833.833h13.334c.456 0 .833-.377.833-.833V5c0-.456-.377-.833-.833-.833H3.333zM.833 5C.833 3.623 1.956 2.5 3.333 2.5h13.334C18.044 2.5 19.167 3.623 19.167 5v10c0 1.377-1.123 2.5-2.5 2.5H3.333c-1.377 0-2.5-1.123-2.5-2.5V5z"
                        fill=""
                      />
                      <path
                        d="M1.98 4.522a.833.833 0 011.165-.195l7.853 5.5 7.852-5.5a.833.833 0 01.97 1.36l-8.519 5.967a.833.833 0 01-.97 0L1.787 5.687a.833.833 0 01-.195-1.165z"
                        fill=""
                      />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label
                  className="block text-sm font-medium text-black dark:text-white mb-2"
                  htmlFor="Username"
                >
                  Username
                </label>
                <input
                  className="w-full rounded border border-stroke dark:border-strokedark bg-gray dark:bg-meta-4 py-3 px-4.5 text-black dark:text-white focus:border-primary focus:outline-none"
                  type="text"
                  name="Username"
                  id="Username"
                  placeholder="johndoe24"
                  defaultValue="johndoe24"
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  className="flex justify-center rounded border border-stroke dark:border-strokedark py-2 px-6 font-medium text-black dark:text-white hover:shadow-1"
                  type="reset"
                >
                  Cancel
                </button>
                <button
                  className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Profile Photo */}
        <div className="bg-white dark:bg-boxdark border border-stroke dark:border-strokedark rounded-sm shadow-default">
          <div className="border-b border-stroke dark:border-strokedark py-4 px-7">
            <h3 className="text-lg font-medium text-black dark:text-white">
              Profile Photo
            </h3>
          </div>
          <div className="p-7">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-full overflow-hidden">
                <img src={userThree} alt="User" />
              </div>
              <div>
                <p className="text-black dark:text-white">Change your photo</p>
                <div className="flex gap-3 mt-2">
                  <button className="text-sm text-primary hover:underline">
                    Delete
                  </button>
                  <button className="text-sm text-primary hover:underline">
                    Update
                  </button>
                </div>
              </div>
            </div>

            <div className="relative cursor-pointer rounded border border-dashed border-primary bg-gray dark:bg-meta-4 p-6 text-center">
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center border border-stroke dark:border-strokedark">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 9.333h1.667V12.667a.833.833 0 00.833.833H12.667a.833.833 0 00.833-.833V9.333h1.667a.833.833 0 000-1.667h-1.667V5.667a.833.833 0 10-1.667 0v2h-4.333v-2a.833.833 0 10-1.667 0v2H2.667a.833.833 0 100 1.667zM8 1.333a.833.833 0 00-1.18 0l-5.334 5.333a.833.833 0 000 1.18l.167.167a.833.833 0 001.18 0L8 3.673 12.168 7.987a.833.833 0 001.18-1.18L9.18 1.333A.833.833 0 008 1.333z"
                      fill="#3C50E0"
                    />
                  </svg>
                </div>
                <p className="mt-3 text-sm">
                  <span className="text-primary">Click to upload</span> or drag
                  and drop
                </p>
                <p className="mt-1 text-xs">SVG, PNG, JPG or GIF (max, 800 X 800px)</p>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                className="flex justify-center rounded border border-stroke dark:border-strokedark py-2 px-6 font-medium text-black dark:text-white hover:shadow-1"
                type="reset"
              >
                Cancel
              </button>
              <button
                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90"
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
