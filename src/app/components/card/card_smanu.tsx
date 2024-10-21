import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import  { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { Article } from "../../api/articles/articles";
import { useRouter  } from "next/navigation";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
  article: Article;
}

// const ExpandMore = styled((props: ExpandMoreProps) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme }) => ({
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
//   variants: [
//     {
//       props: ({ expand }) => !expand,
//       style: {
//         transform: "rotate(0deg)",
//       },
//     },
//     {
//       props: ({ expand }) => !!expand,
//       style: {
//         transform: "rotate(180deg)",
//       },
//     },
//   ],
// }));

export default function CardSmanu(props: ExpandMoreProps) {
  // const [expanded, setExpanded] = React.useState(false);
  const router = useRouter();

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };
  if (!props.article) {
    return null; // 何も表示しない、またはローディング状態にするなど
  }

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
            <Typography variant="subtitle2" color="text.secondary" onClick={() => router.push(`/components/article/${props.article.id}`)}>
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
