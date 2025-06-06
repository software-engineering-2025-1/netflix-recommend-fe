import React, { useState } from 'react';
import {Form, Button, Alert, Card } from 'react-bootstrap';
import api2 from '../../../utils/api2';
const WatchHistoryTable = () => {
    const [videoId, setVideoId] = useState('');
    const [message, setMessage] = useState(null);
    const handleRegisterHistory = async () => {
        if (!videoId) {
          setMessage("❌ 영상 ID가 유효하지 않습니다.");
          return;
        }
      
        try {
          await api2.post(`/videos/${videoId}/histories`, {}); // 빈 바디 전달
          setMessage("✅ 시청 기록이 등록되었습니다.");
        } catch (error) {
          console.error("시청 기록 등록 실패:", error.response?.data || error.message);
          setMessage("❌ 시청 기록 등록 실패");
        }
      };

    return (
    <Card bg="dark" text="light" className="shadow-sm">
      <Card.Body>
        <div>
          <h5 className="text-white">🎬 시청 기록 등록</h5>
          {message && <Alert variant="info">{message}</Alert>}
          <Form className="mb-4">
                <Form.Group>
                  <Form.Label className="text-white fw-semibold">영상 ID</Form.Label>
                  <Form.Control
                    value={videoId}
                    onChange={(e) => setVideoId(e.target.value)}
                    placeholder="예: 101"
                  />
                </Form.Group>
                <Button className="mt-2" variant="success" onClick={handleRegisterHistory}>
                  시청 기록 등록
                </Button>
              </Form>
        </div>
      </Card.Body>
    </Card>
    );
};
  export default WatchHistoryTable;
