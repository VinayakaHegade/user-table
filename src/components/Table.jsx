import { useEffect, useState } from "react";

const Table = () => {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    async function fetchUsersData() {
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        const data = await response.json();
        setUsersData(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUsersData();
  }, []);

  return <p>Table</p>;
};

export default Table;
