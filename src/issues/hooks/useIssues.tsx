import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../../api/githubApi';
import { Issue, State } from '../../interfaces';
import { sleep } from '../../helpers.tsx/sleep';
import { useEffect, useState } from 'react';

interface Props {
  state?: State;
  labels: string[];
  page?: number;
}

const getIssues = async ({
  labels,
  state,
  page = 1,
}: Props): Promise<Issue[]> => {
  await sleep(2);

  // Creating dynamic params if state exist
  const params = new URLSearchParams();
  if (state) params.append('state', state);

  if (labels.length > 0) {
    const labelsString = labels.join(',');
    params.append('labels', labelsString);
  }

  // Adding pagination config
  params.append('page', page + '');
  params.append('per_page', '5');

  // Calling API
  const { data } = await githubApi.get<Issue[]>('/issues', { params });
  return data;
};

export const useIssues = ({ state, labels }: Props) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [labels, state]);

  const issuesQuery = useQuery({
    queryKey: ['issues', { state, labels, page }],
    queryFn: () => getIssues({ labels, state, page }),
    staleTime: 1000 * 60 * 60,
  });

  const nextPage = () => {
    if (issuesQuery.data?.length === 0) return;
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return {
    issuesQuery,
    page: issuesQuery.isFetching ? 'Loading' : page,
    prevPage,
    nextPage,
  };
};
