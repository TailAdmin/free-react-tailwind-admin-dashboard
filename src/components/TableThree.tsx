import { useState, useLayoutEffect } from 'react';
import { API_URL } from '../constants/Constants';
const TableThree = () => {
  // data fetching
  const [data, setData] = useState({ '': { '': '' } });
  const [filteredData, setFilteredData] = useState({ '': { '': '' } });
  const [colFilterShow, setColFilterShow] = useState(false);
  const [colFilter, setColFilter] = useState(['']);

  const [filterOperators, setFilterOperators] = useState({});
  const [filterValues, setFilterValues] = useState({});
  const [showFilterBox, setShowFilterBox] = useState(false);

  async function fetchData(param: string = '') {
    const response = await fetch(`${API_URL}/data?${param}`);
    if (!response.ok) {
      return null
    }
    const jsonData = await response.json();
    console.log('called', `${API_URL}/data?${param}`);
    return jsonData;
  }

  useLayoutEffect(() => {
    async function initData() {
      const apiData = await fetchData();
      setData(apiData);
      setFilteredData(apiData);
    }
    initData();
    setColFilter(Object.keys(Object.values(data)[0]));
    let filters: {};
    Object.keys(Object.values(data)[0]).map((col) => {
      filters = { ...filters, [col]: '' };
    });

    setFilterValues(filters);
    console.log(filters);
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
    handleFilters(updatedOperators, filterValues);
  }
  function handleFilterValue(event, col) {
    const values = { ...filterValues };
    values[col] = event.target.value;
    setFilterValues(values);
    handleFilters(filterOperators, values);
  }

  function handleFilters(filterOperators, filterValues) {
    let bondidQuery: string = '';
    let filterQuery: string = '';
    Object.entries(filterOperators).map(([col, operator]) => {
      if (filterValues[col]) {
        if (col === 'BondID') {
          bondidQuery = "&bond_ids="+filterValues[col]
        }
        else if (isNaN(Object.values(data)[0][col])) {
          let values: string = '';
          filterValues[col].split(',').map((value)=> {
            values=values+"'"+value.trim()+"',"
          })
          values = values.slice(0, -1)
          filterQuery = filterQuery+col+operator+'('+values+'),'
        }
        else {
          filterQuery = filterQuery+col+operator+filterValues[col]+','

        }
      }
    });
    let param: string = '';
    if (filterQuery) {
      param = 'filters='+filterQuery.slice(0, -1)
    }
    param = param + bondidQuery
    async function getFilteredData() {
      const filtered = await fetchData(param)
      setFilteredData(filtered)
    }
    getFilteredData()

    // console.log()
    // let reset = true;
    // Object.entries(filterOperators).map(([col, operator]) => {
    //   if (filterValues[col]) {
    //     let filter = filterValues[col]
    //     reset = false
    //     console.log(filterValues[col])
    //     let filtered;
    //     let result = {};
    //     if (col === 'BondID') {
    //       switch (operator) {
    //         case '=':
    //           filter.split(',').map((thefilter: string)=>(

    //           ))
    //           filtered = Object.entries(data).filter(([bondid, _]) =>
    //             bondid.match(filter) ? true : false
    //           );
    //           break;
    //         case '!=':
    //           filtered = Object.entries(data).filter(([bondid, _]) =>
    //             bondid.match(filter) ? false : true
    //           );
    //           break;
    //         case '>':
    //           break;
    //         case '<':
    //           break;
    //         case '>=':
    //           break;
    //         case '<=':
    //           break;
    //       }

    //     } else if (isNaN(data[col])) {
    //       switch (operator) {
    //         case '=':
    //           const updatedData = { ...filteredData };

    //         case '!=':
    //           return item[colName] != value;
    //       }
    //     } else {
    //       switch (operator) {
    //         case '=':
    //           return item[colName] == value;
    //         case '!=':
    //           return item[colName] != value;
    //         case '>':
    //           return item[colName] > value;
    //         case '<':
    //           return item[colName] < value;
    //         case '>=':
    //           return item[colName] >= value;
    //         case '<=':
    //           return item[colName] <= value;
    //       }
    //     }
    //     filtered.map((entry)=> (
    //     result[entry[0]] = entry[1]))
    //     console.log(result)
    //     setFilteredData(result)
    //   }
    // });
    // if (reset) {
    //   setFilteredData(data)
    // }
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
          className="absolute -left-5 top-5 -rotate-90 transform border-0 text-xs text-graydark"
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
              <th className="sticky top-0 left-0 z-99">
                <div className=" flex flex-col min-w-[13rem] bg-gray-2 py-4 font-medium text-black dark:bg-meta-4 dark:text-white xl:pl-11">
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
                      className="border-2 border-gray px-1 w-full"
                      value={filterValues['BondID']}
                      onChange={(event) => handleFilterValue(event, 'BondID')}
                    />
                  </div>
                </div>
              </th>
              {Object.keys(Object.values(data)[0]).map((col) => {
                return (
                  <th className="sticky top-0">
                    <div className=" flex min-w-[13rem] flex-col bg-gray-2 py-4 font-medium text-black dark:bg-meta-4 dark:text-white xl:pl-11">
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
                          className="border-2 border-gray px-1 w-full"
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
                    <tr>
                      <td className="sticky left-0 border-b border-[#eee] bg-white py-5 px-4 pl-9 dark:border-strokedark dark:bg-boxdark xl:pl-11">
                        <h5>{bond_id}</h5>
                      </td>
                      {Object.values(filteredData[bond_id]).map((value) => {
                        return (
                          <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                            <h5>{value}</h5>
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
