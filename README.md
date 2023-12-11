# Garden Manager App

### Capstone Project of Devcamp FullStack Developer Course

The objective of the application is to be able to keep track of our plants, whether they are ornamental plants at home or different crops in a garden.
The system will automatically notify us when an important milestone occurs in a plant (for example, irrigation needs, fertilizer, sowing/transplanting/harvesting dates).

Each plant will have a card with basic information that we can edit, as well as a journal/diary where we will add status updates or new photos of our plant.

## MainFeature

The system will send notifications via email to the user regarding different events every “x” days, depending on the frequency that we have configured for a plant and that specific event:
Examples:
Notice of irrigation, fertilization, anti-pest, sowing, harvesting, transplant time.

- function that calculates the days since the last irrigation/fertilizer/event and sends a notification to the browser.

## Additional features

- Search engine in the app, which shows results, filtering by plant name, climate, (other fields), whether it is public, and allows cloning the plant to our garden, with its recommended data (in principle without cloning the photos). → Add your photos to your new plant!
## To do in Future Release

- Possibility of seeing all the plants of a user (if they are public)

- Map locations: if the plant has location coordinates entered, it could be used to add trees (or mushrooms) and position them on a map.

---

### Technologies to use:

**Main app:**

- Development in React/Javascript
- CSS layout
- Calls via Axios to an API

**API**

- Generated with Python + FastAPI + SQLAlchemy

**Backend**

- Python
- PostgreSQL database (you can use other type)

Separate Git repositories for Frontend and Backend

Best practices

- Control Structures (login, authentication, user capabilities)
- RESTFUL APIs
- Test Driven
- Software (Vscode, MySQLWorkbench, Modelio)
- Code Quality (Vscode plugins for Linter and Formatter)
- UML Diagrams

---

### UML DIAGRAMS

**Use Case**
![Use Case](<images/plants manager Use Case diagram.png>)

**Activity Diagram**
![Alt text](<images/Garden App Activity diagram.png>)

**Class Diagram**
![Alt text](<images/Garden Manager Class diagram.png>)
