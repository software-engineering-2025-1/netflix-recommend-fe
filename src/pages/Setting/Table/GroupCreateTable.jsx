import React, { useState } from 'react';
import { Form, Button, Alert, Table, Card } from 'react-bootstrap';
import api2 from '../../../utils/api2';

const GroupCreateTable = () => {
  const [groupName, setGroupName] = useState('');
  const [message, setMessage] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [myGroups, setMyGroups] = useState([]);

  // 그룹 생성
  const handleCreateGroup = async () => {
    try {
      await api2.post(`/groups?name=${encodeURIComponent(groupName)}`);
      setMessage('✅ 그룹이 생성되었습니다.');
      setMyGroups([...myGroups, { name: groupName }]); // 임시 추가
      setGroupName('');
    } catch (error) {
      setMessage('❌ 그룹 생성 실패');
    }
  };

  // 그룹 검색
  const handleSearch = async () => {
    try {
      const res = await api2.get(`/groups?keyword=${encodeURIComponent(searchKeyword)}`);
      setSearchResults(res.data); // 검색 결과 업데이트
    } catch (error) {
      setMessage('❌ 그룹 검색 실패');
    }
  };

  // 그룹 참여
  const handleJoinGroup = async (groupId) => {
    try {
      await api2.post(`/groups/${groupId}`);
      setMessage('✅ 그룹에 참여했습니다.');
    } catch (error) {
      setMessage('❌ 참여 실패 (이미 참여했을 수 있음)');
    }
  };

  return (
    <Card bg="dark" text="light" className="shadow-sm mb-4">
      <Card.Body>
        <div>
          <h5 className="text-white">👥 그룹 생성 및 참여</h5>
          {message && <Alert variant="info">{message}</Alert>}

          {/* 그룹 생성 */}
          <Form.Group>
            <Form.Label className="text-white fw-semibold">그룹 이름</Form.Label>
            <Form.Control
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="예: 영화 덕후들"
            />
          </Form.Group>
          <Button className="mt-2 mb-4" variant="warning" onClick={handleCreateGroup}>
            그룹 생성
          </Button>

          {/* 내가 생성한 그룹들 */}
          {myGroups.length > 0 && (
            <>
              <h6 className="text-white mt-3">📌 내가 생성한 그룹</h6>
              <ul className="text-white">
                {myGroups.map((g, i) => (
                  <li key={i}>{g.name}</li>
                ))}
              </ul>
            </>
          )}

          {/* 그룹 검색 */}
          <h5 className="text-white mt-4">🔍 그룹 검색</h5>
            <Form.Group>
                <Form.Label className="text-white fw-semibold">그룹 검색</Form.Label>
                <Form.Control
                    placeholder="그룹 이름 입력"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
            </Form.Group>
            <Button className="mt-2 mb-4" variant="secondary" onClick={handleSearch}>
            그룹 검색
            </Button>

          {/* 검색 결과 */}
          {searchResults.length > 0 && (
            <Table striped bordered hover variant="dark" size="sm">
              <thead>
                <tr>
                  <th>그룹 이름</th>
                  <th>참여</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((group) => (
                  <tr key={group.id}>
                    <td>{group.name}</td>
                    <td>
                      <Button size="sm" variant="success" onClick={() => handleJoinGroup(group.id)}>
                        참여하기
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default GroupCreateTable;
