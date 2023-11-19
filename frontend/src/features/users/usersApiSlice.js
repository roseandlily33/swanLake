import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter({});
const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            validateStatus: (resp, resu) => {
                return resp.status === 200 && !resu.isError
            },
            keepUnusedDataFor: 50,
            transformResponse: responseData => {
                const loadedUsers = responseData.map (user => {
                    user.id = user._id;
                    return user;
                });
                return usersAdapter.setAll(initialState, loadedUsers);
            },
            providesTags:(result, error, arg) => {
                if(result?.ids){
                    return [
                        {type: 'User', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'User', id}))
                    ]
                } else {
                    return [{type: 'User', id: 'List'}]
                }
            }
        })
    })
});

export const {
    useGetUsersQuery,
} = usersApiSlice;

//Returns the query result object:
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

//Creates a memoized selector:
const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data
);

//getSelectors creates these selectors that we rename with aliases using deconstructing. Then we pass in a selector that returns the users slice of state. 
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState);