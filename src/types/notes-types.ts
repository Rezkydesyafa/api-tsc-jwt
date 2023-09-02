interface createNotes {
  title: String;
  tag?: String;
  Notes: String;
  username?: string;
}
interface IupdateNotes {
  title?: String;
  tag?: String;
  Notes?: String;
  username?: string;
  id?: number;
}
interface Irequestupdate extends Request {
  id: number;
  username: String;
}

export { createNotes, IupdateNotes, Irequestupdate };
