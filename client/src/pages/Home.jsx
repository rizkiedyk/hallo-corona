import React from "react";
import Article from "../component/article/Article";
import Jumbotron from "../component/jumbotron/Jumbotron";

function Home() {
  return (
    <>
      <Jumbotron />
      <h1 className="text-center my-5" style={{ color: "#FF6185" }}>
        Artikel Hari ini
      </h1>
      <Article />
    </>
  );
}
export default Home;
