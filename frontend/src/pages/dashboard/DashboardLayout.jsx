import { useState } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { HiViewGridAdd } from "react-icons/hi"
import { MdOutlineManageHistory } from "react-icons/md"

const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <section className="flex min-h-screen overflow-hidden md:bg-gray-100">
      <aside
        className={`${isMobileMenuOpen ? "block" : "hidden"} fixed inset-y-0 left-0 z-50 w-20 sm:relative sm:flex sm:flex-col`}
      >
        <a
          href="/"
          className="inline-flex items-center justify-center w-20 h-20 bg-purple-600 hover:bg-purple-500 focus:bg-purple-500"
        >
          <img src="/fav-icon.png" alt="" />
        </a>
        <div className="flex flex-col justify-between flex-grow text-gray-500 bg-gray-800">
          <nav className="flex flex-col mx-4 my-6 space-y-4">
            <Link
              to="/dashboard/manage-orders"
              href="#"
              className="inline-flex items-center justify-center py-3 rounded-lg hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700"
            >
              <span className="sr-only">Folders</span>
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center py-3 text-purple-600 bg-white rounded-lg"
            >
              <span className="sr-only">Dashboard</span>
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </Link>
            <Link
              to="/dashboard/add-new-book"
              className="inline-flex items-center justify-center py-3 rounded-lg hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700"
            >
              <span className="sr-only">Add Book</span>
              <HiViewGridAdd className="w-6 h-6" />
            </Link>
            <Link
              to="/dashboard/manage-books"
              className="inline-flex items-center justify-center py-3 rounded-lg hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700"
            >
              <span className="sr-only">Documents</span>
              <MdOutlineManageHistory className="w-6 h-6" />
            </Link>
          </nav>
          <div className="inline-flex items-center justify-center w-20 h-20 border-t border-gray-700">
            <button className="p-3 rounded-lg hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700">
              <span className="sr-only">Settings</span>
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </aside>
      <div className="flex-grow text-gray-800">
        <header className="flex items-center h-20 px-6 bg-white sm:px-10">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative flex-shrink-0 block p-2 mr-2 text-gray-600 rounded-full sm:hidden hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800"
          >
            <span className="sr-only">Menu</span>
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>
          <div className="relative w-full max-w-md sm:-ml-2">
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="absolute h-6 w-6 mt-2.5 ml-2 text-gray-400"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              role="search"
              placeholder="Search..."
              className="w-full py-2 pl-10 pr-4 placeholder-gray-400 border-4 border-transparent rounded-lg focus:bg-gray-50"
            />
          </div>
          <div className="flex items-center flex-shrink-0 ml-auto">
            <button className="inline-flex items-center p-2 rounded-lg hover:bg-gray-100 focus:bg-gray-100">
              <span className="sr-only">User Menu</span>
              <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
                <span className="font-semibold">Admin</span>
                <span className="text-sm text-gray-600">Chủ cửa hàng</span>
              </div>
              <span className="w-12 h-12 ml-2 mr-2 overflow-hidden bg-gray-100 rounded-full sm:ml-3">
                <img
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                  alt="user profile photo"
                  className="object-cover w-full h-full"
                />
              </span>
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="hidden w-6 h-6 text-gray-300 sm:block"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="pl-3 ml-3 space-x-1 border-l">
              <button className="relative p-2 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600">
                <span className="sr-only">Notifications</span>
                <span className="absolute top-0 right-0 w-2 h-2 mt-1 mr-2 bg-red-500 rounded-full"></span>
                <span className="absolute top-0 right-0 w-2 h-2 mt-1 mr-2 bg-red-500 rounded-full animate-ping"></span>
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              <button
                onClick={handleLogout}
                className="relative p-2 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600"
              >
                <span className="sr-only">Log out</span>
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>
          </div>
        </header>
        <main className="p-6 space-y-6 sm:p-10">
          <div className="flex flex-col justify-between space-y-6 md:space-y-0 md:flex-row">
            <div className="mr-6">
              <h1 className="mb-2 text-4xl font-semibold">Dashboard</h1>
              <h2 className="text-gray-600 ml-0.5">Thông tin cửa hàng sách QTBooks</h2>
            </div>
            <div className="flex flex-col items-start justify-end -mb-3 md:flex-row">
              <Link
                to="/dashboard/manage-books"
                className="inline-flex px-5 py-3 mb-3 text-purple-600 border border-purple-600 rounded-md hover:text-purple-700 focus:text-purple-700 hover:bg-purple-100 focus:bg-purple-100"
              >
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                Quản lý sách
              </Link>
              <Link
                to="/dashboard/add-new-book"
                className="inline-flex px-5 py-3 mb-3 ml-6 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:bg-purple-700"
              >
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="flex-shrink-0 w-6 h-6 mr-2 -ml-1 text-white"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Thêm sách mới
              </Link>
            </div>
          </div>
          <Outlet />
        </main>
      </div>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 sm:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </section>
  )
}

export default DashboardLayout

