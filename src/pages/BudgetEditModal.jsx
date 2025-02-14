import { useState, useEffect } from "react";
import { updateBudget, getBudget } from "../api/budgetApi"; // ✅ 예산 수정 & 조회 API import
import GlobalModalMessage from "../components/GlobalModalMesaage"; // ✅ 모달 메시지 추가
import "../style/BudgetEditModal.scss";

const BudgetEditModal = ({ isOpen, onClose, budgetData, setGoalAmount }) => {
  if (!isOpen) return null; // 모달이 닫혀 있으면 렌더링 X

  const [goalAmount, setGoalAmountLocal] = useState(budgetData?.goalAmount || 0);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalMessage, setModalMessage] = useState(null); // ✅ 모달 메시지 상태 추가

  // ✅ 모달 열릴 때 기존 예산 로드
  useEffect(() => {
    if (isOpen && budgetData?.goalAmount) {
      setGoalAmountLocal(budgetData.goalAmount);
    }
  }, [isOpen, budgetData]);

  // ✅ 예산 수정 요청
  const handleUpdateBudget = async () => {
    const parsedAmount = parseInt(goalAmount, 10);

    if (!parsedAmount || isNaN(parsedAmount) || parsedAmount <= 0) {
      setErrorMessage("올바른 숫자 금액을 입력해주세요.");
      return;
    }

    try {
      await updateBudget(parsedAmount);
      console.log("✅ 예산 수정 완료, 최신 데이터 요청 중...");

      // 최신 예산 가져와서 업데이트
      const updatedBudget = await getBudget();
      setGoalAmount(updatedBudget.amount); // ✅ 메인 페이지에 최신 데이터 반영
      setGoalAmountLocal(updatedBudget.amount);

      setModalMessage({ type: "success", message: "목표 금액이 성공적으로 수정되었습니다!" }); // ✅ 성공 메시지 표시
      setTimeout(() => onClose(), 2000); // ✅ 2초 후 모달 자동 닫기
    } catch (error) {
      console.error("목표 금액 수정 오류:", error);
      setModalMessage({ type: "error", message: "목표 금액 수정 중 오류가 발생했습니다." });
    }
  };

  return (
    <div className="budget-modal-overlay">
      <div className="budget-modal">
        {modalMessage && <GlobalModalMessage type={modalMessage.type} message={modalMessage.message} />}
        
        <h2>목표 금액 수정</h2>

        <label>목표 금액</label>
        <input
          type="text"
          value={goalAmount}
          onChange={(e) => setGoalAmountLocal(Number(e.target.value))}
        />

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="button-group">
          <button className="save-btn" onClick={handleUpdateBudget}>
            수정
          </button>
          <button className="cancel-btn" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgetEditModal;
