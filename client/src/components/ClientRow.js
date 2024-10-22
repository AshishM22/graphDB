import { FaTrash } from "react-icons/fa";

const ClientRow = ({ Client }) => {
  return (
    <tr key={Client?.id}>
      <td>{Client?.name}</td>
      <td>{Client?.email}</td>
      <td>{Client?.phone}</td>
      <td>
        <FaTrash />
      </td>
    </tr>
  );
};

export default ClientRow;
