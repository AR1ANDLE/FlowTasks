
import { useState } from "react"
import Todo from "./components/body"
import Header from "./components/header"

export default function App() {
    const [filter, setFilter] = useState("")
    const [cards, setCards] = useState([])

    function addTask(newTask) {
        setCards(prev => [
            ...prev,
            {
                ...newTask,
                id: Date.now()
            }
        ])
    }

    return (
        <>
            <Header
                setFilter={setFilter}
                addTask={addTask}
            />

            <Todo
                filter={filter}
                cards={cards}
                setCards={setCards}
            />
        </>
    )
}
