import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../../api/githubApi';
import { Label } from '../../interfaces/label';
import { useLabels } from '../../hooks/useLabels';
import { LoadingIcon } from '../../shared/components/LoadingIcon';

export const LabelPicker = () => {
  const labelsQuery = useLabels();

  if (labelsQuery.isLoading) return <LoadingIcon />;

  return (
    <>
      {labelsQuery.data?.map((label, index) => (
        <div key={index}>
          <span
            className="badge rounded-pill m-1 label-picker"
            style={{
              border: `1px solid #${label.color}`,
              color: `#${label.color}`,
            }}
          >
            {label.name}
          </span>
        </div>
      ))}
    </>
  );
};
