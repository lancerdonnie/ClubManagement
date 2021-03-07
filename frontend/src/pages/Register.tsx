import type { RootState } from 'redux/reducer';
import type { Location } from 'history';
import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'Utils/Toast';
import { loginSuccess } from 'redux/actions';
import { useMutation } from 'react-query';
import axios from 'axios';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import { LoginSuccess } from 'types';

type LoginType = {
  username: string;
  password: string;
};

const Register = ({ location }: { location: Location<any> }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const authenticated = useSelector((state: RootState) => state.authenticated);

  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleLoginAsync = async (data: LoginType) => {
    const x = await axios.post('register', data);
    return x?.data;
  };

  const { mutate: handleLogin, isLoading } = useMutation(handleLoginAsync, {
    onSuccess: (data: LoginSuccess) => {
      dispatch(loginSuccess(data));
    },
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!user) return Toast({ msg: 'Email required' });
    if (!pass) return Toast({ msg: 'Password required' });
    handleLogin({ username: user, password: pass });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'user' | 'pass') => {
    if (type === 'user') setUser(e.target.value);
    if (type === 'pass') setPass(e.target.value);
  };

  if (authenticated) return <Redirect to={location.state?.referrer.pathname || '/'} />;

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="">
        <form onSubmit={handleSubmit} className="logininside">
          <div className="mb-2 text-center">Create Account</div>
          <Input
            className="w-60 mb-2"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'user')}
            type="text"
            placeholder="Username"
          />
          <Input
            className="w-60 mb-2"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'pass')}
            type="password"
            placeholder="Password"
          />
          <div
            onClick={() => history.push('/login')}
            className="text-center mb-2 cursor-pointer text-blue-400"
          >
            sign in?
          </div>
          <div className="flex justify-center">
            <Button type="submit">{isLoading ? 'registering' : 'register'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
