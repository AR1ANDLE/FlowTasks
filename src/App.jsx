import Column from "./components/Column";
import Header from "./components/Header";
export default function App() {
  return (
    <>
      <Header></Header>
      <Column status="Todo"></Column>
      <Column status="In-Progress"></Column>
      <Column status="Done"></Column>
    </>
  );
}
