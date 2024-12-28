import React from 'react'
import footerLogo  from "../assets/footer-logo.png"

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="px-4 py-10 text-white bg-gray-900">
      {/* Top Section */}
      <div className="container flex flex-col items-center justify-between gap-8 mx-auto md:flex-row">
        {/* Left Side - Logo and Nav */}
        <div className="w-full md:w-1/2">
          <img src={footerLogo} alt="Logo" className="mb-5 w-36" />
          <ul className="flex flex-col gap-4 md:flex-row">
            <li><a href="#home" className="hover:text-primary">Trang chủ</a></li>
            <li><a href="#services" className="hover:text-primary">Dịch vụ</a></li>
            <li><a href="#about" className="hover:text-primary">Về chúng tôi</a></li>
            <li><a href="#contact" className="hover:text-primary">Liên hệ</a></li>
          </ul>
        </div>

        {/* Right Side - Newsletter */}
        <div className="w-full md:w-1/2">
          <p className="mb-4">
            Đăng ký nhận bản tin của chúng tôi để nhận các bản cập nhật, tin tức và ưu đãi mới nhất!
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Nhập email"
              className="w-full px-4 py-2 text-black rounded-l-md"
            />
            <button className="px-6 py-2 bg-primary rounded-r-md hover:bg-primary-dark">
              Gửi
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container flex flex-col items-center justify-between pt-6 mx-auto mt-10 border-t border-gray-700 md:flex-row">
        {/* Left Side - Privacy Links */}
        <ul className="flex gap-6 mb-4 md:mb-0">
          <li><a href="#privacy" className="hover:text-primary">Chính sách bảo mật</a></li>
          <li><a href="#terms" className="hover:text-primary">Điều khoản dịch vụ</a></li>
        </ul>

        {/* Right Side - Social Icons */}
        <div className="flex gap-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer