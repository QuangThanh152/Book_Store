import { useState, useMemo, useEffect } from "react"
import { Link } from "react-router-dom"
import { useDeleteBookMutation, useFetchAllBooksQuery } from "../../../redux/features/books/booksApi"
import { getImgUrl } from "../../../utils/getImgUrl"
import { Pencil, Trash2, Search } from "lucide-react"

const ManageBook = () => {
  const { data: response, refetch } = useFetchAllBooksQuery()
  const books = response?.books || []
  const [deleteBook] = useDeleteBookMutation()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [priceFilter, setPriceFilter] = useState("all")

  useEffect(() => {
    refetch()
  }, [refetch]) // Added refetch to the dependency array

  const handleDeleteBook = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa cuốn sách này?")) {
      try {
        await deleteBook(id).unwrap()
        alert("Xóa sách thành công")
        refetch()
      } catch (error) {
        console.log(error)
        alert("Xóa sách thất bại")
      }
    }
  }

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "all" || book.category === categoryFilter
      const matchesPrice =
        priceFilter === "all" ||
        (priceFilter === "under10" && book.newPrice < 10) ||
        (priceFilter === "10to20" && book.newPrice >= 10 && book.newPrice <= 20) ||
        (priceFilter === "over20" && book.newPrice > 20)

      return matchesSearch && matchesCategory && matchesPrice
    })
  }, [books, searchTerm, categoryFilter, priceFilter])

  const uniqueCategories = useMemo(() => {
    return ["all", ...new Set(books.map((book) => book.category))]
  }, [books])

  if (!books) {
    return <div className="flex items-center justify-center h-screen">Đang tải...</div>
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <select
          className="w-full px-3 py-2 text-sm bg-white border rounded-md md:w-auto focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">Tất cả thể loại</option>
          {uniqueCategories.map(
            (category, index) =>
              category !== "all" && (
                <option key={index} value={category}>
                  {category}
                </option>
              ),
          )}
        </select>

        <select
          className="w-full px-3 py-2 text-sm bg-white border rounded-md md:w-auto focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="all">Tất cả giá</option>
          <option value="under10">Dưới $10</option>
          <option value="10to20">$10 - $20</option>
          <option value="over20">Trên $20</option>
        </select>

        <div className="relative flex-grow">
          <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tiêu đề"
            className="w-full px-3 py-2 pl-10 text-sm bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">#</th>
              <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Sách</th>
              <th className="hidden px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase md:table-cell">
                Thể loại
              </th>
              <th className="hidden px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase md:table-cell">
                Giá
              </th>
              <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBooks.map((book, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{index + 1}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-12 h-16">
                      <img
                        className="object-cover w-12 h-16 rounded"
                        src={getImgUrl(book.coverImage) || "/placeholder.svg"}
                        alt={book.title}
                        onError={(e) => {
                          e.currentTarget.onerror = null
                          e.currentTarget.src = getImgUrl("placeholder.png")
                        }}
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{book.title}</div>
                      <div className="text-sm text-gray-500 md:hidden">
                        {book.category} - ${book.newPrice}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="hidden px-4 py-3 text-sm text-gray-900 md:table-cell">{book.category}</td>
                <td className="hidden px-4 py-3 text-sm text-gray-900 md:table-cell">${book.newPrice}</td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex space-x-3">
                    <Link to={`/dashboard/edit-book/${book._id}`} className="text-blue-600 hover:text-blue-900">
                      <Pencil className="w-5 h-5" />
                    </Link>
                    <button onClick={() => handleDeleteBook(book._id)} className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageBook

