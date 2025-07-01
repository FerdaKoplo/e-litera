import { Rating } from "@/interface/Rating";
import { apiSlice } from "../api/baseApi";
import { BorrowedBook, PostBorrowedBook } from "@/interface/BorrowedBook";

export const borrowApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllBorrowedBooks: builder.query({
            query: ({ page = 1, search = "" }) => ({
                url: `/borrowed-records?page=${page}&search=${search}`,
                method: "GET"
            })
        }),
        getDetailBorrowedBook: builder.query({
            query: (borrowedRecords) => ({
                url: `/borrowed-records/${borrowedRecords}`,
                method: "GET"
            })
        }),
        postBorrowedBooks: builder.mutation<PostBorrowedBook, Omit<PostBorrowedBook, "user_id">>({
            query: ({ book_id, borrow_date }) => ({
                url: 'borrow-records',
                method: "POST",
                body: { book_id, borrow_date }
            })
        }),
        returnBorrowedBook: builder.mutation({
            query: (bookId) => ({
                url: `/borrowed-records/${bookId}/return`,
                method: "PATCH"
            })
        }),
    })
})

export const {
    useGetAllBorrowedBooksQuery,
    useGetDetailBorrowedBookQuery,
    usePostBorrowedBooksMutation,
    useReturnBorrowedBookMutation
} = borrowApi