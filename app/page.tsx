'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FeaturedBookSlider from '@/components/FeaturedBookSlider';
import { bookService } from '@/services/bookService';
import { categoryService, Category } from '@/services/categoryService';
import { ApiBook } from '@/types';

export default function HomePage() {
  const [featuredBooks, setFeaturedBooks] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksData, categoriesData] = await Promise.all([
          bookService.getAll(),
          categoryService.getAll()
        ]);

        const formattedForSlider = booksData.slice(0, 5).map((book: ApiBook) => {
          const rawUrl = (book as any).imageUrl;
          let resolvedImage = '/images/placeholder.jpg';
          
          if (rawUrl) {
            if (rawUrl.startsWith('http')) {
              resolvedImage = rawUrl;
            } else {
              const filename = rawUrl.split('/').pop();
              if (filename) resolvedImage = `/images/${filename}`;
            }
          }

          return {
            id: book.id.toString(),
            title: book.title,
            author: book.author,
            imageUrl: resolvedImage,
            description: book.description,
            category: book.categoryId.toString(),
          };
        });

        setFeaturedBooks(formattedForSlider);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-24">
      <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
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
        <div className="relative w-full h-80 lg:h-96 hidden md:block">
          <Image
            src="/images/hero-image.jpg"
            alt="Hero image"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="
              object-contain 
              md:rounded-none 
              md:shadow-none
              lg:rounded-tl-[30%] lg:rounded-br-[30%]
              lg:shadow-[0_0_30px_5px_rgba(250,204,21,0.5)]
            "
            priority
          />
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8 text-center md:text-left">Featured This Week</h2>
        {loading ? <div className="text-gray-400">Loading...</div> : <FeaturedBookSlider books={featuredBooks} />}
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8 text-center md:text-left">Explore by Category</h2>

        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          {loading ? (
            <p>Loading categories...</p>
          ) : categories.length > 0 ? (
            categories.map(category => (
              <Link
                key={category.id}
                href={`/library?categoryId=${category.id}`}
                className="
                  bg-black/20 backdrop-blur-md border border-white/30 shadow-lg
                  rounded-full py-3 px-6 text-sm font-medium
                  hover:shadow-xl hover:bg-amber-500 hover:text-black hover:border-amber-500
                  transition-all duration-300
                "
              >
                {category.name}
              </Link>
            ))
          ) : (
            <p>No categories found.</p>
          )}
        </div>
      </section>
    </div>
  );
}