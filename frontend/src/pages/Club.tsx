import Button from 'components/Button/Button';
import Container from 'layout/Container';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import type { RouteComponentProps } from 'react-router-dom';
import mutate from './api';

type ClubType = {
  id: number;
  name: string;
  username: string;
};

const Club = ({ match: { params }, history }: RouteComponentProps<{ id: string }>) => {
  const { data, refetch } = useQuery<ClubType[]>(`clubs/${params.id}`);

  const { mutate: deleteMember } = useMutation((data: any) => mutate('clubs/removemembers', data), {
    onSuccess: () => {
      refetch();
    },
  });

  return (
    <Container>
      {data && data?.length > 0 && (
        <div>
          <Button
            className="bg-purple-400"
            onClick={() => {
              history.push(`/invite/${params.id}`);
            }}
          >
            Invite Member
          </Button>
          <div className="uppercase">{data[0].name}</div>
          <div>Members</div>
          <div>
            {data.map(({ id, username }) => (
              <div key={id}>
                {username}
                <i
                  className="fa fa-trash cursor-pointer ml-3 text-red-600"
                  onClick={() => {
                    if (!window.confirm('Are you sure you want to remove this member?')) return;
                    deleteMember({
                      id: params.id,
                      members: [id],
                    });
                  }}
                ></i>
              </div>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
};

export default Club;
