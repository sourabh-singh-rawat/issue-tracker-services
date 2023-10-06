import React from "react";

import MuiList from "@mui/material/List";
import WorkspaceListItem from "../WorkspaceListItem";
interface WorkspaceListProps {
  options: { name: string; id: string }[];
  selectedOption: { name: string; id: string } | undefined;
  setSelectedOption: React.Dispatch<
    React.SetStateAction<{ name: string; id: string } | undefined>
  >;
  isOpen: boolean;
  handleClose: () => void;
}

export default function WorkspaceMenuList({
  options,
  selectedOption,
  setSelectedOption,
  isOpen,
  handleClose,
}: WorkspaceListProps) {
  return (
    <MuiList disablePadding>
      {options.map((option) => (
        <WorkspaceListItem
          key={option.id}
          isOpen={isOpen}
          option={option}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          handleClose={handleClose}
        />
      ))}
    </MuiList>
  );
}
