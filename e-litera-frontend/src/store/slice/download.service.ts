import { apiSlice } from "../api/baseApi";
import { Download } from "@/interface/Download";

export const downloadHistory = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDownloadCountByBook: builder.query({
            query: () => ({
                url: `/download-counts`,
                method: "GET"
            })
        }),

        postDownloadCount: builder.mutation<Download, Omit<Download, "user_id">>({
            query: ({e_book_id}) => ({
                url: '/download',
                method: "POST",
                body: { e_book_id},
            })
        }),
    })
})

export const {
    useGetDownloadCountByBookQuery,
    usePostDownloadCountMutation
} = downloadHistory