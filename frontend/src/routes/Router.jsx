import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Rootlayout from "../pages/Rootlayout";
import AdminDashboard from "../pages/AdminDashboard";
import CreateElection from "../pages/CreateElection";
import ManageElection from "../pages/ManageElection";
import JoinElection from "../pages/JoinElection";
import VerifyOTP from "../pages/VerifyOTP";
import VotePage from "../pages/VotePage";
import LiveResults from "../pages/LiveResults";
import FinalResults from "../pages/FinalResults";
import Choose from "../pages/Choose";


export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Rootlayout />,
    children: [
      { path: "/", element: <LandingPage/> },
      { path: "/admin", element: <AdminDashboard/> },
      { path: "/admin/election/create", element: <CreateElection/> },
      { path: "/admin/election/:id", element: <ManageElection/> },
      { path: "/join", element: <JoinElection/> },
      { path: "/verify", element: <VerifyOTP/> },
      { path: "/vote/:id", element: <VotePage/> },
      { path: "/results/live/:id", element: <LiveResults/> },
      { path: "/results/final/:id", element: <FinalResults/> },
     
    ],
  },
  {
    path:'/choose',
    element:<Choose/>
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);
