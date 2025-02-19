import { useEffect, useState } from "react";
import {
  ButtonContained,
  Container,
  TextInput,
  Dialog,
} from "../../components";
import { countries } from "../../api/countries";
import { usePlayers, useTeams } from "../../hooks";

interface PlayerFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const PlayerForm = ({ open, setOpen }: PlayerFormProps) => {
  const {
    createPlayer,
    updatePlayer,
    selectedPlayer,
    isEditing,
    setIsEditing,
    setSelectedPlayer,
  } = usePlayers();
  const { teams } = useTeams();

  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [steamId, setSteamId] = useState("");
  const [team, setTeam] = useState("");
  const [country, setCountry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isEditing && selectedPlayer) {
      // Update form fields when selectedPlayer prop changes
      setUsername(selectedPlayer.username);
      setAvatar(selectedPlayer.avatar || "");
      setFirstName(selectedPlayer.firstName || "");
      setLastName(selectedPlayer.lastName || "");
      setSteamId(selectedPlayer.steamid);
      setTeam(selectedPlayer.team || "");
      setCountry(selectedPlayer.country || "");
    } else {
      handleReset();
    }
  }, [isEditing, selectedPlayer]);

  const validateForm = () => {
    let isValid = true;
    setErrorMessage(""); // Clear any previous error message

    if (!username || !steamId) {
      setErrorMessage("Alias and SteamID64 are required"); // Set error message
      isValid = false;
    }

    if (steamId && !/^\d{17}$/.test(steamId)) {
      setErrorMessage("SteamID64 must be 17 digits long"); // Set error message
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return; // Early return if validation fails

    setIsSubmitting(true);
    const newPlayer: Player = {
      _id: selectedPlayer?._id || "",
      username,
      avatar,
      firstName: firstName,
      lastName: lastName,
      steamid: steamId,
      team,
      country: country,
      extra: selectedPlayer?.extra || {},
    };

    if (isEditing && selectedPlayer) {
      await updatePlayer(newPlayer);
    } else if (createPlayer) {
      await createPlayer(newPlayer);
    }

    setIsSubmitting(false);
    setOpen(false);
    handleReset();
  };

  const handleCancel = () => {
    handleReset(); // Reset form fields
    setOpen(false);
  };

  const handleReset = () => {
    setIsEditing(false);
    setSelectedPlayer(null);
    setUsername("");
    setAvatar("");
    setFirstName("");
    setLastName("");
    setSteamId("");
    setTeam("");
    setCountry("");
    setErrorMessage(""); // Clear any previous error message
  };

  return (
    <Dialog onClose={handleCancel} open={open}>
      <h1>{isEditing && "Editing"}</h1>
      <div className="flex flex-1 border-b border-border">
        <h3 className="px-6 py-4 font-semibold">
          {isEditing ? `Updating: ${username}` : "Create Player"}
        </h3>
      </div>
      <Container>
        <div className="grid w-full flex-1 grid-cols-2 gap-4 overflow-y-scroll p-6">
          <TextInput
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            error={!!errorMessage} // Set error state based on errorMessage
            errorMessage={errorMessage} // Show error message below field
          />
          <TextInput
            label="SteamID64"
            value={steamId}
            onChange={(e) => setSteamId(e.target.value)}
            required
            error={!!errorMessage} // Set error state based on errorMessage
            errorMessage={errorMessage} // Show error message below field
          />
          <TextInput
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextInput
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextInput
            label="Avatar URL"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />

          <div>
            <label htmlFor="team" className="mb-2 block font-medium text-text">
              Team
            </label>
            <select
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              name="Team"
            >
              <option value="" className="p-4 text-text">
                Team
              </option>
              {teams.map((team) => (
                <option
                  key={team._id}
                  value={team._id}
                  className="p-4 text-text"
                >
                  {team.name}
                </option>
              ))}
            </select>
          </div>
          {/* <input type="file" onChange={(e) => setFile(e.target.files?.[0])} /> */}
          <div className="mb-4">
            <label className="mb-2 block font-medium">Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Country</option>
              {Object.entries(countries).map(([key, value]) => (
                <option key={key} value={key}>
                  {value as string}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Container>
      <div className="inline-flex w-full justify-end gap-2 border-t border-border p-2">
        {errorMessage && (
          <p className="my-1 text-end text-red-500">{errorMessage}</p>
        )}
        <div className="mt-1 flex justify-end gap-1">
          {isSubmitting ? (
            <ButtonContained disabled>Submitting...</ButtonContained>
          ) : (
            <ButtonContained onClick={handleSubmit}>Submit</ButtonContained>
          )}
          <ButtonContained onClick={handleReset}>Reset</ButtonContained>
          {isEditing && ( // Conditionally render Cancel button if onCancel prop is provided
            <ButtonContained color="secondary" onClick={handleCancel}>
              Cancel
            </ButtonContained>
          )}
        </div>
      </div>
    </Dialog>
  );
};
