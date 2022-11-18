import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"

export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/todos/" }),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query() {
                return ""
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({
                            type: "Todos",
                            id
                        })),
                        { type: "Todos", id: "LIST" },
                    ]
                    : [{ type: "Todos", id: "LIST" }],
            // NOTE transform response to prevent nested data
            // transformResponse: res => res
        }),
        createTodo: builder.mutation({
            query(newtask) {
                return {
                    url: "",
                    method: "POST",
                    body: {
                        task: newtask,
                        completed: false
                    }
                }
            },
            // invalidatesTags: [{ type: "Todos", id: "LIST" }],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                // try {
                //     const { data } = await queryFulfilled
                console.log(arg);
                const patchResult = dispatch(
                    todoApi.util.updateQueryData("getTodos", undefined, draft => {
                        draft.push({ task: arg, completed: false, id: "temp_id" })
                    })
                )
                // } catch (error) {
                //     console.error(error);
                // }
                queryFulfilled
                    .catch(patchResult.undo)
            }
        }),
        deleteTodo: builder.mutation({
            query(taskID) {
                return {
                    url: `${taskID}`,
                    method: "DELETE"
                }
            },
            // invalidatesTags: [{ type: "Todos", id: "LIST" }],
            onQueryStarted: (id, { dispatch, queryFulfilled }) => {
                // try {
                //     await queryFulfilled
                const patchResult = dispatch(
                    todoApi.util.updateQueryData("getTodos", undefined, draft => {
                        draft.splice(draft.findIndex(todo => todo.id === id), 1)
                    })
                )
                // } catch (error) {
                //     console.error(error);
                // }
                queryFulfilled.catch(patchResult.undo)
            }
        }),
        updateTodo: builder.mutation({
            query({ id, ...task }) {
                return {
                    url: `${id}`,
                    method: "PATCH",
                    body: {
                        ...task,
                    }
                }
            },
            // invalidatesTags: (result, error, { id }) =>
            //     result
            //         ? [
            //             { type: 'Todos', id },
            //             { type: 'Todos', id: 'LIST' },
            //         ]
            //         : [{ type: 'Todos', id: 'LIST' }],
            onQueryStarted: ({ id, ...patch }, { dispatch, queryFulfilled }) => {
                // try {
                //     const { data } = await queryFulfilled
                const patchResult = dispatch(
                    todoApi.util.updateQueryData("getTodos", undefined, draft => {
                        let updatedTodo = draft[draft.findIndex(todo => todo.id === id)]
                        draft[draft.findIndex(todo => todo.id === id)] = { ...updatedTodo, ...patch }
                    }
                    ))
                queryFulfilled.catch(patchResult.undo)
                // } catch (error) {
                //     console.error(error);
                // }
            }
        })
    })
})

export const { useGetTodosQuery, useCreateTodoMutation, useDeleteTodoMutation,
    useUpdateTodoMutation, usePrefetch } = todoApi 