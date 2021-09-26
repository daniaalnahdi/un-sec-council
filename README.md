# United Nations Security Council Database

This web application was created using React for the frontend and Node.js for the backend, and deployed via Heroku. The intent behind this project was to make Security Council data more accessible for educational and research purposes. This involved designing and creating a REST web API utilizing SQL queries.

The web application and API can be accessed at https://un-sec-council.herokuapp.com/. _Currently, due to storage and query limitations, the API and app only contain a subset of our data which is data from the last 5 years (2017-2021)._

## API Overview

| Methods | URLs | Actions |
| --- | --- | --- |
| GET | /meetings |Get all meetings |
| GET | /meetings:id |Get meeting via meeting ID |
| GET | /meetings:id/votes |Get meeting votes via meeting ID |
| GET | /roster |Get all roster years |
| GET | /roster/:year/countries |Get all countries on roster via roster year |
| GET | /roster/:year/meetings |Get all meetings from a roster via roster year |
