import BrandOne from '../images/brand/brand-01.svg';
import BrandTwo from '../images/brand/brand-02.svg';
import BrandThree from '../images/brand/brand-03.svg';
import BrandFour from '../images/brand/brand-04.svg';
import BrandFive from '../images/brand/brand-05.svg';

import data from '../../public/data.json';

const TableOne = () => {
  return (
<div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
<h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Bond Price
      </h4>
<div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="flex items-center justify-center text-sm font-medium uppercase xsm:text-base">
              Ticket
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Price
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Delta Price
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Rating
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Delta Rating
            </h5>
          </div>
        </div>
      {Object.keys(data).map((key) => (
        <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5">
        <div className="flex items-center justify-center p-2.5 xl:p-5">
          <p className="text-black dark:text-white">{key}</p>
        </div>

        <div className="flex items-center justify-center p-2.5 xl:p-5">
          <p className="text-black dark:text-white">{data[key].price}</p>
        </div>

        <div className="flex items-center justify-center p-2.5 xl:p-5">
          <p className="text-meta-3">{data[key].delta_price}</p>
        </div>

        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
          <p className="text-black dark:text-white">{data[key].rating}</p>
        </div>

        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
          <p className="text-meta-5">{data[key].delta_rating}</p>
        </div>
      </div>
      ))}
    </div>
  );
};

export default TableOne;
