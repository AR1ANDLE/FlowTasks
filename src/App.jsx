import { useState } from "react";
import Todo from "./components/body";
import Header from "./components/header";
import axios from "axios";

export default function App() {
  const [filter, setFilter] = useState("");
  const [cards, setCards] = useState([]);

  return (
    <>
      <Header setFilter={setFilter} />

      <Todo filter={filter} cards={cards} setCards={setCards} />
    </>
  );
}
