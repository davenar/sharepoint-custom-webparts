import { WebPartContext } from "@microsoft/sp-webpart-base";
// import { IFilePickerResult } from "@pnp/spfx-property-controls";

export interface ISpCustomCollapsibleImageProps {
  context: WebPartContext;
  textTitle: string;
  textTitleLink: string;
  text: string;
  image: string;
  chevronFontSize: number;
  imgWidth: number;
  imgHeight: number;
  // imageFromPicker: IFilePickerResult;

}
