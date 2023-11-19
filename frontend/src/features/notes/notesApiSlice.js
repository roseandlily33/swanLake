import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const notesAdapter = createEntityAdapter({});
const initialState = notesAdapter.getInitialState();

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotes: builder.query({
            query: () => '/users',
            validateStatus: (resp, resu) => {
                return resp.status === 200 && !resu.isError
            },
            keepUnusedDataFor: 50,
            transformResponse: responseData => {
                const loadedNotes = responseData.map (note => {
                    note.id = note._id;
                    return note;
                });
                return notesAdapter.setAll(initialState, loadedNotes);
            },
            providesTags:(result, error, arg) => {
                if(result?.ids){
                    return [
                        {type: 'Note', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'Note', id}))
                    ]
                } else {
                    return [{type: 'Note', id: 'List'}]
                }
            }
        })
    })
});

export const {
    useGetNotesQuery,
} = notesApiSlice;

//Returns the query result object:
export const selectNotesResult = notesApiSlice.endpoints.getNotes.select();

//Creates a memoized selector:
const selectNotesData = createSelector(
    selectNotesResult,
    notesResult => notesResult.data
);

//getSelectors creates these selectors that we rename with aliases using deconstructing. Then we pass in a selector that returns the users slice of state. 
export const {
    selectAll: selectAllNotess,
    selectById: selectNoteById,
    selectIds: selectNotesIds
} = notesAdapter.getSelectors(state => selectNotesData(state) ?? initialState);