
---
# WxCC Custom Widget: Surfly co-browse


## Introduction

Cisco WxCC Desktop currently doesn't offer out-of-box co-browse functionality. This custom widget allows [Surfly](https://www.surfly.com/universal-co-browsing/) co-browse integration and enables WxCC contact centre agents to use co-browse as an adjunct channel when serving customers with voice or messaging channels. 

Basically, while on exiting voice or messaging interaction with the customer, agent can propose co-browse session. Customer is supposed to initiate bo-browse session from a known page and communicate session code with the agent.

<img src="./README-resources/CustomerStartsCobrowse.png" width="950" />

Than, agent switch to Surfly co-browse pannel, enters the code shared by the customer, verbally or in the message. 

<img src="./README-resources/AgentEntersPin.png" width="950"  />

The co-browse session starts. If needed, the agent can move away from co-brose session, use other panes in WxCC and return to continue co-browse. 

<img src="./README-resources/AgentInCoBrowse.png" width="950"  />

---
**Not in this version:** 
This version of the widget does not support:
- WxCC Reporting
- [Rich Customer History](https://github.com/dzlatic/rich-customer-history), neither [Customer Journey Data Services](https://cjaas.cisco.com/home#/home) integration
- Handling of standalone Surfly queue
---
**Important notes:** 
- This version of widget is also tested for video support inside Surfly, but you would have to allow use of camera and microphone in your browser.
- Sometimes VPN and Surfly don't play nicely together and you may get 406 message! Prepare and test your demo in advance and avoid any surprises. For production issues, please work with your IT department and Surfly support. This custom widget component is not supported by Cisco!
---
**Possible Surfly Defect - under investigation:** 
- While running demo, do not keep Surfly admin session open, as it creates a conflict with your agent session and APIs do not report a proper session owneship, so the widget will not be finding an active session after you leave the widget and then come back.
---

## How to deploy

### Surfly Account

Your organization must have an Enterprise account on Surfly.com. 

---
**NOTE:** 
- The build shared on the link below does use temporary Cisco evaluation Enterprise account keys. Usage is closely monitored for misuse! Please do not use it, unless you are part of Cisco, or you work for Cisco partner and you are advised by Cisco to try this component in the demo.
---

### Desktop Layout Configuration 

You can copy the code below into your WxCC desktop layout, into "navigation" section:

```
{
      "nav" : {
        "label" : "Surfly",
        "icon" : "https://www.surfly.com/wp-content/uploads/2022/02/favicon_Surfly_big.png",
        "iconType" : "other",
        "navigateTo" : "cobrowse",
        "align" : "top"
      },
      "page" : {
        "id" : "cobrowse",
        "widgets": {
          "console": {
              "comp": "surfly-widget",
              "script": "https://ciscoemearwxcccustomwidgents.s3.eu-central-1.amazonaws.com/surfly-widget/build/surfly-widget.js",
              "attributes": {
                "isDarkMode": "$STORE.app.darkMode",
                "agentName": "$STORE.agent.agentName",
                "agentEmailId": "$STORE.agent.agentEmailId"
              },
              "wrapper": { "title": "Surfly Console", "maximizeAreaName" : "app-maximize-area" }
              }
        },
        "layout": {
          "areas": [["console"]],
          "size": {
            "cols": [1],
            "rows": [1]
          }
        }
      }
    }  
```

## How to customize and rebuild 

Best way to start would be to review documentation: https://developer.webex-cx.com/documentation/guides/desktop and learn about building Custom Widgets.




1. The very first step would be to clone this repository: https://github.com/CiscoDevNet/webex-contact-center-widget-starter .

2. Rename the folder to something like "surfly-widget-XYZ" or what ever you find good for you.

3. Replace all files in starter widget repository react folder with those provided in THIS repository. The best would be to do it one file by one so that you don't loose any of the files or folders you got from original startes repository.

4. Enter your Surfly REST API code into the [App.tsx](react/src/direflow-component/App.tsx) file, line 16.

5. In the same file, in line 15 change version number to "something else".  

6. Run **yarn** command in the folder you renamed in step 2.

7. Run **yarn** command in **/react** subfolder, and then in the same folder run **yarn build** command. This will generate **/build** folder under **/react**. Use the same "something else" value from step 5 to rename **/build** directory to. This is the folder you would be publishing in next step.

8. Once build, the component should be deployed on public URL, [AWS](https://aws.amazon.com/getting-started/hands-on/host-static-website/), [Google Cloud](https://cloud.google.com/storage/docs/hosting-static-website), [Microsoft Azure](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website-host), [IBM Bluemix](https://www.ibm.com/cloud/blog/deploying-static-web-sites?mhsrc=ibmsearch_a&mhq=deploy%20static%20web%20page), [Heroku](https://gist.github.com/wh1tney/2ad13aa5fbdd83f6a489), [Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-deploy-a-static-website-to-the-cloud-with-digitalocean-app-platform) or any other option of your choice...


## How To Report Errors and Propose Improvements

Please contact Darko Zlatic (dzlatic@cisco.com).
