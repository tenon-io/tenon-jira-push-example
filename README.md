# README

![Travis CI build status](https://travis-ci.org/tenon-io/tenon-jira-push-example.svg?branch=master)

This is example code only! Use it to see one example of how you could use Tenon to push to Jira.

## What this does
This example code will use the Tenon.io test API to assess a specific URL (defined on Line 8 of `test.js`) for accessibility errors. It takes the response from Tenon.io and creates an issue within Jira.

## How to use
Download all of the code or clone the repo.

Once you've configured this properly, you can open up the project folder, open up terminal, and run the following command

```
node test.js
```

It will test a web page and log a new issue in Jira.

## Setup
### You need Jira
Obviously you're going to need your own Jira instance for this. We recommend creating a dummy project for this so you don't pollute a real project. You also need a Jira username and password. It might be wise to create a special username and password just for this purpose so you can keep track of things better.

### Make sure you have an API key
If you aren't already a Tenon.io user, you'll need to [register first](https://www.tenon.io/register.php)

If you are a Tenon.io user, you're going to need to [grab your API key](https://www.tenon.io/apikey.php).

### Configure

The next step is to configure it so you can use it. Open up `config.example`, modify it as needed, and save it as `config.json`.

Here is an example of the `config.json` file

```
{
  "tenon": {
    "tenonInstanceDomain": "https://tenon.io",
    "apiKey": "",
    "projectID": "YOUR PROJECT ID",
  },
  "jira": {
    "host": "YOUR JIRA INSTANCE HOSTNAME WITH PORT",
    "user": "YOUR JIRA USERNAME",
    "password": "YOUR JIRA PASSWORD",
    "projectKey": "YOUR JIRA PROJECT KEY",
    "issueType": "Bug",
    "issueSummaryPre": "Accessibility issues found at",
    "issueDescriptionPre": "Tenon found accessibility issues:"
  }
}
```

### Tenon section
The Tenon section contains only 3 options:

* `tenonInstanceDomain`: leave this to https://tenon.io unless you're an Enterprise or Private Cloud customer. In such cases you just need to swap out this value for your Tenon instance.
* `apiKey`: enter your API key here.
* `projectID`: enter the projectID you'll be using here. Ideally you should use a project that is storing the results on Tenon. For more information on setting up a project in Tenon [watch this video](https://tenon.io/documentation/videos/18-projects.php)

### Jira section
The Jira section contains 7 options.

* `host`: enter the hostname of your Jira instance here. For example, ours is `tenon1.atlassian.net`. Yours might be different if you're self-hosting.
* `user`: enter the username of the user who will be creating the issues. This is the username they use to log into your Jira instance.
* `password`: enter the password of the user who will be creating the issues. Naturally this password should match the username.
* `issueType`: enter the issue type here. We use `Bug` but you may have a special issue type for accessibility issues
* `issueSummaryPre`: This is the beginning part of the issue summary
* `issueDescriptionPre`: This is the beginning part of the issue description. It will be followed by some issue data


## Install

Once you've downloaded/ cloned the code in this repository, run:

```npm install```

This will install all of the dependencies.


## Run

Assuming everything is installed and configured properly, go into your Terminal/ command line and type

```
node test.js
```

You should see a response that looks like this:

```
Status:
200
Response ID:
12fcc6ac8664cbcb766d2c35f4106b3e
Total Issues:
9
Result URL:
https://tenon.io/history.php?responseID=12fcc6ac8664cbcb766d2c35f4106b3e
{ id: '20506',
  key: 'PUSH-2',
  self: 'https://tenon1.atlassian.net/rest/api/2/issue/20506' }
{
```

### Response explanation

The response you'll see come back is just the result of logging a bunch of stuff to console.

* Status: This is the [response code from Tenon](http://tenon.io/documentation/understanding-response-codes.php)
* Response ID: This is the [response ID from Tenon](http://tenon.io/documentation/json-response-overview.php)
* Total issues: This is a count of the total issues found by Tenon
* Result URL: This is the URL you can go to in order to view the results. NOTE: [this depends on your project being set to "Store" results](http://tenon.io/documentation/understanding-request-parameters.php)
* response from Jira. This will include 3 important bits of information: the `id` which is the numeric ID of the new issue, `key` which is the key of the new issue (which includes the project key), and `self` which is the URL you can go to if you want to view the new issue.

## Next steps

This should put you well on your way toward being able to put this in use at your organization. The reason we created this is to show how easy it is to add a Tenon integration with other systems.

Chances are the first thing you'd want to do is use a Node module like [`tenon-node`](https://www.npmjs.com/package/tenon-node) to do your testing, because it is made specifically to work with Tenon.

Also, there are a couple of things to consider when trying to integrate with an issue tracking system. The most important consideration is how you define an "Issue".  Tenon finds an average of 40 issues per page. On very bad sites it could be even worse. We once saw 9567 issues on one page that used HTML generated by MS Word. Creating one Jira issue for every issue in Tenon's response is probably not a good idea.  Instead, here are some other ideas:

* Use [`tenon-reporters`](https://www.npmjs.com/package/tenon-reporters) to generate a CSV file that you can attach to the Jira issue.
* Group the issues by `tID`. [Each issue](http://tenon.io/documentation/understanding-issue-reports.php) has a `tID`, which represents the specific ID of the test criteria that failed. This would be a pretty effective way of handling issues like missing form labels, which would fail the same test and therefore be grouped into the same Jira issue.


If you need any help or guidance on getting Tenon integrated with your issue tracking system or other development-related system, give us a shout: talktous@tenon.io
