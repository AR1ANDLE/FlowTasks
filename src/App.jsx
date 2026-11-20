import { useState } from "react";
import Todo from "./components/body";
import Header from "./components/header";
import axios from "axios";

export default function App() {
  const [filter, setFilter] = useState("");
  const [cards, setCards] = useState([]);

  function addTask(task) {
    axios
      .post(
        "https://flowboard-api-virid.vercel.app/cards?password=1234",
        task,
        {
          headers: {
            "X-Workspace": "public",
          },
        },
      )
      .then((response) => {
        setCards((prevCards) => [...prevCards, response.data]);
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  }

  function modifyTask(id, updatedTask) {
    axios
      .put(
        `https://flowboard-api-virid.vercel.app/cards/${id}?password=1234`,
        updatedTask,
        {
          headers: {
            "X-Workspace": "public",
          },
        },
      )
      .then((response) => {
        setCards((prevCards) =>
          prevCards.map((card) => (card.id === id ? response.data : card)),
        );
      })
      .catch((error) => {
        console.error("Error modifying task:", error);
      });
  }

  return (
    <>
      <Header setFilter={setFilter} addTask={addTask} />

      <Todo
        filter={filter}
        cards={cards}
        setCards={setCards}
        modifyTask={modifyTask}
      />
    </>
  );
}
