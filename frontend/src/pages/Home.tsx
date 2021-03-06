import Container from 'layout/Container';
import React from 'react';
import { useQuery } from 'react-query';

interface Props {}

const Home = (props: Props) => {
  const { data } = useQuery<any[]>(`clubs/other`);
  return (
    <Container>
      <div>Clubs</div>
      <div>
        {data?.map((e) => (
          <div key={e.id}>{e.name}</div>
        ))}
      </div>
    </Container>
  );
};

export default Home;
