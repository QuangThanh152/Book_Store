// import React from 'react'
import bannerImg from '../../assets/banner.png'

const Banner = () => {
  return (
    <div className='flex flex-col items-center justify-between gap-12 py-16 md:flex-row-reverse'>

        {/* right dao nguoc */}
        <div className='flex items-center w-full md:w-1/2 md:justify-end drop-shadow-xl'>
            <img src={bannerImg} alt='bannerImg' />
        </div>

        {/* Left */}
        <div className='w-full md:w-1/2'>
           <h1 className='text-2xl font-medium md:text-5xl mb-7'>Tạp Chí Thế Giới</h1>
           <p className='mb-10'>Trang tin tức mới nhất, cập nhật liên tục 24/7 về thời sự, kinh tế, giải trí, công nghệ, thể thao, đời sống, sức khỏe và nhiều lĩnh vực hấp dẫn khác, mang đến thông tin chính xác, nhanh chóng, đầy đủ và hữu ích nhất mỗi ngày.</p>

           <button className='btn-primary'>Theo dõi</button>
        </div>

    </div>
  )
}

export default Banner