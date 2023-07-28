import { useState, useLayoutEffect } from 'react';
import { API_URL } from '../constants/Constants';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';
import { BsDash } from 'react-icons/bs';

const TableThree = () => {
  // data fetching
  const [data, setData] = useState({ '': { '': '' } });
  const [filteredData, setFilteredData] = useState({ '': { '': '' } });
  const [colFilterShow, setColFilterShow] = useState(false);
  const [colFilter, setColFilter] = useState({});

  const [filterOperators, setFilterOperators] = useState({});
  const [filterValues, setFilterValues] = useState({});
  const [showFilterBox, setShowFilterBox] = useState(false);

  async function fetchData(route: string = 'data?', param: string = '') {
    const response = await fetch(`${API_URL}/${route}${param}`);
    if (!response.ok) {
      return null;
    }
    const jsonData = await response.json();
    console.log('called', `${API_URL}/${route}${param}`);
    return jsonData;
  }

  useLayoutEffect(() => {
    async function initData() {
      const apiData = await fetchData();
      setData(apiData);
      setFilteredData(apiData);
      const availableCols = await fetchData('available_cols', '');
      let colFilters = {};
      availableCols.map((col: string) => {
        colFilters = { ...colFilters, [col]: true };
      });
      setColFilter(colFilters);

      let filters = {};
      Object.keys(Object.values(apiData)[0]).map((col) => {
        filters = { ...filters, [col]: '' };
      });
      setFilterValues(filters);
    }
    initData();
  }, []);

  // column filter
  function toggleColFilterShow() {
    setColFilterShow(!colFilterShow);
  }

  // show filter box
  function toggleShowFilterBox(event: any) {
    event.preventDefault();
    setShowFilterBox(!showFilterBox);
  }

  // filter function
  function handleSelectedOption(name: string, value: string) {
    const updatedOperators = { ...filterOperators, [name]: value };
    setFilterOperators(updatedOperators);
    handleFilters(updatedOperators, filterValues, colFilter);
  }
  function handleFilterValue(event, col) {
    const values = { ...filterValues };
    values[col] = event.target.value;
    setFilterValues(values);
    handleFilters(filterOperators, values, colFilter);
  }
  // handle filters, cols filter
  function handleFilters(filterOperators, filterValues, colFilters) {
    let bondidQuery: string = '';
    let filterQuery: string = '';
    let colFilterQuery: string = '';
    Object.entries(filterOperators).map(([col, operator]) => {
      if (filterValues[col]) {
        if (col === 'BondID') {
          bondidQuery = '&bond_ids=' + filterValues[col];
        } else if (isNaN(Object.values(data)[0][col])) {
          let values: string = '';
          filterValues[col].split(',').map((value) => {
            values = values + "'" + value.trim() + "',";
          });
          values = values.slice(0, -1);
          filterQuery = filterQuery + col + operator + '(' + values + '),';
        } else {
          filterQuery = filterQuery + col + operator + filterValues[col] + ',';
        }
      }
    });

    Object.keys(colFilter).map((col) => {
      if (colFilter[col]) {
        colFilterQuery = colFilterQuery + col + ',';
      }
    });
    colFilterQuery = '&cols=' + colFilterQuery.slice(0, -1);

    let param: string = '';
    if (filterQuery) {
      param = 'filters=' + filterQuery.slice(0, -1);
    }
    param = param + bondidQuery;
    async function getFilteredData() {
      const filtered = await fetchData('data?', param);
      setFilteredData(filtered);
    }

    getFilteredData();
  }

  function toggleColFilter(col: string) {
    if (col === 'BondID') {
      return;
    }
    const updateColFilter = { ...colFilter };
    updateColFilter[col] = !colFilter[col];
    setColFilter(updateColFilter);
  }

  // render icons for rating_delta
  function renderRatingDeltaIcon(value: int) {
    switch (value) {
      case 1:
        return <BiSolidUpArrow className="text-success" />;
      case 0:
        return <BsDash className="text-gray-400" />;
      case -1:
        return <BiSolidDownArrow className="text-danger" />;
    }
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
      <div className="absolute left-5 flex flex-col cursor-pointer">
        <div
          onClick={() => {
            toggleColFilterShow();
          }}
          className="absolute -left-8 top-5 -rotate-90 transform border-0 text-xs px-4"
        >
          <p className="pointer-events-none select-none">cols</p>
        </div>
        <div
          onClick={() => {
            toggleColFilterShow();
          }}
          className="h-15 w-2 border bg-graydark dark:border-strokedark"
        ></div>
        <div
          className={
            'z-99 max-h-100 overflow-y-auto border-2 dark:border-[0.3rem] dark:border-graydark' +
            (colFilterShow ? '' : ' hidden')
          }
        >
          {Object.keys(colFilter).map((col) => {
            return (
              <div className="bg-gray dark:bg-boxdark px-3 py-1">
                <div
                  onClick={() => {
                    toggleColFilter(col);
                  }}
                >
                  <input
                    type="checkbox"
                    name={'check_' + col}
                    id={'check_' + col}
                    className="mr-2"
                    checked={colFilter[col]}
                  />
                  <label
                    htmlFor={'check_' + col}
                    className="pointer-events-none"
                  >
                    {col}
                  </label>
                </div>
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
              <th className="sticky top-0 left-0 z-50">
                <div className="flex flex-col bg-gray-2 py-1 font-medium text-black dark:bg-meta-4 dark:text-white xl:pl-2">
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
                      onChange={(event) => {
                        handleSelectedOption(
                          event.target.name,
                          event.target.value
                        );
                      }}
                      value={filterOperators['BondID']}
                    >
                      <option value=""></option>
                      <option value="=">=</option>
                    </select>
                    <input
                      type="text"
                      name="filter_value"
                      id=""
                      className="w-full border-2 border-gray px-1"
                      value={filterValues['BondID']}
                      onChange={(event) => handleFilterValue(event, 'BondID')}
                    />
                  </div>
                </div>
              </th>
              {Object.keys(Object.values(data)[0]).map((col) => {
                return (
                  <th className="sticky top-0">
                    <div className=" flex min-w-[5rem] flex-col bg-gray-2 py-1 font-medium text-black dark:bg-meta-4 dark:text-white xl:pl-2">
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
                          onChange={(event) => {
                            handleSelectedOption(
                              event.target.name,
                              event.target.value
                            );
                          }}
                          value={filterOperators[col]}
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
                          className="w-full border-2 border-gray px-1"
                          value={filterValues[col]}
                          onChange={(event) => handleFilterValue(event, col)}
                        />
                      </div>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="">
            {filteredData
              ? Object.keys(filteredData).map((bond_id) => {
                  return (
                    <tr className='overflow-x-clip'>
                      <td className="sticky left-0 border-b border-[#eee] bg-white py-1 px-4 pl-3 dark:border-strokedark dark:bg-boxdark">
                        <h5>{bond_id}</h5>
                      </td>
                      {Object.keys(filteredData[bond_id]).map((key) => {
                        return (
                          <td className="border-b border-[#eee] py-1 px-4 pl-4 dark:border-strokedark xl:pl-2 min-w-[10rem]">
                            <h5>
                              {key.includes('Rating_Delta')
                                ? renderRatingDeltaIcon(
                                    filteredData[bond_id][key]
                                  )
                                : filteredData[bond_id][key]}
                            </h5>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              : ''}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
