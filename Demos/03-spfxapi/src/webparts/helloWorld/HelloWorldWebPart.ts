// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import {
  Version,
  DisplayMode,
  Log
} from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HelloWorldWebPart.module.scss';
import * as strings from 'HelloWorldWebPartStrings';

export interface IHelloWorldWebPartProps {
  description: string;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  public render(): void {
    const siteTitle: string = this.context.pageContext.web.title;
    const pageMode: string = (this.displayMode === DisplayMode.Edit)
      ? 'You are in edit mode'
      : 'You are in read mode';

    this.context.statusRenderer.displayLoadingIndicator(this.domElement, "message");
    setTimeout(() => {
      this.context.statusRenderer.clearLoadingIndicator(this.domElement);
      this.domElement.innerHTML = `
        <div class="${styles.helloWorld}">
          <div class="${styles.container}">
            <div class="${styles.row}">
              <div class="${styles.column}">
                <span class="${styles.title}">Welcome to SharePoint!</span>
                <p class="${styles.subTitle}"><strong>Site title:</strong> ${siteTitle}</p>
                <p class="${styles.subTitle}"><strong>Page mode:</strong> ${pageMode}</p>
                <p class="${styles.subTitle}">Customize SharePoint experiences using Web Parts.</p>
                <p class="${styles.description}">${escape(this.properties.description)}</p>
                <a href="#" class="${styles.button}">
                  <span class="${styles.label}">Learn more</span>
                </a>
              </div>
            </div>
          </div>
        </div>`;

      this.domElement.getElementsByClassName(`${styles.button}`)[0]
        .addEventListener('click', (event: any) => {
          event.preventDefault();
          alert('Welcome to the SharePoint Framework!');
        });

    }, 5000);

    Log.info('HelloWorld', 'message', this.context.serviceScope);
    Log.warn('HelloWorld', 'WARNING message', this.context.serviceScope);
    Log.error('HelloWorld', new Error('Error message'), this.context.serviceScope);
    Log.verbose('HelloWorld', 'VERBOSE message', this.context.serviceScope);
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
