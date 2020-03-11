export interface ISection {
  id?: number;
  sectionType?: string;
  delayInMs?: number;
  hidden?: boolean;
  contentId?: string;
  contentEmotion?: string;
}

export class Section implements ISection {
  constructor(
    public id?: number,
    public sectionType?: string,
    public delayInMs?: number,
    public hidden?: boolean,
    public contentId?: string,
    public contentEmotion?: string
  ) {
    this.hidden = this.hidden || false;
  }
}
