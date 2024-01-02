import { useEffect, useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks/useIssues';
import { useIssuesInfinite } from '../hooks/useIssuesInfinite';
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { State } from '../../interfaces';

export const ListViewInfinite = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();

  const { issuesQuery } = useIssuesInfinite({
    state,
    labels: selectedLabels,
  });

  const onLabelChange = (labelName: string) => {
    selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName]);
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {issuesQuery.isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList
            issues={issuesQuery.data?.pages.flat() || []}
            state={state}
            onStateChanged={(newState) => setState(newState)}
          />
        )}

        <div className="d-flex mt-2 justify-content-start align-items-center">
          <button
            className="btn btn-outline-primary"
            onClick={() => issuesQuery.fetchNextPage()}
            disabled={!issuesQuery.hasNextPage}
          >
            Load more
          </button>
        </div>
      </div>

      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onchange={(labelName) => onLabelChange(labelName)}
        />
      </div>
    </div>
  );
};
