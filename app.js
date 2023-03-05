const mongoose = require('mongoose');
const validator = require('validator')


//Conection and creating in  a new db
mongoose.connect("mongodb://127.0.0.1:27017/ttchannel", {useNewUrlParser: true,
useUnifiedTopology: true
}).then(() => console.log("Connection Successful"))
.catch((err) => console.log(err));

//schema
//A mongoose schema defines the structure of document, default values, validators, etc.

const playlistSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique:true,
        lowercase:true  //builtin validation
        //uppercase:true,
        //trim: true,
        //minlength: [2, "minimum length is 2"],
        //maxlength:8
    },
    ctype: {
        type: String,
        required: true,
        lowercase: true,
        enum: ["frontend" , "backend" , "database"]  //will throw error if not satsfied
    },
    videos: {
       type: Number,
    //    validate(value){
    //     throw new Error('videos count shouldnt be negative')
    //    }
    
    validate:{
        validator:function(value){
          return value.length<0
        },
        message: "Videos count should not be negative"
    }

    },
    email:{
        type:String,
        validate(value){
            if(!this.validator.isEmail(value)){
                throw new Error("Email not VAlid")
            }
        }
    },
    author: String,
    active: Boolean,
    date:{
        type: Date,
        default: Date.now
    }
})

//Collection Creation

const Playlist = new mongoose.model("Playlist", playlistSchema);

//create document or insert

const createDocument = async ()=>{
   try{
    const reactPlaylist = new Playlist({
        name: "javascript",
        ctype: "Back End",
        videos: 50,
        author: "Thapa Technical",
        active: true
    })

    const mongoPlaylist = new Playlist({
        name: "MongoDB",
        ctype: "DataBase",
        videos: 50,
        author: "Thapa Technical",
        active: true
    })
    const expressPlaylist = new Playlist({
        name: "Express JS",
        ctype: "Back End",
        videos: 50,
        author: "Thapa Technical",
        active: true
    })
    
    // reactPlaylist.save();
    // const result = await reactPlaylist.save();
    const result = await Playlist.insertMany([reactPlaylist,mongoPlaylist,expressPlaylist])
    console.log(result)
   }catch(err){
    console.log(err);
   }
    
}
createDocument();

const getDocument = async ()=>{
    // find({ctype: "Back End"})
    // find({videos : {$gt : 20}})
    //find({ctype : {$in : ['Back End', 'DataBase']}})
    // find({$or : [{ctype:"Back End"} , {author: "Thapa Technical"}]})
    //countDocuments()
    //.sort("name : -1") will sort alphabetcally
    //.sort({"name : -1"}) will sort insertwise 
    try{
        const resultt = await Playlist.find({$and : [{ctype:"Back End"} , {author: "Thapa Technical"}]})
    .select({name:1,_id:0})
    .limit(1);
    console.log(resultt);
}catch(err){
   console.log(err)
}
}

getDocument();

// const updateDocument = async(id)=>{
//     //findByIdAndUpdate, useFindAndModify : false, new: true
//     try{
//         const result = await Playlist.updateOne({_id:id}, {$set : {
//             name: "Javascript"
//         }})
//     } catch(err){
//         console.log(err)
//     }
// }


// updateDocument('6402f4e83cbba28f9aa845e0');

const deleteDocument = async (_id) =>{

    try{
        
            const result =  await Playlist.deleteOne({_id})
        }
     catch(err){
        console.log(err)
    }
}


deleteDocument('6402f4e83cbba28f9aa845e0');
