
/* interfaces.ts */

export interface Vehicle {
  make: string;
  model: string;
  vehicleid: number;
  state: string;
  timestamp: string;
}

export interface Response {
  status: number;
  vehicle?: Vehicle;
  error?: string;
  dbms?: number;
}
