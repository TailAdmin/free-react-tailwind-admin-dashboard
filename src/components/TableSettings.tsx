import React from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
// import dataJSON from '../../public/data.json';

export const Table = ({ rows, deleteRow, editRow }) => {
  
  
  return (
   
      <div className="max-w-full overflow-x-auto table-wrapper">
      <table className="table">
        <thead>
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Bond</th>
            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Paramter</th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">Criterion</th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">Value to give alert</th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">Alert Color</th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">Alert Notis</th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row:any, idx:number) => {
           

            return (
              <tr key={idx} className="content-center">
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{row.id}</td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <span className={`label label-${row.para}`}>
                    {row.para}
                  </span>
                </td>
                
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <span>
                    {row.criterion==0?"goes down by":row.criterion==1?"goes up by":row.criterion==2?"is smaller than":row.criterion==3?"is greater than":"is equal to"}
                  </span>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{row.value}</td>
                <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
                  {(<span className={`${row.color=="Green"?"bg-[#04b20c]":row.color=="Yellow"?"bg-[#eab90f]":"bg-[#e13f32]"} m-1.5 flex items-center justify-center rounded border-[.5px] border-stroke py-1.5 px-2.5 text-white font-medium dark:border-strokedark`}>
                      {row.color}
                      
                            
                    </span>)}
                </td>
                <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
                {    row.notiArr.map((n)=>(
                      <span
                      
                          className="z-50 w-fit m-1.5 flex items-center justify-center rounded border-[.5px] border-stroke dark:border-strokedark bg-gray dark:bg-white/30 py-1.5 px-2.5 text-sm font-medium">
                          {n}
                          
                        </span>
                      )
             )
                
              }
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <span className="actions flex grid-cols-2 gap-4">
                    <BsFillTrashFill
                      className="delete-btn cursor-pointer"
                      onClick={() => deleteRow(idx)} />
                    
                    <BsFillPencilFill
                      className="edit-btn cursor-pointer"
                      onClick={() => editRow(idx)} />
                    
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    

  );
};