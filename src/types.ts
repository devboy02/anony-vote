export type ProposalCard = {
  daoName: string;
  name: string;
  color: string;
  proposalId: string;
};

export type UpcomingCard = {
  daoName: string;
  text: string;
  startTime: string;
  proposalId: string;
  members: string[];
};

export type Proposal = {
  id: number;
  name: string;
  description: string;
  document: string;
  createTime: string;
  startTime: string;
  endTime: string;
  status: number;
  requester: string;
  dao: string;

  speakers: string[];
  moderators: string[];
};

export type Member = {
  address: string;
  userType: number; //0 - member, 1 - moderator, 2 - council
  level: number;
  status: number; //active, waiting approval , banned
  createTime: string;
  updateTime: string;
};

export type DaoConfig = {
  key: string; // contract address
  contractAddress: string;
  name: string;
  xUsername: string;
  website: string;
  description: string;
  owner: string;
};

export type Dao = {
  proposals: Proposal[];
  members: Member[];
} & DaoConfig;
