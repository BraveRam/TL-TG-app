import { createContext, useContext, useReducer, useEffect } from "react";
import { tgReducer } from "./TgReducer";
import axios from "axios

const TgContext = createContext();

export function TgProvider({children}) {
  const [state, dispatch] = useReducer(tgReducer, {
    isInitialized: false,
    hasAccess: false,
    TG: window.Telegram?.WebApp || ""  // Assign window.Telegram.WebApp directly to state
  });

  useEffect(() => {
    const tg = state.TG;
    
    if (tg) {
      const initialize = () => {
        if (tg.initData && tg.initDataUnsafe && tg.initDataUnsafe.user) {         
          dispatch({ type: "SET_IS_INITIALIZED" });

          const userId = tg.initDataUnsafe.user.id;
          
          axios.post("https://tg-tl-mini-app-api.vercel.app/api/validate", { initData: tg.initData })
            .then(response => {
              if (response.status === 200) {
                return axios.post("https://tg-tl-mini-app-api.vercel.app/api/check-membership", { userId });
              } else {
                dispatch({ type: "DISABLE_ACCESS" });
                throw new Error("Invalid data");
              }
            })
            .then(membership => {
              if (membership.status === 200) {
                dispatch({ type: "ENABLE_ACCESS" });
              } else {
                dispatch({ type: "DISABLE_ACCESS" });
              }
            })
            .catch(() => {
              dispatch({ type: "DISABLE_ACCESS" });
            });
        } else {
          dispatch({ type: "DISABLE_ACCESS" });
          dispatch({ type: "UNSET_IS_INITIALIZED" });
        }
      };
      
      initialize();
    } else {
      dispatch({ type: "DISABLE_ACCESS" });
      dispatch({ type: "UNSET_IS_INITIALIZED" });
    }
  }, [state.TG]);

  return (
    <TgContext.Provider value={{ state, dispatch }}>
      {children}
    </TgContext.Provider>
  );
}

export function useTgContext() {
  return useContext(TgContext);
}
