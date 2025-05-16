import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Recettes from "./pages/Recettes";
import RecettesDetail from "./pages/RecettesDetail";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home/>} />
				<Route path="/recettes" element={<Recettes/>} />
				<Route path="/recettes/:id" element={<RecettesDetail/>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
