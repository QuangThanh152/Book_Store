import { useEffect, useRef, useState } from 'react'
import BookCard from '../Books/BookCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Autoplay , Navigation} from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// List options
const categories = ["Chọn thể loại", "Business", "Fiction", "Horror", "Adventure", "Marketing"];

const TopSellers = () => {
    const [books, setBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Chọn thể loại");

    // khai báo để sử dụng Swiper js
    // xử lý tự động chạy qua 1 slide
    const progressCircle = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        if (progressCircle.current) {
            progressCircle.current.style.setProperty('--progress', 1 - progress);
        }
    };
    
    useEffect(() => {
        fetch("books.json")
            .then(res => res.json())
            .then((data) => setBooks(data))
    }, [])

    const filteredBooks = selectedCategory === "Chọn thể loại" ? books : books.filter(book => book.category === selectedCategory.toLowerCase());
    console.log(filteredBooks)

    return (
        <div className='py-10'>
            <h2 className='mb-6 text-3xl font-semibold'>Bán chạy nhất</h2>
            {/* xử lý lọc Giỏ sách */}
            <div className='flex items-center mb-8'>
                <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    name='category'
                    id='category'
                    className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'
                >
                    {
                        categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))
                    }
                </select>
            </div>

            {/* xử lý thanh cuộn ngang */}
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                    },
                    1180: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    }
                }}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper"
            >

            {
                filteredBooks.length > 0 && filteredBooks.map((book, index) => (
                    <SwiperSlide key={index}> 
                        <BookCard key={index} book={book} />
                    </SwiperSlide>
                ))
            }
            </Swiper>

        </div>
    )
}

export default TopSellers