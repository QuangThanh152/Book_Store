import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Register = () => {
  const [message] = useState(""); // Lưu thông báo lỗi
  const { registerUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate()


  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  // registerUser
  const onSubmit = async (data) => {
    try {
      // đăng ký thành công thì chuyển về trang login
      await registerUser(data.email, data.password);
      toast.success("Đăng ký thành công")
      navigate("/login")
    } catch (error) {
      // Xử lý lỗi từ Firebase
      if (error.code === "auth/weak-password") {
        toast.error("Mật khẩu phải có ít nhất 6 ký tự.");
      } else if (error.code === "auth/email-already-in-use") {
        toast.error("Email đã được sử dụng.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Email không hợp lệ.");
      } else {
        toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
      }
      console.log(error);
    }
  };
  

   // Đăng nhập với Google
   const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Đăng ký thành công");
      navigate("/")
    } catch (error) {
      console.error("Đăng nhập Google thất bại:", error.message);
      toast.error("Đăng nhập Google thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full max-w-sm px-8 pt-6 pb-8 mx-auto mb-4 bg-white rounded shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Đăng ký</h2>

        {/* Hiển thị thông báo lỗi */}
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
                required: "Email là bắt buộc",
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
                required: "Mật khẩu là bắt buộc",
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

          {/* Nhập số điện thoại */}
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="phone"
            >
              Số điện thoại
            </label>
            <input
              {...register("phone", { required: "Số điện thoại là bắt buộc" })}
              type="tel"
              name="phone"
              id="phone"
              placeholder="Nhập số điện thoại"
              className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow"
            />
            {errors.phone && (
              <p className="text-xs italic text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Nút đăng ký */}
          <div>
            <button
              type="submit"
              className="px-6 py-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none disabled:opacity-50"
            >
              Đăng ký
            </button>
          </div>

          {/* Điều hướng tới trang đăng nhập */}
          <p className="mt-4 text-sm font-medium align-baseline">
            Bạn đã có tài khoản?
            <Link to="/login" className="text-blue-500 hover:text-blue-700">
              {" "}
              Đăng nhập
            </Link>
          </p>

          {/* Nút đăng nhập với Google */}
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

export default Register;
