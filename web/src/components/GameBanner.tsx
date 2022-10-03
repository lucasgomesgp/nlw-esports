interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
  indexSlide: number;
}

export function GameBanner({
  bannerUrl,
  title,
  adsCount,
  indexSlide,
}: GameBannerProps) {
  return (
    <a
      href=""
      className={`relative rounded-lg overflow-hidden min-w-[180px] keen-slider__slide number-slide${indexSlide}`}
    >
      <img src={bannerUrl} alt="" className="tablet:h-[200px] tablet:w-[280px]" />
      <div className="pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0 max-w-[285px] rounded-lg">
        <strong className="font-bold text-white block tablet:text-xs">{title}</strong>
        <span className="text-zinc-300 text-sm block tablet:text-xs">
          {adsCount} anúncio(s)
        </span>
      </div>
    </a>
  );
}
