import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { loginFail } from 'redux/actions';
import type { RootState } from 'redux/reducer';

const NavBar = () => {
  const dispatch = useDispatch();
  const username = useSelector(({ username }: RootState) => username);

  return (
    <div className="flex justify-between p-3 text-sm tracking-widest border-solid border-b-2 border-gray-300 font-roboto font-medium">
      <div>
        <NavLink
          to="/"
          className="navbutton"
          exact
          activeClassName="bg-gray-300 transition duration-300 ease-in-out"
        >
          Explore
        </NavLink>
        <NavLink
          to="/myclubs"
          className="ml-2 navbutton"
          activeClassName="bg-gray-300 transition duration-300 ease-in-out"
        >
          My Clubs
        </NavLink>
        <NavLink
          to="/myinvites"
          className="ml-2 navbutton"
          activeClassName="bg-gray-300 transition duration-300 ease-in-out"
        >
          My Invites
        </NavLink>
      </div>
      <div>
        <span className="ml-2 uppercase text-blue-400">{username}</span>
        <span className="ml-2 navbutton cursor-pointer" onClick={() => dispatch(loginFail())}>
          Logout
        </span>
      </div>
    </div>
  );
};

export default NavBar;
