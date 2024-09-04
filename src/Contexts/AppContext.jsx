import { createContext, useContext, useReducer, useEffect } from "react";
import { appReducer } from "./AppReducer";

export const AppContext = createContext();

export function AppProvider({children}){
  const [state, dispatch] = useReducer(appReducer, {
    theme: localStorage.getItem("translateApp.Theme") || "dark",
    history: JSON.parse(localStorage.getItem("translateApp.History")) || [],
    lang: "om",
    text: "",
    processing: false,
    translatedText: ""
  })
  
  const toggleTheme = ()=>{
    if(state.theme === "dark"){
      document.body.classList.remove("dark")
      dispatch({type: "SET_LIGHT_MODE"})
    } else{
      document.body.classList.add("dark")
      dispatch({type: "SET_DARK_MODE"})
    }
  }
  
  useEffect(()=>{
    state.theme === "dark" ? document.body.classList.add("dark") : document.body.classList.remove("dark")
  }, [])
  
  useEffect(()=>{
    localStorage.setItem("translateApp.Theme", state.theme)
  }, [state.theme])
  
  useEffect(()=>{
    localStorage.setItem("translateApp.History", JSON.stringify(state.history))
  }, [state.history])
  
  return (
     <AppContext.Provider value={{state, dispatch, toggleTheme}}>
       { children }
     </AppContext.Provider>
    )
}

export function useGlobalContext(){
  return useContext(AppContext)
}