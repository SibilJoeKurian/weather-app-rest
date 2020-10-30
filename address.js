const { response } = require('express')
const request=require('postman-request')

address="montreal"

/*Implementation using callback
sayHello=(address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2liaWxqb2UiLCJhIjoiY2tmYnF1Ymc0MHB1ajMxcWpwd2tsb29nbSJ9.Uw9Grl4G2baQaZFcKY1Hdw&limit=1'

    request(url,(error,response)=>{
        callback(response.body)
    })
}

sayHello("montreal",(response)=>{
    var object=JSON.parse(response)
    console.log(object.features[0].center);
})
*/

//Implemenation using promisesf
get_latitude_longitude=(address)=>{
    return new Promise((resolve,reject)=>{
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2liaWxqb2UiLCJhIjoiY2tmYnF1Ymc0MHB1ajMxcWpwd2tsb29nbSJ9.Uw9Grl4G2baQaZFcKY1Hdw&limit=1'
        request(url,(error,response)=>{
            if(error)
            return reject(error)
        var object=JSON.parse(response.body)
        resolve(object.features[0].center)
        })          
    })
}

get_temperature_data=(latitude,longitude)=>{
    const url = 'http://api.weatherstack.com/current?access_key=d56548c179d4f4f1156955f269908c5d&query='+latitude + ',' + longitude
    return new Promise((resolve,reject)=>{
        request(url,(error,response)=>{
            if(error)
            return reject(error)
            var object=JSON.parse(response.body)
            resolve(object)
        })
    })
}


//conversion of promises to async
async function get_temperature(location){
    const data=await get_latitude_longitude(location)
    latitude=data[0];
    longitude=data[1];
    const temperature=await get_temperature_data(longitude,latitude)
    var temperature_data={
        name:temperature.location.name,
        region:temperature.location.region,
        temperature:temperature.current.temperature,
        wind_speed:temperature.current.wind_speed,
        feelslike:temperature.current.feelslike,
        weather_description:temperature.current.weather_descriptions
    }
    return temperature_data
}


module.exports=get_temperature;