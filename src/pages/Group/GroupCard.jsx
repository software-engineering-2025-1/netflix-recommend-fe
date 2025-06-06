import React from 'react';
import "./GroupCard.style.css";
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const GroupCard = ({ group }) => {
    const navigate = useNavigate();

    const moveToDetailPage = () => {
        navigate(`/groups/${group.id}/movies?groupName=${encodeURIComponent(group.name)}`);
        window.scrollTo(0, 0); // 윈도우 최상단으로 이동되게 함
    }

    return (
        <div
            className="group-card d-flex flex-column justify-content-between p-3"
            style={{
                borderRadius: '16px',
                border: '1px solid #495057', // 밝은 회색 테두리
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                color: 'white',
                cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.6)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.4)';
            }}
            >
            <h5 className="mb-3">{group.name}</h5>
            <Button
                variant={onmouseover ? 'danger' : 'outline-danger'}
                onClick={moveToDetailPage}
            >
                이동
            </Button>
        </div>
    )
}

export default GroupCard;