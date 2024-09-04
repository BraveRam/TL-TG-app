import { TranslateForm } from "./TranslateForm";
import { History } from "./History";
import { Footer } from "./Footer";

export function Home(){
  return (
     <div className="Home">
       <TranslateForm/>
       <History/>
       <Footer/>
     </div>
    )
}