import React, { useEffect, useState } from "react";
import InputField from "../addBook/InputField";
import SelectField from "../addBook/SelectField";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
    useFetchBookByIdQuery,
    useUpdateBookMutation,
} from "../../../redux/features/books/booksApi";
import Loading from "../../../components/Loading";
import Swal from "sweetalert2";
import axios from "axios";
import getBaseUrl from "../../../utils/baseURL";

const EditBook = () => {
    const { id } = useParams();
    const {
        data: bookData,
        isLoading,
        isError,
        refetch,
    } = useFetchBookByIdQuery(id);
    
    const navigate = useNavigate();

    // console.log(bookData)

    const [updateBook] = useUpdateBookMutation();
    const { register, handleSubmit, setValue, reset } = useForm();

    const [imageFile, setImageFile] = useState(null);
    const [imageFileName, setImageFileName] = useState("");
    useEffect(() => {
        if (bookData?.book) {
            // Kiểm tra book tồn tại
            setValue("title", bookData.book.title || "");
            setValue("description", bookData.book.description || "");
            setValue("category", bookData.book.category || "");
            setValue("trending", bookData.book.trending || false);

            setValue("oldPrice", bookData.book.oldPrice || "");
            setValue("newPrice", bookData.book.newPrice || "");
            setValue("coverImage", bookData.book.coverImage || "");
        }
    }, [bookData, setValue]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileName(file.name);
        }
    };

    const onSubmit = async (data) => {
        const updateBookData = {
            title: data.title,
            description: data.description,
            category: data.category,
            trending: data.trending,
            oldPrice: Number(data.oldPrice),
            newPrice: Number(data.newPrice),
            coverImage: imageFile
                ? imageFile.name
                : data.coverImage || bookData.coverImage,
        };
        try {
            await axios.put(`${getBaseUrl()}/api/books/edit/${id}`, updateBookData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            Swal.fire({
                title: "Cập nhật sách",
                text: "Bạn đã cập nhật sách thành công!",
                icon: "success",
                // showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Okay!",
            });
            await refetch();
            navigate("/dashboard/manage-books"); // Chuyển hướng sau khi cập nhật
        } catch (error) {
            console.log("Failed to update book.", error);
            alert("Failed to update book.");
        }
    };
    if (isLoading) return <Loading />;
    if (isError) return <div>Lỗi khi chỉnh sửa sách</div>;
    return (
        <div className="max-w-lg p-3 mx-auto bg-white rounded-lg shadow-md md:p-6">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">Chỉnh sửa sách</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    label="Tiêu đề"
                    name="title"
                    placeholder="Thêm tiêu đề sách"
                    register={register}
                />

                <InputField
                    label="Miêu tả"
                    name="description"
                    placeholder="Miêu tả sách"
                    type="textarea"
                    register={register}
                />

                <SelectField
                    label="Thể loại"
                    name="category"
                    options={[
                        { value: "", label: "Chọn 1 thể loại" },
                        { value: "business", label: "Business" },
                        { value: "technology", label: "Technology" },
                        { value: "fiction", label: "Fiction" },
                        { value: "horror", label: "Horror" },
                        { value: "adventure", label: "Adventure" },
                    ]}
                    register={register}
                />
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

                <InputField
                    label="Giá"
                    name="oldPrice"
                    type="number"
                    placeholder="Giá"
                    register={register}
                />

                <InputField
                    label="Giá sale"
                    name="newPrice"
                    type="number"
                    placeholder="Giá sale"
                    register={register}
                />

                <InputField
                    label="Đường dẫn ảnh"
                    name="coverImage"
                    type="text"
                    placeholder="Cover Image URL"
                    register={register}
                />

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Chọn đường dẫn ảnh
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full mt-1 text-sm text-gray-900 border rounded-md"
                    />
                    {imageFileName && (
                        <p className="mt-2 text-sm text-gray-500">
                            Selected file: {imageFileName}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full py-2 font-bold text-white bg-blue-500 rounded-md"
                >
                    Cập nhật
                </button>
            </form>
        </div>
    );
};

export default EditBook;
