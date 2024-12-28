import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";

const Register = () => {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const handleGoogleSignIn = () => {};
  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full max-w-sm px-8 pt-6 pb-8 mx-auto mb-4 bg-white rounded shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Đăng ký</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* nút nhập email */}
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              name="email"
              id="email"
              placeholder="Nhập email"
              className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow"
            ></input>
          </div>

          {/* nút nhập pass */}
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              name="password"
              id="password"
              placeholder="Nhập password"
              className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow"
            ></input>
          </div>

          {/* Nút nhập SĐT */}
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="phone"
            >
              SĐT
            </label>
            <input
              {...register("phone", { required: "Số điện thoại là bắt buộc" })}
              type="tel" // Thay đổi type thành "tel" để phù hợp với nhập số điện thoại
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

          {/* Nút đăng nhập */}
          <div>
            <button className="px-6 py-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none">
              Đăng ký
            </button>
          </div>

          {/* description */}
          <p className="mt-4 text-sm font-medium align-baseline">
            Bạn đã có tài khoản?
            {/* Link đăng ký tài khoản */}
            <Link to="/login" className="text-blue-500 hover:text-blue-700">
              {" "}
              Đăng nhập
            </Link>
          </p>

          {/* Google đăng nhập */}
          <div className="mt-4">
            <button
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
