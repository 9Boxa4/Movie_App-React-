import axios from "axios";

export default axios.create({
    baseURL:'https://developers.themoviedb.org/3/'
})

//wanted to import API with the extentions, but had some issues so I turned to fetch