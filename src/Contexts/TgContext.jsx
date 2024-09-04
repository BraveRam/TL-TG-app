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
        tg.expand()
        const response = await axios.post("https://tg-tl-mini-app-api.vercel.app/api/validate", { initData })
        alert(JSON.stringify(response.status === 200))
        if(response.status === 200){
          const membership = await axios.post("https://tg-tl-mini-app-api.vercel.app/api/check-membership", { userId })       
          if(membership.status === 200){
             alert("member")
             dispatch({type: "ENABLE_ACCESS"})
          } else{
            alert("invalid data")
            dispatch({type: "DISABLE_ACCESS"})
          }
        } else{
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
