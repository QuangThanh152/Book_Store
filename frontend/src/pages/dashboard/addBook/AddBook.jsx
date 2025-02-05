import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAddBookMutation } from "../../../redux/features/books/booksApi";
import Swal from "sweetalert2";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";

const AddBook = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const [imageFile, setimageFile] = useState(null);
    const [imageFileName, setimageFileName] = useState("");
    const [addBook, { isLoading, isError }] = useAddBookMutation();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const newBookData = {
            ...data,
            coverImage: imageFileName,
        };
        try {
            await addBook(newBookData).unwrap();
            Swal.fire({
                title: "Book added",
                text: "Your book is uploaded successfully!",
                icon: "success",
                // showCancelButton: true,
                confirmButtonColor: "#3085d6",
                // cancelButtonColor: "#d33",
                confirmButtonText: "Okay!",
            });
            reset();
            setimageFileName("");
            setimageFile(null);
            navigate("/dashboard/manage-books"); // Chuyển hướng sau khi Thêm
        } catch (error) {
            console.error(error);
            alert("Failed to add book. Please try again.");
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setimageFile(file);
            setimageFileName(file.name);
        }
    };

    if (isLoading) return <Loading />;
    if (isError) return <div>Lỗi khi Thêm sách!</div>;
    return (
        <div className="max-w-lg p-3 mx-auto bg-white rounded-lg shadow-md md:p-6">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">Thêm sách mới</h2>

            {/* Form starts here */}
            <form onSubmit={handleSubmit(onSubmit)} className="">
                {/* Reusable Input Field for Title */}
                <InputField
                    label="Tiêu đề"
                    name="title"
                    placeholder="Thêm Tiêu đề..."
                    register={register}
                />

                {/* Reusable Textarea for Description */}
                <InputField
                    label="Miêu tả"
                    name="description"
                    placeholder="Miêu tả sách..."
                    type="textarea"
                    register={register}
                />

                {/* Reusable Select Field for Category */}
                <SelectField
                    label="Thể loại"
                    name="category"
                    options={[
                        { value: "", label: "Vui lòng chọn 1 thể loại" },
                        { value: "business", label: "Business" },
                        { value: "technology", label: "Technology" },
                        { value: "fiction", label: "Fiction" },
                        { value: "horror", label: "Horror" },
                        { value: "adventure", label: "Adventure" },
                        // Add more options as needed
                    ]}
                    register={register}
                />

                {/* Trending Checkbox */}
                <div className="mb-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            {...register("trending")}
                            className="text-blue-600 rounded focus:ring focus:ring-offset-2 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm font-semibold text-gray-700">
                            Trending
                        </span>
                    </label>
                </div>

                {/* Old Price */}
                <InputField
                    label="Giá"
                    name="oldPrice"
                    type="number"
                    placeholder="Thêm giá..."
                    register={register}
                />

                {/* New Price */}
                <InputField
                    label="Giá Sale"
                    name="newPrice"
                    type="number"
                    placeholder="Thêm giá sale..."
                    register={register}
                />

                {/* Cover Image Upload */}
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                        Chọn ảnh bìa
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full mb-2"
                    />
                    {imageFileName && (
                        <p className="text-sm text-gray-500">Selected: {imageFileName}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-2 font-bold text-white bg-green-500 rounded-md"
                >
                    {isLoading ? (
                        <span className="">Đang thêm... </span>
                    ) : (
                        <span>Thêm sách</span>
                    )}
                </button>
            </form>
        </div>
    );
};

export default AddBook;
