export default function About() {
  return (
    <div className="about-wrapper">
      <div><h1>About the Project</h1>
        <h2>Garden App</h2>
        <h2>Capstone Project of Devcamp FullStack Developer Course</h2>
      </div>
      <div>
        The objective of the application is to be able to keep track of our plants, whether they are ornamental plants at home or different crops in a garden. The system will automatically notify us when an important milestone occurs in a plant (for example, irrigation needs, fertilizer, sowing/transplanting/harvesting dates).
      </div>
      <div>
        Each plant will have a card with basic information that we can edit, as well as a journal/diary where we will add status updates or new photos of our plant.
      </div>
      <div>
        <h3>MainFeature</h3>
        <ul>
          <li>The system will send notifications via email to the user regarding different events every “x” days, depending on the frequency that we have configured for a plant and that specific event: Examples: Notice of irrigation, fertilization, anti-pest, sowing, harvesting, transplant time.
          </li>
          <li>
            function that calculates the days since the last irrigation/fertilizer/event and sends a notification to the browser.</li>
          <li>
            Search engine in the app, which shows results, filtering by plant name, category, (other fields), whether it is public, and allows cloning the plant to our garden, with its basic data (without cloning the photos). → Add your photos to your new plant!
          </li>
        </ul>
      </div>
      <div>
        <h3>Features in next version...</h3>
        <ul>
          <li>Possibility of seeing all the plants of a user (if they are public)
          </li>
          <li>
            Map locations: if the plant has location coordinates entered, it could be used to add trees (or mushrooms) and position them on a map.
          </li>
        </ul>
      </div>
      <div>

        More info in: <a target="_blank" rel="noreferrer" href="https://github.com/Daroch/garden-app">https://github.com/Daroch/garden-app</a>

      </div>
    </div>
  );
}
