import Todo from "./components/Todo"
import { BrowserRouter, Routes, Route } from "react-router-dom"
function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Todo />}>
        <Route path="*" element={<h1>Zion</h1>} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
