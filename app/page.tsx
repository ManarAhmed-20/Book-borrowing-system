import Link from 'next/link';
import Image from 'next/image';
import FeaturedBookSlider from '@/components/FeaturedBookSlider';
import { allBooks } from '@/data/books';


const featuredBooks = allBooks.slice(0, 3).map(book => ({
  id: book.id,
  title: book.title,
  author: book.author,
  imageUrl: book.imageUrl,
  description: book.description,
  category: book.category,
}));


const categories = [...new Set(allBooks.map(book => book.category))];

export default function HomePage() {
  return (
    <div className="space-y-10">

      <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 xl:py-10">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
            Your Gateway to a Universe of Stories
          </h1>
          <p className="mt-6 text-lg text-gray-300">
            Borrow, read, and return. Explore thousands of titles across all genres. Your next adventure is just a click away.
          </p>
          <Link
            href="/library"
            className="mt-8 inline-block bg-amber-500 text-black font-bold py-3 px-8 rounded-lg hover:bg-amber-600 transition-transform hover:scale-105"
          >
            Discover Books
          </Link>
        </div>
        <div className="relative w-full h-80 lg:h-96">
          <Image
            src="/images/hero-image.jpg"
            alt="Hero image with floating books"
            fill
            className="object-contain rounded-tl-[30%] rounded-br-[30%]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </section>


      <section>
        <h2 className="text-3xl font-bold mb-8 text-center md:text-left">Featured This Week</h2>
        <FeaturedBookSlider books={featuredBooks} />
      </section>


      <section>

        <h2 className="text-3xl font-bold mb-8 text-center md:text-left">Explore by Category</h2>


        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          {categories.map(category => (
            <Link
              key={category}
              href={`/library?category=${encodeURIComponent(category)}`}
              className="bg-gray-800 hover:bg-amber-500 hover:text-black py-2 px-5 rounded-full transition-colors"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}