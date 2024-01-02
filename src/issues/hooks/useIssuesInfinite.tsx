import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { githubApi } from '../../api/githubApi';
import { sleep } from '../../helpers.tsx';

import { Issue, State } from '../../interfaces';

interface Props {
  state?: State;
  labels: string[];
  page?: number;
}

interface queryProps {
  pageParam?: number;
  queryKey: (string | Props)[];
}

const getIssues = async ({
  pageParam = 1,
  queryKey,
}: queryProps): Promise<Issue[]> => {
  await sleep(2);

  const [, , args] = queryKey;
  const { state, labels } = args as Props;

  // Creating dynamic params if state exist
  const params = new URLSearchParams();
  if (state) params.append('state', state);

  if (labels.length > 0) {
    const labelsString = labels.join(',');
    params.append('labels', labelsString);
  }

  // Adding pagination config
  params.append('page', pageParam + '');
  params.append('per_page', '5');

  // Calling API
  const { data } = await githubApi.get<Issue[]>('/issues', { params });
  return data;
};

export const useIssuesInfinite = ({ state, labels }: Props) => {
  const issuesQuery = useInfiniteQuery({
    queryKey: ['issues', 'infinite', { state, labels }],
    queryFn: getIssues,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length <= 0) return;
      return pages.length + 1;
    },
  });

  return { issuesQuery };
};
