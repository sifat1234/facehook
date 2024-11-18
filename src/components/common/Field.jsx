import React from 'react';

function Field({ label, children, htmlFor, error }) {
  const id = htmlFor || getChildID(children);
  return (
    <div className='form-control'>
      {label && (
        <label htmlFor={id} className='auth-label'>
          {label}
        </label>
      )}
      {children}
      {!!error && (
        <div role='alert' className='text-red-600'>
          {error.message}
        </div>
      )}
    </div>
  );
}

const getChildID = (children) => {
  const child = React.Children.only(children);
  if (child.props.id) {
    return child.props.id;
  }
};

export default Field;
