import { createBrowserRouter } from "react-router-dom";
import AllUsers from "../component/Main/AllUsers/AllUsers";
import Notification from "../component/Main/Notification/Notification";
import MainLayout from "../layout/MainLayout";
import ForgetPassword from "../page/Auth/ForgetPassword/ForgetPassword";
import NewPassword from "../page/Auth/NewPassword/NewPassword";
import Otp from "../page/Auth/Otp/Otp";
import SignIn from "../page/Auth/SignIn/SignIn";
import DashboardHome from "../page/DashboardHome/DashboardHome";
import AdminRoutes from "./AdminRoutes";
import PersonalInformation from "../component/Main/PersonalInformation/PersonalInformation";
import EditInformation from "../component/Main/EditPersonalInfo/EditPersonalInfo";
import Settings from "../component/Main/Settings/Settings";
import EditPrivacyPolicy from "../component/Main/EditPrivacyPolicy/EditPrivacyPolicy";
import TermsCondition from "../component/Main/TermsConditions/TermsCondition";
import AboutUs from "../component/Main/AboutUs/AboutUs";
import EditTermsConditions from "../component/Main/EditTermsConditions/EditTermsConditions";
import EditAboutUs from "../component/Main/EditAboutUs/EditAboutUs";
import PrivacyPolicy from "../page/PrivacyPolicy/PrivacyPolicy";
import ErrorPage from "../component/Main/ErrorPage/ErrorPage";
import Booking from "../component/Main/Booking/Booking";
import Earning from "../component/Main/Earning/Earning";
import AllCars from "../component/Main/AllCars/AllCars";
import AddCar from "../component/Main/AddCar/AddCar";
import EditCar from "../component/Main/EditCar/EditCar";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AdminRoutes>
        <MainLayout />
      </AdminRoutes>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "all-users",
        element: <AllUsers />,
      },
      {
        path: "booking",
        element: <Booking />,
      },
      {
        path: "/earning",
        element: <Earning />,
      },
      {
        path: "/vehicles",
        element: <AllCars />,
      },
      {
        path: "/add-vehicle",
        element: <AddCar />
      },
      {
        path: "/edit-vehicle/:id",
        element: <EditCar />,
      },
      {
        path: "personal-info",
        element: <PersonalInformation />,
      },
      {
        path: "edit-personal-info",
        element: <EditInformation />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "settings/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "settings/terms-conditions",
        element: <TermsCondition />,
      },
      {
        path: "settings/about-us",
        element: <AboutUs />,
      },
      {
        path: "settings/edit-privacy-policy",
        element: <EditPrivacyPolicy />,
      },
      {
        path: "settings/edit-terms-conditions",
        element: <EditTermsConditions />,
      },
      {
        path: "settings/edit-about-us",
        element: <EditAboutUs />,
      },
      {
        path: "/notification",
        element: <Notification />,
      },
    ],
  },
  {
    path: "/auth",
    errorElement: <h1>Auth Error</h1>,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "otp/:email",
        element: <Otp />,
      },
      {
        path: "new-password/:email",
        element: <NewPassword />,
      },
    ],
  },
]);

export default router;
