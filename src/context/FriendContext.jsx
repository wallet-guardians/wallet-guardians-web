import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ 리다이렉트 추가
import { getReceivedFriendRequests } from '../api/friendApi';

const FriendContext = createContext();

export const FriendProvider = ({ children }) => {
  const [isFriendModalOpen, setFriendModalOpen] = useState(false);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ 로그인 안 된 경우 리다이렉트

  const toggleFriendModal = () => {
    setFriendModalOpen((prev) => !prev);
  };

  // 🔹 로그인 상태 확인
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!accessToken) {
      console.warn("🚨 로그인되지 않음 → /login으로 이동");
      navigate("/login", { replace: true }); // ✅ 로그인 안 되어 있으면 즉시 리다이렉트
      return;
    }

    const fetchReceivedRequests = async () => {
      try {
        console.log("📡 친구 요청 GET 요청 보내는 중...");
        const receivedData = await getReceivedFriendRequests();

        if (Array.isArray(receivedData)) {
          console.log("✅ 받은 친구 요청 (서버 응답):", receivedData);
          setReceivedRequests(receivedData);
        } else {
          console.warn("⚠️ 예상치 못한 데이터 형식:", receivedData);
          setReceivedRequests([]);
        }
      } catch (error) {
        console.error("🚨 친구 요청 가져오기 실패:", error);
        setReceivedRequests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReceivedRequests();
  }, [accessToken]); // ✅ 로그인 상태가 바뀔 때만 실행

  return (
    <FriendContext.Provider value={{ isFriendModalOpen, toggleFriendModal, receivedRequests, loading }}>
      {children}
    </FriendContext.Provider>
  );
};

export const useFriendContext = () => {
  return useContext(FriendContext);
};
