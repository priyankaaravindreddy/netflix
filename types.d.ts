type InputProps = {
  id: string;
  onChange: any;
  value: string;
  label: string;
  type?: string;
};

type MobileMenuProps = {
  visible?: boolean;
};

type AccountMenuProps = {
  visible?: boolean;
};

type NavbarItemProps = {
  label: string;
  active?: boolean;
};

type PlayButtonProps = {
  movieId: string;
};
type MovieInterface = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  genre: string;
};

type MovieCardProps = {
  data: MovieInterface;
};

type MovieListProps = {
  data: MovieInterface[];
  title: string;
};

type FavoriteButtonProps = {
  movieId: string;
};


