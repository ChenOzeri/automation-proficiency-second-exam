const seleniumInfra = require('./seleniumInfra')
const selenium = new seleniumInfra()

class ReflixPage {
    constructor(URL) {
        selenium.getURL(URL)
    }

    async selectUser(userName) {
        try {
            let user = await selenium.clickElement("xpath", `//*[@id="root"]/div/div[2]/div/a[4]`)
            // let user = await selenium.findElementListBy ("className", "user")
            // console.log (user)

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
            console.log("budget = " + movieBudget)
            if (movieBudget = "$10.00") {
                console.log("Movie budget is 10$.")
            }
            else {
                console.log("wrong budget.")
            }
            const orderTarzan = await selenium.clickElement("className", "fas fa-plus-circle")
            const orderLionKing = await selenium.clickElement("xpath", `//*[@id="root"]/div/div[2]/div/div/div/div[2]/i`)
            let decreasedBudget = await selenium.getTextFromElement("id", "budget")
            console.log("Movie budget is now " + decreasedBudget)
            if (decreasedBudget = "$4.00") {
                console.log("Movies have been ordered successfully")
            }
            else {
                console.log("Error: can't order the desired movies.")
            }
            const returnTarazn = await selenium.clickElement("className", "fas fa-minus-circle")
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
