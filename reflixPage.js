const seleniumInfra = require('./seleniumInfra')
const selenium = new seleniumInfra()

class ReflixPage {
    constructor(URL) {
        selenium.getURL(URL)
    }

    async selectUser(userName) {
        try {
            let userFound = await selenium.clickElement("xpath", `//*[@id="root"]/div/div[2]/div/a[1]`)
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

    async orderAndReturnTwoMovies() {
        try {
            let movieBudget = await selenium.getTextFromElement("id", "budget")
            console.log ("budget = " + movieBudget)
            if (movieBudget = "$10.00") {
                console.log("Movie budget is 10$.")
            }
            else {
                console.log("wrong budget.")
            }
            const orderTarzan = await selenium.clickElement("xpath", `//*[@id="root"]/div/div[2]/div/div/div/div[1]/i`)
            const orderLionKing = await selenium.clickElement("xpath", `//*[@id="root"]/div/div[2]/div/div/div/div[2]/i`)
            let decreasedBudget = await selenium.getTextFromElement("id", "budget")
            console.log ("Movie budget is now " + decreasedBudget )
            if (decreasedBudget = "$4.00") {
                console.log("Movies have been ordered successfully")
            }
            else {
                console.log("Error: can't order the desired movies.")
            }
            const returnTarazn = await selenium.clickElement("xpath", `//*[@id="root"]/div/div[2]/div/div[1]/div/div[1]/i`)
            const returnLionKing = await selenium.clickElement("xpath", `//*[@id="root"]/div/div[2]/div/div[1]/div/div/i`)
            if (decreasedBudget + 6) {
                console.log("Movie has been returned successfully")
            }
            else {
                console.log("Error: can't return the desired movies.")
            }

        } catch (error) {
            console.error("Problem with orderAndReturnTwoMovies function " + error)
        }
    }
    async printMovieInfo(movieName) {
        try {
            await selenium.clickElement("xpath", `//*[@id="root"]/div/div[2]/div/div/div/div[1]`)
            let tarzanText = await selenium.getTextFromElement("css", "#root > div > div:nth-child(2) > div > p")
            console.log (tarzanText)
        }
        catch (error) {
            console.error("Problem with printMovieInfo function " + error)
        }
        await selenium.close()

    }



}

module.exports = ReflixPage
