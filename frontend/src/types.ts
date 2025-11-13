// src/types.ts
export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  address?: string;
  location?: { coordinates: [number, number] };
}