// components/LoadingOverlay.tsx
import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';

const LoadingOverlay: React.FC = () => {
    return (
        <div style={{
            position: 'fixed',
            left: 0,
            top: 0,
            zIndex: 50,
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)' 
        }}>
            <LoadingOutlined style={{
                fontSize: '2rem',
                color: 'white'
            }} spin />
        </div>
    );
};

export default LoadingOverlay;
