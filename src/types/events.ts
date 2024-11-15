export interface IEvent {
  id: string;
  title: string;
  description: string;
  date: string; // ISO
  time: string; // HH:mm
  location: string;
  userId: string;
}
