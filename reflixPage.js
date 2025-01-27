const seleniumInfra = require('./seleniumInfra')
const selenium = new seleniumInfra()

class ReflixPage {
    constructor(URL) {
        selenium.getURL(URL)
    }

    async selectUser(userName) {
        try {
            let users = await selenium.findElementListBy("className", "user")
            // console.log (users)
            for (let name of users) {
                let user = await selenium.getTextFromElement("className", "user", name)
                // console.log (user)
                if (user == userName) {
                    await selenium.clickElement("className", "user")
                    return
                }
                console.log(user)
            }

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

    async orderAndReturnTwoMovies() {
        try {
            let movieBudget = await selenium.getTextFromElement("id", "budget")
            console.log("budget = " + movieBudget)
            if (movieBudget.includes("10")) {
                console.log("Movie budget is 10$.")
            }
            else {
                console.log("wrong budget.")
            }

            let plusButton = await selenium.findElementListBy("className", "fa-plus-circle")
            for (plusButton = 0; plusButton < 2; plusButton++) {
                await selenium.clickElement("className", "fa-plus-circle")
            }


            let decreasedBudget = await selenium.getTextFromElement("id", "budget")
            console.log("Movie budget is now " + decreasedBudget)
            if (decreasedBudget.includes("4")) {
                console.log("Movies have been ordered successfully")
            }
            else {
                console.log("Error: can't order the desired movies.")
            }

            let minusButton = await selenium.findElementBy("className", "fas fa-minus-circle")
            for (minusButton = 0; minusButton < 2; minusButton++) {
                await selenium.clickElement("className", "fas fa-minus-circle")
            }
            let newMovieBudget = await selenium.getTextFromElement("id", "budget")
            if (newMovieBudget.includes("10")) {
                console.log("Movie has been returned successfully")
            }
            else {
                console.log("Error: can't return the desired movies.")
            }


        } catch (error) {
            console.error("Problem with orderAndReturnTwoMovies function " + error)
        }
    }

    // async printMovieInfo(movieName) {
    //     try {
    //         let movies = await selenium.findElementListBy("className", "movie")
    //         for (let m of movies) {
    //             let movieText = await selenium.getTextFromElement("className", "movie", m)
    //             console.log(movieText)
    //             if (movieText.includes(movieName)){
    //                 await selenium.clickElement("className", "movie")
    //         }}

    //         let tarzanText = await selenium.getTextFromElement("className", "movie-detail")
    //         console.log(tarzanText)
    //     }
    //     catch (error) {
    //         console.error("Problem with printMovieInfo function " + error)
    //     }
    //     await selenium.close()
    // }
    
    async printMovieInfo(movieName) {
        try {
            await selenium.sleep(2000)
            let movies = await selenium.findElementListBy("css", "div.movie > p")
            let movies_click = await selenium.findElementListBy("css","div.movie > a")
            for (let i = 0;i< movies.length;i++) {
                if (await movies[i].getAttribute("innerText") === movieName) {
                    await selenium.clickElement("", "", movies_click[i],null)
                    await selenium.sleep(2000)
                    let currMovie = await selenium.findElementBy("css","div.movie-detail > p")
                    console.log(await currMovie.getText());
                    break;
                }
            }
        }
        catch (error) {
            console.error("Problem with printMovieInfo function " + error)
        }
        await selenium.close()

    }

}

module.exports = ReflixPage
