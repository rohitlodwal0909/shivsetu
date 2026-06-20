import { GiTempleGate, GiPrayerBeads, GiMeditation, GiLotus } from 'react-icons/gi';
import { FaCar } from 'react-icons/fa';

export const getTypeIcon = (type) => {
  switch (type) {
    case 'shop':
      return <GiTempleGate className="text-orange-500 text-xl" />; 
    case 'puja':
      return <GiPrayerBeads className="text-yellow-500 text-xl" />; 
    case 'tour':
      return <GiMeditation className="text-purple-500 text-xl" />; 
    case 'cab':
      return <FaCar className="text-green-500 text-xl" />; 
    default:
      return <GiLotus className="text-pink-500 text-xl" />; // 🌸 fallback lotus
  }
};
