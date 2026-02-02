import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Card, CardActions, CardContent, CardHeader, Typography } from "@mui/material";


const styles = {
  card: { maxWidth: 345 },
  media: { height: 300 },
};

interface CastCardProps {
  actor: any;
  action: (actor: any) => React.ReactNode;
}

const CastCard: React.FC<CastCardProps> = ({ actor, action }) => {
  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={
          <Avatar
            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
            sx={{ width: 56, height: 56 }}
          />
        }
        title={
          <Link 
            to={`/actors/${actor.id}`} 
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography variant="h6" component="p" sx={{ cursor: "pointer", "&:hover": { color: "primary.main" } }}>
              {actor.name}
            </Typography>
          </Link>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" component="p">
          {actor.known_for_department || "Actor"}
        </Typography>
        {actor.known_for && actor.known_for.length > 0 && (
          <Typography variant="body2" color="text.secondary" component="p" sx={{ mt: 1 }}>
            Known for: {actor.known_for[0]?.title || actor.known_for[0]?.name || "Various roles"}
          </Typography>
        )}
      </CardContent>
      <CardActions disableSpacing>
        {typeof action === 'function' ? action(actor) : null}
      </CardActions>
    </Card>
  );
};

export default CastCard;