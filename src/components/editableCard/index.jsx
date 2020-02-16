import React from 'react';
import { func, string } from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const EditableCard = ({ onDelete, onEdit, title }) => {
  const handleOnEditClick = e => {
    e.preventDefault();
  };

  const handleOnDeleteClick = e => {
    e.preventDefault();
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title className='text-centered'>{title}</Card.Title>
      </Card.Body>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the cards content.
      </Card.Text>
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
  title: string.isRequired,
  onEdit: func.isRequired,
  onDelete: func.isRequired
};

export default EditableCard;
