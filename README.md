# Tweeter Project

Tweeter is a simple, single-page Twitter clone built with ReactJS, Express, PostgresSQL and SASS.

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Create a new pSQL database and populate it with api/migrations/schema.sql and api/seeds.seeds.sql
4. Configure api/server_files/pool.js with your database host/login/password info
5. In the terminal, navigate to the /api folder and start the server with `npm start`. The app will be served at <http://localhost:3060/>.
6. In the root folder, run `npm start` to start the React web app.
7. Go to <http://localhost:3000/> in your browser.
8. Enjoy!

## Dependencies

- ReactJS
- Express
- classnames
- moment
- axios
- Node 5.10.x or above
- node-sass

## Features:

### **Responsive Design**
 Tweeter's mostly-fluid visual design automatically scales to any size computer, tablet or smartphone screen. 
!["responsive design"](https://github.com/erikleisinger/tweeter/raw/master/samples/responsive-design.gif
)

### **Ease-of-Use**
  It's easy and intuitive to create a new tweet, or to like, unlike, or retweet someone else's!

**"Back To Top" arrow** returns users to the top the page with the click of a button

!["arrow to top - small format"](https://github.com/erikleisinger/tweeter/raw/master/samples/arrow-to-top-small.gif
)

**Hide and Collapse the draft window**
!["hide and show draft box"](https://github.com/erikleisinger/tweeter/raw/master/samples/hideandshow.gif
)

**Likes**! Users can show a tweet some love by pressing the heart beneath it

!["likes"](https://github.com/erikleisinger/tweeter/raw/master/samples/likes.gif
)

**Retweet** Signal boost your favorite tweets
!["retweet example"](https://github.com/erikleisinger/tweeter/raw/master/samples/retweet.gif
)

**Dynamic Error Messages**
!["errors"](https://github.com/erikleisinger/tweeter/raw/master/samples/errors.gif
)


