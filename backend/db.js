const mongoose=require('mongoose');
const mongoURI = 'mongodb+srv://Preksha:preksha*2812@cluster0.pmhsukr.mongodb.net/goFood?retryWrites=true&w=majority'
const mongoDB=()=>{
    mongoose.connect(mongoURI, {useNewUrlParser: true},(err,result)=>{
        if(err) console.log("---",err)
        else{
            console.log("connected");
            const fetched_data = mongoose.connection.db.collection('food_items');
            fetched_data.find({}).toArray(async function(err,data){
            
            const foodCategory= await mongoose.connection.db.collection('foodCategory');
             foodCategory.find({}).toArray(function(err,catData){
                if(err) console.log(err);
                else{
                    global.food_items=data;
                    global.foodCategory=catData;
                     //console.log(global.food_items)
               }
                
             })
            //     if(err) console.log(err);
            //     else {
            //     global.food_items=data;
            //    // console.log(global.food_items)
            //     }
            })
        }
    });
}

module.exports=mongoDB;