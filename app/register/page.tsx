import Link from 'next/link';
import Image from 'next/image';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center xl:mt-0 md:mt-0">
      <div className="flex w-full h-screen xl:h-fit max-w-5xl rounded-lg overflow-hidden shadow-2xl">


        <div className="w-full md:w-1/2 p-8 md:p-12 bg-[#121622]">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Create Your Account</h1>
            <p className="text-gray-400 mt-2">Join BookWise and start your reading journey today.</p>
          </div>

          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 block w-full bg-[#1e2333] border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full bg-[#1e2333] border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full bg-[#1e2333] border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Choose a strong password"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-amber-400 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
              >
                Create Account
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-amber-400 hover:text-amber-500">
              Login here
            </Link>
          </p>
        </div>


        <div className="hidden md:block md:w-1/2 relative">
          <Image
            src="/images/login-bg.jpg"
            alt="A collection of books"
            fill
            className="object-cover"
            sizes="50vw"
          />
        </div>

      </div>
    </div>
  );
}