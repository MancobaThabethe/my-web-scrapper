const PORT = 8000
const app = require("express")()
const cors = require("cors")

// Handle any cors related errors
app.use(cors())

const USERNAME = process.env.USER
const PASSWORD = process.env.PASSWORD

app.get('/deals', async (req, res)=>{

    try {
        const body = {
            "source": "amazon_search",
            'domain': 'com',
            "query": "deals of the day",
            "parse": true,
            "pages": 5
        }
    
        const response = await fetch('https://realtime.oxylabs.io/v1/queries', {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + Buffer.from(`${USERNAME}:${PASSWORD}`).toString("base64")
            }
        })
    
        const DATA = await response.json()
        console.log("Data Received!!")

        const results = DATA.results[0].content.results.organic
        const filteredResults = results.filter(item => (item.price/item.price_strikethrough) <= .7)
        const sortedResults = filteredResults.sort((a,b) =>(a.price/a.price_strikethrough) - (b.price/b.price_strikethrough))

        res.send(sortedResults)

    } catch (error) {
        console.error(error)
    }
})

app.listen(PORT,()=>{
    console.log(`Web scrapper is running on PORT: ${PORT}`)
})