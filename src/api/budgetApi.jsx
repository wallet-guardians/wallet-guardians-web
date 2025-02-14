import apiClient from './apiClient';

// 예산 설정 (POST) 처음 예산 설정하는 곳에서 사용하면 됨
export const setBudget = async (goalAmount) => {
  try {
    const accessToken = localStorage.getItem('accessToken'); // token--> accessToken, refreshToken 원래는 'token'으로 되어 있었음 그러니까 못 불러오더라..
    const refreshToken = localStorage.getItem('refreshToken');

    console.log(accessToken);
    if (!accessToken) throw new Error('인증 토큰이 없습니다.');

    //  기존 예산이 없으면 새로 생성
    const response = await apiClient.post(
      `/budget`,
      { amount: goalAmount },
      {
        headers: {
          'ACCESS-AUTH-KEY': `BEARER ${accessToken}`,
          'REFRESH-AUTH-KEY': `BEARER ${refreshToken || ''}`, //  refreshToken 추가
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('📌 예산 설정 실패:', error.response?.data || error.message);
    throw error;
  }
};
//만약 회원가입을 처음해서 예산정보가 없으면 409 에러가 뜰거임
export const getBudget = async () => {
  try {
    const response = await apiClient.get('/budget');
    console.log('🛠 유저 설정예산 조회 API 응답:', response.data); // 응답 디버깅용
    console.log(
      '🛠 유저 설정 내각 데이터 예산 조회 API 응답:',
      response.data.data
    ); // 응답 디버깅용

    return response.data.data;
  } catch (e) {
    //회원가입을 처음하는 사용자 입장에선 getBudget을 하면 없는 값이 때문에 409 에러가 뜸 (서버의 흐름과 달라서)
    //일반적으로 데이터가 없으면 404이긴함
    if (e.response?.status == 409 || e.response?.status == 404) {
      console.warn(` 예산 데이터가 없음 (${e.response?.status}), 기본값 반환.`);
      return 0;
    }
    alert('서버 문제로 인한 에러발생');
    console.log('에러발생' + e);
    throw e;
  }
};

// 예산 수정 (PUT) 수정하는 페이지에서 사용 수정하는 페이지나 모달을 새로 만들어야 할 듯..?
export const updateBudget = async ( goalAmount ) => {
  try {
    const response = await apiClient.put(
      `/budget`,
      { amount: goalAmount },
    );
    return response.data;
  } catch (error) {
    console.error('예산 수정 실패:', error.response?.data || error.message);
    throw error;
  }
};
