import { Router } from "./Routes/Routes";
import { Navbar } from "./Components/Navbar";
import { AppProvider } from "./Contexts/AppContext";
import { useTgContext } from "./Contexts/TgContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function App(){
  const { state, dispatch } = useTgContext();
  useEffect(()=>{
    setTimeout(()=>{
      if(state.isInitialized){
        if(state.hasAccess){
          return (
             <AppProvider>
               <Navbar/>
               <Router/>
             </AppProvider>
      )
        } else{
          return (
            <div className="mx-auto block w-[330px]">
              <h1 className="text-center text-2xl mt-5 font-extrabold text-red-500">🤖Bot kana fayyadamuuf #channel keenya #Join gochuu qabdu! San booda #page kana #reload ykn cufaa banaa👇</h1>
              <Link className="text-center mx-auto block font-extrabold py-2 px-4 rounded bg-blue-500 text-white mt-3" to="https://t.me/Oro_Tech_Tipz">JOIN CHANNEL</Link>
        </div>
            )
        }
      } else{
        return <div className="mx-auto block w-[330px]">
            <h1 className="text-center text-2xl mt-5 font-extrabold text-red-500">Open the bot in Telegram</h1>
            <Link className="text-center py-2 px-4 mx-auto font-extrabold block rounded bg-blue-500 text-white mt-3" to="https://t.me/OromoTranslatorBot">CLICK HERE</Link>
        </div>
      }
    }, 2000)
  }, [])
  
}

export default App;
