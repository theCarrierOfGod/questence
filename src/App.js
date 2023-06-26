import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Login from './login/Login';
import PageNotFound from './notFound/PageNotFound';
import { Auth } from './providers/Auth';
import { Basic } from './providers/Basic';
import { Hook } from './providers/Hook';
import { New } from './providers/New';
import { Edit } from './providers/Edit';
import { RequireAuth } from './providers/RequireAuth';
import { useEffect } from 'react';
import { SubContent } from './providers/SubContent';
import { EditCon } from './providers/EditContent';
import { Detail } from './providers/Detail';
import Forgot from './forgotPassword/Forgot';
import Home from './home/Home';
import Authoring from './authoring/Authoring';
import BasicSection from './authoring/sections/basic/BasicSection';
import Footer from './footer/Footer';
import GradingSection from './authoring/sections/grading/GradingSection';
import ContentSection from './authoring/sections/content/ContentSection';
import TeamSection from './authoring/sections/team/TeamSection';
import ResourcesSection from './authoring/sections/resources/ResourcesSection';
import SubmitSection from './authoring/sections/submit/SubmitSection';
import AllContents from './authoring/sections/content/AllContents';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <>
      <Hook>
        <Auth>
          <Detail>
            <Edit>
              <Basic>
                <SubContent>
                  <New>
                    <Routes>
                      <Route
                        exact
                        path="/"
                        element={
                          <New>
                            <Home />
                          </New>
                        }
                      />
                      <Route
                        exact
                        path="/authoring"
                        element={
                          <RequireAuth>
                            <New>
                              <Authoring />
                            </New>
                          </RequireAuth>
                        }
                      />
                      <Route
                        exact
                        path="/authoring/edit/basic/:id"
                        element={
                          <RequireAuth>
                            <Edit>
                              <BasicSection />
                              <Footer />
                            </Edit>
                          </RequireAuth>
                        }
                      />
                      <Route
                        exact
                        path="/authoring/edit/grading/:id"
                        element={
                          <RequireAuth>
                            <Edit>
                              <GradingSection />
                              <Footer />
                            </Edit>
                          </RequireAuth>
                        }
                      />
                      <Route
                        exact
                        path="/authoring/edit/courseTeam/:id"
                        element={
                          <RequireAuth>
                            <Edit>
                              <TeamSection />
                              <Footer />
                            </Edit>
                          </RequireAuth>
                        }
                      />
                      <Route
                        exact
                        path="/authoring/edit/resources/:id"
                        element={
                          <RequireAuth>
                            <Edit>
                              <ResourcesSection />
                              <Footer />
                            </Edit>
                          </RequireAuth>
                        }
                      />
                      <Route
                        exact
                        path="/authoring/edit/content/:id"
                        element={
                          <RequireAuth>
                            <Edit>
                              <EditCon>
                                <AllContents />
                                <Footer />
                              </EditCon>
                            </Edit>
                          </RequireAuth>
                        }
                      />
                      <Route
                        exact
                        path="/authoring/edit/submit/:id"
                        element={
                          <RequireAuth>
                            <Edit>
                              <SubmitSection />
                              <Footer />
                            </Edit>
                          </RequireAuth>
                        }
                      />
                      <Route
                        exact
                        path="/login"
                        element={
                          <Login />
                        }
                      />
                      <Route
                        exact
                        path="/forgot-password"
                        element={
                          <Forgot />
                        }
                      />
                      <Route
                        exact
                        path="*"
                        element={<PageNotFound />}
                      />
                    </Routes>
                  </New>
                </SubContent>
              </Basic>
            </Edit>
          </Detail>
        </Auth>
      </Hook>
    </>
  );
}

export default App;
