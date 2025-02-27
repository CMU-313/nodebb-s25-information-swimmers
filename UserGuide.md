# All Features 
## Feature 1: Endorse By Staff Feature

## Feature 2: Quick Anonymous Reply
### How to use?
[**This video shows how to use this feature!**](https://github.com/user-attachments/assets/6fd3c1cb-006e-4dc0-a449-10fb6a254b44)

### How to test?
This feature is triggered by the UI when the user clicks on the "**Anonymous Reply**" button. We are not doing UI level automated testing, rather we are testing the backend. Next time, we use tools, like Puppeteer, that can implement UI automated tests. 

To test backend: 
**We added a test case in `test/topics.js` (line starting from 271)**

**Why we believe this works:** 
Anonymous reply only required one extra backend parameter (**handle == 1**), and we tested exactly for that condition.



## Feature 3: Polling feature through composer-custom
To test changes, one must un-link from the default composer and switch to the custom composer. Changes would include

1. src/meta/build.js: switch 2 instances of composer-default to composer-custom
2. src/install.js: switch 1 instance of composer-default to composer-custom
3. switch package.json line with composer-default to "nodebb-plugin-composer-custom": "file:nodebb-plugin-composer-custom",

[**This video shows how to use this feature!**]
https://github.com/CMU-313/nodebb-s25-information-swimmers/pull/38#issuecomment-2686761033