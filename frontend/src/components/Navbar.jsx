import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi2";
import { TbShoppingCartStar } from "react-icons/tb";
import { IoSearchSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import avataImg from "../assets/avatar.png";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Đơn hàng", href: "/orders" },
    { name: "Giỏ hàng", href: "/cart" },
    { name: "Thanh toán", href: "/checkout" },
];

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const cartItems = useSelector(state => state.cart.cartItems);
    const { currentUser, logout } = useAuth();

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    return (
        <header className="relative px-4 py-6 mx-auto max-w-screen-2xl">
            {/* Search overlay for mobile and tablet */}
            <div 
                className={`fixed inset-x-0 top-0 z-[9999] transform bg-white shadow-lg sm:hidden transition-transform duration-200 ease-in-out ${
                    isSearchOpen ? 'translate-y-0' : '-translate-y-full'
                }`}
            >
                <div className="p-4">
                    <div className="relative flex items-center">
                        <IoSearchSharp className="absolute text-gray-400 -translate-y-1/2 left-4 top-1/2 size-5" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm"
                            className="w-full h-10 pl-12 pr-12 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoFocus
                        />
                        <button 
                            className="absolute p-1 -translate-y-1/2 rounded-full right-4 top-1/2 hover:bg-gray-200"
                            onClick={toggleSearch}
                        >
                            <IoMdClose className="text-gray-500 size-5" />
                        </button>
                    </div>
                </div>
            </div>

            <nav className="flex items-center justify-between">
                {/* Left side */}
                <div className="flex items-center gap-4 md:gap-16">
                    <Link to="/" className="flex-shrink-0">
                        <img src="../../public/logo2-removebg-preview.png" alt="Logo"/>
                    </Link>

                    {/* Search box - hidden on mobile */}
                    <div className="relative hidden w-40 space-x-2 sm:block sm:w-72">
                        <IoSearchSharp className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm"
                            className="bg-[#EAEAEA] w-full py-2 pl-10 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        />
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center space-x-2 md:space-x-4">
                    {/* Search button - visible only on mobile */}
                    <button className="sm:hidden" onClick={toggleSearch}>
                        <IoSearchSharp className="size-6" />
                    </button>
                    
                    {/* User dropdown - positioned at the end */}
                    <div className="relative flex items-center">
                        {currentUser ? (
                            <>
                                <button 
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="relative z-50 transition-transform duration-200 transform hover:scale-105 focus:outline-none"
                                >
                                    <img
                                        src={avataImg}
                                        alt="Avatar"
                                        className={`size-7 rounded-full ${
                                            currentUser ? "ring-2 ring-blue-500 hover:ring-blue-600" : ""
                                        } ${isDropdownOpen ? "scale-90" : ""}`}
                                    />
                                </button>
                                {isDropdownOpen && (
                                    <>
                                        <div 
                                            className="fixed inset-0 z-40 bg-black/20"
                                            onClick={() => setIsDropdownOpen(false)}
                                        />
                                        <div className="absolute z-50 mt-2 -translate-x-1/2 bg-white rounded-md shadow-lg w-36 left-1/2 top-full">
                                            <ul className="py-2 text-center">
                                                {navigation.map((item) => (
                                                    <li key={item.name}>
                                                        <Link
                                                            to={item.href}
                                                            className="block w-full px-4 py-2 text-sm transition-colors duration-200 hover:bg-gray-100 hover:text-blue-600"
                                                            onClick={() => setIsDropdownOpen(false)}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                                <li className="sm:hidden">
                                                    <Link
                                                        to="/wishlist"
                                                        className="flex items-center justify-center w-full px-4 py-2 text-sm transition-colors duration-200 hover:bg-gray-100 hover:text-blue-600"
                                                        onClick={() => setIsDropdownOpen(false)}
                                                    >
                                                        <HiOutlineHeart className="mr-2" />
                                                        Yêu thích
                                                    </Link>
                                                </li>
                                                <li>
                                                    <button 
                                                        onClick={handleLogout}
                                                        className="block w-full px-4 py-2 text-sm transition-colors duration-200 hover:bg-gray-100 hover:text-red-600"
                                                    >
                                                        Đăng xuất
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </>
                                )}
                            </>
                        ) : (
                            <Link 
                                to="/login"
                                className="transition-transform duration-200 hover:scale-110"
                            >
                                <HiOutlineUser className="size-6" />
                            </Link>
                        )}
                    </div>
                    
                    {/* Heart icon - hidden on mobile */}
                    <button className="hidden transition-transform duration-200 sm:block hover:scale-110 focus:outline-none">
                        <HiOutlineHeart className="size-6" />
                    </button>

                    {/* Cart */}
                    <Link
                        to="/cart"
                        className="flex items-center p-1 py-2 transition-all duration-200 rounded-sm bg-primary sm:px-6 hover:bg-primary/90 hover:scale-105 focus:outline-none"
                    >
                        <TbShoppingCartStar className="transition-transform duration-200" />
                        {cartItems.length > 0 ? (
                            <span className="text-sm font-semibold sm:ml-1 animate-bounce">
                                {cartItems.length}
                            </span>
                        ) : (
                            <span className="text-sm font-semibold sm:ml-1">0</span>
                        )}
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;

