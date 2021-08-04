import { User } from "./user.types";
import { v4 as uuidv4 } from "uuid";

export const createUser = (name: string): User => ({
  name,
  friendIds: [],
  id: uuidv4(),
});
