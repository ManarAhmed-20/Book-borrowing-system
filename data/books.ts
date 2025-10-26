export interface Book {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  rating: number;
  availableCopies: number;
  price: number; 
  description: string;
  category: string;
}
export const allBooks: Book[] = [
  {
    id: '1',
    title: 'Origin',
    author: 'Dan Brown',
    imageUrl: '/images/image.jpg',
    rating: 4.5,
    availableCopies: 42,
    price: 7.99,
    description:
      'The fifth installment in the Robert Langdon series, following previous bestsellers such as The Da Vinci Code & Angels & Demons.',
    category: 'Thriller'
  },
  {
    id: '2',
    title: 'The Maidens',
    author: 'Alex Michaelides',
    imageUrl: '/images/image-1.jpg',
    rating: 4.1,
    availableCopies: 15,
    price: 6.99,
    description:
      'A gripping tale of psychological suspense, weaving together Greek mythology, murder, and obsession.',
    category: 'Thriller'
  },

  // Category: Horror
  {
    id: '3',
    title: "Gerald's Game",
    author: 'Stephen King',
    imageUrl: '/images/image-2.jpg',
    rating: 4.3,
    availableCopies: 0, 
    price: 5.99,
    description:
      'A woman accidentally kills her husband during a sex game. Handcuffed to the bed, she is left to fight for her life and sanity.',
    category: 'Horror'
  },
  {
    id: '4',
    title: 'The Haunting of Hill House',
    author: 'Shirley Jackson',
    imageUrl: '/images/image-3.jpg',
    rating: 4.2,
    availableCopies: 20,
    price: 6.49,
    description:
      'Four seekers arrive at a notoriously unfriendly pile called Hill House: Dr. Montague, an occult scholar; Theodora, his lighthearted assistant; Eleanor, a friendless, fragile young woman; and Luke, the future heir of Hill House.',
    category: 'Horror'
  },

  {
    id: '5',
    title: 'Dune',
    author: 'Frank Herbert',
    imageUrl: '/images/image-4.jpg',
    rating: 4.8,
    availableCopies: 30,
    price: 8.99,
    description:
      'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange.',
    category: 'Science Fiction'
  },
  {
    id: '6',
    title: 'The Three-Body Problem',
    author: 'Cixin Liu',
    imageUrl: '/images/image-5.jpg',
    rating: 4.6,
    availableCopies: 10,
    price: 7.99,
    description:
      "Set against the backdrop of China's Cultural Revolution, a secret military project sends signals into space to establish contact with aliens. An alien civilization on the brink of destruction captures the signal and plans to invade Earth.",
    category: 'Science Fiction'
  },


  {
    id: '7',
    title: 'The Name of the Wind',
    author: 'Patrick Rothfuss',
    imageUrl: '/images/image-6.jpg',
    rating: 4.7,
    availableCopies: 25,
    price: 8.49,
    description:
      "The book chronicles the life of Kvothe, an adventurer and musician, as he recounts his life's story to a scribe.",
    category: 'Fantasy'
  },
  {
    id: '8',
    title: 'A Game of Thrones',
    author: 'George R.R. Martin',
    imageUrl: '/images/image-7.jpg',
    rating: 4.9,
    availableCopies: 50,
    price: 9.99,
    description:
      'In a land where summers span decades and winters can last a lifetime, trouble is brewing. The Starks of Winterfell are a family as harsh and unyielding as the land they were raised in.',
    category: 'Fantasy'
  },

  {
    id: '9',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    imageUrl: '/images/image-8.jpg',
    rating: 4.7,
    availableCopies: 100,
    price: 4.99,
    description:
      'The story of Elizabeth Bennet, a strong-willed young woman, and her tumultuous relationship with the proud Mr. Darcy.',
    category: 'Romance'
  },
  {
    id: '10',
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    imageUrl: '/images/image-9.jpg',
    rating: 4.6,
    availableCopies: 0,
    price: 7.99,
    description:
      'Reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life. But when she chooses unknown magazine reporter Monique Grant for the job, no one is more astounded than Monique herself.',
    category: 'Romance'
  }
];
