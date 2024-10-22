import { gql, useQuery } from "@apollo/client";
import ClientRow from "./ClientRow";

const GET_CLIENTS = gql`
  query getClients {
    clients {
      name
      email
      phone
      id
    }
  }
`;

const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  console.log(data);

  if (loading) {
    return <div>Loading..............</div>;
  }

  if (error) {
    return <div>Error .............</div>;
  }

  return (
    <div>
      <table className="table table-hover mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {data?.clients?.map((Client, idx) => {
            return <ClientRow Client={Client} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Clients;
