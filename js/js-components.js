import { moonData } from "./facts.js";
export function MoonInfoBlocks(data, error = "") {
    if (error) {
        return `<p> ${error} </p>`;
    }
    return `
    <p>Phase name: ${data.currentMoonPhaseName}</p>
    <p>Day of the week: ${data.currentMoonPhaseWeekDay}</p>
    <p>Today's date: ${data.currentDate}</p>
    <p>Exposed moon: ${data.fracillum}</p>
    `;
}
export function RandomMoonFactsBlocks() {
    const howManyFacts = moonData.moon_facts.length;
    const randomNumber = Math.floor(Math.random() * howManyFacts) - 1;
    return `
    <h2>Random facts about the Moon</h2>
    <p class="moon-fact">${moonData.moon_facts[randomNumber].fact}</p>
    <p class="moon-fact">${moonData.moon_facts[randomNumber + 1].fact}</p>
            `;
}
export function FormDialogComponent() {
    return `<form action="/sendComplain.php" method="post">
                <label for="category">Complaint Category:</label>
                <select id="category" name="category" required>
                    <option value="">Select Category</option>
                    <option value="Server error">Server Error</option>
                    <option value="Fake data">Fake Data</option>
                    <option value="Illegal data">Illegal Data</option>
                    <option value="other">Other</option>
                </select>
                <br /><br />

                <label>Urgency Level:</label><br />
                <input type="radio" id="low" name="urgency" value="low" required />
                <label for="low">Low</label><br />

                <input type="radio" id="medium" name="urgency" value="medium" />
                <label for="medium">Medium</label><br />

                <input type="radio" id="high" name="urgency" value="high" />
                <label for="high">High</label><br /><br />

                <label for="name">Your Name:</label>
                <input type="text" id="name" name="name" required />
                <br /><br />

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required placeholder="type email..." />
                <br /><br />

                <label for="occupation">Occupation</label>
                <input type="text" id="occupation" name="occupation" />
                <br /><br />

                <label for="details">Complaint Details:</label>
                <textarea id="details" name="details" rows="4" cols="50" required></textarea>
                <br /><br />

                <label for="agreeContact">Agree to contact you back</label>
                <input type="checkbox" name="agreeContact" id="agreeContact" />
                <br /><br />

                <button type="reset">Reset Form</button>
                <br /><br />
                <button type="submit">Submit Complaint</button>
            </form>`;
}
