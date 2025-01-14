// import React from 'react'
import { FiShoppingCart } from "react-icons/fi"
import { useParams } from "react-router-dom"
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi'
import { getImgUrl } from '../../utils/getImgUrl'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'

const SingleBook = () => {
  const {id} = useParams()
  const { data, isLoading, isError } = useFetchBookByIdQuery(id)
  const book = data?.book
  const dispatch = useDispatch()

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }

  if (isLoading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  if (isError) return <div className="flex items-center justify-center min-h-screen text-red-500">Lỗi khi tải trang thông tin sách</div>

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
        <div className="p-8">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">{book.title}</h1>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <img
                src={`${getImgUrl(book.coverImage)}`}
                alt={book.title}
                className="object-cover w-full rounded-lg shadow-md"
              />
            </div>

            <div className="space-y-24">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-700">Tác giả:</span>
                  <span className="text-gray-600">{book.author || 'admin'}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-700">Sản xuất:</span>
                  <span className="text-gray-600">
                    {new Date(book?.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-700">Loại:</span>
                  <span className="text-gray-600 capitalize">{book?.category}</span>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <span className="font-semibold text-gray-700">Mô tả:</span>
                  <p className="mt-2 leading-relaxed text-gray-600">
                    {book.description}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleAddToCart(book)}
                className="flex items-center justify-center w-full px-6 py-3 space-x-2 font-semibold text-gray-900 transition duration-200 bg-yellow-400 rounded-lg hover:bg-yellow-500"
              >
                <FiShoppingCart className="text-xl" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleBook

