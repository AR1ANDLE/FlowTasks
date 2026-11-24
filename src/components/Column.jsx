import useFetch from "../service/useFetch";
import Card from "./Card";
export default function Column({ status }) {
  const data = useFetch();
  const cards = data.filter((task) => {
    return task.status === status.toLowerCase();
  });
  return (
    <section id={status} className="w-full mx-auto px-4 py-4">
      <div
        className={` bg-accent  rounded-xl border-2 border-text p-5 flex flex-col gap-5 shadow-[4px_4px_0px_#1b1b1b]`}
      >
        <div className="flex items-center justify-between border-b-2 border-text pb-3">
          <h2 className="font-bold font-heading text-2xl sm:text-3xl text-text tracking-tight capitalize">
            {status}
          </h2>
          <span className="bg-bg text-text font-body text-xs font-semibold px-3 py-1 rounded-full border border-text">
            {cards.length} cards
          </span>
        </div>
        <div className="card-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <Card data={card} key={card.id}></Card>
          ))}
        </div>
      </div>
    </section>
  );
}
