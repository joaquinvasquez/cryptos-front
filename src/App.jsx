import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import Trade from "./containers/Trade";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home></Home>}></Route>
            <Route exact path="/trade" element={<Trade></Trade>}></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
