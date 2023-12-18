import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../../api/githubApi';
import { Issue } from '../../interfaces';
import { sleep } from '../../helpers.tsx/sleep';

const getIssue = async (issueNumber: number): Promise<Issue> => {
  const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);
  await sleep(2);
  console.log('Issues: ', data);
  return data;
};

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery({
    queryKey: ['issue', issueNumber],
    queryFn: () => getIssue(issueNumber),
    staleTime: 1000 * 60 * 60,
  });

  return { issueQuery };
};
