import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Login from './auth/Login';
import BasicEdit from './pages/edit/BasicEdit';
import Index from './pages/index/Index';
import PageNotFound from './pages/notFound/PageNotFound';
import { Auth } from './providers/Auth';
import { Basic } from './providers/Basic';
import { Hook } from './providers/Hook';
import { New } from './providers/New';
import { Edit } from './providers/Edit';
import { RequireAuth } from './providers/RequireAuth';
import MediaEdit from './pages/edit/MediaEdit';
import ScheduleEdit from './pages/edit/ScheduleEdit';
import { useEffect } from 'react';
import GradingEdit from './pages/edit/GradingEdit';
import CourseTeamEdit from './pages/edit/CourseTeamEdit';
import SubmitEdit from './pages/edit/SubmitEdit';
import ContentEdit from './pages/edit/ContentEdit';
import { SubContent } from './providers/SubContent';
import ResourceEdit from './pages/edit/ResourceEdit';
import GroupEdit from './pages/edit/GroupEdit';
import { EditCon } from './providers/EditContent';
import { Detail } from './providers/Detail';
import Forgot from './auth/Forgot';

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
                          <RequireAuth>
                            <New>
                              <Index />
                            </New>                          </RequireAuth>}
                      />
                      <Route
                        exact
                        path="/edit/basic/:id"
                        element={
                          <RequireAuth>
                            <Edit>
                              <BasicEdit />
                            </Edit>
                          </RequireAuth>
                        }
                      />
                      <Route
                        exact
                        path="/edit/media/:id"
                        element={
                          <RequireAuth>
                            <Edit>
                              <MediaEdit />
                            </Edit>
                          </RequireAuth>
                        }
                      />
                      <Route
                        exact
                        path="/edit/schedule/:id"
                        element={
                          <RequireAuth>
                            <Edit>
                              <ScheduleEdit />
                            </Edit>
                          </RequireAuth>
                        }
                      />
                      <Route
                        exact
                        path="/edit/grading/:id"
                        element={
                          <RequireAuth>
                            <Edit>
                              <GradingEdit />
                            </Edit>
                          </RequireAuth>
                        }
                      />
                      <Route
                        exact
                        path="/edit/courseTeam/:id"
                        element={
                          <RequireAuth>
                            <Edit>
                              <CourseTeamEdit />
                            </Edit>
                          </RequireAuth>
                        }
                      />
                      <Route
                        exact
                        path="/edit/group/:id"
                        element={
                          <RequireAuth>
                            <Edit>
                              <GroupEdit />
                            </Edit>
                          </RequireAuth>
                        }
                      />
                      <Route
                        exact
                        path="/edit/resources/:id"
                        element={
                          <RequireAuth>
                            <Edit>
                              <ResourceEdit />
                            </Edit>
                          </RequireAuth>
                        }
                      />
                      <Route
                        exact
                        path="/edit/content/:id"
                        element={
                          <RequireAuth>
                            <Edit>
                              <EditCon>
                                <ContentEdit />
                              </EditCon>
                            </Edit>
                          </RequireAuth>
                        }
                      />
                      <Route
                        exact
                        path="/edit/submit/:id"
                        element={
                          <RequireAuth>
                            <Edit>
                              <SubmitEdit />
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
