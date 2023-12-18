import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../../api/githubApi';
import { Issue } from '../../interfaces';

const getIssues = async (): Promise<Issue[]> => {
  const { data } = await githubApi.get<Issue[]>('/issues');
  //   console.log('Issues: ', data);
  return data;
};

export const useIssues = () => {
  const issuesQuery = useQuery({
    queryKey: ['issues'],
    queryFn: getIssues,
    staleTime: 1000 * 60 * 60,
  });

  return { issuesQuery };
};
