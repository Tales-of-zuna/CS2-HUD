import { MdDelete, MdEdit } from "react-icons/md";
import { useTeams } from "../../hooks";

interface TeamsTableProps {
  onEdit: (team: Team) => void;
}

export const TeamsTable = ({ onEdit }: TeamsTableProps) => {
  const { filteredTeams, deleteTeam } = useTeams();
  return (
    <table className="table-fixed rounded-t-lg bg-background-secondary">
      <thead className="border-b border-border">
        <tr className="p-2">
          <th className="p-4 text-sm" align="left">
            Logo
          </th>
          <th className="p-4 text-sm" align="center">
            Name
          </th>
          <th className="p-4 text-sm" align="center">
            Short Name
          </th>
          <th className="p-4 text-sm" align="center">
            Country
          </th>
          <th className="p-4 text-sm" align="right">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {filteredTeams.map((team: Team, index) => (
          <TeamRow
            key={index}
            team={team}
            onEdit={onEdit}
            deleteTeam={deleteTeam}
          />
        ))}
      </tbody>
    </table>
  );
};

interface TeamRowProps {
  team: Team;
  onEdit: (team: Team) => void;
  deleteTeam: (id: string) => void;
}

const TeamRow = ({ team, onEdit, deleteTeam }: TeamRowProps) => {
  const handleEditClick = () => {
    if (onEdit) {
      onEdit(team); // Call onEdit prop function if provided
    }
  };

  return (
    <tr>
      <td className="p-4" align="left">
        <img src={team.logo} alt="Team Logo" className="size-12" />
      </td>
      <td className="p-4 text-lg font-semibold" align="center">
        {team.name}
      </td>
      <td className="p-4" align="center">
        {team.shortName}
      </td>
      <td className="p-4 font-semibold" align="center">
        {team.country}
      </td>
      <td className="p-4" align="right">
        <div className="inline-flex">
          <button
            className="relative inline-flex min-w-[40px] items-center justify-center rounded-l border border-r-0 border-primary/50 p-2 px-4 py-1 text-primary transition-colors hover:bg-primary/10"
            onClick={() => handleEditClick()}
          >
            <MdEdit className="size-5" />
          </button>

          <button
            className="relative inline-flex min-w-[40px] items-center justify-center rounded-r border border-primary/50 p-2 px-4 py-1 text-primary transition-colors hover:bg-primary/10"
            onClick={() => deleteTeam(team._id)}
          >
            <MdDelete className="size-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};
