import "./App.css";
import PasswordGenerator from "./components/reuseComponents/PasswordGenerator";
import { Toaster } from "@/components/ui/toaster"
function App() {
  return (
    <div className="p-5 flex justify-center items-center">
      <PasswordGenerator></PasswordGenerator>
      <Toaster />
    </div>
  );
}

export default App;
