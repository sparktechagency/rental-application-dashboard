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
import AllAdminSuperAdmin from "../component/Main/AllAdminSuperAdmin/AllAdminSuperAdmin";
import ErrorPage from "../component/Main/ErrorPage/ErrorPage";
import Subscription from "../component/Main/Subscription/Subscription";
import AddSubscription from "../component/Main/AddSubscription/AddSubscription";
import EditSubscription from "../component/Main/EditSubscription/EditSubscription";
import ContentModeration from "../component/Main/ContentModeration/ContentModeration";
import ContentModerationDetails from "../component/Main/ContentModerationDetails/ContentModerationDetails";
import Analytics from "../component/Main/Analytics/Analytics";
import DealsEvents from "../component/Main/DealsEvents/DealsEvents";
import UserDetails from "../component/Main/UserDetails/UserDetails";
import OnboardingImage from "../component/Main/OnBardingImages/OnBardingImages";
import AddEvent from "../component/Main/AddEvent/AddEvent";
import EditEvent from "../component/Main/EditEvent/EditEvent";
import AddDeals from "../component/Main/AddDeals/AddDeals";
import EditDeals from "../component/Main/EditDeals/EditDeals";
import DealCategory from "../component/Main/DealCategory/DealCategory";

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
        path: "users",
        element: <AllUsers />,
      },
      {
        path: "users/:id",
        element: <UserDetails />,
      },
      {
        path: "/admins",
        element: <AllAdminSuperAdmin />,
      },
      {
        path: "/content-moderation",
        element: <ContentModeration />,
      },
      {
        path: "/content-moderation/:id",
        element: <ContentModerationDetails />,
      },
      {
        path: "/analytics",
        element: <Analytics/>,
      },
      {
        path: "/deals-events",
        element: <DealsEvents />,
      },
      {
        path: "/deals-category",
        element: <DealCategory />,
      },
      {
        path: "/add-deals",
        element: <AddDeals/>
      },
      {
        path: "/edit-deals/:id",
        element: <EditDeals/>
      },
      {
        path: "/add-event",
        element: <AddEvent/>
      },
      {
        path: "/edit-event/:id",
        element: <EditEvent/>
      },
      {
        path: "/onboarding-images",
        element: <OnboardingImage />,
      },
      {
        path: "/subscription",
        element: <Subscription />,
      },
      {
        path: "/subscription/add-subscription",
        element: <AddSubscription />,
      },
      {
        path: "/subscription/edit-subscription/:id",
        element: <EditSubscription />,
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
