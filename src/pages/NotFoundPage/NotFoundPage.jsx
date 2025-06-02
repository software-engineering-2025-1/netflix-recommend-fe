import React from 'react'
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const NotFoundPage = () => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="warning" onClose={() => setShow(false)} dismissible>
        <h1>페이지를 찾을 수 없습니다. </h1>
        <p>
          Change this and that and try again. Duis mollis, est non commodo
          luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
          Cras mattis consectetur purus sit amet fermentum.
        </p>
        <Button variant="warning" href = '/' onClick={() => setShow(true)}>홈페이지로 이동</Button>
      </Alert>
      
    )
  }
}

export default NotFoundPage



