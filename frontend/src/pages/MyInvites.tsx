import Button from 'components/Button/Button';
import Container from 'layout/Container';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import mutate from './api';

interface Props {}

const MyInvites = (props: Props) => {
  const { data, refetch } = useQuery<
    {
      club_id: number;
      user_id: number;
      name: string;
    }[]
  >(`invites`);

  const { mutate: join } = useMutation((data: number) => mutate(`invites/${data}`), {
    onSuccess: () => {
      refetch();
    },
  });

  return (
    <Container>
      {data?.map(({ club_id, user_id, name }) => (
        <div key={`${club_id}${user_id}`} className="uppercase">
          {name}
          <Button onClick={() => join(club_id)}>join</Button>
        </div>
      ))}
    </Container>
  );
};

export default MyInvites;
