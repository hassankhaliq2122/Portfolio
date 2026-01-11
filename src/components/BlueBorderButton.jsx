import React from 'react'

const BlueBorderButton = () => {
  return (
    <button style={{fontSize: 'clamp(14px, 2vw, 18px)', backgroundColor: 'transparent', fontWeight: '600', color: '#2C65E1', border: '2px solid #2C65E1', borderRadius: '8px', minWidth: '65px', maxWidth: '75px', width: 'auto', height: '48px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '0 12px', flexShrink: 0}}>Menu</button>
  )
}

export default BlueBorderButton