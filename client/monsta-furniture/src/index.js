"use client"
import { useEffect, useState } from "react";
import ReviewComponent from "./about/ReviewComponent";
import BannerSlider from "./home-page-components/BannerSlider";
import BestSelling from "./home-page-components/BestSelling";
import ChairCollection from "./home-page-components/ChairCollection";
import FeaturedComponent from "./home-page-components/FeaturedComponent";
import NewCoolection from "./home-page-components/NewCoolection";
import Policies from "./home-page-components/Policies";
import axios from "axios";


export default function Home() {
  let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL;
  let [sliderstaticPath, setsliderstaticPath] = useState('')
  let [sliderData, setsliderData] = useState([])

  let sliderdetails = () => {
   
   
    axios.get(`${apiBaseUrl}home/slider`)
      .then((res) => res.data)
      .then((finalRes) => {
       
        setsliderData(finalRes.data)
        setsliderstaticPath(finalRes.staticPath)
      })

  }


  useEffect(() => {
    sliderdetails()
  }, [])
  return (
    <div>
      <BannerSlider sliderData={sliderData} sliderstaticPath={sliderstaticPath} />
      <ChairCollection />
      <FeaturedComponent />
      <NewCoolection />
      <BestSelling />
      <Policies />
      <ReviewComponent />
    </div>
  );
}
