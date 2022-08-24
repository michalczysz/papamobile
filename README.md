
# papamobile - otomoto.pl scraping tool

LIVE DEMO: [papamobile.duckdns.org](http://papimobile.duckdns.org/)

Web backend and frontend for papimobile project - tool for scraping and visualising data from otomoto.pl (polish site with car advertisements) 

Frontend is done in Javascript with React 18 framework, additionally to make UI more pleasent MaterialUI has been utilized. Plots are generated with Plotly. 
API calls to backend are managed by Axios.

Backend is hosted on Google Cloud Computed Engine Instance. API run on Django-REST-framework and database is plain SQLite3.


## Installation
You can start locally this project with those commands:

Frontend:
```bash
cd papimobile
npm install
npm start
```

Backend:
```bash
cd testapi
pip install django-rest-framework
python manage.py runserver
```
## Results
![App Screenshot](https://publicmichalczysz.s3.eu-central-1.amazonaws.com/papimobile.png)
