import { Routes, Route, Navigate } from "react-router-dom"
import { Container } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Auth from "./auth/Auth";
import Update from "./auth/Update";
import Userpage from "./pages/Userpage";
import Postpage from "./components/Postpage";
import CreatePost from "./global/CreatePost";
import AdditionalDetails from "./components/AdditionalDetails";


function App() {
  const user = useSelector(state => state.user.isUser)

  return (
    <>
      <Container maxW="730px" mx={"auto"}>
        <Header />
        <Routes>
          <Route path="/" element={user ? <Homepage /> : <Navigate to="/auth" />} />
          <Route path="/:username/details" element={user ? <AdditionalDetails /> : <Navigate to='/auth' />} />
          <Route path="/auth" element={user ? <Navigate to="/" /> : <Auth />} />
          <Route path="/update" element={user ? <Update /> : <Navigate to="/auth" />} />
          <Route path="/:username" element={user ?
            (
              <>
                <Userpage />
                <CreatePost />
              </>
            )
            : <Navigate to='/auth' />} />
          <Route path="/:username/post/:postId" element={user ? <Postpage /> : <Navigate to='/auth' />} />
        </Routes>
      </Container>
    </>
  )
}

export default App;
