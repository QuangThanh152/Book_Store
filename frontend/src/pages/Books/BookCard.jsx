import { TbShoppingCartStar } from "react-icons/tb";
import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  // tính % giảm giá product
  const discountPercentage = Math.round(
    ((book.oldPrice - book.newPrice) / book.oldPrice) * 100
  );

  return (
    <div className="p-4 transition-shadow duration-300 bg-white border rounded-lg shadow-md hover:shadow-lg">

      <div className="flex flex-col h-full">
        {/* Image Section */}
        <div className="flex items-center justify-center h-64">
          {discountPercentage > 0 && (
            <div className="absolute z-10 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full top-2 left-2">
              -{discountPercentage}% OFF
            </div>
          )}
          <Link to={`/books/${book._id}`} className="h-full">
            <img
              src={`${getImgUrl(book?.coverImage)}`}
              alt={book?.title}
              className="object-cover w-auto h-full transition-transform duration-200 rounded-md max-h-64 hover:scale-105"
            />
          </Link>
        </div>

        {/* Content Container */}
        <div className="flex flex-col flex-grow mt-4">
          <Link to={`/books/${book._id}`}>
            <h3 className="mb-3 text-lg font-semibold text-gray-800 hover:text-blue-600">
              {book?.title}
            </h3>
          </Link>

           {/* Description */}
          <p className="flex-grow mb-3 text-sm text-gray-600">
            {book?.description.length > 80
              ? `${book.description.slice(0, 80)}...`
              : book.description}
          </p>

          {/* Price Section */}
          <p className="mb-3 font-medium ">
            <span className="text-xl font-bold text-gray-600">${book?.oldPrice}</span>{" "}
            <span className="ml-2 text-sm text-gray-500 line-through">
              ${book?.newPrice}
            </span>
          </p>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => handleAddToCart(book)}
          className="flex items-center justify-center gap-1 px-4 py-2 mt-auto text-white transition-all duration-200 rounded-md btn-primary bg-primary hover:bg-yellow-500"
        >
          <TbShoppingCartStar />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default BookCard;
