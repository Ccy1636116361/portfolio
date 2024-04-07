export type Tag = {
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  text: string;
  updated: string;
  url: string;
};

export type Project = {
  description: string;
  link: string;
  thumbnail: string;
  title: string;
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  tags: string[];
  updated: string;
  expand: { tags: Tag[] };
};
