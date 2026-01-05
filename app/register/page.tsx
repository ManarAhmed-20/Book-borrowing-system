'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      await authService.register(registerData);
      
      await login({
        email: formData.email,
        password: formData.password
      });

      router.push('/');
      
    } catch (err: any) {
      console.log("Registration/Login Error:", err.response?.data);

      let errorMsg = 'Something went wrong. Please try again.';

      if (err.response?.data) {
        const data = err.response.data;

        if (data.message) {
          errorMsg = data.message;
        }
        else if (data.errors) {
          const messages = Object.values(data.errors).flat().join('\n');
          errorMsg = messages || errorMsg;
        }
        else if (typeof data === 'string') {
          errorMsg = data;
        }
        else if (data.title) {
          errorMsg = data.title;
        }
      }

      setError(errorMsg);
      setIsLoading(false); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-5xl rounded-lg overflow-hidden shadow-2xl bg-[#121622]">
        
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Create Your Account</h1>
            <p className="text-gray-400 mt-2">Join BookWise today.</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded text-red-500 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">First Name</label>
                <input name="firstName" type="text" required onChange={handleChange} className="mt-1 block w-full bg-[#1e2333] border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-amber-500 focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Last Name</label>
                <input name="lastName" type="text" required onChange={handleChange} className="mt-1 block w-full bg-[#1e2333] border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-amber-500 focus:border-amber-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Username</label>
              <input name="username" type="text" required onChange={handleChange} className="mt-1 block w-full bg-[#1e2333] border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-amber-500 focus:border-amber-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Email</label>
              <input name="email" type="email" required onChange={handleChange} className="mt-1 block w-full bg-[#1e2333] border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-amber-500 focus:border-amber-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Phone Number</label>
              <input name="phoneNumber" type="tel" required onChange={handleChange} className="mt-1 block w-full bg-[#1e2333] border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-amber-500 focus:border-amber-500" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">Password</label>
                <input name="password" type="password" required onChange={handleChange} className="mt-1 block w-full bg-[#1e2333] border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-amber-500 focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
                <input name="confirmPassword" type="password" required onChange={handleChange} className="mt-1 block w-full bg-[#1e2333] border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-amber-500 focus:border-amber-500" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-amber-400 hover:bg-amber-500 transition-colors mt-6 disabled:opacity-50"
            >
              {isLoading ? 'Creating Account & Logging in...' : 'Sign Up'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-amber-400 hover:text-amber-500">
              Login here
            </Link>
          </p>
        </div>

        <div className="hidden md:block md:w-1/2 relative">
          <Image
            src="/images/login-bg.jpg"
            alt="Library background"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </div>
  );
}