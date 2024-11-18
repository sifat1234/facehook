import { useProfile } from '../../hooks/useProfile';
import EditIcon from '../../assets/icons/edit.svg';
import CheckIcon from '../../assets/icons/check.svg';
import { useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { actions } from '../../actions';
import { useEffect } from 'react';

function Bio() {
  const { state, dispatch } = useProfile();

  const [bio, setBio] = useState(state?.user?.bio);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (state?.user?.bio) {
      setBio(state.user.bio);
    }
  }, [state?.user?.bio]);

  const { api } = useAxios();

  const handleBioEdit = async () => {
    dispatch({ type: actions.profile.DATA_FETCHING });
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?.id}`,
        { bio }
      );

      if (response.status === 200) {
        dispatch({
          type: actions.profile.USER_DATA_EDITED,
          data: response.data,
        });
        setIsEditing(false);
      }
    } catch (error) {
      dispatch({ type: actions.profile.DATA_ERROR, error: error.message });
    }
  };

  return (
    <div className='mt-4 flex items-start gap-2 lg:mt-6'>
      <div className='flex-1'>
        {!isEditing ? (
          <p className='leading-[188%] text-gray-400 lg:text-lg'>
            {state?.user?.bio}
          </p>
        ) : (
          <textarea
            className='p-2 className="leading-[188%] text-gray-600 lg:text-lg rounded-md'
            value={bio}
            rows={4}
            cols={55}
            onChange={(e) => setBio(e.target.value)}
          />
        )}
      </div>
      {/* <!-- Edit Bio button. The Above bio will be editable when clicking on the button --> */}

      {!isEditing ? (
        <button
          className='flex-center h-7 w-7 rounded-full'
          onClick={() => setIsEditing(true)}
        >
          <img src={EditIcon} alt='Edit' />
        </button>
      ) : (
        <button
          className='flex-center h-7 w-7 rounded-full'
          onClick={handleBioEdit}
        >
          <img src={CheckIcon} alt='Check' />
        </button>
      )}
    </div>
  );
}

export default Bio;
