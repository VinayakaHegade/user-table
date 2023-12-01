import useFetchData from "../hooks/useFetchData";

const url =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

const Table = () => {
  const { data: usersData, isLoading, error } = useFetchData(url);
  console.log(usersData);

  if (isLoading) {
    return <p>Loadding...</p>;
  }

  if (error) {
    return (
      <p>
        Error while fetching data. Error:{error.message}. Developers check the
        console for error information.
      </p>
    );
  }

  return <p>Table</p>;
};

export default Table;
