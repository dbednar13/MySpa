import React from 'react';
import { func, string, object } from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const EditableCard = ({ body, id, onDelete, onEdit, title }) => {
  const handleOnEditClick = e => {
    e.preventDefault();
    onEdit(id);
  };

  const handleOnDeleteClick = e => {
    e.preventDefault();
    onDelete(id);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title className='text-centered'>{title}</Card.Title>
      </Card.Body>
      {body}
      <Card.Body>
        <div className='d-flex justify-content-between'>
          <Button variant='link' onClick={handleOnEditClick}>
            <EditIcon /> Edit
          </Button>
          <Button variant='link' onClick={handleOnDeleteClick}>
            <DeleteIcon /> Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

EditableCard.propTypes = {
  // eslint-disable-next-line
  body: object.isRequired,
  id: string.isRequired,
  title: string.isRequired,
  onEdit: func.isRequired,
  onDelete: func.isRequired
};

export default EditableCard;
