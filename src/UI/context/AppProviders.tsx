import React from "react";
import { PlayersProvider } from "./PlayersContext";
import { TeamsProvider } from "./TeamsContext";
import { MatchesProvider } from "./MatchesContext";
import { ThemesProvider } from "./ThemesContext";

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ThemesProvider>
      <MatchesProvider>
        <PlayersProvider>
          <TeamsProvider>{children}</TeamsProvider>
        </PlayersProvider>
      </MatchesProvider>
    </ThemesProvider>
  );
};
