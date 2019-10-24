const ReflixPage = require('./reflixPage')




let reflixTests = new ReflixPage("http://localhost:3000/")

let main = async function () {
    await reflixTests.selectUser("Tina")
    await reflixTests.orderAndReturnTwoMovies()
    await reflixTests.printMovieInfo("Tarzan")
}

main()
