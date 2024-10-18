import { List, ListItem } from "@mui/material";
import RecipeReviewCard from "../card/card";

export default function CardList() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: '72px' }}>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItem alignItems="flex-start">
          <RecipeReviewCard></RecipeReviewCard>
        </ListItem>
        <ListItem alignItems="flex-start">
          <RecipeReviewCard></RecipeReviewCard>
        </ListItem>
        <ListItem alignItems="flex-start">
          <RecipeReviewCard></RecipeReviewCard>
        </ListItem>
        <ListItem alignItems="flex-start">
          <RecipeReviewCard></RecipeReviewCard>
        </ListItem>
        <ListItem alignItems="flex-start">
          <RecipeReviewCard></RecipeReviewCard>
        </ListItem>
        <ListItem alignItems="flex-start">
          <RecipeReviewCard></RecipeReviewCard>
        </ListItem>
        <ListItem alignItems="flex-start">
          <RecipeReviewCard></RecipeReviewCard>
        </ListItem>
        <ListItem alignItems="flex-start">
          <RecipeReviewCard></RecipeReviewCard>
        </ListItem>
        <ListItem alignItems="flex-start">
          <RecipeReviewCard></RecipeReviewCard>
        </ListItem>
        <ListItem alignItems="flex-start">
          <RecipeReviewCard></RecipeReviewCard>
        </ListItem>
        <ListItem alignItems="flex-start">
          <RecipeReviewCard></RecipeReviewCard>
        </ListItem>
      </List>
    </div>
  );
}
