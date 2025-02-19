import React, { useEffect, useState } from "react";
import { maps } from "./MatchPage";

interface VetoRowProps {
  index: number;
  veto: Veto;
  leftTeamId: string | null;
  rightTeamId: string | null;
  teams: Team[];
  onVetoChange: (index: number, key: keyof Veto, value: any) => void;
}

export const VetoRow: React.FC<VetoRowProps> = ({
  index,
  veto,
  leftTeamId,
  rightTeamId,
  teams,
  onVetoChange,
}) => {
  const [teamID, setTeamID] = useState<string | null>(
    veto.type === "decider" ? "decider" : veto.teamId || "",
  );
  const [leftTeam, setLeftTeam] = useState<Team | undefined>(undefined);
  const [rightTeam, setRightTeam] = useState<Team | undefined>(undefined);
  const [type, setType] = useState<"ban" | "pick" | "decider">(
    veto?.type || "ban",
  );
  const [mapName, setMapName] = useState<string | null>(veto?.mapName || null);
  const [side, setSide] = useState<"CT" | "T" | "NO">(veto.side);
  const [reverseSide, setReverseSide] = useState<boolean | null>(
    veto?.reverseSide || false,
  );

  useEffect(() => {
    setLeftTeam(teams.find((team) => team._id === leftTeamId));
    setRightTeam(teams.find((team) => team._id === rightTeamId));
    setTeamID(veto.teamId);
    setMapName(veto.mapName);
    setReverseSide(veto.reverseSide ?? false);
    setSide(veto.side);
  }, [veto, teams, leftTeamId, rightTeamId]);

  const handleTeamSelect = (id: string) => {
    setTeamID(id);
    onVetoChange(index, "teamId", id);
  };

  return (
    <tr
      key={index}
      className="bg-background-secondary odd:bg-background-primary"
    >
      <td className="px-6 py-4">
        <h4 className="text-center font-semibold">Veto {index + 1}</h4>
      </td>
      <td className="px-6 py-4">
        <form className="flex w-full flex-col">
          <div className="flex w-full flex-col justify-center space-y-1">
            {["ban", "pick", "decider"].map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={option}
                  checked={type === option}
                  onChange={(e) => {
                    const newType = e.target.value as
                      | "ban"
                      | "pick"
                      | "decider";
                    setType(newType);
                    onVetoChange(index, "type", newType);
                  }}
                  name="Type"
                  className="form-radio text-primary"
                />
                <span>{option.charAt(0).toUpperCase() + option.slice(1)}</span>
              </label>
            ))}
          </div>
        </form>
      </td>
      <td className="px-6 py-4">
        <div className="w-full">
          <select
            disabled={type === "decider"}
            value={type === "decider" ? "decider" : teamID || ""}
            onChange={(e) => handleTeamSelect(e.target.value)}
            name={type === "decider" ? "Decider" : "Team"}
          >
            <option value="" disabled>
              Team
            </option>
            {type === "decider" && <option value="decider">Decider</option>}
            {leftTeamId && leftTeam && (
              <option value={leftTeamId}>{leftTeam.name}</option>
            )}
            {rightTeamId && rightTeam && (
              <option value={rightTeamId}>{rightTeam.name}</option>
            )}
          </select>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="w-full">
          <select
            value={mapName || ""}
            onChange={(e) => {
              const newMapName = e.target.value;
              setMapName(newMapName);
              onVetoChange(index, "mapName", newMapName);
            }}
            name="Map"
          >
            <option value="" disabled>
              Map
            </option>
            {maps.map((map) => (
              <option key={map} value={map}>
                {map.charAt(3).toUpperCase() + map.slice(4)}
              </option>
            ))}
          </select>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="w-full">
          <select
            value={side}
            onChange={(e) => {
              const newSide = e.target.value as "CT" | "T" | "NO";
              setSide(newSide);
              onVetoChange(index, "side", newSide);
            }}
            name="Side"
          >
            <option value="NO">No Side</option>
            <option value="CT">CT</option>
            <option value="T">T</option>
          </select>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="col-span-2 flex w-full flex-col items-center justify-center">
          <input
            type="checkbox"
            id={`reverseSide-${index}`}
            checked={reverseSide === true}
            onChange={(e) => {
              const newReverseSide = e.target.checked;
              setReverseSide(newReverseSide);
              onVetoChange(index, "reverseSide", newReverseSide);
            }}
          />
        </div>
      </td>
    </tr>
  );
};
