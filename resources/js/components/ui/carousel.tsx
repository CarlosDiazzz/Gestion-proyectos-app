import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';

interface CarouselProps {
    items: React.ReactNode[];
}

export const Carousel: React.FC<CarouselProps> = ({ items }) => {
    const [emblaRef] = useEmblaCarousel();

    return (
        <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
                {items.map((item, index) => (
                    <div className="flex-[0_0_100%] min-w-0" key={index}>
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
};
