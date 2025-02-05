import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';
import { useState } from 'react';

import axios from 'axios';
import getBaseUrl from '../utils/baseURL';

const AdminLogin = () => {
    const [message] = useState("");
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [isLoading, setIsLoading] = useState(false);

    // Xử lý đăng nhập
    const onSubmit = async (data) => {
        setIsLoading(true);
        console.log(data);
        try {
            const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const auth = response.data;
            console.log(auth);
            if (auth.token) {
                  // Lưu token và chuyển hướng
                localStorage.setItem('token', auth.token);
                alert("Đăng nhập thành công!"); // Hiển thị thông báo thành công
                navigate("/dashboard"); // Chuyển hướng sau khi đăng nhập thành công

                setTimeout(() => {
                    localStorage.removeItem('token');
                    alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
                    navigate("/"); // Chuyển hướng sau khi đăng nhập thành công
                }, 3600 * 1000);
            } else {
    alert("Đăng nhập thất bại. Vui lòng thử lại.");
}

        } catch (error) {
            // Kiểm tra phản hồi lỗi chi tiết
            if (error.response && error.response.data) {
                alert(error.response.data.message || "Đăng nhập thất bại.");
            } else {
                alert("Không thể kết nối tới server. Vui lòng thử lại.");
            }
            console.error("Chi tiết lỗi:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {/* Card chứa form đăng nhập */}
            <div className="w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-lg">
                {/* Tiêu đề */}
                <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Admin Login</h2>

                {/* Hiển thị lỗi nếu có */}
                {message && <p className="mb-4 text-sm text-center text-red-500">{message}</p>}

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Input Username */}
                    <div className="mb-4">
                        <label
                            className="block mb-2 text-sm font-semibold text-gray-700"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            {...register("username", {
                                required: "Vui lòng nhập username",
                                pattern: {
                                    //   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "username không hợp lệ",
                                },
                            })}
                            type="text"
                            id="username"
                            placeholder="Nhập username"
                            className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.username && (
                            <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>
                        )}
                    </div>

                    {/* Input Password */}
                    <div className="mb-6">
                        <label
                            className="block mb-2 text-sm font-semibold text-gray-700"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            {...register("password", {
                                required: "Vui lòng nhập mật khẩu",
                                minLength: {
                                    value: 6,
                                    message: "Mật khẩu phải có ít nhất 6 ký tự",
                                },
                            })}
                            type="password"
                            id="password"
                            placeholder="Nhập mật khẩu"
                            className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.password && (
                            <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Nút Đăng nhập */}
                    <button
    type="submit"
    disabled={isLoading}
    className={`w-full px-4 py-2 text-sm font-semibold text-white rounded-lg 
    ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
>
    {isLoading ? "Đang xử lý..." : "Đăng nhập"}
</button>

                </form>
            </div>
        </div>
    );
};

export default AdminLogin;