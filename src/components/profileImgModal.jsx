import React, { useState } from "react";
import "../style/ProfileImgModal.scss";
import { saveProfilePicture } from "../api/userImgApi"; // ✅ `updateProfilePicture` 삭제

const ProfileImgModal = ({ isOpen, onClose, existingProfile }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("파일을 선택하세요!");
    setLoading(true);
  
    try {
      await saveProfilePicture(selectedFile); // ✅ `saveProfilePicture`만 사용
  
      alert("프로필 사진이 업데이트되었습니다!");
      onClose(); // 모달 닫기
    } catch (error) {
      alert("업로드에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close-btn" onClick={onClose}>
          ×
        </button>
        <h2 className="modal-title">프로필 사진 변경</h2>

        <div className="file-upload-box">
          <label className="custom-file-upload">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            파일 선택
          </label>
          <span className="file-name">
            {selectedFile ? selectedFile.name : '선택된 파일 없음'}
          </span>

          <div className="image-preview">
            {preview ? (
              <img src={preview} alt="미리보기" className="preview-image" />
            ) : (
              <div className="placeholder">미리보기 없음</div>
            )}
          </div>
        </div>

        <button className="modal-btn" onClick={handleUpload} disabled={loading}>
          {loading ? "업로드 중..." : "업로드"}
        </button>
      </div>
    </div>
  );
};

export default ProfileImgModal;
