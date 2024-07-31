import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { IUser } from '@/interfaces/interfaceUser';
import { useState } from 'react';
import { IAddTeam } from '@/interfaces/interfaceTournaments';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const friends: IUser[] = [
    {
        id: "1",
        nickName: "cesar1",
        email: "cesar",
        birthDate: "cesar",
        role: "user",
        teams: [],
        tournaments: [],
    },

    {
        id: "2",
        nickName: "cesar2",
        email: "cesar",
        birthDate: "cesar",
        role: "user",
        teams: [],
        tournaments: [],
    },

    {
        id: "3",
        nickName: "cesar3",
        email: "cesar",
        birthDate: "cesar",
        role: "user",
        teams: [],
        tournaments: [],
    },
]

// function getStyles(name: string, teamMembers: readonly string[], theme: Theme) {
//   return {
//     fontWeight:
//     teamMembers.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

export default function MultipleSelectChip() {
//   const theme = useTheme();
const [addTeam, setAddTeam] = useState<IAddTeam>({
    tournamentId: "",
    teamName: "",
    members: [],
});

const [teamMembers, setTeamMembers] = React.useState<string[]>([]);
  const handleChangeMembers = (event: SelectChangeEvent<typeof teamMembers>) => {
    const { value } = event.target;
    const selectedNicknames = typeof value === 'string' ? value.split(',') : value;

    // Encuentra los objetos completos basados en los nicknames seleccionados
    const selectedMembers = friends.filter(friend => selectedNicknames.includes(friend.nickName));

    // Actualiza el estado de teamMembers y addTeam
    setTeamMembers(selectedNicknames);
    setAddTeam(addTeam => ({
      ...addTeam,
      members: selectedMembers
    }));
    console.log("addTeam", addTeam.members)
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="members">Members</InputLabel>
        <Select
          labelId="members"
          id="members"
          multiple
          value={teamMembers}
          onChange={handleChangeMembers}
          input={<OutlinedInput id="multipleMembers" label="Members" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {friends.map((friend) => (
            <MenuItem
              key={friend.id}
              value={friend.nickName}
            //   style={getStyles(friend.nickName, teamMembers, theme)}
            >
              {friend.nickName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}