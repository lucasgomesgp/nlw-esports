import { useEffect, useState } from "react";
import logoImg from "./assets/logo-nlw-esports.svg";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { GameBanner } from "./components/GameBanner";
import * as Dialog from "@radix-ui/react-dialog";
import { CreateAdModal } from "./components/CreateAdModal";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import { CaretLeft, CaretRight } from "phosphor-react";
import "keen-slider/keen-slider.min.css";
import "./styles/main.css";

interface Game {
  id: string;
  bannerUrl: string;
  title: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  let index = 0;

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    mode: "free-snap",
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    slides: { perView: 5, spacing: 10 },
  });
  useEffect(() => {
    axios("http://localhost:3333/games").then((response) =>
      setGames(response.data)
    );
  }, []);
  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20 overflow-hidden">
      <img src={logoImg} alt="Logo" />
      <h1 className="text-6xl text-white font-black mt-20 text-center">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text ">
          duo
        </span>{" "}
        está aqui.
      </h1>
      <div
        className=" mt-16 max-w-[90%] flex justify-center relative"
      >
        <div className="keen-slider max-w-[90%] gap-6"
        ref={sliderRef}
        >
          {games.map((game) => {
            index += 1;
            return (
              <GameBanner
                key={game.id}
                bannerUrl={game.bannerUrl}
                title={game.title}
                adsCount={game._count.ads}
                indexSlide={index}
              />
            );
          })}
        </div>
        {/* {games.length > 0 && loaded && instanceRef.current && (
          <>
            <button
              className="absolute left-0 top-20 cursor-pointer "
              onClick={(event) =>
                event.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            >
              <CaretLeft size={42} className="text-white" />
            </button>
            <button
              className="absolute right-0 top-20 cursor-pointer"
              onClick={(event) =>
                event.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide === instanceRef.current.track.details.length - 1
              }
            >
              <CaretRight size={42} className="text-white" />
            </button>
          </>
        )} */}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
