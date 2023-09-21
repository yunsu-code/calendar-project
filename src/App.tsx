import React, { FC } from "react";
import Home from "./view/home/Home";
import "./App.scss";

interface AppProps {}

const App: FC<AppProps> = ({}) => {
  return (
    <>
      <Home />
    </>
  );
};

export default App;
