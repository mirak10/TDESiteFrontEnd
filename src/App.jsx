import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Banner from './components/Banner';
import EventsSection from './components/EventsSection';
import QuickLinks from './components/QuickLinks';
import NewsSection from './components/NewsSection';
import TeamSection from './components/TeamSection';
import Footer from './components/Footer';

import AdminDashboard from './admin/AdminDashboard';
import AdminLogin from './admin/AdminLogin';
import ProtectedRoute from './admin/ProtectedRoute'; // or the correct path

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Banner />
              <EventsSection/>
              <QuickLinks />
              <NewsSection />
              <TeamSection />
              <Footer />
            </>
          }
        />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
                  path="/admin/AdminDashboard"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
      </Routes>
    </>
  );
}

export default App;
