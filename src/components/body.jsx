import { useEffect } from "react";

const status = ["todo", "in-progress", "done"];

export default function Todo({ filter = "", cards, setCards }) {
  useEffect(() => {
    fetch(`https://flowboard-api-virid.vercel.app/cards?${filter}`, {
      headers: {
        "X-Workspace": "public",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.status);
        return res.json();
      })
      .then((data) => {
        console.log("data: ", data);
        setCards(Array.isArray(data) ? data : (data.cards ?? []));
      })
      .catch((error) => console.error("Fetch error:", error));
  }, [filter, setCards]);

  return (
    <div className="w-full min-h-dvh bg-gray-500 grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {status.map((section) => (
        <section key={section} id={section} className="h-full bg-red-500 p-4">
          <h2>{section}</h2>

          {cards
            .filter((item) => item.status === section)
            .map((item) => (
              <Card key={item.id} item={item} />
            ))}
        </section>
      ))}
    </div>
  );
}

function Card({ item }) {
  return (
    <article className="bg-white p-4 rounded-lg mb-3">
      <h2>{item.title}</h2>
      <p>{item.description}</p>

      <div>
        <span>{item.priority}</span>
        <span>{item.assignee}</span>
        <span>{item.dueDate}</span>
      </div>

      <div>
        {item.tags?.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </article>
  );
}
