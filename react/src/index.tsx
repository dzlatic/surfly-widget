import { DireflowComponent } from "direflow-component";
import App from "./direflow-component/App";

const direflowProperties = {
  isDarkMode: false,
  agentName: "",
  agentEmailId: ""
};

export default DireflowComponent.create({
  component: App,
  configuration: {
    tagname: "surfly-widget",
    useShadow: true,
  },
  properties: direflowProperties,
  plugins: [
    {
      name: "font-loader",
      options: {
        google: {
          families: ["Advent Pro", "Noto Sans JP"],
        },
      },
    },
  ],
});
