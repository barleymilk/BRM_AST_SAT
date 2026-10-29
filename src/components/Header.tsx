export default function Header() {
  return (
    <header className="flex items-center justify-center w-full h-16 px-4">
      <nav>
        <ul className="flex justify-center items-center gap-6 sm:gap-16">
          <li>
            <a href="#" className="text-black font-medium hover:text-gray-600">
              portfolio
            </a>
          </li>
          <li>
            <a href="#" className="text-black font-medium hover:text-gray-600">
              blog
            </a>
          </li>
          <li>
            <a href="#" className="text-black font-medium hover:text-gray-600">
              archive
            </a>
          </li>
          <li>
            <a href="#" className="text-black font-medium hover:text-gray-600">
              about
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
