import Vue from "vue";
import BlDefault from "~/components/backendLayouts/BlDefault";
import BlBlogpost from "~/components/backendLayouts/BlBlogpost";
import BlBlogpage from "~/components/backendLayouts/BlBlogpage";
import T3CeHeader from "~/components/contentElements/typo3/T3CeHeader";
import T3CeText from "~/components/contentElements/typo3/T3CeText";
import T3Frame from "~/components/contentElements/typo3/T3Frame";
import T3CeShortcut from "~/components/contentElements/typo3/T3CeShortcut";
import T3CeHtml from "~/components/contentElements/typo3/T3CeHtml";

Vue.component("T3BlDefault", BlDefault);
Vue.component("T3BlBlogpost", BlBlogpost);
Vue.component("T3BlBlogpage", BlBlogpage);

const components = {
  T3CeHeader,
  T3CeText,
  T3Frame,
  T3CeShortcut,
  T3CeHtml,
};

export default ({ app }) => {
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key]);
  });
};
