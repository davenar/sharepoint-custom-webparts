import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISpCustomCollapsibleTextProps {
  context: WebPartContext;
  title: string;
  titleFontSize: number;
  textTitle: string;
  textTitleLink: string;
  text: string;
}
