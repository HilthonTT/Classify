export enum EntityType {
  ITEM,
  FOLDER,
}

export enum Action {
  CREATE,
  UPDATE,
  DELETE,
  TRASH,
  MOVE,
}

export type ActivityLog = {
  id: number;
  orgId: string;
  entityId: number;
  entityType: EntityType;
  action: Action;
  username: string;
  userId: string;
  userImage: string;
  message: string;
  reason?: string;
  dateCreated: Date;
};
