import Button from 'components/Button/Button';
import Container from 'layout/Container';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import type { RouteComponentProps } from 'react-router-dom';
import mutate from './api';
import { Line } from 'react-chartjs-2';

type ClubType = {
  id: number;
  name: string;
  username: string;
};

const dataset = {
  label: 'members joined',
  fill: false,
  lineTension: 0.1,
  backgroundColor: 'rgba(75,192,192,0.4)',
  borderColor: 'rgba(75,192,192,1)',
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBorderColor: 'rgba(75,192,192,1)',
  pointBackgroundColor: '#fff',
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
  pointHoverBorderColor: 'rgba(220,220,220,1)',
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
};

const Club = ({ match: { params }, history }: RouteComponentProps<{ id: string }>) => {
  const { data, refetch } = useQuery<ClubType[]>(`clubs/${params.id}`);
  const { data: report } = useQuery<any>(`dailyreport/${params.id}`, {
    select: (
      data: {
        club_id: number;
        count: number;
        created_date: string;
      }[]
    ) => ({
      datasets: [{ ...dataset, data: data.map((e) => e.count) }],
      labels: data.map((e) => e.created_date),
    }),
  });

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
      <div>
        <h2 className="text-center">Daily Reports Graph</h2>
        <Line data={report} />
      </div>
    </Container>
  );
};

export default Club;
