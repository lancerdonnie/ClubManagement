import Button from 'components/Button/Button';
import Container from 'layout/Container';
import React from 'react';
import { useQuery } from 'react-query';
import type { RouteComponentProps } from 'react-router-dom';

const MyClubs = ({ history }: RouteComponentProps) => {
  const { data } = useQuery<
    {
      id: number;
      name: string;
      user_id: number;
    }[]
  >(`clubs`);
  return (
    <Container>
      <Button className="bg-purple-400" onClick={() => history.push('/myclubs/create')}>
        Create Club
      </Button>
      <div>Clubs</div>
      <div>
        {data?.map(({ id, name }) => (
          <div key={id} onClick={() => history.push(`/club/${id}`)}>
            {name}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default MyClubs;
