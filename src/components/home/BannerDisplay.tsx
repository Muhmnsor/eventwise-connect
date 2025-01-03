import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

interface BannerDisplayProps {
  desktopImage: string;
  mobileImage: string;
  isMobile: boolean;
}

export const BannerDisplay = ({ desktopImage, mobileImage, isMobile }: BannerDisplayProps) => {
  const defaultImage = "/placeholder.svg";
  const displayImage = isMobile 
    ? (mobileImage || desktopImage || defaultImage)
    : (desktopImage || mobileImage || defaultImage);

  return (
    <div className="w-full rounded-2xl bg-gray-100 overflow-hidden shadow-lg">
      <Carousel className="w-full">
        <CarouselContent>
          <CarouselItem className="w-full">
            <img
              src={displayImage}
              alt="Banner"
              className="w-full object-cover h-[180px] md:h-[250px]"
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};