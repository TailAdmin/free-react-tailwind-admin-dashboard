import { useState, useLayoutEffect, useCallback } from 'react';
import { API_URL } from '../constants/Constants';
import { createPortal } from 'react-dom';
const TableThree = () => {
  // data fetching
  const [data, setData] = useState({ '': { '': '' } });

  async function fetchData(param: string = 'cols=Price,ISIN') {
    const response = await fetch(`${API_URL}/data?${param}`);
    const jsonData = await response.json();
    setData(jsonData);
    console.log('called', `${API_URL}/data?${param}`);
  }

  useLayoutEffect(() => {
    fetchData();
    setColFilter(Object.keys(Object.values(data)[0]));
  }, []);

  // column filter
  const [colFilterShow, setColFilterShow] = useState(false);
  const [colFilter, setColFilter] = useState(['']);
  function toggleColFilterShow() {
    setColFilterShow(!colFilterShow);
  }

  // show filter box
  const [showFilterBox, setShowFilterBox] = useState(false);

  function toggleShowFilterBox(event: any) {
    event.preventDefault();
    setShowFilterBox(!showFilterBox);
  }

  // filter function
  const [selectedOption, setSelectedOption] = useState({ '': '' });
function handleSelectedOption(event: any) {
    const { name, value } = event.target;
    console.log(name, value)
    setSelectedOption({ ...selectedOption, [name]: value });
    console.log(selectedOption);
  }



  return (
    <div className="relative rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="">
        <button
          className="py-1 px-2 text-xs underline"
          onClick={(event) => toggleShowFilterBox(event)}
        >
          Toggle Filter Box
        </button>
      </div>
      <div className="absolute left-5 flex flex-col">
        <div
          onClick={() => {
            toggleColFilterShow();
          }}
          className="absolute -left-5 top-5 -rotate-90 transform border border-0 text-xs text-graydark"
        >
          cols
        </div>
        <div
          onClick={() => {
            toggleColFilterShow();
          }}
          className="h-15 w-2 border bg-graydark"
        ></div>
        <div
          className={
            'z-99 max-h-100 overflow-y-auto border-2' +
            (colFilterShow ? '' : ' hidden')
          }
        >
          {Object.keys(Object.values(data)[0]).map((key) => {
            return (
              <div className="bg-gray px-3 py-1">
                <p>
                  <input
                    type="checkbox"
                    name={'check_' + key}
                    id={'check_' + key}
                    className="mr-2"
                    checked
                  />
                  {key}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="borderpy-4 absolute w-1">
        <p>&nbsp;</p>
      </div>
      <div className="max-h-[75vh] max-w-full overflow-x-auto overflow-y-auto">
        <table className="w-full">
          <thead className="">
            <tr className="text-left dark:bg-meta-4">
              <th className="sticky top-0">
                <div className=" flex min-w-[220px] flex-col bg-gray-2 py-4 font-medium text-black dark:bg-meta-4 dark:text-white xl:pl-11">
                  <h4 className="block px-4">BondID</h4>
                  <div
                    className={
                      'mt-2 flex flex-row py-1 px-4' +
                      (showFilterBox ? '' : ' hidden')
                    }
                  >
                    <select
                      name="BondID"
                      id=""
                      className="mr-2 border-2 border-gray px-1"
                      onChange={(event) => handleSelectedOption(event)}
                    >
                      <option value=""></option>
                      <option value="=">=</option>
                      <option value="!=">{'!='}</option>
                      {false ? (
                        <></>
                      ) : (
                        <>
                          <option value=">">{'>'}</option>
                          <option value="<">{'<'}</option>
                          <option value=">=">{'>='}</option>
                          <option value="<=">{'<='}</option>
                        </>
                      )}
                    </select>
                    <input
                      type="text"
                      name="filter_value"
                      id=""
                      className="border-2 border-gray px-1"
                    />
                  </div>
                </div>
              </th>
              {Object.keys(Object.values(data)[0]).map((col) => {
                return (
                  <th className="sticky top-0">
                    <div className=" flex min-w-[220px] flex-col bg-gray-2 py-4 font-medium text-black dark:bg-meta-4 dark:text-white xl:pl-11">
                      <h4 className="block px-4">{col}</h4>
                      <div
                        className={
                          'mt-2 flex flex-row py-1 px-4' +
                          (showFilterBox ? '' : ' hidden')
                        }
                      >
                        <select
                          name={col}
                          id=""
                          className="mr-2 border-2 border-gray px-1"
                        >
                          <option value=""></option>
                          <option value="=">=</option>
                          <option value="!=">{'!='}</option>
                          {isNaN(Object.values(data)[0][col]) ? (
                            <></>
                          ) : (
                            <>
                              <option value=">">{'>'}</option>
                              <option value="<">{'<'}</option>
                              <option value=">=">{'>='}</option>
                              <option value="<=">{'<='}</option>
                            </>
                          )}
                        </select>
                        <input
                          type="text"
                          name="filter_value"
                          id=""
                          className="border-2 border-gray px-1"
                        />
                      </div>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="">
            {Object.keys(data).map((bond_id) => {
              return (
                <tr>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5>{bond_id}</h5>
                  </td>
                  {Object.values(data[bond_id]).map((value) => {
                    return (
                      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <h5>{value}</h5>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
