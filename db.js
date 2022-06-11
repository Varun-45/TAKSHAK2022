import mongoose from "mongoose";
import QuerySchema from "./mongoose.js";
import {DB_URL, PORT, TOKEN} from "./config.js";

mongoose.Promise = global.Promise


try {
    mongoose.connect(`${DB_URL}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}
catch {
    console.log("Not able to connect to the database")
}


const createUserQuery = async (name, email, query) => {
    const user = await QuerySchema.findById(email)
    if(user) {
        return user
    }
    else {
        const new_user = new QuerySchema({ 
            _id: email, 
            name: name, 
            queries: query 
        })
        await new_user.save()
        return { 
            _id: email, 
            name: name, 
            queries: query 
        }
    }
}

const updateUserQuery = async (name, email, query) => {
    const user = await QuerySchema.findById(email)
    if(!user) {
        return createUserQuery(name, email, query)
    }
    return (await user.set("queries", user.queries+"<::>"+query).save())
}