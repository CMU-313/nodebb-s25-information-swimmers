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