import { useEffect } from "react";
import { getAssignee, getTasks } from "./data/tasks";
import Header from "./components/header";

const assignee = await getAssignee();

export default function App() {
  return (
    <>
      <Header></Header>
    </>
  );
}
