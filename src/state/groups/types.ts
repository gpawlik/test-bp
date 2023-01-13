export type Group = {
  id: string;
  name: string;
  memberCount: number;
  plans: string[];
  uri?: string;
};

export type GroupsState = {
  data: Group[];
};
