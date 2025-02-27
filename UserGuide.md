# All Features 
## Feature 1: Endorse By Staff Feature

## Overview

The Post Endorsement feature allows administrators and moderators to mark high-quality or valuable posts with a green "Endorsed by Staff" badge. This feature helps users identify trustworthy information that has been verified by forum staff, improving the overall quality of discussions within an educational setting.

## How to Use the Feature

### For Administrators / Teaching Staff

**Endorsing a Post**:
    - Navigate to any post or reply you want to endorse
    - Click on the flag icon in the options menu
    - Select "Endorsed by Admins" as the reason
    - Press submit
    - The post will now display an "Endorsed by Staff" badge!

**Removing an Endorsement**:
    - Go to the admin dashboard within NodeBB
    - Navigate to "Manage Flags"
    - Find the flag for the endorsed post
    - Change the flag state to "Resolved"
    - The endorsement badge will then be removed from the post

### For Regular Users

As a regular user, you'll see "Endorsed by Staff" badges on posts that administrators or moderators have endorsed.

## Automated Tests

Automated tests for the Post Endorsement feature can be found in the `test/flags.js` file, at the very bottom from lines 1190-1257. Here, you'll find two tests that were briefly mentioned above, called "Endorsing a post" and "Removing endorsement".

### What the Tests Cover:

**Initial State Test**: Verifies that posts are not marked as endorsed initially
**Admin Endorsement Test**: Tests that administrators can flag and endorse posts
**Endorsement Status Test**: Confirms that posts are correctly marked with `endorsedByStaff: true` after endorsement
**Endorsement Removal Test**: Tests that the endorsement is removed when a flag is resolved
**Re-endorsement Test**: Verifies that a post can be re-endorsed after an endorsement is removed

### Why These Tests Are Sufficient:

These tests provide comprehensive coverage of the post endorsement feature because they test a realistic cycle of endorsement for a post in a real world setting (initial state, endorsement, removal, re-endorsement)

The tests simulate real user interactions with the system and verify that the database states change properly.

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