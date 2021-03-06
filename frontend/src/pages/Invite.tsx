import Button from 'components/Button/Button';
import Select from 'components/Select/Select';
import Container from 'layout/Container';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { RouteComponentProps } from 'react-router-dom';
import mutate from './api';

const Invite = ({ match: { params } }: RouteComponentProps<{ id: string }>) => {
  const [state, setState] = useState('');

  // const { data, refetch } = useQuery<ClubType>(`invites/${params.id}`);
  const { data } = useQuery<any[]>(`users`);
  const { mutate: inviteUser } = useMutation(() => mutate(`invites/${params.id}/${state}`), {
    onSuccess: () => {
      // history.push('/myclubs');
    },
  });

  const handleInvite = () => {
    inviteUser();
  };

  return (
    <Container>
      {data && (
        <div className="flex">
          <Select
            dataName="username"
            dataValue="id"
            options={data}
            placeholder="Select User"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <Button onClick={handleInvite}>Invite</Button>
        </div>
      )}
    </Container>
  );
};

export default Invite;
