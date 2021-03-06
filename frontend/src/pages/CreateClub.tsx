import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Container from 'layout/Container';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import type { RouteComponentProps } from 'react-router-dom';
import mutate from './api';

const CreateClub = ({ history }: RouteComponentProps) => {
  const [state, setState] = useState({ name: '' });

  const { mutate: createClub } = useMutation((data: typeof state) => mutate('clubs', data), {
    onSuccess: () => {
      history.push('/myclubs');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createClub(state);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Input placeholder="Club Name" onChange={(e) => setState({ name: e.target.value })} />
        <Button>Submit</Button>
      </form>
    </Container>
  );
};

export default CreateClub;
