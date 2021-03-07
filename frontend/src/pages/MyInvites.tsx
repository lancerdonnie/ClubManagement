import React from 'react';
import Button from 'components/Button/Button';
import Container from 'layout/Container';
import { useMutation, useQuery } from 'react-query';
import mutate from './api';
import Spinner from 'components/Spinner';

const MyInvites = () => {
  const { data, refetch, isFetching } = useQuery<
    {
      club_id: number;
      user_id: number;
      name: string;
    }[]
  >(`invites`);

  const { mutate: join, isLoading } = useMutation((data: number) => mutate(`invites/${data}`), {
    onSuccess: () => {
      refetch();
    },
  });

  return (
    <Container>
      <div className="h-6 flex items-start">
        <Spinner show={isFetching || isLoading} />
      </div>
      {data?.map(({ club_id, user_id, name }) => (
        <div key={`${club_id}${user_id}`} className="uppercase mb-2">
          {name}
          <Button className="ml-2" variant="primary" onClick={() => join(club_id)}>
            join
          </Button>
        </div>
      ))}
    </Container>
  );
};

export default MyInvites;
