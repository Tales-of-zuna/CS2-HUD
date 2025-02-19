import { useState } from "react";
import { PlayerCard } from "./PlayerCard";
import PlayerSilhouette from "../../assets/player_silhouette.webp";
import { PlayerForm } from "./PlayersForm";
import { Container } from "../../components";
import { Topbar } from "../MainPanel/Topbar";
import { usePlayers } from "../../hooks";

export const PlayersPage = () => {
  const [open, setOpen] = useState(false);

  const { players, filteredPlayers, setSelectedPlayer, setIsEditing } =
    usePlayers();

  const handleEditPlayer = (player: Player) => {
    setIsEditing(true);
    setOpen(true);
    setSelectedPlayer(player);
  };

  return (
    <section className="relative flex size-full flex-col gap-4">
      <Topbar header="Players" buttonText="Player" openForm={setOpen} />
      <PlayerForm open={open} setOpen={setOpen} />
      <Container>
        <div
          className={
            filteredPlayers.length === 0
              ? "flex items-center justify-center"
              : "grid grid-cols-1 justify-items-center gap-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
          }
        >
          {players.length === 0 && filteredPlayers.length === 0 && (
            <h6 className="text-center font-semibold">No Players created</h6>
          )}

          {filteredPlayers.map((player: Player, index) => {
            return (
              <PlayerCard
                key={index}
                player={player}
                onEdit={handleEditPlayer}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export { PlayerSilhouette };
