import { Routes, Route } from "react-router-dom";
import { Home } from "../Components/Home";
import { About } from "../Components/About";
import { NotFound } from "../Components/NotFound";

export function Router(){
  return (
     <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/about" element={<About/>}/>
       <Route path="*" element={<NotFound/>}/>
     </Routes>
    )
}