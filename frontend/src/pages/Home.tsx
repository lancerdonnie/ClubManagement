import Button from 'components/Button/Button';
import Spinner from 'components/Spinner';
import Container from 'layout/Container';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import mutate from './api';

const Home = () => {
  const { data, refetch, isFetching } = useQuery<any[]>(`clubs/other`);

  const { mutate: join, isLoading } = useMutation((data: number) => mutate(`clubs/join/${data}`), {
    onSuccess: () => {
      refetch();
    },
  });

  return (
    <Container>
      <div className="mb-4 font-bold">
        Clubs <Spinner show={isFetching || isLoading} />
      </div>
      <div className="w-72">
        {data?.map((e) => (
          <div key={e.clubId} className="mb-2 flex justify-between items-center">
            <span className="break-all">{e.name}</span> <Button onClick={() => join(e.clubId)}>Join</Button>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Home;
