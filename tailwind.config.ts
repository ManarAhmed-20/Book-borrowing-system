import type { Config } from 'tailwindcss'

const config: Config = {
  // 1. هذا هو السطر الأهم لحل مشكلة الخلفية
  darkMode: 'class', 
  
  // 2. تأكد أن هذه المسارات صحيحة
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // يمكنك إضافة أي theme مخصص هنا
    },
  },
   plugins: [
   require('tailwindcss-animate'), // <--- هذا هو السطر الصحيح
 ],
}
export default config