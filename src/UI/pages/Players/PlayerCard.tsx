import { PlayerSilhouette } from "./PlayersPage";
import { MdEdit, MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { usePlayers, useTeams } from "../../hooks";

interface PlayerCardProps {
  player: Player;
  onEdit?: (player: Player) => void;
}

export const PlayerCard = ({ player, onEdit }: PlayerCardProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [team, setTeam] = useState<Team | null>(null);
  const { deletePlayer } = usePlayers();
  const { getTeamById } = useTeams();

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const teamData = await getTeamById(player.team);
        if (!teamData) {
          setTeam(null);
          return;
        }
        setTeam(teamData);
      } catch (error) {
        console.log(error);
        setTeam(null);
      }
    };
    fetchTeam();
  }, [player, getTeamById]);

  const handleCopyClick = (steamId: string) => {
    navigator.clipboard.writeText(steamId);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1250);
  };

  const handleEditClick = () => {
    if (onEdit) {
      onEdit(player);
    }
  };

  return (
    <div className="flex w-full flex-col divide-y divide-border rounded-lg bg-background-secondary px-2">
      <div className="relative flex w-full justify-between px-2 pt-2">
        <div>
          <h4 className="font-semibold">{player.username}</h4>
          <div className="flex">
            <p className="text-text-secondary">
              {player.firstName} {player.lastName}
            </p>
          </div>
          {team?.logo && (
            <img className="size-8" src={team.logo} alt={`${team.name} logo`} />
          )}
        </div>
        <img
          className="size-32"
          src={player.avatar ? player.avatar : PlayerSilhouette}
          alt="Player Avatar"
        ></img>
      </div>
      <div className="flex justify-between gap-2 p-2">
        <button
          onClick={() => handleCopyClick(player.steamid)}
          className="flex w-full items-center justify-center rounded bg-primary px-2 py-1 text-sm font-semibold text-text transition-colors hover:bg-primary-dark"
        >
          {!isCopied && player.steamid}
          {isCopied && "Copied!"}
        </button>
        <div className="inline-flex">
          <button
            className="relative inline-flex min-w-[40px] items-center justify-center rounded-l border border-r-0 border-primary/50 p-2 px-4 py-1 text-primary transition-colors hover:bg-primary/10"
            onClick={() => handleEditClick()}
          >
            <MdEdit className="size-5" />
          </button>
          <button
            className="relative inline-flex min-w-[40px] items-center justify-center rounded-r border border-primary/50 p-2 px-4 py-1 text-primary transition-colors hover:bg-primary/10"
            onClick={() => deletePlayer(player._id)}
          >
            <MdDelete className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
