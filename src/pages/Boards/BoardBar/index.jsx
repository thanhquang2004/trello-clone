import { Avatar, AvatarGroup, Box, Button, Chip, Tooltip } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LockIcon from "@mui/icons-material/Lock";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

const MENU_STYLE = {
  color: "primary.main",
  bgcolor: "white",
  border: "none",
  px: "5px",
  borderRadius: "5px",
  "& .MuiSvgIcon-root": {
    color: "primary.main",
  },
  "&:hover": {
    bgcolor: "primary.50",
  },
};

function BoardBar() {
  return (
    <Box
      px={2}
      sx={{
        width: 1,
        height: (theme) => theme.trelloCustomizations.boardBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        overflowX: "auto",
        borderTop: "1px solid #00bfa5",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Chip
          sx={MENU_STYLE}
          icon={<DashboardIcon />}
          label="Board"
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<LockIcon />}
          label="Public/private workspace"
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<BoltIcon />}
          label="Automations"
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<FilterListIcon />}
          label="Filters"
          clickable
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Button variant="outlined" startIcon={<PersonAddAlt1Icon />}>Invite</Button>
        <AvatarGroup
          max={4}
          sx={{
            "& .MuiAvatar-root": {
              width: 34,
              height: 34,
              fontSize: "16px",
            },
          }}
        >
          <Tooltip title="Quang">
            <Avatar alt="Quang" src="/static/images/avatar/1.jpg" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  );
}

export default BoardBar;
