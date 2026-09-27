import { createAsyncThunk, postAdapter  } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const Base_URL = `http://localhost:3500/`

// GET All Post Data Thunk / Action Creator
export const fetchPostData = createAsyncThunk('/filter', async () => {
    console.log('fetch post Data')
        // fetch(POSTS_URL, {method: 'GET'})
        //     .then((data) => {
        //         console.log(data)
        //         return data
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //         return err
        //     })
    
      const response = await axios.get(POSTS_URL)
      console.log(response)
      console.log('here')
    //   return response.data
    }
)

const initialState = {
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed',
    value: [],
    error: null,
}

// const initialState = {
//   value: [
//     {
//       comment: 'Gojo looks nice. Excellent work amigo!',
//       username: 'Saitama',
//     },
//     {
//       comment: 'Catoru Sensei! Konnichiwa!',
//       username: 'Yuji',
//     },
//   ],
// };

export const commentSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Action to add comment
    addComment: (state, action) => {
      state.value = [...state.value, action.payload];
    },

    // Special reducer for hydrating the state
    extraReducers(builder) {
        builder
            .addCase(fetchPostData.pending, (state, action) => {
                console.log('loading')
                state.status = 'loading'
            })
            .addCase(fetchPostData.fulfilled, (state, action) => {
                state.status = 'succeeded'
                return state.value = action.payload
            })
            .addCase(fetchPostData.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

    },
  },
});

export const { addComment } = commentSlice.actions;
export const selectComments = (state) => state;
export default commentSlice.reducer;

    //   [HYDRATE]: (state, action) => {
    //     return {
    //       ...state,
    //       ...action.payload.comments,
    //     };
    //   },
