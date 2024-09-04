import { useGlobalContext } from "../Contexts/AppContext";
import { toast, Toaster } from "sonner";
import axios from "axios";

export function TranslateForm() {
  const { state, dispatch } = useGlobalContext()
  
  const translate = async (lang, text) => {
      toast.info("Translating....", {
        position: "top-center",
        className: "bg-black text-white text-[15px] dark:bg-white dark:text-black",
        duration: 2000
      });
    
      try {
        dispatch({ type: "SET_PROCESS" });
        const response = await axios.post("https://tg-tl-mini-app-api.vercel.app/translate", { lang, text });
    
        if (response.status === 200) {
          dispatch({ type: "SET_TRANSLATED_TEXT", payload: response.data.message });
          dispatch({ type: "SET_HISTORY", payload: { to: response.data.message, from: text } });
        } else {
          toast.error("Error while translating....", {
            position: "top-center",
            className: "bg-black text-white text-[15px] dark:bg-white dark:text-black",
            duration: 2000
          });
        }
      } catch (e) {
        toast.error("There is a connection error....", {
          position: "top-center",
          className: "bg-black text-white text-[15px] dark:bg-white dark:text-black",
          duration: 2000
        });
      } finally {
        dispatch({ type: "UNSET_PROCESS" });
      }
    };
  
  const process = (text)=>{
    return translate(state.lang, text)
  }
  
  return (
    <>
    <div className="flex items-center justify-center mt-20">
    <Toaster/>
    {/*JSON.stringify(state)*/}
      <select value={state.lang} onChange={(e)=>dispatch({type: "SET_LANG", payload:{lang: e.target.value}})} className="p-3 outline-0 rounded mb-2 font-bold border-[1px] border-black dark:border-[1px] dark:border-white dark:bg-black">
        <option value="om">Oromo</option>
        <option value="am">Amharic</option>
        <option value="ti">Tigrai</option>
        <option value="so">Somali</option>
        <option value="en">Engish</option>
        <option value="fr">French</option>
        <option value="es">Spanish</option>
        <option value="de">German</option>
        <option value="ar">Arabic</option>
        <option value="hi">Hindi</option>
      </select>
      <button disabled={state.processing} onClick={()=>{
        !state.text.trim() ? toast.warning("Maaloo waa barressaa...", {
            position: "top-center",
            className: "bg-black text-white text-[15px] dark:bg-white dark:text-black",
            duration: 2000
          }) : process(state.text)
          
      }} className={state.processing ? "text-3xl ml-5 mb-2 bg-black text-white rounded p-1 dark:bg-white dark:text-black" : "animate-pulse text-3xl ml-5 mb-2 bg-black text-white rounded p-1 dark:bg-white dark:text-black"}>
        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill={state.theme === "dark" ? "#000" : "#fff"}><path d="M480.67-80 440-200H160q-34.33 0-57.17-22.83Q80-245.67 80-280v-520q0-34.33 22.83-57.17Q125.67-880 160-880h240l35 119.6h365q35 0 57.5 22.43 22.5 22.42 22.5 57.3V-160q0 34.33-22.46 57.17Q835.08-80 800.13-80H480.67Zm-194.2-296q69.2 0 113.36-44.69Q444-465.37 444-536.67q0-8.66-.17-15.16-.16-6.5-2.17-12.17H283v61.33h89.67q-8 28.64-30.5 44.49-22.5 15.85-54.5 15.85-39 0-67-28.2-28-28.19-28-69.47t28-69.47q28-28.2 66.82-28.2 17.93 0 33.85 6.5 15.93 6.5 28.88 19.5L399-658q-20.33-22-50.17-34-29.83-12-62.16-12-67.67 0-115.17 47.83Q124-608.33 124-540t47.64 116.17Q219.27-376 286.47-376Zm267.8 19.33 22.4-21q-14-17-25.84-32.66Q539-426 528-444l26.27 87.33Zm49.86-51q28.24-33 42.87-63 14.62-30 19.67-47h-159L519-475h40q8 14.8 19 32.07 11 17.26 26.13 35.26ZM520.67-120H800q17.33 0 28.67-11.51Q840-143.03 840-160.05v-520.62q0-17.33-11.33-28.66-11.34-11.34-28.67-11.34H447.67L494-558h79v-42.67h41V-558h146.67v40.33H709q-9.33 38-29.33 74.1-20 36.1-47 67.19l109 107.3-29 29.08L604-348l-36 36.33L600.67-200l-80 80Z"/></svg>
      </button>
    </div>
    <div className="bg-white rounded w-[95%] mx-auto p-3 shadow-lg flex flex-col md:flex-row items-center gap-1 dark:bg-black dark:text-white dark:shadow-md">
      <div className="w-full md:flex-1 p-3">
      {/*JSON.stringify(state)*/}
        <textarea value={state.text} onChange={(e)=>dispatch({type: "SET_TEXT", payload: e.target.value})} placeholder="Asitti barreessaa..." className="bg-white p-3 border-[1px] border-black font-normal w-full rounded shadow-md outline-0 dark:bg-black dark:border-[1px] dark:border-white">
        </textarea>
      </div>
      <div className="w-auto md:ml-7 md:w-[40px]">
        <h1 className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill={state.theme === "dark" && `#fff`}><path d="M620-40q-104 0-183.5-62T331-260q45 2 89-9t84-31h164q1-11 1.5-21.5t.5-21.5q0-9-.5-18.5T668-380h-59q16-18 29.5-38t24.5-42h141q-20-30-48-52.5T693-547q5-20 6.5-41t.5-41q96 26 158 105.5T920-340q0 125-87.5 212.5T620-40Zm-95-102q-7-20-12.5-39t-9.5-39h-67q17 25 39.5 45t49.5 33Zm95 14q12-22 20.5-45t14.5-47h-70q6 24 15 47t20 45Zm95-14q27-13 49.5-33t39.5-45h-67q-5 20-10 39t-12 39Zm33-158h88q2-10 3-19.5t1-20.5q0-11-1-20.5t-3-19.5h-88q1 9 1.5 18.5t.5 18.5q0 11-.5 21.5T748-300Zm-408-20q-125 0-212.5-87.5T40-620q0-125 87.5-212.5T340-920q125 0 212.5 87.5T640-620q0 125-87.5 212.5T340-320Zm0-80q91 0 155.5-64.5T560-620q0-91-64.5-155.5T340-840q-91 0-155.5 64.5T120-620q0 91 64.5 155.5T340-400ZM240-640q17 0 28.5-11.5T280-680q0-17-11.5-28.5T240-720q-17 0-28.5 11.5T200-680q0 17 11.5 28.5T240-640Zm100 176q48 0 85.5-27t54.5-69H200q17 42 54.5 69t85.5 27Zm100-176q17 0 28.5-11.5T480-680q0-17-11.5-28.5T440-720q-17 0-28.5 11.5T400-680q0 17 11.5 28.5T440-640Zm-100 20Z"/></svg>
        </h1>
      </div>
      <div className="w-full md:flex-1 p-3">
        <p className={state.translatedText ? "bg-white p-5 border-[1px] border-black font-bold w-full rounded shadow-md outline-0 dark:bg-black dark:border-[1px] dark:border-white" : "bg-white p-3 border-[1px] border-black font-bold w-full text-gray-500 rounded shadow-md outline-0 dark:bg-black dark:border-[1px] dark:border-white"}>{!state.translatedText ? "Hiikkaan asitti mul'ata..." :
          state.translatedText
        }</p>
      </div>
    </div>
    </>
  );
}
