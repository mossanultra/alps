import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Chip, Grid } from "@mui/material";
import styles from "../card.module.css";
import BasicTable from "../table/table";
import { Article } from "../../api/articles/articles";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
  article: Article;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function CardSmanu(props: ExpandMoreProps) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ display: "flex", width: "100%", maxWidth: 600 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <CardContent>
            <Typography component="h2" variant="h6">
              {props.article.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`${props.article.createdAt}`}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {props.article.content}
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={4}>
          <CardMedia
            component="img"
            sx={{ width: "100%", height: "100%" }}
            image={"/china.jpg"}
            alt="News Image"
          />
        </Grid>
      </Grid>
    </Card>
  );
}
