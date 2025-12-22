'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { BsClockHistory } from 'react-icons/bs';

import 'swiper/css';
import 'swiper/css/effect-fade';

interface Book {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  description: string;
  category: string;
}

interface FeaturedBookSliderProps {
  books: Book[];
}

const FeaturedBookSlider = ({ books }: FeaturedBookSliderProps) => {
  return (
    <Swiper
      modules={[Autoplay, EffectFade]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
      className="w-full rounded-lg"
    >
      {books.map((book) => {
        let resolvedImage = '/images/placeholder.jpg';
        if (book.imageUrl) {
            if (book.imageUrl.startsWith('http')) {
                resolvedImage = book.imageUrl;
            } else {
                const filename = book.imageUrl.split('/').pop();
                if (filename) resolvedImage = `/images/${filename}`;
            }
        }

        return (
          <SwiperSlide key={book.id}>
            <Link href={`/book/${book.id}`}>
              <div className="flex flex-col md:flex-row items-center bg-[#FAF8F1] text-stone-800 p-6 md:p-8 lg:p-12 rounded-lg">
                
                <div className="flex-shrink-0 w-40 h-56 md:w-52 md:h-72 relative mb-6 md:mb-0 md:mr-12 shadow-lg rounded-lg">
                  <Image
                    src={resolvedImage}
                    alt={`Cover of ${book.title}`}
                    fill
                    sizes="(max-width: 768px) 160px, 208px"
                    className="object-cover rounded-lg"
                  />
                </div>

                <div className="text-center md:text-left">
                  <p className="text-md md:text-lg font-medium text-stone-700">{book.author}</p>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold my-2">{book.title}</h2>
                  <p className="text-sm md:text-base text-stone-600 leading-relaxed max-w-xl">
                    {book.description}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 bg-amber-100 text-amber-800 font-semibold py-1.5 px-3 md:py-2 md:px-4 rounded-md text-sm">
                    <BsClockHistory />
                    <span>{book.category}</span>
                  </div>
                </div>

              </div>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default FeaturedBookSlider;