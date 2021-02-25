import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Wrapper from "./components/Wrapper";
import Search from "./pages/Search";
import Saved from "./pages/Saved"

function App() {
  document.title = "Google Library Searcher";
  return (
    <Router>
      <div>
        <Navbar />
        <Wrapper>
          <Route exact path="/" component={Search} />
          {/* <Route exact path="/saved" component={Saved} /> */}
          <Route exact path="/search" component={Search} />
        </Wrapper>
      </div>
    </Router>
  );
};

export default App;
