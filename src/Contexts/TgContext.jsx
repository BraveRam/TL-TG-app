import { createContext, useContext, useReducer, useEffect } from "react";
import { tgReducer } from "./TgReducer";

const TgContext = createContext();

export function TgProvider({children}){
  const [state, dispatch] = useReducer(tgReducer, {
    isInitialized: false,
    hasAccess: false,
    TG: ""
  })
  
  useEffect(()=>{
    const tg = window.Telegram ? window.Telegram.WebApp : "";
    
    const initialize = async()=>{
      if(tg.initData && tg.initDataUnsafe && tg.initDataUnsafe.user){
        dispatch({type: "DISPATCH_TG", payload: window.Telegram.WebApp})
        dispatch({type: "SET_IS_INITIALIZED"})
        const userId = tg.initDataUnsafe.user.id;
        const initData = tg.initData;
        tg.expand()
        const response = await axios.post("https://tg-tl-mini-app-api.vercel.app/api/validate-initdata", { initData })
        alert(JSON.stringify(response))
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
