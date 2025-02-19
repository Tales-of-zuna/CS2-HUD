import { useEffect, useState } from "react";
import {
  ButtonContained,
  Container,
  TextInput,
  Dialog,
} from "../../components";
import { countries } from "../../api/countries";
import { useTeams } from "../../hooks";

interface TeamsFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const TeamsForm = ({ open, setOpen }: TeamsFormProps) => {
  const [teamName, setTeamName] = useState("");
  const [shortName, setShortName] = useState("");
  const [country, setCountry] = useState("");
  const [logo, setLogo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    createTeam,
    updateTeam,
    isEditing,
    setIsEditing,
    selectedTeam,
    setSelectedTeam,
  } = useTeams();

  useEffect(() => {
    if (isEditing && selectedTeam) {
      setTeamName(selectedTeam.name || "");
      setShortName(selectedTeam.shortName || "");
      setCountry(selectedTeam.country || "");
      setLogo(selectedTeam.logo || "");
    } else {
      handleReset();
    }
  }, [isEditing, selectedTeam]);

  const validateForm = () => {
    let isValid = true;
    setErrorMessage("");

    if (!teamName || !logo) {
      setErrorMessage("Team name and Logo required!");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    const newTeam: Team = {
      _id: selectedTeam?._id || "",
      name: teamName,
      logo,
      shortName: shortName || "",
      country: country || "",
      extra: selectedTeam?.extra || {},
    };

    if (isEditing && selectedTeam) {
      await updateTeam(newTeam);
    } else if (createTeam) {
      await createTeam(newTeam);
    }

    setIsSubmitting(false);
    setOpen(false);
    handleReset();
  };

  const handleCancel = () => {
    handleReset();
    setOpen(false);
  };

  const handleReset = () => {
    setIsEditing(false);
    setSelectedTeam(null);
    setTeamName("");
    setShortName("");
    setCountry("");
    setLogo("");
    setErrorMessage("");
  };

  return (
    <Dialog onClose={handleCancel} open={open}>
      <div className="flex flex-1 border-b border-border">
        <h3 className="px-6 py-4 font-semibold">
          {isEditing ? `Updating: ${teamName}` : "Create Team"}
        </h3>
      </div>
      <Container>
        <div className="my-2 flex w-full flex-col gap-3">
          <TextInput
            label={"Team Name"}
            value={teamName}
            required
            onChange={(e) => setTeamName(e.target.value)}
            error={!!errorMessage}
            errorMessage={errorMessage}
          />
          <TextInput
            label="Short Name"
            value={shortName}
            onChange={(e) => setShortName(e.target.value)}
          />
          <form className="mb-4">
            <label className="mb-2 block font-medium text-text">Country</label>
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
          </form>
          <TextInput
            label="Logo URL"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            required
            error={!!errorMessage} // Set error state based on errorMessage
            errorMessage={errorMessage} // Show error message below field
          />
        </div>
      </Container>
      <div className="flex w-full justify-end gap-2 border-t border-border p-2">
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
          {isEditing && (
            <ButtonContained color="secondary" onClick={handleCancel}>
              Cancel
            </ButtonContained>
          )}
        </div>
      </div>
    </Dialog>
  );
};
