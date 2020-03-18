const mongoose=require('mongoose')
const AC=mongoose.model('energygrid',{

    Time_Stamp:{
        type:String
    },
    _updated:{
        type:Date
    },
    _created:{
        type:String
    }
,},'energygrid')

module.exports=AC