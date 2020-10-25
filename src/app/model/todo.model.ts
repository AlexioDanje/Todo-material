export interface Todo {
  title: string;
  id: number;

}

export class TodoImpl implements Todo {
  id: number;
  title: string;
}
