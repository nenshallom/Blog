import { Link } from 'react-router-dom';

const BrandLogo = () => {
  return (
    <Link to="/" className="flex items-center">
      <div className="flex items-center rounded-lg overflow-hidden font-bold text-sm sm:text-base md:text-lg lg:text-xl shadow transition-colors duration-300">
        <span className="pl-2 sm:pr-0 py-1 bg-[#184E59] dark:bg-green-500 text-white transition-colors duration-300">
          CodeAnd
        </span>
        <span className="pr-2  py-1 bg-green-500 dark:bg-[#184E59] text-white transition-colors duration-300">
          Cultivate
        </span>
      </div>
    </Link>
  );
};

export default BrandLogo;