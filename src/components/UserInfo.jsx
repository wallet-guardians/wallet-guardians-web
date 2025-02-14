/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { getUserInfo } from '../api/authApi';
import { css } from '@emotion/react';
import LoadingIndicator from './LoadingIndicator';
import { getBudget } from '../api/budgetApi';

const userInfoStyles = css`
  text-align: center;
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 20px;
  padding: 15px 10px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
`;

const userNameStyles = css`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 8px;
  color: white;
`;

const userInfoTextStyles = css`
  font-size: 1rem;
  font-weight: bold;
  margin: 3px 0;
  opacity: 0.9;
`;

const UserInfoComponent = ({ updatedBudget }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userBudget, setUserBudget] = useState(null);

  const fetchUserData = async () => {
    try {
      const data = await getUserInfo();
      setUserInfo(data);
      console.log('✅ 유저 정보:', data);
    } catch (err) {
      console.error('🚨 유저 정보 가져오기 실패:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBudget = async () => {
    try {
      const data = await getBudget();
      console.log('✅ 유저 외곽오카네 정보:', data);
      setUserBudget(data.amount);
      console.log('✅ 유저 오카네 정보:', data.amount);
    } catch (err) {
      console.error('🚨 유저 설정 예산 가져오기 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchUserBudget();
  }, []);

  useEffect(() => {
    if (updatedBudget !== undefined) {
      setUserBudget(updatedBudget);
    }
  }, [updatedBudget]);

  return (
    <div css={userInfoStyles}>
      {loading ? (
        //로딩 인디케이터 컴포넌트는 3개의 props를 강제함 loading, error, onRetry
        //3개를 넣어주면 로딩일동안은 뻉글뻉글 도는 스피너 (LoadingIndicator 추가)
        <LoadingIndicator loading={loading} error={error}></LoadingIndicator>
      ) : error ? (
        <p>❌ 유저 정보를 불러올 수 없습니다.</p>
      ) : (
        <div>
          <h3 css={userNameStyles}>🙋‍♂️ {userInfo?.username} 님</h3>
          <p css={userInfoTextStyles}>📧 {userInfo?.email}</p>
          <p css={userInfoTextStyles}>🎖️ {userInfo?.role}</p>
          <p css={userInfoTextStyles}>
            💰 {userBudget ? `${userBudget.toLocaleString()} 원` : '정보 없음'}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserInfoComponent;
