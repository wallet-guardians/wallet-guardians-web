import { FaUserFriends } from 'react-icons/fa';
import { useFriendContext } from '../context/FriendContext';
import '../style/FriendIcon.scss';

const FriendIcon = () => {
  const { toggleFriendModal, receivedRequests = [] } = useFriendContext(); // 🔹 receivedRequests 추가

  console.log("📌 현재 받은 친구 요청 개수:", receivedRequests.length);

  return (
    <div className="friend-icon-container" onClick={toggleFriendModal}>
      <FaUserFriends className="friend-icon" />
      {/* 🔹 받은 친구 요청이 있을 경우 빨간 점 표시 */}
      {receivedRequests.length > 0 && <div className="notification-dot"></div>}
    </div>
  );
};

export default FriendIcon;
