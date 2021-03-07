import Button from 'components/Button/Button';
import Spinner from 'components/Spinner';
import Container from 'layout/Container';
import React from 'react';
import { useQuery } from 'react-query';
import type { RouteComponentProps } from 'react-router-dom';

const MyClubs = ({ history }: RouteComponentProps) => {
  const { data, isFetching } = useQuery<
    {
      id: number;
      name: string;
      admin: boolean;
    }[]
  >(`clubs`);
  return (
    <Container>
      <Button variant="secondary" onClick={() => history.push('/myclubs/create')}>
        Create Club
      </Button>
      <div className="my-4 font-bold">
        Clubs <Spinner show={isFetching} />
      </div>
      <div className="w-72">
        {data?.map(({ id, name, admin }) => (
          <div key={id} className="flex justify-between items-center mb-1">
            <span className={`${admin ? 'cursor-pointer' : ''} mr-2 break-words`}>{name}</span>
            {admin && (
              <Button
                onClick={() => {
                  if (admin) history.push(`/club/${id}`);
                }}
                variant="primary"
              >
                My Admin
              </Button>
            )}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default MyClubs;
