import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import IssueList from "../../component/IssueList";

import { setIssueList } from "../../issueList.slice";

import { useGetIssuesQuery } from "../../issueList.api";

export default function IssueListFiltered() {
  const dispatch = useDispatch();
  const reporterId = useSelector((store) => store.auth.user.uid);
  const { rows, rowCount, page, pageSize } = useSelector(
    (store) => store.issueList
  );
  const { data, isLoading } = useGetIssuesQuery({
    page,
    pageSize,
    sortBy: "creation_date:desc",
    reporterId,
  });

  useEffect(() => {
    if (data) dispatch(setIssueList(data));
  }, [pageSize, page, data]);

  return (
    <IssueList
      rows={rows}
      rowCount={rowCount}
      page={page}
      pageSize={pageSize}
      isLoading={isLoading}
    />
  );
}
