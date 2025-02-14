import apiClient from "./apiClient";

// 📌 프로필 사진 업로드 API (PUT)
export const saveProfilePicture = async (imageFile) => {
  try {
    console.log(`🟢 [saveProfilePicture] 요청: ${imageFile.name}`);

    const formData = new FormData();
    formData.append("file", imageFile);

    console.log("📌 [FormData 디버깅] 전송 데이터:");
    for (let [key, value] of formData.entries()) {
      console.log(`🔹 ${key}:`, value);
    }

    // ✅ `apiClient`가 자동으로 토큰 추가 및 갱신 처리
    const response = await apiClient.put("/auth/profile", formData);

    console.log(`✅ [saveProfilePicture] 업로드 성공! 응답:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`❌ [saveProfilePicture] 업로드 실패!`, error.response?.data || error.message);
    throw error;
  }
};
