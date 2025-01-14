import{ useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
const Login = () => {
  const [message] = useState("");
  const { loginUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  // Xử lý đăng nhập
  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      toast.success("Đăng nhập thành công!"); // Hiển thị thông báo thành công
      navigate("/"); // Chuyển hướng sau khi đăng nhập thành công
    } catch (error) {
      console.error("Chi tiết lỗi:", error); // Xem toàn bộ chi tiết lỗi
      if (error.code === "auth/user-not-found") {
        toast.error("Người dùng không tồn tại!");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Mật khẩu không đúng!");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Email không hợp lệ!");
      } else {
        toast.error("Email hoặc mật khẩu không chính xác. Vui lòng thử lại!");
      }
    }
  };


    // Đăng nhập với Google
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
       // Hiển thị thông báo thành công
      toast.success("Đăng nhập thành công!"); 
      navigate("/"); // Chuyển hướng sau khi đăng nhập thành công
    } catch (error) {
      toast.error("Đăng nhập Google thất bại. Vui lòng thử lại."); // Hiển thị lỗi nếu thất bại
      console.error("Đăng nhập Google thất bại:", error.message);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full max-w-sm px-8 pt-6 pb-8 mx-auto mb-4 bg-white rounded shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Đăng nhập</h2>

        {/* Hiển thị lỗi */}
        {message && <p className="mb-4 text-sm text-red-500">{message}</p>}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Nhập email */}
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email", {
                required: "Vui lòng nhập email",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email không hợp lệ",
                },
              })}
              type="email"
              name="email"
              id="email"
              placeholder="Nhập email"
              className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow"
            />
            {errors.email && (
              <p className="text-xs italic text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Nhập mật khẩu */}
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Mật khẩu
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
              name="password"
              id="password"
              placeholder="Nhập mật khẩu"
              className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow"
            />
            {errors.password && (
              <p className="text-xs italic text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Nút đăng nhập */}
          <div>
            <button
              type="submit"
              className="px-6 py-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none"
            >
              Đăng nhập
            </button>
          </div>

          {/* Điều hướng tới trang đăng ký */}
          <p className="mt-4 text-sm font-medium align-baseline">
            Bạn chưa có tài khoản?
            <Link to="/register" className="text-blue-500 hover:text-blue-700">
              {" "}
              Đăng ký
            </Link>
          </p>

          {/* Đăng nhập với Google */}
          <div className="mt-4">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex flex-wrap items-center justify-center w-full gap-1 px-4 py-2 font-bold text-white rounded bg-secondary hover:bg-blue-700 focus:outline-none"
            >
              <FaGoogle className="mr-2" />
              Đăng nhập bằng Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
