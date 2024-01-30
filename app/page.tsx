export default function Home() {
  // to do: use framer motion for animations
  return (
    <main className="min-h-screen p-24">
      <div className="flex">
        <div className="text-xl mr-1">[</div>
        <div className="text-xl w-[22px]" style={{ transform: `translate(0px, 0px)` }}>10</div>
        <div className="text-xl mr-1">,</div>
        <div className="text-xl w-[22px]" style={{ transform: `translate(32px, 0px)` }}>8</div>
        {/* <div className="text-xl mr-1">,</div>
        <div className="text-xl">9</div>
        <div className="text-xl mr-1">,</div>
        <div className="text-xl">5</div>
        <div className="text-xl mr-1">,</div>
        <div className="text-xl">3</div>
        <div className="text-xl mr-1">,</div>
        <div className="text-xl">2</div>
        <div className="text-xl mr-1">,</div>
        <div className="text-xl">1</div> */}
        <div className="text-xl ml-1">]</div>
      </div>
      <div className="mt-4 cursor-pointer rounded-lg bg-sky-400 w-fit py-2 px-5 text-white">bubble sort</div>
    </main>
  );
}
