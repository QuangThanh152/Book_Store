import React from 'react'
import bannerImg from '../../assets/banner.png'
import Swal from 'sweetalert2' // Đảm bảo đã cài sweetalert2

const Banner = () => {
    const handleFollowClick = () => {
        Swal.fire({
            title: "Cảm ơn bạn đã theo dõi!",
            width: 600,
            padding: "3em",
            color: "#716add",
            background: "#fff url(/trees.png)", // Hình nền
            backdrop: `
                    rgba(0,0,123,0.4)
                    url("/Pion-unscreen.gif")
                    left top
                    no-repeat
                `,
            text: "Chúng tôi sẽ cung cấp thông tin mới nhất đến bạn ngay khi có cập nhật.",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Ok",
        });
    };

    return (
        <div className='flex flex-col items-center justify-between gap-12 py-16 md:flex-row-reverse'>
            {/* right dao nguoc */}
            <div className='flex items-center w-full md:w-1/2 md:justify-end drop-shadow-xl'>
                <img src={bannerImg} alt='bannerImg' />
            </div>

            {/* Left */}
            <div className='w-full md:w-1/2'>
                <h1 className='text-2xl font-medium md:text-5xl mb-7'>Tạp Chí Thế Giới</h1>
                <p className='mb-10'>
                    Trang tin tức mới nhất, cập nhật liên tục 24/7 về thời sự, kinh tế, giải trí, công nghệ, thể thao, đời sống, sức khỏe và nhiều lĩnh vực hấp dẫn khác, mang đến thông tin chính xác, nhanh chóng, đầy đủ và hữu ích nhất mỗi ngày.
                </p>

                <button onClick={handleFollowClick} className='btn-primary'>
                    Theo dõi
                </button>
            </div>
        </div>
    )
}

export default Banner
