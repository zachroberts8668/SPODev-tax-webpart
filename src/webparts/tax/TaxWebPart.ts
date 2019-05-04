import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'TaxWebPartStrings';
import Tax from './components/Tax';
import { ITaxProps } from './components/ITaxProps';

export interface ITaxWebPartProps {
  title: string;
  taxPercentage: number;
}

export default class TaxWebPart extends BaseClientSideWebPart<ITaxWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITaxProps > = React.createElement(
      Tax,
      {
        title: this.properties.title,
        taxPercentage: this.properties.taxPercentage
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
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: "Title"
                }),
                PropertyPaneTextField('taxPercentage', {
                  label: "Sales Tax Percent"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
