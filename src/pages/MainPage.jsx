import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import { GoalContext } from '../context/GoalContext';
import { SidebarContext } from '../context/SidebarContext';
import { getExpenseByMonth } from '../api/expenseApi';
import CountUp from 'react-countup';
import moment from 'moment';
import BudgetEditModal from './BudgetEditModal';

import '../style/MainPage.scss';

const MainPage = () => {
  const { goalAmount, error, setGoalAmount } = useContext(GoalContext);
  const { isSidebarOpen } = useContext(SidebarContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expensesByDate, setExpensesByDate] = useState({}); // 날짜별 지출 데이터 저장
  const [totalSpent, setTotalSpent] = useState(0); // 전체 사용된 예산
  const [isOverBudget, setIsOverBudget] = useState(false); // 예산 초과 여부 검증


  const navigate = useNavigate();

  const fetchBudget = async () => {
    try {
      const budget = await getBudget();
      if (budget && budget.amount) {
        setGoalAmount(budget.amount);
      }
    } catch (error) {
      console.error('❌ 예산 조회 실패:', error);
    }
  };

  useEffect(() => {
    fetchBudget();
  }, []);

  // 현재 월의 지출 데이터를 가져오는 함수 -> 매우 중요한 함수 (서버에서 받아온 객체 배열을 순회한다.)
  const fetchExpensesForMonth = async (year, month) => {
    try {
      console.log(
        `🟢 [fetchExpensesForMonth] ${year}년 ${month}월 지출 데이터 요청`
      );
      const response = await getExpenseByMonth(year, month);

      if (response && response.data) {
        //또한 tempExpenses 객체는 프론트가 직접 만든 객체임. 이 객체의 새로운 속성명인 formattedDate가 사용자가 사용한 금액을 담는다.
        let tempExpenses = {}; //상태의 불변성 준수를 위한 response.data (객체배열의 순회하는 copy 객체)

        let total = 0; // 서버에서 받아온 아영이가 제공해준 response객체를 순회하는거임

        //expense는 하나의 객체임. (date 속성엔 날짜가, amount 속성엔 그 날 사용한 금액이 있음)
        response.data.forEach((expense) => {
          const formattedDate = expense.date;
          const amount = expense.amount;
          //해당 객체배열에 해당하는 날짜에 있는 객체에 만약 amount 값이 없으면 (null값이면 false -> 0 ) + amount로 "새로운 키 : 값 속성을 만들어 넣는것" key : formattedDate , value : amount (from expense.amount)
          tempExpenses[formattedDate] =
            (tempExpenses[formattedDate] || 0) + amount;
          total += amount;
        });

        setExpensesByDate(tempExpenses); // 서버에서 받아온 데이터의 형태는 객체임 -> 이를 불변성을 준수해 상태변경함수로만 상태를 업데이트
        setTotalSpent(total); //  총 사용 금액 업데이트
        setIsOverBudget(total > goalAmount); //  예산 초과 여부 확인 -> 이 상태를 토대로 초과하면 경고 메세지를 센터에다 박음
      }
    } catch (error) {
      console.log(error + '월의 지출데이터를 가져오는데 오류가 발생했습니다.');
      console.warn(`⚠️ ${year}-${month} 지출 내역 없음 또는 API 오류.`);
    }
  };

  //  현재 선택된 달의 지출 내역 불러오기
  
  useEffect(() => {
    const year = moment(selectedDate).format('YYYY');
    const month = moment(selectedDate).format('M');
    fetchExpensesForMonth(year, month);
  }, [selectedDate, goalAmount]);

  // 새로운 지출을 추가한 후, 다시 월별 지출 내역을 불러오도록 설정
  const handleExpenseAdded = () => {
    const year = moment(selectedDate).format('YYYY');
    const month = moment(selectedDate).format('M');
    fetchExpensesForMonth(year, month);
  };

  const handleDateClick = (newDate) => {
    const formattedDate = moment(newDate).format('YYYY-MM-DD');
    navigate(`/input-entry/${formattedDate}`);
  };

  const handleBoxClick = (type) => {
    if (goalAmount === null || goalAmount === undefined) {
      navigate('/goal-setting'); // 목표 금액이 설정되지 않은 경우 목표 설정 페이지로 이동
      return;
    }

    if (type === 'goal') {
      setIsModalOpen(true); // 목표 금액 수정 모달 열기
    } else if (type === 'balance') {
      navigate('/graph'); // 잔액 클릭 시 그래프 페이지로 이동
    }
  };

  // 각 날짜에 해당하는 지출 합계를 표시하는 함수
  const renderTileContent = ({ date }) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const expenseAmount = expensesByDate[formattedDate] || 0;

    return (
      <div className="expense-content" style={{ color: 'red' }}>
        {expenseAmount > 0 && (
          <span className="expense-amount">
            - {expenseAmount.toLocaleString()}원
          </span>
        )}
      </div>
    );
  };

  // Sidebar 크기에 따른 동적 너비 조정
  const sidebarWidth = isSidebarOpen ? 250 : 0;
  const mainWidth = `calc(100vw - ${sidebarWidth}px)`;
  const mainMarginLeft = `${sidebarWidth / 2}px`;

  return (
    <div className="main-wrapper">
      <div
        className="main-content"
        style={{ width: mainWidth, marginLeft: mainMarginLeft }}
      >
        {/* 목표 금액 & 잔액 (Row 배치) */}
        <div className="goal-balance-container">
          <div onClick={() => handleBoxClick('goal')} className="goal-box">
            <h3 className="goal-title" style={{ color: 'white' }}>
              💰 이 달의 목표 금액
            </h3>
            <p className="goal-amount">
              {goalAmount !== null && goalAmount !== undefined ? (
                <CountUp
                  start={0}
                  end={goalAmount}
                  duration={1.5}
                  separator=","
                  suffix="원"
                />
              ) : (
                <p>목표 금액을 설정하세요!</p>
              )}
            </p>
          </div>

          <div
            onClick={() => handleBoxClick('balance')}
            className="balance-box"
          >
            <h3 className="balance-title" style={{ color: 'white' }}>
              💳 잔액
            </h3>
            <p className="balance-amount">
              {goalAmount !== null ? (
                <CountUp
                  start={0}
                  //totalSpent라는 상태를 위에서 지정해줌. 객체 배열을  순회하며, expense객체에서 사용자가 추가 한 금액을 추가하여 잔액을 최신화한다
                  end={goalAmount - totalSpent}
                  duration={1.5}
                  separator=","
                  suffix="원"
                />
              ) : (
                '목표 금액을 설정하세요!'
              )}
            </p>
          </div>
        </div>

        {/* 예산 초과 경고 메시지 메인 모달에 뜰거임!! */}
        {isOverBudget && (
          <p
            className="budget-warning"
            style={{ color: 'red', fontWeight: 'bold' }}
          >
            ⚠️ 예산을 초과했습니다!
          </p>
        )}

        {/* 예산 조회 에러 메시지 */}
        {error && (
          <p className="error-message">❌ 오류 발생: {error.message}</p>
        )}

        {/* 달력 */}
        <div className="calendar-container">
          <Calendar
            onClickDay={handleDateClick}
            value={selectedDate}
            locale="ko-kr"
            calendarType="gregory"
            formatDay={(locale, date) => moment(date).format('D')}
            formatYear={(locale, date) => moment(date).format('YYYY')}
            formatMonthYear={(locale, date) => moment(date).format('YYYY. MM')}
            showNeighboringMonth={false}
            next2Label={null}
            prev2Label={null}
            minDetail="year"
            tileContent={renderTileContent} // ✅ 각 날짜에 지출 내역 표시
          />
        </div>
      </div>

      {/* 목표 금액 수정 모달 */}
      <BudgetEditModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          refreshBudget();
        }}
        budgetData={{ goalAmount }}
        setGoalAmount={setGoalAmount}
      />
    </div>
  );
};

export default MainPage;
