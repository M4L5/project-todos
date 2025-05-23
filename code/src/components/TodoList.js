import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components/macro';

import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

import todos from '../reducers/todos';

const TodoList = () => {

  const items = useSelector((store) => store.todos.items);
  const completedItems = items.filter(singleTodo => singleTodo.isComplete);
  const addLabel = useSelector((store) => store.todos.addLabel);
  const dispatch = useDispatch();
    
    return (
      <TodoContainer>
        <TodoWrapper>
          <TodoHeader>
            <Title>Today's To do list</Title>
            <CompletedSection>
              <CompletedTasks>Completed tasks: {completedItems.length}/{items.length}</CompletedTasks>
            </CompletedSection>
          </TodoHeader>
            <UserInput>
              <TextField
                required
                variant="standard"
                type="text"
                className="add-todo"
                placeholder="Add to do "
                id="todoLabel"
                onChange={(e) => dispatch(todos.actions.setAddLabel(e.target.value))}
                value={addLabel}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                size="small"
                startIcon={<SaveIcon />}
                aria-label="add todo"
                onClick={() => {
                  dispatch(todos.actions.addToDo()) 
                }}
              > Save
              </Button>
            </UserInput>

            {items.map(todo =>  (
              <UserOutput key={todo.id}>
                <Checkbox
                  type="checkbox"
                  color="primary"
                  checked={todo.isComplete}
                  onChange={() => dispatch(todos.actions.toggleComplete(todo.id))}
                />
                <p className="todo-description">{todo.description}</p>
                  <IconButton
                    aria-label="remove"
                    onClick={() => dispatch(todos.actions.removeToDo(todo.id))}
                  >
                    <DeleteIcon fontSize="small"/>
                  </IconButton>
              </UserOutput>
            ))}
        </TodoWrapper>
      </TodoContainer>
    )
};

export default TodoList;

const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TodoWrapper = styled.section`
  background-color: #D8EEFE;
  margin: 30px auto;
  padding: 80px 60px;
  border-radius: 20px;
  width: 50%;

  @media (min-width: 425px) and (max-width:993px) {
    width: 50%;
  }

  @media (min-width: 994px) {
    width: 20%;
   }
`

const TodoHeader = styled.header`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

const Title = styled.h1`
  font-family: Arial;
  font-size: 25px;
`

const CompletedSection = styled.section`
`

const CompletedTasks = styled.p`
  font-family: Arial;
  font-size: 16px;
`

const UserInput = styled.section`
  display: flex;
  flex-direction: column;
`

const UserOutput = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 50px;
  border-bottom: solid grey 1px;  
`