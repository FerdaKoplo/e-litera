import { apiSlice } from "../api/baseApi";

export const eBooksApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllEBooks: builder.query({
            query: ({ page = 1, search = "" }) => ({
                url:`/e-books?page=${page}&search=${search}`,
                method:"GET"
            })
        }),
        getDetailEBook: builder.query({
            query: (Ebook) => ({
                url:`/e-books/${Ebook}`,
                method:"GET"
            })
        }),
 })
})

export const {
    useGetAllEBooksQuery,
    useGetDetailEBookQuery
} = eBooksApi