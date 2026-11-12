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
    <div className="w-full min-h-dvh bg-white grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {status.map((section) => (
        <section key={section} id={section} className="h-full bg-green-800 p-4 rounded-lg">
          <h2 className="text-white">{section}</h2>

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
    <article className="bg-white p-4 rounded-lg mb-3 flex flex-col items-center gap-2">
      <h2 className="w-9/12 bg-green-600 rounded-full flex justify-center text-white">{item.title}</h2>
      <p className="w-9/12 items-center text-center">{item.description}</p>

      <div className="w-full flex justify-center gap-5">
        <span className="badge">{item.priority}</span>
        <span className="badge">{item.assignee}</span>
        <span  className="badge">{item.dueDate}</span>
      </div>

      <div className="w-full flex my-10 bg-gray-400 rounded-full gap-5 px-2 items-center">
        <h3 className="font-bold text-xs">Tags :</h3>
        {item.tags?.map((tag) => (
          <span className="badge badge-green" key={tag}>{tag}</span>
        ))}
      </div>
    </article>
  );
}
