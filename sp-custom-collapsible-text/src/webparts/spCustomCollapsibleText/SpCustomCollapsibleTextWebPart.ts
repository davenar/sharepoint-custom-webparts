import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';
import * as strings from 'SpCustomCollapsibleTextWebPartStrings';
import SpCustomCollapsibleText from './components/SpCustomCollapsibleText';
import { ISpCustomCollapsibleTextProps } from './components/ISpCustomCollapsibleTextProps';

export interface ISpCustomCollapsibleTextWebPartProps {
  context: WebPartContext;
  title: string;
  titleFontSize: number;
  textTitle: string;
  textTitleLink: string;
  text: string;
}

export default class SpCustomCollapsibleTextWebPart extends BaseClientSideWebPart<ISpCustomCollapsibleTextWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISpCustomCollapsibleTextProps> = React.createElement(
      SpCustomCollapsibleText,
      {
        context: this.context,
        title: this.properties.title,
        titleFontSize: this.properties.titleFontSize,
        textTitle: this.properties.textTitle,
        textTitleLink: this.properties.textTitleLink,
        text: this.properties.text,
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
              groupName: 'Titolo',
              groupFields: [
                PropertyPaneTextField('title', {
                  label: 'Titolo'
                }),
                PropertyPaneSlider("titleFontSize", {
                  min: 8,
                  max: 128,
                  step: 2,
                  label: 'Dimensione font Titolo',
                  disabled: false
                }),
              ]
            },
            {
              groupName: 'Testo',
              groupFields: [
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
              ]
            }
          ]
        }
      ]
    };
  }
}
