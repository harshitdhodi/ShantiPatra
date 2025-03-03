import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './AdminComponents/Sidebar'; 
import News from "./AdminComponents/Pages/News";
import CreateNews from "./AdminComponents/Pages/CreateNews";
import EditNews from './AdminComponents/Pages/EditNews';
import NewsCategory from "./AdminComponents/Pages/NewsCategory"
import CreateNewsCategory from "./AdminComponents/Pages/CreateNewsCategory"
import EditNewsCategory from "./AdminComponents/Pages/EditNewsCategory"
import Testimonials from './AdminComponents/Pages/Testimonials';
import CreateTestimonials from './AdminComponents/Pages/CreateTestimonials';
import EditTestimonials from './AdminComponents/Pages/EditTestimonials';
import OurStaff from "./AdminComponents/Pages/Staff";
import CreateStaff from "./AdminComponents/Pages/CreateStaff";
import EditStaff from './AdminComponents/Pages/EditStaff';
import Banner from "./AdminComponents/Pages/Banner";
import CreateBanner from "./AdminComponents/Pages/CreateBanner";
import EditBanner from "./AdminComponents/Pages/EditBanner";
import ProductCategory from "./AdminComponents/Pages/ProductCategory";
import CreateProductCategory from "./AdminComponents/Pages/CreateCategory";
import EditCategory from "./AdminComponents/Pages/EditCategory";
import Product from "./AdminComponents/Pages/Product";
import CreateProduct from "./AdminComponents/Pages/CreateProduct";
import EditProduct from "./AdminComponents/Pages/EditProduct";
import Dashboard from "./AdminComponents/Pages/Dashboard";
import Signup from "./AdminComponents/Adminsignup"
import Login from "./AdminComponents/Adminlogin";
import VerifyOTP from "./AdminComponents/VerifyOTP";
import ResetPassword from "./AdminComponents/ResetPassword";
import EditAboutus from './AdminComponents/Pages/EditAboutus';
import ForgetPassword from './AdminComponents/ForgotPassword';
import DatabaseManagement from './AdminComponents/Pages/DatabaseManagement';
import ManagePassword from "./AdminComponents/Pages/ManagePassword";
import Logo from "./AdminComponents/Pages/Logo";
import Cookies from "js-cookie";
import Achievements from "./AdminComponents/Pages/Achievements"
import CreateAchievements from "./AdminComponents/Pages/CreateAchievements"
import EditAchievement from './AdminComponents/Pages/EditAchievements';
import Counter from "./AdminComponents/Pages/Counter"
import EditCounter from "./AdminComponents/Pages/EditCounter"
import CreateCounter from "./AdminComponents/Pages/CreateCounter"
import Inquiry from "./AdminComponents/Pages/Inquiry"
import Footer from "./AdminComponents/Pages/Footer"
import Header from "./AdminComponents/Pages/Header"
import GoogleSettings from "./AdminComponents/Pages/GoogleSettings"
import Menulisting from "./AdminComponents/Pages/Menulisting"
import CreateMenulisting from "./AdminComponents/Pages/CreateMenulisting"
import EditMenulisting from "./AdminComponents/Pages/EditMenulisting"
import Sitemap from "./AdminComponents/Pages/Sitemap"
import CreateSitemap from "./AdminComponents/Pages/CreateSitemap"
import EditSitemap from "./AdminComponents/Pages/EditSitemap"
import Metadetails from "./AdminComponents/Pages/Metadetails"
import EditMetadetails from "./AdminComponents/Pages/EditMetadetails"
import ManageProfile from "./AdminComponents/Pages/ManageProfile"
import MissionAndVision from './AdminComponents/Pages/MissionAndVision';
import ManageColor from "./AdminComponents/Pages/ManageColor"
import WhyChooseUs from "./AdminComponents/Pages/WhyChooseUs"
import CreateWhyChooseUs from "./AdminComponents/Pages/CreateWhyChooseUs"
import EditWhyChooseUs from "./AdminComponents/Pages/EditWhyChooseUs"
import CreateProductDetail from "./AdminComponents/Pages/CreateProductDetail"
import EditProductDetail from "./AdminComponents/Pages/EditProductDetail"
import ProductInquiry from "./AdminComponents/Pages/Productinquiry"
import WhyChoosePaper from './AdminComponents/Pages/WhyChoosePaper'
import CreateWhyChoosePaper from './AdminComponents/Pages/CreateWhyChoosePaper'
import EditWhyChoosePaper from './AdminComponents/Pages/EditWhyChoosePaper';
import CustomizationStep from './AdminComponents/Pages/CustomizationSteps';
import CreateCustomizationSteps from './AdminComponents/Pages/CreateCustomizationSteps';
import EditCustomizationSteps from './AdminComponents/Pages/EditCustomizationSteps';
import CustomInquires from "./AdminComponents/Pages/Custominquiries"
import Home from "./ClientComponents/pages/Home"
import Navbar from './ClientComponents/Navbar';
import Blogs from "./ClientComponents/pages/Blogs"
import BlogDetail from "./ClientComponents/pages/BlogDetail"
import AboutUs from './ClientComponents/pages/Aboutus';
import Contactus from './ClientComponents/pages/Contactus';
import OurProduct from "./ClientComponents/pages/Product"
import ProductDetail from './ClientComponents/pages/ProductDetail';
import Manufacture from './ClientComponents/pages/Manufacture';
import DynamicMetaTags from './ClientComponents/DynamicMeta';
import AboutUsPointsForm from './AdminComponents/Pages/AboutUsPointsForm';
import AboutUsPoints from './AdminComponents/Pages/AboutUsPoints';
import OurClients from './ClientComponents/OurClients';
import OurClientsPage from './ClientComponents/pages/OurClients';
import Clients from './AdminComponents/Pages/Client';
import NewClientForm from './AdminComponents/Pages/CreateClients';
import EditClient from './AdminComponents/Pages/EditClient';
import GalleryTable from './AdminComponents/Pages/Gallery';
import NewGalleryForm from './AdminComponents/Pages/CreateGallery';
import GlobalPresence from './AdminComponents/Pages/GlobalPresence';
import GlobalPresencePage from './AdminComponents/Pages/GlobalPresence';
import GlobalPresenceClient from './ClientComponents/pages/GlobalPresence';
import StrappingPointForm from './AdminComponents/Pages/CreateStrappingPoints';
import BOPPTableForm from './AdminComponents/Pages/CreateBOPPTable';
import BOPPTapes from './AdminComponents/BOPP';
import EditBOPPTableForm from './AdminComponents/Pages/UpdateBOPP';
import StrengthPointForm from './AdminComponents/Pages/CreatingStrengthPoints';
import EditStrengthPointsForm from './AdminComponents/Pages/EditStrengthPoints';
import WhatsAppButton from './ClientComponents/Whatsapp';
import Chatbot from './ClientComponents/Chatbot';
import SlugPage from './ClientComponents/SlugPage';
import EditProductDetailForm from './AdminComponents/Pages/EditProductDetail';
import EditStrappingForm from './AdminComponents/Pages/EditStrappingPoint';
import EditGalleryForm from './AdminComponents/Pages/EditGallery';
import WeightCalculator from './ClientComponents/calculator/Weight';
import OuterDiameter from './ClientComponents/calculator/OuterDiameter';
import ProductMainPage from './ClientComponents/pages/ProductMainPage';
import PrivacyPolicy from './ClientComponents/privacypolicy/PrivacyPolicy';
import TermsAndConditions from './ClientComponents/privacypolicy/TermsAndConditions';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = Cookies.get('jwt');
    if (token) {
      setIsLoggedIn(true);
      console.log(token)
      console.log("User is logged in");
    } else {
      console.log("User is not logged in");
    }
  }, []);

  return (
    <>
      <DynamicMetaTags />
      <div className=''>
        {!isLoggedIn &&  (
          <>
            <WhatsAppButton />
            {/* <Chatbot /> */}
          </>
        )}
      </div>
      
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/" element={<Navbar />} >
              <Route index element={<Home />} />
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/blogs" element={<Blogs />} />
              {/* <Route path="/blog/:slugs" element={<BlogDetail />} /> */}
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact-us" element={<Contactus />} />
              <Route path="/global-presence" element={< GlobalPresenceClient />} />
              {/* <Route path="/global" element={< GlobalPresenceClient />} /> */}
              <Route path="/weight-calc" element={<WeightCalculator />} />
              <Route path="/outer-dia-calc" element={<OuterDiameter />} />
              
              <Route path="/:slugs" element={<SlugPage />} />
             {/* <Route path="/category/:categoryslug" element={<OurProduct />} /> */}
              <Route path="/products" element={<ProductMainPage />} />
              <Route path="/manufacturing" element={<Manufacture />} />
              <Route path="/our-clients" element={<OurClientsPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
           
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/verifyOTP" element={<VerifyOTP />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
          </>
        ) : (
          <Route path="/" element={<Sidebar />}>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/createNews" element={<CreateNews />} />
            <Route path="/news/editNews/:slugs" element={<EditNews />} />
            <Route path="/NewsCategory" element={<NewsCategory />} />
            <Route path="/NewsCategory/CreateNewsCategory" element={<CreateNewsCategory />} />
            <Route path="/NewsCategory/editNewsCategory/:categoryId/:subCategoryId?/:subSubCategoryId?" element={<EditNewsCategory />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/testimonials/createTestimonials" element={<CreateTestimonials />} />
            <Route path="/testimonials/editTestimonials/:id" element={<EditTestimonials />} />
            <Route path="/ourTeam" element={<OurStaff />} />
            <Route path="/ourTeam/createTeam" element={<CreateStaff />} />
            <Route path="/ourTeam/editTeam/:id" element={<EditStaff />} />
            <Route path="/banner" element={<Banner />} />
            <Route path="/banner/createBanner" element={<CreateBanner />} />
            <Route path="/banner/editBanner/:id" element={<EditBanner />} />
            <Route path="/ProductCategory" element={<ProductCategory />} />
            <Route path="/ProductCategory/CreateProductCategory" element={<CreateProductCategory />} />
            <Route path="/ProductCategory/editProductCategory/:slugs" element={<EditCategory />} />
            <Route path="/aboutus" element={<EditAboutus />} />
            <Route path="/product/createproductdetail" element={<CreateProductDetail />} />
            <Route path="/product/add-strapping-points" element={<StrappingPointForm />} />
            <Route path="/product/edit-strapping-points/:id" element={<EditStrappingForm />} />
           
            <Route path="/product/create-bopp-table" element={<BOPPTableForm />} />
            <Route path="/product/editBOPP/:id" element={<EditBOPPTableForm />} />
            <Route path="/product/create-strength-points" element={<StrengthPointForm />} />
            <Route path="/product/edit-strength-point/:id" element={<EditStrengthPointsForm />} />
           
            <Route path="/product/editproductdetail/:id" element={<EditProductDetail />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/createProduct" element={<CreateProduct />} />
            <Route path="/product/editProduct/:slugs" element={<EditProduct />} />
            <Route path="/productinquiry" element={<ProductInquiry />} />
            <Route path="/manageLogo" element={<Logo />} />
            <Route path="/DatabaseManagement" element={<DatabaseManagement />} />
            <Route path="/managePassword" element={<ManagePassword />} />
            <Route path="/manageProfile" element={<ManageProfile />} />
            <Route path="/certificates" element={<Achievements />} />
            <Route path="/certificates/createcertificates" element={<CreateAchievements />} />
            <Route path="/certificates/editcertificates/:id" element={<EditAchievement />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/counter/editCounter/:id" element={<EditCounter />} />
            <Route path="/counter/createCounter" element={<CreateCounter />} />
            <Route path="/Inquiry" element={<Inquiry />} />
            <Route path="/missionandvision" element={<MissionAndVision />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/header" element={<Header />} />
            <Route path="/googleSettings" element={<GoogleSettings />} />
            <Route path="/menulisting" element={<Menulisting />} />
            <Route path="/menulisting/createMenulisting" element={<CreateMenulisting />} />
            <Route path="/menulisting/editMenulisting/:id" element={<EditMenulisting />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/sitemap/createSitemap" element={<CreateSitemap />} />
            <Route path="/sitemap/editSitemap/:id/:type" element={<EditSitemap />} />
            <Route path="/metadetails" element={<Metadetails />} />
            <Route path="/metadetails/editmetaDetails/:id/:type" element={<EditMetadetails />} />
            <Route path="/manageTheme" element={<ManageColor />} />
            <Route path="/whychooseus" element={<WhyChooseUs />} />
            <Route path="/whychooseus/createwhychooseus" element={<CreateWhyChooseUs />} />
            <Route path="/whychooseus/editwhychooseus/:id" element={<EditWhyChooseUs />} />
            <Route path="/whychoosepaper" element={<WhyChoosePaper />} />
            <Route path="/whychoosepaper/createwhychoosepaper" element={<CreateWhyChoosePaper />} />
            <Route path="/whychoosepaper/editwhychoosepaper/:id" element={< EditWhyChoosePaper />} />
            <Route path="/customizationsteps" element={< CustomizationStep />} />
            <Route path="/customizationsteps/createcustomizationsteps" element={< CreateCustomizationSteps />} />
            <Route path="/customizationsteps/editcustomizationsteps/:id" element={< EditCustomizationSteps />} />
            <Route path="/custominquires" element={< CustomInquires />} />
            <Route path="/aboutuspoint" element={< AboutUsPointsForm />} />
            <Route path="/client" element={< Clients />} />
            <Route path="/client/add-client" element={< NewClientForm />} />
            <Route path="/client/editclients/:id" element={< EditClient />} />
            <Route path="/gallery" element={< GalleryTable />} />
            <Route path="/gallery/addgallery" element={< NewGalleryForm />} />
            <Route path="/gallery/editgallery/:id" element={< EditGalleryForm />} />


          <Route path="/global-presence" element={< GlobalPresence />} />
          </Route>
        )}
      </Routes>
    </>
  );
}

export default App;
