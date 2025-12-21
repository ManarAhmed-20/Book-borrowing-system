'use client';

interface UserProfileProps {
  profile?: {
    id: string;
    fullName: string;
    email: string;
    borrowHistory?: any[];
    favoriteBooks?: any[];
  };
}

export default function UserProfileCard({ profile }: UserProfileProps) {
  if (!profile) {
    return (
      <div className="bg-black/60 backdrop-blur-lg border border-white/10 p-8 rounded-xl shadow-lg text-center">
        <p className="text-gray-400">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-black/60 backdrop-blur-lg rounded-xl p-5 sm:p-6 shadow-lg sticky top-24 hover:shadow-2xl transition-all border border-white/10 hover:border-gray-500 space-y-4">
      <div className="text-center">
        <div className="w-24 h-24 bg-amber-400 rounded-full mx-auto mb-4 flex items-center justify-center shadow-md">
          <span className="text-3xl font-bold text-black">{profile.fullName.charAt(0).toUpperCase()}</span>
        </div>
        <h2 className="text-2xl font-bold text-white">{profile.fullName}</h2>
        <p className="text-gray-300 text-sm">{profile.email}</p>
      </div>
      
      <div className="border-t border-white/10"></div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Borrowed Books:</span>
          <span className="font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full">
            {profile.borrowHistory?.length || 0}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Favorites:</span>
          <span className="font-bold text-red-400 bg-red-400/10 px-3 py-1 rounded-full">
            {profile.favoriteBooks?.length || 0}
          </span>
        </div>
      </div>
    </div>
  );
}