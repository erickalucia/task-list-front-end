import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = props => {
  const [formFields, setFormFields] = useState({
    title: '',
    description: '',
  });

  const updateTaskTitle = event => {
    setFormFields({ ...formFields, title: event.target.value });
  };

  const updateTaskDescription = event => {
    setFormFields({ ...formFields, description: event.target.value });
  };

  const SubmitForm = event => {
    event.preventDefault();

    props.addTask({
      title: formFields.title,
      description: formFields.description,
    });

    setFormFields({
      title: '',
      description: '',
    });
  };

  return (
    <section className="new-task-form">
      <form onSubmit={SubmitForm} className="task-input">
        <section className="task-title">
          <label htmlFor="title">Task Title:</label>
          <input
            onChange={updateTaskTitle}
            name="title"
            type="text"
            value={formFields.title}
          />
        </section>
        <section className="task-description">
          <label htmlFor="description">Task Description:</label>
          <input
            onChange={updateTaskDescription}
            name="description"
            type="text"
            value={formFields.description}
          />
        </section>
        <section className="submit-task">
          <input type="submit" value="Add New Task" />
        </section>
      </form>
    </section>
  );
};

NewTaskForm.propTypes = { addTask: PropTypes.func.isRequired };

export default NewTaskForm;
