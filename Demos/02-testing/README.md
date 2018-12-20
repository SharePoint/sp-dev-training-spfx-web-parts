# Testing with the local and hosted SharePoint Workbench

In this demo you will work with the two different versions of the SharePoint Workbench, the local & hosted workbench, as well as the different modes of the built in gulp **serve** task.

1. Open **Visual Studio Code** and open the SharePoint Framework web part project you created in the previous exercise.
1. Start the local web server using the provided gulp **serve** task:

    ```shell
    gulp serve
    ```

1. The SharePoint Framework's gulp **serve** task will build the project, start a local web server and launch a browser open to the SharePoint Workbench.
1. Add the web part to the page.
1. Now, with both the browser and Visual Studio code on the same screen, edit the HTML in the web part's `render()` method, located in the **src/webparts/helloWorld/HelloWorldWebPart.ts** file.
1. If you save the file (*or let Visual Studio Code save it after a few seconds of inactivity*), you will see the command prompt window execute a lot of commands and then the browser will refresh.

    This is because the gulp **serve** task is monitoring all code files such as `*.ts`, `*.html` and `*.scss` for changes. If they change, it reruns the tasks that `gulp serve` ran for you. It then refreshed the browser as it is using a utility that allows the server to have some control over the local workbench.

    This makes development very easy!

## Testing with the SharePoint Online Hosted Workbench

1. Next, in the browser navigate to one of your SharePoint Online sites and append the following to the end of the root site's URL: **/_layouts/workbench.aspx**. This is the SharePoint Online hosted workbench.
1. Notice when you add a web part, many more web parts will appear beyond the one we created and was the only one showing in the toolbox on the local workbench. This is because you are now testing the web part in a working SharePoint site.

    ![Screenshot of the SharePoint Online hosted workbench](./../../Images/ex02-testing-01.png)

    > NOTE: The difference between the local and hosted workbench is significant. Consider a local workbench is not a working version of SharePoint, rather just a single page that can let you test web parts. This means you won't have access to a real SharePoint context, lists, libraries or real users when you are testing in the local workbench.

1. Let's see another difference with the local vs. hosted workbench. Go back to the web part and make a change to the HTML. 

    Notice after saving the file, while the console displays a lot of commands, the browser that is displaying the hosted workbench does not automatically reload. This is expected. You can still refresh the page to see the updated web part, but the local web server cannot cause the hosted workbench to refresh.

1. Close both the local and hosted workbench and stop the local web server by pressing <kbd>CTRL</kbd>+<kbd>C</kbd> in the command prompt.

## The different modes of the gulp serve task

The gulp **serve** task that you have run so far has automatically opened the local workbench. But there may be cases where you do not want to launch the local workbench and rather, you want to test with the hosted workbench. In these scenarios, you have two options.

1. Start the local web server using the provided gulp **serve** task:

    ```shell
    gulp serve --nobrowser
    ```

1. In this case the gulp **serve** task will run just like normal and start the local webserver, but it will not launch the browser.
1. Open a browser and navigate to one of your SharePoint Online sites and append the following to the end of the root site's URL: **/_layouts/workbench.aspx**.
1. Notice the web part is appearing in the toolbox. Everything still works, you just don't get the default browser!
1. Close the hosted workbench and stop the local web server by pressing <kbd>CTRL</kbd>+<kbd>C</kbd> in the command prompt.

But what if you want the browser to open the hosted workbench automatically for you? In that case, you can use a configuration setting to tell the gulp **serve** task what to do.

1. Locate and open the file **config/serve.json**
1. In the **serve.json** file, add the following JSON to the end of the JSON file:

    ```json
    "serveConfigurations": {
      "default": {
        "pageUrl": "https://contoso.sharepoint.com/sites/mySite/_layouts/workbench.aspx"
      },
      "myConfig": {
        "pageUrl": "https://contoso.sharepoint.com/sites/mySite/_layouts/workbench.aspx"
      }
    }
    ```

    The resulting file would look like the following:

    ```json
    {
      "$schema": "https://developer.microsoft.com/json-schemas/core-build/serve.schema.json",
      "port": 4321,
      "https": true,
      "initialPage": "https://localhost:5432/workbench",
      "api": {
        "port": 5432,
        "entryPath": "node_modules/@microsoft/sp-webpart-workbench/lib/api/"
      },
      "serveConfigurations": {
        "default": {
          "pageUrl": "https://contoso.sharepoint.com/sites/mySite/_layouts/workbench.aspx"
        },
        "myConfig": {
          "pageUrl": "https://contoso.sharepoint.com/sites/mySite/_layouts/workbench.aspx"
        }
      }
    }
    ```

    > NOTE: Ensure you enter the proper URL of a SharePoint Online site collection you have access to.

1. Now, run either of the following two commands to start the local web server and navigate to the hosted workbench:

    ```shell
    gulp serve
    # or
    gulp serve --config myConfig
    ```

1. Notice the browser will now load, but it will also navigate to you to your hosted workbench in SharePoint Online.

    You can use multiple configurations for different sites if you like. This will be useful when you test SharePoint Framework extensions.

1. Close the hosted workbench and stop the local web server by pressing <kbd>CTRL</kbd>+<kbd>C</kbd> in the command prompt.