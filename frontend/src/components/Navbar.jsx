import { Link } from "react-router-dom";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { IoSearchSharp } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi2";
import { TbShoppingCartStar } from "react-icons/tb";

import avataImg from "../assets/avatar.png";
import { useState } from "react";
import { useSelector } from "react-redux";


const navigation = [
    {
        name: "Dashboard",
        href: "/dashboard",
    },
    {
        name: "Orders",
        href: "/orders",
    },
    {
        name: "Cart Page",
        href: "/cart",
    },
    {
        name: "Check out",
        href: "/checkout",
    },
];

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const cartItems = useSelector(state => state.cart.cartItems);
    console.log(cartItems)
    // console.log(isDropdownOpen)

    // false là chưa login, true là đã login
    const currentUser = false;
    return (
        <header className="px-4 py-6 mx-auto max-w-screen-2xl">
            <nav className="flex items-center justify-between">
                {/* left slide */}
                <div className="flex items-center gap-4 md:gap-16">
                    <Link to="/">
                        <HiMiniBars3CenterLeft className="size-6" />
                    </Link>

                    {/* ô tìm kiếm */}
                    <div className="relative w-40 space-x-2 sm:w-72">
                        <IoSearchSharp className="absolute inline-block left-3 inset-y-2" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm"
                            className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
                        />
                    </div>
                </div>

                {/* right slide */}

                <div className="relative flex items-center space-x-2 md:space-x-3">
                    {/* User */}
                    <div>
                        {currentUser ? (
                            <>
                                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                    <img
                                        src={avataImg}
                                        alt="Avata"
                                        className={`size-7 rounded-full ${currentUser ? "ring-2 ring-blue-500" : ""
                                            }`}
                                    />
                                </button>
                                {/* xu ly hien dropdown */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 z-40 w-48 mt-2 bg-white rounded-md shadow-lg">
                                        <ul className="py-2">
                                            {navigation.map((item) => (
                                                <li key={item.name} onClick={()=> setIsDropdownOpen(false) }>
                                                    <Link
                                                        to={item.href}
                                                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link to="/login">
                                <HiOutlineUser className="size-6" />
                            </Link>
                        )}
                    </div>

                    <button className="hidden sm:block">
                        <HiOutlineHeart className="size-6" />
                    </button>

                    <Link
                        to="/cart"
                        className="flex items-center p-1 py-2 rounded-sm bg-primary sm:px-6"
                    >
                        <TbShoppingCartStar />
                        <span className="text-sm font-semibold sm:ml-1">0</span>
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;