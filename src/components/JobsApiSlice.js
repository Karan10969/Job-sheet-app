import { apiSlice } from "../app/api/apiSlice";
// import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";



const jobsSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllJobs: build.query({
            query: () => ({
                url: '/jobs',
            }),
            providesTags: (result, error, arg) =>
                result
                  ? [...result.map(({ id }) => ({ type: 'Post', id })), 'Post']
                  : ['Post'],
        }),
        createJob: build.mutation({
            query: jobsData => ({
                url: '/jobs',
                method: 'POST',
                body: {
                    ...jobsData
                }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }]
        }),
        updateJob: build.mutation({
            query(jobsData){
                const { jobId, ...data } = jobsData
                return{
                    url: `/jobs/${jobId}`,
                    method: 'PATCH',
                    body: {...data}
                }
            },
            invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }]
        }),
        deleteJob: build.mutation({
            query({id}){
                return{
                    url: `/jobs/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }]
        })
    })
})


export const {
    useGetAllJobsQuery,
    useCreateJobMutation,
    useUpdateJobMutation,
    useDeleteJobMutation
} = jobsSlice