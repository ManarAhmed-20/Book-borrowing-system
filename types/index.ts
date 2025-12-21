// types/index.ts

export interface LoginDto {
  email?: string;
  password?: string;
}

export interface RegisterDto {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
}

export interface AuthResponse {
  token: string;
  expiration?: string;
}

export interface ApiBook {
  id: number;
  title: string;
  author: string;
  description: string;
  totalCopies: number;
  availableCopies: number;
  categoryId: number;
  
  // ✅ التعديل هنا: إضافة الاسمين لتجنب الأخطاء
  imageUrl?: string; // الاسم القادم من الباك اند (غالباً)
  image?: string;    // الاسم المستخدم في بعض مكونات الفرونت
  
  price?: number; 
  rating?: number; 
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  borrowHistory?: any[];
  favoriteBooks?: any[];
}