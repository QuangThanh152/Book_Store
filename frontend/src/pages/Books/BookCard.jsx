import { TbShoppingCartStar } from "react-icons/tb";
import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";

const BookCard = ({book}) => {
    return (
        <div className="transition-shadow duration-300 rounded-lg ">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:h-72 sm:justify-center">
                <div className="border rounded-md sm:h-72 sm:flex-shrink-0">
                    <Link to={`/books/${book._id}`}>
                        <img src={`${getImgUrl(book?.coverImage)}`} 
                        alt="" 
                        className="w-full p-2 transition-all duration-200 bg-cover rounded-md cursor-pointer hover:scale-105"     
                    />
                    </Link>
                </div>

                <div>
                    <Link to={`/books/${book._id}`}>
                        <h3 className="mb-3 text-xl font-semibold hover:text-blue-600">
                            {book?.title}
                        </h3>
                    </Link>
                    <p className="mb-5 text-gray-600">{book?.description.length > 80 ? `${book.description.slice(0, 80)}...` : book.description}</p>
                    <p className="mb-5 font-medium">
                        $ {book?.oldPrice } <span className="ml-2 font-normal line-through">$ {book?.newPrice}</span>
                    </p>
                    <button className="flex items-center gap-1 px-6 space-x-1 btn-primary ">
                        <TbShoppingCartStar className="" />
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookCard