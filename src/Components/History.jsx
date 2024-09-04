import { useGlobalContext } from "../Contexts/AppContext";
import { toast, Toaster } from "sonner";

export function History(){
  const { state, dispatch } = useGlobalContext()
  return (
    <>
      <Toaster/>
      <div className="flex items-center justify-center my-3">
        <h1 className="text-yellow-400 font-extrabold text-2xl">History</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-white mx-auto my-3 w-[95%] rounded dark:bg-black">
       {
         state.history.length <= 0 ? 
         <div className="flex items-center justify-center">
          <h1 className="text-center p-3 text-2xl font-bold text-blue-500">No history yet</h1>
         </div>
         :
         state.history.slice().reverse().map((hst, indx)=>{
         return <div className="bg-white shadow-md rounded p-5 w-full border-[2px] border-black dark:bg-black dark:border-[1px] dark:border-teal-400">
        <div className="flex justify-between items-center font-bold">
          <p className="text-blue-600 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={state.theme === "dark" && `#fff`}><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Zm0-82q26-36 45-75t31-83H404q12 44 31 83t45 75Zm-104-16q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55Zm208 0q56-18 99.5-55t72.5-87H638q-9 38-22.5 73.5T584-178ZM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400Zm216 0h188q3-20 4.5-39.5T580-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400Zm268 0h136q5-20 7.5-39.5T800-480q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480q0 21-1.5 40.5T654-400Zm-16-240h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640Zm-234 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83Zm-200 0h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640Z"/></svg>
          {hst.lang}</p>
          <p className="text-emerald-600 font-light dark:text-cyan-400">10/5/2024</p>
        </div>
        <div className="flex justify-between items-center">
        <div className="">
          <p className="my-2 font-bold">{hst.to}</p>
          <p className="text-gray-400">{hst.from}</p>
        </div>
        <h1 onClick={()=>{
          dispatch({type: "DELETE_HISTORY", payload: hst.id})
          toast.success("History deleted", {
            position: "top-center",
            className: "bg-black text-white text-[15px] dark:bg-white dark:text-black",
            duration: 2000
          })
        }} className="text-2xl text-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="red"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        </h1>
        </div>
       </div>
       })
       }
      </div>
     </>
    )
}