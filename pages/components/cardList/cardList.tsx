import { List, ListItem } from "@mui/material";
import RecipeReviewCard from "../card/card";

export default function CardList() {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "72px" }}
    >
      <List sx={{ width: "100%", maxWidth: 720, bgcolor: "background.paper" }}>
        <ListItem alignItems="flex-start">
          <RecipeReviewCard expand={false} title={"mozuku"} image={'/china.jpg'}></RecipeReviewCard>
        </ListItem>
        <ListItem alignItems="flex-start">
          <RecipeReviewCard expand={false} title={"taira"} image={'/hatiware.jpeg'}></RecipeReviewCard>
        </ListItem>
        <ListItem alignItems="flex-start">
          <RecipeReviewCard expand={false} title={"mekabu"} image={'/otokoume.jpg'}></RecipeReviewCard>
        </ListItem>
      </List>
    </div>
  );
}
