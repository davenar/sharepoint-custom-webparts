import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';
import * as strings from 'SpCustomCollapsibleImageWebPartStrings';
import SpCustomCollapsibleImage from './components/SpCustomCollapsibleImage';
import { ISpCustomCollapsibleImageProps } from './components/ISpCustomCollapsibleImageProps';
// import { IFilePickerResult,PropertyFieldFilePicker } from '@pnp/spfx-property-controls';


export interface ISpCustomCollapsibleImageWebPartProps {
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

export default class SpCustomCollapsibleImageWebPart extends BaseClientSideWebPart<ISpCustomCollapsibleImageWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISpCustomCollapsibleImageProps> = React.createElement(
      SpCustomCollapsibleImage,
      {
        context: this.context,
        textTitle: this.properties.textTitle,
        textTitleLink: this.properties.textTitleLink,
        text: this.properties.text,
        image: this.properties.image,
        chevronFontSize: this.properties.chevronFontSize,
        imgWidth: this.properties.imgWidth,
        imgHeight: this.properties.imgHeight
        // imageFromPicker: this.properties.imageFromPicker
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'description placeholder'
          },
          groups: [
            {
              groupName: 'Impostazioni',
              groupFields: [
                PropertyPaneTextField('image', {
                  label: 'URL Immagine'
                }),
                PropertyPaneSlider("chevronFontSize", {
                  min: 10,
                  max: 100,
                  step: 2,
                  label: 'Dimensione Freccia',
                  disabled: false
                }),
                PropertyPaneSlider("imgWidth", {
                  min: 64,
                  max: 512,
                  step: 2,
                  label: 'Larghezza Immagine (px)',
                  disabled: false
                }),
                PropertyPaneSlider("imgHeight", {
                  min: 64,
                  max: 512,
                  step: 2,
                  label: 'Altezza Immagine (px)',
                  disabled: false
                }),
                PropertyPaneTextField('textTitle', {
                  label: 'Titolo Testo'
                }),
                PropertyPaneTextField('textTitleLink', {
                  label: 'URL Link Titolo Testo'
                }),
                PropertyPaneTextField('text', {
                  label: 'Testo HTML',
                  multiline: true
                }),
                
                //  PropertyFieldFilePicker('imageFromPicker', {
                //   context: this.context as any,
                //   filePickerResult: this.properties.imageFromPicker,
                //   onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                //   properties: this.properties,
                //   onSave: (e: IFilePickerResult) => { console.log(e); this.properties.imageFromPicker = e; },
                //   onChanged: (e: IFilePickerResult) => { console.log(e); this.properties.imageFromPicker = e; },
                //   key: "filePickerId",
                //   buttonLabel: "Select",
                //   label: "Select Image",
                //   accepts: ['jpeg', 'jpg', 'svg', 'png', 'bmp', 'gif']
                // }),
              ]
            }
          ]
        }
      ]
    };
  }
}
