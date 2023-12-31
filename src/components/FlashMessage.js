import { useContext } from 'react';
import Alert from 'react-bootstrap/Alert';
import Collapse from 'react-bootstrap/Collapse';
import { FlashContext } from '../contexts/FlashProvider';

const FlashMessage = () => {
  const { flashMessage, visible, hideFlash } = useContext(FlashContext);

  return (
    <Collapse in={visible}>
      <div>
        <Alert variant={flashMessage.type || 'info'} dismissible onClose={hideFlash}>
          {flashMessage.message}
        </Alert>
      </div>
    </Collapse>
  )
};

export default FlashMessage;
