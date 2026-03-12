import React from "react";
// useProductContext hook retrieves current Atlassian app context
import ForgeReconciler, { Text, useProductContext } from "@forge/react";
// requestJira calls the Jira REST API
import { requestJira } from "@forge/bridge";

const App = () => {
  const context = useProductContext();

  // add the the 'comments' variable to store comments data
  const [comments, setComments] = React.useState();
  console.log(`Number of comments on this issue: ${comments?.length}`);

  // start of function that calls Jira REST API
  const fetchCommentsForIssue = async () => {
    // extract issue ID instead expecting one from function input
    const issueId = context?.extension.issue.id;
    // modify to take issueId variable
    const res = await requestJira(`/rest/api/3/issue/${issueId}/comment`);
    const data = await res.json();
    return data.comments;
  };

  React.useEffect(() => {
    if (context) {
      // extract issue ID from the context
      const issueId = context.extension.issue.id;
      // use the issue ID to call fetchCommentsForIssue(),
      // then updates data stored in 'comments'
      fetchCommentsForIssue().then(setComments);
    }
  }, [context]);

  // This UI will be updated in the next part of this tutorial
  // to display number of comments onto the screen
  return <Text>Hello world!</Text>;
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
