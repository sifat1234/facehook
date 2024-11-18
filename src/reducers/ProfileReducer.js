import { actions } from '../actions';

const initialState = {
  user: null,
  posts: [],
  loading: false,
  error: null,
};

const profileReducer = (state = initialState, action) => {
  // Handle actions based on the type of action received
  switch (action.type) {
    case actions.profile.DATA_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case actions.profile.DATA_FETCHED:
      return {
        ...state,
        user: action.data.user,
        posts: action.data.posts,
        loading: false,
      };
    case actions.profile.DATA_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    case actions.profile.USER_DATA_EDITED:
      // Update the user's data in the state
      return {
        ...state,
        loading: false,
        user: action.data,
      };

    case actions.profile.IMAGE_UPDATED:
      // Update the user's data in the state
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          image: action.data.avatar,
        },
      };

    default:
      return state;
  }
};

export { profileReducer, initialState };
