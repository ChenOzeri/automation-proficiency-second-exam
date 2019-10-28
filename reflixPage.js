const seleniumInfra = require('./seleniumInfra')
const selenium = new seleniumInfra()

class ReflixPage {
    constructor(URL) {
        selenium.getURL(URL)
    }

    async selectUser(userName) {
        try {
            let user = await selenium.findElementListBy("className", "user")
            for (let u in user) {
                if (userName == "Tina")
                    await selenium.clickElement("className", "user")
            }
            console.log(userName)

            // loop for findELEMENTS - > then loops until it finds the wanted string 

            let validateURL = await selenium.validURL("catalog")
            if (validateURL) {
                console.log("URL is catalog as expected")
            }
            else {
                console.log("Error: can't navigate to the desired URL")
            }
        } catch (error) {
            console.error("Problem with selectUser function " + error)
        }
    }

    async orderAndReturnTwoMovies(wantedMovie, wantedMovie2) {
        try {
            let movieBudget = await selenium.getTextFromElement("id", "budget")
            console.log("budget = " + movieBudget)
            if (movieBudget.includes("10")) {
                console.log("Movie budget is 10$.")
            }
            else {
                console.log("wrong budget.")
            }

            let plusButton = await selenium.findElementListBy("className", "fas fa-plus-circle")
            for (plusButton = 0; plusButton < 2; plusButton++){
                await selenium.clickElement("className", "fas fa-plus-circle")}
            

            let decreasedBudget = await selenium.getTextFromElement("id", "budget")
            console.log("Movie budget is now " + decreasedBudget)
            if (decreasedBudget.includes("4")) {
                console.log("Movies have been ordered successfully")
            }
            else {
                console.log("Error: can't order the desired movies.")
            }

            let minusButton = await selenium.clickElement("className", "fas fa-minus-circle")
            for (minusButton = 0; minusButton < 1; minusButton++) {
                await selenium.clickElement("className", "fas fa-minus-circle")
                if (movieBudget.includes("10")) {
                    console.log("Movie has been returned successfully")
                }
                else {
                    console.log("Error: can't return the desired movies.")
                }
            }

        } catch (error) {
            console.error("Problem with orderAndReturnTwoMovies function " + error)
        }
    }
    async printMovieInfo(movieName) {
        try {
            let movie = await selenium.findElementListBy("className", "movie")
            for (movie in movieName) {
                if (movieName.includes("Tarzan"))
                    await selenium.clickElement("className", "movie")
            }
            let tarzanText = await selenium.getTextFromElement("className", "movie-detail")
            console.log(tarzanText)
        }
        catch (error) {
            console.error("Problem with printMovieInfo function " + error)
        }
        await selenium.close()

    }



}

module.exports = ReflixPage
