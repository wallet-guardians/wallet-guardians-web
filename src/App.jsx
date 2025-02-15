import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

import NotFoundPage from './pages/NotFoundPage';
import IncomePage from './pages/IncomePage';
import MainPage from './pages/MainPage';
import ExpensePage from './pages/ExpensePage';
import InitialPage from './pages/InitialPage';
import GoalSettingPage from './pages/GoalSettingPage';
import GraphPage from './pages/GraphPage';
import { GoalProvider } from './context/GoalContext'; // GoalContext import
import Layout from './components/Layout'; // Layout import
import './style/MainPage.scss';
import InputEntryPage from './pages/InputEntryPage'; // inputentry 페이지 추가
import ReceiptPicPage from './pages/ReceiptPicPage';
import AuthenticatedComponent from './auth/AuthenticatedComponent';
import { SidebarProvider } from './context/SidebarContext';
import { FriendProvider } from './context/FriendContext';
import FriendModal from './components/FriendModal';

const App = () => {
  return (
    <SidebarProvider>
      <GoalProvider>
        <FriendProvider>
          {' '}
          {/* GoalProvide로 전체 라우트 감싸기 */}
          <Routes>
            {/* 공통 레이아웃 적용되는 페이지 */}
            {/* 왜 공통컴포넌트인 auth에만 보안장치를 감싸는가? ->  공통 레이아웃 컴포넌트가 적용되는 부분만 보안 처리를 하면 돼기때문*/}
            <Route
              element={
                <AuthenticatedComponent>
                  <Layout />
                </AuthenticatedComponent>
              }
            >
              <Route path="/main" element={<MainPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/expenses" element={<ExpensePage />} />
              <Route path="/graph" element={<GraphPage />} />

              {/* 달력 선택하면 크게 보이는 페이지 추가*/}
              <Route path="/input-entry/:date" element={<InputEntryPage />} />
              <Route path="/receipt-picture" element={<ReceiptPicPage />} />
            </Route>
            {/* 개별 페이지 */}
            <Route path="/initial" element={<InitialPage />} />
            <Route path="/goal-setting" element={<GoalSettingPage />} />
            <Route path="/" element={<StartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} /> {/* 404 페이지 */}
          </Routes>
          <FriendModal />
        </FriendProvider>
      </GoalProvider>
    </SidebarProvider>
  );
};

export default App; //
