import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import 'react-responsive-pagination/themes/classic-light-dark.css';
import MainLayout from './common/MainLayout'
import Login from './pages/Login'

import User from './pages/User'
import Contact_Enquiry from './pages/Enquiry/Contact_Enquiry'
import Add_Color from './pages/Colors/Add_Color'
import View_Color from './pages/Colors/View_Color'
import DashBoard from './pages/DashBoard'
import Newslatters from './pages/Enquiry/Newslatters'
import Add_Material from './pages/Material/Add_Material'
import View_Material from './pages/Material/View_Material'
import Add_Category from './pages/Parent-Category/Add_Category'
import View_Category from './pages/Parent-Category/View_Category'
import Add_Sub_Category from './pages/Sub-Categories/Add_Sub_Category'
import View_Sub_Category from './pages/Sub-Categories/View_Sub_Category'
import Add_Sub_Category_2 from './pages/Sub-Categories-2/Add_Sub_Category_2'
import View_Sub_Category_2 from './pages/Sub-Categories-2/View_Sub_Category_2'
import Add_Why from './pages/Why_Chooes_Us/Add_Why'
import View_why from './pages/Why_Chooes_Us/View_why'
import Add_Slider from './pages/Slider/Add_Slider'
import View_Slider from './pages/Slider/View_Slider'
import Add_Country from './pages/Country/Add_Country'
import View_Country from './pages/Country/View_Country'
import Add_Testimonial from './pages/Testimonials/Add_Testimonial'
import View_Testimonial from './pages/Testimonials/View_Testimonial'
import Add_Faq from './pages/Faq/Add_Faq'
import View_Faq from './pages/Faq/View_Faq'
import Add_Product from './pages/Product/Add_Product'
import View_Product from './pages/Product/View_Product'
import Order from './pages/Order/Order'
import Profile from './pages/Profile'
import Company_Profile from './pages/Company_Profile'
import MainContext from './Context/MainContext';
import ForgotPassword from './pages/ForgotPassword';



createRoot(document.getElementById('root')).render(
<MainContext>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />}/> 
        <Route path='/' element={<MainLayout />}>

          <Route path='/user' element={<User />} />
          <Route path='/dashboard' element={<DashBoard />} />
          <Route path='/contact-enquiry' element={<Contact_Enquiry />} />
          <Route path='/newsletters' element={<Newslatters />} />
        
        {/*  colors */}
          <Route path='/add-color/:id?' element={<Add_Color />} />
          <Route path='/view-color' element={<View_Color />} />
      
       {/*  material */}
          <Route path='/update-Material/:id' element={<Add_Material />} />
          <Route path='/add-material' element={<Add_Material />} />
          <Route path='/view-material' element={<View_Material />} />
         
         
        { /*parent category */}
        
         <Route path='/add-category/:id?' element={<Add_Category />} />
          <Route path='/view-category' element={<View_Category />} />
        
           { /*sub category */}
          <Route path='/add-Sub-category' element={<Add_Sub_Category />} />
          <Route path='/view-Sub-category' element={<View_Sub_Category />} />
          <Route path='/update-Sub-category/:id' element={<Add_Sub_Category />} />
         
          { /*sub sub category */}
          <Route path='/add-Sub-category_2' element={<Add_Sub_Category_2 />} />
          <Route path='/view-Sub-category_2' element={<View_Sub_Category_2 />} />
            <Route path='/update-Sub-category_2/:id' element={<Add_Sub_Category_2 />} />
      
        {/* why */}
          <Route path='/add-why' element={<Add_Why />} />
          <Route path='/view-why' element={<View_why />} />
         
         {/* slider */}
          <Route path='/add-slider' element={<Add_Slider />} />
          <Route path='/view-slider' element={<View_Slider />} />
         
        { /*country*/}
          <Route path='/add-country' element={<Add_Country />} />
          <Route path='/view-country' element={<View_Country />} />
          <Route path='/update-country/:id' element={<Add_Country />} />
         
           {/* testimonials */}
          <Route path='/add-testimonials' element={<Add_Testimonial />} />
          <Route path='/view-testimonials' element={<View_Testimonial />} />
        
         { /*faq*/}
         <Route path='/add-faq/:id?' element={<Add_Faq />} /> {/*  here we can write ":id?" its meaning id is optional so for add faq page id is not there and for update id is there */}
          <Route path='/view-faq' element={<View_Faq />} />
       
         {/* product */}
          <Route path='/add-product' element={<Add_Product />} />
          <Route path='/view-product' element={<View_Product />} />
          <Route path='/edit-product/:id' element={<Add_Product />} />
          
          <Route path='/order' element={<Order />} />
         
          <Route path='/profile' element={<Profile />} />
          
          <Route path='/company_profile' element={<Company_Profile />} />
        </Route>



      </Routes>


    </BrowserRouter>
    </MainContext>

)

