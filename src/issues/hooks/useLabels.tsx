import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../../api/githubApi';
import { sleep } from '../../helpers.tsx/sleep';
import { Label } from '../../interfaces';

const getLabels = async (): Promise<Label[]> => {
  const { data } = await githubApi.get<Label[]>('/labels');
  await sleep(3);
  return data;
};

export const useLabels = () => {
  const labelQuery = useQuery({
    queryKey: ['labels'],
    queryFn: getLabels,
    staleTime: 1000 * 60 * 60,
    // initialData: [],
    placeholderData: [
      {
        id: 127893911,
        node_id: 'MDU6TGFiZWwxMjc4OTM5MTE=',
        url: 'https://api.github.com/repos/facebook/react/labels/Component:%20DOM',
        name: 'Component: DOM',
        color: 'fef2c0',
        default: false,
        description: 'New tag',
      },
      {
        id: 717031390,
        node_id: 'MDU6TGFiZWw3MTcwMzEzOTA=',
        url: 'https://api.github.com/repos/facebook/react/labels/good%20first%20issue',
        name: 'good first issue',
        color: '6ce26a',
        default: true,
      },
    ],
  });

  return labelQuery;
};
