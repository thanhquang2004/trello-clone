import {
  Cloud,
  ContentCopy,
  ContentCut,
  ContentPaste,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCardIcon from "@mui/icons-material/AddCard";
import DragHandleIcon from "@mui/icons-material/DragHandle";

const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTER_HEIGHT = "56px";

function BoardContent() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        width: 1,
        height: (theme) => theme.trelloCustomizations.boardContentHeight,
        display: "flex",
        alignItems: "center",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#dark" : "#1976d2",
      }}
    >
      {/* Box Column */}
      <Box
        sx={{
          minWidth: "300px",
          maxWidth: "300px",
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
          ml: 2,
          borderRadius: "6px",
        }}
      >
        <Box
          sx={{
            height: COLUMN_HEADER_HEIGHT,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Column title
          </Typography>
          <Box>
            <Tooltip title="More options">
              <ExpandMoreIcon
                sx={{
                  color: "text.primary",
                  cursor: "pointer",
                }}
                id="basic-column-dropdown"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              id="basic-menu-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-column-dropdown",
              }}
            >
              <MenuItem>
                <ListItemIcon>
                  <AddCardIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>

              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <DeleteForeverIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize="small" />
                </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Card
            sx={{
              cursor: "pointer",
              boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
            }}
          >
            <CardMedia
              sx={{ height: 140 }}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="green iguana"
            />
            <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
              <Typography>Lizard</Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>

          <Card
            sx={{
              cursor: "pointer",
              boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
            }}
          >
            <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
              <Typography>Lizard</Typography>
            </CardContent>
          </Card>
        </Box>

        <Box
          sx={{
            height: COLUMN_FOOTER_HEIGHT,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button startIcon={<AddCardIcon />}>Add new card</Button>
          <Tooltip title="Drag to move">
            <DragHandleIcon sx={{ cursor: "grab" }} />
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}

export default BoardContent;
