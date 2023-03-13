import React from 'react';
import BrandOne from '../images/brand/brand-01.svg'
import BrandTwo from '../images/brand/brand-02.svg'
import BrandThree from '../images/brand/brand-03.svg'
import BrandFour from '../images/brand/brand-04.svg'
import BrandFive from '../images/brand/brand-05.svg'

const TableOne = () => {
  return (
    <div
  className="shadow-default rounded-sm border border-stroke dark:border-strokedark bg-white dark:bg-boxdark pt-6 pb-2.5 xl:pb-1 px-5 sm:px-7.5">
  <h4 className="font-semibold text-xl text-black dark:text-white mb-6">Top Channels</h4>

  <div className="flex flex-col">
    <div className="grid grid-cols-3 sm:grid-cols-5 bg-gray-2 dark:bg-meta-4 rounded-sm">
      <div className="p-2.5 xl:p-5">
        <h5 className="font-medium text-sm xsm:text-base uppercase">Source</h5>
      </div>
      <div className="p-2.5 xl:p-5 text-center">
        <h5 className="font-medium text-sm xsm:text-base uppercase">Visitors</h5>
      </div>
      <div className="p-2.5 xl:p-5 text-center">
        <h5 className="font-medium text-sm xsm:text-base uppercase">Revenues</h5>
      </div>
      <div className="hidden sm:block p-2.5 xl:p-5 text-center">
        <h5 className="font-medium text-sm xsm:text-base uppercase">Sales</h5>
      </div>
      <div className="hidden sm:block p-2.5 xl:p-5 text-center">
        <h5 className="font-medium text-sm xsm:text-base uppercase">Conversion</h5>
      </div>
    </div>

    <div className="grid grid-cols-3 sm:grid-cols-5 border-b border-stroke dark:border-strokedark">
      <div className="flex items-center gap-3 p-2.5 xl:p-5">
        <div className="flex-shrink-0"><img src={BrandOne} alt="Brand" /></div>
        <p className="hidden sm:block text-black dark:text-white">Google</p>
      </div>

      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-black dark:text-white">3.5K</p>
      </div>

      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-meta-3">$5,768</p>
      </div>

      <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-black dark:text-white">590</p>
      </div>

      <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-meta-5">4.8%</p>
      </div>
    </div>

    <div className="grid grid-cols-3 sm:grid-cols-5 border-b border-stroke dark:border-strokedark">
      <div className="flex items-center gap-3 p-2.5 xl:p-5">
        <div className="flex-shrink-0"><img src={BrandTwo} alt="Brand" /></div>
        <p className="hidden sm:block text-black dark:text-white">Twitter</p>
      </div>

      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-black dark:text-white">2.2K</p>
      </div>

      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-meta-3">$4,635</p>
      </div>

      <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-black dark:text-white">467</p>
      </div>

      <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-meta-5">4.3%</p>
      </div>
    </div>

    <div className="grid grid-cols-3 sm:grid-cols-5 border-b border-stroke dark:border-strokedark">
      <div className="flex items-center gap-3 p-2.5 xl:p-5">
        <div className="flex-shrink-0"><img src={BrandThree} alt="Brand" /></div>
        <p className="hidden sm:block text-black dark:text-white">Github</p>
      </div>

      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-black dark:text-white">2.1K</p>
      </div>

      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-meta-3">$4,290</p>
      </div>

      <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-black dark:text-white">420</p>
      </div>

      <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-meta-5">3.7%</p>
      </div>
    </div>

    <div className="grid grid-cols-3 sm:grid-cols-5 border-b border-stroke dark:border-strokedark">
      <div className="flex items-center gap-3 p-2.5 xl:p-5">
        <div className="flex-shrink-0"><img src={BrandFour} alt="Brand" /></div>
        <p className="hidden sm:block text-black dark:text-white">Vimeo</p>
      </div>

      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-black dark:text-white">1.5K</p>
      </div>

      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-meta-3">$3,580</p>
      </div>

      <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-black dark:text-white">389</p>
      </div>

      <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-meta-5">2.5%</p>
      </div>
    </div>

    <div className="grid grid-cols-3 sm:grid-cols-5">
      <div className="flex items-center gap-3 p-2.5 xl:p-5">
        <div className="flex-shrink-0"><img src={BrandFive} alt="Brand" /></div>
        <p className="hidden sm:block text-black dark:text-white">Facebook</p>
      </div>

      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-black dark:text-white">1.2K</p>
      </div>

      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-meta-3">$2,740</p>
      </div>

      <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-black dark:text-white">230</p>
      </div>

      <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-meta-5">1.9%</p>
      </div>
    </div>
  </div>
</div>
  );
}

export default TableOne;
