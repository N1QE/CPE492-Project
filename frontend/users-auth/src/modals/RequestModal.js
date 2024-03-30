import React from 'react';
import Request from '../components/Request';

function RequestModal({setIsRequestModalOpen,RequestData,setOpenRequestModal}) {

    console.log("requestdata==>",RequestData)
    
  return (
    <div
      className="  fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex dropdown "
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsRequestModalOpen(false)
      }}
    >
    <div
        className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
       shadow-md shadow-[#364e7e1a] mx-auto my-auto px-8  py-8 rounded-xl"
    >
        <>
  {RequestData && RequestData.length > 0 ? (
    <>
      <h3 className='text-lg'>
        Request Box
      </h3>
      <div className=" mt-3 space-y-2">
        {RequestData.map((requestData, index) => (
          <Request
            data={requestData}
            key={index}
            setIsRequestModalOpen={setIsRequestModalOpen}
          />
        ))}
      </div>
    </>
  ) : (
    <div className='flex flex-col w-80 items-center'>
      <h1 className='text-lg'>
        Request Box
      </h1>
      <h2 className='text-sm mt-10'>
        there is no request yet
      </h2>
    </div>
  )}
</>
        {/* <h3 className='text-lg'>
         Request Box
        </h3> */}

        {/* <div className=" mt-3 space-y-2">
           {RequestData && RequestData.map((RequestData, index) => {
             return (
               <Request
                 data={RequestData}
                 key={index}
                 setIsRequestModalOpen={setIsRequestModalOpen}
               />
             );
        })}
        </div> */}
    </div>
    </div>
  )
}

export default RequestModal