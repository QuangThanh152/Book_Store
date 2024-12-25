import { useEffect, useRef, useState } from 'react'
import BookCard from '../Books/BookCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Autoplay , Navigation} from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const Recommened = () => {
    const [books, setBooks] = useState([]);

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
  return (
    <div className='py-16'>
        <h2 className='mb-6 text-3xl font-semibold'>Đề xuất</h2>

                    {/* xử lý thanh cuộn ngang */}
                    <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                autoplay={{
                    delay: 3000,
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
                books.length > 0 && books.slice(8, 19).map((book, index) => (
                    <SwiperSlide key={index}> 
                        <BookCard key={index} book={book} />
                    </SwiperSlide>
                ))
            }
            </Swiper>
    </div>
  )
}

export default Recommened