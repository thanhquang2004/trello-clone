import GroupIcon from "@mui/icons-material/Group";
import AttachmentIcon from "@mui/icons-material/Attachment";
import CommentIcon from "@mui/icons-material/Comment";

import {
  CardContent,
  Button,
  CardActions,
  CardMedia,
  Typography,
} from "@mui/material";

import { Card as MuiCard } from "@mui/material";

function Card() {
  return (
    <MuiCard
      sx={{
        cursor: "pointer",
        boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
        overflow: "unset",
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
      <CardActions sx={{ p: "0 4px 8px 4px" }}>
        <Button size="small" startIcon={<GroupIcon />}>
          20
        </Button>
        <Button size="small" startIcon={<CommentIcon />}>
          15
        </Button>
        <Button size="small" startIcon={<AttachmentIcon />}>
          10
        </Button>
      </CardActions>
    </MuiCard>
  );
}

export default Card;
