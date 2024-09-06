import { createContext, useContext, useReducer, useEffect } from "react";
import { tgReducer } from "./TgReducer";
import axios from "axios";

const TgContext = createContext();

export function TgProvider({children}){
  const [state, dispatch] = useReducer(tgReducer, {
    isInitialized: false,
    hasAccess: false,
    TG: window.Telegram?.WebApp || ""
  })
  
  useEffect(()=>{
    const tg = state.TG
    
    const initialize = async()=>{
      if(tg.initData && tg.initDataUnsafe && tg.initDataUnsafe.user){  
        dispatch({type: "SET_IS_INITIALIZED"})
        const userId = tg.initDataUnsafe.user.id;
        const initData = tg.initData;
        
        const response = await axios.post("https://tg-tl-mini-app-api.vercel.app/api/validate", { initData })
        if(response.status === 200){
          tg.expand()          
          const membership = await axios.post("https://tg-tl-mini-app-api.vercel.app/api/check-membership", { userId })       
          if(membership.status === 200){             
             dispatch({type: "ENABLE_ACCESS"})
          } else{            
            dispatch({type: "DISABLE_ACCESS"})
          }
        } else{
          alert("Invalid bot!\nGo to @OromoTranslatorBot")
          dispatch({type: "DISABLE_ACCESS"})
        }
      } else {
        dispatch({type: "DISABLE_ACCESS"})
        dispatch({type: "UNSET_IS_INITIALIZED"})
      }
    }
    initialize();
  }, [])
  
  
  return (
     <TgContext.Provider value={{state, dispatch}}>
      {children}
     </TgContext.Provider>
    )
}

export function useTgContext(){
  return useContext(TgContext)
}
