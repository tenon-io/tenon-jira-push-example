var unirest = require('unirest');
var config = require('./config.json');
var jira = require('jira-api');

var Request = unirest.post(config.tenon.tenonInstanceDomain + '/api/index.php')
  .send({
    key: config.tenon.apiKey,
    projectID: config.tenon.projectID,
    url: 'http://www.google.com' // In the real world you're going to want to pass each url in some other way
  }).end(function (response) {

    console.log('Status:');
    console.log(response.body.status);

    console.log('Response ID:');
    console.log(response.body.request.responseID);

    console.log('Total Issues: ');
    console.log(response.body.resultSummary.issues.totalIssues);

    console.log('Result URL:');
    console.log(config.tenon.tenonInstanceDomain + '/history.php?responseID=' + response.body.request.responseID);

    if (response.body.status === 200) {

      var fullIssueDescription = config.jira.issueDescriptionPre + '\n' +
        'Density: ' + response.body.resultSummary.density.allDensity + '\n' +
        'Total Issues: ' + response.body.resultSummary.issues.totalIssues + '\n' +
        'Level A Issues: ' + response.body.resultSummary.issuesByLevel.A.count + '\n' +
        'Level AA Issues: ' + response.body.resultSummary.issuesByLevel.AA.count + '\n' +
        'Level AAA Issues: ' + response.body.resultSummary.issuesByLevel.AAA.count + '\n' +
        'More at: ' + config.tenon.tenonInstanceDomain + '/history.php?responseID=' + response.body.request.responseID + '\n';

      var options = {
        config: {
          "username": config.jira.user,
          "password": config.jira.password,
          "host": config.jira.host
        },
        data: {
          fields: {
            project: {
              key: config.jira.projectKey,
            },
            summary: response.body.resultSummary.issues.totalIssues + ' ' + config.jira.issueSummaryPre + ' ' + response.body.request.url,
            description: fullIssueDescription,
            issuetype: {
              name: config.jira.issueType
            }
          }
        }
      };

      jira.issue.post(options, function (response) {
        // in the real world you'll want to do something more interesting with the response.
        console.log(JSON.stringify(response, null, 4));
      });
    }

  });
