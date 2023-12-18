import { useLabels } from '../../hooks/useLabels';
import { LoadingIcon } from '../../shared/components/LoadingIcon';

type Props = {
  selectedLabels: string[];
  onchange: (labelName: string) => void;
};

export const LabelPicker = ({ selectedLabels, onchange }: Props) => {
  const labelsQuery = useLabels();

  if (labelsQuery.isLoading) return <LoadingIcon />;

  return (
    <>
      {labelsQuery.data?.map((label, index) => (
        <div key={index}>
          <span
            className={`badge rounded-pill m-1 label-picker ${
              selectedLabels.includes(label.name) && `label-active`
            }`}
            onClick={() => onchange(label.name)}
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
