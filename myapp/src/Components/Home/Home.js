import React, { useState } from 'react'
import axios from 'axios'
import search from '../../img/search.png'
import sun from '../../img/sun.png'
import rain from '../../img/rain.png'
import cloud from '../../img/cloud.png'
import humidity from '../../img/humidity.png'
import drizzle from '../../img/drizzle.png'
import windy from '../../img/windy.png'
import smog from "../../img/smog.png"
import '../Home/Home.css'

function Home() {
    const [data,setData] = useState({
        astichan:10,
        name:'Yerevan',
        humidity:10,
        speed:2,
        image:cloud
    })
    const [name,setName] = useState('');
    const handleClick = () => {
        const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=16bfa98849718de13b6e8978b87d47b8&units=metric`;
        axios.get(apiUrl)
        .then(res=>{
            let imagePath = '';
            if(res.data.weather[0].main==="Clouds"){
                imagePath=cloud
            }else if(res.data.weather[0].main=== "Clear"){
                imagePath=sun
            }
            else if(res.data.weather[0].main==="Rain"){
                imagePath=rain
            }else if(res.data.weather[0].main==="Drizzle"){
                imagePath=drizzle
            }
            else if(res.data.weather[0].main==="Mist"){
                imagePath=smog
            }else{
                imagePath=cloud
            }
            setData({
                ...data,
            astichan:res.data.main.temp,
            name:res.data.name,
            humidity:res.data.main.humidity,
            speed:res.data.wind.speed,
            image:imagePath
            })
        })
    }
  return (
    <div className='container'>
        <div className='weather'>
            <div className='search'>
                <input type="text" placeholder='Input city name' onChange={e=>setName(e.target.value)} />
                <button ><img src={search} alt="" onClick={handleClick} /></button>
            </div>
            <div className='box'>
                <img src={data.image} alt="" />
                <h1>{Math.round(data.astichan)}° C</h1>
                <h2>{data.name}</h2>
                <div className='lr'>
                    <div className='col'>
                        <img src={humidity} alt="" />
                        <div>
                            <p>{data.humidity}%</p>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div className='col'>
                        <img src={windy} alt="" />
                        <div>
                            <p>{data.speed}km/h</p>
                            <p>Wind</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home