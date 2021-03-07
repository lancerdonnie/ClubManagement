import Button from 'components/Button/Button';
import Select from 'components/Select/Select';
import Spinner from 'components/Spinner';
import Container from 'layout/Container';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { RouteComponentProps } from 'react-router-dom';
import mutate from './api';

const Invite = ({ match: { params } }: RouteComponentProps<{ id: string }>) => {
  const [state, setState] = useState('');

  const { data, isFetching } = useQuery<any[]>(`users`);
  const { mutate: inviteUser, isLoading } = useMutation(() => mutate(`invites/${params.id}/${state}`), {});

  const handleInvite = () => {
    inviteUser();
  };

  return (
    <Container>
      <div className="h-6 flex items-start">
        <Spinner show={isFetching || isLoading} />
      </div>
      {data && (
        <div className="flex items-center">
          <Select
            dataName="username"
            dataValue="id"
            options={data}
            placeholder="Select Member"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <Button className="ml-2" variant="primary" onClick={handleInvite}>
            Invite
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Invite;
