import React, { FC } from "react";
import "./App.css";
import Home from "./view/home/Home";

interface AppProps {}

const App: FC<AppProps> = ({}) => {
  return (
    <>
      <Home />
    </>
  );
};

export default App;
