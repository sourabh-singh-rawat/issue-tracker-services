import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChangedListener } from "../../config/firebase.config";
import { setIssueList } from "../../reducers/issueList.reducer";
import IssuesList from "../../components/IssuesList/IssuesList";

const IssueListFiltered = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { rows, rowCount, page, pageSize } = useSelector(
    (store) => store.issueList
  );

  useEffect(() => {
    setIsLoading(true);
    const fetchIssues = async () => {
      onAuthStateChangedListener(async (user) => {
        const token = await user.getIdToken();

        const response = await fetch(
          `http://localhost:4000/api/issues?limit=${pageSize}&page=${page}&sort_by=creation_date:desc`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: "Bearer " + token,
            },
          }
        );

        const data = await response.json();
        setIsLoading(false);

        dispatch(setIssueList(data));
      });
    };

    fetchIssues();
  }, [pageSize, page]);

  return (
    <IssuesList
      rows={rows}
      rowCount={rowCount}
      page={page}
      pageSize={pageSize}
      isLoading={isLoading}
    />
  );
};

export default IssueListFiltered;
