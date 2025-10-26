import Image from 'next/image';

const UserProfileCard = () => {
  const user = {
    name: 'manar',
    email: 'manar@gmail.com',
    avatarUrl: '/images/m.jpg',
  };

  return (
    <div className="bg-[#1e2333] rounded-2xl p-6 relative shadow-lg">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-12 h-8 bg-gray-600 rounded-t-lg"></div>

      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <Image
          src={user.avatarUrl}
          alt={user.name}
          width={80}
          height={80}
          className="rounded-full border-4 border-gray-700"
        />
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-white mt-1">{user.name}</h2>
          <p className="text-gray-400 text-sm">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;